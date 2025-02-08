
import { Sidebar } from "@/components/Sidebar";
import { PostCard } from "@/components/PostCard";

const mockPosts = [
  {
    avatar: "/placeholder.svg",
    username: "Lily Pad",
    handle: "lilypad",
    content: "Just discovered the most amazing pond spot! Perfect for afternoon meditation 🌿",
    timestamp: "2h ago",
    likes: 42,
    comments: 12,
    shares: 5,
  },
  {
    avatar: "/placeholder.svg",
    username: "Hoppy",
    handle: "hopmaster",
    content: "The water is particularly refreshing today. Who's up for a swim?",
    timestamp: "4h ago",
    likes: 24,
    comments: 8,
    shares: 2,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 p-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {mockPosts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
