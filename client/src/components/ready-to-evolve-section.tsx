import { ContactFormDialog } from "@/components/contact-form-dialog";

export function ReadyToEvolveSection() {
  return (
    <section id="ready-to-evolve" className="px-4 relative overflow-hidden flex items-center justify-center h-[480px]">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
      <div id="ready-to-evolve-content" className="max-w-3xl mx-auto text-center relative z-10 w-full">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
          Ready to <span className="text-primary">Evolve?</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          Stop competing with human limitations. Start scaling with machine precision. 
          Connect with our team to map out your AI integration strategy.
        </p>
        <div className="inline-block scale-110">
          <ContactFormDialog />
        </div>
      </div>
    </section>
  );
}
