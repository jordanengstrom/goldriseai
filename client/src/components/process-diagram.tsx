import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Search, Cpu, Zap, Hexagon, Triangle } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Inspect",
    description: "We analyze your existing workflows to uncover high-impact AI opportunities specific to your niche.",
    icon: Search,
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-cyan-500/50",
    delay: 0.1,
  },
  {
    id: 2,
    title: "Implement",
    description: "Seamless integration of tailored AI solutions into your daily operations with minimal disruption.",
    icon: Cpu,
    color: "from-yellow-400 to-orange-500", // GoldRise primary
    shadow: "shadow-orange-500/50",
    delay: 0.3,
  },
  {
    id: 3,
    title: "Optimize",
    description: "Continuous monitoring and refinement to ensure maximum efficiency, scalability, and ROI.",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    shadow: "shadow-fuchsia-500/50",
    delay: 0.5,
  }
];

// Abstract Background Geometric Component
function FloatingGeometry({ progress }: { progress: any }) {
  const y1 = useTransform(progress, [0, 1], [0, -200]);
  const y2 = useTransform(progress, [0, 1], [0, 250]);
  const rotate1 = useTransform(progress, [0, 1], [0, 360]);
  const rotate2 = useTransform(progress, [0, 1], [360, 0]);
  const scale1 = useTransform(progress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        style={{ y: y1, rotate: rotate1, scale: scale1 }}
        className="absolute top-[10%] left-[10%] w-64 h-64 border-[1px] border-cyan-500/20 rounded-full blur-[2px]"
      />
      <motion.div
        style={{ y: y2, rotate: rotate2, scale: scale1 }}
        className="absolute bottom-[20%] right-[10%] w-96 h-96 border-[1px] border-orange-500/20 rounded-[40px] blur-[3px]"
      />
      <motion.div
        style={{ y: y1, rotate: rotate2 }}
        className="absolute top-[40%] left-[45%] w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-transparent blur-3xl"
      />
      {/* Interactive Hexagons */}
      <motion.div
        style={{ y: y2, rotate: rotate1 }}
        className="absolute top-[60%] left-[20%] text-cyan-500/10"
      >
        <Hexagon size={120} strokeWidth={0.5} />
      </motion.div>
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[20%] right-[25%] text-orange-500/10"
      >
        <Triangle size={150} strokeWidth={0.5} />
      </motion.div>
    </div>
  );
}

export function ProcessDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Animated line width for connecting nodes
  const lineScaleX = useTransform(smoothProgress, [0.2, 0.8], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-screen py-32 px-4 overflow-hidden bg-black flex items-center justify-center">
      <FloatingGeometry progress={smoothProgress} />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header Section with Staggered Text Reveal */}
        <div className="text-center mb-32 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 tracking-tight">
              The GoldRise <span className="text-primary italic font-light drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">Methodology</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-white/60 max-w-2xl mx-auto text-xl font-light tracking-wide"
          >
            A harmonious, interconnected approach to digital transformation. We don't just add tools; we engineer evolution.
          </motion.p>
        </div>

        {/* Dynamic Nodes Container */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 mt-12">
          
          {/* Animated SVG connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-[120px] left-[15%] right-[15%] h-[2px] z-0">
            {/* Base dim line */}
            <div className="absolute inset-0 bg-white/5" />
            {/* Glowing drawn line */}
            <motion.div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-orange-500 to-pink-500 shadow-[0_0_15px_currentColor] opacity-50"
              style={{ scaleX: lineScaleX, transformOrigin: "left center" }}
            />
          </div>
          
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepCard({ step, index }: { step: any, index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      style={{
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 100, rotateX: 20, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ 
        duration: 1.2, 
        delay: step.delay, 
        type: "spring", 
        bounce: 0.4 
      }}
      className="relative z-10 w-full lg:w-1/3 flex flex-col items-center group perspective-[1000px]"
    >
      {/* 3D Rotating Geometric Core */}
      <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
        {/* Pulsing Backglow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.5, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: step.delay + 0.3 }}
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} blur-2xl z-0 ${step.shadow}`}
        />
        
        {/* Orbital Rings representing Methodology */}
        <motion.div
          animate={{ rotateZ: 360, rotateX: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border border-white/20 z-0"
          style={{ transformStyle: "preserve-3d" }}
        />
        <motion.div
          animate={{ rotateZ: -360, rotateY: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 rounded-full border border-white/10 z-0"
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Central Icon container */}
        <motion.div 
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
          className="relative z-10 w-24 h-24 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden"
        >
          {/* Internal diagonal sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
          
          <step.icon className="w-10 h-10 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] relative z-10" />
        </motion.div>
      </div>

      {/* Content Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: step.delay + 0.4 }}
        className="text-center w-full px-6 relative"
      >
        <div className="inline-block relative mb-4">
          <span className={`text-sm font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r ${step.color}`}>
            Phase 0{step.id}
          </span>
          <div className={`h-[1px] w-full bg-gradient-to-r ${step.color} opacity-50 mt-1`} />
        </div>
        
        <h3 className="text-3xl font-display font-semibold mb-4 text-white group-hover:text-primary transition-colors duration-300">
          {step.title}
        </h3>
        
        <p className="text-white/60 leading-relaxed font-light text-base">
          {step.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
