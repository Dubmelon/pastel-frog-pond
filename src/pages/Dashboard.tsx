
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { BarChart, Activity, Users, MessageSquare } from "lucide-react";

const Dashboard = () => {
  const isMobile = useIsMobile();

  const stats = [
    { title: "Total Posts", value: "156", icon: BarChart, change: "+12% from last week" },
    { title: "Active Sessions", value: "32", icon: Activity, change: "+8% from last week" },
    { title: "New Followers", value: "24", icon: Users, change: "+18% from last week" },
    { title: "Messages", value: "8", icon: MessageSquare, change: "+2% from last week" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background-secondary">
      <Sidebar />
      <main className={`p-4 sm:p-6 transition-all duration-300 ease-in-out ${isMobile ? 'pb-20' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-text mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4 glass">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-text-secondary text-sm">{stat.title}</p>
                    <h3 className="text-2xl font-semibold text-text mt-1">{stat.value}</h3>
                    <p className="text-primary text-sm mt-1">{stat.change}</p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <div className="p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-text">Recent Activity</h2>
              </div>
              <ScrollArea className="h-[400px]">
                <div className="p-4 space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-text">New post received 10 likes</p>
                        <p className="text-text-secondary text-sm">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            <Card className="glass">
              <div className="p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-text">Engagement Overview</h2>
              </div>
              <div className="p-4">
                <div className="h-[400px] flex items-center justify-center text-text-secondary">
                  Chart placeholder - will be implemented with actual data
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
