
import { useEffect, useState } from "react";
import { ServerMember, Profile } from "@/types/server";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, UserPlus, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface ServerMembersSettingsProps {
  serverId: string;
}

type MemberWithProfile = {
  member: ServerMember;
  profile: Profile;
};

export const ServerMembersSettings = ({ serverId }: ServerMembersSettingsProps) => {
  const [members, setMembers] = useState<MemberWithProfile[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      // First fetch all members
      const { data: memberData, error: memberError } = await supabase
        .from('server_members')
        .select('*')
        .eq('server_id', serverId);

      if (memberError) {
        console.error('Error fetching members:', memberError);
        return;
      }

      // Then fetch corresponding profiles
      const memberIds = memberData.map(member => member.user_id);
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', memberIds);

      if (profileError) {
        console.error('Error fetching profiles:', profileError);
        return;
      }

      // Transform the data to match our expected types
      const combinedData = memberData.map(member => {
        const profile = profileData.find(p => p.id === member.user_id);
        if (!profile) return null;

        const defaultVoiceSettings = {
          input_device: null,
          output_device: null,
          input_volume: 100,
          output_volume: 100,
          vad_sensitivity: 50,
          noise_suppression: true,
          echo_cancellation: true
        };

        const defaultNotificationPreferences = {
          desktop_notifications: true,
          sound_notifications: true,
          mention_notifications: true,
          message_notifications: "mentions" as const,
          custom_sounds: {}
        };

        const transformedProfile: Profile = {
          id: profile.id,
          username: profile.username,
          avatar_url: profile.avatar_url || null,
          status: profile.status || "OFFLINE",
          custom_status: profile.custom_status || null,
          voice_settings: {
            ...defaultVoiceSettings,
            ...(typeof profile.voice_settings === 'object' ? profile.voice_settings : {})
          },
          notification_preferences: {
            ...defaultNotificationPreferences,
            ...(typeof profile.notification_preferences === 'object' ? profile.notification_preferences : {})
          },
          created_at: profile.created_at || new Date().toISOString(),
          updated_at: profile.updated_at || new Date().toISOString()
        };

        const transformedMember: ServerMember = {
          id: member.id,
          server_id: member.server_id || "",
          user_id: member.user_id || "",
          nickname: member.nickname || null,
          joined_at: member.joined_at || new Date().toISOString(),
          roles: Array.isArray(member.roles) ? member.roles.map(String) : []
        };

        return {
          member: transformedMember,
          profile: transformedProfile
        };
      }).filter((item): item is MemberWithProfile => item !== null);

      setMembers(combinedData);
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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Members</h3>
          <p className="text-sm text-text-secondary">
            Manage server members and their roles
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="w-4 h-4" />
          Add Members
        </Button>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-2">
          {members.map(({ member, profile }) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 rounded-md hover:bg-background-secondary"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={profile.avatar_url || undefined} />
                  <AvatarFallback>
                    {profile.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{profile.username}</p>
                  {member.nickname && (
                    <p className="text-sm text-text-secondary">
                      AKA {member.nickname}
                    </p>
                  )}
                </div>
                {member.roles.length > 0 && (
                  <div className="flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                    <Shield className="w-3 h-3" />
                    {member.roles[0]}
                  </div>
                )}
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Change Nickname</DropdownMenuItem>
                  <DropdownMenuItem>Manage Roles</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
                    Remove from Server
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
