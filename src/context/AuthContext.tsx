
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if we have a session
    const getInitialSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error fetching session:', error);
          toast({
            title: "Connection Error",
            description: "Could not connect to authentication service. Please try again later.",
            variant: "destructive"
          });
        } else {
          setSession(data.session);
          setUser(data.session?.user ?? null);
        }
      } catch (err) {
        console.error('Failed to fetch session:', err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({
        title: "Logged in successfully",
        description: "Welcome back to StudyBuddy!",
      });
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      // More user-friendly error message
      let errorMessage = "An error occurred during login.";
      if (error.message && error.message.includes("fetch")) {
        errorMessage = "Network error. Check if Supabase service is accessible or if there are browser extensions blocking the connection.";
      } else if (error.message && error.message.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error logging in",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      console.log("Attempting to sign up with:", { email, name });
      
      // Add a small delay to ensure network is ready
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { name }
        }
      });
      
      if (error) throw error;

      console.log("Sign up response:", data);
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully! Please check your email for verification.",
      });
    } catch (error: any) {
      console.error('Sign up error:', error);
      
      // More user-friendly error message
      let errorMessage = "An error occurred during registration.";
      if (error.message && error.message.includes("fetch")) {
        errorMessage = "Network error. Check if Supabase service is accessible or if there are browser extensions blocking the connection.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error creating account",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Logged out",
        description: "You have been logged out successfully."
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      
      // More user-friendly error message
      let errorMessage = "An error occurred during logout.";
      if (error.message && error.message.includes("fetch")) {
        errorMessage = "Network error. Check if Supabase service is accessible or if there are browser extensions blocking the connection.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error logging out",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
