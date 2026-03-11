import { useEffect, useRef, useState } from "react";

export function MethodologySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bgWOpacity, setBgWOpacity] = useState(0);
  const [animOpacity, setAnimOpacity] = useState(0);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [titleTransform, setTitleTransform] = useState(40);

  useEffect(() => {
    let frameId = 0;

    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

    const updateLayerOpacities = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      
      const totalRange = rect.height - viewportH;
      const travelled = -rect.top;
      
      const p = clamp01(travelled / totalRange);

      let _animOp = 0;
      if (p >= 0.05 && p < 0.2) _animOp = (p - 0.05) / 0.15;
      else if (p >= 0.2 && p < 0.65) _animOp = 1;
      else if (p >= 0.65 && p < 0.8) _animOp = 1 - (p - 0.65) / 0.15;

      let _titleOp = 0;
      let _titleTx = 40;
      if (p >= 0.3 && p < 0.4) {
        _titleOp = (p - 0.3) / 0.1;
        _titleTx = 40 * (1 - _titleOp);
      } else if (p >= 0.4 && p < 0.55) {
        _titleOp = 1;
        _titleTx = 0;
      } else if (p >= 0.55 && p < 0.6) {
        _titleOp = 1 - (p - 0.55) / 0.05;
        _titleTx = -30 * (1 - _titleOp);
      }

      setBgWOpacity(1);
      setAnimOpacity(clamp01(_animOp));
      setTitleOpacity(clamp01(_titleOp));
      setTitleTransform(_titleTx);
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateLayerOpacities);
    };

    updateLayerOpacities();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[600vh] z-[40] bg-white">
      <div 
        className={`sticky top-0 h-[100svh] w-full overflow-hidden ${bgWOpacity > 0 ? "pointer-events-auto" : "pointer-events-none"}`}
      >
         <div className="absolute inset-0 bg-white" style={{ opacity: bgWOpacity, transition: "opacity 0.1s" }} />

         <iframe 
           src="/network.html" 
           title="Neural Network Background"
           className="absolute top-0 left-0 w-full h-full border-none outline-none object-cover pointer-events-auto"
           style={{ opacity: animOpacity, zIndex: 10, transition: "opacity 0.1s" }}
         />

         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              style={{ 
                 zIndex: 20, 
                 opacity: titleOpacity, 
                 transform: `translateY(${titleTransform}px)`,
                 transition: "opacity 0.1s, transform 0.1s ease-out"
              }}>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-medium tracking-tight text-black drop-shadow-sm">
             Our <span className="italic block tracking-tighter ml-6 md:ml-20">Methodology</span>
           </h2>
         </div>
      </div>
    </section>
  );
}
