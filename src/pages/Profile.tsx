
import { Sidebar } from "@/components/Sidebar";
import { Calendar, MapPin, Edit2, Link2, UserPlus } from "lucide-react";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mockPosts = [
  {
    avatar: "/placeholder.svg",
    username: "FroggyUser",
    handle: "froggyuser",
    content: "Just hopped into a new pond! The water is amazing 🌊",
    timestamp: "3h ago",
    likes: 15,
    comments: 3,
    shares: 1,
  },
  {
    avatar: "/placeholder.svg",
    username: "FroggyUser",
    handle: "froggyuser",
    content: "Found the perfect lily pad spot for meditation 🧘‍♂️",
    timestamp: "1d ago",
    likes: 42,
    comments: 7,
    shares: 4,
  },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 animate-fade-in">
        {/* Banner with glassmorphism effect */}
        <div className="relative h-48 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/10 overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        <div className="max-w-2xl mx-auto px-6">
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

              {/* Bio with subtle animation */}
              <p className="mt-3 text-text-secondary animate-fade-in">
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

              {/* Stats with hover effects */}
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

          {/* Navigation Tabs with animations */}
          <div className="border-t border-border mt-4">
            <nav className="flex">
              {["Posts", "Replies", "Media", "Likes"].map((tab, index) => (
                <button
                  key={tab}
                  className={cn(
                    "px-4 py-3 font-medium transition-colors relative",
                    index === 0
                      ? "text-primary"
                      : "text-text-tertiary hover:text-text hover:bg-background-secondary"
                  )}
                >
                  {tab}
                  {index === 0 && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-scale-in" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Posts Feed with stagger animation */}
          <div className="py-4 space-y-4">
            {mockPosts.map((post, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
