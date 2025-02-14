
import { useState } from "react";
import { Server } from "@/types/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

interface ServerGeneralSettingsProps {
  server: Server;
}

export const ServerGeneralSettings = ({ server }: ServerGeneralSettingsProps) => {
  const [name, setName] = useState(server.name);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpdateServer = async () => {
    const { error } = await supabase
      .from('servers')
      .update({ name })
      .eq('id', server.id);

    if (error) {
      toast.error("Failed to update server name");
      return;
    }

    toast.success("Server name updated");
  };

  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${server.id}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('server-icons')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('server-icons')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('servers')
        .update({ icon_url: publicUrl })
        .eq('id', server.id);

      if (updateError) throw updateError;

      toast.success("Server icon updated");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to upload server icon");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveIcon = async () => {
    if (!server.icon_url) return;

    try {
      const { error: updateError } = await supabase
        .from('servers')
        .update({ icon_url: null })
        .eq('id', server.id);

      if (updateError) throw updateError;

      toast.success("Server icon removed");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to remove server icon");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Server Overview</h3>
        <p className="text-sm text-text-secondary">
          Manage your server's basic information
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Server Icon</Label>
          <div className="mt-2 flex items-center gap-4">
            <div className="relative w-24 h-24">
              {server.icon_url ? (
                <img
                  src={server.icon_url}
                  alt={server.name}
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-background-secondary flex items-center justify-center">
                  <span className="text-3xl text-text-secondary">
                    {server.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              {server.icon_url && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={handleRemoveIcon}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div>
              <Label htmlFor="icon-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 text-sm text-primary hover:text-primary/80">
                  <Upload className="h-4 w-4" />
                  Upload Image
                </div>
              </Label>
              <input
                id="icon-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleIconUpload}
                disabled={isUploading}
              />
              <p className="mt-1 text-xs text-text-secondary">
                Recommended size: 512x512px
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="server-name">Server Name</Label>
          <Input
            id="server-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
          />
        </div>

        <Button
          onClick={handleUpdateServer}
          disabled={name === server.name || name.length < 1}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};
