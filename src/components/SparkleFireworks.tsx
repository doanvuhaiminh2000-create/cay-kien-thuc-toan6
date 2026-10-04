import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  type: 'sparkle' | 'circle' | 'star';
}

interface SparkleFireworksProps {
  active: boolean;
  onComplete?: () => void;
  colorTheme?: 'red' | 'purple' | 'orange' | 'gold';
}

export const SparkleFireworks: React.FC<SparkleFireworksProps> = ({
  active,
  onComplete,
  colorTheme = 'gold',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Color palettes
    const paletteMap = {
      red: ['#f87171', '#fb7185', '#fef08a', '#fbbf24', '#ffffff', '#fda4af'],
      purple: ['#c084fc', '#a855f7', '#e879f9', '#fef08a', '#ffffff', '#ddd6fe'],
      orange: ['#fb923c', '#f59e0b', '#fde047', '#fed7aa', '#ffffff', '#f43f5e'],
      gold: ['#fde047', '#f59e0b', '#fbbf24', '#fef08a', '#ffffff', '#67e8f9'],
    };

    const colors = paletteMap[colorTheme] || paletteMap.gold;
    const particles: Particle[] = [];

    // Spawn 2-3 gentle burst centers around the top & middle
    const bursts = [
      { x: width * 0.5, y: height * 0.35, count: 32 },
      { x: width * 0.38, y: height * 0.45, count: 24 },
      { x: width * 0.62, y: height * 0.45, count: 24 },
    ];

    bursts.forEach((burst, bIdx) => {
      setTimeout(() => {
        for (let i = 0; i < burst.count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 4 + 1.5;
          const types: ('sparkle' | 'circle' | 'star')[] = ['sparkle', 'circle', 'star'];

          particles.push({
            x: burst.x,
            y: burst.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 1.2, // slight upward float
            alpha: 1,
            decay: Math.random() * 0.015 + 0.012, // lasts ~1.5 - 2s
            size: Math.random() * 5 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 8,
            type: types[Math.floor(Math.random() * types.length)],
          });
        }
      }, bIdx * 200);
    });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      let aliveCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.alpha <= 0) continue;

        aliveCount++;

        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // very soft gravity
        p.vx *= 0.98; // soft air resistance
        p.alpha -= p.decay;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === 'star') {
          // 4-point sparkle star
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(0, -s * 1.4);
          ctx.quadraticCurveTo(0, 0, s * 1.4, 0);
          ctx.quadraticCurveTo(0, 0, 0, s * 1.4);
          ctx.quadraticCurveTo(0, 0, -s * 1.4, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s * 1.4);
          ctx.fill();
        } else if (p.type === 'sparkle') {
          // 8-point tiny gleam
          const s = p.size * 0.8;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(0, -s * 1.5);
          ctx.lineTo(0, s * 1.5);
          ctx.moveTo(-s * 1.5, 0);
          ctx.lineTo(s * 1.5, 0);
          ctx.stroke();
        } else {
          // Soft circular glow particle
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (aliveCount > 0 || particles.length < 80) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        if (onComplete) onComplete();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, colorTheme, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  );
};
