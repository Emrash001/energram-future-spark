
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQPage = () => {
  const faqs = [
    {
      question: "What is Energram?",
      answer: "Energram is a next-generation energy tech company tackling energy poverty in Nigeria with an intelligent, solar-powered IoT system that delivers clean electricity and Wi-Fi to underserved communities. Our flagship product is a hybrid solar system with real-time monitoring, AI-based diagnostics, and an embedded solar-powered Wi-Fi hotspot."
    },
    {
      question: "How does the Energram device work?",
      answer: "The Energram device harnesses solar energy through advanced photovoltaic panels, stores it in high-capacity batteries, and intelligently distributes power to your appliances. It features an embedded Wi-Fi hotspot, AI diagnostics that predict maintenance needs, real-time monitoring via our mobile app, and adaptive power management to optimize energy usage based on your habits."
    },
    {
      question: "What payment options are available?",
      answer: "We offer two flexible payment options: (1) One-time Purchase at ₦200,000 for full ownership of the device, or (2) Power-as-a-Service (PaaS) subscription at ₦12,000 per semester, which includes maintenance and support. Both options are designed to be more economical than traditional generators or unstable grid power in the long run."
    },
    {
      question: "How much power can the system generate?",
      answer: "Our standard Energram unit can generate up to 500W of solar power daily, enough to power essential devices like laptops, phones, lighting, fans, and small appliances. The system includes battery storage to provide power during nighttime or cloudy periods."
    },
    {
      question: "What devices can I power with Energram?",
      answer: "Energram is designed to power essential devices including laptops, mobile phones, LED lighting, fans, small TVs, and other low to medium-power appliances. It's not suitable for high-power appliances like air conditioners, refrigerators, or electric cookers unless you upgrade to our higher-capacity models."
    },
    {
      question: "How do I monitor my Energram system?",
      answer: "The Energram app allows you to monitor your system's performance in real-time. You can track power generation, battery status, energy consumption patterns, Wi-Fi usage, and receive maintenance alerts or optimization suggestions from our AI assistant."
    },
    {
      question: "Is installation included with purchase?",
      answer: "Yes, professional installation is included with both our one-time purchase and PaaS subscription options. Our technicians will install the solar panels, set up the battery unit, configure the Wi-Fi hotspot, and ensure everything is optimally positioned for maximum energy capture and system performance."
    },
    {
      question: "What maintenance is required?",
      answer: "Energram systems require minimal maintenance. Occasional cleaning of solar panels (every 3-6 months depending on dust conditions) is recommended. For PaaS subscribers, maintenance is completely handled by our team. For one-time purchase customers, we offer service plans or pay-per-service maintenance options."
    },
    {
      question: "How reliable is the Wi-Fi connection?",
      answer: "The Energram Wi-Fi hotspot provides reliable internet access with speeds suitable for browsing, video calls, and standard definition streaming. Range extends approximately 30 meters in open spaces. The system includes a small data allocation; additional data can be purchased through our app."
    },
    {
      question: "What warranty does Energram offer?",
      answer: "One-time purchase customers receive a 2-year comprehensive warranty covering manufacturing defects and system performance. PaaS subscribers receive continuous warranty coverage for the duration of their subscription, including free replacements and repairs for any non-user-caused issues."
    },
    {
      question: "Is financing available for the one-time purchase?",
      answer: "Yes, we offer financing options through select partner banks and micro-finance institutions. Please contact our sales team for current financing partners and terms available in your area."
    },
    {
      question: "Can I upgrade my system later?",
      answer: "Yes, Energram is designed to be modular. You can add additional solar panels, expand battery capacity, or upgrade to newer technology as your needs grow. PaaS subscribers can upgrade their service tier at any time with a pro-rated adjustment to their subscription fee."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-foreground/80">
              Find answers to common questions about Energram and our services.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border bg-card rounded-lg px-4"
              >
                <AccordionTrigger className="py-4 text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1 text-foreground/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center">
            <p className="text-foreground/70 mb-4">
              Still have questions? We're here to help.
            </p>
            <div className="inline-flex gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 text-primary hover:underline">
                Contact our team
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import at the top
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default FAQPage;
