import { Layout } from "@/components/layout";
import { LiquidGradient } from "@/components/liquid-gradient";
import { HomeServicesSection } from "@/components/home-services-section";

export default function Services() {
  return (
    <Layout>
      <section className="relative flex min-h-dvh w-full flex-col justify-center overflow-hidden md:min-h-0 md:block">
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0, pointerEvents: "none" }}>
          <LiquidGradient />
        </div>

        <div className="relative z-10 w-full lg:pt-8 md:pt-8 pt-20 lg:pb-8 md:pb-8 pb-20">
          <HomeServicesSection />
        </div>
      </section>
    </Layout>
  );
}
