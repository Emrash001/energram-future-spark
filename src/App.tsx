
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
