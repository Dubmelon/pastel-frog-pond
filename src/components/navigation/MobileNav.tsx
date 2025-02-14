
import { NavLink } from "./NavLink";
import { NavItem } from "@/types/navigation";

interface MobileNavProps {
  navItems: NavItem[];
  currentPath: string;
}

export const MobileNav = ({ navItems, currentPath }: MobileNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 z-50 pb-safe">
      <div className="flex justify-around items-center px-4 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            item={item}
            isActive={currentPath === item.path}
            variant="mobile"
          />
        ))}
      </div>
    </nav>
  );
};
