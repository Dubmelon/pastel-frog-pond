
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";

interface PostCardProps {
  avatar: string;
  username: string;
  handle: string;
  content: string;
  timestamp: string;
  likes?: number;
  comments?: number;
  shares?: number;
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
}: PostCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in">
      <div className="flex items-start space-x-3">
        <img
          src={avatar}
          alt={username}
          className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-text">{username}</h3>
            <span className="text-text-tertiary text-sm">@{handle}</span>
            <span className="text-text-tertiary text-sm">· {timestamp}</span>
          </div>
          <p className="mt-2 text-text-secondary">{content}</p>
          <div className="flex items-center justify-between mt-4 text-text-tertiary">
            <button className="flex items-center space-x-2 hover:text-primary transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{comments}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-secondary transition-colors">
              <Repeat2 className="w-5 h-5" />
              <span>{shares}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-accent transition-colors">
              <Heart className="w-5 h-5" />
              <span>{likes}</span>
            </button>
            <button className="flex items-center hover:text-primary transition-colors">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
