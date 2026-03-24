import { useEffect, useState, useRef } from "react";
import { Layout } from "@/components/layout";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "wouter";
import { LiquidGradient } from "@/components/liquid-gradient";
import { HomeServicesSection } from "@/components/home-services-section";
import { ReadyToEvolveSection } from "@/components/ready-to-evolve-section";

export default function Home() {
  // Animation state and scroll refs
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Handler for smooth scroll to services
  const handleExploreServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (servicesRef.current) {
      const headerHeight = 80; // matches h-20 on the sticky nav
      const top = servicesRef.current.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Rotating phrases for hero
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

  // Scroll progress for hero fade/scale out
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useSpring(useTransform(scrollYProgress, [0, 0.25], [1, 0]), { stiffness: 80, damping: 24 });
  const heroScale = useSpring(useTransform(scrollYProgress, [0, 0.18], [1, 0.92]), { stiffness: 80, damping: 24 });
  const heroY = useSpring(useTransform(scrollYProgress, [0, 0.25], [0, -120]), { stiffness: 80, damping: 24 });

  // Services section: fade/slide in as hero fades out
  const servicesOpacity = useSpring(useTransform(scrollYProgress, [0.12, 0.38], [0, 1]), { stiffness: 80, damping: 24 });
  const servicesY = useSpring(useTransform(scrollYProgress, [0.12, 0.38], [80, 0]), { stiffness: 80, damping: 24 });

  // CTA section: whileInView so opacity always reaches 1 regardless of viewport height

  return (
    <Layout>
      {/* HERO: overflow:clip scoped to just the hero card + its LiquidGradient */}
      <div className="w-full" style={{ position: "relative", overflow: "clip" }}>
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0, pointerEvents: "none" }}>
          <LiquidGradient />
        </div>
        <div className="max-w-4xl mx-auto text-center w-full px-4 md:px-0">
          <div
            ref={heroRef}
            className="relative overflow-hidden p-6 md:p-10 rounded-[2.5rem] bg-white/20 dark:bg-[rgba(18,34,68,0.78)] backdrop-blur-2xl border border-white/55 dark:border-[rgb(106,156,235)] dark:ring-1 dark:ring-[rgba(120,184,255,0.42)] shadow-[0_24px_64px_-20px_rgba(0,0,0,0.24),inset_0_3px_4px_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_96px_-28px_rgba(2,6,23,0.98),0_0_48px_-10px_rgba(88,140,255,0.5),inset_0_4px_6px_rgba(210,230,255,0.28),inset_0_-5px_8px_rgba(5,8,20,0.92),inset_0_22px_34px_-20px_rgba(118,174,255,0.12)] transition-all duration-500 mt-12 md:mt-20"
            style={{ zIndex: 2 }}
          >
            <div id="elevate-your-business" className="pointer-events-none absolute inset-[20px] rounded-[2rem] bg-white/90 dark:bg-[#0f1f3d] dark:opacity-95 shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-4px_8px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_4px_8px_rgba(2,6,23,0.96),inset_0_-4px_8px_rgba(148,163,184,0.04)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_18%,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.24)_34%,rgba(255,255,255,0.06)_64%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(120%_90%_at_50%_18%,rgba(148,163,184,0.05)_0%,rgba(148,163,184,0.025)_34%,rgba(148,163,184,0.006)_64%,rgba(148,163,184,0)_100%)]" />
            <div className="pointer-events-none absolute inset-[12%] rounded-[2rem] bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.34),rgba(255,255,255,0.04)_68%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(circle_at_50%_38%,rgba(148,163,184,0.05),rgba(148,163,184,0.01)_68%,rgba(148,163,184,0)_100%)] blur-xl" />
            <div className="relative z-10">
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
                <span className="text-gradient-gold">Elevate</span> Your <br />
                <span>Business with</span>
                <span className="mt-2 inline-flex items-center justify-center gap-3 md:gap-6 w-full">
                  <span className="h-[2px] w-10 md:w-20 bg-gradient-to-r from-transparent via-amber-400 to-amber-500 dark:via-sky-400 dark:to-blue-500 rounded-full" />
                  <span className="text-gradient-gold">elite AI</span>
                  <span className="h-[2px] w-10 md:w-20 bg-gradient-to-l from-transparent via-amber-400 to-amber-500 dark:via-sky-400 dark:to-blue-500 rounded-full" />
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                We empower businesses and creators to harness the power of artificial intelligence, streamline operations, multiply creative output, and scale without limits.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-2">
                <ContactFormDialog />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mx-2">or</span>
                <a
                  href="#services"
                  onClick={handleExploreServices}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors border-b border-foreground/20 hover:border-primary pb-1 uppercase tracking-wider ml-1"
                >
                  Explore Services
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SERVICES SECTION: Direct Layout child — same pattern as Contact page */}
      <motion.div
        ref={servicesRef}
        style={{ opacity: servicesOpacity, y: servicesY, zIndex: 1 }}
        initial={false}
        className="w-full mt-24"
        id="services-container"
      >
        <HomeServicesSection />
      </motion.div>

      {/* CTA SECTION: Direct Layout child */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full"
      >
        <ReadyToEvolveSection />
      </motion.div>
    </Layout>
  );
}
