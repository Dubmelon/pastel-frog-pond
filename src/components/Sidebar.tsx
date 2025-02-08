
import { Home, Bell, Mail, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Mail, label: "Messages", path: "/messages" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 p-4">
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <img
            src="/lovable-uploads/b91a5d97-e32a-46cf-a2f2-4cbc6b082417.png"
            alt="Logo"
            className="w-10 h-10"
          />
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-background-secondary hover:text-primary transition-colors"
                >
                  <item.icon className="w-6 h-6" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
          <button className="w-full bg-primary text-white rounded-lg py-3 font-medium hover:bg-primary-hover transition-colors">
            New Post
          </button>
        </div>
      </div>
    </div>
  );
};
