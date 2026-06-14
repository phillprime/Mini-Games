import { useState, useEffect, ReactNode } from 'react';
import { Wifi, Signal, Battery, Smartphone, Maximize2, Minimize2, Sparkles, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface DeviceFrameProps {
  children: ReactNode;
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
  gameIdSelected?: string;
}

export default function DeviceFrame({
  children,
  isFullScreen,
  onToggleFullScreen,
  gameIdSelected
}: DeviceFrameProps) {
  const [timeState, setTimeState] = useState('');
  const [batteryState, setBatteryState] = useState(98);

  useEffect(() => {
    // Clock setup
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // mapping 0 to 12
      setTimeState(`${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Battery slow drain simulation
  useEffect(() => {
    const batteryInterval = setInterval(() => {
      setBatteryState((prev) => {
        if (prev <= 2) return 99; // Reload
        return prev - 1;
      });
    }, 180000);
    return () => clearInterval(batteryInterval);
  }, []);

  if (isFullScreen) {
    return (
      <div className="w-full h-screen bg-[#030014] relative overflow-hidden flex flex-col">
        {/* Quick Back-to-Phone Floating Button */}
        <button
          onClick={onToggleFullScreen}
          className="absolute bottom-5 right-5 z-55 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 border border-violet-400 text-xs font-display font-medium tracking-wider text-white flex items-center gap-2 shadow-lg shadow-violet-500/20 transition-all cursor-pointer"
        >
          <Minimize2 className="w-4 h-4" />
          <span>Exit Full Screen</span>
        </button>
        <div className="flex-1 w-full h-full relative overflow-hidden bg-black">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 bg-[#04011c] relative overflow-hidden">
      
      {/* Background cyber starfield stars & grids */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Controller Ribbon / Toolbar for Dev Environment context */}
      <div className="w-full max-w-[390px] mb-4 flex justify-between items-center z-40 px-1">
        <div className="flex flex-col">
          <span className="text-[11px] font-mono text-cyan-400/80 tracking-widest flex items-center gap-1.5 uppercase">
            <Sparkles className="w-3.5 h-3.5" /> MINI GAMES CONSOLE
          </span>
          <span className="text-[9px] font-sans text-zinc-500">
            Render Mode: Simulated Android Viewport
          </span>
        </div>

        <button
          onClick={onToggleFullScreen}
          className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-500/30 text-[10px] font-mono tracking-wider text-zinc-300 flex items-center gap-1.5 transition-all cursor-pointer"
          title="Switch to direct browser preview"
        >
          <Maximize2 className="w-3 h-3 text-cyan-400" />
          <span>Full Screen</span>
        </button>
      </div>

      {/* Core Physical Smartphone Chassis representation */}
      <div className="relative w-full max-w-[375px] h-[780px] bg-black rounded-[48px] border-[12px] border-zinc-900 shadow-[0_0_50px_rgba(139,92,246,0.15)] flex flex-col overflow-hidden select-none z-30">
        
        {/* Dynamic Bezel Metallic Highlights */}
        <span className="absolute inset-0 border border-zinc-800/40 rounded-[36px] pointer-events-none z-50" />
        <span className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none z-40" />

        {/* Dynamic Notch / Speaker Bar */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center items-center z-50 pointer-events-none">
          {/* Black Camera pill notch */}
          <div className="w-28 h-4 rounded-full bg-black flex items-center justify-between px-3">
            {/* Front facing speaker */}
            <div className="w-8 h-1 rounded-full bg-zinc-800" />
            {/* Front camera sensor */}
            <div className="w-2 h-2 rounded-full bg-zinc-900 border border-indigo-900" />
          </div>
        </div>

        {/* Dynamic Top Simulated Android Status Bar */}
        <div className="h-9 px-6 bg-[#07021a] text-white flex justify-between items-end pb-1.5 text-[11px] font-sans z-40 relative select-none">
          {/* Leftside clock */}
          <span className="font-medium tracking-tight text-zinc-300">
            {timeState || '03:39 PM'}
          </span>

          {/* Rightside icons (Wifi, cellular signal, battery strength) */}
          <div className="flex items-center gap-2 text-zinc-300">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5 text-cyan-400" />
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-zinc-400 tabular-nums">
                {batteryState}%
              </span>
              <Battery className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
            </div>
          </div>
        </div>

        {/* Mobile Viewport Display frame */}
        <div className="flex-1 w-full relative overflow-hidden bg-[#050117]">
          {children}
        </div>

        {/* White bottom gesture bar home line */}
        <div className="absolute bottom-1 bg-white/20 inset-x-0 h-1.5 w-32 mx-auto rounded-full pointer-events-none z-50" />
      </div>

      {/* Frame footprint description */}
      <p className="mt-4 text-[10px] font-mono text-zinc-600 text-center uppercase tracking-widest z-30">
        Package Identifier: com.primetecsolutions.minigames • Target SDK 34
      </p>
    </div>
  );
}
