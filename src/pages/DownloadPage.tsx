
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import QRCode from "../assets/app-qr-code.png"; // Placeholder, will need to be replaced

const DownloadPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Download the <span className="text-gradient">Energram</span> App
            </h1>
            <p className="text-lg text-foreground/80 max-w-lg mx-auto">
              Take control of your energy, monitor usage, and optimize your system from anywhere.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-display font-bold mb-4">
                Powerful Features at Your Fingertips
              </h2>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-tech-500/10 text-tech-500 mr-3 flex-shrink-0">1</span>
                  <div>
                    <h3 className="font-semibold text-lg">Real-Time Monitoring</h3>
                    <p className="text-foreground/70">Track energy generation, consumption, and battery levels in real-time</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-solar-500/10 text-solar-500 mr-3 flex-shrink-0">2</span>
                  <div>
                    <h3 className="font-semibold text-lg">Smart Notifications</h3>
                    <p className="text-foreground/70">Get alerts for system status, maintenance needs, and energy-saving opportunities</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-tech-500/10 text-tech-500 mr-3 flex-shrink-0">3</span>
                  <div>
                    <h3 className="font-semibold text-lg">Energy Insights</h3>
                    <p className="text-foreground/70">View usage patterns and receive AI-powered optimization suggestions</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-solar-500/10 text-solar-500 mr-3 flex-shrink-0">4</span>
                  <div>
                    <h3 className="font-semibold text-lg">Remote Control</h3>
                    <p className="text-foreground/70">Manage your system settings and turn devices on/off remotely</p>
                  </div>
                </li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button className="flex-1 bg-black hover:bg-zinc-800 text-white py-6">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.5645 12.6968C17.5515 9.66977 20.0385 8.44277 20.1525 8.37977C18.6925 6.19477 16.3715 5.91877 15.5615 5.89977C13.5805 5.69477 11.6645 7.03977 10.6535 7.03977C9.64147 7.03977 8.07447 5.91977 6.38647 5.95277C4.20247 5.98477 2.18347 7.25277 1.09947 9.22377C-1.11753 13.1968 0.49447 19.0648 2.63747 22.0268C3.69847 23.4768 4.94547 25.1268 6.55447 25.0658C8.12647 24.9998 8.71447 24.0268 10.6185 24.0268C12.5235 24.0268 13.0715 25.0658 14.7085 25.0268C16.3835 24.9998 17.4615 23.5278 18.4915 22.0768C19.7115 20.3928 20.1915 18.7328 20.2135 18.6558C20.1695 18.6398 17.5795 17.6298 17.5645 14.6028V12.6968Z"/>
                    <path d="M14.7028 3.89969C15.7158 2.99169 16.3378 1.66069 16.1858 0.306689C14.9968 0.349689 13.4768 1.03969 12.4328 1.92369C11.5068 2.69969 10.7468 4.07169 10.9198 5.38269C12.2568 5.47269 13.6658 4.80169 14.7028 3.89969Z"/>
                  </svg>
                  Download on App Store
                </Button>
                <Button className="flex-1 bg-black hover:bg-zinc-800 text-white py-6">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.00977 24L12.0098 14.9999L21.0098 24L12.0098 0L3.00977 24Z"/>
                    <path d="M3.00977 0L12.0098 14.9999L21.0098 0H3.00977Z"/>
                  </svg>
                  Get on Google Play
                </Button>
              </div>
              
              <div className="flex items-center justify-center sm:justify-start">
                <div className="p-3 bg-white rounded-lg w-32 h-32">
                  <img 
                    src={QRCode}
                    alt="QR Code for Energram App Download"
                    className="w-full h-full"
                  />
                </div>
                <p className="ml-4 text-sm text-foreground/70 max-w-[180px]">
                  Scan with your phone camera to download the app directly
                </p>
              </div>
            </div>
            
            <div className="order-1 md:order-2 mb-8 md:mb-0">
              <div className="relative max-w-xs mx-auto">
                {/* Phone mockup */}
                <div className="relative rounded-[32px] border-8 border-foreground/10 shadow-xl overflow-hidden bg-foreground/5 animate-float">
                  <AspectRatio ratio={9/19.5}>
                    <div className="absolute inset-0 mask-fade-out">
                      <div className="absolute inset-0 bg-gradient-to-b from-tech-500/20 to-solar-500/20"></div>
                      <div className="w-full h-full bg-[url('/screenshots/app-dashboard.png')] bg-cover bg-top"></div>
                    </div>
                  </AspectRatio>
                  {/* Phone notch */}
                  <div className="absolute top-0 inset-x-0 flex justify-center">
                    <div className="w-1/2 h-6 bg-foreground/10 rounded-b-xl"></div>
                  </div>
                </div>
                
                {/* Decorative glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-tech-500/20 to-solar-500/20 rounded-[40px] blur-xl -z-10 opacity-70"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
