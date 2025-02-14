
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Settings, Mic, Headphones, Volume2, User, Bell } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const UserSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [micVolume, setMicVolume] = useState(80);
  const [outputVolume, setOutputVolume] = useState(100);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>User Settings</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
          <div className="space-y-6 pr-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Profile</h3>
              <div className="flex items-center gap-4">
                <img
                  src="/lovable-uploads/05eb46c8-beec-4402-aa5b-1debbe9d35c0.png"
                  alt="User avatar"
                  className="w-20 h-20 rounded-full"
                />
                <Button>Change Avatar</Button>
              </div>
              <div className="space-y-2">
                <Label>Display Name</Label>
                <Input defaultValue="FroggyUser" />
              </div>
              <div className="space-y-2">
                <Label>Custom Status</Label>
                <Input placeholder="What's happening?" />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Voice Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Mic className="w-4 h-4" />
                      Input Volume
                    </Label>
                    <span className="text-sm text-text-secondary">{micVolume}%</span>
                  </div>
                  <Slider
                    value={[micVolume]}
                    onValueChange={([value]) => setMicVolume(value)}
                    max={100}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      Output Volume
                    </Label>
                    <span className="text-sm text-text-secondary">{outputVolume}%</span>
                  </div>
                  <Slider
                    value={[outputVolume]}
                    onValueChange={([value]) => setOutputVolume(value)}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Enable Desktop Notifications
                  </Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Headphones className="w-4 h-4" />
                    Sounds
                  </Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
