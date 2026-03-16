import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { ENABLE_BANNERS_FEATURE, ENABLE_PAYMENTS_FEATURE } from "@/lib/features";
import { ThemeProvider } from "@/components/theme-provider";

// Pages
import Home from "@/pages/home";
import Payments from "@/pages/payments";
import Terms from "@/pages/terms";
import Services from "@/pages/services";
import Values from "@/pages/values";
import Contact from "@/pages/contact";
import Banners from "@/pages/banners";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/values" component={Values} />
      {ENABLE_PAYMENTS_FEATURE && <Route path="/payments" component={Payments} />}
      {ENABLE_BANNERS_FEATURE && <Route path="/banners" component={Banners} />}
      <Route path="/contact" component={Contact} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="goldrise-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
