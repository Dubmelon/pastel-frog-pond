
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
});

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, user } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  useEffect(() => {
    if (user) {
      console.log("User detected, redirecting to dashboard");
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    console.log("Form submitted with values:", values);
    
    try {
      if (isLogin) {
        console.log("Attempting to sign in...");
        await signIn(values.email, values.password);
      } else {
        console.log("Attempting to sign up...");
        if (!values.username) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Username is required for signup",
          });
          return;
        }
        await signUp(values.email, values.password, values.username);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      // Error toasts are now handled in the AuthContext
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google sign in error:", error);
      // Error toasts are handled in the AuthContext
    }
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

        <Button 
          variant="outline" 
          className="w-full bg-white hover:bg-gray-50"
          onClick={handleGoogleSignIn}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="frog@pond.com" className="bg-white/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="bg-white/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isLogin && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="froggylicious" className="bg-white/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full bg-primary hover:bg-primary-hover">
              {isLogin ? "Log In" : "Sign Up"}
            </Button>
          </form>
        </Form>

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
