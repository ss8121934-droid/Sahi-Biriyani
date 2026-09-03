import React, { useEffect, useRef } from "react";

export default function SteamCanvas({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Steam particles & saffron amber motes
    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 22 + 10,
        opacity: Math.random() * 0.25 + 0.05,
        speedY: Math.random() * 0.6 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        hue: Math.random() > 0.4 ? "40, 200, 100" : "35, 100%, 75%", // amber / warm steam
        isSpark: Math.random() > 0.7,
        sparkRadius: Math.random() * 1.8 + 0.6,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -30) {
          p.y = height + 20;
          p.x = width * 0.3 + Math.random() * (width * 0.4); // concentrate towards center
        }

        if (p.isSpark) {
          // Glowing saffron ember mote
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.sparkRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 192, 89, ${p.opacity * 1.8})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#E88126";
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // Soft rolling steam puff
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.radius
          );
          gradient.addColorStop(0, `rgba(240, 220, 190, ${p.opacity * 0.4})`);
          gradient.addColorStop(0.5, `rgba(230, 200, 160, ${p.opacity * 0.15})`);
          gradient.addColorStop(1, "rgba(20, 15, 10, 0)");

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-10 w-full h-full ${className}`}
    />
  );
}
