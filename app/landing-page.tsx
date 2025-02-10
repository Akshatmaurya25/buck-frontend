"use client";

import { Space_Grotesk, Outfit, Inter, Manrope } from "next/font/google";
import { useEffect, useRef, useState, useCallback } from "react";
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

  // Add this with other state declarations at the top of your component
  const featuresRef = useRef<HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

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
              <span className="text-2xl font-medium">
                {['B', 'U', 'C', 'K', ' ', 'T', 'E', 'R', 'M', 'I', 'N', 'A', 'L'].map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      color: ['#eeeaea', '#FF6B6B', '#9E1F19']
                    }}
                    transition={{
                      opacity: { duration: 0.2, delay: index * 0.1 },
                      y: { duration: 0.2, delay: index * 0.1 },
                      color: {
                        duration: 2,
                        delay: index * 0.1,
                        repeat: Infinity,
                        repeatDelay: 4
                      }
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8">
              <li><a href="https://x.com/buck_theduck" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#9E1F19] transition-colors">About</a></li>
              <li><a href="#" onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
      className="text-white hover:text-[#9E1F19] transition-colors"
    >
      Features</a></li>
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
              <span className="text-[#9E1F19]"> SEI Network</span>
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
        <section ref={featuresRef} className="relative z-10 pb-44 px-4 bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Powerful <span className="text-[#9E1F19]">Features</span>
              </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                Revolutionizing blockchain token creation with advanced data analytics and AI-powered insights on the SEI network
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
  {
    icon: CpuChipIcon,
    title: "ERC20 Token Creation",
    description: "Deploy custom tokens on SEI blockchain with automated smart contract generation"
  },
  {
    icon: ShieldCheckIcon,
    title: "Cookie Data Swarm Analytics",
    description: "Real-time mindshare metrics, trend detection, and network effect analysis"
  },
  {
    icon: ChartBarIcon,
    title: "GAME Framework Integration",
    description: "Secure and efficient framework for decentralized network interactions by Virtual Protocol"
  }
].map((feature, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
    className="p-6 rounded-xl bg-black backdrop-blur-sm
               border border-white/10 hover:border-[#9E1F19]/50 transition-all duration-300
               relative group overflow-hidden"
    onMouseMove={handleMouseMove}
    onMouseEnter={() => setHoveredCard(index)}
    onMouseLeave={() => setHoveredCard(null)}
  >
    {/* Cursor glow effect */}
    <div
      className={`absolute pointer-events-none transition-opacity duration-300 rounded-full ${
        hoveredCard === index ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: 'radial-gradient(circle at center, rgba(158, 31, 25, 0.3) 0%, rgba(158, 31, 25, 0.1) 40%, transparent 70%)',
        transform: `translate(${mousePosition.x - 125}px, ${mousePosition.y - 125}px)`,
        width: '250px',
        height: '250px',
        left: 0,
        top: 0,
        zIndex: 5,
      }}
    />
    
    {/* Content */}
    <div className="relative z-10">
      <feature.icon className="w-12 h-12 text-[#9E1F19] mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-gray-400">{feature.description}</p>
    </div>
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

                {/* Dexscreener */}
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

                {/* Twitter handle  */}
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

                {/* Github */}
                <a
                  href="https://github.com/Akshatmaurya25/buck-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 512 512"
                    fill="#AEAFB0"
                  >
                    <path d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}