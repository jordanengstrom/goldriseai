import { Layout } from "@/components/layout";
import { LiquidGradient } from "@/components/liquid-gradient";
import { Link } from "wouter";

const architectureApproach = [
  "Define system boundaries, data flow, and integration contracts",
  "Select model/tool stack based on reliability, cost, and control",
  "Design guardrails for quality, security, and failure recovery",
  "Plan observability for usage, latency, and business KPI impact",
];

const deliveryModel = [
  "Phase 1: Pilot build for one high-value workflow",
  "Phase 2: Operational rollout with team handoff and training",
  "Phase 3: Performance tuning and expansion to adjacent workflows",
  "Phase 4: Ongoing optimization and governance reviews",
];

const faqs = [
  {
    question: "How do you choose what to implement first?",
    answer:
      "We start with use cases that combine high business impact with practical implementation feasibility, then expand from proven wins.",
  },
  {
    question: "Can you integrate with our current tools and systems?",
    answer:
      "Yes. We design around your existing stack and connect AI workflows to your internal systems through secure integrations.",
  },
  {
    question: "How do you handle reliability and quality control?",
    answer:
      "We implement testing, fallback handling, and monitoring so outputs are reviewable, measurable, and production-safe.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. We offer post-launch optimization, monitoring guidance, and iterative improvements as adoption scales.",
  },
];

export default function ServiceAiImplementation() {
  return (
    <Layout>
      <section className="relative pt-14 pb-16 px-6 overflow-hidden min-h-dvh">
        <LiquidGradient interactive={false} className="z-0" />
        <div className="absolute inset-0 bg-white/55 dark:bg-slate-950/60 z-[1] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80 mb-4">Service</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient mb-5">
            AI Implementation Services
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
            We design and ship production-ready AI workflows, integrations, and automations that align with your systems and business KPIs.
          </p>

          <div className="mt-6 rounded-2xl border border-primary/25 bg-primary/10 px-5 py-4 text-sm text-foreground/90">
            Delivery focus: practical systems that move from pilot to production with clear ownership and measurable results.
          </div>

          <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-5 text-foreground">
              Architecture Approach
            </h2>
            <article className="glass-panel rounded-2xl p-6 md:p-8">
              <ul className="divide-y divide-foreground/10">
                {architectureApproach.map((item) => (
                  <li key={item} className="py-4 first:pt-0 last:pb-0 flex items-start gap-3">
                    <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-primary/70" />
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-5 text-foreground">
              Delivery Model
            </h2>
            <article className="glass-panel rounded-2xl p-6 md:p-8">
              <ul className="divide-y divide-foreground/10">
                {deliveryModel.map((item) => (
                  <li key={item} className="py-4 first:pt-0 last:pb-0 flex items-start gap-3">
                    <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-primary/70" />
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-5 text-foreground">
              Frequently Asked Questions
            </h2>
            <article className="glass-panel rounded-2xl p-6 md:p-8">
              <div className="divide-y divide-foreground/10">
                {faqs.map((faq) => (
                  <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
                    <h3 className="text-base font-display font-bold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-5 text-foreground">Related Services</h2>
            <article className="glass-panel rounded-2xl p-3 md:p-4">
              <div className="divide-y divide-foreground/10">
                <Link
                  href="/services/ai-opportunity-assessment"
                  className="group block rounded-xl px-4 py-4 hover:bg-primary/10 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">AI Assessment</h3>
                      <p className="text-sm text-muted-foreground">Identify and rank use cases before scaling build effort.</p>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-primary/80 group-hover:translate-x-1 transition-transform">View</span>
                  </div>
                </Link>
                <Link
                  href="/services/ai-education"
                  className="group block rounded-xl px-4 py-4 hover:bg-primary/10 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">AI Education</h3>
                      <p className="text-sm text-muted-foreground">Enable teams to use implemented systems with confidence.</p>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-primary/80 group-hover:translate-x-1 transition-transform">View</span>
                  </div>
                </Link>
              </div>
            </article>
          </section>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-primary/50 bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors">
              Start Implementation Planning
            </Link>
            <Link href="/#services" className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors">
              Back to Services
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
