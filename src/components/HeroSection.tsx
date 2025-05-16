
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const deviceRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [waitlistForm, setWaitlistForm] = useState({
    name: "",
    email: "",
    location: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!deviceRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = (clientX - innerWidth / 2) / 50;
      const moveY = (clientY - innerHeight / 2) / 50;
      
      deviceRef.current.style.transform = `rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToDemo = () => {
    const demoSection = document.getElementById("technology");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!waitlistForm.name || !waitlistForm.email) {
      toast({
        title: "Missing information",
        description: "Please provide your name and email",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, "waitlist"), {
        ...waitlistForm,
        timestamp: new Date()
      });
      
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll contact you soon!",
        variant: "default",
      });
      
      setWaitlistForm({
        name: "",
        email: "",
        location: ""
      });
      
    } catch (error) {
      console.error("Error adding to waitlist:", error);
      toast({
        title: "Submission failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-solar-500/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-tech-500/20 blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_70%)]"></div>
      </div>

      <div className="container mx-auto px-4 pt-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Powering the Future with{" "}
              <span className="text-gradient">Smart + Renewable power station</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 max-w-lg">
              Delivering clean electricity and Wi-Fi to communities facing 
              <span className="font-semibold"> 15+ hours of daily blackouts</span>, 
              one charge at a time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={() => navigate("/see-in-action")}
                size="lg" 
                className="bg-gradient-to-r from-solar-500 to-tech-500 text-white hover:from-solar-700 hover:to-tech-700 transition-all"
              >
                See It In Action
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/learn-more")}
              >
                Learn More
              </Button>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-foreground/60 flex items-center gap-2">
                <span className="block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               On a mission to deliver clean, intelligent energy to thousands of homes and small businesses.
              </p>
            </div>
            
            {/* Waitlist Button & Drawer */}
            <div className="pt-4">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button 
                    variant="secondary" 
                    className="bg-gradient-to-r from-tech-500/20 to-solar-500/20 hover:from-tech-500/30 hover:to-solar-500/30"
                  >
                    Be the First to Get Energram
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Join the Waitlist</DrawerTitle>
                      <DrawerDescription>
                        Reserve your Energram device. We'll notify you as soon as it's available.
                      </DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handleWaitlistSubmit} className="p-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          placeholder="Your full name" 
                          value={waitlistForm.name}
                          onChange={(e) => setWaitlistForm(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Your email address" 
                          value={waitlistForm.email}
                          onChange={(e) => setWaitlistForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location (optional)</Label>
                        <Input 
                          id="location" 
                          placeholder="City, State" 
                          value={waitlistForm.location}
                          onChange={(e) => setWaitlistForm(prev => ({ ...prev, location: e.target.value }))}
                        />
                      </div>
                    </form>
                    <DrawerFooter>
                      <Button 
                        onClick={handleWaitlistSubmit}
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-solar-500 to-tech-500 text-white hover:from-solar-700 hover:to-tech-700 transition-all"
                      >
                        {isSubmitting ? "Submitting..." : "Join Waitlist"}
                      </Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
          
          <div className={`flex justify-center transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div ref={deviceRef} className="three-device relative transition-transform duration-200">
              {/* 3D Device Mockup */}
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-solar-300/30 to-tech-300/30 animate-spin-slow"></div>
                <div className="absolute inset-4 rounded-full border-2 border-solar-500/20 border-dashed animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-tech-700 to-solar-700 rounded-2xl rotate-3 animate-float shadow-xl device-glow">
                    <div className="w-full h-full bg-gradient-to-br from-tech-500 to-solar-500 rounded-xl -rotate-6 flex items-center justify-center relative overflow-hidden">
                      {/* Solar panel pattern */}
                      <div className="absolute inset-2 grid grid-cols-4 grid-rows-4 gap-1 opacity-70">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div key={i} className="bg-blue-900/30 rounded-sm"></div>
                        ))}
                      </div>
                      
                      {/* Glow effect */}
                      <div className="absolute w-full h-8 bg-white/30 blur-md animate-pulse"></div>
                      
                      {/* Logo */}
                      <div className="absolute bottom-2 w-full text-center text-white text-sm font-display font-bold">
                        ENERGRAM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={scrollToDemo} 
            className="rounded-full opacity-70 hover:opacity-100"
          >
            <ChevronDown />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
