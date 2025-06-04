// components/InfiniteImageScroll.tsx
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const images = Array.from(
  { length: 30 },
  (_, i) => `https://picsum.photos/300/200?random=${i}`
);

export default function InfiniteImageScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const loop = gsap.to(container, {
        xPercent: -50,
        ease: "none",
        duration: 100,
        repeat: -1,
      });

      tweenRef.current = loop.pause(); // Ban đầu không chạy
    },
    { scope: containerRef }
  );

  const handleHover = (hovering: boolean) => {
    if (!hovering) {
      tweenRef.current?.play();
    } else {
      tweenRef.current?.pause();
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-black py-6"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div className="flex gap-4 w-max" ref={containerRef}>
        {/* 2 lần images để loop mượt */}
        {[...images, ...images].map((src, idx) => (
          <img
            key={idx}
            src={src}
            className="w-[300px] h-[200px] object-cover rounded-md shrink-0"
            alt={`scroll-img-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}
