import { motion } from "framer-motion";
import { Search, GraduationCap, Code } from "lucide-react";
import { Link } from "wouter";
import { LiquidGradient } from "@/components/liquid-gradient";

const services = [
  {
    title: "AI Audits",
    href: "/services/ai-audits",
    subtitle: "Identify high-ROI opportunities first",
    description:
      "Map workflows, prioritize use cases, and build an implementation roadmap before committing budget.",
    icon: Search,
    bullets: ["Workflow mapping", "ROI prioritization", "Roadmap definition"],
    cta: "View AI Audit Service",
  },
  {
    title: "AI Education",
    href: "/services/ai-education",
    subtitle: "Enable adoption across your team",
    description:
      "Train leadership and operators with practical workshops, playbooks, and governance aligned to your workflows.",
    icon: GraduationCap,
    bullets: ["Role-based workshops", "Prompt playbooks", "AI policy guidance"],
    cta: "View AI Education Service",
  },
  {
    title: "AI Implementation",
    href: "/services/ai-implementation",
    subtitle: "Deploy production-ready AI systems",
    description:
      "Integrate AI into real operations with custom automations, tested architecture, and measurable delivery milestones.",
    icon: Code,
    bullets: ["Custom integrations", "Automation delivery", "Production hardening"],
    cta: "View AI Implementation Service",
  },
];

export function HomeServicesSection() {
  return (
    <section id="services" className="relative pt-10 pb-16 px-6 overflow-hidden min-h-dvh flex flex-col justify-center">
      <LiquidGradient interactive={false} className="z-0" />
      <div className="absolute inset-0 bg-white/55 dark:bg-slate-950/60 z-[1] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6 text-gradient"
          >
            Elite AI <span className="text-primary">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Our service model follows a clear progression: identify opportunities,
            enable your team, then implement production-grade AI systems.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="service-card group relative overflow-hidden p-8 rounded-[2.5rem] bg-white/20 dark:bg-[rgba(18,34,68,0.78)] backdrop-blur-2xl border border-white/55 dark:border-[rgb(106,156,235)] dark:ring-1 dark:ring-[rgba(120,184,255,0.42)] hover:border-primary/30 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.24),inset_0_3px_4px_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_96px_-28px_rgba(2,6,23,0.98),0_0_48px_-10px_rgba(88,140,255,0.5),inset_0_4px_6px_rgba(210,230,255,0.28),inset_0_-5px_8px_rgba(5,8,20,0.92),inset_0_22px_34px_-20px_rgba(118,174,255,0.12)] transition-all duration-500"
            >
              <div className="pointer-events-none absolute inset-[10px] rounded-[2rem] bg-white/90 dark:bg-[#0f1f3d] dark:opacity-95 shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-4px_8px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_4px_8px_rgba(2,6,23,0.96),inset_0_-4px_8px_rgba(148,163,184,0.04)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_18%,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.24)_34%,rgba(255,255,255,0.06)_64%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(120%_90%_at_50%_18%,rgba(148,163,184,0.05)_0%,rgba(148,163,184,0.025)_34%,rgba(148,163,184,0.006)_64%,rgba(148,163,184,0)_100%)]" />
              <div className="pointer-events-none absolute inset-[12%] rounded-[2rem] bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.34),rgba(255,255,255,0.04)_68%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(circle_at_50%_38%,rgba(148,163,184,0.05),rgba(148,163,184,0.01)_68%,rgba(148,163,184,0)_100%)] blur-xl" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-xl font-display font-bold mb-2 text-foreground">{service.title}</h3>
                <div className="text-primary/80 font-display font-medium text-sm mb-4 uppercase tracking-widest">
                  {service.subtitle}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>

                <ul className="space-y-3 border-t border-foreground/5 pt-6 mb-7">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className="inline-flex items-center justify-center rounded-full border border-primary/35 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {service.cta}
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Ready to map your priorities? Start with a focused discovery conversation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-primary/50 bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Start Your AI Services Plan
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
