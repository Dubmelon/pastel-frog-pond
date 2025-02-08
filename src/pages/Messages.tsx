
import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Search, Send } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const mockChats = [
  {
    id: 1,
    user: "Hoppy",
    lastMessage: "Ready for tonight's pond gathering?",
    time: "2h ago",
    avatar: "/placeholder.svg",
    unread: 2,
  },
  {
    id: 2,
    user: "TadpoleTom",
    lastMessage: "The water is perfect today!",
    time: "5h ago",
    avatar: "/placeholder.svg",
    unread: 0,
  },
];

const Messages = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className={`${isMobile ? 'ml-0' : 'ml-20'} transition-all duration-300 grid grid-cols-1 md:grid-cols-[320px,1fr] h-screen`}>
        <div className="border-r border-border bg-background-secondary/50">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <Input
                placeholder="Search messages"
                className="pl-9"
              />
            </div>
          </div>
          <div className="space-y-1">
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                className="w-full p-4 hover:bg-background-secondary transition-colors text-left flex items-start space-x-3"
              >
                <img
                  src={chat.avatar}
                  alt={chat.user}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{chat.user}</span>
                    <span className="text-sm text-text-tertiary">{chat.time}</span>
                  </div>
                  <p className="text-sm text-text-secondary truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                    {chat.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col h-full bg-background">
          <div className="flex-1 p-6 flex items-center justify-center text-text-tertiary">
            Select a conversation to start messaging
          </div>
          <div className="p-4 border-t border-border bg-background-secondary/50">
            <div className="relative max-w-3xl mx-auto">
              <Input
                placeholder="Type a message..."
                className="pr-12"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-background-secondary rounded-full transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
