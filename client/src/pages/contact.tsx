import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { LiquidGradient } from "@/components/liquid-gradient";
import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare } from "lucide-react";

export default function Contact() {
  // State to hold contact info, defaulting to empty to hide from initial static scrape
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    phoneDisplay: ""
  });

  useEffect(() => {
    // 1. Add 'noindex' meta tag to prevent indexing
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    // 2. Decode contact info client-side (Basic Obfuscation)
    // "info@goldrise.ai" -> aW5mb0Bnb2xkcmlzZS5haQ==
    // "2062036807" -> MjA2MjAzNjgwNw==
    // "(206) 203-6807" -> KDIwNikgMjAzLTY4MDc=
    setContactInfo({
      email: atob("aW5mb0Bnb2xkcmlzZS5haQ=="),
      phone: atob("MjA2MjAzNjgwNw=="),
      phoneDisplay: atob("KDIwNikgMjAzLTY4MDc=")
    });

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <Layout>
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 flex-1 flex flex-col items-center justify-center overflow-hidden">
        <LiquidGradient />
        <div className="max-w-4xl mx-auto text-center z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight text-foreground drop-shadow-2xl">
              Get in <span className="text-gradient-gold">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're here to help you transform your business with AI.
            </p>
          </motion.div>

          {/* Only render the grid if we have data (avoids broken links during hydration) */}
          {contactInfo.email && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {/* Email Box */}
              <motion.a
                href={`mailto:${contactInfo.email}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative overflow-hidden p-8 rounded-[2.5rem] bg-white/20 dark:bg-black/28 backdrop-blur-2xl border border-white/55 dark:border-white/20 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.24),inset_0_3px_4px_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.3)] dark:shadow-[0_24px_64px_-20px_rgba(0,0,0,0.6),inset_0_3px_4px_rgba(255,255,255,0.2),inset_0_-3px_4px_rgba(0,0,0,0.7)] hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="pointer-events-none absolute inset-[10px] rounded-[2rem] bg-white/90 dark:bg-black/88 shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-4px_8px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_4px_8px_rgba(0,0,0,0.6),inset_0_-4px_8px_rgba(255,255,255,0.2)] transition-colors duration-300 group-hover:bg-white/95 dark:group-hover:bg-black/80" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_18%,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.24)_34%,rgba(255,255,255,0.06)_64%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(120%_90%_at_50%_18%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.08)_34%,rgba(255,255,255,0.02)_64%,rgba(255,255,255,0)_100%)]" />
                <div className="pointer-events-none absolute inset-[12%] rounded-[2rem] bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.34),rgba(255,255,255,0.04)_68%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_68%,rgba(255,255,255,0)_100%)] blur-xl" />

                <div className="relative z-10 flex flex-col items-center gap-4 py-6">
                  <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-colors duration-300">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display">Email Us</h3>
                  <p className="text-lg text-muted-foreground group-hover:text-foreground transition-colors">{contactInfo.email}</p>
                </div>
              </motion.a>

              {/* Phone Box */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group relative overflow-hidden p-8 rounded-[2.5rem] bg-white/20 dark:bg-black/28 backdrop-blur-2xl border border-white/55 dark:border-white/20 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.24),inset_0_3px_4px_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.3)] dark:shadow-[0_24px_64px_-20px_rgba(0,0,0,0.6),inset_0_3px_4px_rgba(255,255,255,0.2),inset_0_-3px_4px_rgba(0,0,0,0.7)]"
              >
                <div className="pointer-events-none absolute inset-[10px] rounded-[2rem] bg-white/90 dark:bg-black/88 shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-4px_8px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_4px_8px_rgba(0,0,0,0.6),inset_0_-4px_8px_rgba(255,255,255,0.2)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_18%,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.24)_34%,rgba(255,255,255,0.06)_64%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(120%_90%_at_50%_18%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.08)_34%,rgba(255,255,255,0.02)_64%,rgba(255,255,255,0)_100%)]" />
                <div className="pointer-events-none absolute inset-[12%] rounded-[2rem] bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.34),rgba(255,255,255,0.04)_68%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_68%,rgba(255,255,255,0)_100%)] blur-xl" />
                
                <div className="relative z-10 flex flex-col items-center gap-4 py-2">
                  <div className="p-4 rounded-full bg-primary/10 text-primary">
                    <Phone className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display">Call or Text</h3>
                  <p className="text-lg text-foreground font-medium mb-2">{contactInfo.phoneDisplay}</p>
                  
                  <div className="flex gap-4 mt-auto w-full">
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-primary/10 hover:bg-primary hover:text-background text-primary transition-all duration-300 font-medium"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call</span>
                    </a>
                    <a 
                      href={`sms:${contactInfo.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-primary/10 hover:bg-primary hover:text-background text-primary transition-all duration-300 font-medium"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Text</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* Abstract hero background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[1200px] max-h-[1200px] opacity-20 pointer-events-none z-0"></div>
      </section>
    </Layout>
  );
}
