import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import { LiquidGradient } from "@/components/liquid-gradient";

export default function Home() {
  const rotatingPhrases = [
    "Top AI Transformation Partner",
    "Premium AI Consultancy",
    "Strategic AI Advisory",
  ];
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActivePhraseIndex((current) => (current + 1) % rotatingPhrases.length);
    }, 2400);

    return () => window.clearInterval(intervalId);
  }, [rotatingPhrases.length]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
        <LiquidGradient />
        <div className="max-w-4xl mx-auto text-center z-10 w-full">
          <div className="relative overflow-hidden p-8 md:p-16 rounded-[2.5rem] bg-white/20 dark:bg-black/28 backdrop-blur-2xl border border-white/55 dark:border-white/20 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.24)] transition-all duration-500">
            <div className="pointer-events-none absolute inset-[20px] rounded-[2rem] bg-white/90 dark:bg-black/88" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_18%,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.24)_34%,rgba(255,255,255,0.06)_64%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(120%_90%_at_50%_18%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.08)_34%,rgba(255,255,255,0.02)_64%,rgba(255,255,255,0)_100%)]" />
            <div className="pointer-events-none absolute inset-[12%] rounded-[2rem] bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.34),rgba(255,255,255,0.04)_68%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_68%,rgba(255,255,255,0)_100%)] blur-xl" />
            <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="inline-flex min-w-[18rem] sm:min-w-[22rem] justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingPhrases[activePhraseIndex]}
                    initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="inline-block"
                  >
                    {rotatingPhrases[activePhraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] mb-8 tracking-tight text-foreground drop-shadow-2xl">
              <span className="text-gradient-gold">Elevate</span> Your <br/>
              <span>Business with</span>
              <span className="mt-2 inline-flex items-center justify-center gap-3 md:gap-6 w-full">
                <span className="h-[2px] w-10 md:w-20 bg-gradient-to-r from-transparent via-amber-400 to-amber-500 rounded-full" />
                <span className="text-gradient-gold">elite AI</span>
                <span className="h-[2px] w-10 md:w-20 bg-gradient-to-l from-transparent via-amber-400 to-amber-500 rounded-full" />
              </span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            We empower businesses and creators to harness the power of artificial intelligence, streamline operations, multiply creative output, and scale without limits.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <ContactFormDialog />
            
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">or</span>
            
            <Link href="/services" className="text-sm font-medium text-foreground hover:text-primary transition-colors border-b border-foreground/20 hover:border-primary pb-1 uppercase tracking-wider">
              Explore Services
            </Link>
          </motion.div>
          </div>
          </div>
        </div>

        {/* Abstract hero background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[1200px] max-h-[1200px] opacity-20 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent blur-3xl" />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
            Ready to <span className="text-primary">Evolve?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Stop competing with human limitations. Start scaling with machine precision. 
            Connect with our team to map out your AI integration strategy.
          </p>
          <div className="inline-block scale-110">
             <ContactFormDialog />
          </div>
        </div>
      </section>
    </Layout>
  );
}
