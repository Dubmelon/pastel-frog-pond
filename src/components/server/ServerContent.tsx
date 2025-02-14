
import { UserAvatar } from "./UserAvatar";

interface ServerContentProps {
  serverId: string | null;
  channelId: string | null;
}

export const ServerContent = ({ serverId, channelId }: ServerContentProps) => {
  if (!serverId || !channelId) {
    return (
      <div className="flex-1 flex items-center justify-center text-text-secondary">
        Select a channel to start chatting
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="h-12 px-4 flex items-center gap-2 border-b border-border">
        <span className="text-text-secondary">#</span>
        <h3 className="font-semibold">general</h3>
      </div>

      <div className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <WelcomeMessage />
        </div>
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
            <card.icon className="w-8 h-8 text-primary mb-3" />
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
    icon: () => "👋",
    title: "Say Hello",
    description: "Break the ice and introduce yourself to the community",
  },
  {
    icon: () => "🎨",
    title: "Customize Your Profile",
    description: "Make your profile unique with a custom avatar and status",
  },
  {
    icon: () => "🤝",
    title: "Invite Friends",
    description: "Share this server with your friends and grow the community",
  },
  {
    icon: () => "📝",
    title: "Server Rules",
    description: "Check out our community guidelines to keep things friendly",
  },
];
