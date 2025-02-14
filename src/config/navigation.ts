
import { LayoutDashboard, Bell, Mail, Settings, User, FolderGit2 } from "lucide-react";
import { NavItem } from "@/types/navigation";

export const mainNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Mail, label: "Messages", path: "/messages" },
  { icon: FolderGit2, label: "Servers", path: "/servers" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
];
