
import { Sidebar } from "@/components/Sidebar";
import { PostCard } from "@/components/PostCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Image, Smile, Link as LinkIcon, TrendingUp, Hash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const trendingTopics = [
  { topic: "PondLife", posts: "2.4k" },
  { topic: "FrogMeet2024", posts: "1.8k" },
  { topic: "LilyPadTips", posts: "956" },
  { topic: "RibbitChat", posts: "784" },
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
      <main className="ml-64 grid grid-cols-[1fr,320px] gap-6 p-6">
        <div className="space-y-4">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border border-primary/10 animate-fade-in">
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
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-primary hover:text-primary/80 hover:bg-primary/10"
                    >
                      <Image className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-primary hover:text-primary/80 hover:bg-primary/10"
                    >
                      <Smile className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-primary hover:text-primary/80 hover:bg-primary/10"
                    >
                      <LinkIcon className="w-5 h-5" />
                    </Button>
                  </div>
                  <Button 
                    onClick={handleCreatePost}
                    className="bg-primary hover:bg-primary/90 text-white font-medium px-6"
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

        <div className="space-y-4">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border border-primary/10">
            <h2 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              Trending in the Pond
            </h2>
            <ScrollArea className="h-[300px] pr-4">
              {trendingTopics.map((item, index) => (
                <div 
                  key={index}
                  className="py-3 group cursor-pointer hover:bg-background-secondary rounded-lg px-2 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-text-tertiary text-sm">
                        <Hash className="w-4 h-4" />
                        {item.topic}
                      </div>
                      <p className="text-sm text-text-tertiary mt-1">
                        {item.posts} posts
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
