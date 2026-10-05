import React, { useState, useEffect } from 'react';
import { Maximize2, Settings2, Check, ArrowUpRight, TrendingUp } from 'lucide-react';
import { AssetQuote } from '../types';

interface HeroSectionProps {
  currentAsset: AssetQuote;
  onSelectAsset: (symbol: string) => void;
  onExecuteTrade: (order: {
    symbol: string;
    side: 'BUY' | 'SELL';
    type: 'MARKET' | 'LIMIT' | 'STOP';
    units: number;
    price: number;
    tp?: number;
    sl?: number;
  }) => void;
  onOpenSupercharts: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentAsset,
  onSelectAsset,
  onExecuteTrade,
  onOpenSupercharts,
}) => {
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'Market' | 'Limit' | 'Stop'>('Market');
  const [units, setUnits] = useState<number>(100);
  const [isTakeProfit, setIsTakeProfit] = useState(true);
  const [tpPrice, setTpPrice] = useState<number>(230.00);
  const [isStopLoss, setIsStopLoss] = useState(true);
  const [slPrice, setSlPrice] = useState<number>(215.00);
  const [activeTab, setActiveTab] = useState<'Order' | 'DOM' | 'Market'>('DOM');
  const [hoveredCandleIndex, setHoveredCandleIndex] = useState<number | null>(null);

  // Live price tick simulator
  const [livePrice, setLivePrice] = useState(currentAsset.price);
  const [priceFlash, setPriceFlash] = useState<'green' | 'red' | null>(null);

  useEffect(() => {
    setLivePrice(currentAsset.price);
    if (currentAsset.symbol === 'AAPL') {
      setTpPrice(230.00);
      setSlPrice(215.00);
    } else if (currentAsset.symbol === 'BTCUSD') {
      setTpPrice(66500.00);
      setSlPrice(62800.00);
    } else {
      setTpPrice(Number((currentAsset.price * 1.05).toFixed(2)));
      setSlPrice(Number((currentAsset.price * 0.96).toFixed(2)));
    }
  }, [currentAsset]);

  // Tick simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * (currentAsset.price * 0.001);
      setLivePrice((prev) => {
        const next = Number((prev + delta).toFixed(2));
        setPriceFlash(next >= prev ? 'green' : 'red');
        setTimeout(() => setPriceFlash(null), 400);
        return next;
      });
    }, 2400);
    return () => clearInterval(interval);
  }, [currentAsset.price]);

  const bidPrice = Number((livePrice - 0.03).toFixed(2));
  const askPrice = Number((livePrice).toFixed(2));
  const orderPrice = side === 'BUY' ? askPrice : bidPrice;
  const totalValue = units * orderPrice;

  // Static/dynamic candles matching screenshot
  const candlestickData = [
    { type: 'down', wickH1: 24, bodyH: 56, wickH2: 32, price: '228.40', label: '10:00' },
    { type: 'down', wickH1: 16, bodyH: 40, wickH2: 24, price: '225.10', label: '11:00' },
    { type: 'up',   wickH1: 24, bodyH: 48, wickH2: 16, price: '227.80', label: '12:00' },
    { type: 'up',   wickH1: 20, bodyH: 96, wickH2: 28, price: '232.40', label: '13:00' },
    { type: 'up',   wickH1: 32, bodyH: 112, wickH2: 20, price: '238.90', label: '14:00' },
    { type: 'down', wickH1: 12, bodyH: 24, wickH2: 16, price: '236.20', label: '15:00' },
    { type: 'up',   wickH1: 40, bodyH: 144, wickH2: 20, price: '242.80', label: '16:00' },
    { type: 'up',   wickH1: 18, bodyH: 80,  wickH2: 14, price: '244.10', label: '17:00' },
  ];

  const handleSendOrder = () => {
    onExecuteTrade({
      symbol: currentAsset.symbol,
      side,
      type: orderType.toUpperCase() as 'MARKET' | 'LIMIT' | 'STOP',
      units,
      price: orderPrice,
      tp: isTakeProfit ? tpPrice : undefined,
      sl: isStopLoss ? slPrice : undefined,
    });
  };

  return (
    <section className="relative pt-16 pb-12 md:pt-24 md:pb-20 text-center hero-grid-bg overflow-hidden border-b border-[#2a2e39]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-white mb-2">
          Welcome to the <br />
          <span className="gradient-hero-text inline-block pb-2">tradingverse</span>
        </h1>

        {/* Subtitle Description */}
        <p className="mt-4 md:mt-6 text-base sm:text-xl text-[#b2b5be] max-w-2xl mx-auto font-normal leading-relaxed">
          Make better decisions with our smart tools, trusted brokers, and global community.
        </p>

        {/* Quick Asset Selector Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {(['AAPL', 'BTCUSD', 'TSLA', 'NVDA'] as const).map((sym) => (
            <button
              key={sym}
              onClick={() => onSelectAsset(sym)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                currentAsset.symbol === sym
                  ? 'bg-[#2962ff] text-white shadow-md'
                  : 'bg-[#1e222d] text-[#787b86] hover:text-white border border-[#2a2e39]'
              }`}
            >
              {sym}
            </button>
          ))}
        </div>

        {/* 3D Realistic Trading Interface Mockup Container */}
        <div className="mt-8 md:mt-12 mx-auto max-w-6xl relative">
          <div className="relative rounded-2xl bg-[#131722] border border-[#2a2e39] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden text-left perspective-mockup">
            {/* Mockup Top Window Chrome Header */}
            <div className="h-10 bg-[#1e222d] border-b border-[#2a2e39] flex items-center justify-between px-4 text-xs select-none">
              <div className="flex items-center space-x-3">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2962ff] inline-block animate-pulse"></span>
                  {currentAsset.symbol}, Paper Trading
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#2a2e39] text-[10px] text-[#787b86] font-mono">
                  1D
                </span>
                <span
                  className={`font-mono font-medium transition-colors ${
                    priceFlash === 'green'
                      ? 'text-[#089981] font-bold'
                      : priceFlash === 'red'
                      ? 'text-[#f23645] font-bold'
                      : 'text-[#089981]'
                  }`}
                >
                  {livePrice.toFixed(2)} +{currentAsset.change.toFixed(2)} (+{currentAsset.changePercent.toFixed(2)}%)
                </span>
              </div>

              {/* Chart Toolbar Controls */}
              <div className="flex items-center space-x-3 text-[#787b86]">
                <button
                  onClick={() => setActiveTab('Order')}
                  className={`hover:text-white cursor-pointer transition-colors ${
                    activeTab === 'Order' ? 'text-[#2962ff] font-medium border-b border-[#2962ff] pb-0.5' : ''
                  }`}
                >
                  Order
                </button>
                <button
                  onClick={() => setActiveTab('DOM')}
                  className={`hover:text-white cursor-pointer transition-colors ${
                    activeTab === 'DOM' ? 'text-[#2962ff] font-medium border-b border-[#2962ff] pb-0.5' : ''
                  }`}
                >
                  DOM
                </button>
                <button
                  onClick={() => setActiveTab('Market')}
                  className={`hover:text-white cursor-pointer transition-colors ${
                    activeTab === 'Market' ? 'text-[#2962ff] font-medium border-b border-[#2962ff] pb-0.5' : ''
                  }`}
                >
                  Market
                </button>
                <div className="h-3.5 w-[1px] bg-[#2a2e39]"></div>
                <button
                  onClick={onOpenSupercharts}
                  title="Expand to Full Supercharts Workspace"
                  className="hover:text-white p-1 rounded transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenSupercharts}
                  title="Supercharts Settings"
                  className="hover:text-white p-1 rounded transition-colors"
                >
                  <Settings2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mockup Main Body (Chart Canvas & Floating Order Ticket) */}
            <div className="h-80 sm:h-96 w-full relative bg-[#131722] flex">
              {/* Simulated Candlestick Chart Area */}
              <div className="flex-1 relative p-4 flex flex-col justify-between overflow-hidden chart-grid-lines">
                {/* Horizontal Price Reference Lines */}
                <div className="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none opacity-25">
                  <div className="border-b border-dashed border-[#787b86] flex justify-between pr-2 text-[10px] text-[#787b86] font-mono">
                    <span></span>
                    <span>244.00</span>
                  </div>
                  <div className="border-b border-dashed border-[#787b86] flex justify-between pr-2 text-[10px] text-[#787b86] font-mono">
                    <span></span>
                    <span>240.00</span>
                  </div>
                  <div className="border-b border-dashed border-[#787b86] flex justify-between pr-2 text-[10px] text-[#787b86] font-mono">
                    <span></span>
                    <span>236.00</span>
                  </div>
                  <div className="border-b border-dashed border-[#787b86] flex justify-between pr-2 text-[10px] text-[#787b86] font-mono">
                    <span></span>
                    <span>232.00</span>
                  </div>
                  <div className="border-b border-dashed border-[#2962ff] flex justify-between pr-2 text-[10px] text-[#2962ff] font-mono">
                    <span className="bg-[#2962ff]/20 px-1 rounded text-[#2962ff]">Live Current Price</span>
                    <span>{livePrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Candlestick Graphic Representation */}
                <div className="relative h-full flex items-end space-x-4 sm:space-x-5 pl-6 pb-4 z-10">
                  {candlestickData.map((candle, idx) => {
                    const isGreen = candle.type === 'up';
                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredCandleIndex(idx)}
                        onMouseLeave={() => setHoveredCandleIndex(null)}
                        className="flex flex-col items-center group cursor-crosshair transition-transform duration-150 hover:scale-105"
                      >
                        {/* Upper wick */}
                        <div
                          className={`w-[1px] ${isGreen ? 'bg-[#089981]' : 'bg-[#f23645]'}`}
                          style={{ height: `${candle.wickH1}px` }}
                        ></div>
                        {/* Body */}
                        <div
                          className={`w-3 sm:w-3.5 rounded-[1px] ${
                            isGreen ? 'candlestick-green' : 'candlestick-red'
                          }`}
                          style={{ height: `${candle.bodyH}px` }}
                        ></div>
                        {/* Lower wick */}
                        <div
                          className={`w-[1px] ${isGreen ? 'bg-[#089981]' : 'bg-[#f23645]'}`}
                          style={{ height: `${candle.wickH2}px` }}
                        ></div>

                        {/* Interactive tooltip */}
                        {hoveredCandleIndex === idx && (
                          <div className="absolute -top-12 bg-[#1e222d] border border-[#2a2e39] text-[10px] font-mono px-2 py-1 rounded shadow-xl pointer-events-none text-white z-30 whitespace-nowrap">
                            Candle {candle.label} · Close: ${candle.price}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Chart Indicator Watermark */}
                <div className="absolute bottom-2 left-4 text-[10px] text-[#787b86]/70 flex items-center gap-3 font-mono">
                  <span>VOL: 42.8M</span>
                  <span>RSI(14): 61.4</span>
                  <span>EMA(20): 218.40</span>
                </div>
              </div>

              {/* Simulated Modern Order Placement Ticket (Right Overlay) */}
              <div className="w-72 sm:w-80 bg-[#1e222d]/95 backdrop-blur-md border-l border-[#2a2e39] p-4 flex flex-col justify-between text-xs select-none z-20">
                {/* Buy / Sell Toggle Tabs */}
                <div>
                  <div className="grid grid-cols-2 gap-2 text-center font-bold">
                    <button
                      onClick={() => setSide('SELL')}
                      className={`py-2 rounded transition-all cursor-pointer ${
                        side === 'SELL'
                          ? 'bg-[#f23645] text-white shadow-lg shadow-[#f23645]/30'
                          : 'bg-[#f23645]/20 border border-[#f23645]/50 text-[#f23645] hover:bg-[#f23645]/30'
                      }`}
                    >
                      <div className="text-[10px] font-normal uppercase opacity-80">Sell</div>
                      <div className="text-sm font-mono">{bidPrice.toFixed(2)}</div>
                    </button>
                    <button
                      onClick={() => setSide('BUY')}
                      className={`py-2 rounded transition-all cursor-pointer ${
                        side === 'BUY'
                          ? 'bg-[#2962ff] text-white shadow-lg shadow-[#2962ff]/40'
                          : 'bg-[#2962ff]/20 border border-[#2962ff]/50 text-[#2962ff] hover:bg-[#2962ff]/30'
                      }`}
                    >
                      <div className="text-[10px] font-normal uppercase opacity-80">Buy</div>
                      <div className="text-sm font-mono">{askPrice.toFixed(2)}</div>
                    </button>
                  </div>

                  {/* Order Type Selector */}
                  <div className="flex border-b border-[#2a2e39] text-center font-semibold text-[#787b86] py-2 mt-2">
                    {(['Market', 'Limit', 'Stop'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setOrderType(type)}
                        className={`flex-1 pb-1 transition-colors ${
                          orderType === type
                            ? 'text-white border-b-2 border-[#2962ff]'
                            : 'hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {/* Units & Price Controls */}
                  <div className="space-y-3 mt-3">
                    <div>
                      <div className="flex justify-between text-[11px] text-[#787b86] mb-1">
                        <span>Units</span>
                        <span className="text-[#2962ff] cursor-pointer hover:underline font-mono">
                          ~${totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })} USD
                        </span>
                      </div>
                      <div className="bg-[#131722] border border-[#2a2e39] focus-within:border-[#2962ff] rounded px-3 py-1.5 flex justify-between items-center text-white font-mono">
                        <input
                          type="number"
                          value={units}
                          onChange={(e) => setUnits(Math.max(1, Number(e.target.value)))}
                          className="bg-transparent border-none outline-none text-white w-28 text-sm"
                        />
                        <span className="text-[#787b86] text-[10px]">Shares</span>
                      </div>
                    </div>

                    {/* Take Profit & Stop Loss Bracket simulation */}
                    <div className="pt-2 border-t border-[#2a2e39]/60 space-y-2">
                      <div className="flex items-center justify-between text-[#787b86] text-[11px]">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isTakeProfit}
                            onChange={(e) => setIsTakeProfit(e.target.checked)}
                            className="rounded bg-[#131722] border-[#2a2e39] text-[#089981] focus:ring-0 cursor-pointer"
                          />
                          <span className="text-[#089981] font-medium">Take Profit</span>
                        </label>
                        <input
                          type="number"
                          value={tpPrice}
                          onChange={(e) => setTpPrice(Number(e.target.value))}
                          disabled={!isTakeProfit}
                          className="font-mono text-white bg-[#131722] border border-[#2a2e39] rounded px-2 py-0.5 text-right w-24 text-xs disabled:opacity-40"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[#787b86] text-[11px]">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isStopLoss}
                            onChange={(e) => setIsStopLoss(e.target.checked)}
                            className="rounded bg-[#131722] border-[#2a2e39] text-[#f23645] focus:ring-0 cursor-pointer"
                          />
                          <span className="text-[#f23645] font-medium">Stop Loss</span>
                        </label>
                        <input
                          type="number"
                          value={slPrice}
                          onChange={(e) => setSlPrice(Number(e.target.value))}
                          disabled={!isStopLoss}
                          className="font-mono text-white bg-[#131722] border border-[#2a2e39] rounded px-2 py-0.5 text-right w-24 text-xs disabled:opacity-40"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirm Order Execution Button */}
                <button
                  onClick={handleSendOrder}
                  className={`w-full mt-4 text-white font-semibold py-2.5 rounded transition shadow-lg text-center flex items-center justify-center gap-2 active:scale-95 ${
                    side === 'BUY'
                      ? 'bg-[#2962ff] hover:bg-[#1e53e5] shadow-[#2962ff]/30'
                      : 'bg-[#f23645] hover:bg-[#d62030] shadow-[#f23645]/30'
                  }`}
                >
                  <span>
                    Send Order: {side} {units} {currentAsset.symbol}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Glowing radial bottom flare */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#2962ff]/20 blur-3xl pointer-events-none rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
