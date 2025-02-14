
import { useEffect, useState } from "react";
import { ServerMember, Profile } from "@/types/server";
import { supabase } from "@/integrations/supabase/client";

interface ServerMembersSettingsProps {
  serverId: string;
}

export const ServerMembersSettings = ({ serverId }: ServerMembersSettingsProps) => {
  const [members, setMembers] = useState<(ServerMember & { profile: Profile })[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from('server_members')
        .select(`
          *,
          profile:profiles(*)
        `)
        .eq('server_id', serverId);

      if (error) {
        console.error('Error fetching members:', error);
        return;
      }

      setMembers(data);
    };

    fetchMembers();

    // Subscribe to member changes
    const channel = supabase
      .channel('members')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'server_members',
          filter: `server_id=eq.${serverId}`
        },
        (payload) => {
          fetchMembers();
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
        <h3 className="text-lg font-medium">Members</h3>
        <p className="text-sm text-text-secondary">
          Manage server members and their roles
        </p>
      </div>

      <div className="space-y-4">
        {/* Member list will be implemented here */}
        <p className="text-sm text-text-secondary">Coming soon...</p>
      </div>
    </div>
  );
};
