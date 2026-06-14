import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Game } from '../types';
import { Home, RefreshCw, ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react';
import ConfirmationDialog from './ConfirmationDialog';

interface WebviewScreenProps {
  game: Game;
  onGoHome: () => void;
}

export default function WebviewScreen({ game, onGoHome }: WebviewScreenProps) {
  const [iframeKey, setIframeKey] = useState(0);
  const [progress, setProgress] = useState(15);
  const [loading, setLoading] = useState(true);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);
  const [showAndroidInfo, setShowAndroidInfo] = useState(false);

  // Organic progress bar ticks
  useEffect(() => {
    setProgress(15);
    setLoading(true);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) {
          clearInterval(interval);
          return 92;
        }
        // Asymptotically approach 92% with minor randomness
        const remaining = 92 - prev;
        const jump = Math.max(0.6, remaining * 0.12) + (Math.random() * 1.5);
        return Math.min(prev + jump, 92);
      });
    }, 250);

    return () => clearInterval(interval);
  }, [iframeKey, game]);

  // When iframe triggers onLoad
  const handleIframeLoad = () => {
    setProgress(100);
    const delay = setTimeout(() => {
      setLoading(false);
    }, 500); // Leave 100% display briefly for rewarding feedback
    return () => clearTimeout(delay);
  };

  // Trigger webview reload
  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col bg-black text-white relative select-none">
      
      {/* 1. Header Bar at the top */}
      <div className="h-14 bg-[#0a0525] border-b border-zinc-800/60 px-4 flex items-center justify-between z-30">
        
        {/* Home Button in top left */}
        <button
          onClick={() => setIsExitDialogOpen(true)}
          className="w-10 h-10 -ml-2 rounded-xl flex items-center justify-center text-zinc-300 hover:text-white active:bg-white/5 transition-all cursor-pointer"
        >
          <Home className="w-5 h-5 text-cyan-400" />
        </button>

        {/* Central Display Title */}
        <div className="flex-1 text-center px-2">
          <h2 className="text-sm font-display font-medium tracking-wide text-white truncate max-w-[160px] mx-auto uppercase">
            {game.title}
          </h2>
          <p className="text-[8px] font-mono text-cyan-500/80 tracking-widest uppercase">
            ACTIVE SESSION
          </p>
        </div>

        {/* Refresh button in top right */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowAndroidInfo((prev) => !prev)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-amber-400 active:bg-white/5 transition-all cursor-pointer"
            title="Privacy & Android Cleartext Status"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleReload}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-300 hover:text-white active:bg-white/5 transition-all cursor-pointer"
            title="Reload web game"
          >
            <RefreshCw className={`w-4.5 h-4.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} style={{ animationDuration: '2s' }} />
          </button>
        </div>
      </div>

      {/* 2. Linear Loading Progress Bar situated immediately below the header */}
      <div className="relative w-full h-[3px] bg-zinc-950 overflow-hidden z-20">
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* Pulsing neon point indicator */}
              <span className="absolute top-0 right-0 h-full w-4 bg-white shadow-[0_0_8px_#fff,0_0_12px_#06b6d4] animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Security Policies notice panel (Toggleable inline notice card) */}
      <AnimatePresence>
        {showAndroidInfo && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#0f0a29] border-b border-amber-500/20 text-xs text-zinc-300 p-3.5 z-20 select-text overflow-hidden"
          >
            <div className="flex gap-2.5 items-start">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-400 mb-1">Android Cleartext Permission Setup</p>
                <p className="text-[10px] leading-relaxed text-zinc-400 font-mono">
                  This applet is fully configured with cleartext security overrides. To build on Android devices with non-HTTPS modules, the manifest specifies:
                </p>
                <pre className="bg-black/40 text-[9px] p-2 rounded border border-white/5 mt-1.5 font-mono text-cyan-300 overflow-x-auto no-scrollbar">
{`<!-- AndroidManifest.xml overrides -->
<application
  android:name=".PrimetecMiniGames"
  android:usesCleartextTraffic="true"
  android:networkSecurityConfig="@xml/network_security_ok">`}
                </pre>
                <button
                  onClick={() => setShowAndroidInfo(false)}
                  className="mt-2 text-[10px] text-cyan-400 hover:underline font-bold"
                >
                  Dismiss Info
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Full-Screen-Sized Webview (Secure Styled iFrame) */}
      <div className="flex-1 w-full bg-zinc-950 relative overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-[#060216] flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
              <div className="w-12 h-12 rounded-full border-[3px] border-cyan-400/20 border-t-cyan-400 animate-spin relative z-10" />
            </div>
            
            <p className="text-xs font-mono text-cyan-400 font-medium tracking-widest uppercase mb-1 animate-pulse">
              LOADING GAME...
            </p>
            <p className="text-2xl font-display font-black text-white tracking-widest tabular-nums drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              {Math.floor(progress)}%
            </p>
          </div>
        )}

        <iframe
          key={iframeKey}
          src={game.gameLink}
          title={game.title}
          onLoad={handleIframeLoad}
          className="w-full h-full border-none select-none bg-black"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-downloads allow-popups"
          allow="autoplay; gamepad; fullscreen; accelerometer; gyroscope"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      {/* Custom Confirmation Exit Game Dialog */}
      <ConfirmationDialog
        isOpen={isExitDialogOpen}
        onConfirm={() => {
          setIsExitDialogOpen(false);
          onGoHome();
        }}
        onCancel={() => setIsExitDialogOpen(false)}
      />
    </div>
  );
}
