
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

const SeeInActionPage = () => {
  useEffect(() => {
    document.title = "See Energram in Action | Product Demo";
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-28 pb-16">
        <BackButton />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            See <span className="text-gradient">Energram in Action</span>
          </h1>
          
          <p className="text-lg text-foreground/80 mb-12">
            Watch our demonstration video to see how Energram is transforming energy access 
            across Nigeria with intelligent solar technology.
          </p>
          
          {/* Video Placeholder */}
          <div className="w-full aspect-video bg-gradient-to-br from-tech-900/80 to-solar-900/80 rounded-2xl overflow-hidden mb-8 border border-foreground/10 shadow-lg flex flex-col items-center justify-center">
            <div className="text-center px-6">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 8L16 12L10 16V8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                Demo Video Coming Soon
              </h3>
              <p className="text-white/70">
                Our team is currently finalizing the Energram prototype demo. Check back soon to see our revolutionary technology in action.
              </p>
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-display font-semibold mb-4">
                What You'll See in the Demo
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-solar-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-solar-500"></div>
                  </div>
                  <span>Setting up and activating the Energram device</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-solar-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-solar-500"></div>
                  </div>
                  <span>Power output capabilities and device compatibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-solar-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-solar-500"></div>
                  </div>
                  <span>Solar charging process and energy efficiency</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-solar-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-solar-500"></div>
                  </div>
                  <span>Mobile app features and energy monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-solar-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-solar-500"></div>
                  </div>
                  <span>Wi-Fi hotspot connectivity and range</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-display font-semibold mb-4">
                Coming Videos
              </h3>
              <ul className="space-y-4">
                <li className="border-b border-border pb-3">
                  <p className="font-medium">Customer Testimonials</p>
                  <p className="text-sm text-foreground/70 mt-1">
                    Real stories from early adopters using Energram in their homes and businesses
                  </p>
                </li>
                <li className="border-b border-border pb-3">
                  <p className="font-medium">Setup Tutorial</p>
                  <p className="text-sm text-foreground/70 mt-1">
                    Step-by-step guide for unboxing and configuring your Energram device
                  </p>
                </li>
                <li className="border-b border-border pb-3">
                  <p className="font-medium">Tech Deep Dive</p>
                  <p className="text-sm text-foreground/70 mt-1">
                    Detailed exploration of the technology powering Energram
                  </p>
                </li>
                <li>
                  <p className="font-medium">Impact Stories</p>
                  <p className="text-sm text-foreground/70 mt-1">
                    How Energram is changing lives across Nigeria
                  </p>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-foreground/70 mb-6">
              Can't wait for the video? Learn more about Energram's technology and specifications
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = "/learn-more"}
                className="min-w-[180px]"
              >
                Detailed Specifications
              </Button>
              <Button 
                className="bg-gradient-to-r from-solar-500 to-tech-500 text-white hover:from-solar-700 hover:to-tech-700 min-w-[180px]"
                size="lg"
                onClick={() => window.location.href = "/order"}
              >
                Pre-Order Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SeeInActionPage;
