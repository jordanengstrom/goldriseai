import { Layout } from "@/components/layout";
import { LiquidGradient } from "@/components/liquid-gradient";

export default function Banners() {
  return (
    <Layout>
      <section className="relative h-screen overflow-hidden">
        <LiquidGradient />
      </section>
    </Layout>
  );
}
