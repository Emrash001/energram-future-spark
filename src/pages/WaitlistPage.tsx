
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import FormField from "@/components/FormField";
import { useToast } from "@/hooks/use-toast";

const WaitlistPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    
    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Add document to Firestore
      await addDoc(collection(db, "waitlist"), {
        ...formData,
        timestamp: new Date()
      });
      
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll be in touch soon!",
        variant: "default"
      });
      
      // Reset form
      setFormData({ name: "", email: "", location: "" });
      
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Join the <span className="text-gradient">Energram</span> Waitlist
            </h1>
            <p className="text-lg text-foreground/80 max-w-lg mx-auto">
              Be among the first to experience the future of clean energy. 
              Sign up to get notified when Energram is available in your area.
            </p>
          </div>
          
          <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                label="Full Name"
                name="name"
                placeholder="Enter your full name"
                required
                value={formData.name}
                onChange={handleChange}
                error={formErrors.name}
              />
              
              <FormField
                label="Email Address"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
              />
              
              <FormField
                label="Location"
                name="location"
                placeholder="City, State"
                required
                value={formData.location}
                onChange={handleChange}
                error={formErrors.location}
              />
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-tech-500 to-solar-500 text-white hover:from-tech-600 hover:to-solar-600"
              >
                {isSubmitting ? "Submitting..." : "Join Waitlist"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;
