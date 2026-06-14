import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, FileText, ShieldCheck, Mail, Info, X, Zap, Key, CheckCircle2 } from 'lucide-react';
import { ADMOB_KEYS } from './AdMobSimulation';

interface MenuScreenProps {
  packageName?: string;
}

export default function MenuScreen({ packageName = 'com.primetecsolutions.minigames' }: MenuScreenProps) {
  const [popupContent, setPopupContent] = useState<'TERMS' | 'PRIVACY' | null>(null);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between bg-[#050117] text-white p-6 relative overflow-y-auto no-scrollbar pb-24">
      <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />

      {/* Center Grouping (Logo and Info) */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-6 z-10 w-full">
        {/* Animated Neon Gamepad Icon */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 15px rgba(139, 92, 246, 0.2)',
              '0 0 30px rgba(6, 182, 212, 0.4)',
              '0 0 15px rgba(139, 92, 246, 0.2)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center border border-violet-400/25 shadow-xl"
        >
          <Gamepad2 className="w-8 h-8 text-white animate-pulse" />
        </motion.div>

        {/* Name and Tagline */}
        <div className="text-center">
          <h2 className="text-xl font-display font-bold bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent tracking-tight">
            MINI Games
          </h2>
          <p className="text-[11px] text-zinc-400 font-sans tracking-wide mt-1">
            "Games in your Pocket"
          </p>
        </div>

        {/* Metadata Badges */}
        <div className="flex flex-col items-center gap-1 mt-1 font-mono">
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[8px] text-zinc-500">
            pkg: {packageName}
          </span>
          <span className="text-[9px] text-zinc-500">
            Build Target: Android API 34+
          </span>
        </div>
      </div>

      {/* Buttons Options Layout */}
      <div className="w-full flex flex-col gap-3.5 z-10 max-w-xs mt-2">
        {/* Terms & Conditions Button */}
        <button
          onClick={() => setPopupContent('TERMS')}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-violet-500/40 rounded-xl transition-all font-sans text-xs font-semibold tracking-wide cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-violet-600/10 flex items-center justify-center text-violet-400">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <span>Terms & Conditions</span>
          </div>
          <Zap className="w-3 h-3 text-zinc-650" />
        </button>

        {/* Privacy Policy Button */}
        <button
          onClick={() => setPopupContent('PRIVACY')}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-cyan-500/40 rounded-xl transition-all font-sans text-xs font-semibold tracking-wide cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-600/10 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span>Privacy Policy</span>
          </div>
          <Zap className="w-3 h-3 text-zinc-650" />
        </button>
      </div>

      {/* CONFIGURED GOOGLE ADMOB CONFIGURATIONS ACCORDING TO PLAYSTORE STANDARDS */}
      <div className="w-full max-w-xs bg-zinc-950/60 border border-zinc-850 rounded-xl p-4 mt-6 z-10">
        <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-display font-medium tracking-wider text-zinc-400 uppercase">
              AdMob Integration SDK
            </span>
          </div>
          <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-[8px] text-emerald-400 font-mono tracking-tight flex items-center gap-0.5">
            <CheckCircle2 className="w-2 h-2" /> IDLE
          </span>
        </div>

        <div className="space-y-2 text-[9px] font-mono text-zinc-400 leading-normal select-text">
          <div>
            <span className="text-zinc-600 block text-[8px] uppercase">Publisher ID</span>
            <span className="text-zinc-300 block bg-zinc-900/50 p-1.5 rounded truncate">{ADMOB_KEYS.publisherId}</span>
          </div>
          <div>
            <span className="text-zinc-600 block text-[8px] uppercase">Android App ID</span>
            <span className="text-zinc-300 block bg-zinc-900/50 p-1.5 rounded truncate">{ADMOB_KEYS.appId}</span>
          </div>
          <div>
            <span className="text-zinc-600 block text-[8px] uppercase">Banner Unit ID</span>
            <span className="text-zinc-300 block bg-zinc-900/50 p-1.5 rounded truncate">{ADMOB_KEYS.bannerAdUnitId}</span>
          </div>
          <div>
            <span className="text-zinc-600 block text-[8px] uppercase">Interstitial ID</span>
            <span className="text-zinc-300 block bg-zinc-900/50 p-1.5 rounded truncate">{ADMOB_KEYS.interstitialAdUnitId}</span>
          </div>
        </div>
      </div>

      {/* Powered By Primetec Solutions footer identifier */}
      <div className="text-[10px] font-mono text-zinc-600 tracking-wider text-center mt-7 uppercase">
        Powered by Primetec Solutions
      </div>

      {/* Custom pop-up modals content within simulated frame boundaries */}
      <AnimatePresence>
        {popupContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xs flex flex-col justify-end p-4"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full h-4/5 bg-[#0e0a29] border border-zinc-850 rounded-2xl flex flex-col overflow-hidden relative shadow-2xl animate-none"
            >
              {/* Colored Line highlight */}
              <div className="h-[3px] bg-gradient-to-r from-violet-600 to-cyan-400 w-full" />

              {/* Title Section */}
              <div className="px-5 py-3 border-b border-zinc-800/60 flex justify-between items-center bg-[#07041a]">
                <div className="flex items-center gap-2">
                  {popupContent === 'TERMS' ? (
                    <FileText className="w-4 h-4 text-violet-400" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  )}
                  <h3 className="font-display font-bold text-sm tracking-wide text-white">
                    {popupContent === 'TERMS' ? 'Terms & Conditions' : 'Privacy Policy'}
                  </h3>
                </div>

                <button
                  onClick={() => setPopupContent(null)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Scrollable Contents representing actual premium app rules */}
              <div className="flex-1 overflow-y-auto p-5 text-xs text-zinc-350 leading-relaxed font-sans space-y-4 no-scrollbar select-text">
                {popupContent === 'TERMS' ? (
                  <>
                    <h4 className="text-zinc-200 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-violet-400" /> 1. License of Use
                    </h4>
                    <p>
                      Welcome to <strong>MINI Games</strong> ("Games in your Pocket"). By installing or using our application template, packaged as <code>com.primetecsolutions.minigames</code>, you acknowledge full compliance with our licenses. We provide access to third-party secure HTML5 games solely for non-commercial recreational purposes.
                    </p>

                    <h4 className="text-zinc-200 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-violet-400" /> 2. Safe Usage Sandbox
                    </h4>
                    <p>
                      You agree not to bypass sandbox policies, scrap assets, or execute malware. Play sessions are isolated, and no keylogging or unauthorized background tracking is present in the application framework.
                    </p>

                    <h4 className="text-zinc-200 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-violet-400" /> 3. Third Party Links & Game Host rules
                    </h4>
                    <p>
                      The mini games displayed are loaded from secure static assets hosted at their respective publishers' CDN (e.g., Google H5 Games Server). Your local performance depends on internet availability. We hold no liability for data consumed by these games.
                    </p>

                    <h4 className="text-zinc-200 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-violet-400" /> 4. Updates & Security Configuration
                    </h4>
                    <p>
                      MINI Games is dynamically integrated to automatically authorize secure Cleartext elements allowing retro games to function smoothly even when standard Android security modules reject unsecured content wrappers.
                    </p>
                  </>
                ) : (
                  <>
                    <h4 className="text-zinc-200 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" /> Data Collection Policy
                    </h4>
                    <p>
                      We strictly respect user privacy! <strong>MINI Games</strong> does not request, load, process, or sell any personal data. There are no registration accounts or trackers associated with the package <code>com.primetecsolutions.minigames</code>.
                    </p>

                    <h4 className="text-zinc-200 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" /> Local Storage Persistence
                    </h4>
                    <p>
                      Selected games may save your highest scores or level achievements locally inside your client-side browser cache. This score progress is fully anonymous and stays directly on your device.
                    </p>

                    <h4 className="text-zinc-200 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" /> HTTPS Security Overrides
                    </h4>
                    <p>
                      Our applet encapsulates game loading inside highly secure iframe structures using <code>referrerPolicy="no-referrer"</code> policies. This prevents third party engines from acquiring credentials or device trackers from AI Studio hosts.
                    </p>

                    <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl flex items-center gap-2 text-[10px] text-cyan-400">
                      <Mail className="w-4 h-4 shrink-0" />
                      <span>Support enquiries: support@primetecsolutions.com</span>
                    </div>
                  </>
                )}
              </div>

              {/* Close Bottom Strip */}
              <div className="p-4 bg-[#0a0525] border-t border-zinc-800/40 text-center">
                <button
                  onClick={() => setPopupContent(null)}
                  className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-semibold rounded-xl text-white transition-all cursor-pointer"
                >
                  Acquiesce & Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
