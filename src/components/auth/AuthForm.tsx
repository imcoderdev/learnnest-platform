import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Mail, Lock, User, Github, Chrome } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";

type AuthMode = "login" | "register";

interface AuthFormProps {
  mode: AuthMode;
  onToggleMode?: () => void;
}

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

const AuthForm = ({ mode, onToggleMode }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    try {
      if (mode === "login") {
        loginSchema.parse({
          email: formData.email,
          password: formData.password,
        });
      } else {
        registerSchema.parse(formData);
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      
      if (mode === "login") {
        toast({
          title: "Logged in successfully",
          description: "Welcome back to StudyBuddy!",
        });
      } else {
        toast({
          title: "Account created",
          description: "Your account has been created successfully!",
        });
      }
      
      navigate("/dashboard");
    }, 1500);
  };

  const handleSocialAuth = (provider: string) => {
    toast({
      title: `${provider} authentication`,
      description: "This feature is coming soon!",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <form 
        onSubmit={handleSubmit} 
        className="space-y-6"
      >
        {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className={cn(
                    "pl-10",
                    errors.name && "border-destructive focus-visible:ring-destructive"
                  )}
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className={cn(
                  "pl-10",
                  errors.email && "border-destructive focus-visible:ring-destructive"
                )}
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className={cn(
                  "pl-10",
                  errors.password && "border-destructive focus-visible:ring-destructive"
                )}
                value={formData.password}
                onChange={handleChange}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-destructive mt-1">{errors.password}</p>
            )}
          </div>
        

        {mode === "login" && (
          <div className="flex justify-end">
            <Button 
              variant="link" 
              className="px-0 h-auto font-normal text-sm"
              onClick={() => toast({
                title: "Reset Password",
                description: "This feature is coming soon!",
              })}
              type="button"
            >
              Forgot password?
            </Button>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full h-11"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === "login" ? "Logging in..." : "Creating account..."}
            </>
          ) : (
            mode === "login" ? "Log in" : "Create account"
          )}
        </Button>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative px-4 text-xs uppercase text-muted-foreground bg-background">
            Or continue with
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            type="button"
            onClick={() => handleSocialAuth("Google")}
            className="h-11"
          >
            <Chrome className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button 
            variant="outline" 
            type="button"
            onClick={() => handleSocialAuth("GitHub")}
            className="h-11"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </form>

      {onToggleMode && (
        <div className="mt-6 text-center text-sm">
          {mode === "login" ? (
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal text-primary"
                onClick={onToggleMode}
                type="button"
              >
                Create one
              </Button>
            </p>
          ) : (
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal text-primary"
                onClick={onToggleMode}
                type="button"
              >
                Log in
              </Button>
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default AuthForm;
