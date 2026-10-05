import React from 'react';
import { ArrowRight, Compass, BookOpen, Building2 } from 'lucide-react';

interface ReadyToTradeSectionProps {
  onOpenHowItWorks: () => void;
  onOpenSupercharts: () => void;
  onOpenBrokers: () => void;
  onOpenToolkit: () => void;
}

export const ReadyToTradeSection: React.FC<ReadyToTradeSectionProps> = ({
  onOpenHowItWorks,
  onOpenSupercharts,
  onOpenBrokers,
  onOpenToolkit,
}) => {
  return (
    <section className="py-20 md:py-28 bg-[#131722] text-center border-b border-[#2a2e39]/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
          Ready to trade?
        </h2>
        <p className="text-base sm:text-lg text-[#787b86] max-w-xl mx-auto mb-8">
          Get started with an easy-to-follow guide to trading tools or head straight to Supercharts and experience the power of chart trading.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenHowItWorks}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#2a2e39] hover:border-white/40 text-white font-medium text-sm transition hover:bg-[#1e222d] active:scale-95"
          >
            How it all works
          </button>
          <button
            onClick={onOpenSupercharts}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#2962ff] hover:bg-[#1e53e5] text-white font-semibold text-sm transition shadow-lg shadow-[#2962ff]/30 active:scale-95"
          >
            Start trading now
          </button>
        </div>

        {/* Quick Exploration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 text-left">
          <div
            onClick={onOpenToolkit}
            className="bg-[#1e222d] p-5 rounded-xl border border-[#2a2e39] hover:border-[#2962ff] transition group cursor-pointer"
          >
            <span className="text-xs text-[#787b86] block mb-1">Discover what's possible</span>
            <h4 className="text-white font-bold group-hover:text-[#2962ff] transition-colors flex items-center justify-between">
              <span>A complete toolkit</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </h4>
          </div>

          <div
            onClick={onOpenHowItWorks}
            className="bg-[#1e222d] p-5 rounded-xl border border-[#2a2e39] hover:border-[#2962ff] transition group cursor-pointer"
          >
            <span className="text-xs text-[#787b86] block mb-1">See who inspires us</span>
            <h4 className="text-white font-bold group-hover:text-[#2962ff] transition-colors flex items-center justify-between">
              <span>Unlock the story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </h4>
          </div>

          <div
            onClick={onOpenBrokers}
            className="bg-[#1e222d] p-5 rounded-xl border border-[#2a2e39] hover:border-[#2962ff] transition group cursor-pointer"
          >
            <span className="text-xs text-[#787b86] block mb-1">Are you a broker?</span>
            <h4 className="text-white font-bold group-hover:text-[#2962ff] transition-colors flex items-center justify-between">
              <span>Brokerage integration</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};
