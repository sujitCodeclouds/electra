import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function MagneticButton({ children, className = "", onClick, style }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Magnetic pull: move the element slightly toward the mouse
      gsap.to(el, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const onMouseLeave = () => {
      // Snaps back with elastic recoil
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)"
      });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`magnetic-wrap d-inline-block ${className}`}
      onClick={onClick}
      style={{ 
        position: "relative",
        cursor: "pointer",
        ...style 
      }}
    >
      {children}
    </div>
  );
}
