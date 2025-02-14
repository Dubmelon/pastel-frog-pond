
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChannelPin, Message } from "@/types/server";
import { Pin, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PinnedMessagesProps {
  channelId: string;
  onClose: () => void;
}

type PinnedMessage = ChannelPin & {
  message: Message;
};

export const PinnedMessages = ({ channelId, onClose }: PinnedMessagesProps) => {
  const [pinnedMessages, setPinnedMessages] = useState<PinnedMessage[]>([]);

  useEffect(() => {
    const fetchPinnedMessages = async () => {
      const { data, error } = await supabase
        .from('channel_pins')
        .select(`
          *,
          message:messages(*)
        `)
        .eq('channel_id', channelId)
        .order('pinned_at', { ascending: false });

      if (error) {
        console.error('Error fetching pinned messages:', error);
        return;
      }

      setPinnedMessages(data as PinnedMessage[]);
    };

    fetchPinnedMessages();

    // Subscribe to changes
    const channel = supabase
      .channel('pinned-messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'channel_pins',
          filter: `channel_id=eq.${channelId}`
        },
        () => {
          fetchPinnedMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelId]);

  const handleUnpin = async (pinId: string) => {
    const { error } = await supabase
      .from('channel_pins')
      .delete()
      .eq('id', pinId);

    if (error) {
      toast.error("Failed to unpin message");
      return;
    }

    toast.success("Message unpinned");
  };

  return (
    <div className="w-72 bg-background border-l border-border flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pin className="w-4 h-4" />
          <h3 className="font-semibold">Pinned Messages</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {pinnedMessages.map((pin) => (
            <div key={pin.id} className="bg-background-secondary rounded-lg p-3 relative group">
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleUnpin(pin.id)}
                >
                  <Pin className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-text-secondary mb-1">
                Pinned {new Date(pin.pinned_at).toLocaleDateString()}
              </p>
              <p className="text-sm">{pin.message.content}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
