
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TechnologyPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = sectionRefs.findIndex(ref => ref.current === entry.target);
          if (index !== -1) {
            setActiveSection(index);
          }
        }
      });
    }, options);

    sectionRefs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const features = [
    {
      title: "Solar Power Generation",
      description: "Advanced photovoltaic cells capture sunlight and convert it into electricity with up to 23% efficiency, even in low-light conditions. Our custom panel arrangement maximizes energy harvest throughout the day.",
      iconPath: "M12 3v2m0 14v2M5.2 6.2l1.4 1.4M17.4 17.4l1.4 1.4M3 12h2M19 12h2M6.2 18.8l1.4-1.4M17.4 6.6l1.4-1.4",
      color: "from-solar-500 to-yellow-500",
      details: [
        "Tempered glass protection against harsh weather",
        "Ultra-efficient monocrystalline silicon cells",
        "Automatic dust detection and cleaning reminders",
        "Real-time generation monitoring via app"
      ]
    },
    {
      title: "Smart Energy Storage",
      description: "Integrated lithium iron phosphate (LFP) battery system stores excess energy for use after sunset. With advanced Battery Management System (BMS) that optimizes charging cycles and extends battery life.",
      iconPath: "M17 6H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m0 0V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m10 4h-4m-2 0H7m10 4h-4m-2 0H7m10 4h-4m-2 0H7",
      color: "from-tech-500 to-blue-400",
      details: [
        "Over-charge and deep-discharge protection",
        "Up to 2000 charge cycles (5-7 year lifespan)",
        "Expandable capacity for growing needs",
        "Temperature-controlled operation for safety"
      ]
    },
    {
      title: "Wi-Fi Hotspot",
      description: "Integrated 4G/LTE modem with Wi-Fi broadcasting capability provides internet access for up to 15 devices simultaneously, with a range of up to 30 meters. Keeping you connected even during blackouts.",
      iconPath: "M8.111 16.404a5.5 5.5 0 0 1 7.778 0M12 20h.01m-7.08-7.07a9 9 0 0 1 12.142 0M1.394 9.393a14.5 14.5 0 0 1 21.213 0",
      color: "from-indigo-500 to-purple-500",
      details: [
        "4G LTE connectivity with auto-failover",
        "WPA3 security encryption",
        "Bandwidth management for fair usage",
        "Optional content filtering for schools/families"
      ]
    },
    {
      title: "AI-Powered Assistant",
      description: "Our built-in AI constantly monitors system performance and usage patterns, providing personalized recommendations to optimize your energy consumption and maximize efficiency.",
      iconPath: "M12 2c-4.4 0-8 3.6-8 8v1c0 1.7.9 3.3 2.3 4.2 1.4.9 2.2 2.4 2.2 4V20m7 0v-1.5c0-1.5.8-2.9 2.2-3.8C19.1 14 20 12.5 20 11v-1c0-2.3-1-4.3-2.5-5.6M10 11h4",
      color: "from-tech-700 to-indigo-600",
      details: [
        "Usage pattern recognition and optimization",
        "Predictive maintenance alerts",
        "Voice control through mobile app",
        "Automatic system updates and improvements"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-gradient">Intelligent</span> Solar Technology
          </h1>
          <p className="text-lg text-foreground/80">
            Engineered for reliability in Nigeria's challenging environment,
            Energram combines cutting-edge solar technology with smart features
            to deliver continuous power and connectivity.
          </p>
        </div>
        
        {/* Main content */}
        <div className="max-w-6xl mx-auto">
          {/* Technology nav */}
          <div className="hidden lg:flex sticky top-20 mb-10">
            <div className="bg-muted/50 p-1 rounded-lg flex mx-auto">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => {
                    sectionRefs[index].current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeSection === index
                      ? 'bg-card shadow-sm text-foreground'
                      : 'text-foreground/60'
                  }`}
                >
                  {feature.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
          
          {/* Feature sections */}
          <div className="space-y-32">
            {features.map((feature, index) => (
              <div 
                key={index} 
                ref={sectionRefs[index]}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image/visualization placeholder */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-square relative rounded-2xl overflow-hidden border bg-muted/50">
                    {/* Placeholder for actual device/component image */}
                    <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${feature.color} opacity-10`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="120"
                        height="120"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`text-foreground/30`}
                      >
                        <path d={feature.iconPath}></path>
                      </svg>
                    </div>
                    <div className={`absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t ${feature.color} opacity-20`}></div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -right-6 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-tech-500/20 to-solar-500/20 blur-xl -z-10"></div>
                  <div className="absolute -top-6 -left-6 w-1/3 h-1/3 rounded-full bg-gradient-to-br from-solar-500/10 to-tech-500/10 blur-xl -z-10"></div>
                </div>
                
                {/* Feature content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h2 className="text-2xl font-display font-bold mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-foreground/80 mb-6">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {feature.details.map((detail, i) => (
                      <div key={i} className="flex items-start">
                        <div className={`h-6 w-6 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 mr-3`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to action */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-display font-bold mb-4">
              Ready to Experience the Future of Energy?
            </h3>
            <p className="text-lg text-foreground/70 mb-6 max-w-2xl mx-auto">
              Energram combines all these technologies into one seamless solution, 
              providing you with reliable power, internet connectivity, and smart features.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Button asChild className="bg-gradient-to-r from-tech-500 to-solar-500 flex-1">
                <Link to="/order">Order Now</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyPage;
