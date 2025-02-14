
import { Hash, Speaker, ChevronRight, Settings, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Category, Channel } from "@/types/server";

interface ChannelSidebarProps {
  serverId: string | null;
  activeChannelId: string | null;
  onChannelSelect: (channelId: string) => void;
}

// Mock data - in real app would come from API
const initialCategories = [
  {
    id: "1",
    name: "TEXT CHANNELS",
    type: "TEXT" as const,
    channels: [
      { id: "1", name: "general", type: "text" as const, categoryId: "1" },
      { id: "2", name: "memes", type: "text" as const, categoryId: "1" },
    ],
    isExpanded: true,
  },
  {
    id: "2",
    name: "VOICE CHANNELS",
    type: "VOICE" as const,
    channels: [
      { id: "3", name: "Pond Chat", type: "voice" as const, categoryId: "2" },
      { id: "4", name: "Music", type: "voice" as const, categoryId: "2" },
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

  return (
    <div className="w-60 h-full bg-background-secondary flex flex-col border-r border-border">
      <div className="h-12 px-4 flex items-center justify-between border-b border-border">
        <h2 className="font-semibold truncate">Froggy Server</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-4">
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
                      activeChannelId === channel.id && "bg-background/50 text-text"
                    )}
                  >
                    {channel.type === "text" ? (
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

      <div className="mt-auto p-4 border-t border-border bg-background-secondary/50">
        <div className="flex items-center gap-3">
          <img
            src="/lovable-uploads/05eb46c8-beec-4402-aa5b-1debbe9d35c0.png"
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">FroggyUser</div>
            <div className="text-xs text-text-secondary truncate">Online</div>
          </div>
          <Settings className="w-4 h-4 text-text-secondary hover:text-text cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
