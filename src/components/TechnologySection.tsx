
import { useEffect, useState } from "react";
import { Wifi, ZapOff, Zap, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TechnologySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById("technology");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-solar-500" />,
      title: "Solar Charging",
      description: "Advanced photovoltaic panels capture sunlight efficiently, even on cloudy days.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-tech-500" />,
      title: "Real-time Monitoring",
      description: "Track energy production and consumption with AI-powered analytics.",
    },
    {
      icon: <Wifi className="h-8 w-8 text-tech-500" />,
      title: "Wi-Fi Hotspot",
      description: "Built-in router provides internet access for up to 15 devices simultaneously.",
    },
    {
      icon: <ZapOff className="h-8 w-8 text-solar-500" />,
      title: "Blackout Protection",
      description: "Seamless switchover during power outages with zero interruption.",
    },
  ];

  return (
    <section
      id="technology"
      className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-40 -right-20 w-64 h-64 rounded-full bg-tech-500/10 blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-72 h-72 rounded-full bg-solar-500/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Revolutionary{" "}
            <span className="text-gradient">Solar Technology</span>
          </h2>
          <p className="text-lg text-foreground/80">
            Our hybrid solar system combines cutting-edge hardware with intelligent software to create a reliable energy ecosystem for your home or business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Animated product demonstration */}
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Central device */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-tech-700 to-solar-700 rounded-2xl shadow-xl device-glow animate-float">
                  <div className="w-full h-full bg-gradient-to-br from-tech-500 to-solar-500 rounded-xl flex items-center justify-center relative overflow-hidden">
                    {/* Solar panel pattern */}
                    <div className="absolute inset-4 grid grid-cols-4 grid-rows-4 gap-1 opacity-70">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="bg-blue-900/30 rounded-sm"></div>
                      ))}
                    </div>
                    
                    {/* Energy pulse */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-solar-500/30 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Orbiting elements */}
              <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '20s' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-10 h-10 rounded-full bg-solar-500 flex items-center justify-center text-white">
                    <Zap size={20} />
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '25s', animationDelay: '0.5s' }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <div className="w-10 h-10 rounded-full bg-tech-500 flex items-center justify-center text-white">
                    <Wifi size={20} />
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }}>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-tech-700 flex items-center justify-center text-white">
                    <BarChart3 size={20} />
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '35s', animationDelay: '0.25s' }}>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-solar-700 flex items-center justify-center text-white">
                    <ZapOff size={20} />
                  </div>
                </div>
              </div>
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 200 200">
                <line x1="100" y1="100" x2="100" y2="0" className="stroke-solar-500/30 stroke-2" />
                <line x1="100" y1="100" x2="100" y2="200" className="stroke-tech-500/30 stroke-2" />
                <line x1="100" y1="100" x2="200" y2="100" className="stroke-tech-700/30 stroke-2" />
                <line x1="100" y1="100" x2="0" y2="100" className="stroke-solar-700/30 stroke-2" />
              </svg>
            </div>
          </div>
          
          <div
            className={`space-y-8 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-2xl md:text-3xl font-display font-semibold">
              How Energram Works
            </h3>
            
            <p className="text-foreground/80">
              Our integrated system harnesses solar energy and converts it into reliable power for your devices while providing internet connectivity - all intelligently managed through our mobile app.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className={`border transition-all duration-300 hover:border-primary/50 ${
                    activeFeature === index ? "border-primary shadow-md" : ""
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardContent className="p-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-foreground/70">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="pt-4">
              <p className="text-sm flex items-center gap-2 text-muted-foreground">
                <span className="block w-2 h-2 rounded-full bg-solar-500"></span>
                Designed for Nigeria's challenging power environment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
