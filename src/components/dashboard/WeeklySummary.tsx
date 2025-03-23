
import { motion } from "framer-motion";
import { BarChart as BarChartIcon, TrendingUp, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

// Mock data for the weekly study chart
const weeklyData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 2.1 },
  { day: "Fri", hours: 1.5 },
  { day: "Sat", hours: 4.2 },
  { day: "Sun", hours: 1.0 },
];

// Mock data for the subject breakdown
const subjectData = [
  { subject: "Mathematics", hours: 6.2, color: "#3b82f6" },
  { subject: "Physics", hours: 4.5, color: "#8b5cf6" },
  { subject: "Chemistry", hours: 2.8, color: "#ec4899" },
  { subject: "Computer Science", hours: 2.8, color: "#10b981" },
];

const weekTotal = weeklyData.reduce((sum, day) => sum + day.hours, 0);
const lastWeekTotal = 13.7; // Mock data for comparison
const percentChange = ((weekTotal - lastWeekTotal) / lastWeekTotal) * 100;

const WeeklySummary = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glassmorphism rounded-xl p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChartIcon className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-medium">Weekly Summary</h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 gap-1 text-xs"
          onClick={() => {}}
        >
          <TrendingUp className="h-3.5 w-3.5" />
          Analytics
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Weekly Total Stats */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Total Study Time</h3>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-3xl font-bold mb-1">{weekTotal.toFixed(1)} hours</div>
              <div className={cn(
                "text-sm flex items-center gap-1",
                percentChange >= 0 ? "text-emerald-500" : "text-rose-500"
              )}>
                {percentChange >= 0 ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                )}
                <span>
                  {Math.abs(percentChange).toFixed(1)}% from last week
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 pb-2">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Subject Breakdown</h3>
              <div className="space-y-4">
                {subjectData.map((item) => (
                  <div key={item.subject} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.subject}</span>
                      <span className="font-medium">{item.hours}h</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${(item.hours / weekTotal) * 100}%`,
                          backgroundColor: item.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Weekly Chart */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="pt-6 h-full">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Daily Study Hours</h3>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                      axisLine={{ stroke: '#f0f0f0' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: '#f0f0f0' }}
                      tickFormatter={(value) => `${value}h`}
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                      contentStyle={{ 
                        borderRadius: '0.5rem', 
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      }}
                      formatter={(value) => [`${value} hours`, 'Study Time']}
                    />
                    <Bar 
                      dataKey="hours" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]} 
                      barSize={30}
                      animationDuration={1000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default WeeklySummary;
