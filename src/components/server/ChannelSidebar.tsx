
import { Hash, Speaker, ChevronRight, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChannelSidebarProps {
  serverId: string | null;
  activeChannelId: string | null;
  onChannelSelect: (channelId: string) => void;
}

// Mock data - in real app would come from API
const mockCategories = [
  {
    id: "1",
    name: "TEXT CHANNELS",
    type: "TEXT" as const,
    channels: [
      { id: "1", name: "general", type: "text" as const },
      { id: "2", name: "memes", type: "text" as const },
    ],
  },
  {
    id: "2",
    name: "VOICE CHANNELS",
    type: "VOICE" as const,
    channels: [
      { id: "3", name: "Pond Chat", type: "voice" as const },
      { id: "4", name: "Music", type: "voice" as const },
    ],
  },
];

export const ChannelSidebar = ({
  serverId,
  activeChannelId,
  onChannelSelect,
}: ChannelSidebarProps) => {
  if (!serverId) return null;

  return (
    <div className="w-60 h-full bg-background-secondary flex flex-col border-r border-border">
      <div className="h-12 px-4 flex items-center justify-between border-b border-border">
        <h2 className="font-semibold truncate">Froggy Server</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {mockCategories.map((category) => (
          <div key={category.id}>
            <button className="w-full flex items-center gap-1 px-1 mb-1 text-text-secondary hover:text-text group">
              <ChevronRight className="w-3 h-3" />
              <span className="text-xs font-semibold">{category.name}</span>
            </button>
            
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
                  <Settings className="w-4 h-4 opacity-0 group-hover:opacity-100 text-text-secondary hover:text-text" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
