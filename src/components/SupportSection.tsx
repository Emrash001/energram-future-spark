
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FAQPage from "@/pages/FAQPage";

const SupportSection = () => {
  const [isVisible, setIsVisible] = useState(false);

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

    const section = document.getElementById("support");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      question: "How long does the battery last during a blackout?",
      answer: "The Energram device can provide up to 8-10 hours of continuous power for essential devices (lights, phones, fans) on a full charge. For heavier loads, the duration will be shorter."
    },
    {
      question: "How many devices can connect to the Wi-Fi hotspot?",
      answer: "The built-in Wi-Fi hotspot supports up to 15 simultaneous device connections with stable performance. Beyond that, you may experience reduced speeds."
    },
    {
      question: "How much sunlight is needed for a full charge?",
      answer: "In optimal sunny conditions, the system takes about 5-6 hours to fully charge. Even on cloudy days, the advanced photovoltaic panels can still generate significant power, though charging may take longer."
    },
    {
      question: "Is installation included with purchase?",
      answer: "Yes, professional installation is included with both the one-time purchase and the Power-as-a-Service subscription within major Nigerian cities. For remote locations, additional fees may apply."
    },
    {
      question: "Can I monitor my system when I'm away from home?",
      answer: "Absolutely. The Energram mobile app allows you to monitor and control your system from anywhere with an internet connection. You'll receive real-time updates on energy production, consumption, and system health."
    }
  ];

  return (
    <section id="support" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-tech-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-solar-500/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Support & <span className="text-gradient">Resources</span>
          </h2>
          <p className="text-lg text-foreground/80">
            We're here to help you get the most out of your Energram system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100" : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-2xl font-display font-semibold mb-6">
              Frequently Asked Questions
            </h3>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-8">
              <Button variant="outline" className="w-full" onClick={() => FAQPage()}>
                View All FAQs
              </Button>
            </div>
          </div>
          
          <div
            className={`space-y-8 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Contact Support</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 rounded-md border bg-background"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 rounded-md border bg-background"
                    placeholder="you@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="issue" className="block text-sm font-medium mb-1">
                    Issue Type
                  </label>
                  <select
                    id="issue"
                    className="w-full p-2 rounded-md border bg-background"
                  >
                    <option value="">Select an issue</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="installation">Installation Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-2 rounded-md border bg-background resize-none"
                    placeholder="Describe your issue or question..."
                  ></textarea>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-tech-500 to-solar-500 hover:from-tech-600 hover:to-solar-600">
                  Submit Request
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-solar-500/20 to-tech-500/20 p-6 rounded-xl">
              <h4 className="font-semibold mb-2">Need Immediate Assistance?</h4>
              <p className="text-sm mb-4">
                Our technical support team is available 7 days a week.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" className="flex-1">
                  Live Chat
                </Button>
                <Button variant="secondary" className="flex-1">
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
