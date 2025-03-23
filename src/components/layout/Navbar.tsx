
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, BookOpen } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-8 lg:px-12",
        isScrolled
          ? "glassmorphism shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-medium text-lg"
          aria-label="StudyBuddy Home"
        >
          <BookOpen className="w-6 h-6 text-primary" />
          <span className={cn(
            "transition-colors duration-300",
            isScrolled ? "text-foreground" : "text-foreground"
          )}>
            StudyBuddy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLinks isScrolled={isScrolled} isActive={isActive} />
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 right-0 glassmorphism shadow-md py-4 px-6"
        >
          <nav className="flex flex-col gap-4">
            <MobileNavLinks isActive={isActive} />
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

// Desktop Nav Links
const NavLinks = ({ 
  isScrolled, 
  isActive 
}: { 
  isScrolled: boolean;
  isActive: (path: string) => boolean;
}) => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/features", label: "Features" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            "relative text-sm font-medium transition-colors duration-200",
            isActive(link.path) 
              ? "text-primary" 
              : isScrolled 
                ? "text-foreground hover:text-primary" 
                : "text-foreground hover:text-primary",
          )}
        >
          {link.label}
          {isActive(link.path) && (
            <motion.div
              layoutId="navbar-indicator"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
              transition={{ duration: 0.3 }}
            />
          )}
        </Link>
      ))}
    </>
  );
};

// Mobile Nav Links
const MobileNavLinks = ({ 
  isActive 
}: { 
  isActive: (path: string) => boolean;
}) => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/features", label: "Features" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            "text-sm font-medium py-2 transition-colors",
            isActive(link.path) 
              ? "text-primary" 
              : "text-foreground hover:text-primary"
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default Navbar;
