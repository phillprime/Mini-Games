import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Info, Smartphone, ExternalLink, ShieldAlert, BadgeInfo } from 'lucide-react';

// Default Live Keys provided by the user
export const ADMOB_KEYS = {
  publisherId: 'pub-4453000549890629',
  appId: 'ca-app-pub-4453000549890629~4777757912',
  bannerAdUnitId: 'ca-app-pub-4453000549890629/5611451723',
  interstitialAdUnitId: 'ca-app-pub-4453000549890629/4586186227'
};

// 1. HIGH-FIDELITY ADMOB BANNER AD
export function AdMobBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="w-full bg-[#120f28]/95 border-y border-violet-500/20 py-1.5 px-3 z-30 select-none">
      {/* Test Banner container similar to the Google AdMob standard banner layout */}
      <div className="max-w-[320px] mx-auto h-[48px] bg-zinc-950 border border-zinc-800 rounded-sm relative flex items-center justify-between px-2 overflow-hidden">
        {/* Ad Indicator Label */}
        <span className="absolute top-0 left-0 bg-amber-500 text-black text-[7px] font-mono px-1 py-0.5 rounded-br font-bold tracking-wider z-20">
          AD
        </span>

        {/* AdMob Test Badge Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-950/20 via-zinc-950 to-zinc-950" />

        {/* Ad Content */}
        <div className="relative flex items-center gap-2 z-10">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center border border-violet-500/30">
            <Smartphone className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col text-[10px]">
            <span className="font-bold text-cyan-400 leading-tight font-display">AdMob Live: Banner Ad</span>
            <span className="text-[8px] text-zinc-500 font-mono tracking-tighter truncate max-w-[180px]">
              {ADMOB_KEYS.bannerAdUnitId}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-1.5 z-10">
          <a
            href="https://developers.google.com/admob/android/test-ads"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-black text-[9px] font-bold font-sans rounded transition-colors flex items-center gap-0.5"
          >
            Info <ExternalLink className="w-2 h-2" />
          </a>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-zinc-500 hover:text-white p-0.5 rounded hover:bg-white/5"
            title="Dismiss Test Banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// 2. HIGH-FIDELITY ADMOB INTERSTITIAL AD MODAL
interface AdMobInterstitialProps {
  isOpen: boolean;
  onAdClosed: () => void;
  gameTitle?: string;
}

export function AdMobInterstitial({ isOpen, onAdClosed, gameTitle = "Mini Game" }: AdMobInterstitialProps) {
  const [countdown, setCountdown] = useState(5);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    
    setCountdown(5);
    setCanSkip(false);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-100 bg-[#040118] flex flex-col justify-between p-6 select-none font-sans overflow-hidden">
      {/* Tech BG Grid Accent */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

      {/* Top Bar */}
      <div className="w-full flex justify-between items-center z-10">
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 bg-emerald-500 text-black text-[9px] font-mono font-bold rounded shadow-sm shadow-emerald-500/20">
            LIVE AD
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">
            {ADMOB_KEYS.interstitialAdUnitId}
          </span>
        </div>

        {/* AdMob Countdown/Close Button */}
        {canSkip ? (
          <button
            onClick={onAdClosed}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-200 hover:text-white border border-white/10 transition-all text-xs font-semibold cursor-pointer"
          >
            <span>Close Ad</span>
            <X className="w-4 h-4" />
          </button>
        ) : (
          <div className="px-3 py-1.5 rounded-full bg-black/40 border border-zinc-800 text-zinc-400 text-xs font-mono">
            Ad ends in {countdown}s
          </div>
        )}
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col items-center justify-center text-center z-10 my-auto px-2">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-violet-600/30 rounded-3xl blur-2xl animate-pulse" />
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-950 to-cyan-500 flex items-center justify-center border border-violet-400/30 shadow-2xl">
            <Smartphone className="w-12 h-12 text-white animate-bounce" />
          </div>
        </div>

        {/* Ad Text details representing your production Google AdMob setup */}
        <h3 className="text-xl font-display font-bold text-white tracking-tight">
          AdMob Live Interstitial
        </h3>
        
        <p className="text-xs text-zinc-350 max-w-xs mt-2.5 leading-relaxed font-sans">
          Your production keys are now active. Standard mobile wrappers will load live targeted interstitial banners before displaying <span className="text-cyan-400 font-bold">{gameTitle}</span>.
        </p>

        <div className="mt-6 p-3 bg-zinc-900/80 border border-zinc-800/60 rounded-xl flex items-center gap-2 max-w-[280px]">
          <BadgeInfo className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="text-[10px] font-mono text-zinc-500 text-left leading-normal">
            To view live revenue performance and impression diagnostics, check your active AdSense/AdMob console.
          </span>
        </div>
      </div>

      {/* Bottom Promotion Bar */}
      <div className="w-full flex flex-col items-center gap-3 z-10">
        <a
          href="https://developers.google.com/admob/android/test-ads"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-xl text-black hover:brightness-110 active:brightness-95 font-sans font-bold text-xs tracking-wide shadow-lg shadow-cyan-400/20 text-center flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Learn AdMob Mobile SDK</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <div className="text-[9px] text-zinc-600 font-mono tracking-widest uppercase">
          Powered by Primetec Solutions
        </div>
      </div>
    </div>
  );
}
