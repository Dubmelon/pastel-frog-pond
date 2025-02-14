
import { UserAvatar } from "./UserAvatar";
import { Hash, Users, Pin, Bell, Send, Plus, Smile } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ServerContentProps {
  serverId: string | null;
  channelId: string | null;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
}

// Mock messages - in real app would come from API
const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hey everyone! Welcome to our new server! 🐸",
    timestamp: "2024-02-20T10:00:00Z",
    author: {
      id: "1",
      name: "FroggyAdmin",
      avatar: "/lovable-uploads/05eb46c8-beec-4402-aa5b-1debbe9d35c0.png"
    }
  },
  {
    id: "2",
    content: "Thanks for having us! This place looks amazing!",
    timestamp: "2024-02-20T10:05:00Z",
    author: {
      id: "2",
      name: "HoppyUser",
      avatar: "/lovable-uploads/b91a5d97-e32a-46cf-a2f2-4cbc6b082417.png"
    }
  }
];

export const ServerContent = ({ serverId, channelId }: ServerContentProps) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  if (!serverId || !channelId) {
    return (
      <div className="flex-1 flex items-center justify-center text-text-secondary">
        Select a channel to start chatting
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date().toISOString(),
      author: {
        id: "1",
        name: "FroggyUser",
        avatar: "/lovable-uploads/05eb46c8-beec-4402-aa5b-1debbe9d35c0.png"
      }
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="h-12 px-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-text-secondary"><Hash className="w-5 h-5" /></span>
          <h3 className="font-semibold">general</h3>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-text-secondary hover:text-text cursor-pointer" />
          <Pin className="w-5 h-5 text-text-secondary hover:text-text cursor-pointer" />
          <Users className="w-5 h-5 text-text-secondary hover:text-text cursor-pointer" />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {messages.length === 0 ? (
            <WelcomeMessage />
          ) : (
            messages.map((message) => (
              <div key={message.id} className="flex gap-4 group">
                <img
                  src={message.author.avatar}
                  alt={message.author.name}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium">{message.author.name}</span>
                    <span className="text-xs text-text-tertiary">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-text-secondary mt-1">{message.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <form onSubmit={handleSendMessage} className="relative">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Message #general"
            className="pr-24"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              type="button"
              className="p-2 hover:bg-background-secondary rounded-full transition-colors"
            >
              <Plus className="w-5 h-5 text-text-secondary" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-background-secondary rounded-full transition-colors"
            >
              <Smile className="w-5 h-5 text-text-secondary" />
            </button>
            <button
              type="submit"
              className="p-2 hover:bg-background-secondary rounded-full transition-colors"
            >
              <Send className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const WelcomeMessage = () => {
  return (
    <div className="rounded-xl bg-background-secondary/50 p-6">
      <h2 className="text-2xl font-semibold mb-4">Welcome to #general! 🐸</h2>
      <p className="text-text-secondary mb-6">
        This is the start of the #general channel. Say hi to your fellow frogs!
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {welcomeCards.map((card) => (
          <div
            key={card.title}
            className="p-4 rounded-lg bg-background hover:bg-background-secondary transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 text-primary mb-3">{card.icon}</div>
            <h3 className="font-medium mb-2">{card.title}</h3>
            <p className="text-sm text-text-secondary">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const welcomeCards = [
  {
    icon: "👋",
    title: "Say Hello",
    description: "Break the ice and introduce yourself to the community",
  },
  {
    icon: "🎨",
    title: "Customize Your Profile",
    description: "Make your profile unique with a custom avatar and status",
  },
  {
    icon: "🤝",
    title: "Invite Friends",
    description: "Share this server with your friends and grow the community",
  },
  {
    icon: "📝",
    title: "Server Rules",
    description: "Check out our community guidelines to keep things friendly",
  },
];
