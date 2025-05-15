
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const PricingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'purchase' | 'service'>('purchase');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const purchaseFeatures = [
    "Solar panel with integrated battery",
    "Wi-Fi hotspot for up to 15 devices",
    "Mobile app for monitoring and control",
    "2-year warranty and support",
    "Free software updates",
    "Professional installation",
  ];

  const serviceFeatures = [
    "No upfront equipment cost",
    "Pay only for the power you use",
    "Free equipment maintenance",
    "Wi-Fi hotspot included",
    "Priority technical support",
    "Easy upgrade to newer models",
  ];

  const comparisonData = [
    {
      item: "Monthly Expense",
      energram: "₦12,000",
      generator: "₦25,000",
      candles: "₦6,000",
    },
    {
      item: "Internet Access",
      energram: "Included",
      generator: "Separate Cost",
      candles: "None",
    },
    {
      item: "Environmental Impact",
      energram: "Clean Energy",
      generator: "Emissions + Noise",
      candles: "Indoor Air Pollution",
    },
    {
      item: "Reliability",
      energram: "99% Uptime",
      generator: "Fuel-dependent",
      candles: "Limited Hours",
    },
  ];

  return (
    <section id="pricing" className="pt-24 pb-16 bg-muted/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 -left-40 w-96 h-96 rounded-full bg-tech-500/5 blur-3xl"></div>
        <div className="absolute bottom-20 -right-40 w-96 h-96 rounded-full bg-solar-500/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Get <span className="text-gradient">Energram</span> Today
          </h1>
          <p className="text-lg text-foreground/80">
            Choose the option that works best for your needs and budget.
          </p>
        </div>

        <div
          className={`max-w-3xl mx-auto mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Tab switcher */}
          <div className="flex justify-center mb-10">
            <div className="bg-muted p-1 rounded-lg inline-flex">
              <button
                onClick={() => setActiveTab('purchase')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'purchase'
                    ? 'bg-card shadow-sm text-foreground'
                    : 'text-foreground/60'
                }`}
              >
                One-time Purchase
              </button>
              <button
                onClick={() => setActiveTab('service')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'service'
                    ? 'bg-card shadow-sm text-foreground'
                    : 'text-foreground/60'
                }`}
              >
                Power-as-a-Service
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Purchase option */}
            <div
              className={`transition-all duration-500 ease-in-out transform ${
                activeTab === 'purchase'
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 md:translate-y-0 md:translate-x-8 hidden md:block'
              }`}
            >
              <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-tech-500 to-solar-500 text-white p-6">
                  <h3 className="text-xl font-semibold">One-time Purchase</h3>
                  <div className="mt-4">
                    <span className="text-3xl font-display font-bold">₦200,000</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    {purchaseFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-tech-500 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Button asChild className="w-full bg-gradient-to-r from-tech-500 to-solar-500 hover:from-tech-600 hover:to-solar-600">
                      <Link to="/order?plan=purchase">Order Now</Link>
                    </Button>
                  </div>
                  
                  <p className="text-xs text-center mt-4 text-foreground/60">
                    Payment plans available
                  </p>
                </div>
              </div>
            </div>
            
            {/* Service option */}
            <div
              className={`transition-all duration-500 ease-in-out transform ${
                activeTab === 'service'
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 md:translate-y-0 md:-translate-x-8 hidden md:block'
              }`}
            >
              <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-solar-500 to-tech-500 text-white p-6">
                  <h3 className="text-xl font-semibold">Power-as-a-Service</h3>
                  <div className="mt-4">
                    <span className="text-3xl font-display font-bold">₦12,000</span>
                    <span className="text-sm ml-1">/month</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    {serviceFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-solar-500 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Button asChild className="w-full bg-gradient-to-r from-solar-500 to-tech-500 hover:from-solar-600 hover:to-tech-600">
                      <Link to="/order?plan=service">Subscribe Now</Link>
                    </Button>
                  </div>
                  
                  <p className="text-xs text-center mt-4 text-foreground/60">
                    6-month minimum commitment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Comparison Table */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-xl md:text-2xl font-display font-semibold mb-6 text-center">
            Cost Comparison
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-foreground/70"></th>
                  <th className="px-6 py-4 text-center">
                    <div className="font-semibold text-tech-500">Energram</div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="font-semibold text-foreground/70">Generator</div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="font-semibold text-foreground/70">Candles & Battery</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-muted/50" : ""}>
                    <td className="px-6 py-4 font-medium">{row.item}</td>
                    <td className="px-6 py-4 text-center font-semibold text-tech-500">{row.energram}</td>
                    <td className="px-6 py-4 text-center">{row.generator}</td>
                    <td className="px-6 py-4 text-center">{row.candles}</td>
                  </tr>
                ))}
                <tr className="bg-muted/50">
                  <td className="px-6 py-4 font-medium">Annual Savings</td>
                  <td className="px-6 py-4 text-center font-semibold text-tech-500">Baseline</td>
                  <td className="px-6 py-4 text-center font-semibold text-solar-500">-₦156,000</td>
                  <td className="px-6 py-4 text-center font-semibold text-solar-500">+₦72,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-sm text-foreground/60 text-center mt-4">
            *Savings estimates based on average usage patterns in Nigeria
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
