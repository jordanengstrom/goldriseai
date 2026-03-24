import { motion } from "framer-motion";
import { Search, GraduationCap, Code } from "lucide-react";
import { Link } from "wouter";

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
    <section
      id="services"
      className="relative pb-8 px-4 overflow-hidden min-h-dvh flex flex-col items-center justify-center z-10"
    >
      <div className="w-full max-w-6xl mx-auto text-center z-10 px-1 sm:px-0">
        <div className="mb-10">
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
            id="our-service-model"
            className="text-muted-foreground text-xs xs:text-sm sm:text-base md:text-lg w-[400px] sm:w-auto max-w-full sm:max-w-xl md:max-w-2xl mx-auto px-2 sm:px-0 leading-normal break-words whitespace-normal"
          >
            Our service model follows a clear progression: identify opportunities, enable your team, then implement production-grade AI systems.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-md sm:max-w-2xl md:max-w-6xl mx-auto my-8 md:my-12">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="service-card group relative overflow-hidden p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] bg-white/20 dark:bg-[rgba(18,34,68,0.78)] backdrop-blur-2xl border border-white/55 dark:border-[rgb(106,156,235)] dark:ring-1 dark:ring-[rgba(120,184,255,0.42)] hover:border-primary/30 shadow-[0_12px_32px_-10px_rgba(0,0,0,0.18),inset_0_2px_3px_rgba(255,255,255,0.5),inset_0_-2px_3px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_48px_-14px_rgba(2,6,23,0.85),0_0_24px_-5px_rgba(88,140,255,0.3),inset_0_2px_3px_rgba(210,230,255,0.18),inset_0_-3px_4px_rgba(5,8,20,0.82),inset_0_12px_18px_-10px_rgba(118,174,255,0.08)] transition-all duration-500 text-left w-full"
            >
              <div className="pointer-events-none absolute inset-[10px] rounded-[2rem] bg-white/90 dark:bg-[#0f1f3d] dark:opacity-95 shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-4px_8px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_4px_8px_rgba(2,6,23,0.96),inset_0_-4px_8px_rgba(148,163,184,0.04)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_18%,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.24)_34%,rgba(255,255,255,0.06)_64%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(120%_90%_at_50%_18%,rgba(148,163,184,0.05)_0%,rgba(148,163,184,0.025)_34%,rgba(148,163,184,0.006)_64%,rgba(148,163,184,0)_100%)]" />
              <div className="pointer-events-none absolute inset-[12%] rounded-[2rem] bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.34),rgba(255,255,255,0.04)_68%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(circle_at_50%_38%,rgba(148,163,184,0.05),rgba(148,163,184,0.01)_68%,rgba(148,163,184,0)_100%)] blur-xl" />

              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>

                <h3 className="text-lg sm:text-xl font-display font-bold mb-2 text-foreground">{service.title}</h3>
                <div className="text-primary/80 font-display font-medium text-xs sm:text-sm mb-3 sm:mb-4 uppercase tracking-widest">
                  {service.subtitle}
                </div>

                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">{service.description}</p>

                <ul className="space-y-2 sm:space-y-3 border-t border-foreground/5 pt-5 sm:pt-6 mb-6 sm:mb-7">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-primary/50" />
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
          className="mt-10"
          id="ready-to-map"
        >
          <p className="text-sm text-muted-foreground mb-2">
            Ready to map your priorities? Start with a focused discovery conversation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-primary/50 bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors mt-4"
          >
            Start Your AI Services Plan
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
