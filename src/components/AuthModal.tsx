import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, DollarSign } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
  onResetBalance: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onResetBalance,
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(email);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-[#1e222d] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-[#131722] border-b border-[#2a2e39] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="h-6 w-9 fill-white" viewBox="0 0 36 28">
              <path d="M14 22H7V6h7v16zm8-22h-6v28h6V0zm8 14h-6v14h6V14z"></path>
            </svg>
            <h2 className="text-lg font-bold text-white">Join the Tradingverse</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#2a2e39] text-[#787b86] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-[#d1d4dc] leading-relaxed">
            Create your free trading profile or connect instant simulated paper trading account with $100,000 USD virtual capital.
          </p>

          <div>
            <label className="block text-xs font-semibold text-[#787b86] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="trader@tradingverse.com"
              className="w-full bg-[#131722] border border-[#2a2e39] focus:border-[#2962ff] rounded-xl px-4 py-2.5 text-sm text-white outline-none font-medium placeholder-[#787b86]"
            />
          </div>

          <div className="bg-[#131722] p-3 rounded-xl border border-[#2a2e39] text-xs space-y-1.5">
            <div className="text-white font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#089981]" />
              <span>Instant Paper Trading Included</span>
            </div>
            <p className="text-[#787b86] text-[11px]">
              No credit card required. Includes real-time simulated quotes, interactive charts, and tournament eligibility.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#2962ff] to-[#7928ca] hover:opacity-95 text-white font-bold text-sm transition shadow-lg shadow-[#2962ff]/30 active:scale-98 flex items-center justify-center gap-2"
          >
            {submitted ? (
              <>
                <Check className="w-4 h-4" />
                <span>Account Activated!</span>
              </>
            ) : (
              <span>Start Free Paper Trading</span>
            )}
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                onResetBalance();
                onClose();
              }}
              className="text-[11px] text-[#787b86] hover:text-[#2962ff] transition-colors underline"
            >
              Reset simulated balance to $100,000.00
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
