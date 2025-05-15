
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Apple, QrCode } from "lucide-react";

const AppSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeScreen, setActiveScreen] = useState(0);

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

    const section = document.getElementById("app");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const appScreens = [
    {
      title: "Dashboard",
      description: "Monitor your system's performance in real-time with intuitive analytics.",
      color: "from-tech-500 to-tech-700",
    },
    {
      title: "Power Control",
      description: "Manage energy usage and set automated schedules for optimal efficiency.",
      color: "from-solar-500 to-solar-700",
    },
    {
      title: "Wi-Fi Management",
      description: "Control connected devices and optimize your network settings.",
      color: "from-tech-700 to-solar-500",
    },
  ];

  return (
    <section id="app" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-tech-500/10 blur-3xl"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 rounded-full bg-solar-500/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Take Control with the{" "}
            <span className="text-gradient">Energram App</span>
          </h2>
          <p className="text-lg text-foreground/80">
            Monitor and manage your energy system from anywhere, at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-display font-semibold">
                Smart Features at Your Fingertips
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-solar-500/20 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-solar-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Real-time Energy Insights</h4>
                    <p className="text-foreground/80 mt-1">
                      Track energy production, consumption, and savings with detailed analytics and customizable alerts.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-tech-500/20 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-tech-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Remote Management</h4>
                    <p className="text-foreground/80 mt-1">
                      Control your system settings, prioritize devices, and update firmware from anywhere with an internet connection.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-solar-500/20 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-solar-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Predictive Intelligence</h4>
                    <p className="text-foreground/80 mt-1">
                      AI-powered alerts predict maintenance needs and optimize your energy usage based on your habits.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-black text-white hover:bg-black/80" size="lg">
                    <Apple className="mr-2 h-5 w-5" />
                    App Store
                  </Button>
                  <Button className="bg-tech-700 text-white hover:bg-tech-800" size="lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                      <path d="M17.523 7.89722C17.24 7.89722 16.96 7.77322 16.747 7.55722C16.533 7.34122 16.412 7.05722 16.412 6.77022C16.412 6.48322 16.533 6.19922 16.747 5.98322L19.577 3.10722C19.801 2.88022 20.106 2.75 20.423 2.75C20.741 2.75 21.045 2.88022 21.269 3.10722C21.494 3.33422 21.622 3.64222 21.622 3.96422C21.622 4.28622 21.494 4.59422 21.269 4.82122L18.44 7.69722C18.214 7.82422 17.874 7.89722 17.523 7.89722Z" />
                      <path d="M3.17195 22.2467C2.10195 22.2467 1.13495 21.7937 0.509953 20.9617C-0.115047 20.1297 -0.168047 19.0577 0.369953 18.1377L1.75995 15.6837C1.84495 15.5397 1.99495 15.4537 2.16495 15.4537H5.32695C5.62495 15.4537 5.86595 15.6957 5.86595 15.9937C5.86595 16.2917 5.62495 16.5327 5.32695 16.5327H2.50495L1.16295 18.9137C0.780953 19.5677 0.822953 20.3017 1.28095 20.9077C1.73895 21.5137 2.43095 21.8637 3.17195 21.8637C3.31195 21.8637 3.46895 21.8467 3.62195 21.8127L7.05295 21.0997L14.9739 9.30566C15.0159 9.23866 15.0779 9.18566 15.1509 9.15066C15.1689 9.14266 15.1869 9.13566 15.2059 9.12966L15.2399 9.12166C15.2489 9.11866 15.2579 9.11566 15.2669 9.11366C15.2989 9.10566 15.3319 9.10266 15.3659 9.10266C15.3669 9.10266 15.3679 9.10266 15.3689 9.10266C15.4089 9.10266 15.4479 9.10866 15.4859 9.12066C15.4989 9.12566 15.5119 9.13166 15.5239 9.13866C15.5339 9.14366 15.5449 9.14866 15.5549 9.15466C15.5629 9.15966 15.5709 9.16566 15.5789 9.17166L15.5999 9.19166C15.6079 9.19966 15.6159 9.20866 15.6229 9.21766C15.6349 9.23266 15.6459 9.24866 15.6559 9.26566C15.6589 9.27166 15.6629 9.27666 15.6659 9.28266L17.6789 12.6577C17.6819 12.6637 17.6849 12.6687 17.6879 12.6747C17.6999 12.6957 17.7109 12.7197 17.7179 12.7437C17.7239 12.7647 17.7289 12.7857 17.7319 12.8077C17.7339 12.8217 17.7349 12.8357 17.7359 12.8507C17.7359 12.8657 17.7359 12.8807 17.7339 12.8957C17.7329 12.9057 17.7309 12.9147 17.7279 12.9247C17.7269 12.9277 17.7269 12.9307 17.7259 12.9337C17.7199 12.9597 17.7109 12.9857 17.6979 13.0097L10.5229 24.5037C10.4419 24.6347 10.3049 24.7117 10.1559 24.7117C10.1079 24.7117 10.0589 24.7037 10.0149 24.6867L3.51795 22.1607C3.40295 22.1167 3.28795 22.2467 3.17195 22.2467ZM2.10195 18.8457L5.69695 21.0277L12.3129 10.4527L10.8219 8.02466L2.10195 18.8457ZM13.8859 9.90766L6.29695 20.5067L8.51195 21.5217L15.2099 10.9497L13.8859 9.90766ZM14.6149 8.45866L16.1059 10.8867L16.8309 9.73366L15.7959 8.04466L14.6149 8.45866Z" />
                      <path d="M13.3338 9.93574C13.2318 9.93574 13.1298 9.90474 13.0408 9.84374C12.8678 9.71974 12.7708 9.51774 12.7708 9.30474C12.7708 9.21574 12.7888 9.12774 12.8218 9.04574L13.8208 7.14674C14.2098 6.39674 14.9228 5.89674 15.7458 5.80574C16.5688 5.71574 17.3708 6.04674 17.9008 6.69774L19.1658 8.26974C19.2948 8.43074 19.3258 8.65074 19.2468 8.83674C19.1678 9.02274 18.9938 9.14574 18.7908 9.14574C18.6888 9.14574 18.5868 9.11474 18.4978 9.05374L16.4628 7.57974C16.1548 7.35974 15.7548 7.31174 15.3918 7.45274C15.0288 7.59274 14.7508 7.90174 14.6258 8.27574L14.2078 9.20074C14.1278 9.38574 13.9538 9.50874 13.7528 9.50874C13.6108 9.93574 13.4728 9.93574 13.3338 9.93574Z" />
                    </svg>
                    Google Play
                  </Button>
                </div>
                
                <Button variant="outline" size="lg" className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Scan QR Code
                </Button>
              </div>
            </div>
          </div>
          
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-10"
            }`}
          >
            {/* App Mockup */}
            <div className="relative max-w-xs mx-auto">
              {/* Phone frame */}
              <div className="relative z-20 border-8 border-gray-800 dark:border-gray-700 rounded-[3rem] overflow-hidden shadow-xl">
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 dark:bg-gray-700 z-30">
                  <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 dark:bg-gray-500 rounded-full"></div>
                </div>
                
                {/* App screens */}
                <div className="relative w-full aspect-[9/19]">
                  {appScreens.map((screen, index) => (
                    <div 
                      key={index}
                      className={`absolute inset-0 bg-gradient-to-b ${screen.color} transition-all duration-500 ease-in-out p-6 ${
                        activeScreen === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                      }`}
                    >
                      <div className="text-white">
                        {/* Status bar */}
                        <div className="flex justify-between text-xs mb-8 pt-6">
                          <span>9:41</span>
                          <div className="flex gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 20.9994C16.4183 20.9994 20 17.4177 20 12.9994C20 8.58107 16.4183 4.99939 12 4.99939C7.58172 4.99939 4 8.58107 4 12.9994C4 17.4177 7.58172 20.9994 12 20.9994Z"></path>
                            </svg>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19.7781 7.17767C19.3876 6.78715 18.7544 6.78715 18.3639 7.17767L8.54845 16.9931L5.63612 14.0808C5.24559 13.6903 4.61243 13.6903 4.2219 14.0808C3.83138 14.4713 3.83138 15.1045 4.2219 15.495L7.77845 19.0516C7.96871 19.2418 8.22356 19.3369 8.47845 19.3369C8.73334 19.3369 8.98819 19.2418 9.17845 19.0516L19.7781 8.45193C20.1686 8.0614 20.1686 7.42824 19.7781 7.03772V7.17767Z"></path>
                            </svg>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M15.8033 18.3033L9.50001 12L15.8033 5.69671C16.0962 5.40382 16.0962 4.92893 15.8033 4.63604C15.5104 4.34315 15.0355 4.34315 14.7426 4.63604L7.7929 11.5858C7.5 11.8787 7.5 12.3536 7.7929 12.6464L14.7426 19.5962C15.0355 19.8891 15.5104 19.8891 15.8033 19.5962C16.0962 19.3033 16.0962 18.8284 15.8033 18.5355V18.3033Z"></path>
                            </svg>
                          </div>
                        </div>
                        
                        {/* Screen content */}
                        <h4 className="text-lg font-bold mb-2">{screen.title}</h4>
                        <p className="text-xs text-white/80 mb-6">{screen.description}</p>
                        
                        {/* Mock content based on screen type */}
                        {index === 0 && (
                          <div className="space-y-4">
                            <div className="bg-white/10 rounded-lg p-3">
                              <div className="flex justify-between">
                                <span className="text-xs">Energy Today</span>
                                <span className="text-xs font-bold">2.8 kWh</span>
                              </div>
                              <div className="h-4 bg-white/20 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-white w-3/4 rounded-full"></div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-white/10 p-3 rounded-lg">
                                <div className="text-xs">Battery</div>
                                <div className="text-lg font-bold">84%</div>
                              </div>
                              <div className="bg-white/10 p-3 rounded-lg">
                                <div className="text-xs">Wi-Fi</div>
                                <div className="text-lg font-bold">Active</div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {index === 1 && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-xs">Power Mode</span>
                              <div className="w-10 h-5 bg-white/20 rounded-full relative">
                                <div className="absolute left-0 top-0 bg-white w-5 h-5 rounded-full"></div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="bg-white/10 p-2 rounded-lg flex justify-between">
                                <span className="text-xs">Eco Mode</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M9 16.1716L19.0711 6.1005L20.4853 7.51472L9 19L3.51472 13.5147L4.92893 12.1005L9 16.1716Z" />
                                </svg>
                              </div>
                              <div className="bg-white/10 p-2 rounded-lg flex justify-between">
                                <span className="text-xs">Boost Mode</span>
                              </div>
                              <div className="bg-white/10 p-2 rounded-lg flex justify-between">
                                <span className="text-xs">Balance Mode</span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {index === 2 && (
                          <div className="space-y-3">
                            <div className="bg-white/10 rounded-lg p-3">
                              <div className="text-xs mb-2">Connected Devices</div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-xs">Smartphone</span>
                                  <span className="text-xs font-bold">Active</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs">Laptop</span>
                                  <span className="text-xs font-bold">Active</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs">Tablet</span>
                                  <span className="text-xs font-bold">Idle</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-solar-500/20 rounded-full blur-xl z-0"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-tech-500/20 rounded-full blur-xl z-0"></div>
              
              {/* Navigation dots */}
              <div className="flex justify-center mt-8 gap-3">
                {appScreens.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveScreen(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeScreen === index ? "bg-primary w-6" : "bg-muted-foreground/50"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
