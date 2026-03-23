import { Layout } from "@/components/layout";
import { LiquidGradient } from "@/components/liquid-gradient";
import { Link } from "wouter";

const proofPoints = [
  "Role-specific training tracks for executives, managers, and operators",
  "Hands-on prompt workflows tailored to your real internal tasks",
  "Practical AI governance guidance for safe and responsible usage",
  "Post-training playbooks teams can use immediately",
];

const outcomes = [
  "Higher daily AI adoption across priority workflows",
  "Faster task execution with repeatable prompting patterns",
  "Clear internal standards for tool use and data handling",
  "Stronger confidence in selecting and using AI tools",
];

const faqs = [
  {
    question: "Who should attend AI education sessions?",
    answer: "We usually train a cross-functional mix of leadership, operations, and technical stakeholders so adoption is consistent across teams.",
  },
  {
    question: "Can training be customized to our workflows?",
    answer: "Yes. We tailor sessions around your existing workflows, tools, and business goals so examples are directly applicable.",
  },
  {
    question: "How quickly can teams apply what they learn?",
    answer: "Most teams can apply core prompting and workflow techniques immediately after the first workshop.",
  },
  {
    question: "Do you include policy and governance guidance?",
    answer: "Yes. We provide practical standards for responsible usage, including review practices and role-based guardrails.",
  },
];

export default function ServiceAiEducation() {
  return (
    <Layout>
      <section className="relative pt-14 pb-16 px-6 overflow-hidden min-h-dvh">
        <LiquidGradient interactive={false} className="z-0" />
        <div className="absolute inset-0 bg-white/55 dark:bg-slate-950/60 z-[1] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80 mb-4">Service</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient mb-5">
            AI Education Services
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
            We help leadership and operators build practical AI capability through workshops, internal playbooks, and responsible adoption practices.
          </p>

          <div className="mt-6 rounded-2xl border border-primary/25 bg-primary/10 px-5 py-4 text-sm text-foreground/90">
            Core focus: practical enablement that helps your team apply AI confidently in everyday work.
          </div>

          <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-5 text-foreground">Proof Points</h2>
            <article className="glass-panel rounded-2xl p-6 md:p-8">
              <ul className="divide-y divide-foreground/10">
                {proofPoints.map((point) => (
                  <li key={point} className="py-4 first:pt-0 last:pb-0 flex items-start gap-3">
                    <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-primary/70" />
                    <p className="text-sm text-muted-foreground">{point}</p>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-5 text-foreground">Training Outcomes</h2>
            <article className="glass-panel rounded-2xl p-6 md:p-8">
              <ul className="divide-y divide-foreground/10">
                {outcomes.map((outcome) => (
                  <li key={outcome} className="py-4 first:pt-0 last:pb-0 flex items-start gap-3">
                    <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-primary/70" />
                    <p className="text-sm text-muted-foreground">{outcome}</p>
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
                  href="/services/ai-audits"
                  className="group block rounded-xl px-4 py-4 hover:bg-primary/10 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">AI Audits</h3>
                      <p className="text-sm text-muted-foreground">Prioritize the best AI opportunities before implementation.</p>
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
                      <p className="text-sm text-muted-foreground">Turn trained capability into production systems and outcomes.</p>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-primary/80 group-hover:translate-x-1 transition-transform">View</span>
                  </div>
                </Link>
              </div>
            </article>
          </section>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-primary/50 bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors">
              Plan Team Training
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
