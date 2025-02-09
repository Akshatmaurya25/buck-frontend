"use client";

import { Space_Grotesk, Outfit, Inter, Manrope } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  ChartBarIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

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
    const particleCount = 200;
    const colors = ['#9E1F19', '#FF3B30', '#FF6B6B'];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.3 + 1,
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
            ctx.strokeStyle = `rgba(158, 31, 25, ${0.1 * (1 - distance / 100)})`;
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
    <div className={`relative w-full overflow-hidden bg-black ${spaceGrotesk.variable} font-space-grotesk`}>
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
              <li><a href="https://x.com/buck_theduck" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#9E1F19] transition-colors">About</a></li>
              <li><a href="#" className="text-white hover:text-[#9E1F19] transition-colors">Features</a></li>
              <li><a href="https://github.com/Akshatmaurya25/buck-frontend/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#9E1F19] transition-colors">Documentation</a></li>
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
                <li><a href="https://x.com/buck_theduck" target="_blank" rel="noopener noreferrer" className="block text-white hover:text-[#9E1F19] transition-colors">About</a></li>
                <li><a href="#" className="block text-white hover:text-[#9E1F19] transition-colors">Features</a></li>
                <li><a href="https://github.com/Akshatmaurya25/buck-frontend/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="block text-white hover:text-[#9E1F19] transition-colors">Documentation</a></li>
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

        {/* Features Section */}
        <section className="relative z-10 py-20 pb-44 px-4 bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Powerful <span className="text-[#9E1F19]">Features</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Experience the next generation of blockchain interaction with our advanced AI capabilities
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: CpuChipIcon,
                  title: "AI-Powered Analysis",
                  description: "Advanced machine learning algorithms for intelligent transaction processing"
                },
                {
                  icon: ShieldCheckIcon,
                  title: "Secure Transactions",
                  description: "Enterprise-grade security protocols ensuring safe blockchain operations"
                },
                {
                  icon: ChartBarIcon,
                  title: "Real-time Analytics",
                  description: "Comprehensive insights and monitoring of your blockchain activities"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-black/60 to-[#9E1F19]/10 backdrop-blur-sm
                             border border-white/10 hover:border-[#9E1F19]/50 transition-all duration-300"
                >
                  <feature.icon className="w-12 h-12 text-[#9E1F19] mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 bg-black/80 backdrop-blur-sm border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="items-center flex flex-row justify-between px-6 md:px-24 w-full h-[68px] gap-6">
              <span className="text-gray-400">
                © {new Date().getFullYear()} Buck. All rights reserved
              </span>
              <div className="flex flex-row justify-center items-center gap-6">
                <a
                  href="https://dexscreener.com/base/0x1bb9173f1493fb7951ab0eb6f159c67e53515369"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="Buck Dex"
                    loading="lazy"
                    width="24"
                    height="24"
                    src="https://www.projectplutus.ai/_next/static/media/dexscreener.83a572db.svg"
                  />
                </a>
                <a
                  href="https://x.com/buck_theduck"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="Buck Twitter"
                    loading="lazy"
                    width="24"
                    height="24"
                    src="https://www.projectplutus.ai/_next/static/media/twitter.74dede69.svg"
                  />
                </a>
                <a
                  href="https://app.gitbook.com/o/ElhT6uMw5tqdjRNqeXia/s/m2yVn8e3sHyLamXEvF1F/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="Buck Docs"
                    loading="lazy"
                    width="24"
                    height="24"
                    src="https://www.projectplutus.ai/_next/static/media/gitbooks.68aab730.svg"
                  />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}