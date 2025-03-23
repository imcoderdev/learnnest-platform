
import { Link } from "react-router-dom";
import { BookOpen, Github, Twitter, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-border py-12 bg-background">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="font-medium text-lg">StudyBuddy</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              Enhancing your self-study experience with tracking, insights, and personalized recommendations.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon={<Twitter size={18} />} label="Twitter" />
              <SocialLink href="#" icon={<Linkedin size={18} />} label="LinkedIn" />
              <SocialLink href="#" icon={<Github size={18} />} label="GitHub" />
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <FooterLinkGroup 
              title="Product" 
              links={[
                { label: "Features", href: "/features" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Integrations", href: "/integrations" },
                { label: "Pricing", href: "/pricing" },
              ]} 
            />
            <FooterLinkGroup 
              title="Resources" 
              links={[
                { label: "Documentation", href: "/docs" },
                { label: "Guides", href: "/guides" },
                { label: "Help Center", href: "/help" },
                { label: "Community", href: "/community" },
              ]} 
            />
            <FooterLinkGroup 
              title="Company" 
              links={[
                { label: "About", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
              ]} 
            />
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground order-2 sm:order-1">
            © {currentYear} StudyBuddy. All rights reserved.
          </p>
          <div className="flex items-center gap-6 order-1 sm:order-2">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkGroupProps {
  title: string;
  links: Array<{ label: string; href: string }>;
}

const FooterLinkGroup = ({ title, links }: FooterLinkGroupProps) => (
  <div>
    <h3 className="font-medium mb-4">{title}</h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link 
            to={link.href} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
    aria-label={label}
  >
    {icon}
  </a>
);

export default Footer;
