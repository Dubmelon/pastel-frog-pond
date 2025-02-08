
import { Sidebar } from "@/components/Sidebar";
import { Bell, Settings } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    type: "like",
    user: "Hoppy",
    action: "liked your lily pad photo",
    time: "2h ago",
    read: false,
  },
  {
    id: 2,
    type: "mention",
    user: "TadpoleTom",
    action: "mentioned you in Pond Chat",
    time: "5h ago",
    read: true,
  },
  {
    id: 3,
    type: "follow",
    user: "LilyPadLover",
    action: "started following you",
    time: "1d ago",
    read: true,
  },
];

const Notifications = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 p-6">
        <div className="max-w-2xl mx-auto">
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
