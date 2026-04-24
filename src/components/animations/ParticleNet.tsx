'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  lineColor: string;
}

const NODE_COUNT = 20;
const MAX_DISTANCE = 180;
const NODE_RADIUS_MIN = 1.5;
const NODE_RADIUS_MAX = 2;
const VELOCITY_MIN = -0.18;
const VELOCITY_MAX = 0.18;

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createParticle(width: number, height: number): Particle {
  const isGold = Math.random() > 0.5;
  const opacity = isGold ? 0.15 : 0.12;
  const color = isGold
    ? `rgba(200, 169, 126, ${opacity})`
    : `rgba(245, 245, 243, ${opacity})`;

  return {
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    vx: randomBetween(VELOCITY_MIN, VELOCITY_MAX),
    vy: randomBetween(VELOCITY_MIN, VELOCITY_MAX),
    radius: randomBetween(NODE_RADIUS_MIN, NODE_RADIUS_MAX),
    color,
    lineColor: isGold
      ? `rgba(200, 169, 126, ${opacity / 2})`
      : `rgba(245, 245, 243, ${opacity / 2})`,
  };
}

export default function ParticleNet({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  const initParticles = useCallback((width: number, height: number) => {
    particlesRef.current = Array.from({ length: NODE_COUNT }, () =>
      createParticle(width, height)
    );
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    const particles = particlesRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DISTANCE) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = p.lineColor;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
  }, []);

  const update = useCallback((width: number, height: number) => {
    const particles = particlesRef.current;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x <= 0 || p.x >= width) p.vx *= -1;
      if (p.y <= 0 || p.y >= height) p.vy *= -1;

      p.x = Math.max(0, Math.min(width, p.x));
      p.y = Math.max(0, Math.min(height, p.y));
    }
  }, []);

  const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (reducedMotion) return;

    const loop = () => {
      update(width, height);
      draw(ctx, width, height);
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
  }, [reducedMotion, update, draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const updateCanvasSize = () => {
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      return { width, height };
    };

    const { width, height } = updateCanvasSize();
    initParticles(width, height);
    draw(ctx, width, height);

    if (!reducedMotion) {
      animate(ctx, width, height);
    }

    const resizeObserver = new ResizeObserver(() => {
      const { width: w, height: h } = updateCanvasSize();
      initParticles(w, h);
      draw(ctx, w, h);
      if (!reducedMotion) {
        cancelAnimationFrame(animFrameRef.current);
        animate(ctx, w, h);
      }
    });

    resizeObserver.observe(parent);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
    };
  }, [initParticles, draw, animate, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
