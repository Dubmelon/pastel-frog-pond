
import { LucideIcon } from "lucide-react";

export type UserStatus = "ONLINE" | "IDLE" | "DND" | "OFFLINE";
export type ChannelType = "TEXT" | "VOICE";

export interface Server {
  id: string;
  name: string;
  icon_url: string | null;
  owner_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServerMember {
  id: string;
  server_id: string;
  user_id: string;
  nickname: string | null;
  joined_at: string;
}

export interface Category {
  id: string;
  server_id: string;
  name: string;
  position: number;
  channels: Channel[];
  isExpanded?: boolean;
}

export interface Channel {
  id: string;
  server_id: string;
  category_id: string | null;
  name: string;
  type: ChannelType;
  position: number;
  topic: string | null;
  created_at: string;
  updated_at: string;
  unreadCount?: number;
  isActive?: boolean;
}

export interface Message {
  id: string;
  channel_id: string;
  author_id: string | null;
  content: string | null;
  attachments: any[];
  edited_at: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  status: UserStatus;
  custom_status: string | null;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  server_id: string;
  name: string;
  color: string | null;
  position: number;
  permissions: any;
  created_at: string;
}

export interface VoiceState {
  id: string;
  channel_id: string;
  user_id: string;
  muted: boolean;
  deafened: boolean;
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
