import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Cpu, ShieldCheck, Wifi, RefreshCw } from 'lucide-react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

const LOADING_STATUSES = [
  'Booting Mini Games Engine...',
  'Checking secure sandbox policies...',
  'Configuring cleartext web traffic exceptions...',
  'Loading pocket gaming interface...',
  'Verifying premium assets...',
  'Ready to play!'
];

export default function LoadingScreen({ onLoaded }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    // Increment loading progress smoothly
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random incremental steps to make it feel natural and responsive
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Update loading texts based on current progress
  useEffect(() => {
    const nextIdx = Math.min(
      Math.floor((progress / 100) * LOADING_STATUSES.length),
      LOADING_STATUSES.length - 1
    );
    if (nextIdx !== statusIdx) {
      setStatusIdx(nextIdx);
    }
  }, [progress, statusIdx]);

  // Handle callback when load finishes
  useEffect(() => {
    if (progress === 100) {
      const delay = setTimeout(() => {
        onLoaded();
      }, 600); // Small professional pause
      return () => clearTimeout(delay);
    }
  }, [progress, onLoaded]);

  return (
    <div className="relative w-full h-full bg-[#07021a] flex flex-col items-center justify-between p-8 text-white overflow-hidden select-none">
      {/* Visual cyber-grid overlays for tech aesthetics */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      
      {/* Decorative vertical scanlines */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-1/2 w-full animate-scanline pointer-events-none" />

      {/* Top Status Indicators (Simulated App Header Metadata) */}
      <div className="w-full flex justify-between items-center text-[10px] font-mono text-zinc-500 tracking-wider z-10 pt-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>package: com.primetecsolutions.minigames</span>
        </div>
        <div className="flex items-center gap-2">
          <Cpu className="w-3 h-3 text-violet-400" />
          <span>V1.0.0</span>
        </div>
      </div>

      {/* Center Gaming Logo & Branding */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 my-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-6"
        >
          {/* Neon Logo Border Glow Container */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-3xl blur-2xl opacity-60 animate-pulse-slow" />
          
          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-900 to-cyan-500 flex items-center justify-center border border-violet-400/40 shadow-2xl">
            <Gamepad2 className="w-12 h-12 text-white animate-bounce" style={{ animationDuration: '2.5s' }} />
          </div>
          
          {/* Pulse Ripple Rings */}
          <span className="absolute -inset-2 rounded-3xl border border-cyan-500/30 animate-ping" style={{ animationDuration: '3s' }} />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-display font-bold text-center tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent animate-glow-pulse"
        >
          MINI Games
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-sm font-sans text-zinc-400 tracking-wider uppercase font-medium mt-1.5"
        >
          Games in your Pocket
        </motion.p>
      </div>

      {/* Bottom Progress Controls and Warnings */}
      <div className="w-full max-w-xs flex flex-col items-center gap-5 z-10 pb-8">
        <div className="w-full flex justify-between items-end text-xs font-mono">
          <span className="text-zinc-500 flex items-center gap-1.5">
            <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
            <AnimatePresence mode="wait">
              <motion.span
                key={statusIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[11px] font-sans text-zinc-400 font-medium"
              >
                {LOADING_STATUSES[statusIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="text-cyan-400 font-bold text-sm tracking-tighter tabular-nums">
            {progress}%
          </span>
        </div>

        {/* Progress Bar Track */}
        <div className="relative w-full h-3 rounded-full bg-zinc-950/80 border border-zinc-800 p-0.5 overflow-hidden">
          {/* High Tech Diagonal Stripes Layer */}
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(45deg,#fff_25%,transparent_25%,transparent_50%,#fff_50%,#fff_75%,transparent_75%,transparent)] bg-[size:10px_10px]" />
          
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 relative"
            style={{ width: `${progress}%` }}
            layoutId="loading-progress"
          >
            {/* Highly detailed glow highlight at the head of the progress bar */}
            <span className="absolute top-0 right-0 h-full w-2 bg-white rounded-r-full shadow-[0_0_8px_#fff,0_0_15px_#06b6d4] animate-pulse" />
          </motion.div>
        </div>

        {/* App Compliance / Sandbox notice labels */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-600 font-mono text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
          <span>Secure Web Sandbox Enabled (HTTPS Policy)</span>
        </div>
      </div>
    </div>
  );
}
