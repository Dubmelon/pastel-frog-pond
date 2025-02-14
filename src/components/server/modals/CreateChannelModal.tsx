
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Channel, ChannelType } from "@/types/server";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Hash, Volume2 } from "lucide-react";

interface CreateChannelModalProps {
  serverId: string;
  categoryId: string;
  onChannelCreated: () => void;
  children: React.ReactNode;
}

export const CreateChannelModal = ({ serverId, categoryId, onChannelCreated, children }: CreateChannelModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState<ChannelType>("TEXT");
  const [isNsfw, setIsNsfw] = useState(false);
  const [slowMode, setSlowMode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelName.trim()) {
      toast.error("Please enter a channel name");
      return;
    }

    setIsLoading(true);
    try {
      const { data: maxPositionData } = await supabase
        .from('channels')
        .select('position')
        .eq('category_id', categoryId)
        .order('position', { ascending: false })
        .limit(1);

      const newPosition = maxPositionData?.[0]?.position ?? 0;

      const { error } = await supabase
        .from('channels')
        .insert({
          name: channelName.toLowerCase().replace(/\s+/g, '-'),
          type: channelType,
          category_id: categoryId,
          server_id: serverId,
          position: newPosition + 1,
          settings: {
            nsfw: isNsfw,
            slowmode: slowMode,
            require_verification: false
          }
        });

      if (error) throw error;

      toast.success("Channel created successfully!");
      onChannelCreated();
      setIsOpen(false);
      setChannelName("");
      setChannelType("TEXT");
      setIsNsfw(false);
      setSlowMode(0);
    } catch (error) {
      console.error("Error creating channel:", error);
      toast.error("Failed to create channel");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="channel-type">Channel Type</Label>
              <RadioGroup
                value={channelType}
                onValueChange={(value) => setChannelType(value as ChannelType)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TEXT" id="text" />
                  <Label htmlFor="text" className="flex items-center gap-1">
                    <Hash className="w-4 h-4" /> Text
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="VOICE" id="voice" />
                  <Label htmlFor="voice" className="flex items-center gap-1">
                    <Volume2 className="w-4 h-4" /> Voice
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="channel-name">Channel Name</Label>
              <Input
                id="channel-name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="new-channel"
              />
            </div>

            {channelType === "TEXT" && (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="nsfw">Age-Restricted Channel</Label>
                    <div className="text-sm text-text-secondary">
                      Users must be 18+ to access this channel
                    </div>
                  </div>
                  <Switch
                    id="nsfw"
                    checked={isNsfw}
                    onCheckedChange={setIsNsfw}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slowmode">Slow Mode</Label>
                  <Input
                    id="slowmode"
                    type="number"
                    min="0"
                    max="21600"
                    value={slowMode}
                    onChange={(e) => setSlowMode(parseInt(e.target.value) || 0)}
                    placeholder="Seconds between messages"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Channel"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
