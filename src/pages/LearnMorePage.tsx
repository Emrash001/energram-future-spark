
import { useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LearnMorePage = () => {
  useEffect(() => {
    document.title = "Learn More - Energram";
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
                  <BreadcrumbLink href="#">Learn More</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          {/* Main Content */}
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-solar-500 to-tech-500 bg-clip-text text-transparent mb-6">
                Energram: Powering The Future
              </h1>
              <p className="text-lg text-foreground/80">
                The world's first AI-powered solar system with IoT integration, bringing renewable energy and intelligence to every home and business.
              </p>
            </div>
            
            {/* Mission Section */}
            <section className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-display font-bold">Our Mission</h2>
                <p className="text-foreground/80">
                  Energram's mission is to democratize access to clean, intelligent energy solutions across Africa. 
                  We believe in a future where energy scarcity is eliminated through smart solar technology that 
                  learns from and adapts to its users.
                </p>
                <p className="text-foreground/80">
                  By combining solar power with AI and IoT capabilities, we're creating a new category of energy 
                  infrastructure that's affordable, scalable, and accessible to everyone from students to small 
                  businesses.
                </p>
              </div>
              <div className="bg-gradient-to-br from-solar-500/10 to-tech-500/10 p-6 rounded-xl border border-foreground/10">
                <h3 className="font-display font-bold mb-3">Our Roadmap</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="bg-solar-500 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium flex-shrink-0 mt-0.5">1</span>
                    <span>Launch Energram 1.0 for students and small households</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-solar-500/80 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium flex-shrink-0 mt-0.5">2</span>
                    <span>Expand app capabilities with energy usage analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-solar-500/60 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium flex-shrink-0 mt-0.5">3</span>
                    <span>Introduce Energram Business for commercial applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-solar-500/40 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium flex-shrink-0 mt-0.5">4</span>
                    <span>Develop community grid solutions for neighborhoods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-solar-500/20 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium flex-shrink-0 mt-0.5">5</span>
                    <span>Launch Energram OS platform for third-party integrations</span>
                  </li>
                </ul>
              </div>
            </section>
            
            {/* System Specifications */}
            <section className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-center">System Specifications</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Power & Battery */}
                <div className="bg-card rounded-xl border p-6 space-y-4">
                  <h3 className="text-xl font-display font-semibold text-tech-500">Power & Battery</h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex justify-between">
                      <span>Battery Capacity:</span> 
                      <span className="font-semibold">1200Wh</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Solar Input:</span> 
                      <span className="font-semibold">100W Panel</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Output Wattage:</span> 
                      <span className="font-semibold">500W Continuous</span>
                    </li>
                    <li className="flex justify-between">
                      <span>AC Output:</span> 
                      <span className="font-semibold">230V, 50Hz</span>
                    </li>
                    <li className="flex justify-between">
                      <span>USB Ports:</span> 
                      <span className="font-semibold">2× USB-A, 1× USB-C</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Charging Time:</span> 
                      <span className="font-semibold">6-8 Hours (Solar)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Battery Life:</span> 
                      <span className="font-semibold">800+ Cycles</span>
                    </li>
                  </ul>
                </div>
                
                {/* Supported Devices */}
                <div className="bg-card rounded-xl border p-6 space-y-4">
                  <h3 className="text-xl font-display font-semibold text-solar-500">Supported Devices</h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex justify-between">
                      <span>Laptops:</span> 
                      <span className="font-semibold">5-6 Full Charges</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Smartphones:</span> 
                      <span className="font-semibold">30+ Full Charges</span>
                    </li>
                    <li className="flex justify-between">
                      <span>LED Lights:</span> 
                      <span className="font-semibold">100+ Hours</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Small Refrigerator:</span> 
                      <span className="font-semibold">5-6 Hours</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Television (32"):</span> 
                      <span className="font-semibold">8-10 Hours</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Electric Fan:</span> 
                      <span className="font-semibold">10-12 Hours</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Microwave (700W):</span> 
                      <span className="font-semibold">30-40 Minutes</span>
                    </li>
                  </ul>
                </div>
                
                {/* AI & IoT */}
                <div className="bg-card rounded-xl border p-6 space-y-4">
                  <h3 className="text-xl font-display font-semibold text-primary">AI & IoT</h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex justify-between">
                      <span>AI Assistant:</span> 
                      <span className="font-semibold">Built-in</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Voice Command:</span> 
                      <span className="font-semibold">Yes</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Energy Optimization:</span> 
                      <span className="font-semibold">Adaptive</span>
                    </li>
                    <li className="flex justify-between">
                      <span>App Integration:</span> 
                      <span className="font-semibold">iOS & Android</span>
                    </li>
                    <li className="flex justify-between">
                      <span>WiFi Hotspot:</span> 
                      <span className="font-semibold">4G LTE Compatible</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Remote Monitoring:</span> 
                      <span className="font-semibold">Real-time</span>
                    </li>
                    <li className="flex justify-between">
                      <span>OTA Updates:</span> 
                      <span className="font-semibold">Automatic</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            
            {/* How It Works */}
            <section className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-center">How Energram Works</h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-b from-solar-500/10 to-transparent rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-solar-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">1</div>
                  <h3 className="font-display font-semibold mb-2">Solar Collection</h3>
                  <p className="text-sm text-foreground/80">High-efficiency panels capture solar energy throughout the day</p>
                </div>
                
                <div className="bg-gradient-to-b from-solar-500/10 to-transparent rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-solar-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">2</div>
                  <h3 className="font-display font-semibold mb-2">Smart Storage</h3>
                  <p className="text-sm text-foreground/80">Energy stored in advanced lithium batteries with AI management</p>
                </div>
                
                <div className="bg-gradient-to-b from-tech-500/10 to-transparent rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-tech-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">3</div>
                  <h3 className="font-display font-semibold mb-2">AI Optimization</h3>
                  <p className="text-sm text-foreground/80">Machine learning algorithms prioritize and optimize power usage</p>
                </div>
                
                <div className="bg-gradient-to-b from-tech-500/10 to-transparent rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-tech-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">4</div>
                  <h3 className="font-display font-semibold mb-2">Intelligent Output</h3>
                  <p className="text-sm text-foreground/80">Clean energy delivered to your devices with real-time monitoring</p>
                </div>
              </div>
            </section>
            
            {/* Photo Gallery (Placeholder) */}
            <section className="space-y-6" id="photo-gallery">
              <h2 className="text-3xl font-display font-bold text-center">Energram in Detail</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="aspect-square bg-muted/30 rounded-xl flex items-center justify-center border border-border/50 overflow-hidden group">
                    <div className="text-foreground/30 flex flex-col items-center justify-center transition-transform group-hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm">Energram Photo {index}</p>
                      <p className="text-xs">(Coming Soon)</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Use Cases */}
            <section className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-center">Use Cases</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-card rounded-xl border p-6 space-y-3">
                  <h3 className="text-xl font-display font-semibold">Student Housing</h3>
                  <p className="text-sm text-foreground/80">
                    Provides reliable power for laptops, phones, and lighting during frequent outages on campus. 
                    The AI assistant can help organize study schedules and manage power consumption during exam periods.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl border p-6 space-y-3">
                  <h3 className="text-xl font-display font-semibold">Small Businesses</h3>
                  <p className="text-sm text-foreground/80">
                    Keeps point-of-sale systems, security cameras, and essential equipment running during power cuts. 
                    The IoT features allow remote monitoring of business operations even when owners are away.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl border p-6 space-y-3">
                  <h3 className="text-xl font-display font-semibold">Healthcare Clinics</h3>
                  <p className="text-sm text-foreground/80">
                    Powers critical medical equipment and refrigeration for medications in remote areas. 
                    The AI can prioritize power to essential devices and alert staff about potential issues.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl border p-6 space-y-3">
                  <h3 className="text-xl font-display font-semibold">Farming & Agriculture</h3>
                  <p className="text-sm text-foreground/80">
                    Supports irrigation systems, monitoring equipment, and communication devices in rural settings. 
                    IoT sensors can track soil moisture and automate watering schedules.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl border p-6 space-y-3">
                  <h3 className="text-xl font-display font-semibold">Remote Work</h3>
                  <p className="text-sm text-foreground/80">
                    Creates a reliable home office setup with consistent power and internet connectivity through the 
                    built-in WiFi hotspot. The AI assistant can help manage calls and meeting schedules.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl border p-6 space-y-3">
                  <h3 className="text-xl font-display font-semibold">Emergency Backup</h3>
                  <p className="text-sm text-foreground/80">
                    Provides essential power during extended outages, storms, or disasters. The system can automatically 
                    prioritize critical devices and extend battery life when needed most.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Safety Information */}
            <section className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-center">Safety & Durability</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-display font-semibold">Built To Last</h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500 rounded-full p-1 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Reinforced polymer exterior with IP65 water resistance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500 rounded-full p-1 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Operating temperature range: -10°C to 45°C</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500 rounded-full p-1 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Impact-resistant structure with shock absorbing corners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500 rounded-full p-1 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>UV resistant solar panel with toughened glass</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500 rounded-full p-1 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>2-year comprehensive warranty standard</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-display font-semibold">Safety Features</h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500 rounded-full p-1 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Advanced Battery Management System (BMS) with thermal monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500 rounded-full p-1 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Overcharge, over-discharge, and short-circuit protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500 rounded-full p-1 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Pure sine wave inverter for safe use with sensitive electronics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500 rounded-full p-1 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Automatic fault detection with app notifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500 rounded-full p-1 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>End-of-life recycling program for sustainable disposal</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            
            {/* FAQ Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-display font-bold">Frequently Asked Questions</h2>
                <Button asChild variant="outline">
                  <Link to="/faq">View All FAQs</Link>
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-card rounded-xl border p-6">
                  <h3 className="font-semibold mb-2">How long does a full charge last?</h3>
                  <p className="text-sm text-foreground/80">
                    Battery life depends on your usage patterns, but a fully charged Energram can power a laptop 
                    for approximately 30 hours, a smartphone for 2 weeks, or run LED lights for over 100 hours.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl border p-6">
                  <h3 className="font-semibold mb-2">Can I use Energram while it's charging?</h3>
                  <p className="text-sm text-foreground/80">
                    Yes, Energram features pass-through charging, allowing you to use it while it's being recharged 
                    via solar panels or the AC adapter.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl border p-6">
                  <h3 className="font-semibold mb-2">What makes the Energram AI assistant different?</h3>
                  <p className="text-sm text-foreground/80">
                    Unlike basic power banks, Energram's AI learns from your usage patterns, automatically prioritizing 
                    power to your most important devices and optimizing charging cycles to extend battery lifespan.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Call to Action */}
            <div className="bg-gradient-to-r from-solar-500/10 to-tech-500/10 rounded-xl border p-8 text-center space-y-4">
              <h2 className="text-2xl font-display font-bold">Ready to Transform Your Energy Experience?</h2>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                Join the renewable energy revolution with Energram's AI-powered solar solution.
                Eliminate power outages, reduce your carbon footprint, and take control of your energy future.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button asChild className="bg-gradient-to-r from-solar-500 to-tech-500 text-white">
                  <Link to="/order">Order Now</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/see-in-action">See It In Action</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearnMorePage;
