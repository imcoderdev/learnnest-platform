
import { motion } from "framer-motion";
import { 
  BarChart, 
  Clock, 
  BookOpen, 
  Calendar, 
  Users, 
  Bell, 
  LineChart,
  Zap,
  CheckCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

const Features = () => {
  return (
    <section className="w-full py-24 bg-accent/30">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Supercharge Your Study Routine
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our comprehensive feature set helps you optimize your learning time, track progress, and achieve your academic goals.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: <Clock />,
    title: "Study Session Tracking",
    description: "Log your study sessions with detailed information about subjects, topics, and duration.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    icon: <BarChart />,
    title: "Weekly Analytics",
    description: "Visualize your study habits with comprehensive charts and compare with previous weeks.",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    icon: <BookOpen />,
    title: "Course Management",
    description: "Organize your courses, assignments, and resources in a centralized dashboard.",
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    icon: <Bell />,
    title: "Smart Reminders",
    description: "Get personalized notifications for upcoming deadlines and scheduled study sessions.",
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    icon: <Users />,
    title: "Feedback System",
    description: "Receive valuable feedback from parents, mentors, or peers on your progress.",
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
  },
  {
    icon: <LineChart />,
    title: "Progress Tracking",
    description: "Monitor your improvement over time with detailed progress charts and milestones.",
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
  {
    icon: <Calendar />,
    title: "Study Planning",
    description: "Create detailed study plans and schedules to optimize your learning efficiency.",
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  },
  {
    icon: <Zap />,
    title: "Focus Sessions",
    description: "Utilize Pomodoro technique or custom focus sessions to enhance productivity.",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  },
  {
    icon: <CheckCircle />,
    title: "Goal Setting",
    description: "Set SMART goals for your studies and track your progress towards achieving them.",
    color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
  },
];

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
    className="glassmorphism rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
  >
    <div className={cn(
      "w-12 h-12 rounded-lg flex items-center justify-center mb-4", 
      feature.color
    )}>
      {feature.icon}
    </div>
    <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
    <p className="text-sm text-muted-foreground">{feature.description}</p>
  </motion.div>
);

export default Features;
