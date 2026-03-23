import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SeoHead } from "@/components/seo-head";
import NotFound from "@/pages/not-found";
import { ENABLE_PAYMENTS_FEATURE } from "@/lib/features";
import { ThemeProvider } from "@/components/theme-provider";

// Pages
import Home from "@/pages/home";
import Payments from "@/pages/payments";
import Terms from "@/pages/terms";
import Services from "@/pages/services";
import ServiceAiAudits from "@/pages/services-ai-audits";
import ServiceAiEducation from "@/pages/services-ai-education";
import ServiceAiImplementation from "@/pages/services-ai-implementation";
import Values from "@/pages/values";
import Contact from "@/pages/contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/services/ai-audits" component={ServiceAiAudits} />
      <Route path="/services/ai-education" component={ServiceAiEducation} />
      <Route path="/services/ai-implementation" component={ServiceAiImplementation} />
      <Route path="/values" component={Values} />
      {ENABLE_PAYMENTS_FEATURE && <Route path="/payments" component={Payments} />}
      <Route path="/contact" component={Contact} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();

  return (
    <ThemeProvider defaultTheme="light" storageKey="goldrise-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SeoHead path={location} />
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
