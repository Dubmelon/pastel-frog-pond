
import { Link } from "react-router-dom";
import { NavLink } from "./NavLink";
import { NavItem } from "@/types/navigation";

interface DesktopNavProps {
  navItems: NavItem[];
  currentPath: string;
}

export const DesktopNav = ({ navItems, currentPath }: DesktopNavProps) => {
  return (
    <div className="w-20 h-screen bg-white/80 backdrop-blur-md border-r border-gray-200 fixed left-0 top-0 z-40">
      <div className="flex flex-col h-full p-4">
        <Link to="/" className="mb-8 flex items-center justify-center">
          <img
            src="/lovable-uploads/05eb46c8-beec-4402-aa5b-1debbe9d35c0.png"
            alt="Cute frog logo"
            className="w-10 h-10 transition-all duration-300 hover:scale-105"
          />
        </Link>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink 
                  item={item}
                  isActive={currentPath === item.path}
                  variant="desktop"
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto">
          <Link 
            to="/create-post"
            className="w-full bg-primary text-white rounded-xl py-3 px-2 font-medium hover:bg-primary-hover transition-colors flex items-center justify-center"
          >
            <span>+</span>
            <span className="sr-only">New Post</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
