
import { useEffect, useState } from "react";
import { Invite } from "@/types/server";
import { supabase } from "@/integrations/supabase/client";

interface ServerInviteSettingsProps {
  serverId: string;
}

export const ServerInviteSettings = ({ serverId }: ServerInviteSettingsProps) => {
  const [invites, setInvites] = useState<Invite[]>([]);

  useEffect(() => {
    const fetchInvites = async () => {
      const { data, error } = await supabase
        .from('invites')
        .select('*')
        .eq('server_id', serverId);

      if (error) {
        console.error('Error fetching invites:', error);
        return;
      }

      setInvites(data);
    };

    fetchInvites();

    // Subscribe to invite changes
    const channel = supabase
      .channel('invites')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'invites',
          filter: `server_id=eq.${serverId}`
        },
        (payload) => {
          fetchInvites();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverId]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Invites</h3>
        <p className="text-sm text-text-secondary">
          Manage server invites
        </p>
      </div>

      <div className="space-y-4">
        {/* Invite list will be implemented here */}
        <p className="text-sm text-text-secondary">Coming soon...</p>
      </div>
    </div>
  );
};
