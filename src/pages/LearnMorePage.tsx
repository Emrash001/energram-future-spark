
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Battery, 
  Wifi, 
  Sun, 
  Smartphone, 
  Shield, 
  Clock, 
  Activity, 
  Zap,
  Calendar,
  Database,
  LucideIcon,
  Info,
  Settings,
  HelpCircle
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-solar-500/20 to-tech-500/20 flex items-center justify-center mb-4">
      <Icon className="text-gradient" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-foreground/70">{description}</p>
  </div>
);

const LearnMorePage = () => {
  const { toast } = useToast();
  const photoSectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    document.title = "Learn More About Energram | Detailed Specifications";
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Observer for photo section reveal animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-10");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (photoSectionRef.current) {
      observer.observe(photoSectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const notifyPhotosComingSoon = () => {
    toast({
      title: "Coming Soon",
      description: "Product photos will be available once the hardware prototype is finalized.",
      variant: "default"
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-28 pb-16">
          <BackButton />
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-6">
              <span className="text-gradient">Everything You Need to Know</span> About Energram
            </h1>
            
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl">
              Energram combines solar power, AI intelligence, and IoT connectivity to provide a complete energy solution for homes and businesses across Nigeria.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">Our Mission</h3>
                  <div className="w-8 h-8 rounded-full bg-solar-500/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-solar-500"></div>
                  </div>
                </div>
                <p className="text-sm text-foreground/70">
                  Eliminate energy poverty by delivering reliable, affordable, and clean energy solutions to every Nigerian household and business.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">Our Purpose</h3>
                  <div className="w-8 h-8 rounded-full bg-tech-500/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-tech-500"></div>
                  </div>
                </div>
                <p className="text-sm text-foreground/70">
                  Bridge Nigeria's energy gap with smart technology that adapts to and overcomes infrastructure challenges while creating sustainable growth.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">Our Roadmap</h3>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-solar-500/20 to-tech-500/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-solar-500 to-tech-500"></div>
                  </div>
                </div>
                <p className="text-sm text-foreground/70">
                  From prototype to nationwide distribution within 24 months, creating a network of powered, connected communities across Nigeria.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Specifications Tabs */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-bold text-center mb-12">Complete System Specifications</h2>
            
            <Tabs defaultValue="power" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8">
                <TabsTrigger value="power">Power System</TabsTrigger>
                <TabsTrigger value="connectivity">Connectivity</TabsTrigger>
                <TabsTrigger value="build">Build & Design</TabsTrigger>
                <TabsTrigger value="smart">Smart Features</TabsTrigger>
              </TabsList>
              
              {/* Power System Tab */}
              <TabsContent value="power" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Battery className="text-solar-500" />
                      Battery Specifications
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Capacity</span>
                        <span className="font-medium">1500Wh</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Battery Type</span>
                        <span className="font-medium">LiFePO4 (Lithium Iron Phosphate)</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Lifecycle</span>
                        <span className="font-medium">3500+ cycles to 80% capacity</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Expected Lifespan</span>
                        <span className="font-medium">10+ years</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Management System</span>
                        <span className="font-medium">Smart BMS with cell balancing</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Sun className="text-solar-500" />
                      Solar Charging
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Solar Input</span>
                        <span className="font-medium">200W built-in panel + 200W external</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Charging Time (Full Sun)</span>
                        <span className="font-medium">~4 hours</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">MPPT Controller</span>
                        <span className="font-medium">Included</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Panel Efficiency</span>
                        <span className="font-medium">23% conversion rate</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Alternative Charging</span>
                        <span className="font-medium">AC wall outlet (optional)</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Zap className="text-tech-500" />
                    Output & Compatibility
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Output Ports</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-foreground/70">AC Outlets</span>
                          <span>2 × 220V</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">USB-A Ports</span>
                          <span>4 × 5V/2.4A</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">USB-C Ports</span>
                          <span>2 × 100W PD</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">DC Output</span>
                          <span>12V/10A</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Total Output Power</span>
                          <span>1200W (2400W surge)</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Device Compatibility</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted rounded p-2 text-center text-sm">Smartphones</div>
                        <div className="bg-muted rounded p-2 text-center text-sm">Laptops</div>
                        <div className="bg-muted rounded p-2 text-center text-sm">LED Lighting</div>
                        <div className="bg-muted rounded p-2 text-center text-sm">Fans</div>
                        <div className="bg-muted rounded p-2 text-center text-sm">TV/Monitors</div>
                        <div className="bg-muted rounded p-2 text-center text-sm">Small Fridge</div>
                        <div className="bg-muted rounded p-2 text-center text-sm">Medical Devices</div>
                        <div className="bg-muted rounded p-2 text-center text-sm">CPAP Machines</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Connectivity Tab */}
              <TabsContent value="connectivity" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Wifi className="text-tech-500" />
                      Wi-Fi Hotspot
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Wi-Fi Standard</span>
                        <span className="font-medium">802.11ac (Wi-Fi 5)</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Coverage Range</span>
                        <span className="font-medium">Up to 30 meters</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Concurrent Users</span>
                        <span className="font-medium">Up to 20 devices</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Bandwidth</span>
                        <span className="font-medium">Up to 25Mbps (network dependent)</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Security</span>
                        <span className="font-medium">WPA3 encryption</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Smartphone className="text-tech-500" />
                      Mobile App Integration
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Compatibility</span>
                        <span className="font-medium">iOS 14+ and Android 9+</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Connection Method</span>
                        <span className="font-medium">Bluetooth & Wi-Fi</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Remote Monitoring</span>
                        <span className="font-medium">Yes, via internet</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Data Sync</span>
                        <span className="font-medium">Automatic to cloud</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Offline Mode</span>
                        <span className="font-medium">Available with limited features</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Database className="text-solar-500" />
                    IoT & Device Communication
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Communication Protocols</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Bluetooth</span>
                          <span>5.2 Low Energy</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Cellular Backup</span>
                          <span>4G LTE (Optional)</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Mesh Networking</span>
                          <span>Supported between units</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">API Access</span>
                          <span>Available for developers</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Smart Home Integration</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Voice Assistant</span>
                          <span>Alexa & Google Assistant</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Smart Plugs</span>
                          <span>Compatible with most brands</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Energy Management</span>
                          <span>Automated load balancing</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Scheduling</span>
                          <span>Supports timed power delivery</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Build & Design Tab */}
              <TabsContent value="build" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Shield className="text-solar-500" />
                      Build & Durability
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Dimensions</span>
                        <span className="font-medium">42 × 28 × 20 cm</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Weight</span>
                        <span className="font-medium">12.5 kg</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Case Material</span>
                        <span className="font-medium">Reinforced polymer composite</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Durability Rating</span>
                        <span className="font-medium">IP65 (water & dust resistant)</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Operating Temperature</span>
                        <span className="font-medium">-10°C to 45°C</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Settings className="text-solar-500" />
                      Design Features
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Cooling System</span>
                        <span className="font-medium">Passive heat dissipation</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Display</span>
                        <span className="font-medium">2.4" color LCD screen</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Controls</span>
                        <span className="font-medium">Touch-enabled & physical buttons</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">LED Indicators</span>
                        <span className="font-medium">Power, charge & connectivity status</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Handle & Portability</span>
                        <span className="font-medium">Built-in ergonomic handles</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Clock className="text-tech-500" />
                    Sustainability & Lifecycle
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Environmental Features</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Recyclable Materials</span>
                          <span>85% recyclable components</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Carbon Offset</span>
                          <span>100% manufacturing offset</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Energy ROI</span>
                          <span>~6 months solar payback</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Repair Program</span>
                          <span>Modular design for easy repair</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Longevity</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Product Warranty</span>
                          <span>3 years standard</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Battery Warranty</span>
                          <span>2 years or 1000 cycles</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Firmware Updates</span>
                          <span>5+ years of support</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Expected Lifespan</span>
                          <span>8-10 years with normal use</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Smart Features Tab */}
              <TabsContent value="smart" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Activity className="text-tech-500" />
                      AI Assistant Features
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Energy Optimization</span>
                        <span className="font-medium">Predictive usage patterns</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Power Management</span>
                        <span className="font-medium">Intelligent load balancing</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Usage Suggestions</span>
                        <span className="font-medium">Personalized efficiency tips</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Weather Integration</span>
                        <span className="font-medium">Solar charging forecasts</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Learning Capability</span>
                        <span className="font-medium">Adapts to your usage patterns</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Calendar className="text-tech-500" />
                      Monitoring & Analytics
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Power Tracking</span>
                        <span className="font-medium">Real-time usage monitoring</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Energy Reports</span>
                        <span className="font-medium">Daily, weekly, monthly insights</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Device Recognition</span>
                        <span className="font-medium">Automatic appliance detection</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Cost Savings</span>
                        <span className="font-medium">Fuel & generator comparisons</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-foreground/70">Carbon Savings</span>
                        <span className="font-medium">Environmental impact tracking</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Info className="text-solar-500" />
                    Safety & Intelligence Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Safety Systems</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Overload Protection</span>
                          <span>Automatic shutdown</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Short Circuit Protection</span>
                          <span>Multi-level safeguards</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Temperature Management</span>
                          <span>Active thermal monitoring</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Battery Protection</span>
                          <span>Overcharge & deep discharge prevention</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Smart System Features</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-foreground/70">System Diagnostics</span>
                          <span>Self-monitoring & reporting</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">OTA Updates</span>
                          <span>Automatic firmware improvements</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Emergency Mode</span>
                          <span>Power conservation during outages</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-foreground/70">Device Prioritization</span>
                          <span>Smart power allocation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="container mx-auto px-4 py-12 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              How Energram <span className="text-gradient">Works</span>
            </h2>
            
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-[15px] lg:left-1/2 transform lg:-translate-x-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-solar-500/80 to-tech-500/80 z-0"></div>
              
              {/* Steps */}
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex lg:justify-end lg:w-1/2 lg:pr-8">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-solar-500 flex items-center justify-center text-white font-bold shrink-0">
                        1
                      </div>
                    </div>
                    <div className="lg:w-1/2 lg:pl-8 ml-8 lg:ml-0">
                      <h3 className="text-xl font-semibold mb-2">Harvesting Solar Energy</h3>
                      <p className="text-foreground/80">
                        Energram's integrated and expandable solar panels capture sunlight throughout the day, converting it to electricity using high-efficiency photovoltaic cells. The system intelligently tracks optimal solar angles and battery capacity.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row-reverse lg:items-center gap-6">
                    <div className="flex lg:justify-start lg:w-1/2 lg:pl-8">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-solar-500/80 flex items-center justify-center text-white font-bold shrink-0">
                        2
                      </div>
                    </div>
                    <div className="lg:w-1/2 lg:pr-8 ml-8 lg:ml-0 lg:text-right">
                      <h3 className="text-xl font-semibold mb-2">Storage & Conversion</h3>
                      <p className="text-foreground/80">
                        Captured energy is stored in our advanced LiFePO4 battery system, designed for long lifecycle and stability in Nigerian climate conditions. The built-in inverter converts DC power to clean AC electricity compatible with standard household devices.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex lg:justify-end lg:w-1/2 lg:pr-8">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-tech-500/80 flex items-center justify-center text-white font-bold shrink-0">
                        3
                      </div>
                    </div>
                    <div className="lg:w-1/2 lg:pl-8 ml-8 lg:ml-0">
                      <h3 className="text-xl font-semibold mb-2">Smart Distribution & Monitoring</h3>
                      <p className="text-foreground/80">
                        The AI-driven energy management system intelligently distributes power based on usage patterns, device priorities, and available energy. Real-time monitoring via the Energram app provides insights on energy production, consumption, and savings.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row-reverse lg:items-center gap-6">
                    <div className="flex lg:justify-start lg:w-1/2 lg:pl-8">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-tech-500 flex items-center justify-center text-white font-bold shrink-0">
                        4
                      </div>
                    </div>
                    <div className="lg:w-1/2 lg:pr-8 ml-8 lg:ml-0 lg:text-right">
                      <h3 className="text-xl font-semibold mb-2">Connected Experience</h3>
                      <p className="text-foreground/80">
                        Beyond power, Energram creates a connected hub with Wi-Fi hotspot capabilities, IoT device integration, and community energy insights. The system continuously learns and adapts to optimize performance and maximize energy availability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Use Cases Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold text-center mb-4">
              Energram <span className="text-gradient">Use Cases</span>
            </h2>
            <p className="text-center text-foreground/80 max-w-2xl mx-auto">
              From powering essential home devices to supporting small businesses and emergency backup, 
              Energram adapts to diverse Nigerian energy needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Sun}
              title="Homes & Apartments"
              description="Reliable power for essential lighting, fans, TVs, refrigeration, and device charging during Nigeria's frequent grid outages."
            />
            
            <FeatureCard
              icon={Wifi}
              title="Small Businesses"
              description="Keep point-of-sale systems, computers, and essential equipment running to maintain business operations regardless of grid availability."
            />
            
            <FeatureCard
              icon={Activity}
              title="Students & Remote Workers"
              description="Consistent power and internet connectivity for online learning, digital work, and research during extended blackouts."
            />
            
            <FeatureCard
              icon={Shield}
              title="Medical Needs"
              description="Power for important medical devices like CPAP machines, refrigeration for medicine, and essential healthcare equipment."
            />
            
            <FeatureCard
              icon={Clock}
              title="Emergency Backup"
              description="Critical power reserve during natural disasters, extended outages, and unforeseen emergencies when the grid fails."
            />
            
            <FeatureCard
              icon={Zap}
              title="Off-Grid Communities"
              description="Complete energy solution for rural areas with no grid access, providing both electricity and internet connectivity."
            />
          </div>
        </section>
        
        {/* Product Photos Section (Placeholder) */}
        <section 
          ref={photoSectionRef}
          className="container mx-auto px-4 py-12 opacity-0 translate-y-10 transition-all duration-1000"
        >
          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-bold text-center mb-4">
              Energram <span className="text-gradient">Photo Gallery</span>
            </h2>
            <p className="text-center text-foreground/80 max-w-2xl mx-auto">
              See the Energram device from every angle and in real-world usage situations.
            </p>
          </div>
          
          {/* Photo Gallery Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item}
                onClick={notifyPhotosComingSoon}
                className="aspect-square bg-gradient-to-br from-tech-500/10 to-solar-500/10 rounded-xl border border-foreground/10 shadow-sm hover:shadow-md transition-all flex items-center justify-center cursor-pointer group"
              >
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-tech-500/20 to-solar-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-foreground/80 font-medium group-hover:text-foreground transition-colors">
                    Product Photos Coming Soon
                  </p>
                  <p className="text-sm text-foreground/60 mt-2">
                    Currently in final prototyping phase
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12 bg-muted/30">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-foreground/80">
                Find answers to common questions about Energram's capabilities, specifications, and use cases.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How long will Energram power my devices?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Energram's 1500Wh capacity can provide power for various durations depending on your devices:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Smartphones: 100+ charges</li>
                    <li>Laptops: 15-20+ charges</li>
                    <li>LED lights: 100+ hours</li>
                    <li>Fans: 20-30 hours</li>
                    <li>Small refrigerator: 10-15 hours</li>
                    <li>TV: 15-20 hours</li>
                  </ul>
                  <p className="mt-2">With regular solar recharging, Energram provides continuous power throughout the day.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Can Energram power all my home appliances?</AccordionTrigger>
                <AccordionContent>
                  <p>Energram can power most standard household devices up to 1200W, including:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Lights, fans, TVs, computers</li>
                    <li>Small refrigerators and freezers</li>
                    <li>Routers, modems, and smart devices</li>
                    <li>Phone and laptop chargers</li>
                    <li>Small medical devices</li>
                  </ul>
                  <p className="mt-2">It's not designed for high-power appliances like air conditioners, electric heaters, or large water heaters.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I maintain the Energram system?</AccordionTrigger>
                <AccordionContent>
                  <p>Energram is designed for minimal maintenance:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Keep solar panels clean from dust and debris</li>
                    <li>Ensure proper ventilation around the unit</li>
                    <li>Update firmware when prompted via the app</li>
                    <li>Monitor battery health through the mobile app</li>
                    <li>Store in a dry location if not in use for extended periods</li>
                  </ul>
                  <p className="mt-2">The LiFePO4 battery requires no special maintenance and is designed for thousands of charge cycles.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I expand Energram's capacity later?</AccordionTrigger>
                <AccordionContent>
                  <p>Yes! Energram is designed with expandability in mind:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Add external solar panels (up to 200W additional)</li>
                    <li>Chain multiple Energram units together for increased capacity</li>
                    <li>Expansion battery packs will be available in late 2025</li>
                    <li>Optional accessories for specific use cases (medical, business, etc.)</li>
                  </ul>
                  <p className="mt-2">This modular approach allows you to start with a basic system and expand as your needs grow.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>How does the Wi-Fi hotspot work?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Energram's built-in Wi-Fi hotspot connects to mobile networks and redistributes the connection:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Integrated 4G LTE modem connects to available mobile networks</li>
                    <li>Data is shared via Wi-Fi to all your devices</li>
                    <li>Supports up to 20 simultaneous connections</li>
                    <li>Range of approximately 30 meters in optimal conditions</li>
                    <li>Data plans are available separately</li>
                  </ul>
                  <p className="mt-2">The hotspot feature ensures you stay connected even during power outages when mobile towers are congested.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>What happens when there's no sunlight?</AccordionTrigger>
                <AccordionContent>
                  <p>Energram's intelligent energy management system handles low-light conditions:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>The battery stores excess energy for use during nights or cloudy days</li>
                    <li>AI-powered load management prioritizes essential devices</li>
                    <li>Energy forecasting provides usage recommendations based on weather predictions</li>
                    <li>Optional AC charging allows for grid charging when solar is unavailable</li>
                    <li>Low-power mode extends battery life during extended periods without sun</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={() => navigate("/faq")}
                className="gap-2"
              >
                <HelpCircle className="h-4 w-4" />
                View All FAQs
              </Button>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Experience <span className="text-gradient">Energram</span>?
            </h2>
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of Nigerians who are transforming their energy experience with clean, 
              intelligent power that adapts to your lifestyle.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-solar-500 to-tech-500 text-white hover:from-solar-700 hover:to-tech-700 min-w-[180px]"
                onClick={() => navigate("/order")}
              >
                Order Now
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="min-w-[180px]"
                onClick={() => navigate("/see-in-action")}
              >
                See It In Action
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                className="min-w-[180px]"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LearnMorePage;
