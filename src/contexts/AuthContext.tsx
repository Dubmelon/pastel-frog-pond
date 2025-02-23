
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log("AuthProvider: Checking initial session");
    
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session ? "Session found" : "No session");
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session ? "Session exists" : "No session");
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log("Attempting to sign in with email:", email);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        toast({
          variant: "destructive",
          title: "Error signing in",
          description: error.message,
        });
        throw error;
      }

      console.log("Sign in successful:", data.user?.id);
      setUser(data.user);
      
      toast({
        title: "Welcome back! 🐸",
        description: "Successfully logged in",
      });
    } catch (error) {
      console.error("Unexpected error during sign in:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    console.log("Attempting to sign in with Google");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error("Google sign in error:", error);
        toast({
          variant: "destructive",
          title: "Error signing in with Google",
          description: error.message,
        });
        throw error;
      }

      // Success toast will be shown after the redirect and successful authentication
    } catch (error) {
      console.error("Unexpected error during Google sign in:", error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    console.log("Attempting to sign up with email:", email);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) {
        console.error("Sign up error:", error);
        toast({
          variant: "destructive",
          title: "Error signing up",
          description: error.message,
        });
        throw error;
      }

      console.log("Sign up successful:", data.user?.id);
      setUser(data.user);
      
      toast({
        title: "Welcome to the pond! 🐸",
        description: "Your account has been created successfully.",
      });
    } catch (error) {
      console.error("Unexpected error during sign up:", error);
      throw error;
    }
  };

  const signOut = async () => {
    console.log("Attempting to sign out");
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error);
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
      throw error;
    }
    setUser(null);
    console.log("Sign out successful");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
