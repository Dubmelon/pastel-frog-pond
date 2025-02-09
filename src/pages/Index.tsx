
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just simulate login and navigate to dashboard
    toast({
      title: isLogin ? "Welcome back!" : "Account created!",
      description: "Taking you to your dashboard...",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6 glass">
        <div className="text-center space-y-2">
          <img
            src="/lovable-uploads/05eb46c8-beec-4402-aa5b-1debbe9d35c0.png"
            alt="Cute frog logo"
            className="w-16 h-16 mx-auto"
          />
          <h1 className="text-2xl font-semibold text-text">
            {isLogin ? "Welcome Back!" : "Join the Pond"}
          </h1>
          <p className="text-text-secondary">
            {isLogin
              ? "Hop back into your favorite lily pad"
              : "Create your account and start your journey"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              className="bg-white/50"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              className="bg-white/50"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary-hover">
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </form>

        <div className="text-center">
          <Button
            variant="link"
            className="text-text-secondary hover:text-primary"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Index;
