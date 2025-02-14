
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Server } from "@/types/server";
import { supabase } from "@/integrations/supabase/client";
import { CreateServerModal } from "./CreateServerModal";

interface ServerListProps {
  activeServerId: string | null;
  onServerSelect: (serverId: string) => void;
}

export const ServerList = ({ activeServerId, onServerSelect }: ServerListProps) => {
  const [servers, setServers] = useState<Server[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    // Fetch initial servers
    const fetchServers = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('servers')
        .select('*')
        .order('created_at');

      if (error) {
        console.error('Error fetching servers:', error);
        return;
      }

      setServers(data || []);
    };

    fetchServers();

    // Subscribe to changes
    const channel = supabase
      .channel('server-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'servers'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setServers(current => [...current, payload.new as Server]);
          } else if (payload.eventType === 'DELETE') {
            setServers(current => current.filter(server => server.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setServers(current => 
              current.map(server => 
                server.id === payload.new.id ? { ...server, ...payload.new } : server
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="w-20 h-full bg-[#FAFAF8] flex flex-col items-center pt-3 gap-2 border-r border-[#E6E4DD]">
      <a
        href="/"
        className="w-12 h-12 bg-[#7EBF8E]/10 rounded-2xl flex items-center justify-center hover:bg-[#7EBF8E]/20 transition-colors group"
      >
        <img
          src="/lovable-uploads/05eb46c8-beec-4402-aa5b-1debbe9d35c0.png"
          alt="Home"
          className="w-8 h-8 transform group-hover:scale-110 transition-transform"
        />
      </a>
      
      <div className="w-8 h-0.5 bg-[#E6E4DD] rounded-full my-2" />
      
      <div className="flex-1 w-full px-3 space-y-2 overflow-y-auto scrollbar-hide">
        {servers.map((server) => (
          <button
            key={server.id}
            onClick={() => onServerSelect(server.id)}
            className={cn(
              "w-full aspect-square rounded-2xl transition-all duration-200 group relative",
              "hover:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7EBF8E]",
              "bg-[#F6F1EB] overflow-hidden",
              activeServerId === server.id ? "rounded-xl ring-2 ring-[#7EBF8E]" : "hover:rounded-xl"
            )}
          >
            {server.icon_url ? (
              <img
                src={server.icon_url}
                alt={server.name}
                className="w-full h-full object-cover rounded-inherit"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#7EBF8E]/20 to-[#7EBF8E]/10">
                <span className="text-lg font-medium text-[#7EBF8E]">
                  {server.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className={cn(
              "absolute left-0 w-1 top-1/2 -translate-y-1/2 rounded-r-full transition-all",
              activeServerId === server.id
                ? "h-10 bg-[#7EBF8E]"
                : "h-2 group-hover:h-5 bg-[#A3A299]"
            )} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/5 transition-opacity" />
          </button>
        ))}
      </div>
      
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="w-12 h-12 mb-3 rounded-full bg-[#F6F1EB] hover:bg-[#7EBF8E]/10 flex items-center justify-center text-[#7EBF8E] hover:text-[#7EBF8E] transition-colors group"
      >
        <Plus className="w-6 h-6 transform group-hover:rotate-90 transition-transform" />
      </button>

      <CreateServerModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
