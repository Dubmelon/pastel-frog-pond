
import { useEffect, useState } from "react";
import { Role } from "@/types/server";
import { supabase } from "@/integrations/supabase/client";

interface ServerRolesSettingsProps {
  serverId: string;
}

export const ServerRolesSettings = ({ serverId }: ServerRolesSettingsProps) => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .eq('server_id', serverId)
        .order('position');

      if (error) {
        console.error('Error fetching roles:', error);
        return;
      }

      setRoles(data);
    };

    fetchRoles();

    // Subscribe to role changes
    const channel = supabase
      .channel('roles')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'roles',
          filter: `server_id=eq.${serverId}`
        },
        (payload) => {
          fetchRoles();
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
        <h3 className="text-lg font-medium">Roles & Permissions</h3>
        <p className="text-sm text-text-secondary">
          Manage server roles and their permissions
        </p>
      </div>

      <div className="space-y-4">
        {/* Role list will be implemented here */}
        <p className="text-sm text-text-secondary">Coming soon...</p>
      </div>
    </div>
  );
};
