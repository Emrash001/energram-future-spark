
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import FormField from "@/components/FormField";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams, useNavigate } from "react-router-dom";

interface PaystackResponse {
  message: string;
  redirecturl: string;
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
}

declare global {
  interface Window {
    PaystackPop: {
      setup(config: any): {
        openIframe(): void;
      };
    };
  }
}

const OrderPage = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  
  const defaultPlan = searchParams.get('plan') || 'purchase';
  const [selectedPlan, setSelectedPlan] = useState<'purchase' | 'service'>(defaultPlan as 'purchase' | 'service');
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    userType: "student" // Default value
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load Paystack script
    const script = document.createElement('script');
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
    
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }
    
    if (!formData.address.trim()) {
      errors.address = "Delivery address is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getAmount = () => {
    return selectedPlan === 'purchase' ? 20000000 : 1200000; // Amount in kobo (₦200,000 or ₦12,000)
  };

  const initializePayment = () => {
    if (!window.PaystackPop) {
      toast({
        title: "Error",
        description: "Payment service is not available. Please try again later.",
        variant: "destructive"
      });
      return;
    }

    const handler = window.PaystackPop.setup({
      key: 'pk_test_xxxxxxxxxx', // Replace with your actual Paystack public key
      email: formData.email,
      amount: getAmount(),
      currency: 'NGN',
      ref: `ENR-${Math.floor(Math.random() * 1000000000)}`,
      callback: async (response: PaystackResponse) => {
        // Handle successful payment
        try {
          // Save order data to Firestore with payment reference
          const docRef = await addDoc(collection(db, "orders"), {
            ...formData,
            plan: selectedPlan,
            amount: getAmount() / 100, // Convert back to Naira
            paymentRef: response.reference,
            status: 'paid',
            timestamp: new Date()
          });
          
          toast({
            title: "Payment Successful!",
            description: "Your order has been placed successfully.",
            variant: "default"
          });
          
          // Navigate to confirmation page
          navigate('/confirmation?ref=' + response.reference);
          
        } catch (error) {
          console.error("Error saving order: ", error);
          toast({
            title: "Error",
            description: "There was a problem processing your order. Please contact support.",
            variant: "destructive"
          });
        } finally {
          setPaymentInitiated(false);
          setIsSubmitting(false);
        }
      },
      onClose: () => {
        // Handle payment modal closed
        setPaymentInitiated(false);
        setIsSubmitting(false);
        toast({
          title: "Payment Cancelled",
          description: "You cancelled the payment process. Your order was not completed.",
          variant: "default"
        });
      }
    });
    
    handler.openIframe();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // First save order data to Firestore as pending
      const docRef = await addDoc(collection(db, "orders"), {
        ...formData,
        plan: selectedPlan,
        amount: getAmount() / 100, // Convert back to Naira
        status: 'pending',
        timestamp: new Date()
      });
      
      // Set flag to show payment is in progress
      setPaymentInitiated(true);
      
      // Initialize Paystack payment
      initializePayment();
      
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        title: "Error",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Order <span className="text-gradient">Energram</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-lg mx-auto">
              Fill out the form below to place your order.
            </p>
          </div>
          
          <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-muted p-1 rounded-lg inline-flex mb-4 w-full">
                <button
                  type="button"
                  onClick={() => setSelectedPlan('purchase')}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    selectedPlan === 'purchase'
                      ? 'bg-card shadow-sm text-foreground'
                      : 'text-foreground/60'
                  }`}
                >
                  One-time Purchase (₦200,000)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlan('service')}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    selectedPlan === 'service'
                      ? 'bg-card shadow-sm text-foreground'
                      : 'text-foreground/60'
                  }`}
                >
                  PaaS (₦12,000/semester)
                </button>
              </div>

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
                label="Phone Number"
                name="phone"
                placeholder="Your phone number"
                required
                value={formData.phone}
                onChange={handleChange}
                error={formErrors.phone}
              />
              
              <FormField
                label="Delivery Address"
                name="address"
                placeholder="Your complete delivery address"
                required
                value={formData.address}
                onChange={handleChange}
                textarea
                error={formErrors.address}
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium">User Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {['student', 'business', 'household'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({...formData, userType: type})}
                      className={`py-2 px-4 rounded-md border transition-colors ${
                        formData.userType === type 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-border bg-background text-foreground/70'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting || paymentInitiated}
                className={`w-full text-white ${
                  selectedPlan === 'purchase'
                    ? 'bg-gradient-to-r from-tech-500 to-solar-500 hover:from-tech-600 hover:to-solar-600'
                    : 'bg-gradient-to-r from-solar-500 to-tech-500 hover:from-solar-600 hover:to-tech-600'
                }`}
              >
                {isSubmitting
                  ? paymentInitiated 
                    ? "Processing Payment..." 
                    : "Processing..."
                  : `Proceed to Payment (₦${selectedPlan === 'purchase' ? '200,000' : '12,000'})`}
              </Button>
              
              <p className="text-xs text-center text-foreground/60">
                By proceeding, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
