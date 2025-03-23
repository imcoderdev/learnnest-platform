
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Clock,
  PlayCircle,
  PauseCircle,
  Save,
  Plus,
  BookOpen,
  TimerOff,
  CalendarClock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const StudyTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [studySubject, setStudySubject] = useState("");
  const [studyTopic, setStudyTopic] = useState("");
  const { toast } = useToast();

  const startTracking = () => {
    if (!studySubject) {
      toast({
        title: "Subject required",
        description: "Please select a subject before starting the timer.",
        variant: "destructive",
      });
      return;
    }

    setIsTracking(true);
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  const pauseTracking = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setIsTracking(false);
  };

  const resetTracking = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setIsTracking(false);
    setElapsedTime(0);
  };

  const saveSession = () => {
    if (elapsedTime < 60) {
      toast({
        title: "Session too short",
        description: "Study sessions should be at least 1 minute long.",
        variant: "destructive",
      });
      return;
    }

    // Format time for display
    const timeString = formatTime(elapsedTime);
    
    toast({
      title: "Study session saved",
      description: `${studySubject} (${studyTopic}): ${timeString}`,
    });
    
    resetTracking();
    // Here we would typically save to a database
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    let timeString = "";
    
    if (hrs > 0) {
      timeString += `${hrs}h `;
    }
    
    if (mins > 0 || hrs > 0) {
      timeString += `${mins}m `;
    }
    
    timeString += `${secs}s`;
    
    return timeString.trim();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glassmorphism rounded-xl p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-medium">Study Tracker</h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 gap-1 text-xs"
          onClick={() => {
            toast({
              title: "History",
              description: "Study history feature is coming soon!",
            });
          }}
        >
          <Clock className="h-3.5 w-3.5" />
          History
        </Button>
      </div>

      <div className="space-y-6">
        {/* Subject and Topic Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select
              value={studySubject}
              onValueChange={setStudySubject}
              disabled={isTracking}
            >
              <SelectTrigger id="subject" className="w-full">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="geography">Geography</SelectItem>
                <SelectItem value="computer_science">Computer Science</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic (Optional)</Label>
            <Input
              id="topic"
              value={studyTopic}
              onChange={(e) => setStudyTopic(e.target.value)}
              placeholder="E.g., Calculus, Cell Biology"
              disabled={isTracking}
            />
          </div>
        </div>

        {/* Timer Display */}
        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-6xl font-light tabular-nums mb-6">
            {formatTime(elapsedTime)}
          </div>
          
          <div className="flex items-center gap-3">
            {!isTracking ? (
              <Button
                onClick={startTracking}
                variant="outline"
                size="lg"
                className={cn(
                  "rounded-full h-12 px-6 border-2 transition-colors",
                  studySubject ? "border-primary/50 hover:border-primary" : ""
                )}
                disabled={!studySubject}
              >
                <PlayCircle className="mr-2 h-5 w-5 text-primary" />
                Start Studying
              </Button>
            ) : (
              <>
                <Button
                  onClick={pauseTracking}
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 border-2 border-amber-500/50 hover:border-amber-500"
                >
                  <PauseCircle className="h-5 w-5 text-amber-500" />
                </Button>
                
                <Button
                  onClick={saveSession}
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 border-2 border-emerald-500/50 hover:border-emerald-500"
                >
                  <Save className="h-5 w-5 text-emerald-500" />
                </Button>
                
                <Button
                  onClick={resetTracking}
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 border-2 border-destructive/50 hover:border-destructive"
                >
                  <TimerOff className="h-5 w-5 text-destructive" />
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Quick Start Templates */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Quick Start Templates</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-xs"
              onClick={() => {
                toast({
                  title: "Add Template",
                  description: "Template creation feature is coming soon!",
                });
              }}
            >
              <Plus className="h-3.5 w-3.5" />
              Add
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <QuickStartButton
              subject="Mathematics"
              topic="Calculus"
              icon={<BookOpen className="h-4 w-4" />}
              onClick={() => {
                setStudySubject("mathematics");
                setStudyTopic("Calculus");
              }}
              disabled={isTracking}
            />
            <QuickStartButton
              subject="Physics"
              topic="Mechanics"
              icon={<BookOpen className="h-4 w-4" />}
              onClick={() => {
                setStudySubject("physics");
                setStudyTopic("Mechanics");
              }}
              disabled={isTracking}
            />
            <QuickStartButton
              subject="Computer Science"
              topic="Algorithms"
              icon={<BookOpen className="h-4 w-4" />}
              onClick={() => {
                setStudySubject("computer_science");
                setStudyTopic("Algorithms");
              }}
              disabled={isTracking}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface QuickStartButtonProps {
  subject: string;
  topic: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const QuickStartButton = ({ subject, topic, icon, onClick, disabled }: QuickStartButtonProps) => (
  <Button
    variant="outline"
    className="justify-start h-auto py-3 px-4 border border-border flex items-start gap-3"
    onClick={onClick}
    disabled={disabled}
  >
    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
      {icon}
    </div>
    <div className="text-left">
      <div className="font-medium text-sm">{subject}</div>
      <div className="text-xs text-muted-foreground">{topic}</div>
    </div>
  </Button>
);

export default StudyTracker;
