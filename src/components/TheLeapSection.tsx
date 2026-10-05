import React from 'react';
import { Trophy, Award, Zap } from 'lucide-react';

interface TheLeapSectionProps {
  onOpenLeap: () => void;
}

export const TheLeapSection: React.FC<TheLeapSectionProps> = ({ onOpenLeap }) => {
  return (
    <section className="py-16 bg-[#131722] border-b border-[#2a2e39]/40 relative overflow-hidden" id="the-leap">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative bg-gradient-to-r from-[#1a1e2b] via-[#241c38] to-[#1a1e2b] border border-[#2a2e39] rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
          {/* Subtle background glow effect */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#b845ed]/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-xs uppercase tracking-widest text-[#b845ed] font-bold">
                Tournament Series
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white mt-1 mb-4">
                The Leap
              </h2>
              <p className="text-[#d1d4dc] text-base md:text-lg mb-6 leading-relaxed">
                Compete risk-free for real-money prizes with the world's largest trading community.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left border-t border-white/10 pt-6">
                <div>
                  <h4 className="text-white font-bold text-sm">Simple and accessible</h4>
                  <p className="text-[#787b86] text-xs mt-1">No real money required, no hidden terms.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">True competition</h4>
                  <p className="text-[#787b86] text-xs mt-1">Challenge top traders and track stats.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Power of community</h4>
                  <p className="text-[#787b86] text-xs mt-1">Learn, practice, and grow together.</p>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={onOpenLeap}
                className="bg-white hover:bg-[#f0f3fa] text-black font-bold px-8 py-4 rounded-full text-base transition duration-200 shadow-xl inline-block hover:scale-105 transform active:scale-95 cursor-pointer"
              >
                Take the leap
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
