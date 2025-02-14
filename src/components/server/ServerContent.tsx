
import { UserAvatar } from "./UserAvatar";
import { Hash, Users, Pin, Bell, Settings, Upload, UserPlus, Shield, Copy, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useState } from "react";

interface ServerContentProps {
  serverId: string | null;
  channelId: string | null;
}

export const ServerContent = ({ serverId, channelId }: ServerContentProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  if (!serverId || !channelId) {
    return (
      <div className="flex-1 flex items-center justify-center text-text-secondary">
        Select a channel to start chatting
      </div>
    );
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText(`https://example.com/invite/${serverId}`);
    toast.success("Invite link copied to clipboard!");
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
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Server Settings</DialogTitle>
                <DialogDescription>
                  Customize your server's appearance and functionality
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6 pb-4">
                  <div className="space-y-2">
                    <Label>Server Icon</Label>
                    <div className="flex items-center gap-4">
                      <img
                        src="/lovable-uploads/05eb46c8-beec-4402-aa5b-1debbe9d35c0.png"
                        alt="Server icon"
                        className="w-16 h-16 rounded-full"
                      />
                      <Button variant="outline" className="gap-2">
                        <Upload className="w-4 h-4" />
                        Upload New Icon
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Server Name</Label>
                    <Input defaultValue="Froggy Server" />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="flex items-center justify-between">
                      Roles
                      <Button variant="outline" size="sm" className="gap-2">
                        <Shield className="w-4 h-4" />
                        Create Role
                      </Button>
                    </Label>
                    {["Admin", "Moderator", "Member"].map((role) => (
                      <div
                        key={role}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-background-secondary cursor-pointer group"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            role === "Admin" ? "bg-primary" :
                            role === "Moderator" ? "bg-purple-500" :
                            "bg-gray-400"
                          }`} />
                          <span>{role}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Invite People</Label>
                    <div className="flex gap-2">
                      <Input
                        readOnly
                        value="https://example.com/invite/123"
                        className="bg-background-secondary"
                      />
                      <Button onClick={copyInviteLink} className="gap-2">
                        <Copy className="w-4 h-4" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
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
      <div className="flex items-center gap-4 mb-6">
        <img
          src="/lovable-uploads/05eb46c8-beec-4402-aa5b-1debbe9d35c0.png"
          alt="Server icon"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-semibold">Welcome to Froggy Server! 🐸</h2>
          <p className="text-text-secondary">
            This is the beginning of something special
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {welcomeCards.map((card) => (
          <button
            key={card.title}
            onClick={card.onClick}
            className="p-4 rounded-lg bg-background hover:bg-background-secondary transition-all duration-200 cursor-pointer group text-left"
          >
            <div className="w-8 h-8 text-primary mb-3">{card.icon}</div>
            <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
              {card.title}
            </h3>
            <p className="text-sm text-text-secondary">{card.description}</p>
          </button>
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
    onClick: () => {
      toast.success("Why not start with a friendly 'ribbit'? 🐸");
    }
  },
  {
    icon: "🎨",
    title: "Customize Your Profile",
    description: "Make your profile unique with a custom avatar and status",
    onClick: () => {
      toast("Opening profile settings...");
    }
  },
  {
    icon: "🤝",
    title: "Invite Friends",
    description: "Share this server with your friends and grow the community",
    onClick: () => {
      navigator.clipboard.writeText("https://example.com/invite/123");
      toast.success("Invite link copied to clipboard!");
    }
  },
  {
    icon: "📝",
    title: "Server Rules",
    description: "Check out our community guidelines to keep things friendly",
    onClick: () => {
      toast("Opening server rules...");
    }
  },
];
