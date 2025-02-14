
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
              updated_at
            )
          `)
          .eq('server_id', serverId)
          .order('position');

        if (categoriesError) throw categoriesError;

        // Transform and sort the data
        const transformedCategories = (categoriesData || []).map(cat => ({
          ...cat,
          channels: (cat.channels || []).sort((a, b) => a.position - b.position)
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
            {/* Member list will be implemented in the next phase */}
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
                <div className="space-y-0.5">
                  {category.channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => onChannelSelect(channel.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-2 py-1 rounded hover:bg-background/50 group",
                        activeChannelId === channel.id && "bg-background/50 text-text"
                      )}
                    >
                      {channel.type === "TEXT" ? (
                        <Hash className="w-4 h-4 text-text-secondary" />
                      ) : (
                        <Speaker className="w-4 h-4 text-text-secondary" />
                      )}
                      <span className="flex-1 truncate text-sm">{channel.name}</span>
                      {channel.type === "VOICE" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100"
                        >
                          <Mic className="w-4 h-4 text-text-secondary hover:text-text" />
                        </Button>
                      )}
                      <Settings 
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 text-text-secondary hover:text-text"
                        onClick={(e) => handleChannelSettings(e, channel)}
                      />
                    </button>
                  ))}
                </div>
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
