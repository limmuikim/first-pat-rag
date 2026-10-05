import React from 'react';
import { X, ShieldCheck, Star, ExternalLink, Check, Zap, ArrowRight } from 'lucide-react';
import { Broker } from '../types';

interface BrokersModalProps {
  isOpen: boolean;
  onClose: () => void;
  brokers: Broker[];
  onToggleConnect: (brokerId: string) => void;
}

export const BrokersModal: React.FC<BrokersModalProps> = ({
  isOpen,
  onClose,
  brokers,
  onToggleConnect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-4xl bg-[#1e222d] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#2a2e39] flex items-center justify-between bg-[#131722]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2962ff]/10 text-[#2962ff] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Verified Broker Directory</h2>
              <p className="text-xs text-[#787b86]">
                100+ licensed partners with zero-delay API routing & encrypted client-side credentials.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#2a2e39] text-[#787b86] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Brokers Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {brokers.map((broker) => (
            <div
              key={broker.id}
              className="bg-[#131722] border border-[#2a2e39] hover:border-[#2962ff]/50 rounded-xl p-5 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#2962ff] transition-colors">
                      {broker.name}
                    </h3>
                    <span className="text-[11px] text-[#787b86]">{broker.category}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#1e222d] px-2 py-0.5 rounded text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{broker.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-[#d1d4dc] mb-4 font-medium">
                  {broker.highlight}
                </p>

                <div className="space-y-1.5 text-xs text-[#787b86] pb-4 border-b border-[#2a2e39]">
                  <div className="flex justify-between">
                    <span>Min Deposit:</span>
                    <span className="text-white font-mono">{broker.minDeposit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spreads / Fees:</span>
                    <span className="text-white font-mono">{broker.spreads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Regulation:</span>
                    <span className="text-white font-mono">{broker.regulation}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {broker.markets.map((m) => (
                    <span
                      key={m}
                      className="text-[10px] bg-[#1e222d] text-[#787b86] px-2 py-0.5 rounded font-mono"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3">
                <button
                  onClick={() => onToggleConnect(broker.id)}
                  className={`w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    broker.connected
                      ? 'bg-[#089981]/20 text-[#089981] border border-[#089981]/40 hover:bg-[#089981]/30'
                      : 'bg-[#2962ff] hover:bg-[#1e53e5] text-white shadow-md'
                  }`}
                >
                  {broker.connected ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Connected (Live Routing)</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Connect Broker</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-[#131722] border-t border-[#2a2e39] text-xs text-[#787b86] flex items-center justify-between">
          <span>
            Security guarantee: Credentials stay in your local browser sandbox and are never forwarded to third parties.
          </span>
          <button
            onClick={onClose}
            className="text-white hover:underline font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
