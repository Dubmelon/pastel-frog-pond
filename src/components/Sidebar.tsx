
import { Home, Bell, Mail, Settings, User, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
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
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 z-50 pb-safe">
          <div className="flex justify-around items-center px-4 py-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex flex-col items-center p-2 rounded-lg transition-colors
                    ${isActive 
                      ? "text-primary" 
                      : "text-text-secondary hover:text-primary"
                    }`}
                >
                  <item.icon className="w-6 h-6 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
};
