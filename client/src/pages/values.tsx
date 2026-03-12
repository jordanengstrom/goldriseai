import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { Shield, Users, Lightbulb, Target } from "lucide-react";
import { LiquidGradient } from "@/components/liquid-gradient";

const values = [
  {
    title: "Courage",
    description: "We are not afraid to challenge the status quo. We take bold steps to innovate and drive meaningful change, even when the path is uncertain or difficult.",
    icon: Shield,
  },
  {
    title: "Collaboration",
    description: "We believe that the best solutions are built together. Our success relies on open communication, mutual respect, and seamless teamwork across all disciplines.",
    icon: Users,
  },
  {
    title: "Creativity",
    description: "Imagination is at the core of what we do. We continuously explore new ideas, blending art and technology to craft uniquely effective solutions.",
    icon: Lightbulb,
  },
  {
    title: "Commitment",
    description: "We are deeply dedicated to our mission and to the success of our clients. We deliver on our promises and hold ourselves accountable to the highest standards.",
    icon: Target,
  }
];

export default function Values() {
  return (
    <Layout>
      <section className="relative py-24 px-6 overflow-hidden min-h-dvh flex flex-col justify-center">
        <LiquidGradient interactive={false} className="z-0" />
        <div className="absolute inset-0 bg-white/55 dark:bg-slate-950/60 z-[1] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-display font-bold mb-6 text-gradient"
            >
              Our <span className="text-primary">Values</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              The foundational principles that guide our work, define our culture, and drive our vision forward.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="value-card group relative overflow-hidden p-8 rounded-[2.5rem] bg-white/20 dark:bg-[rgba(18,34,68,0.78)] backdrop-blur-2xl border border-white/55 dark:border-[rgb(106,156,235)] dark:ring-1 dark:ring-[rgba(120,184,255,0.42)] hover:border-primary/30 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.24),inset_0_3px_4px_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_96px_-28px_rgba(2,6,23,0.98),0_0_48px_-10px_rgba(88,140,255,0.5),inset_0_4px_6px_rgba(210,230,255,0.28),inset_0_-5px_8px_rgba(5,8,20,0.92),inset_0_22px_34px_-20px_rgba(118,174,255,0.12)] transition-all duration-500 flex flex-col items-center text-center"
              >
                <div className="pointer-events-none absolute inset-[10px] rounded-[2rem] bg-white/90 dark:bg-[#0f1f3d] dark:opacity-95 shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-4px_8px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_4px_8px_rgba(2,6,23,0.96),inset_0_-4px_8px_rgba(148,163,184,0.04)] transition-colors duration-300 group-hover:bg-white/95 dark:group-hover:bg-[#15284a]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_18%,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.24)_34%,rgba(255,255,255,0.06)_64%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(120%_90%_at_50%_18%,rgba(148,163,184,0.05)_0%,rgba(148,163,184,0.025)_34%,rgba(148,163,184,0.006)_64%,rgba(148,163,184,0)_100%)]" />
                <div className="pointer-events-none absolute inset-[12%] rounded-[2rem] bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.34),rgba(255,255,255,0.04)_68%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(circle_at_50%_38%,rgba(148,163,184,0.05),rgba(148,163,184,0.01)_68%,rgba(148,163,184,0)_100%)] blur-xl" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold mb-4 text-foreground lowercase tracking-wide group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
