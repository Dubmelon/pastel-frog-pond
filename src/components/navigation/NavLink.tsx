
import { Link } from "react-router-dom";
import { NavItem } from "@/types/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  variant: "desktop" | "mobile";
}

export const NavLink = ({ item, isActive, variant }: NavLinkProps) => {
  const commonStyles = cn(
    "transition-colors",
    isActive ? "text-primary" : "text-text-secondary hover:text-primary"
  );

  if (variant === "desktop") {
    return (
      <Link
        to={item.path}
        className={cn(
          commonStyles,
          "flex items-center justify-center px-3 py-3 rounded-xl transition-all duration-200 group",
          isActive && "bg-primary/10"
        )}
      >
        <item.icon className="w-6 h-6 transition-all duration-300" />
        <span className="sr-only">{item.label}</span>
      </Link>
    );
  }

  return (
    <Link
      to={item.path}
      className={cn(commonStyles, "flex flex-col items-center p-2 rounded-lg")}
    >
      <item.icon className="w-6 h-6 mb-1" />
      <span className="text-xs">{item.label}</span>
    </Link>
  );
};
