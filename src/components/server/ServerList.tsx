
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServerListProps {
  activeServerId: string | null;
  onServerSelect: (serverId: string) => void;
}

// Mock data - in real app would come from API
const mockServers = [
  { id: "1", name: "Froggy Haven", icon: "/lovable-uploads/05eb46c8-beec-4402-aa5b-1debbe9d35c0.png" },
  { id: "2", name: "Pond Chat", icon: "/lovable-uploads/b91a5d97-e32a-46cf-a2f2-4cbc6b082417.png" },
];

export const ServerList = ({ activeServerId, onServerSelect }: ServerListProps) => {
  return (
    <div className="w-20 h-full bg-background-secondary flex flex-col items-center pt-3 gap-2 border-r border-border">
      <a
        href="/"
        className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center hover:bg-primary/20 transition-colors"
      >
        <img
          src="/lovable-uploads/05eb46c8-beec-4402-aa5b-1debbe9d35c0.png"
          alt="Home"
          className="w-8 h-8"
        />
      </a>
      
      <div className="w-8 h-0.5 bg-border rounded-full my-2" />
      
      <div className="flex-1 w-full px-3 space-y-2 overflow-y-auto scrollbar-hide">
        {mockServers.map((server) => (
          <button
            key={server.id}
            onClick={() => onServerSelect(server.id)}
            className={cn(
              "w-full aspect-square rounded-2xl transition-all duration-200 group relative",
              "hover:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary",
              activeServerId === server.id ? "rounded-xl" : "hover:rounded-xl"
            )}
          >
            <img
              src={server.icon}
              alt={server.name}
              className="w-full h-full object-cover rounded-inherit"
            />
            <div className={cn(
              "absolute left-0 w-1 top-1/2 -translate-y-1/2 rounded-r-full transition-all",
              activeServerId === server.id
                ? "h-10 bg-primary"
                : "h-2 group-hover:h-5 bg-text-secondary"
            )} />
          </button>
        ))}
      </div>
      
      <button
        className="w-12 h-12 rounded-full bg-background-secondary hover:bg-background flex items-center justify-center text-primary hover:text-primary-hover transition-colors mb-3"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};
