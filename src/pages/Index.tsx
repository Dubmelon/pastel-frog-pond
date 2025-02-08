
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
    <div className="min-h-screen bg-gradient-to-br from-background to-background-secondary">
      <Sidebar />
      <main className="ml-64 grid grid-cols-[1fr,320px] gap-6 p-6">
        <div className="space-y-4">
          <Card className="overflow-hidden glass">
            <div className="p-4">
              <div className="flex gap-3">
                <div className="relative group">
                  <img
                    src="/placeholder.svg"
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full border-2 border-primary/20 group-hover:border-primary transition-colors"
                  />
                  <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1 space-y-3">
                  <Textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What's happening in your pond?"
                    className="min-h-[100px] resize-none bg-transparent border-none focus-visible:ring-1 focus-visible:ring-primary/30 placeholder:text-text-tertiary"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="relative hover:bg-primary/10 text-primary transition-colors"
                      >
                        <Image className="w-5 h-5" />
                        <span className="sr-only">Add image</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="relative hover:bg-primary/10 text-primary transition-colors"
                      >
                        <Smile className="w-5 h-5" />
                        <span className="sr-only">Add emoji</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="relative hover:bg-primary/10 text-primary transition-colors"
                      >
                        <LinkIcon className="w-5 h-5" />
                        <span className="sr-only">Add link</span>
                      </Button>
                    </div>
                    <Button 
                      onClick={handleCreatePost}
                      className="bg-primary hover:bg-primary-hover text-white font-medium px-6 rounded-full transition-colors"
                    >
                      Hop it!
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="space-y-4">
            {mockPosts.map((post, index) => (
              <div
                key={post.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Card className="overflow-hidden glass">
            <div className="p-4">
              <h2 className="font-semibold text-lg flex items-center gap-2 mb-4 text-text">
                <TrendingUp className="w-5 h-5 text-primary" />
                Trending in the Pond
              </h2>
              <ScrollArea className="h-[300px] pr-4">
                {trendingTopics.map((item, index) => (
                  <div 
                    key={index}
                    className="py-3 group cursor-pointer hover:bg-primary/5 rounded-lg px-2 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1 text-text-secondary group-hover:text-primary transition-colors">
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
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
