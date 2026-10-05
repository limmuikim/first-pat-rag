import React, { useState } from 'react';
import { X, ArrowRight, BarChart2, Shield, Sliders, Trophy } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTrading: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  onStartTrading,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: '1. Explore Supercharts Pro',
      description:
        'Access world-class financial charts with 100+ technical indicators, multi-timeframe analysis, and real-time live market data across stocks, crypto, forex, and futures.',
      icon: BarChart2,
      badge: 'Interactive Visuals',
    },
    {
      title: '2. Drag & Drop Bracket Trading',
      description:
        'Place limit and stop orders directly on the candlestick canvas. Click and drag Take Profit and Stop Loss lines to dynamically manage your risk and reward ratios in real time.',
      icon: Sliders,
      badge: 'Visual Execution',
    },
    {
      title: '3. Practice with Paper Trading ($100k)',
      description:
        'Test trading strategies and algorithms completely risk-free using our simulated execution engine with realistic order matching and customizable account leverage.',
      icon: Shield,
      badge: 'Zero Financial Risk',
    },
    {
      title: '4. Compete in The Leap Tournament',
      description:
        'Put your skills to the test in global championships. Compete against top traders worldwide for real-money cash prizes without risking your personal capital.',
      icon: Trophy,
      badge: '$100k Prize Pool',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[#1e222d] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#131722] border-b border-[#2a2e39] flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">How the Tradingverse Works</h2>
            <p className="text-xs text-[#787b86]">A masterclass in modern chart trading and risk management</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#2a2e39] text-[#787b86] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Tabs */}
        <div className="flex border-b border-[#2a2e39] bg-[#1e222d] overflow-x-auto">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`flex-1 py-3 px-4 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeStep === idx
                  ? 'border-[#2962ff] text-white bg-[#131722]'
                  : 'border-transparent text-[#787b86] hover:text-white'
              }`}
            >
              Step {idx + 1}
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="p-8 text-center sm:text-left flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-20 h-20 rounded-2xl bg-[#2962ff]/10 text-[#2962ff] flex items-center justify-center flex-shrink-0 shadow-lg">
            {React.createElement(steps[activeStep].icon, { className: 'w-10 h-10' })}
          </div>
          <div className="flex-1">
            <span className="text-[11px] font-mono bg-[#2962ff]/20 text-[#2962ff] px-2 py-0.5 rounded">
              {steps[activeStep].badge}
            </span>
            <h3 className="text-xl font-bold text-white mt-2 mb-2">
              {steps[activeStep].title}
            </h3>
            <p className="text-sm text-[#d1d4dc] leading-relaxed">
              {steps[activeStep].description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-[#131722] border-t border-[#2a2e39] flex items-center justify-between">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeStep === i ? 'bg-[#2962ff]' : 'bg-[#2a2e39]'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            {activeStep < steps.length - 1 ? (
              <button
                onClick={() => setActiveStep(activeStep + 1)}
                className="px-5 py-2 rounded-full bg-[#1e222d] hover:bg-[#2a2e39] text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onStartTrading();
                }}
                className="px-6 py-2 rounded-full bg-[#2962ff] hover:bg-[#1e53e5] text-white text-xs font-semibold shadow-lg shadow-[#2962ff]/30"
              >
                Start Trading Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
