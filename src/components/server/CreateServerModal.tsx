
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";

interface CreateServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateServerModal = ({ isOpen, onClose }: CreateServerModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverName, setServerName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serverName.trim()) {
      toast.error("Please enter a server name");
      return;
    }

    setIsLoading(true);
    try {
      // Get the current user's ID
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) throw new Error("Not authenticated");

      let iconUrl = null;

      // If we have an image, upload it first
      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('server-icons')
          .upload(filePath, selectedImage);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('server-icons')
          .getPublicUrl(filePath);

        iconUrl = publicUrl;
      }

      // Create server
      const { data: serverId, error: serverError } = await supabase.rpc(
        'create_server',
        { 
          server_name: serverName,
          user_id: user.id
        }
      );

      if (serverError) throw serverError;

      // Update server with icon URL if we have one
      if (iconUrl) {
        const { error: updateError } = await supabase
          .from('servers')
          .update({ icon_url: iconUrl })
          .eq('id', serverId);

        if (updateError) throw updateError;
      }

      toast.success("Server created successfully!");
      onClose();
    } catch (error) {
      console.error('Error creating server:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create server");
      }
    } finally {
      setIsLoading(false);
      setServerName("");
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#FAFAF8] border-[#E6E4DD]">
        <DialogHeader>
          <DialogTitle className="text-[#3A3935]">Create a New Server</DialogTitle>
          <DialogDescription className="text-[#828179]">
            Create a new server to start chatting with your friends
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[#3A3935]">Server Icon</Label>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full bg-[#F6F1EB] flex items-center justify-center overflow-hidden group">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Server icon preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload className="w-6 h-6 text-[#828179]" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-sm text-[#828179]">
                <p>Recommended size: 128x128px</p>
                <p>Max size: 5MB</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="serverName" className="text-[#3A3935]">Server Name</Label>
            <Input
              id="serverName"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              placeholder="Enter server name"
              maxLength={100}
              className="bg-white border-[#E6E4DD] focus:ring-[#7EBF8E] focus:border-[#7EBF8E]"
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="border-[#E6E4DD] text-[#828179] hover:bg-[#F6F1EB] hover:text-[#3A3935]"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-[#7EBF8E] hover:bg-[#7EBF8E]/90 text-white"
            >
              {isLoading ? "Creating..." : "Create Server"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
