
import { useEffect, useState } from "react";

const ImpactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counter, setCounter] = useState(0);
  
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

    const section = document.getElementById("impact");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);
  
  // Counter animation for impact stats
  useEffect(() => {
    if (isVisible && counter < 2500) {
      const timeout = setTimeout(() => {
        setCounter(prev => Math.min(prev + 50, 2500));
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, counter]);

  const testimonials = [
    {
      quote: "Before Energram, I couldn't study after sunset. Now I can prepare for exams anytime, and the Wi-Fi helps me access research materials.",
      author: "Rasheed Yekini.",
      role: "Engineering Student, University of Ibadan"
    },
    {
      quote: "My shop stays open even during blackouts. The Wi-Fi lets me process mobile payments when cellular networks are congested.",
      author: "Victor D.",
      role: "Business Owner, Abuja"
    },
    {
      quote: "Our family used to spend ₦25,000 monthly on fuel for generators. Energram paid for itself in less than 5 months.",
      author: "Laurette I.",
      role: "Family of Four, Lagos"
    }
  ];

  return (
    <section id="impact" className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 left-20 w-80 h-80 rounded-full bg-tech-500/5 blur-3xl"></div>
        <div className="absolute -bottom-40 right-20 w-80 h-80 rounded-full bg-solar-500/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our <span className="text-gradient">Impact Story</span>
          </h2>
          <p className="text-lg text-foreground/80">
            From NetXus to Energram, we're on a mission to eliminate energy poverty and connect communities across Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-display font-semibold mb-4">Our Evolution</h3>
                <div className="space-y-6 relative before:absolute before:left-[15px] before:top-2 before:w-0.5 before:h-[calc(100%-24px)] before:bg-border">
                  <div className="flex gap-4">
                    <div className="mt-1.5 w-8 h-8 rounded-full bg-solar-100 border-2 border-solar-500 flex items-center justify-center shrink-0 z-10">
                      <span className="text-xs font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">March 2024: NetXus Founded</h4>
                      <p className="text-sm text-foreground/80 mt-1">
                        Started as a research project to address Nigeria's dual challenges of energy access and internet connectivity.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="mt-1.5 w-8 h-8 rounded-full bg-tech-100 border-2 border-tech-500 flex items-center justify-center shrink-0 z-10">
                      <span className="text-xs font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">June 2024: First Prototype</h4>
                      <p className="text-sm text-foreground/80 mt-1">
                        Developed and tested our first solar-powered IoT enabled prototype at University of Ibadan student housing.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="mt-1.5 w-8 h-8 rounded-full bg-solar-100 border-2 border-solar-500 flex items-center justify-center shrink-0 z-10">
                      <span className="text-xs font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">December 2024: Commercial Launch</h4>
                      <p className="text-sm text-foreground/80 mt-1">
                        Registered as an LLC, funded by I2M for MVP development, and granted a patent for our innovative product.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="mt-1.5 w-8 h-8 rounded-full bg-tech-100 border-2 border-tech-500 flex items-center justify-center shrink-0 z-10">
                      <span className="text-xs font-semibold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold"> 2025: Energram Rebrand</h4>
                      <p className="text-sm text-foreground/80 mt-1">
                        Evolved into Energram with expanded features, AI integration, and a subscription service model.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="bg-card rounded-lg p-6 shadow-sm">
                  <div className="text-3xl font-display font-bold text-solar-500">{counter.toLocaleString()}+</div>
                  <p className="text-sm text-foreground/80 mt-2">Homes and businesses powered</p>
                </div>
                
                <div className="bg-card rounded-lg p-6 shadow-sm">
                  <div className="text-3xl font-display font-bold text-tech-500">7+ hrs</div>
                  <p className="text-sm text-foreground/80 mt-2">Average daily power gained</p>
                </div>
              </div>
            </div>
          </div>
          
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100" : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-2xl font-display font-semibold mb-6">Customer Stories</h3>
            <div className="space-y-6">
              {testimonials.map((testimonial, i) => (
                <div 
                  key={i} 
                  className="bg-card border rounded-lg p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <blockquote className="text-foreground/90 italic mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-solar-500 to-tech-500"></div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-xs text-foreground/70">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Impact Statistics */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-br from-solar-500/10 to-tech-500/10 rounded-lg p-6 text-center">
            <div className="text-3xl font-display font-bold">₦25M+</div>
            <p className="text-sm text-foreground/80 mt-2">Saved on fuel costs</p>
          </div>
          
          <div className="bg-gradient-to-br from-solar-500/10 to-tech-500/10 rounded-lg p-6 text-center">
            <div className="text-3xl font-display font-bold">15k+</div>
            <p className="text-sm text-foreground/80 mt-2">Connected devices</p>
          </div>
          
          <div className="bg-gradient-to-br from-solar-500/10 to-tech-500/10 rounded-lg p-6 text-center">
            <div className="text-3xl font-display font-bold">85%</div>
            <p className="text-sm text-foreground/80 mt-2">Reduction in outages</p>
          </div>
          
          <div className="bg-gradient-to-br from-solar-500/10 to-tech-500/10 rounded-lg p-6 text-center">
            <div className="text-3xl font-display font-bold">12</div>
            <p className="text-sm text-foreground/80 mt-2">Nigerian states covered</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
