
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "idle" | "dnd" | "offline";
}

export const UserAvatar = ({
  src,
  alt,
  size = "md",
  status,
}: UserAvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const statusColors = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };

  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        className={cn(
          "rounded-full object-cover",
          sizeClasses[size]
        )}
      />
      {status && (
        <div
          className={cn(
            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background",
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};
