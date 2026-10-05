import React, { useState } from 'react';
import { X, Trophy, Award, Users, CheckCircle, Flame, ShieldAlert } from 'lucide-react';
import { TournamentLeader } from '../types';

interface TheLeapModalProps {
  isOpen: boolean;
  onClose: () => void;
  leaders: TournamentLeader[];
  onRegister: () => void;
}

export const TheLeapModal: React.FC<TheLeapModalProps> = ({
  isOpen,
  onClose,
  leaders,
  onRegister,
}) => {
  const [registered, setRegistered] = useState(false);

  if (!isOpen) return null;

  const handleRegisterClick = () => {
    setRegistered(true);
    onRegister();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-4xl bg-[#1e222d] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Header */}
        <div className="p-6 bg-gradient-to-r from-[#1a1e2b] via-[#241c38] to-[#1a1e2b] border-b border-[#2a2e39] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#b845ed]/20 text-[#b845ed] flex items-center justify-center shadow-lg">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#b845ed] uppercase tracking-wider">
                Tournament Series · Season 4
              </div>
              <h2 className="text-2xl font-black text-white">The Leap: Global Championship</h2>
              <div className="text-xs text-[#d1d4dc] flex items-center gap-3 mt-0.5">
                <span>$100,000 USD Prize Pool</span>
                <span>·</span>
                <span className="text-[#089981] font-semibold">Risk-Free Paper Trading</span>
                <span>·</span>
                <span className="text-amber-400">Round 3 Ends in 5d 14h</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#787b86] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="p-4 bg-[#131722] border-b border-[#2a2e39] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-6 text-[#787b86]">
            <div>
              <span className="block text-[10px]">Registered Traders</span>
              <strong className="text-white text-sm">48,290</strong>
            </div>
            <div>
              <span className="block text-[10px]">1st Place Prize</span>
              <strong className="text-amber-400 text-sm">$35,000 USD</strong>
            </div>
            <div>
              <span className="block text-[10px]">Starting Virtual Capital</span>
              <strong className="text-white text-sm">$100,000.00</strong>
            </div>
          </div>

          <button
            onClick={handleRegisterClick}
            disabled={registered}
            className={`px-6 py-2.5 rounded-full font-bold transition-all shadow-lg active:scale-95 ${
              registered
                ? 'bg-[#089981] text-white cursor-default'
                : 'bg-white hover:bg-[#f0f3fa] text-black hover:scale-105'
            }`}
          >
            {registered ? 'Registered for Round 3!' : 'Take The Leap (Free Entry)'}
          </button>
        </div>

        {/* Leaderboard Table */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Live Tournament Standings</span>
          </h3>

          <div className="bg-[#131722] border border-[#2a2e39] rounded-xl overflow-hidden font-mono text-xs">
            <table className="w-full text-left">
              <thead className="bg-[#1e222d] text-[#787b86] border-b border-[#2a2e39]">
                <tr>
                  <th className="py-2.5 px-4">Rank</th>
                  <th className="py-2.5 px-4">Trader Handle</th>
                  <th className="py-2.5 px-4">Country</th>
                  <th className="py-2.5 px-4">Return %</th>
                  <th className="py-2.5 px-4">Win Rate</th>
                  <th className="py-2.5 px-4">Trades</th>
                  <th className="py-2.5 px-4 text-right">Prize</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2e39]/60">
                {leaders.map((leader) => (
                  <tr
                    key={leader.rank}
                    className={`hover:bg-[#1e222d]/80 transition-colors ${
                      leader.isUser ? 'bg-[#2962ff]/15 font-bold text-[#2962ff]' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      {leader.rank === 1 ? (
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          🥇 #1
                        </span>
                      ) : leader.rank === 2 ? (
                        <span className="text-slate-300 font-bold flex items-center gap-1">
                          🥈 #2
                        </span>
                      ) : leader.rank === 3 ? (
                        <span className="text-amber-600 font-bold flex items-center gap-1">
                          🥉 #3
                        </span>
                      ) : (
                        `#${leader.rank}`
                      )}
                    </td>
                    <td className="py-3 px-4 text-white">
                      <span className={leader.isUser ? 'text-[#2962ff]' : ''}>
                        {leader.handle}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#787b86]">{leader.country}</td>
                    <td className="py-3 px-4 text-[#089981] font-bold">
                      +{leader.returnPercent.toFixed(1)}%
                    </td>
                    <td className="py-3 px-4 text-white">{leader.winRate.toFixed(1)}%</td>
                    <td className="py-3 px-4 text-[#787b86]">{leader.tradesCount}</td>
                    <td className="py-3 px-4 text-right text-amber-400 font-bold">
                      {leader.prize}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#131722] border-t border-[#2a2e39] text-xs text-[#787b86] flex items-center justify-between">
          <span>All trades verified on live simulated exchange feeds. Zero financial risk.</span>
          <button
            onClick={onClose}
            className="text-white hover:underline font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
