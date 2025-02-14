
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServerGeneralSettings } from "@/components/server/settings/tabs/ServerGeneralSettings";
import { ServerRolesSettings } from "@/components/server/settings/tabs/ServerRolesSettings";
import { ServerMembersSettings } from "@/components/server/settings/tabs/ServerMembersSettings";
import { ServerInviteSettings } from "@/components/server/settings/tabs/ServerInviteSettings";
import { Server, ServerMetadata } from "@/types/server";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

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

      const transformServerMetadata = (metadata: Json): ServerMetadata => {
        const meta = metadata as Record<string, any>;
        return {
          boost_status: meta?.boost_status ?? null,
          verification_level: meta?.verification_level ?? 0,
          features: {
            community: meta?.features?.community ?? false,
            welcome_screen: {
              enabled: meta?.features?.welcome_screen?.enabled ?? false,
              description: meta?.features?.welcome_screen?.description ?? null,
              welcome_channels: meta?.features?.welcome_screen?.welcome_channels ?? []
            }
          }
        };
      };

      const transformedServer: Server = {
        ...data,
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
            setServer({
              ...newData,
              metadata: transformServerMetadata(newData.metadata)
            });
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
