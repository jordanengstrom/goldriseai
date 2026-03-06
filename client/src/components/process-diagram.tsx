import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Search, Cpu, Zap, Flame, Infinity as Eclipse } from "lucide-react";

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
    icon: Flame,
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

// Generates chaotic orbits and particles like atomic models/collide
function AtomicOrbit({ delay, color, stepId }: { delay: number, color: string, stepId: number }) {
  // Shared base tempos for synchronization
  const t1 = 15;
  const t2 = 20;
  const t3 = 12;

  if (stepId === 1) {
    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 perspective-[1200px] flex items-center justify-center">
        {/* Phase 1: Inspect - Standard analytical scan orbit */}
        <motion.div
          animate={{ rotateZ: 360, rotateX: [60, 120, 60] }}
          transition={{ duration: t1, repeat: Infinity, ease: "linear", delay }}
          className="absolute inset-[-20%] rounded-[50%] border-[2px] border-white/5 opacity-50 z-0 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div 
            className={`absolute top-0 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${color} shadow-[0_0_30px_#fff,0_0_15px_inherit]`} 
            animate={{ scale: [1, 2, 1] }} transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <motion.div
          animate={{ rotateZ: -360, rotateY: [40, 80, 40] }}
          transition={{ duration: t2, repeat: Infinity, ease: "linear", delay: delay + 2 }}
          className="absolute inset-[-40%] rounded-[50%] border-[1px] border-white/10 opacity-40 z-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div 
            className={`absolute bottom-0 left-1/4 w-3 h-3 rounded-full bg-gradient-to-r ${color} shadow-[0_0_20px_#fff] blur-[1px]`} 
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
        <motion.div
          animate={{ rotateZ: 360, rotateX: -60 }}
          transition={{ duration: t3, repeat: Infinity, ease: "linear", delay: delay + 1 }}
          className="absolute inset-[-10%] rounded-[50%] border-[1.5px] border-white/5 opacity-60 z-0"
          style={{ transformStyle: "preserve-3d" }}
        />
      </div>
    );
  } else if (stepId === 2) {
    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 perspective-[1200px] flex items-center justify-center">
        {/* Phase 2: Implement - Chaotic/Fiery energy orbit */}
        <motion.div
          animate={{ rotateZ: -360, rotateX: [80, 10, 80], rotateY: [20, 80, 20] }}
          transition={{ duration: t1, repeat: Infinity, ease: "linear", delay }}
          className="absolute inset-[-30%] rounded-[40%] border-[2px] border-white/10 opacity-60 z-0 shadow-[0_0_25px_rgba(255,255,255,0.15)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div 
            className={`absolute top-1/4 right-0 w-5 h-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${color} shadow-[0_0_40px_#fff,0_0_20px_inherit]`} 
            animate={{ scale: [1.2, 2.5, 1.2], opacity: [0.8, 1, 0.8] }} transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.div>
        <motion.div
          animate={{ rotateZ: 360, rotateX: [30, 90, 30], rotateY: [-40, -90, -40] }}
          transition={{ duration: t2, repeat: Infinity, ease: "linear", delay: delay + 1.5 }}
          className="absolute inset-[-20%] rounded-[60%] border-[1px] border-white/20 opacity-30 z-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div 
            className={`absolute bottom-1/4 left-0 w-4 h-4 rounded-full bg-gradient-to-r ${color} shadow-[0_0_25px_#fff] blur-[0.5px]`} 
            animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <motion.div
          animate={{ rotateZ: -360, rotateY: 120 }}
          transition={{ duration: t3, repeat: Infinity, ease: "linear", delay: delay + 0.5 }}
          className="absolute inset-[-45%] rounded-[50%] border-[1px] border-dashed border-white/10 opacity-50 z-0"
          style={{ transformStyle: "preserve-3d" }}
        />
      </div>
    );
  } else {
    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 perspective-[1200px] flex items-center justify-center">
        {/* Phase 3: Optimize - Highly structured, accelerating quantum sync */}
        <motion.div
          animate={{ rotateZ: 360, rotateX: [90, 90, 90], rotateY: [0, 360, 720] }}
          transition={{ duration: t1, repeat: Infinity, ease: "linear", delay }}
          className="absolute inset-[-25%] rounded-[50%] border-[2.5px] border-white/15 opacity-80 z-0 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div 
            className={`absolute top-0 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${color} shadow-[0_0_20px_#fff,0_0_10px_inherit]`} 
            animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div 
            className={`absolute bottom-0 left-1/2 w-4 h-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-r ${color} shadow-[0_0_20px_#fff,0_0_10px_inherit]`} 
            animate={{ scale: [1.5, 1, 1.5] }} transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
        <motion.div
          animate={{ rotateZ: -360, rotateX: [45, 90, 45], rotateY: [45, -45, 45] }}
          transition={{ duration: t2, repeat: Infinity, ease: "linear", delay: delay + 1 }}
          className="absolute inset-[-35%] rounded-[50%] border-[1px] border-white/10 opacity-50 z-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div 
            className={`absolute left-0 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${color} shadow-[0_0_25px_#fff] blur-[1px]`} 
            animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2.2, repeat: Infinity }}
          />
        </motion.div>
        <motion.div
          animate={{ rotateZ: 360, rotateY: -90, rotateX: [0, 180, 360] }}
          transition={{ duration: t3, repeat: Infinity, ease: "linear", delay: delay + 2 }}
          className="absolute inset-[-15%] rounded-[50%] border-[2px] border-white/5 opacity-70 z-0"
          style={{ transformStyle: "preserve-3d" }}
        />
      </div>
    );
  }
}

// Celestial/Nebula Background 
function NebulaGeometry({ progress }: { progress: any }) {
  const y1 = useTransform(progress, [0, 1], ["0%", "-30%"]);
  const y2 = useTransform(progress, [0, 1], ["0%", "30%"]);
  const rotate1 = useTransform(progress, [0, 1], [0, 90]);
  const rotate2 = useTransform(progress, [0, 1], [90, 0]);
  const scale1 = useTransform(progress, [0, 0.5, 1], [0.9, 1.1, 0.9]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#020005]">
      {/* Dense Space Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#020005] to-black opacity-100 mix-blend-multiply" />
      
      {/* Cosmos Stars Layer */}
      <div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      {/* Deep Nebula 1 (Cyan/Purple) */}
      <motion.div
        style={{ y: y1, rotate: rotate1, scale: scale1 }}
        className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] rounded-[100%] mix-blend-screen blur-[120px] opacity-40 will-change-transform"
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
         <div className="w-full h-full bg-[radial-gradient(circle,rgba(138,43,226,0.5)_0%,rgba(0,212,255,0.3)_40%,transparent_70%)]" />
      </motion.div>

      {/* Flame/Core Nebula 2 (Gold/Crimson) */}
      <motion.div
        style={{ y: y2, rotate: rotate2, scale: scale1 }}
        className="absolute top-[30%] -right-[20%] w-[90vw] h-[90vw] rounded-[100%] mix-blend-screen blur-[140px] opacity-40 will-change-transform"
        animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,140,0,0.6)_0%,rgba(220,20,60,0.3)_30%,transparent_70%)]" />
      </motion.div>

      {/* Ethereal Supernova Core Bottom */}
      <motion.div
        style={{ y: y1, scale: scale1 }}
        className="absolute bottom-[-10%] left-[30%] w-[60vw] h-[60vw] rounded-[100%] mix-blend-screen blur-[150px] opacity-50 will-change-transform"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(250,204,21,0.4)_0%,rgba(217,70,239,0.2)_40%,transparent_80%)]" />
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
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  // Plasma beam animated connection line
  const lineScaleX = useTransform(smoothProgress, [0.3, 0.7], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-screen py-40 px-4 overflow-hidden bg-black flex flex-col items-center justify-center">
      <NebulaGeometry progress={smoothProgress} />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header Section with Nebula Glowing Text */}
        <div className="text-center mb-40 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl md:text-8xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-black/20 tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              The GoldRise <span className="text-primary italic font-light drop-shadow-[0_0_35px_rgba(255,140,0,0.8)]">Methodology</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-white/70 max-w-3xl mx-auto text-xl md:text-2xl font-light tracking-wide drop-shadow-md"
          >
            Harness the primordial forces of creation. We synthesize your raw potential into an infinite loop of AI-driven optimization and growth, orchestrating chaos into alignment.
          </motion.p>
        </div>

        {/* Dynamic Nodes Container */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-24 lg:gap-12 mt-12">
          
          {/* Animated SVG connecting line representing an energy beam (desktop only) */}
          <div className="hidden lg:block absolute top-[120px] left-[15%] right-[15%] h-[4px] z-0 rounded-full">
            {/* Base dim conduit */}
            <div className="absolute inset-0 bg-white/5 rounded-full blur-[1px]" />
            {/* Glowing plasma line */}
            <motion.div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 via-orange-500 to-pink-500 rounded-full blur-[2px] opacity-80"
              style={{ scaleX: lineScaleX, transformOrigin: "left center" }}
            />
            <motion.div 
              className="absolute inset-y-0 left-0 bg-white shadow-[0_0_20px_#fff,0_0_40px_currentColor] rounded-full mix-blend-overlay"
              style={{ scaleX: lineScaleX, transformOrigin: "left center", backgroundColor: "white" }}
            />
          </div>
          
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} progress={smoothProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepCard({ step, index, progress }: { step: any, index: number, progress: any }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      style={{
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 150, rotateX: 45, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ 
        duration: 1.4, 
        delay: step.delay, 
        type: "spring", 
        bounce: 0.3 
      }}
      className="relative z-10 w-full lg:w-1/3 flex flex-col items-center group perspective-[1500px]"
    >
      {/* 3D Rotating Geometric Core */}
      <div className="relative w-56 h-56 mb-12 flex items-center justify-center pointer-events-none">
        {/* Pulsing Backglow Supernova */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.6, scale: 1 } : {}}
          transition={{ duration: 2, delay: step.delay + 0.3 }}
          className={`absolute inset-[-50%] rounded-[100%] bg-gradient-to-br ${step.color} mix-blend-screen blur-3xl z-0 ${step.shadow}`}
        />
        
        {/* Atomic Orbiting particles */}
        <AtomicOrbit delay={step.delay} color={step.color} stepId={step.id} />

        {/* Central Black Hole / Icon container */}
        <motion.div 
          whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
          className="relative z-10 w-28 h-28 bg-[#050010]/80 backdrop-blur-2xl border-[1.5px] border-white/20 rounded-full flex items-center justify-center shadow-[inset_0_0_30px_rgba(255,255,255,0.1),0_0_50px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto"
        >
          {/* Internal event horizon wrap */}
          <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,currentColor_120%)] opacity-30 ${step.color.includes('orange') ? 'text-orange-500' : step.color.includes('cyan') ? 'text-cyan-500' : 'text-purple-500'}`} />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
          
          <step.icon className={`w-12 h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)] relative z-10 filter-none ${step.id === 2 ? 'group-hover:animate-pulse group-hover:text-primary transition-colors' : ''}`} />
        </motion.div>
      </div>

      {/* Content Area */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: step.delay + 0.5 }}
        className="text-center w-full px-6 relative"
      >
        <div className="inline-block relative mb-6">
          <span className={`text-sm font-black tracking-[0.3em] uppercase bg-clip-text text-transparent bg-gradient-to-r ${step.color} drop-shadow-[0_0_10px_currentColor]`}>
            Phase 0{step.id}
          </span>
          <div className={`h-[2px] w-full bg-gradient-to-r ${step.color} opacity-80 mt-2 blur-[1px]`} />
        </div>
        
        <h3 className="text-4xl font-display font-medium mb-5 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-500 drop-shadow-lg">
          {step.title}
        </h3>
        
        <p className="text-white/60 leading-relaxed font-light text-lg">
          {step.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
