
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";
import { motion } from "framer-motion";
import { initAnimations } from "@/lib/animations";
import { BookOpen } from "lucide-react";

const Login = () => {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  useEffect(() => {
    // Initialize animations when the component mounts
    initAnimations();
  }, []);

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 w-full pt-20 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-10 lg:gap-16 items-center">
          {/* Left side: Branding and info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">StudyBuddy</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {authMode === "login" ? "Welcome back!" : "Create an account"}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-md">
              {authMode === "login"
                ? "Log in to your StudyBuddy account to track your study progress and achieve your academic goals."
                : "Join StudyBuddy today and take your study habits to the next level with personalized tracking and insights."}
            </p>
            
            <div className="hidden md:block space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-1">Track Your Progress</h3>
                  <p className="text-sm text-muted-foreground">Log your study sessions and monitor your improvement over time.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-1">Get Insights</h3>
                  <p className="text-sm text-muted-foreground">Receive analytics on your study patterns and efficiency.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-1">Achieve Your Goals</h3>
                  <p className="text-sm text-muted-foreground">Set academic targets and track your journey to achieving them.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right side: Auth form */}
          <div className="w-full md:w-auto md:min-w-[400px] md:max-w-[400px] glassmorphism rounded-xl p-8 shadow-sm">
            <AuthForm 
              mode={authMode} 
              onToggleMode={toggleAuthMode} 
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
