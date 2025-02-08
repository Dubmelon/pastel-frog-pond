
import { Sidebar } from "@/components/Sidebar";
import { Calendar, MapPin } from "lucide-react";
import { PostCard } from "@/components/PostCard";

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
      <main className="ml-64">
        <div className="h-48 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="max-w-2xl mx-auto px-6">
          <div className="relative">
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white absolute -top-16"
            />
            <div className="pt-20 pb-4">
              <h1 className="text-2xl font-bold">FroggyUser</h1>
              <p className="text-text-tertiary">@froggyuser</p>
              <p className="mt-3 text-text-secondary">
                Just a happy frog hopping around the digital pond 🐸
              </p>
              <div className="flex items-center space-x-4 mt-3 text-sm text-text-tertiary">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Lily Pad Central
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Joined March 2024
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-3">
                <span>
                  <strong>528</strong>{" "}
                  <span className="text-text-tertiary">Following</span>
                </span>
                <span>
                  <strong>1.2k</strong>{" "}
                  <span className="text-text-tertiary">Followers</span>
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-4">
            <nav className="flex">
              <button className="px-4 py-3 font-medium text-primary border-b-2 border-primary">
                Posts
              </button>
              <button className="px-4 py-3 font-medium text-text-tertiary hover:text-text hover:bg-background-secondary transition-colors">
                Replies
              </button>
              <button className="px-4 py-3 font-medium text-text-tertiary hover:text-text hover:bg-background-secondary transition-colors">
                Media
              </button>
              <button className="px-4 py-3 font-medium text-text-tertiary hover:text-text hover:bg-background-secondary transition-colors">
                Likes
              </button>
            </nav>
          </div>
          <div className="py-4 space-y-4">
            {mockPosts.map((post, index) => (
              <PostCard key={index} {...post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
