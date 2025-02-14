
import { Hash, Speaker, ChevronRight, Settings, Plus, Users, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Category, Channel, ChannelType } from "@/types/server";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { UserSettings } from "./UserSettings";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CreateChannelModal } from "./modals/CreateChannelModal";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableChannel } from "./SortableChannel";

interface ChannelSidebarProps {
  serverId: string | null;
  activeChannelId: string | null;
  onChannelSelect: (channelId: string) => void;
}

export const ChannelSidebar = ({
  serverId,
  activeChannelId,
  onChannelSelect,
}: ChannelSidebarProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Load categories and their collapsed state from localStorage
  useEffect(() => {
    if (!serverId) return;

    const loadCollapsedState = (cats: Category[]) => {
      const collapsedState = localStorage.getItem(`${serverId}-collapsed-categories`);
      const collapsed = collapsedState ? JSON.parse(collapsedState) : {};
      return cats.map(cat => ({
        ...cat,
        isExpanded: !collapsed[cat.id]
      }));
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch categories with their channels
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select(`
            id,
            name,
            position,
            collapsed,
            server_id,
            channels (
              id,
              name,
              type,
              position,
              topic,
              settings,
              created_at,
              updated_at,
              server_id,
              category_id
            )
          `)
          .eq('server_id', serverId)
          .order('position');

        if (categoriesError) throw categoriesError;

        // Transform and sort the data
        const transformedCategories = (categoriesData || []).map(cat => ({
          ...cat,
          channels: (cat.channels || [])
            .map(channel => ({
              ...channel,
              server_id: serverId,
              category_id: cat.id
            }))
            .sort((a, b) => a.position - b.position)
        }));

        setCategories(loadCollapsedState(transformedCategories));
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load channels');
        toast.error('Failed to load channels');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Subscribe to changes
    const channel = supabase.channel('categories-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'categories',
          filter: `server_id=eq.${serverId}`
        },
        () => {
          fetchData(); // Refresh data on any changes
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'channels',
          filter: `server_id=eq.${serverId}`
        },
        () => {
          fetchData(); // Refresh data on any channel changes
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverId]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeChannel = active.id as string;
    const overChannel = over.id as string;

    const activeCategory = categories.find(cat => 
      cat.channels.some(ch => ch.id === activeChannel)
    );
    const overCategory = categories.find(cat => 
      cat.channels.some(ch => ch.id === overChannel)
    );

    if (!activeCategory || !overCategory) return;

    const oldIndex = activeCategory.channels.findIndex(ch => ch.id === activeChannel);
    const newIndex = overCategory.channels.findIndex(ch => ch.id === overChannel);

    // Update positions locally first (optimistic update)
    setCategories(prevCategories => {
      const newCategories = [...prevCategories];
      const category = newCategories.find(c => c.id === activeCategory.id);
      if (!category) return prevCategories;

      const channels = [...category.channels];
      const [movedChannel] = channels.splice(oldIndex, 1);
      channels.splice(newIndex, 0, movedChannel);

      // Update positions
      channels.forEach((ch, index) => {
        ch.position = index;
      });

      category.channels = channels;
      return newCategories;
    });

    // Update position in the database
    try {
      const { error } = await supabase
        .from('channels')
        .update({ position: newIndex })
        .eq('id', activeChannel);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating channel position:', error);
      toast.error('Failed to update channel position');
    }
  };

  const toggleCategory = async (categoryId: string) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? { ...category, isExpanded: !category.isExpanded }
          : category
      )
    );

    // Save collapsed state to localStorage
    const collapsedState = categories.reduce((acc, cat) => ({
      ...acc,
      [cat.id]: !cat.isExpanded
    }), {});
    localStorage.setItem(`${serverId}-collapsed-categories`, JSON.stringify(collapsedState));

    // Update in database
    if (serverId) {
      const { error } = await supabase
        .from('categories')
        .update({ collapsed: !categories.find(c => c.id === categoryId)?.isExpanded })
        .eq('id', categoryId);

      if (error) {
        console.error('Error updating category:', error);
        toast.error('Failed to update category state');
      }
    }
  };

  const handleChannelSettings = (e: React.MouseEvent, channel: Channel) => {
    e.stopPropagation();
    // TODO: Implement channel settings modal
    console.log("Open channel settings for:", channel.name);
  };

  if (!serverId) return null;

  if (isLoading) {
    return (
      <div className="w-60 h-full bg-background-secondary flex items-center justify-center">
        <div className="text-text-secondary">Loading channels...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-60 h-full bg-background-secondary flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-60 h-full bg-background-secondary flex flex-col border-r border-border">
      <div className="h-12 px-4 flex items-center justify-between border-b border-border">
        <h2 className="font-semibold truncate">Server Name</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Users className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Server Members</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <div className="text-sm text-text-secondary">
                Member list coming soon...
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-4">
          {categories.map((category) => (
            <div key={category.id}>
              <button 
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center gap-1 px-1 mb-1 text-text-secondary hover:text-text group"
              >
                <ChevronRight 
                  className={cn(
                    "w-3 h-3 transition-transform",
                    category.isExpanded && "rotate-90"
                  )} 
                />
                <span className="text-xs font-semibold">{category.name}</span>
                {serverId && (
                  <CreateChannelModal
                    serverId={serverId}
                    categoryId={category.id}
                    onChannelCreated={() => {}}
                  >
                    <Plus 
                      className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 cursor-pointer" 
                    />
                  </CreateChannelModal>
                )}
              </button>
              
              {category.isExpanded && (
                <DndContext 
                  sensors={sensors}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext 
                    items={category.channels.map(ch => ch.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-0.5">
                      {category.channels.map((channel) => (
                        <SortableChannel
                          key={channel.id}
                          channel={channel}
                          isActive={channel.id === activeChannelId}
                          onSelect={onChannelSelect}
                          onSettingsClick={handleChannelSettings}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-auto p-4 border-t border-border bg-background-secondary/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/lovable-uploads/05eb46c8-beec-4402-aa5b-1debbe9d35c0.png"
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background-secondary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">FroggyUser</div>
            <div className="text-xs text-text-secondary truncate">Online</div>
          </div>
          <UserSettings />
        </div>
      </div>
    </div>
  );
};
