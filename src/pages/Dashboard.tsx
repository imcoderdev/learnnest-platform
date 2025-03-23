
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StudyTracker from "@/components/dashboard/StudyTracker";
import WeeklySummary from "@/components/dashboard/WeeklySummary";
import { Button } from "@/components/ui/button";
import { initAnimations } from "@/lib/animations";
import { motion } from "framer-motion";
import { BookOpen, CalendarClock, BarChart, History, Users, Settings, Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize animations when the component mounts
    initAnimations();
  }, []);

  const handleFeatureClick = (featureName: string) => {
    toast({
      title: `${featureName}`,
      description: "This feature is coming soon!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 w-full pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
              <p className="text-muted-foreground">Track your study progress and manage your learning journey</p>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            <Button 
              variant="outline" 
              size="sm"
              className="h-9 gap-1.5"
              onClick={() => handleFeatureClick("Calendar")}
            >
              <CalendarClock className="h-3.5 w-3.5" />
              Calendar
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="h-9 gap-1.5"
              onClick={() => handleFeatureClick("Analytics")}
            >
              <BarChart className="h-3.5 w-3.5" />
              Analytics
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="h-9 gap-1.5"
              onClick={() => handleFeatureClick("Courses")}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Courses
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="h-9 gap-1.5"
              onClick={() => handleFeatureClick("History")}
            >
              <History className="h-3.5 w-3.5" />
              History
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="h-9 gap-1.5"
              onClick={() => handleFeatureClick("Notifications")}
            >
              <Bell className="h-3.5 w-3.5" />
              Notifications
            </Button>
          </motion.div>

          <div className="space-y-6">
            {/* Study Tracker */}
            <StudyTracker />
            
            {/* Weekly Summary */}
            <WeeklySummary />
            
            {/* Additional Dashboard Widgets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <DashboardWidget
                icon={<BookOpen className="h-5 w-5 text-primary" />}
                title="Courses"
                description="Manage your courses and subjects"
                onClick={() => handleFeatureClick("Courses Management")}
              />
              <DashboardWidget
                icon={<Users className="h-5 w-5 text-primary" />}
                title="Feedback"
                description="View feedback from mentors and peers"
                onClick={() => handleFeatureClick("Feedback System")}
              />
              <DashboardWidget
                icon={<Settings className="h-5 w-5 text-primary" />}
                title="Settings"
                description="Customize your dashboard and preferences"
                onClick={() => handleFeatureClick("Settings")}
              />
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface DashboardWidgetProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const DashboardWidget = ({ icon, title, description, onClick }: DashboardWidgetProps) => (
  <div 
    className="glassmorphism rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-medium">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default Dashboard;
