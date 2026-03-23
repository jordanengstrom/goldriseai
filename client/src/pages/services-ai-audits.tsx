import { Layout } from "@/components/layout";
import { LiquidGradient } from "@/components/liquid-gradient";
import { Link } from "wouter";

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

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="glass-panel rounded-2xl p-6">
              <h2 className="text-lg font-display font-bold mb-2">1. Discover</h2>
              <p className="text-sm text-muted-foreground">Map workflows, bottlenecks, and repeated manual tasks.</p>
            </article>
            <article className="glass-panel rounded-2xl p-6">
              <h2 className="text-lg font-display font-bold mb-2">2. Prioritize</h2>
              <p className="text-sm text-muted-foreground">Score use cases by impact, feasibility, and timeline.</p>
            </article>
            <article className="glass-panel rounded-2xl p-6">
              <h2 className="text-lg font-display font-bold mb-2">3. Plan</h2>
              <p className="text-sm text-muted-foreground">Deliver roadmap, success metrics, and execution sequence.</p>
            </article>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-primary/50 bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors">
              Request an AI Audit
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors">
              Back to Services
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
