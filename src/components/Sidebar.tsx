
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidth = isCollapsed ? "w-20" : "w-64";
  const showLabels = !isCollapsed;

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
        className={`${sidebarWidth} h-screen bg-white/80 backdrop-blur-md border-r border-gray-200 fixed left-0 top-0 transition-all duration-300 ease-in-out transform
          ${isMobile ? (isCollapsed ? "-translate-x-full" : "translate-x-0") : "translate-x-0"}
          z-40`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="mb-8 flex items-center justify-between">
            <img
              src="/lovable-uploads/b91a5d97-e32a-46cf-a2f2-4cbc6b082417.png"
              alt="Logo"
              className={`${isCollapsed ? 'w-10 h-10' : 'w-12 h-12'} transition-all duration-300 hover:scale-105`}
            />
            {!isMobile && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-xl hover:bg-background-secondary transition-colors"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <Menu className="w-5 h-5 text-text-secondary" />
              </button>
            )}
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className={`flex items-center ${showLabels ? 'space-x-3' : 'justify-center'} px-4 py-3 rounded-xl text-text-secondary transition-all duration-200 group
                        ${isActive
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-background-secondary hover:text-primary"
                        }`}
                    >
                      <item.icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} transition-all duration-300`} />
                      {showLabels && (
                        <span className="font-medium truncate transition-all duration-300">
                          {item.label}
                        </span>
                      )}
                      {isCollapsed && (
                        <span className="sr-only">{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto pt-4">
            <button 
              className={`w-full bg-primary text-white rounded-xl py-3 font-medium hover:bg-primary-hover transition-colors
                ${isCollapsed ? 'px-2' : 'px-4'}`}
            >
              {isCollapsed ? "+" : "New Post"}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`transition-all duration-300 ease-in-out
          ${isMobile ? 'ml-0' : (isCollapsed ? 'ml-20' : 'ml-64')}`}
      >
        {/* This div pushes content to accommodate the sidebar */}
      </div>
    </>
  );
};
