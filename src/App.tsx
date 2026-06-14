import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Game, ScreenType } from './types';
import DeviceFrame from './components/DeviceFrame';
import LoadingScreen from './components/LoadingScreen';
import DashboardScreen from './components/DashboardScreen';
import WebviewScreen from './components/WebviewScreen';
import MenuScreen from './components/MenuScreen';
import { AdMobBanner, AdMobInterstitial } from './components/AdMobSimulation';
import { Grid, Menu as MenuIcon, Gamepad2, Layers } from 'lucide-react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('LOADING');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // AdMob states
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [pendingGameToLaunch, setPendingGameToLaunch] = useState<Game | null>(null);

  // Switch to the Home Dashboard
  const handleLoadingComplete = () => {
    setActiveScreen('DASHBOARD');
  };

  // Launch a selected game card
  const handleSelectGame = (game: Game) => {
    setPendingGameToLaunch(game);
    setShowInterstitial(true);
  };

  const handleInterstitialClosed = () => {
    setShowInterstitial(false);
    if (pendingGameToLaunch) {
      setSelectedGame(pendingGameToLaunch);
      setActiveScreen('WEBVIEW');
      setPendingGameToLaunch(null);
    }
  };

  // Switch screens from footer navigation
  const handleGoToDashboard = () => {
    setActiveScreen('DASHBOARD');
  };

  const handleGoToMenu = () => {
    setActiveScreen('MENU');
  };

  // Exit game back to Dashboard
  const handleExitGame = () => {
    setActiveScreen('DASHBOARD');
    setSelectedGame(null);
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  // Render content depending on active screen
  const renderScreenContent = () => {
    switch (activeScreen) {
      case 'LOADING':
        return <LoadingScreen onLoaded={handleLoadingComplete} />;

      case 'DASHBOARD':
        return <DashboardScreen onSelectGame={handleSelectGame} />;

      case 'WEBVIEW':
        if (!selectedGame) return null;
        return (
          <WebviewScreen
            game={selectedGame}
            onGoHome={handleExitGame}
          />
        );

      case 'MENU':
        return <MenuScreen packageName="com.primetecsolutions.minigames" />;

      default:
        return <LoadingScreen onLoaded={handleLoadingComplete} />;
    }
  };

  // Check if header is needed (Shown in Dashboard and Menu)
  const showMainHeader = activeScreen === 'DASHBOARD' || activeScreen === 'MENU';
  
  // Check if bottom footer navigation bar is needed (Shown in Dashboard and Menu)
  const showFooterNav = activeScreen === 'DASHBOARD' || activeScreen === 'MENU';

  return (
    <DeviceFrame
      isFullScreen={isFullScreen}
      onToggleFullScreen={toggleFullScreen}
      gameIdSelected={selectedGame?.id}
    >
      <div className="w-full h-full flex flex-col relative bg-[#050117]">
        
        {/* Unified App Header for Dashboard and Menu */}
        {showMainHeader && (
          <div className="h-14 px-5 bg-[#0a0525] border-b border-zinc-800/40 flex items-center justify-between z-40 select-none">
            <div className="flex flex-col">
              {/* Bold App name top left */}
              <h1 className="text-base font-display font-black tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                MINI Games
              </h1>
              <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest leading-none">
                Games in your Pocket
              </p>
            </div>

            {/* Simulated Live Arcade Counter badge */}
            <div className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1.5 text-[9px] font-mono text-cyan-400 font-bold tracking-tighter">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>ARCADE ONLINE</span>
            </div>
          </div>
        )}

        {/* Display Frame Screen Area */}
        <div className="flex-1 w-full h-full overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="w-full h-full relative"
            >
              {renderScreenContent()}
            </motion.div>
          </AnimatePresence>

          {/* Highly immersive AdMob Interstitial Overlay */}
          <AnimatePresence>
            {showInterstitial && (
              <AdMobInterstitial
                isOpen={showInterstitial}
                onAdClosed={handleInterstitialClosed}
                gameTitle={pendingGameToLaunch?.title}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Adaptive AdMob Banner */}
        {showFooterNav && <AdMobBanner />}

        {/* Footer Navigation bar with exactly 2 options: Dashboard and Menu */}
        {showFooterNav && (
          <div className="relative h-16 bg-[#0a0525]/95 backdrop-blur-md border-t border-zinc-800/60 flex items-center justify-around px-6 z-45 select-none">
            
            {/* Dashboard Option */}
            <button
              onClick={handleGoToDashboard}
              className="flex-1 flex flex-col items-center justify-center gap-1 h-full relative transition-all group cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <Grid
                  className={`w-5 h-5 transition-all ${
                    activeScreen === 'DASHBOARD'
                      ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]'
                      : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                />
                <span
                  className={`text-[10px] font-display tracking-wider font-bold uppercase transition-all mt-1 ${
                    activeScreen === 'DASHBOARD'
                      ? 'text-cyan-400'
                      : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                >
                  Dashboard
                </span>
                
                {/* Micro underline highlight marker */}
                {activeScreen === 'DASHBOARD' && (
                  <motion.span
                    layoutId="footer-highlight"
                    className="absolute bottom-2 w-5 h-0.5 rounded bg-cyan-400"
                  />
                )}
              </div>
            </button>

            {/* Menu Option */}
            <button
              onClick={handleGoToMenu}
              className="flex-1 flex flex-col items-center justify-center gap-1 h-full relative transition-all group cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <MenuIcon
                  className={`w-5 h-5 transition-all ${
                    activeScreen === 'MENU'
                      ? 'text-violet-400 scale-110 drop-shadow-[0_0_8px_rgba(167,139,250,0.4)]'
                      : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                />
                <span
                  className={`text-[10px] font-display tracking-wider font-bold uppercase transition-all mt-1 ${
                    activeScreen === 'MENU'
                      ? 'text-violet-400'
                      : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                >
                  Menu
                </span>
                
                {/* Micro underline highlight marker */}
                {activeScreen === 'MENU' && (
                  <motion.span
                    layoutId="footer-highlight"
                    className="absolute bottom-2 w-5 h-0.5 rounded bg-violet-400"
                  />
                )}
              </div>
            </button>

          </div>
        )}

      </div>
    </DeviceFrame>
  );
}

