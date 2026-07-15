import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import RequireCmsAuth from "./cms/RequireCmsAuth";
import CmsLayout from "./cms/CmsLayout";
import CmsLogin from "./cms/pages/Login";
import CmsDashboard from "./cms/pages/Dashboard";
import CmsEvents from "./cms/pages/Events";
import CmsBookings from "./cms/pages/Bookings";
import CmsVipList from "./cms/pages/VipList";
import CmsContent from "./cms/pages/Content";
import BookingSuccess from "./pages/BookingSuccess";
import BookingCancel from "./pages/BookingCancel";
import EventDetail from "./pages/EventDetail";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/booking/success" element={<BookingSuccess />} />
            <Route path="/booking/cancel" element={<BookingCancel />} />
            <Route path="/cms/login" element={<CmsLogin />} />
            <Route
              path="/cms"
              element={
                <RequireCmsAuth>
                  <CmsLayout />
                </RequireCmsAuth>
              }
            >
              <Route index element={<CmsDashboard />} />
              <Route path="events" element={<CmsEvents />} />
              <Route path="bookings" element={<CmsBookings />} />
              <Route path="vip-list" element={<CmsVipList />} />
              <Route path="content" element={<CmsContent />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
