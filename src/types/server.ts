
import { LucideIcon } from "lucide-react";

export interface Server {
  id: string;
  name: string;
  icon: string;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  type: "TEXT" | "VOICE";
  channels: Channel[];
  isExpanded: boolean;
}

export interface Channel {
  id: string;
  name: string;
  type: "text" | "voice";
  categoryId: string;
  unreadCount?: number;
  isActive?: boolean;
}

export interface ServerMember {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "idle" | "dnd" | "offline";
  customStatus?: string;
}
