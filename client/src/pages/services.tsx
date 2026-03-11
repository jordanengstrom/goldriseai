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
      <section className="relative py-24 px-6 overflow-hidden">
        <LiquidGradient interactive={false} className="z-0" />
        <div className="absolute inset-0 bg-white/55 dark:bg-black/45 z-[1] pointer-events-none" />

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
                className="glass-panel p-8 rounded-2xl border-foreground/5 hover:border-primary/30 transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-xl font-display font-bold mb-2 text-foreground">
                  {service.title}
                </h3>
                <div className="text-primary/70 font-display font-medium text-sm mb-4 uppercase tracking-widest">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}