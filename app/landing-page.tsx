"use client";

import { Space_Grotesk, Outfit, Inter, Manrope } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-space-grotesk',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-outfit',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-manrope',
});

// ...rest of your existing code...

// Particle interface
interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
  alpha: number;
}

export default function Component() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;

    const resizeCanvas: () => void = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Particle[] = [];
    const particleCount = 100;
    const colors = ['#9E1F19', '#FF3B30', '#FF6B6B'];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    // Animation function
    function animate() {
      if (!canvas) return;
      // Clear canvas with semi-transparent black
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(particle.color)?.join(',')},${particle.alpha})`;
        ctx.fill();

        // Draw connections
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(158, 31, 25, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Helper function to convert hex to rgb
  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  }

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-black ${spaceGrotesk.variable} font-space-grotesk`}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      <div className="relative z-10">
        <header className="absolute top-0 left-0 right-0 p-6">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center">
              <span className="text-2xl font-medium text-[#9E1F19]">BUCK</span>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8">
              <li><a href="#" className="text-white hover:text-[#9E1F19] transition-colors">About</a></li>
              <li><a href="#" className="text-white hover:text-[#9E1F19] transition-colors">Features</a></li>
              <li><a href="#" className="text-white hover:text-[#9E1F19] transition-colors">Documentation</a></li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#9E1F19]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-sm p-6">
              <ul className="flex flex-col space-y-6">
                <li><a href="#" className="block text-white hover:text-[#9E1F19] transition-colors">About</a></li>
                <li><a href="#" className="block text-white hover:text-[#9E1F19] transition-colors">Features</a></li>
                <li><a href="#" className="block text-white hover:text-[#9E1F19] transition-colors">Documentation</a></li>
              </ul>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-medium mb-6 text-white">
              Intelligent AI Agent for
              <span className="text-[#9E1F19]"> SEI Chain</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Execute blockchain transactions effortlessly with our AI-powered assistant
            </p>
            <button
              onClick={() => router.push('/chatpage')}
              className="group relative px-6 py-3 bg-[#9E1F19] rounded-lg overflow-hidden transition-all duration-300 ease-out hover:scale-105"
            >
              <span className="relative z-10 text-white text-lg font-medium group-hover:text-white">
                Try Buck Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#9E1F19] to-[#FF3B30] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}