
import { useState } from "react";
import { ServerList } from "./ServerList";
import { ChannelSidebar } from "./ChannelSidebar";
import { ServerContent } from "./ServerContent";
import { useIsMobile } from "@/hooks/use-mobile";

export const ServerLayout = () => {
  const [activeServerId, setActiveServerId] = useState<string | null>(null);
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <ServerList
        activeServerId={activeServerId}
        onServerSelect={setActiveServerId}
      />
      
      {(!isMobile || activeServerId) && (
        <ChannelSidebar
          serverId={activeServerId}
          activeChannelId={activeChannelId}
          onChannelSelect={setActiveChannelId}
        />
      )}
      
      {(!isMobile || activeChannelId) && (
        <ServerContent
          serverId={activeServerId}
          channelId={activeChannelId}
        />
      )}
    </div>
  );
};
