
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface PostCardProps {
  id?: number;
  avatar: string;
  username: string;
  handle: string;
  content: string;
  timestamp: string;
  likes?: number;
  comments?: number;
  shares?: number;
  images?: string[];
}

export const PostCard = ({
  avatar,
  username,
  handle,
  content,
  timestamp,
  likes = 0,
  comments = 0,
  shares = 0,
  images = [],
}: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const { toast } = useToast();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleShare = () => {
    toast({
      title: "Shared!",
      description: "Post has been shared with your pond mates",
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in border border-primary/10 group">
      <div className="flex items-start space-x-3">
        <img
          src={avatar || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=64&h=64&fit=crop&crop=faces"}
          alt={username}
          className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary transition-colors"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-text hover:text-primary transition-colors">
                {username}
              </h3>
              <span className="text-text-tertiary text-sm">@{handle}</span>
              <span className="text-text-tertiary text-sm">· {timestamp}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>Copy link</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="mt-2 text-text-secondary whitespace-pre-wrap">{content}</p>
          
          {images && images.length > 0 && (
            <div className="mt-3 rounded-lg overflow-hidden">
              <img 
                src={images[0] || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop"} 
                alt="Post content" 
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="flex items-center justify-between mt-4 text-text-tertiary">
            <button className="flex items-center space-x-2 hover:text-primary transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span>{comments}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-secondary transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-secondary/10 transition-colors">
                <Repeat2 className="w-5 h-5" />
              </div>
              <span>{shares}</span>
            </button>
            <button 
              className={cn(
                "flex items-center space-x-2 group transition-colors",
                isLiked ? "text-accent" : "text-text-tertiary hover:text-accent"
              )}
              onClick={handleLike}
            >
              <div className={cn(
                "p-2 rounded-full transition-colors",
                isLiked ? "bg-accent/10" : "group-hover:bg-accent/10"
              )}>
                <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
              </div>
              <span>{likeCount}</span>
            </button>
            <button 
              className="flex items-center group hover:text-primary transition-colors"
              onClick={handleShare}
            >
              <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                <Share className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
