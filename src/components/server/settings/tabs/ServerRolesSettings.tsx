
import { useEffect, useState } from "react";
import { Role } from "@/types/server";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Plus, ChevronRight } from "lucide-react";

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

      // Transform the data to match our Role type
      const transformedRoles = data.map(role => ({
        ...role,
        permissions: role.permissions as Role['permissions'] // Cast JSON to our permissions type
      }));

      setRoles(transformedRoles);
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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Roles & Permissions</h3>
          <p className="text-sm text-text-secondary">
            Manage server roles and their permissions
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Role
        </Button>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-2">
          {roles.map((role) => (
            <div
              key={role.id}
              className="flex items-center justify-between p-3 rounded-md hover:bg-background-secondary cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Shield 
                  className="w-5 h-5" 
                  style={{ color: role.color || '#94A3B8' }}
                />
                <span className="font-medium">{role.name}</span>
                <span className="text-sm text-text-secondary">
                  {role.position} members
                </span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
