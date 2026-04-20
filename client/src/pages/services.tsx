import { Layout } from "@/components/layout";
import { LiquidGradient } from "@/components/liquid-gradient";
import { HomeServicesSection } from "@/components/home-services-section";

export default function Services() {
  return (
    <Layout>
      <div className="w-full" style={{ position: "relative", overflow: "clip" }}>
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0, pointerEvents: "none" }}>
          <LiquidGradient />
        </div>

        <div className="relative z-10 w-full">
          <HomeServicesSection />
        </div>
      </div>
    </Layout>
  );
}
