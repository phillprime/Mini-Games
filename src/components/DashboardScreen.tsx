import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Game } from '../types';
import { GAMES } from '../gamesData';
import { Search, Trophy, Play, Star, Sparkles, Flame, CheckCircle } from 'lucide-react';

interface DashboardScreenProps {
  onSelectGame: (game: Game) => void;
}

export default function DashboardScreen({ onSelectGame }: DashboardScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'ACTION' | 'PUZZLE' | 'RACING'>('ALL');

  // Map games to categorized flags to enrich sorting
  const gamesWithCategories = useMemo(() => {
    return GAMES.map(game => {
      let category: 'ACTION' | 'PUZZLE' | 'RACING' = 'PUZZLE';
      const titleLower = game.title.toLowerCase();
      if (titleLower.includes('race') || titleLower.includes('speed') || titleLower.includes('bowling') || titleLower.includes('rush')) {
        category = 'ACTION';
      } else if (titleLower.includes('racing') || titleLower.includes('crash')) {
        category = 'RACING';
      }
      return { ...game, category };
    });
  }, []);

  // Filter games based on search and category tab
  const filteredGames = useMemo(() => {
    return gamesWithCategories.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'ALL' || game.category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [gamesWithCategories, searchQuery, activeTab]);

  return (
    <div className="w-full h-full flex flex-col bg-[#050117] text-white">
      {/* Search & Hero segment in the vertical scroll */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Featured Hero Banner */}
        <div className="p-4 pt-1 pb-2">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-violet-500/20 shadow-lg shadow-violet-950/20 group cursor-pointer"
            onClick={() => onSelectGame(GAMES[0])} // Giant Rush is the featured hero
          >
            {/* Dark gradient mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0525] via-transparent to-black/30 z-10" />
            
            {/* Game Banner Image */}
            <img
              src={GAMES[0].imageLink}
              alt={GAMES[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 z-20 flex gap-2">
              <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-display font-medium bg-red-600 border border-red-400/30 rounded-md flex items-center gap-1">
                <Flame className="w-2.5 h-2.5 animate-pulse" /> HOT
              </span>
              <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-display font-medium bg-violet-600/90 border border-violet-400/30 rounded-md flex items-center gap-1 backdrop-blur-xs">
                <Trophy className="w-2.5 h-2.5" /> EDITOR'S CHOICE
              </span>
            </div>

            {/* Game details wrapper */}
            <div className="absolute bottom-3 left-4 right-4 z-20 flex justify-between items-end">
              <div>
                <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase mb-1">Featured Game</p>
                <h3 className="text-xl font-display font-bold text-white tracking-tight drop-shadow-md">
                  {GAMES[0].title}
                </h3>
              </div>
              
              <div className="w-9 h-9 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold shadow-lg shadow-cyan-400/30">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Categories Bar & Search bar */}
        <div className="px-4 py-2 flex flex-col gap-3">
          {/* Quick Search */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-400" />
            </span>
            <input
              type="text"
              placeholder="Search pocket game..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-zinc-900/80 border border-zinc-800 focus:border-cyan-500/50 focus:outline-none rounded-xl text-white placeholder-zinc-500 transition-colors duration-200"
            />
          </div>

          {/* Quick Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
            {(['ALL', 'ACTION', 'PUZZLE', 'RACING'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-[11px] font-display font-bold tracking-wider rounded-lg transition-all duration-200 uppercase cursor-pointer shrink-0 ${
                  activeTab === tab
                    ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/25 border border-cyan-400/40'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Scroll View Grid: 2 in a Row, proper gapping. Total 10 Cards in 5 rows */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-mono text-zinc-400 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Catalog ({filteredGames.length} Available)
            </span>
            {searchQuery && (
              <span className="text-[10px] text-cyan-400 font-mono">Found matching results</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            {filteredGames.map((game, idx) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.4) }}
                onClick={() => onSelectGame(game)}
                className="group cursor-pointer flex flex-col"
              >
                {/* Image and Box Border wrapper with exact Game Console neon borders */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-zinc-900/90 border border-zinc-800/80 group-hover:border-cyan-400/60 transition-all duration-300 shadow-lg group-hover:shadow-cyan-950/20">
                  {/* Subtle ambient image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-80 group-hover:opacity-40 transition-opacity" />

                  {/* High Quality Game Canvas Image */}
                  <img
                    src={game.imageLink}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Sparkle play icon centered or overlay badge */}
                  <div className="absolute top-2 right-2 z-20 w-6 h-6 rounded-md bg-black/70 border border-white/5 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-2.5 h-2.5 text-cyan-400 fill-cyan-400" />
                  </div>

                  {/* Corner indicator badge for ranking */}
                  <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-white/10 text-white backdrop-blur-xs border border-white/5">
                      #{game.id}
                    </span>
                  </div>
                </div>

                {/* Bold game title below the image with proper gapping */}
                <h4 className="mt-2 text-xs font-bold font-sans tracking-wide text-zinc-200 group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {game.title}
                </h4>

                {/* Subtext info for complete premium feel */}
                <div className="flex justify-between items-center mt-0.5 text-[9px] font-mono text-zinc-500">
                  <span>H5 PLAY</span>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] text-zinc-400 font-sans tracking-tighter">
                      {(4.5 + (parseInt(game.id) % 5) * 0.1).toFixed(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="w-full py-12 flex flex-col items-center justify-center text-center">
              <p className="text-sm text-zinc-500 font-mono">No games match your filters</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveTab('ALL'); }}
                className="mt-3 px-3 py-1.5 text-xs text-cyan-400 border border-cyan-400/30 rounded-lg hover:bg-cyan-950/20"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
