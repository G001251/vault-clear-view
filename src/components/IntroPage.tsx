import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "./Globe";

interface IntroPageProps {
  onGetStarted: () => void;
}

export const IntroPage = ({ onGetStarted }: IntroPageProps) => {
  const [isSpinning, setIsSpinning] = useState(true);

  const handleGetStarted = () => {
    setIsSpinning(false);
    setTimeout(() => {
      onGetStarted();
    }, 500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <Globe isSpinning={isSpinning} />
      
      <div className="relative z-10 text-center space-y-8 px-6 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-fade-in">
            BlockVault
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Your secure, organized cloud storage solution
          </p>
          <p className="text-lg text-muted-foreground/80 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Professional file management made simple
          </p>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Button 
            onClick={handleGetStarted}
            size="lg"
            className="relative z-20 text-lg px-12 py-6 h-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-500/20"
          >
            Get Started
          </Button>
        </div>
        
        <div className="flex justify-center space-x-8 text-sm text-muted-foreground/60 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <span>✓ Secure Storage</span>
          <span>✓ Easy Organization</span>
          <span>✓ Professional Tools</span>
        </div>
      </div>
    </div>
  );
};