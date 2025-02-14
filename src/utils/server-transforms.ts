
import { Json } from "@/integrations/supabase/types";
import { ServerMetadata } from "@/types/server";

export const transformServerMetadata = (metadata: Json): ServerMetadata => {
  const meta = metadata as Record<string, any>;
  return {
    boost_status: meta?.boost_status ?? null,
    verification_level: meta?.verification_level ?? 0,
    features: {
      community: meta?.features?.community ?? false,
      welcome_screen: {
        enabled: meta?.features?.welcome_screen?.enabled ?? false,
        description: meta?.features?.welcome_screen?.description ?? null,
        welcome_channels: meta?.features?.welcome_screen?.welcome_channels ?? []
      }
    }
  };
};
