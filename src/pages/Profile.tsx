
import { Sidebar } from "@/components/Sidebar";
import { Calendar, MapPin, Edit2, Link2, UserPlus } from "lucide-react";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const mockPosts = [
  {
    id: 1,
    avatar: "/placeholder.svg",
    username: "FroggyUser",
    handle: "froggyuser",
    content: "Just discovered the most amazing pond spot! Perfect for afternoon meditation 🌿",
    timestamp: "3h ago",
    likes: 42,
    comments: 12,
    shares: 5,
    images: ["/placeholder.svg"],
  },
  {
    id: 2,
    avatar: "/placeholder.svg",
    username: "FroggyUser",
    handle: "froggyuser",
    content: "Found the perfect lily pad spot for meditation 🧘‍♂️",
    timestamp: "1d ago",
    likes: 24,
    comments: 8,
    shares: 2,
  },
];

const Profile = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className={`${isMobile ? 'ml-0 pb-20' : 'ml-20'} transition-all duration-300`}>
        {/* Banner with glassmorphism effect */}
        <div className="relative h-48 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/10">
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="relative">
            {/* Profile Image with hover effect */}
            <div className="absolute -top-16 group">
              <img
                src="/placeholder.svg"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <button className="absolute bottom-2 right-2 p-2 rounded-full bg-primary/90 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-20 pb-4">
              {/* Profile Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-text">FroggyUser</h1>
                  <p className="text-text-tertiary">@froggyuser</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Link2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button size="sm" className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    Follow
                  </Button>
                </div>
              </div>

              {/* Bio */}
              <p className="mt-3 text-text-secondary">
                Just a happy frog hopping around the digital pond 🐸
              </p>

              {/* Profile Details */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-text-tertiary">
                <div className="flex items-center hover:text-primary transition-colors">
                  <MapPin className="w-4 h-4 mr-1" />
                  Lily Pad Central
                </div>
                <div className="flex items-center hover:text-primary transition-colors">
                  <Calendar className="w-4 h-4 mr-1" />
                  Joined March 2024
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-4">
                <button className="hover:text-primary transition-colors">
                  <span className="font-semibold">528</span>{" "}
                  <span className="text-text-tertiary">Following</span>
                </button>
                <button className="hover:text-primary transition-colors">
                  <span className="font-semibold">1.2k</span>{" "}
                  <span className="text-text-tertiary">Followers</span>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-t border-border mt-4">
            <nav className="flex overflow-x-auto">
              {["Posts", "Replies", "Media", "Likes"].map((tab, index) => (
                <button
                  key={tab}
                  className={cn(
                    "px-4 py-3 font-medium transition-colors relative whitespace-nowrap",
                    index === 0
                      ? "text-primary"
                      : "text-text-tertiary hover:text-text hover:bg-background-secondary"
                  )}
                >
                  {tab}
                  {index === 0 && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Posts Feed */}
          <div className="py-4 space-y-4">
            {mockPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
