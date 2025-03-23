
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, BarChart, Clock, Calendar } from "lucide-react";

const Hero = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  
  // Handle the spotlight effect on mousemove
  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = spotlight.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      spotlight.style.setProperty("--x", `${x}px`);
      spotlight.style.setProperty("--y", `${y}px`);
    };
    
    spotlight.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      spotlight.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  return (
    <section 
      ref={spotlightRef}
      className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{
        background: "radial-gradient(700px circle at var(--x, 0) var(--y, 0), rgba(56, 114, 224, 0.1), transparent 40%)",
      }}
    >
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mx-auto max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border border-border bg-background/50 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>Study smarter, not harder</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Master your study habits with <span className="text-primary">StudyBuddy</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Track your progress, gain insights, and achieve your academic goals with our intelligent self-study enhancement platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="px-6 h-12 rounded-full">
                <Link to="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-6 h-12 rounded-full">
                <Link to="/features">
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <FeatureCard 
            icon={<Clock className="w-5 h-5 text-primary" />}
            title="Track Study Time"
            description="Log and monitor your study sessions to optimize your learning routine."
          />
          <FeatureCard 
            icon={<BarChart className="w-5 h-5 text-primary" />}
            title="Weekly Insights"
            description="Get personalized analytics on your study patterns and efficiency."
          />
          <FeatureCard 
            icon={<BookOpen className="w-5 h-5 text-primary" />}
            title="Learning Management"
            description="Organize courses, assignments and resources in one place."
          />
        </motion.div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="glassmorphism rounded-xl p-6 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
      {icon}
    </div>
    <h3 className="font-medium text-lg mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default Hero;
