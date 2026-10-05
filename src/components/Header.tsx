import React, { useState, useEffect } from 'react';
import { Search, Globe, User, ChevronDown, BarChart2, ShieldCheck, Trophy, Sparkles, SlidersHorizontal } from 'lucide-react';

interface HeaderProps {
  currentView: 'landing' | 'supercharts' | 'paper-trading';
  onNavigateView: (view: 'landing' | 'supercharts' | 'paper-trading') => void;
  onOpenSearch: () => void;
  onOpenBrokers: () => void;
  onOpenLeap: () => void;
  onOpenAuth: () => void;
  accountEquity: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateView,
  onOpenSearch,
  onOpenBrokers,
  onOpenLeap,
  onOpenAuth,
  accountEquity,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  return (
    <header className="sticky top-0 z-50 bg-[#000000]/95 backdrop-blur-md border-b border-[#2a2e39]/80 px-4 lg:px-6 h-16 flex items-center justify-between transition-colors">
      {/* Left Navigation Bar Section */}
      <div className="flex items-center space-x-5 lg:space-x-7">
        {/* TradingView Logo Mark */}
        <button
          onClick={() => onNavigateView('landing')}
          className="flex items-center space-x-2 focus:outline-none group text-left"
          title="TradingView Home"
        >
          <svg className="h-6 w-9 fill-white group-hover:fill-tv-blue transition-colors" viewBox="0 0 36 28">
            <path d="M14 22H7V6h7v16zm8-22h-6v28h6V0zm8 14h-6v14h6V14z"></path>
          </svg>
          <span className="font-black text-lg tracking-tight text-white hidden sm:inline">
            TradingView
          </span>
        </button>

        {/* Quick Search Bar */}
        <div className="relative hidden md:flex items-center" data-purpose="search-container">
          <div className="absolute left-3 text-[#787b86] pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <button
            onClick={onOpenSearch}
            className="bg-[#1e222d] hover:bg-[#2a2e39]/80 text-xs text-[#f0f3fa] pl-9 pr-4 py-2 w-48 lg:w-56 rounded-full border border-transparent hover:border-[#2a2e39] focus:border-[#2962ff] focus:outline-none transition-all cursor-pointer flex items-center justify-between text-left group"
          >
            <span className="text-[#787b86] group-hover:text-[#d1d4dc] transition-colors">Search symbols</span>
            <kbd className="text-[10px] bg-[#2a2e39] text-[#787b86] px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
          </button>
        </div>

        {/* Main Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          {/* Products with drop */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveMenu('products')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              onClick={() => onNavigateView('supercharts')}
              className={`flex items-center gap-1 transition-colors ${
                currentView === 'supercharts' ? 'text-[#2962ff] font-semibold' : 'text-white hover:text-white/80'
              }`}
            >
              Products
              <ChevronDown className="w-3.5 h-3.5 text-[#787b86]" />
            </button>

            {activeMenu === 'products' && (
              <div className="absolute top-full left-0 pt-2 w-64 z-50">
                <div className="bg-[#1e222d] border border-[#2a2e39] rounded-xl p-2 shadow-2xl space-y-1">
                  <button
                    onClick={() => {
                      onNavigateView('supercharts');
                      setActiveMenu(null);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#2a2e39] flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-white text-xs font-semibold group-hover:text-[#2962ff] transition-colors">
                        Supercharts Pro
                      </div>
                      <div className="text-[11px] text-[#787b86]">Direct chart trading & indicators</div>
                    </div>
                    <span className="text-[10px] bg-[#2962ff]/20 text-[#2962ff] px-1.5 py-0.5 rounded font-mono">Live</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigateView('paper-trading');
                      setActiveMenu(null);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#2a2e39] flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-white text-xs font-semibold group-hover:text-[#089981] transition-colors">
                        Paper Trading Simulator
                      </div>
                      <div className="text-[11px] text-[#787b86]">$100k virtual capital sandbox</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      onOpenSearch();
                      setActiveMenu(null);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#2a2e39] flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-white text-xs font-semibold">Screeners & Heatmaps</div>
                      <div className="text-[11px] text-[#787b86]">Filter stocks, crypto, forex</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          <a 
            href="#community" 
            onClick={(e) => {
              e.preventDefault();
              if (currentView !== 'landing') onNavigateView('landing');
              const el = document.getElementById('made-to-trade');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-white hover:text-white/80 transition-colors"
          >
            Community
          </a>

          <a 
            href="#markets" 
            onClick={(e) => {
              e.preventDefault();
              onOpenSearch();
            }}
            className="text-white hover:text-white/80 transition-colors"
          >
            Markets
          </a>

          {/* Brokers Highlight */}
          <button
            onClick={onOpenBrokers}
            className="text-[#2962ff] font-semibold hover:text-[#1e53e5] transition-colors flex items-center gap-1.5"
          >
            <span>Brokers</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#089981] inline-block animate-pulse"></span>
          </button>

          {/* More menu */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveMenu('more')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-1 text-white hover:text-white/80 transition-colors">
              More
              <ChevronDown className="w-3.5 h-3.5 text-[#787b86]" />
            </button>
            {activeMenu === 'more' && (
              <div className="absolute top-full left-0 pt-2 w-52 z-50">
                <div className="bg-[#1e222d] border border-[#2a2e39] rounded-xl p-2 shadow-2xl space-y-1">
                  <button
                    onClick={() => {
                      onOpenLeap();
                      setActiveMenu(null);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#2a2e39] flex items-center gap-2 group"
                  >
                    <Trophy className="w-4 h-4 text-[#b845ed]" />
                    <span className="text-white text-xs font-medium group-hover:text-white">The Leap Tournament</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenBrokers();
                      setActiveMenu(null);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#2a2e39] flex items-center gap-2 group"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#089981]" />
                    <span className="text-white text-xs font-medium group-hover:text-white">Broker Verification</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Right Header Actions */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Quick View Mode Switcher Pill */}
        <div className="bg-[#1e222d] p-1 rounded-full border border-[#2a2e39] hidden sm:flex items-center gap-1">
          <button
            onClick={() => onNavigateView('landing')}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              currentView === 'landing'
                ? 'bg-[#2962ff] text-white font-medium shadow'
                : 'text-[#787b86] hover:text-white'
            }`}
          >
            Landing
          </button>
          <button
            onClick={() => onNavigateView('supercharts')}
            className={`px-3 py-1 text-xs rounded-full transition-all flex items-center gap-1 ${
              currentView === 'supercharts'
                ? 'bg-[#2962ff] text-white font-medium shadow'
                : 'text-[#787b86] hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Supercharts</span>
          </button>
        </div>

        {/* Mobile Search Icon */}
        <button
          onClick={onOpenSearch}
          className="md:hidden p-2 rounded-full hover:bg-[#1e222d] text-[#787b86] hover:text-white transition-colors"
          title="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center space-x-1 text-[#d1d4dc] hover:text-white text-xs font-semibold px-2 py-1.5 rounded hover:bg-[#1e222d] transition-colors"
            title="Select Language"
          >
            <Globe className="w-4 h-4 text-[#787b86]" />
            <span>{selectedLang}</span>
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 top-full mt-1 w-32 bg-[#1e222d] border border-[#2a2e39] rounded-lg p-1 shadow-2xl z-50">
              {['EN', 'ES', 'DE', 'FR', 'JA', 'ZH'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLang(lang);
                    setLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded hover:bg-[#2a2e39] ${
                    selectedLang === lang ? 'text-[#2962ff] font-bold' : 'text-white'
                  }`}
                >
                  {lang === 'EN' ? 'English (EN)' : lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile Avatar / Paper Account Button */}
        <div className="relative">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-full hover:bg-[#1e222d] text-[#787b86] hover:text-white transition-colors border border-transparent hover:border-[#2a2e39]"
            title="User Profile & Paper Balance"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#2962ff] to-[#00bcd4] flex items-center justify-center text-white text-xs font-bold shadow">
              <User className="w-4 h-4" />
            </div>
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-[#1e222d] border border-[#2a2e39] rounded-xl p-4 shadow-2xl z-50 text-xs">
              <div className="border-b border-[#2a2e39] pb-3 mb-3">
                <div className="text-[11px] text-[#787b86] uppercase tracking-wider font-semibold">Active Paper Account</div>
                <div className="text-white text-base font-bold font-mono mt-1">
                  ${accountEquity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-[#089981] font-mono text-[11px] mt-0.5">
                  +$4,250.80 (+4.25% All-Time)
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    onNavigateView('supercharts');
                    setProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg bg-[#131722] hover:bg-[#2a2e39] text-white flex items-center justify-between"
                >
                  <span>Launch Supercharts Pro</span>
                  <BarChart2 className="w-4 h-4 text-[#2962ff]" />
                </button>

                <button
                  onClick={() => {
                    onOpenBrokers();
                    setProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg bg-[#131722] hover:bg-[#2a2e39] text-white flex items-center justify-between"
                >
                  <span>Connected Brokers</span>
                  <span className="text-[10px] bg-[#089981]/20 text-[#089981] px-1.5 py-0.5 rounded">1 Active</span>
                </button>

                <button
                  onClick={() => {
                    onOpenLeap();
                    setProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg bg-[#131722] hover:bg-[#2a2e39] text-white flex items-center justify-between"
                >
                  <span>The Leap Standing</span>
                  <span className="text-[10px] text-[#b845ed] font-semibold">Rank #8</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Primary Call To Action Button */}
        <button
          onClick={onOpenAuth}
          className="bg-gradient-to-r from-[#2962ff] to-[#7928ca] hover:opacity-95 text-white font-medium text-xs md:text-sm px-4 md:px-5 py-2 rounded-full transition-all duration-200 shadow-[0_2px_14px_rgba(41,98,255,0.4)] whitespace-nowrap active:scale-95"
        >
          Get started
        </button>
      </div>
    </header>
  );
};
