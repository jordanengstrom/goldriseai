import { motion } from "framer-motion";
import { Search, Cpu, Zap } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Inspect",
    description: "We analyze your existing workflows to uncover high-impact AI opportunities specific to your niche.",
    icon: Search,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Implement",
    description: "Seamless integration of tailored AI solutions into your daily operations with minimal disruption.",
    icon: Cpu,
    color: "from-yellow-500 to-amber-500", // GoldRise primary
  },
  {
    id: 3,
    title: "Optimize",
    description: "Continuous monitoring and refinement to ensure maximum efficiency, scalability, and ROI.",
    icon: Zap,
    color: "from-purple-500 to-fuchsia-400",
  }
];

export function ProcessDiagram() {
  return (
    <div className="relative max-w-5xl mx-auto py-20 px-4">
      <div className="text-center mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-display font-bold mb-6 text-gradient"
        >
          The GoldRise Methodology
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground max-w-2xl mx-auto text-lg"
        >
          A harmonious, interconnected approach to digital transformation. We don't just add tools; we engineer evolution.
        </motion.p>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8 lg:gap-16">
        
        {/* Connection lines for Desktop */}
        <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0" />
        
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.2, type: "spring", stiffness: 100 }}
            className="relative z-10 w-full max-w-[300px]"
          >
            {/* Connecting arrows for visual flow */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-12 lg:-right-16 -translate-y-1/2 text-white/20">
                <motion.svg 
                  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                >
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </motion.svg>
              </div>
            )}

            <div className="glass-panel rounded-2xl p-8 flex flex-col items-center text-center h-full group hover:border-white/20 transition-colors duration-500 relative overflow-hidden">
              
              {/* Hover glow effect behind content */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className={`w-20 h-20 rounded-full mb-6 flex items-center justify-center bg-gradient-to-br ${step.color} bg-opacity-10 relative`}>
                <div className="absolute inset-1 rounded-full bg-background flex items-center justify-center z-10">
                  <step.icon className={`w-8 h-8 text-transparent bg-clip-text bg-gradient-to-br ${step.color}`} stroke="url(#gradient)" />
                  
                  {/* SVG Gradient definition for the icon */}
                  <svg width="0" height="0">
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="currentColor" className="text-white" />
                      <stop offset="100%" stopColor="currentColor" className="text-primary" />
                    </linearGradient>
                  </svg>
                </div>
                {/* Outer animated ring */}
                <motion.div 
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-30 blur-sm`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              <h3 className="text-2xl font-display font-bold mb-4 tracking-wide text-foreground">
                <span className="text-primary/50 text-sm mr-2">{`0${step.id}.`}</span>
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Decorative Circular Elements implying loop */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] border border-white/5 rounded-[100%] z-[-1] pointer-events-none hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
         <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(234,179,8,0.8)] -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </div>
  );
}
