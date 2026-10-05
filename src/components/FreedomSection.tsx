import React, { useState } from 'react';
import { Monitor, DollarSign, Zap, Users, ArrowRight, Laptop, Smartphone, Tablet, ChevronRight } from 'lucide-react';

interface FreedomSectionProps {
  onOpenSupercharts: () => void;
  onOpenBrokers: () => void;
  onOpenLeap: () => void;
}

export const FreedomSection: React.FC<FreedomSectionProps> = ({
  onOpenSupercharts,
  onOpenBrokers,
  onOpenLeap,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null);

  const pillars = [
    {
      id: 0,
      title: 'Trade on any platform',
      description:
        'Never miss a trade, no matter where you are. Browser, desktop app, tablet, and mobile — trade anywhere and on any device.',
      icon: Monitor,
      color: 'text-[#2962ff]',
      bgColor: 'bg-[#2962ff]/10',
      tag: 'Multi-device sync',
      actionLabel: 'Launch web app',
      action: onOpenSupercharts,
    },
    {
      id: 1,
      title: 'Trade what you want',
      description:
        'Stocks, crypto, forex, futures, and more — switch brokers anytime or connect multiple brokers for ultimate flexibility.',
      icon: DollarSign,
      color: 'text-[#089981]',
      bgColor: 'bg-[#089981]/10',
      tag: '8+ Asset Classes',
      actionLabel: 'Explore brokers',
      action: onOpenBrokers,
    },
    {
      id: 2,
      title: 'Trade at full speed',
      description:
        'Enjoy direct connections to broker servers without additional delays and middle layers.',
      icon: Zap,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      tag: '< 15ms Latency',
      actionLabel: 'View direct routing',
      action: onOpenBrokers,
    },
    {
      id: 3,
      title: 'Trade, never alone',
      description:
        "Uncover trading opportunities with the world's largest community. We believe open discussion fuels growth.",
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      tag: '100M+ Traders',
      actionLabel: 'Join tournament',
      action: onOpenLeap,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#131722] border-b border-[#2a2e39]/40" id="freedom">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Freedom is within reach
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#787b86]">
            Join 100 million traders and investors taking the future into their own hands.
          </p>
        </div>

        {/* 4 Pillars Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === pillar.id;

            return (
              <div
                key={pillar.id}
                onClick={() => setSelectedPillar(isSelected ? null : pillar.id)}
                className={`bg-[#1e222d] border rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                  isSelected ? 'border-[#2962ff] shadow-xl ring-1 ring-[#2962ff]/30' : 'border-[#2a2e39] hover:border-[#2962ff]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl ${pillar.bgColor} ${pillar.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-[#787b86] group-hover:text-white transition-colors">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#f0f3fa] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#787b86] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#2a2e39]/60 mt-6 flex items-center justify-between text-xs">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      pillar.action();
                    }}
                    className={`font-semibold flex items-center gap-1.5 transition-colors ${pillar.color} hover:underline`}
                  >
                    <span>{pillar.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <ChevronRight className="w-4 h-4 text-[#787b86]/50" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
