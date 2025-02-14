import { LucideIcon } from "lucide-react";

export type UserStatus = "ONLINE" | "IDLE" | "DND" | "OFFLINE";
export type ChannelType = "TEXT" | "VOICE" | "ANNOUNCEMENT";

export interface Server {
  id: string;
  name: string;
  icon_url: string | null;
  owner_id: string | null;
  created_at: string;
  updated_at: string;
  metadata?: {
    boost_status: null | {
      level: number;
      count: number;
    };
    verification_level: number;
    features: {
      community: boolean;
      welcome_screen: {
        enabled: boolean;
        description: string | null;
        welcome_channels: Array<{
          channel_id: string;
          description: string;
        }>;
      };
    };
  };
}

export interface ServerMember {
  id: string;
  server_id: string;
  user_id: string;
  nickname: string | null;
  joined_at: string;
  roles: string[];
}

export interface Category {
  id: string;
  server_id: string;
  name: string;
  position: number;
  channels: Channel[];
  isExpanded?: boolean;
  collapsed?: boolean;
}

export interface Channel {
  id: string;
  server_id: string;
  category_id: string | null;
  name: string;
  type: ChannelType;
  position: number;
  topic: string | null;
  settings: {
    slowmode: number;
    nsfw: boolean;
    require_verification: boolean;
  } | null;
  created_at: string;
  updated_at: string;
  unreadCount?: number;
  isActive?: boolean;
}

export interface ChannelPin {
  id: string;
  channel_id: string;
  message_id: string;
  pinned_by: string;
  pinned_at: string;
}

export interface ChannelMemberState {
  id: string;
  channel_id: string;
  user_id: string;
  last_read_at: string;
  mention_count: number;
  muted: boolean;
  created_at: string;
}

export interface Message {
  id: string;
  channel_id: string;
  author_id: string | null;
  content: string | null;
  attachments: any[];
  thread_id: string | null;
  reply_count: number;
  edited_at: string | null;
  created_at: string;
}

export interface MessageEdit {
  id: string;
  message_id: string;
  content: string;
  edited_at: string;
}

export interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  status: UserStatus;
  custom_status: string | null;
  voice_settings: {
    input_device: string | null;
    output_device: string | null;
    input_volume: number;
    output_volume: number;
    vad_sensitivity: number;
    noise_suppression: boolean;
    echo_cancellation: boolean;
  };
  notification_preferences: {
    desktop_notifications: boolean;
    sound_notifications: boolean;
    mention_notifications: boolean;
    message_notifications: "all" | "mentions" | "none";
    custom_sounds: Record<string, string>;
  };
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  server_id: string;
  name: string;
  color: string | null;
  position: number;
  permissions: {
    // Server permissions
    MANAGE_SERVER: boolean;
    MANAGE_ROLES: boolean;
    MANAGE_CHANNELS: boolean;
    MANAGE_INVITES: boolean;
    KICK_MEMBERS: boolean;
    BAN_MEMBERS: boolean;
    // Channel permissions
    VIEW_CHANNEL: boolean;
    SEND_MESSAGES: boolean;
    EMBED_LINKS: boolean;
    ATTACH_FILES: boolean;
    ADD_REACTIONS: boolean;
    USE_EXTERNAL_EMOJIS: boolean;
    MENTION_ROLES: boolean;
    MANAGE_MESSAGES: boolean;
    READ_MESSAGE_HISTORY: boolean;
    CONNECT: boolean;
    SPEAK: boolean;
    VIDEO: boolean;
    USE_VOICE_ACTIVITY: boolean;
    PRIORITY_SPEAKER: boolean;
  };
  created_at: string;
}

export interface ChannelRolePermission {
  id: string;
  channel_id: string;
  role_id: string;
  permissions: Partial<Role['permissions']>;
  created_at: string;
}

export interface VoiceState {
  id: string;
  channel_id: string;
  user_id: string;
  muted: boolean;
  deafened: boolean;
  screen_share: boolean;
  video_enabled: boolean;
  joined_at: string;
}

export interface Invite {
  id: string;
  server_id: string;
  creator_id: string | null;
  code: string;
  max_uses: number | null;
  expires_at: string | null;
  created_at: string;
  uses: number;
}
