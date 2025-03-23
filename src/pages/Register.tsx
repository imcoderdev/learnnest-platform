
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";
import { motion } from "framer-motion";
import { initAnimations } from "@/lib/animations";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize animations when the component mounts
    initAnimations();
  }, []);

  const handleToggleMode = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 w-full pt-20 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-10 lg:gap-16 items-center">
          {/* Left side: Auth form */}
          <div className="w-full md:w-auto md:min-w-[400px] md:max-w-[400px] order-2 md:order-1 glassmorphism rounded-xl p-8 shadow-sm">
            <AuthForm 
              mode="register" 
              onToggleMode={handleToggleMode} 
            />
          </div>
          
          {/* Right side: Branding and info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center md:text-left order-1 md:order-2"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Start your journey to better studying
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Join thousands of students who have improved their study habits and academic performance with StudyBuddy.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto md:mx-0">
              <FeatureCard 
                number="01"
                title="Time Tracking"
                description="Log your study sessions and visualize your time allocation across subjects."
              />
              <FeatureCard 
                number="02"
                title="Progress Analytics"
                description="Monitor your improvement with detailed charts and summaries."
              />
              <FeatureCard 
                number="03"
                title="Goal Setting"
                description="Set SMART goals and track your progress towards achieving them."
              />
              <FeatureCard 
                number="04"
                title="Study Planning"
                description="Create effective study plans tailored to your learning style."
              />
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
}

const FeatureCard = ({ number, title, description }: FeatureCardProps) => (
  <div className="glassmorphism rounded-xl p-5 text-left hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="text-xs font-medium text-primary mb-2">{number}</div>
    <h3 className="font-medium text-base mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default Register;
