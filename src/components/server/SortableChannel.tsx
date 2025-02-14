
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Hash, Mic, Settings, Speaker } from "lucide-react";
import { Button } from "../ui/button";
import { Channel } from "@/types/server";
import { cn } from "@/lib/utils";

interface SortableChannelProps {
  channel: Channel;
  isActive: boolean;
  onSelect: (channelId: string) => void;
  onSettingsClick: (e: React.MouseEvent, channel: Channel) => void;
}

export const SortableChannel = ({
  channel,
  isActive,
  onSelect,
  onSettingsClick,
}: SortableChannelProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: channel.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "w-full flex items-center gap-2 px-2 py-1 rounded hover:bg-background/50 group cursor-grab active:cursor-grabbing",
        isActive && "bg-background/50 text-text",
        isDragging && "opacity-50"
      )}
      onClick={() => onSelect(channel.id)}
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
        onClick={(e) => onSettingsClick(e, channel)}
      />
    </div>
  );
};
