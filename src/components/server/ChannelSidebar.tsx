
import { Hash, Speaker, ChevronRight, Settings, Plus, Users, Mic, HeadphoneOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Category, Channel, ChannelType } from "@/types/server";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { UserSettings } from "./UserSettings";

interface ChannelSidebarProps {
  serverId: string | null;
  activeChannelId: string | null;
  onChannelSelect: (channelId: string) => void;
}

// Mock data - in real app would come from API
const initialCategories: Category[] = [
  {
    id: "1",
    server_id: "mock-server-1",
    name: "TEXT CHANNELS",
    position: 0,
    channels: [
      { 
        id: "1", 
        server_id: "mock-server-1",
        category_id: "1", 
        name: "general", 
        type: "TEXT" as ChannelType, 
        position: 0,
        topic: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        unreadCount: 2 
      },
      { 
        id: "2", 
        server_id: "mock-server-1",
        category_id: "1", 
        name: "memes", 
        type: "TEXT" as ChannelType, 
        position: 1,
        topic: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      { 
        id: "3", 
        server_id: "mock-server-1",
        category_id: "1", 
        name: "announcements", 
        type: "TEXT" as ChannelType, 
        position: 2,
        topic: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
    ],
    isExpanded: true,
  },
  {
    id: "2",
    server_id: "mock-server-1",
    name: "VOICE CHANNELS",
    position: 1,
    channels: [
      { 
        id: "4", 
        server_id: "mock-server-1",
        category_id: "2", 
        name: "Pond Chat", 
        type: "VOICE" as ChannelType, 
        position: 0,
        topic: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        isActive: true 
      },
      { 
        id: "5", 
        server_id: "mock-server-1",
        category_id: "2", 
        name: "Music", 
        type: "VOICE" as ChannelType, 
        position: 1,
        topic: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      { 
        id: "6", 
        server_id: "mock-server-1",
        category_id: "2", 
        name: "Gaming", 
        type: "VOICE" as ChannelType, 
        position: 2,
        topic: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
    ],
    isExpanded: true,
  },
];

export const ChannelSidebar = ({
  serverId,
  activeChannelId,
  onChannelSelect,
}: ChannelSidebarProps) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isInVoice, setIsInVoice] = useState(false);

  if (!serverId) return null;

  const toggleCategory = (categoryId: string) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? { ...category, isExpanded: !category.isExpanded }
          : category
      )
    );
  };

  const handleChannelSettings = (e: React.MouseEvent, channel: Channel) => {
    e.stopPropagation();
    // In a real app, this would open a channel settings modal
    console.log("Open channel settings for:", channel.name);
  };

  const handleVoiceJoin = (e: React.MouseEvent, channel: Channel) => {
    e.stopPropagation();
    setIsInVoice(!isInVoice);
  };

  return (
    <div className="w-60 h-full bg-background-secondary flex flex-col border-r border-border">
      <div className="h-12 px-4 flex items-center justify-between border-b border-border">
        <h2 className="font-semibold truncate">Froggy Server</h2>
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
            <ScrollArea className="mt-4 h-[calc(100vh-8rem)]">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2">Online — 3</h3>
                  <div className="space-y-2">
                    {Array.from({length: 3}).map((_, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-md hover:bg-background/50">
                        <div className="relative">
                          <img
                            src="/lovable-uploads/05eb46c8-beec-4402-aa5b-1debbe9d35c0.png"
                            alt="User avatar"
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background-secondary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">FroggyUser {i + 1}</div>
                          <div className="text-xs text-text-secondary">Hopping around</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2">Offline — 2</h3>
                  <div className="space-y-2">
                    {Array.from({length: 2}).map((_, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-md hover:bg-background/50 opacity-50">
                        <img
                          src="/lovable-uploads/b91a5d97-e32a-46cf-a2f2-4cbc6b082417.png"
                          alt="User avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="text-sm font-medium">FroggyUser {i + 4}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
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
                <Plus 
                  className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100" 
                  onClick={(e) => {
                    e.stopPropagation();
                    // In a real app, this would open create channel modal
                    console.log("Create channel in category:", category.name);
                  }}
                />
              </button>
              
              {category.isExpanded && (
                <div className="space-y-0.5">
                  {category.channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => onChannelSelect(channel.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-2 py-1 rounded hover:bg-background/50 group",
                        activeChannelId === channel.id && "bg-background/50 text-text",
                        channel.isActive && "bg-primary/10 text-primary"
                      )}
                    >
                      {channel.type === "TEXT" ? (
                        <Hash className="w-4 h-4 text-text-secondary" />
                      ) : (
                        <Speaker className="w-4 h-4 text-text-secondary" />
                      )}
                      <span className="flex-1 truncate text-sm">{channel.name}</span>
                      {channel.unreadCount && (
                        <span className="px-1.5 py-0.5 text-xs bg-primary text-white rounded-full">
                          {channel.unreadCount}
                        </span>
                      )}
                      {channel.type === "VOICE" && (
                        <button
                          onClick={(e) => handleVoiceJoin(e, channel)}
                          className="opacity-0 group-hover:opacity-100"
                        >
                          {channel.isActive ? (
                            <HeadphoneOff className="w-4 h-4 text-text-secondary hover:text-text" />
                          ) : (
                            <Mic className="w-4 h-4 text-text-secondary hover:text-text" />
                          )}
                        </button>
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
