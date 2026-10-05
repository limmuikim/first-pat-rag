import React, { useState } from 'react';
import { Check, MoveVertical, Zap, Shield, ArrowUpRight, DollarSign, X } from 'lucide-react';
import { Position } from '../types';

interface MadeToTradeSectionProps {
  onOpenSupercharts: () => void;
  onOpenPaperTrading: () => void;
  positions: Position[];
  onClosePosition: (id: string) => void;
  accountEquity: number;
}

export const MadeToTradeSection: React.FC<MadeToTradeSectionProps> = ({
  onOpenSupercharts,
  onOpenPaperTrading,
  positions,
  onClosePosition,
  accountEquity,
}) => {
  // Feature 1: Interactive Draggable Bracket adjustments
  const btcPrice = 64280.50;
  const [tpPrice, setTpPrice] = useState(66500.00);
  const [slPrice, setSlPrice] = useState(62800.00);
  const tpProfit = tpPrice - btcPrice;
  const slRisk = btcPrice - slPrice;

  // Feature 2: Interactive Risk Management calculation
  const [riskPercent, setRiskPercent] = useState<number>(1.5);
  const accountBalance = 100000;
  const riskAmount = (accountBalance * riskPercent) / 100;
  const priceRiskPerShare = 4.38; // e.g. entry at 220.16, SL at 215.78
  const calculatedUnits = Math.floor(riskAmount / priceRiskPerShare);
  const rewardRiskRatio = ((tpProfit / slRisk) || 2.4).toFixed(1);
  const [hotkeyTriggered, setHotkeyTriggered] = useState(false);

  const handleTestHotkey = () => {
    setHotkeyTriggered(true);
    setTimeout(() => setHotkeyTriggered(false), 800);
  };

  return (
    <section className="py-20 md:py-28 bg-[#000000] border-b border-[#2a2e39]/40" id="made-to-trade">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Made to trade
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#787b86]">
            The ultimate suite of trading features gathered in one spot.
          </p>
        </div>

        {/* Feature 1: Full journey chart trading */}
        <div className="bg-[#131722] border border-[#2a2e39] rounded-2xl p-6 sm:p-10 mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-block px-3 py-1 bg-[#2962ff]/10 text-[#2962ff] font-semibold text-xs rounded-full uppercase tracking-wider">
              Supercharts
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Full journey chart trading</h3>
            <p className="text-[#d1d4dc] text-sm sm:text-base leading-relaxed">
              Orchestrate your trades directly from Supercharts — with full control, order ticket synchronization, and interactivity of orders on the charts.
            </p>
            <ul className="space-y-2 text-sm text-[#787b86] pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2962ff] flex-shrink-0" />
                <span>Order creation on the chart</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2962ff] flex-shrink-0" />
                <span>Effortless brackets management</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2962ff] flex-shrink-0" />
                <span>Future orders preview before execution</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2962ff] flex-shrink-0" />
                <span>Order modification by dragging</span>
              </li>
            </ul>

            <button
              onClick={onOpenSupercharts}
              className="mt-4 text-xs font-semibold text-[#2962ff] hover:text-[#1e53e5] flex items-center gap-1 group"
            >
              <span>Launch interactive Supercharts</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <div className="lg:col-span-7 bg-[#1e222d] border border-[#2a2e39] rounded-xl p-6 shadow-inner relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#2a2e39] pb-3 text-xs text-[#787b86]">
              <span className="font-mono text-white">BTCUSD · 1H · Supercharts</span>
              <span className="text-[#089981] font-mono font-medium">64,280.50 USD (+3.42%)</span>
            </div>

            <div className="h-64 relative flex flex-col justify-between py-6">
              {/* Take Profit Draggable Line */}
              <div className="relative">
                <div className="flex items-center justify-between mb-1">
                  <div className="bg-[#089981]/90 text-white font-mono text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-lg border border-[#089981]">
                    <span>TP Limit: {tpPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    <span className="text-[10px] bg-black/40 px-1 rounded text-[#089981] font-bold">
                      +${tpProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#089981]">Target: +{((tpProfit / btcPrice) * 100).toFixed(2)}%</span>
                </div>
                <div className="w-full border-t border-dashed border-[#089981] relative">
                  <input
                    type="range"
                    min="64500"
                    max="70000"
                    step="50"
                    value={tpPrice}
                    onChange={(e) => setTpPrice(Number(e.target.value))}
                    className="w-full opacity-60 hover:opacity-100 accent-[#089981] cursor-ew-resize h-1"
                    title="Slide to adjust Take Profit"
                  />
                </div>
              </div>

              {/* Center Price Line */}
              <div className="w-full border-t border-[#2962ff]/50 relative flex items-center justify-between py-1">
                <span className="text-[10px] font-mono text-[#2962ff] bg-[#131722] px-2 py-0.5 rounded border border-[#2962ff]/30">
                  Current: $64,280.50
                </span>
                <span className="text-[#787b86]/40 text-xs font-semibold uppercase tracking-wider">
                  Drag slider to adjust stop loss & take profit
                </span>
              </div>

              {/* Stop Loss Draggable Line */}
              <div className="relative">
                <div className="w-full border-t border-dashed border-[#f23645] relative">
                  <input
                    type="range"
                    min="58000"
                    max="64000"
                    step="50"
                    value={slPrice}
                    onChange={(e) => setSlPrice(Number(e.target.value))}
                    className="w-full opacity-60 hover:opacity-100 accent-[#f23645] cursor-ew-resize h-1"
                    title="Slide to adjust Stop Loss"
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="bg-[#f23645]/90 text-white font-mono text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-lg border border-[#f23645]">
                    <span>SL Stop: {slPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    <span className="text-[10px] bg-black/40 px-1 rounded text-[#f23645] font-bold">
                      -${slRisk.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#f23645]">Max Risk: -{((slRisk / btcPrice) * 100).toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Order ticket with everything you need */}
        <div className="bg-[#131722] border border-[#2a2e39] rounded-2xl p-6 sm:p-10 mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-block px-3 py-1 bg-[#b845ed]/10 text-[#b845ed] font-semibold text-xs rounded-full uppercase tracking-wider">
              Execution Suite
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Order ticket with everything you need</h3>
            <p className="text-[#d1d4dc] text-sm sm:text-base leading-relaxed">
              Customize every single detail of your orders, place them as fast as you want, and take precise control of risk management.
            </p>
            <ul className="space-y-2 text-sm text-[#787b86] pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#b845ed] flex-shrink-0" />
                <span>Order size calculator in units, %, or currency risk</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#b845ed] flex-shrink-0" />
                <span>Risk management in ticks, asset price, or monetary value</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#b845ed] flex-shrink-0" />
                <span>Customizable presets for rapid order parameters</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#b845ed] flex-shrink-0" />
                <span>Configurable hotkeys for instant order execution</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7 bg-[#1e222d] border border-[#2a2e39] rounded-xl p-6 shadow-inner">
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-[#131722] p-4 rounded-lg border border-[#2a2e39]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#787b86]">Risk Parameter</span>
                  <span className="text-[#2962ff] text-[10px]">Adjustable</span>
                </div>
                <div className="text-white text-base font-bold">{riskPercent}% of Balance</div>
                <div className="text-[#787b86] text-[10px] mt-1 font-sans">
                  (${riskAmount.toLocaleString()} Max Risk on $100k)
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.5"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(Number(e.target.value))}
                  className="w-full mt-2 accent-[#b845ed] h-1"
                />
              </div>

              <div className="bg-[#131722] p-4 rounded-lg border border-[#2a2e39]">
                <span className="text-[#787b86] block mb-1">Calculated Size</span>
                <span className="text-white text-base font-bold">{calculatedUnits} Units</span>
                <span className="text-[#089981] text-[10px] block mt-1">
                  Reward/Risk Ratio: {rewardRiskRatio}
                </span>
                <div className="text-[10px] text-[#787b86] mt-2 font-sans">
                  Target Profit: ${(riskAmount * Number(rewardRiskRatio)).toFixed(0)}
                </div>
              </div>

              <div className="col-span-2 bg-[#131722] p-3 rounded-lg border border-[#2a2e39] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#787b86]">Instant Hotkey:</span>
                  <span className="bg-[#2a2e39] text-white px-2 py-1 rounded text-[11px] font-mono">
                    Shift + B (Market Buy)
                  </span>
                </div>
                <button
                  onClick={handleTestHotkey}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    hotkeyTriggered
                      ? 'bg-[#089981] text-white scale-105'
                      : 'bg-[#2962ff] hover:bg-[#1e53e5] text-white'
                  }`}
                >
                  {hotkeyTriggered ? 'Order Executed! (12ms)' : 'Test Execution'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3 & 4 Grid: The one trading panel & Paper Trading */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* The one trading panel */}
          <div className="bg-[#131722] border border-[#2a2e39] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-[#00bcd4]/10 text-[#00bcd4] font-semibold text-xs rounded-full uppercase tracking-wider mb-4">
                Command Center
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">The one trading panel to manage them all</h3>
              <p className="text-[#d1d4dc] text-sm leading-relaxed mb-6">
                Rule all your trades and monitor your account details within one handy central hub.
              </p>
              <ul className="space-y-2 text-sm text-[#787b86] mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#00bcd4] flex-shrink-0" />
                  <span>Monitor real-time balance, equity, and P&L</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#00bcd4] flex-shrink-0" />
                  <span>Analyze your trades and historical execution results</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#00bcd4] flex-shrink-0" />
                  <span>Edit or close open positions and working orders</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#00bcd4] flex-shrink-0" />
                  <span>Switch seamlessly between brokers and accounts</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1e222d] border border-[#2a2e39] rounded-xl p-4 font-mono text-xs">
              <div className="flex justify-between items-center text-[#787b86] pb-2 border-b border-[#2a2e39]">
                <span>Account Equity</span>
                <span className="text-[#089981] font-bold">
                  ${accountEquity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (+4.25%)
                </span>
              </div>
              <div className="flex justify-between items-center text-[#787b86] pt-2">
                <span>Open Positions: {positions.length}</span>
                <span className="text-white">Margin used: 18.4%</span>
              </div>

              {/* Quick live active positions toggle */}
              {positions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#2a2e39] space-y-1.5">
                  <div className="text-[10px] text-[#787b86] uppercase font-semibold">Active Trades</div>
                  {positions.slice(0, 2).map((pos) => (
                    <div key={pos.id} className="flex items-center justify-between text-[11px] bg-[#131722] p-2 rounded">
                      <span className="text-white font-bold">{pos.symbol} ({pos.side})</span>
                      <span className={pos.pnl >= 0 ? 'text-[#089981]' : 'text-[#f23645]'}>
                        {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toFixed(2)}
                      </span>
                      <button
                        onClick={() => onClosePosition(pos.id)}
                        className="text-[#787b86] hover:text-[#f23645] p-1"
                        title="Close Position"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Paper Trading */}
          <div className="bg-[#131722] border border-[#2a2e39] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-[#089981]/10 text-[#089981] font-semibold text-xs rounded-full uppercase tracking-wider mb-4">
                Risk-Free Simulator
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Paper Trading — as real as it gets</h3>
              <p className="text-[#d1d4dc] text-sm leading-relaxed mb-6">
                Trade virtual money with our realistic broker simulation without risking a single penny.
              </p>
              <ul className="space-y-2 text-sm text-[#787b86] mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#089981] flex-shrink-0" />
                  <span>Seamless trading on stocks, crypto, forex, and futures</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#089981] flex-shrink-0" />
                  <span>Custom balance, commissions, and currency configurations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#089981] flex-shrink-0" />
                  <span>Multiple accounts for testing disparate strategies</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#089981] flex-shrink-0" />
                  <span>Configurable leverage values across asset classes</span>
                </li>
              </ul>
            </div>

            <div>
              <button
                onClick={onOpenPaperTrading}
                className="w-full text-center bg-[#1e222d] hover:bg-[#2a2e39] text-[#2962ff] hover:text-white border border-[#2962ff]/40 font-semibold py-3 rounded-xl transition duration-200 active:scale-98"
              >
                Trade risk-free
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
