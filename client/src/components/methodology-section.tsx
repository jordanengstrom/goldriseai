import { useEffect, useRef, useState } from "react";

export function MethodologySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

    const updateOpacity = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // Section progress from first entry into viewport to final exit.
      const totalRange = rect.height + viewportH;
      const travelled = viewportH - rect.top;
      const progress = clamp01(travelled / totalRange);

      // Fade in for first 15%, hold, then fade out last 15%.
      let nextOpacity = 1;
      if (progress < 0.15) nextOpacity = progress / 0.15;
      if (progress > 0.85) nextOpacity = (1 - progress) / 0.15;

      setBgOpacity(clamp01(nextOpacity));
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateOpacity);
    };

    updateOpacity();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-transparent">
      {/* Sticky Background - The Iframe Neural Network */}
      <div 
        style={{ opacity: bgOpacity }}
        className="sticky top-0 h-screen w-full z-[1] overflow-hidden"
      >
         <iframe 
           src="/network.html" 
           title="Neural Network Background"
           className="absolute top-0 left-0 w-full h-full border-none outline-none object-cover"
         />
      </div>
    </section>
  );
}
