
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WaitlistPage from "./pages/WaitlistPage";
import ContactPage from "./pages/ContactPage";
import TechnologyPage from "./pages/TechnologyPage";
import PricingPage from "./pages/PricingPage";
import OrderPage from "./pages/OrderPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import DownloadPage from "./pages/DownloadPage";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import WhatsAppButton from "./components/WhatsAppButton";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FAQPage from "./pages/FAQPage";
import LearnMorePage from "./pages/LearnMorePage";
import SeeInActionPage from "./pages/SeeInActionPage";
import Navbar from "./components/Navbar";

// Layout wrapper component to add Navbar to non-auth pages
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const authRoutes = ['/login', '/register', '/admin-login'];
  const showNavbar = !authRoutes.includes(location.pathname);
  
  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

// Create a new QueryClient instance inside the component function
const App = () => {
  // Initialize the QueryClient inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout><Index /></AppLayout>} />
            <Route path="/waitlist" element={<AppLayout><WaitlistPage /></AppLayout>} />
            <Route path="/contact" element={<AppLayout><ContactPage /></AppLayout>} />
            <Route path="/technology" element={<AppLayout><TechnologyPage /></AppLayout>} />
            <Route path="/pricing" element={<AppLayout><PricingPage /></AppLayout>} />
            <Route path="/order" element={<AppLayout><OrderPage /></AppLayout>} />
            <Route path="/confirmation" element={<AppLayout><ConfirmationPage /></AppLayout>} />
            <Route path="/download" element={<AppLayout><DownloadPage /></AppLayout>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/faq" element={<AppLayout><FAQPage /></AppLayout>} />
            <Route path="/learn-more" element={<AppLayout><LearnMorePage /></AppLayout>} />
            <Route path="/see-in-action" element={<AppLayout><SeeInActionPage /></AppLayout>} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly>
                  <AppLayout><AdminPanel /></AppLayout>
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
          </Routes>
          <WhatsAppButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
