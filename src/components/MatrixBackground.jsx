import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const createParticles = (width, height, count) => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    size: Math.random() * 1.8 + 0.6,
    baseAlpha: Math.random() * 0.4 + 0.35,
    twinkleSpeed: Math.random() * 0.015 + 0.005,
    twinkleOffset: Math.random() * Math.PI * 2
  }));
};

const MatrixBackground = ({ reducedMotion = false }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = createParticles(
        canvas.width,
        canvas.height,
        reducedMotion ? 60 : 120
      );
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = (time = performance.now()) => {
      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);

      context.fillStyle = "rgba(11, 14, 38, 0.65)";
      context.fillRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // subtle drift adjustments to keep flow organic
        p.vx += (Math.random() - 0.5) * 0.002;
        p.vy += (Math.random() - 0.5) * 0.002;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const alpha = p.baseAlpha + Math.sin(time * p.twinkleSpeed + p.twinkleOffset) * 0.25;

        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${Math.max(Math.min(alpha, 1), 0.15)})`;
        context.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < (reducedMotion ? 90 : 140)) {
            const opacity = 1 - distance / (reducedMotion ? 90 : 140);
            context.strokeStyle = `rgba(178, 155, 255, ${opacity * 0.25})`;
            context.lineWidth = 0.6;
            context.beginPath();
            context.moveTo(p.x, p.y);
            context.lineTo(p2.x, p2.y);
            context.stroke();
          }
        }
      }

      if (!reducedMotion) {
        const gradient = context.createRadialGradient(
          width * 0.2,
          height * 0.2,
          0,
          width * 0.2,
          height * 0.2,
          width * 0.6
        );
        gradient.addColorStop(0, "rgba(0, 198, 167, 0.18)");
        gradient.addColorStop(1, "rgba(0, 198, 167, 0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (!reducedMotion) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      animate(performance.now());
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -3,
        opacity: 0.85
      }}
    />
  );
};

MatrixBackground.propTypes = {
  reducedMotion: PropTypes.bool
};

export default MatrixBackground;
