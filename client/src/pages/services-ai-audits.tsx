import { Layout } from "@/components/layout";
import { LiquidGradient } from "@/components/liquid-gradient";
import { Link } from "wouter";

const processSteps = [
  {
    title: "Discovery Workshop",
    detail: "We align on goals, current systems, and workflow constraints with your key stakeholders.",
  },
  {
    title: "Workflow and Data Analysis",
    detail: "We map manual effort, friction points, and available data sources across your operations.",
  },
  {
    title: "Use Case Prioritization",
    detail: "We score candidate initiatives by impact, feasibility, and implementation effort.",
  },
  {
    title: "Roadmap and KPI Definition",
    detail: "We deliver a phased plan with timelines, ownership, and measurable success metrics.",
  },
];

const deliverables = [
  "Current-state workflow map",
  "Prioritized AI opportunity matrix",
  "Recommended tool and integration stack",
  "90-day implementation roadmap",
  "Executive brief with ROI assumptions",
];

const timeline = [
  "Week 1: Stakeholder interviews and process discovery",
  "Week 2: Opportunity scoring and technical feasibility review",
  "Week 3: Roadmap drafting and KPI design",
  "Week 4: Final presentation and implementation handoff",
];

const faqs = [
  {
    question: "How long does an AI audit usually take?",
    answer: "Most audits are completed in 3 to 4 weeks depending on team availability and process complexity.",
  },
  {
    question: "Do you require access to sensitive production systems?",
    answer: "No. We can start with stakeholder sessions, process documents, and sampled datasets before requesting deeper technical access.",
  },
  {
    question: "What size company is this best for?",
    answer: "AI audits work well for scaling teams that need a focused plan before committing to implementation spend.",
  },
  {
    question: "What happens after the audit is complete?",
    answer: "You receive a practical roadmap and can choose to execute internally or engage us for implementation support.",
  },
];

export default function ServiceAiAudits() {
  return (
    <Layout>
      <section className="relative pt-14 pb-16 px-6 overflow-hidden min-h-dvh">
        <LiquidGradient interactive={false} className="z-0" />
        <div className="absolute inset-0 bg-white/55 dark:bg-slate-950/60 z-[1] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80 mb-4">Service</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient mb-5">
            AI Audit Services
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
            We assess your current workflows, rank opportunities by ROI, and provide a clear implementation roadmap so your team can invest with confidence.
          </p>

          <div className="mt-6 rounded-2xl border border-primary/25 bg-primary/10 px-5 py-4 text-sm text-foreground/90">
            Typical outcome: a prioritized plan your team can execute within 90 days, with clear ownership and measurable KPIs.
          </div>

          <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 text-foreground">
              The Core Problem We Solve
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Most organizations know AI can create leverage, but they lack a clear execution sequence.
              Without an audit, teams often buy tools before validating workflow fit, leading to fragmented pilots,
              low adoption, and unclear ROI.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-5 text-foreground">Our Audit Process</h2>
            <article className="glass-panel rounded-2xl p-6 md:p-8">
              <div className="divide-y divide-foreground/10">
                {processSteps.map((step, index) => (
                  <div key={step.title} className="py-5 first:pt-0 last:pb-0">
                    <p className="text-xs uppercase tracking-widest text-primary/80 mb-2">Step {index + 1}</p>
                    <h3 className="text-lg font-display font-bold mb-2 text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.detail}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="glass-panel rounded-2xl p-6">
              <h2 className="text-2xl font-display font-bold mb-4 text-foreground">Deliverables</h2>
              <ul className="space-y-3">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-primary/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass-panel rounded-2xl p-6">
              <h2 className="text-2xl font-display font-bold mb-4 text-foreground">Typical Timeline</h2>
              <ul className="space-y-3">
                {timeline.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-primary/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-5 text-foreground">Frequently Asked Questions</h2>
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
                  href="/services/ai-education"
                  className="group block rounded-xl px-4 py-4 hover:bg-primary/10 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">AI Education</h3>
                      <p className="text-sm text-muted-foreground">Train your team to adopt AI consistently and responsibly.</p>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-primary/80 group-hover:translate-x-1 transition-transform">View</span>
                  </div>
                </Link>
                <Link
                  href="/services/ai-implementation"
                  className="group block rounded-xl px-4 py-4 hover:bg-primary/10 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">AI Implementation</h3>
                      <p className="text-sm text-muted-foreground">Deploy high-priority opportunities into production workflows.</p>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-primary/80 group-hover:translate-x-1 transition-transform">View</span>
                  </div>
                </Link>
              </div>
            </article>
          </section>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-primary/50 bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors">
              Request an AI Audit
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
