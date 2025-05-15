
import { useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, ChevronRight, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const SeeInActionPage = () => {
  useEffect(() => {
    document.title = "See in Action - Energram";
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back navigation */}
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">
                      <Home className="h-4 w-4" />
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">See in Action</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          {/* Main Content */}
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-solar-500 to-tech-500 bg-clip-text text-transparent mb-6">
                See Energram in Action
              </h1>
              <p className="text-lg text-foreground/80">
                Witness the revolutionary AI-powered solar system transforming how Africa accesses clean energy.
              </p>
            </div>
            
            {/* Main Video Section */}
            <section>
              <div className="aspect-video bg-gradient-to-br from-tech-500/5 to-solar-500/5 rounded-xl border border-foreground/10 overflow-hidden flex flex-col items-center justify-center p-8 shadow-sm">
                <div className="w-24 h-24 rounded-full bg-tech-500/10 flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-tech-500/20 flex items-center justify-center">
                    <Play className="h-8 w-8 text-tech-500" />
                  </div>
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Energram Product Demo</h3>
                <p className="text-foreground/60 text-center max-w-lg">
                  Our full product demonstration video will be available once the hardware production is complete.
                  Subscribe to our newsletter to be notified when it's released.
                </p>
              </div>
              
              <div className="mt-4 text-center text-sm text-foreground/60">
                <p>Coming Soon: Watch our comprehensive walkthrough of Energram's features and capabilities.</p>
              </div>
            </section>
            
            {/* Additional Videos Grid */}
            <section className="space-y-6">
              <h2 className="text-2xl font-display font-bold">More Videos</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Explainer Video Placeholder */}
                <div className="aspect-video bg-muted/30 rounded-xl border border-foreground/10 overflow-hidden flex flex-col items-center justify-center p-6 group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-tech-500/5 to-solar-500/5 group-hover:opacity-70 transition-opacity"></div>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-tech-500/20 flex items-center justify-center mb-3">
                      <Play className="h-5 w-5 text-tech-500" />
                    </div>
                    <h3 className="font-display font-semibold mb-1">Explainer Animation</h3>
                    <p className="text-xs text-foreground/60">How Energram's AI optimizes solar energy</p>
                  </div>
                </div>
                
                {/* User Testimonials Placeholder */}
                <div className="aspect-video bg-muted/30 rounded-xl border border-foreground/10 overflow-hidden flex flex-col items-center justify-center p-6 group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-tech-500/5 to-solar-500/5 group-hover:opacity-70 transition-opacity"></div>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-tech-500/20 flex items-center justify-center mb-3">
                      <Play className="h-5 w-5 text-tech-500" />
                    </div>
                    <h3 className="font-display font-semibold mb-1">User Testimonials</h3>
                    <p className="text-xs text-foreground/60">Hear from students and businesses using Energram</p>
                  </div>
                </div>
                
                {/* Setup Tutorial Placeholder */}
                <div className="aspect-video bg-muted/30 rounded-xl border border-foreground/10 overflow-hidden flex flex-col items-center justify-center p-6 group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-tech-500/5 to-solar-500/5 group-hover:opacity-70 transition-opacity"></div>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-tech-500/20 flex items-center justify-center mb-3">
                      <Play className="h-5 w-5 text-tech-500" />
                    </div>
                    <h3 className="font-display font-semibold mb-1">Setup Tutorial</h3>
                    <p className="text-xs text-foreground/60">Step-by-step guide to setting up your Energram</p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Animated Feature Highlight */}
            <section className="space-y-6">
              <h2 className="text-2xl font-display font-bold">Key Features Showcase</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* AI Assistant Feature */}
                <div className="bg-card rounded-xl border overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-tech-500/10 to-tech-500/5 p-6 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-tech-500/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tech-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h6z"></path>
                        <path d="M18 8h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z"></path>
                        <path d="M6 12h4"></path>
                        <path d="M6 16h4"></path>
                        <path d="M6 8h4"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-semibold mb-2">AI Energy Assistant</h3>
                    <p className="text-sm text-foreground/80">
                      Energram's smart assistant uses machine learning to understand your energy needs, 
                      predict usage patterns, and optimize power distribution to your devices. 
                      It continuously learns and improves its efficiency over time.
                    </p>
                  </div>
                </div>
                
                {/* IoT Integration Feature */}
                <div className="bg-card rounded-xl border overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-solar-500/10 to-solar-500/5 p-6 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-solar-500/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-solar-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                        <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                        <line x1="12" y1="20" x2="12.01" y2="20"></line>
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-semibold mb-2">WiFi Hotspot & IoT Hub</h3>
                    <p className="text-sm text-foreground/80">
                      Beyond power, Energram creates a connectivity hub with its built-in 4G LTE WiFi hotspot. 
                      It serves as a central point for all your IoT devices, enabling remote monitoring and control 
                      even in areas with limited infrastructure.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Call to Action */}
            <div className="bg-gradient-to-r from-solar-500/10 to-tech-500/10 rounded-xl border p-8 text-center space-y-4">
              <h2 className="text-2xl font-display font-bold">Want to Experience Energram?</h2>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                Join our waitlist to be among the first to experience the future of clean energy in Africa.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link 
                  to="/waitlist" 
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-solar-500 to-tech-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-solar-600 hover:to-tech-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Join Waitlist
                </Link>
                <Link 
                  to="/learn-more" 
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeeInActionPage;
