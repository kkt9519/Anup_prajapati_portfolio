import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * CyberBackground — TCS HackQuest Season 11 Cybersecurity Aesthetic
 * Features:
 * - Deep midnight obsidian base (#02040a / #030712)
 * - Tactical digital cyber grid & perspective horizon grid
 * - Animated scanning cyber-beam
 * - Faint circuit-board traces with pulsing signal packets (SVG)
 * - High-performance HTML5 Canvas rendering glowing network constellation & falling hex data streams
 * - Atmospheric neon cyan (#00f2fe) & electric blue (#38bdf8) radial glow nebulae
 * - Subtle HUD telemetry markers (TCS_HQ_11 :: SEC_MONITOR)
 * - Strictly non-blocking: pointer-events: none, z-index: 0 / -10
 */
export default function CyberBackground() {
  const { theme } = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth || 1440);
    let height = (canvas.height = window.innerHeight || 900);

    // Track mouse position for subtle interactive network pull (non-blocking)
    const mouse = { x: -1000, y: -1000, active: false };

    const handlePointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // Handle responsive resize with throttling
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initNodes();
        initDataStreams();
        drawFrame();
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    // 1. Constellation Nodes (Network Topology)
    let nodes = [];
    const isMobile = width < 768;
    const nodeCount = isMobile ? 24 : 50;
    const maxConnectDistance = isMobile ? 100 : 145;

    function initNodes() {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.6 + 1.2,
          baseAlpha: Math.random() * 0.45 + 0.4,
          pulseSpeed: Math.random() * 0.02 + 0.015,
          pulsePhase: Math.random() * Math.PI * 2,
          isCyan: Math.random() > 0.35,
        });
      }
    }

    // 2. Data Streams / Matrix-style cyber tokens
    let dataTokens = [];
    const tokenWords = [
      '0x7F', '0101', 'TCP/IP', 'AUTH_OK', 'PORT:443', 'HQ11',
      'ROOT_ACCESS', 'SEC_NET', 'SHA256', 'SYN', 'ACK', 'CRYPT',
      '0x4A', 'ETH0', 'SYS_INIT', '10110', 'AES_256', 'KEY:OK',
      'SCAN_01', 'NET_MAP', '0x9C', 'PING_24ms'
    ];
    const dataStreamCount = isMobile ? 12 : 24;

    function initDataStreams() {
      dataTokens = [];
      for (let i = 0; i < dataStreamCount; i++) {
        dataTokens.push({
          x: Math.random() * width,
          y: Math.random() * height,
          speed: Math.random() * 0.4 + 0.25,
          text: tokenWords[Math.floor(Math.random() * tokenWords.length)],
          alpha: Math.random() * 0.15 + 0.08,
          fontSize: 10,
        });
      }
    }

    initNodes();
    initDataStreams();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Draw single frame
    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = theme !== 'light';

      // Draw Falling Data Streams (Hex / Cyber telemetry)
      if (isDark) {
        ctx.font = '10px "JetBrains Mono", monospace';
        for (let i = 0; i < dataTokens.length; i++) {
          const t = dataTokens[i];
          ctx.fillStyle = `rgba(0, 242, 254, ${t.alpha})`;
          ctx.fillText(t.text, t.x, t.y);

          if (!prefersReducedMotion) {
            t.y += t.speed;
            if (t.y > height + 20) {
              t.y = -20;
              t.x = Math.random() * width;
              t.text = tokenWords[Math.floor(Math.random() * tokenWords.length)];
            }
          }
        }
      }

      // Draw Network Nodes & Connective Cybersecurity Lines
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        if (!prefersReducedMotion) {
          n1.x += n1.vx;
          n1.y += n1.vy;

          if (n1.x < 0) n1.x = width;
          if (n1.x > width) n1.x = 0;
          if (n1.y < 0) n1.y = height;
          if (n1.y > height) n1.y = 0;

          n1.pulsePhase += n1.pulseSpeed;
        }

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDistance) {
            const connectAlpha = (1 - dist / maxConnectDistance) * (isDark ? 0.22 : 0.08);
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = isDark
              ? `rgba(0, 240, 255, ${connectAlpha})`
              : `rgba(14, 165, 233, ${connectAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Connect to mouse if active
        if (mouse.active) {
          const mdx = n1.x - mouse.x;
          const mdy = n1.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 150) {
            const mAlpha = (1 - mDist / 150) * 0.35;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${mAlpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }

        // Draw Node Dot with subtle glow
        const currentAlpha = n1.baseAlpha + Math.sin(n1.pulsePhase) * 0.2;
        ctx.save();
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        if (isDark) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = n1.isCyan ? '#00f2fe' : '#38bdf8';
          ctx.fillStyle = n1.isCyan
            ? `rgba(0, 242, 254, ${currentAlpha})`
            : `rgba(56, 189, 248, ${currentAlpha})`;
        } else {
          ctx.fillStyle = `rgba(2, 132, 199, ${currentAlpha * 0.6})`;
        }
        ctx.fill();
        ctx.restore();
      }
    };

    // Immediate initial synchronous draw so frame 0 has content
    drawFrame();

    // Animation Loop
    const render = () => {
      if (!document.hidden) {
        drawFrame();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [theme]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Deep Midnight Cyber Gradient Base */}
      <div className="absolute inset-0 bg-[#02040a] transition-colors duration-500" />

      {/* 2. Atmospheric Cyber Glow Nebulae */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-cyan-500/14 blur-[140px] animate-pulse-slow" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-blue-600/12 blur-[160px] animate-glow-pulse" />
      <div className="absolute -bottom-32 left-1/4 w-[650px] h-[650px] rounded-full bg-indigo-600/12 blur-[150px]" />

      {/* 3. TCS HackQuest Tactical Digital Grid */}
      <div className="absolute inset-0 cyber-grid opacity-85" />

      {/* 4. Perspective 3D Cyber Floor / Horizon Grid */}
      <div className="cyber-grid-perspective opacity-80 hidden md:block" />

      {/* 5. Scanning Cyber Radar Beam */}
      <div className="cyber-scan-beam" />

      {/* 6. High-Tech SVG Circuit-Board Traces (Left & Right) */}
      <svg
        className="absolute top-0 left-0 h-full w-56 sm:w-80 opacity-40 dark:opacity-55 hidden sm:block pointer-events-none"
        viewBox="0 0 320 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M 24 0 L 24 190 L 74 240 L 74 430 L 134 490 L 134 740 L 64 810 L 64 1200"
          className="circuit-track"
        />
        <path
          d="M 24 0 L 24 190 L 74 240 L 74 430 L 134 490 L 134 740 L 64 810 L 64 1200"
          className="circuit-pulse"
        />
        <circle cx="74" cy="240" r="3.5" fill="#00f2fe" opacity="0.9" />
        <circle cx="134" cy="490" r="3.5" fill="#38bdf8" opacity="0.9" />
        <circle cx="64" cy="810" r="3.5" fill="#00f2fe" opacity="0.9" />

        <path
          d="M 94 0 L 94 130 L 164 200 L 164 360 L 104 420 L 104 620 L 184 700 L 184 1200"
          className="circuit-track"
        />
        <circle cx="164" cy="200" r="3" fill="#38bdf8" opacity="0.7" />
        <circle cx="104" cy="420" r="3" fill="#00f2fe" opacity="0.7" />
        <circle cx="184" cy="700" r="3" fill="#38bdf8" opacity="0.7" />
      </svg>

      <svg
        className="absolute top-0 right-0 h-full w-56 sm:w-80 opacity-40 dark:opacity-55 hidden sm:block pointer-events-none"
        viewBox="0 0 320 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M 296 0 L 296 230 L 246 280 L 246 510 L 186 570 L 186 830 L 256 900 L 256 1200"
          className="circuit-track"
        />
        <path
          d="M 296 0 L 296 230 L 246 280 L 246 510 L 186 570 L 186 830 L 256 900 L 256 1200"
          className="circuit-pulse"
        />
        <circle cx="246" cy="280" r="3.5" fill="#00f2fe" opacity="0.9" />
        <circle cx="186" cy="570" r="3.5" fill="#38bdf8" opacity="0.9" />
        <circle cx="256" cy="900" r="3.5" fill="#00f2fe" opacity="0.9" />

        <path
          d="M 226 0 L 226 150 L 156 220 L 156 390 L 216 450 L 216 710 L 146 780 L 146 1200"
          className="circuit-track"
        />
        <circle cx="156" cy="220" r="3" fill="#38bdf8" opacity="0.7" />
        <circle cx="216" cy="450" r="3" fill="#00f2fe" opacity="0.7" />
        <circle cx="146" cy="780" r="3" fill="#38bdf8" opacity="0.7" />
      </svg>

      {/* 7. HTML5 Interactive Network & Data Stream Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* 8. TCS HackQuest Tactical Corner HUD Telemetry */}
      <div className="absolute top-20 left-6 text-[10px] font-mono text-cyan-400/35 tracking-wider hidden xl:block">
        SYS_STATUS: ACTIVE // NET_ID: HQ11_SEC_01 // 26.8467°N, 80.9462°E
      </div>
      <div className="absolute bottom-6 right-6 text-[10px] font-mono text-cyan-400/35 tracking-wider hidden xl:block">
        PROTOCOL: TLS_1.3 // PACKET_FLOW: OPTIMAL // ARCH: X86_64
      </div>

      {/* 9. Cinematic Vignette & Readability Contrast Shield */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 45%, rgba(2, 4, 10, 0.65) 100%)',
        }}
      />
    </div>
  );
}
