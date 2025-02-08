
import { Home, Bell, Mail, Settings, User, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Mail, label: "Messages", path: "/messages" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed top-4 left-4 z-50 p-2 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 hover:bg-background-secondary transition-colors md:hidden"
        aria-label="Toggle menu"
      >
        <Menu className="w-5 h-5 text-text-secondary" />
      </button>

      <div 
        className={`w-20 h-screen bg-white/80 backdrop-blur-md border-r border-gray-200 fixed left-0 top-0 transition-all duration-300 ease-in-out transform
          ${isMobile ? (isCollapsed ? "-translate-x-full" : "translate-x-0") : "translate-x-0"}
          z-40`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="mb-8 flex items-center justify-center">
            <img
              src="/lovable-uploads/b91a5d97-e32a-46cf-a2f2-4cbc6b082417.png"
              alt="Logo"
              className="w-10 h-10 transition-all duration-300 hover:scale-105"
            />
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className={`flex items-center justify-center px-3 py-3 rounded-xl text-text-secondary transition-all duration-200 group
                        ${isActive
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-background-secondary hover:text-primary"
                        }`}
                    >
                      <item.icon className="w-6 h-6 transition-all duration-300" />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto">
            <button 
              className="w-full bg-primary text-white rounded-xl py-3 px-2 font-medium hover:bg-primary-hover transition-colors flex items-center justify-center"
            >
              <span>+</span>
              <span className="sr-only">New Post</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
