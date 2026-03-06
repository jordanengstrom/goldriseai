import { Layout } from "@/components/layout";
import { ProcessDiagram } from "@/components/process-diagram";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="max-w-4xl mx-auto text-center z-10">
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
              Next-Gen AI Consultancy
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] mb-8 tracking-tight text-white drop-shadow-2xl">
              Elevate Your <br/>
              <span className="text-gradient-gold">Business</span> with AI.
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            We empower independent creators and SMBs to harness the power of artificial intelligence. Streamline operations, multiply creative output, and scale without limits.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* The main CTA is just the dialog trigger styled larger */}
            <div className="scale-125 origin-center">
               <ContactFormDialog />
            </div>
            
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest px-4">or</span>
            
            <a href="#process" className="text-sm font-medium text-white hover:text-primary transition-colors border-b border-white/20 hover:border-primary pb-1 uppercase tracking-wider">
              Explore Methodology
            </a>
          </motion.div>
        </div>

        {/* Abstract hero background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[1200px] max-h-[1200px] opacity-20 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent blur-3xl" />
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="bg-black/20 border-y border-white/5 relative z-10">
        <ProcessDiagram />
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
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
