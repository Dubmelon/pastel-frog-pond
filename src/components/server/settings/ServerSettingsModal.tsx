
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServerGeneralSettings } from "./tabs/ServerGeneralSettings";
import { ServerRolesSettings } from "./tabs/ServerRolesSettings";
import { ServerMembersSettings } from "./tabs/ServerMembersSettings";
import { ServerInviteSettings } from "./tabs/ServerInviteSettings";
import { Server } from "@/types/server";
import { supabase } from "@/integrations/supabase/client";
import { transformServerMetadata } from "@/utils/server-transforms";

interface ServerSettingsModalProps {
  serverId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ServerSettingsModal = ({ 
  serverId,
  isOpen, 
  onClose 
}: ServerSettingsModalProps) => {
  const [server, setServer] = useState<Server | null>(null);
  const [activeTab, setActiveTab] = useState("general");
  
  useEffect(() => {
    if (!serverId) return;
    
    const fetchServer = async () => {
      const { data, error } = await supabase
        .from('servers')
        .select('*')
        .eq('id', serverId)
        .single();
      
      if (error) {
        console.error('Error fetching server:', error);
        return;
      }

      // Transform the raw server data into our Server type
      const transformedServer: Server = {
        id: data.id,
        name: data.name,
        icon_url: data.icon_url,
        owner_id: data.owner_id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        metadata: transformServerMetadata(data.metadata)
      };

      setServer(transformedServer);
    };

    fetchServer();

    // Subscribe to server changes
    const channel = supabase
      .channel('server-settings')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'servers',
          filter: `id=eq.${serverId}`
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            const newData = payload.new as any;
            // Transform the updated data before setting it in state
            const updatedServer: Server = {
              id: newData.id,
              name: newData.name,
              icon_url: newData.icon_url,
              owner_id: newData.owner_id,
              created_at: newData.created_at,
              updated_at: newData.updated_at,
              metadata: transformServerMetadata(newData.metadata)
            };
            setServer(updatedServer);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverId]);

  if (!server) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[85vh]">
        <DialogHeader>
          <DialogTitle>Server Settings</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full">
          <TabsList className="flex flex-col items-stretch w-48 h-full bg-background-secondary rounded-lg p-2 gap-1">
            <TabsTrigger value="general" className="justify-start">
              General
            </TabsTrigger>
            <TabsTrigger value="roles" className="justify-start">
              Roles & Permissions
            </TabsTrigger>
            <TabsTrigger value="members" className="justify-start">
              Members
            </TabsTrigger>
            <TabsTrigger value="invites" className="justify-start">
              Invites
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1 ml-4 overflow-y-auto">
            <TabsContent value="general" className="mt-0">
              <ServerGeneralSettings server={server} />
            </TabsContent>
            <TabsContent value="roles" className="mt-0">
              <ServerRolesSettings serverId={serverId} />
            </TabsContent>
            <TabsContent value="members" className="mt-0">
              <ServerMembersSettings serverId={serverId} />
            </TabsContent>
            <TabsContent value="invites" className="mt-0">
              <ServerInviteSettings serverId={serverId} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
