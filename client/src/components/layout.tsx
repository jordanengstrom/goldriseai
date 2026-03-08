import { Link, useLocation } from "wouter";
import { ContactFormDialog } from "./contact-form-dialog";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ENABLE_PAYMENTS_FEATURE } from "@/lib/features";
import { ModeToggle } from "./mode-toggle";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />

      {/* Navigation */}
      <header className="w-full border-b border-foreground/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center glow-gold group-hover:glow-gold-hover transition-all duration-300">
              <span className="font-display font-bold text-background text-xl leading-none pt-0.5">G</span>
            </div>
            <span className={`font-display font-bold text-2xl tracking-widest text-foreground group-hover:text-primary transition-colors duration-300 ${location === "/" ? "border-b-2 border-primary" : ""}`}>
              GOLDRISE<span className="text-primary/70">.AI</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/services" 
              className={`text-sm font-medium hover:text-foreground transition-colors duration-200 uppercase tracking-wider ${location === "/services" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
            >
              Services
            </Link>
            <Link 
              href="/values" 
              className={`text-sm font-medium hover:text-foreground transition-colors duration-200 uppercase tracking-wider ${location === "/values" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
            >
              Values
            </Link>
            {ENABLE_PAYMENTS_FEATURE && (
              <Link 
                href="/payments" 
                className={`text-sm font-medium hover:text-foreground transition-colors duration-200 uppercase tracking-wider ${location === "/payments" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
              >
                Payments
              </Link>
            )}
            <ContactFormDialog />
          </nav>

          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button aria-label="Menu" className="p-2 text-foreground">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-panel border-foreground/10 bg-background/95 backdrop-blur-xl">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col gap-6 mt-12">
                  <Link 
                    href="/services" 
                    className={`text-lg font-medium hover:text-primary transition-colors duration-200 uppercase tracking-widest ${location === "/services" ? "text-primary border-b-2 border-primary inline-block w-fit" : "text-foreground"}`}
                  >
                    Services
                  </Link>
                  <Link 
                    href="/values" 
                    className={`text-lg font-medium hover:text-primary transition-colors duration-200 uppercase tracking-widest ${location === "/values" ? "text-primary border-b-2 border-primary inline-block w-fit" : "text-foreground"}`}
                  >
                    Values
                  </Link>
                  {ENABLE_PAYMENTS_FEATURE && (
                    <Link 
                      href="/payments" 
                      className={`text-lg font-medium hover:text-primary transition-colors duration-200 uppercase tracking-widest ${location === "/payments" ? "text-primary border-b-2 border-primary inline-block w-fit" : "text-foreground"}`}
                    >
                      Payments
                    </Link>
                  )}
                  <div className="pt-4 border-t border-foreground/10">
                    <ContactFormDialog />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-foreground/5 bg-background/80 backdrop-blur-sm mt-auto py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center">
                <span className="font-display font-bold text-primary text-xs">G</span>
              </div>
              <span className="font-display font-medium text-muted-foreground text-sm tracking-widest">
                © {new Date().getFullYear()} GOLDRISE AI
              </span>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground">
              <Link href="/terms" className="hover:text-primary transition-colors duration-200 flex items-center h-9">
                Terms & Conditions
              </Link>
              <a 
                href="https://www.quo.com/policies/ORkUEC2Zst" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-200 flex items-center h-9"
              >
                Privacy Policy
              </a>
              <Link href="/services" className="hover:text-primary transition-colors duration-200 flex items-center h-9">
                Services
              </Link>
              <Link href="/values" className="hover:text-primary transition-colors duration-200 flex items-center h-9">
                Values
              </Link>
              {ENABLE_PAYMENTS_FEATURE && (
                <Link href="/payments" className="hover:text-primary transition-colors duration-200 flex items-center h-9">
                  Payments
                </Link>
              )}
              <a 
                href="mailto:info@goldrise.ai" 
                className="hover:text-primary transition-colors duration-200 flex items-center h-9"
              >
                Contact
              </a>
              <ModeToggle />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
