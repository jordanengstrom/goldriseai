import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Cpu, TrendingUp } from "lucide-react";

const steps = [
  {
    id: "01",
    label: "Inspect",
    icon: Search,
    headline: "Understand before you build.",
    body: "Every transformation starts with clarity. We embed ourselves in your operations — interviewing your team, auditing your tech stack, and mapping your data flows — to surface exactly where AI delivers outsized returns. Nothing generic, no cookie-cutter playbooks. You receive a focused diagnostic that identifies your three highest-leverage integration points and a prioritized roadmap to reach them.",
    detail: "Workflow audits · Data readiness assessment · Opportunity scoring · KPI definition",
  },
  {
    id: "02",
    label: "Integrate",
    icon: Cpu,
    headline: "Engineering built around your reality.",
    body: "We design and deploy AI solutions that slot directly into the tools your team already uses — whether that means embedding an LLM into your CRM, automating document pipelines, or standing up a custom fine-tuned model. Our engineers handle every layer of the stack: prompt architecture, API orchestration, security review, and production hardening. You get working software, not a prototype.",
    detail: "Custom LLM pipelines · API & webhook orchestration · Fine-tuning & RAG · Secure deployment",
  },
  {
    id: "03",
    label: "Improve",
    icon: TrendingUp,
    headline: "Momentum compounds over time.",
    body: "AI initiatives that aren't measured tend to drift. We establish automated evaluation loops that score output quality against your real business metrics — catching regressions early and flagging new opportunities as your usage grows. Monthly strategy reviews keep the roadmap aligned to where the business is heading, not where it was when we started.",
    detail: "Quality monitoring · A/B evaluation · Feedback loop design · Quarterly roadmap reviews",
  },
];

export function MethodologySection() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Network fades in as section enters, stays visible while user scrolls through content, fades out as section leaves
  const networkOpacity = useTransform(scrollYProgress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);

  return (
    <section id="methodology" ref={containerRef} className="relative z-[40] bg-background">

      {/* Fixed layer guarantees the neural net remains visible for the full methodology scroll span */}
      <motion.div id="neural-net" className="fixed inset-0 w-full h-[100dvh] pointer-events-none z-0" style={{ opacity: networkOpacity }}>
        <iframe
          src="/network.html"
          title="Neural Network Background"
          className="absolute inset-0 w-full h-full border-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60" />
      </motion.div>
      <div id="methodology-content" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-24"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6 opacity-80">
            How We Work
          </p>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-medium tracking-tight text-foreground drop-shadow-sm">
            Our{" "}
            <span className="italic text-primary">Methodology</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            A deliberate three-phase framework — refined across dozens of enterprise engagements — that
            turns AI potential into measurable business outcomes.
          </p>
        </motion.div>

        {/* Three steps */}
        <div className="max-w-5xl mx-auto px-6 pb-36 flex flex-col gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 * idx }}
                className="group relative rounded-3xl border border-white/10 bg-background/70 backdrop-blur-2xl p-10 md:p-14 overflow-hidden shadow-2xl"
              >
                {/* Subtle gradient accent per card */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] via-transparent to-transparent pointer-events-none rounded-3xl" />

                <div className="relative flex flex-col md:flex-row gap-10 md:gap-16 items-start">

                  {/* Left: number + icon */}
                  <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-4">
                    <span className="text-7xl md:text-8xl font-black text-primary/[0.12] leading-none select-none tracking-tighter">
                      {step.id}
                    </span>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-center">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Right: text */}
                  <div className="flex-1 space-y-4">
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                      {step.label}
                    </h3>
                    <p className="text-base md:text-lg font-medium text-primary/80 italic">
                      {step.headline}
                    </p>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light">
                      {step.body}
                    </p>
                    <p className="pt-2 text-xs font-semibold tracking-widest uppercase text-primary/50">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
