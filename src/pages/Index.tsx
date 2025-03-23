
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import { initAnimations } from "@/lib/animations";

const Index = () => {
  useEffect(() => {
    // Initialize animations when the component mounts
    initAnimations();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 w-full pt-20">
        <Hero />
        <Features />
        {/* Add more sections here as needed */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
