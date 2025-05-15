
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Check } from "lucide-react";

const ConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const paymentRef = searchParams.get('ref') || '';
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!paymentRef) {
        setError("Invalid payment reference");
        setLoading(false);
        return;
      }
      
      try {
        const q = query(collection(db, "orders"), where("paymentRef", "==", paymentRef));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setError("Order not found");
        } else {
          const orderData = querySnapshot.docs[0].data();
          setOrderDetails(orderData);
        }
      } catch (err) {
        console.error("Error fetching order: ", err);
        setError("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [paymentRef]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-t-tech-500 border-r-tech-300 border-b-tech-200 border-l-tech-100 rounded-full animate-spin mx-auto"></div>
          <p className="text-lg">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card border rounded-xl p-8 shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-display font-bold mb-4">Order Error</h1>
              <p className="mb-6 text-foreground/70">{error}</p>
              <Button asChild>
                <Link to="/order">Try Again</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-tech-500/10 text-tech-500 mb-6">
                <Check size={28} />
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
                Order Confirmed!
              </h1>
              <p className="text-foreground/70">
                Thank you for your purchase. Your Energram will be delivered soon.
              </p>
            </div>
            
            {orderDetails && (
              <div className="border rounded-lg p-6 bg-muted/30 mb-6">
                <h2 className="font-semibold mb-4">Order Summary</h2>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-foreground/70">Plan:</dt>
                    <dd className="font-medium">
                      {orderDetails.plan === 'purchase' 
                        ? 'One-time Purchase' 
                        : 'Power-as-a-Service'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-foreground/70">Amount:</dt>
                    <dd className="font-medium">₦{orderDetails.amount.toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-foreground/70">Order Reference:</dt>
                    <dd className="font-medium">{paymentRef}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-foreground/70">Order Date:</dt>
                    <dd className="font-medium">
                      {orderDetails.timestamp?.toDate 
                        ? orderDetails.timestamp.toDate().toLocaleDateString() 
                        : new Date().toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
            
            <div className="space-y-4">
              <h3 className="font-semibold">What's Next?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-tech-500/10 text-tech-500 mr-3 flex-shrink-0">1</span>
                  <span>You'll receive a confirmation email with your order details.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-tech-500/10 text-tech-500 mr-3 flex-shrink-0">2</span>
                  <span>Our team will contact you within 24 hours to arrange delivery.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-tech-500/10 text-tech-500 mr-3 flex-shrink-0">3</span>
                  <span>Download our app to prepare for your Energram setup.</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/download">Download App</Link>
              </Button>
              <Button asChild className="flex-1 bg-gradient-to-r from-tech-500 to-solar-500">
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
