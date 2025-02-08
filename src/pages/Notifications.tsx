
import { Sidebar } from "@/components/Sidebar";
import { Bell, Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const mockNotifications = [
  {
    id: 1,
    type: "like",
    user: "Hoppy",
    action: "liked your post about React components",
    time: "2h ago",
    avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=64&h=64&fit=crop&crop=faces",
    read: false,
  },
  {
    id: 2,
    type: "mention",
    user: "TadpoleTom",
    action: "mentioned you in Web Development Discussion",
    time: "5h ago",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=64&h=64&fit=crop&crop=faces",
    read: true,
  },
  {
    id: 3,
    type: "follow",
    user: "WebDev Wizard",
    action: "started following you",
    time: "1d ago",
    avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=64&h=64&fit=crop&crop=faces",
    read: true,
  },
  {
    id: 4,
    type: "like",
    user: "DesignFrog",
    action: "liked your UI design showcase",
    time: "2d ago",
    avatar: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=64&h=64&fit=crop&crop=faces",
    read: true,
  },
];

const Notifications = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className={`${isMobile ? 'ml-0' : 'ml-20'} transition-all duration-300`}>
        <div className="max-w-2xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <button className="p-2 hover:bg-background-secondary rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-2">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg ${
                  notification.read ? "bg-white" : "bg-primary/5"
                } hover:bg-background-secondary transition-colors`}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-text-secondary">
                      <span className="font-semibold text-text">
                        {notification.user}
                      </span>{" "}
                      {notification.action}
                    </p>
                    <span className="text-sm text-text-tertiary">
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
