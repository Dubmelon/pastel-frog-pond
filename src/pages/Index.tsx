
import { Sidebar } from "@/components/Sidebar";
import { PostCard } from "@/components/PostCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Image, Smile, Link as LinkIcon } from "lucide-react";

const mockPosts = [
  {
    id: 1,
    avatar: "/placeholder.svg",
    username: "Lily Pad",
    handle: "lilypad",
    content: "Just discovered the most amazing pond spot! Perfect for afternoon meditation 🌿",
    timestamp: "2h ago",
    likes: 42,
    comments: 12,
    shares: 5,
    images: ["/placeholder.svg"],
  },
  {
    id: 2,
    avatar: "/placeholder.svg",
    username: "Hoppy",
    handle: "hopmaster",
    content: "The water is particularly refreshing today. Who's up for a swim? 🌊",
    timestamp: "4h ago",
    likes: 24,
    comments: 8,
    shares: 2,
  },
];

const Index = () => {
  const [newPost, setNewPost] = useState("");
  const { toast } = useToast();

  const handleCreatePost = () => {
    if (!newPost.trim()) {
      toast({
        title: "Can't create empty post",
        description: "Write something to share with the pond!",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Post created!",
      description: "Your thoughts have been shared with the pond.",
    });
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 p-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border border-primary/10">
            <div className="flex gap-3">
              <img
                src="/placeholder.svg"
                alt="Your avatar"
                className="w-10 h-10 rounded-full border-2 border-primary/20"
              />
              <div className="flex-1 space-y-3">
                <Textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's happening in your pond?"
                  className="min-h-[100px] resize-none bg-transparent border-none focus-visible:ring-1 focus-visible:ring-primary/30"
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
                      <Image className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
                      <Smile className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
                      <LinkIcon className="w-5 h-5" />
                    </Button>
                  </div>
                  <Button 
                    onClick={handleCreatePost}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Hop it!
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          {mockPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
