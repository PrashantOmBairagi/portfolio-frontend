"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  pulseSpeed: number;
  brightness: number;
}

interface Edge {
  from: number;
  to: number;
  activity: number;
  activitySpeed: number;
}

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = "rgba(255, 107, 82, 0.06)";
      const size = 800;
      for (let y = 0; y < window.innerHeight; y += size) {
        for (let x = 0; x < window.innerWidth; x += size) {
          ctx.beginPath();
          ctx.arc(x + size / 2, y + size / 2, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const NODE_COUNT = Math.min(Math.floor(window.innerWidth / 45), 28);
    const CONNECTION_DISTANCE = 220;
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const mouse = { x: -9999, y: -9999 };

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 2 + 1.5,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.008 + 0.004,
        brightness: Math.random() * 0.3 + 0.15,
      });
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < CONNECTION_DISTANCE * 1.5) {
          edges.push({
            from: i,
            to: j,
            activity: Math.random() * Math.PI * 2,
            activitySpeed: Math.random() * 0.015 + 0.005,
          });
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const edge of edges) {
        const a = nodes[edge.from];
        const b = nodes[edge.to];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DISTANCE) {
          edge.activity += edge.activitySpeed;
          const pulse = Math.sin(edge.activity) * 0.5 + 0.5;
          const alpha = (1 - dist / CONNECTION_DISTANCE) * (0.04 + pulse * 0.06);

          ctx.strokeStyle = `rgba(255, 107, 82, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of nodes) {
        p.pulsePhase += p.pulseSpeed;
        const pulse = Math.sin(p.pulsePhase) * 0.5 + 0.5;
        const r = p.radius + pulse * 0.8;
        const alpha = p.brightness + pulse * 0.15;

        ctx.fillStyle = `rgba(255, 107, 82, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const proximity = 1 - dist / 160;
          ctx.fillStyle = `rgba(255, 107, 82, ${proximity * 0.2})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r + 6 * proximity, 0, Math.PI * 2);
          ctx.fill();
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-60"
      aria-hidden="true"
    />
  );
}
