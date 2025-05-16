
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Send, Handshake, Briefcase } from "lucide-react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [partnerForm, setPartnerForm] = useState({
    name: "",
    email: "",
    organization: "",
    message: ""
  });
  const [isPartnerSubmitting, setIsPartnerSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Contact Energram | Get in Touch";
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        organization,
        message,
        timestamp: new Date(),
      });

      toast({
        title: "Message sent",
        description: "Thank you for contacting us. We'll respond shortly.",
        variant: "default",
      });

      setName("");
      setEmail("");
      setOrganization("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.name || !partnerForm.email || !partnerForm.organization || !partnerForm.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsPartnerSubmitting(true);

    try {
      await addDoc(collection(db, "partnerships"), {
        name: partnerForm.name,
        email: partnerForm.email,
        organization: partnerForm.organization,
        message: partnerForm.message,
        timestamp: new Date(),
      });

      toast({
        title: "Partnership request sent",
        description: "Thank you for your interest. Our team will contact you soon.",
        variant: "default",
      });

      setPartnerForm({
        name: "",
        email: "",
        organization: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending partnership request:", error);
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsPartnerSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-28 pb-16">
        <BackButton />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Contact <span className="text-gradient">Energram</span>
          </h1>
          <p className="text-lg text-foreground/80 mb-12">
            Have a question about our products or services? Want to partner with us? 
            We'd love to hear from you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-card border rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-tech-500/20 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-tech-500" />
              </div>
              <h3 className="font-medium mb-2">Email Us</h3>
              <p className="text-sm text-foreground/70 mb-4">For general inquiries</p>
              <a href="mailto:info@energram.com" className="text-primary hover:underline">
                info@energram.com
              </a>
            </div>
            
            <div className="bg-card border rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-solar-500/20 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-solar-500" />
              </div>
              <h3 className="font-medium mb-2">Visit Us</h3>
              <p className="text-sm text-foreground/70 mb-4">Our headquarters</p>
              <address className="not-italic text-primary">
                14 Ajiboye Street, Ago Palace Way,<br />
                Lagos, Nigeria
              </address>
            </div>
            
            <div className="bg-card border rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-tech-500/20 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-tech-500" />
              </div>
              <h3 className="font-medium mb-2">Call Us</h3>
              <p className="text-sm text-foreground/70 mb-4">Customer service</p>
              <a href="tel:+2348162958127" className="text-primary hover:underline">
                +234 816 295 8127
              </a>
            </div>
          </div>
          
          {/* Contact Form Tabs */}
          <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
            <Tabs defaultValue="contact">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="contact" className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  <span>General Inquiry</span>
                </TabsTrigger>
                <TabsTrigger value="partner" className="flex items-center gap-2">
                  <Handshake className="h-4 w-4" />
                  <span>Partnership</span>
                </TabsTrigger>
              </TabsList>
              
              {/* General Contact Form */}
              <TabsContent value="contact">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name*</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email*</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization/Company</Label>
                    <Input
                      id="organization"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Where are you from? (optional)"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message*</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-solar-500 to-tech-500 text-white hover:from-solar-700 hover:to-tech-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              {/* Partnership Form */}
              <TabsContent value="partner">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-1/3">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-solar-500" />
                      <span>Partner with Us</span>
                    </h3>
                    <p className="text-foreground/80 mb-4">
                      We're expanding our impact across Nigeria through strategic partnerships and investment collaborations.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2 text-sm">
                        <div className="w-6 h-6 rounded-full bg-tech-500/10 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-tech-500"></div>
                        </div>
                        <span>Distribution partnerships</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <div className="w-6 h-6 rounded-full bg-tech-500/10 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-tech-500"></div>
                        </div>
                        <span>Technology integration</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <div className="w-6 h-6 rounded-full bg-tech-500/10 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-tech-500"></div>
                        </div>
                        <span>Investment opportunities</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <div className="w-6 h-6 rounded-full bg-tech-500/10 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-tech-500"></div>
                        </div>
                        <span>Joint research initiatives</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <form onSubmit={handlePartnerSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="partner-name">Full Name*</Label>
                          <Input
                            id="partner-name"
                            value={partnerForm.name}
                            onChange={(e) => setPartnerForm({...partnerForm, name: e.target.value})}
                            placeholder="Your name"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="partner-email">Email*</Label>
                          <Input
                            id="partner-email"
                            type="email"
                            value={partnerForm.email}
                            onChange={(e) => setPartnerForm({...partnerForm, email: e.target.value})}
                            placeholder="Your email address"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="partner-organization">Organization/Company*</Label>
                        <Input
                          id="partner-organization"
                          value={partnerForm.organization}
                          onChange={(e) => setPartnerForm({...partnerForm, organization: e.target.value})}
                          placeholder="Your organization name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="partner-message">Partnership Details*</Label>
                        <Textarea
                          id="partner-message"
                          value={partnerForm.message}
                          onChange={(e) => setPartnerForm({...partnerForm, message: e.target.value})}
                          placeholder="Tell us about your organization and how you'd like to partner with Energram"
                          rows={5}
                          required
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-solar-500 to-tech-500 text-white hover:from-solar-700 hover:to-tech-700"
                        disabled={isPartnerSubmitting}
                      >
                        {isPartnerSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          "Submit Partnership Inquiry"
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
