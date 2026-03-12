import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { Search, GraduationCap, Code } from "lucide-react";
import { LiquidGradient } from "@/components/liquid-gradient";

const services = [
  {
    title: "Identifying AI Opportunities",
    subtitle: "AI Audits",
    description: "We conduct deep-dive technical audits of your current business workflows to identify high-impact areas where AI can reduce manual labor, cut costs, and unlock new revenue streams.",
    icon: Search,
    features: [
      "Workflow mapping & analysis",
      "Cost-benefit projection",
      "Tool selection & stack recommendation",
      "Implementation roadmap"
    ]
  },
  {
    title: "Educating your team on AI",
    subtitle: "AI Education",
    description: "AI is only as good as the people using it. We provide tailored workshops and ongoing education to ensure your team is proficient in prompting, AI ethics, and tool management.",
    icon: GraduationCap,
    features: [
      "Executive AI strategy sessions",
      "Hands-on prompt engineering workshops",
      "Custom internal documentation",
      "AI safety & policy training"
    ]
  },
  {
    title: "Developing custom AI solutions",
    subtitle: "AI Implementation",
    description: "From custom LLM integrations to automated agentic workflows, we build the bespoke infrastructure your business needs to operate at the cutting edge of the AI revolution.",
    icon: Code,
    features: [
      "Custom RAG & LLM fine-tuning",
      "Automated business agents",
      "API & tool integration",
      "Scalable cloud infrastructure"
    ]
  }
];

export default function Services() {
  return (
    <Layout>
      <section className="relative py-24 px-6 overflow-hidden flex-1 flex flex-col justify-center">
        <LiquidGradient interactive={false} className="z-0" />
        <div className="absolute inset-0 bg-white/55 dark:bg-slate-950/60 z-[1] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-display font-bold mb-6 text-gradient"
            >
              Elite AI <span className="text-primary">Services</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              We provide the bridge between legacy workflows and the autonomous future. 
              Precision-engineered solutions for high-growth enterprises.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="group relative overflow-hidden p-8 rounded-[2.5rem] bg-white/20 dark:bg-slate-950/45 backdrop-blur-2xl border border-white/55 dark:border-slate-200/15 hover:border-primary/30 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.24),inset_0_3px_4px_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.3)] dark:shadow-[0_24px_64px_-20px_rgba(2,6,23,0.75),inset_0_3px_4px_rgba(148,163,184,0.18),inset_0_-3px_4px_rgba(2,6,23,0.8)] transition-all duration-500"
              >
                <div className="pointer-events-none absolute inset-[10px] rounded-[2rem] bg-white/90 dark:bg-[#0f1f3d] dark:opacity-95 shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-4px_8px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_4px_8px_rgba(2,6,23,0.7),inset_0_-4px_8px_rgba(148,163,184,0.15)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_18%,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.24)_34%,rgba(255,255,255,0.06)_64%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(120%_90%_at_50%_18%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.08)_34%,rgba(255,255,255,0.02)_64%,rgba(255,255,255,0)_100%)]" />
                <div className="pointer-events-none absolute inset-[12%] rounded-[2rem] bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.34),rgba(255,255,255,0.04)_68%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_68%,rgba(255,255,255,0)_100%)] blur-xl" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-display font-bold mb-2 text-foreground">
                    {service.title}
                  </h3>
                <div className="text-primary/80 font-display font-medium text-sm mb-4 uppercase tracking-widest">
                  {service.subtitle}
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  {service.description}
                </p>

                <ul className="space-y-3 border-t border-foreground/5 pt-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                      {feature}
                    </li>
                  ))}
                </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}