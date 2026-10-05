import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Search,
  Maximize2,
  Camera,
  RotateCcw,
  RotateCw,
  TrendingUp,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  X,
  Plus,
  Play,
  Share2,
  Trash2,
  Eye,
  Crosshair,
  PenTool,
  Type,
  Ruler,
  AlertCircle
} from 'lucide-react';
import { AssetQuote, Candle, Position, Order } from '../types';
import { generateCandles } from '../data/mockData';

interface SuperchartsWorkspaceProps {
  currentAsset: AssetQuote;
  onSelectAsset: (symbol: string) => void;
  onBackToLanding: () => void;
  onOpenSearch: () => void;
  positions: Position[];
  onExecuteTrade: (order: {
    symbol: string;
    side: 'BUY' | 'SELL';
    type: 'MARKET' | 'LIMIT' | 'STOP';
    units: number;
    price: number;
    tp?: number;
    sl?: number;
  }) => void;
  onClosePosition: (id: string) => void;
  accountEquity: number;
  allAssets: AssetQuote[];
}

export const SuperchartsWorkspace: React.FC<SuperchartsWorkspaceProps> = ({
  currentAsset,
  onSelectAsset,
  onBackToLanding,
  onOpenSearch,
  positions,
  onExecuteTrade,
  onClosePosition,
  accountEquity,
  allAssets,
}) => {
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '15m' | '1H' | '4H' | '1D'>('1D');
  const [candles, setCandles] = useState<Candle[]>([]);
  const [activeRightTab, setActiveRightTab] = useState<'ORDER' | 'DOM' | 'WATCHLIST'>('ORDER');
  const [activeBottomTab, setActiveBottomTab] = useState<'POSITIONS' | 'ORDERS' | 'ACCOUNT'>('POSITIONS');
  const [activeTool, setActiveTool] = useState<'crosshair' | 'line' | 'fib' | 'brush' | 'measure'>('crosshair');

  // Indicators toggle
  const [showEMA20, setShowEMA20] = useState(true);
  const [showEMA50, setShowEMA50] = useState(true);
  const [showVolume, setShowVolume] = useState(true);

  // Order Ticket state
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT' | 'STOP'>('MARKET');
  const [units, setUnits] = useState(100);
  const [tpEnabled, setTpEnabled] = useState(true);
  const [tpPrice, setTpPrice] = useState(Number((currentAsset.price * 1.04).toFixed(2)));
  const [slEnabled, setSlEnabled] = useState(true);
  const [slPrice, setSlPrice] = useState(Number((currentAsset.price * 0.97).toFixed(2)));

  // Hover state on chart
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);

  // Initialize and regenerate candles on asset or timeframe change
  useEffect(() => {
    const data = generateCandles(currentAsset.price, 36);
    setCandles(data);
    setTpPrice(Number((currentAsset.price * 1.04).toFixed(2)));
    setSlPrice(Number((currentAsset.price * 0.97).toFixed(2)));
  }, [currentAsset, timeframe]);

  // Live price tick simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCandles((prev) => {
        if (!prev.length) return prev;
        const last = { ...prev[prev.length - 1] };
        const delta = (Math.random() - 0.49) * (last.close * 0.002);
        last.close = Number((last.close + delta).toFixed(2));
        if (last.close > last.high) last.high = last.close;
        if (last.close < last.low) last.low = last.close;
        return [...prev.slice(0, -1), last];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const latestCandle = candles[candles.length - 1] || {
    close: currentAsset.price,
    high: currentAsset.high,
    low: currentAsset.low,
    open: currentAsset.price,
    volume: 1200000,
  };

  const handleSendOrder = () => {
    onExecuteTrade({
      symbol: currentAsset.symbol,
      side,
      type: orderType,
      units,
      price: side === 'BUY' ? latestCandle.close : Number((latestCandle.close - 0.04).toFixed(2)),
      tp: tpEnabled ? tpPrice : undefined,
      sl: slEnabled ? slPrice : undefined,
    });
  };

  // Compute chart coordinates
  const minPrice = Math.min(...candles.map((c) => c.low), slEnabled ? slPrice : Infinity) * 0.995;
  const maxPrice = Math.max(...candles.map((c) => c.high), tpEnabled ? tpPrice : -Infinity) * 1.005;
  const priceRange = maxPrice - minPrice || 1;

  const chartHeight = 440;
  const chartWidth = 720;
  const candleWidth = 14;
  const candleGap = 6;

  const getY = (val: number) => {
    return chartHeight - ((val - minPrice) / priceRange) * (chartHeight - 40) - 20;
  };

  // Order Book DOM levels
  const domLevels = [
    { price: latestCandle.close + 0.15, askSize: 420, bidSize: 0 },
    { price: latestCandle.close + 0.10, askSize: 850, bidSize: 0 },
    { price: latestCandle.close + 0.05, askSize: 1420, bidSize: 0 },
    { price: latestCandle.close, askSize: 0, bidSize: 0, current: true },
    { price: latestCandle.close - 0.05, askSize: 0, bidSize: 1100 },
    { price: latestCandle.close - 0.10, askSize: 0, bidSize: 940 },
    { price: latestCandle.close - 0.15, askSize: 0, bidSize: 630 },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#d1d4dc] flex flex-col select-none">
      {/* Supercharts Pro Top Bar */}
      <div className="h-12 bg-[#131722] border-b border-[#2a2e39] px-3 flex items-center justify-between text-xs">
        {/* Left: Back & Symbol */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1e222d] hover:bg-[#2a2e39] text-white transition-colors"
            title="Return to Landing Page"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-semibold hidden sm:inline">Landing</span>
          </button>

          {/* Asset Selector */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 bg-[#1e222d] hover:bg-[#2a2e39] px-3 py-1 rounded text-white font-bold transition-colors"
          >
            <span className="text-[#2962ff]">{currentAsset.symbol}</span>
            <span className="text-[#787b86] font-normal text-[11px] hidden md:inline">{currentAsset.name}</span>
            <ChevronDown className="w-3 h-3 text-[#787b86]" />
          </button>

          {/* Timeframe Pills */}
          <div className="hidden sm:flex items-center space-x-1 pl-2 border-l border-[#2a2e39]">
            {(['1m', '5m', '15m', '1H', '4H', '1D'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-0.5 rounded font-mono text-[11px] transition-colors ${
                  timeframe === tf ? 'bg-[#2962ff] text-white font-bold' : 'text-[#787b86] hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Indicators dropdown toggle */}
          <div className="hidden md:flex items-center space-x-2 pl-3 border-l border-[#2a2e39] text-[#787b86]">
            <button
              onClick={() => setShowEMA20(!showEMA20)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                showEMA20 ? 'bg-[#2962ff]/20 text-[#2962ff]' : 'hover:text-white'
              }`}
            >
              EMA 20
            </button>
            <button
              onClick={() => setShowEMA50(!showEMA50)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                showEMA50 ? 'bg-amber-500/20 text-amber-400' : 'hover:text-white'
              }`}
            >
              EMA 50
            </button>
            <button
              onClick={() => setShowVolume(!showVolume)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                showVolume ? 'bg-[#089981]/20 text-[#089981]' : 'hover:text-white'
              }`}
            >
              Volume
            </button>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-3 text-[#787b86]">
          <div className="font-mono text-xs hidden lg:flex items-center gap-3">
            <span className="text-[#089981] font-bold">
              ${latestCandle.close.toFixed(2)}
            </span>
            <span className={currentAsset.change >= 0 ? 'text-[#089981]' : 'text-[#f23645]'}>
              {currentAsset.change >= 0 ? '+' : ''}{currentAsset.change.toFixed(2)} ({currentAsset.changePercent.toFixed(2)}%)
            </span>
          </div>
          <div className="h-4 w-[1px] bg-[#2a2e39]"></div>
          <button
            onClick={() => onExecuteTrade({ symbol: currentAsset.symbol, side: 'BUY', type: 'MARKET', units: 50, price: latestCandle.close })}
            className="bg-[#2962ff] hover:bg-[#1e53e5] text-white px-3 py-1 rounded font-semibold text-xs transition"
          >
            Quick Buy
          </button>
        </div>
      </div>

      {/* Main Workspace Grid (Left Tools, Center Canvas, Right Tabs) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-12 bg-[#131722] border-r border-[#2a2e39] flex flex-col items-center py-3 space-y-3 text-[#787b86]">
          <button
            onClick={() => setActiveTool('crosshair')}
            className={`p-2 rounded hover:text-white transition-colors ${
              activeTool === 'crosshair' ? 'bg-[#2a2e39] text-[#2962ff]' : ''
            }`}
            title="Crosshair Tool"
          >
            <Crosshair className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool('line')}
            className={`p-2 rounded hover:text-white transition-colors ${
              activeTool === 'line' ? 'bg-[#2a2e39] text-[#2962ff]' : ''
            }`}
            title="Trend Line"
          >
            <PenTool className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool('fib')}
            className={`p-2 rounded hover:text-white transition-colors ${
              activeTool === 'fib' ? 'bg-[#2a2e39] text-[#2962ff]' : ''
            }`}
            title="Fibonacci Retracement"
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool('measure')}
            className={`p-2 rounded hover:text-white transition-colors ${
              activeTool === 'measure' ? 'bg-[#2a2e39] text-[#2962ff]' : ''
            }`}
            title="Measure / Price Range"
          >
            <Ruler className="w-4 h-4" />
          </button>
          <div className="w-6 h-[1px] bg-[#2a2e39] my-2"></div>
          <button
            onClick={() => setCandles(generateCandles(currentAsset.price, 36))}
            className="p-2 rounded hover:text-white transition-colors"
            title="Reset Chart Data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Center Interactive SVG Candlestick Chart */}
        <div className="flex-1 bg-[#131722] relative flex flex-col overflow-hidden">
          {/* Top Chart Stats Ribbon */}
          <div className="h-8 bg-[#131722]/80 border-b border-[#2a2e39]/50 px-4 flex items-center justify-between text-[11px] font-mono text-[#787b86] z-10">
            <div className="flex items-center gap-4">
              <span className="text-white font-bold">{currentAsset.symbol} · {timeframe}</span>
              <span>O: <strong className="text-white">{(hoveredCandle || latestCandle).open.toFixed(2)}</strong></span>
              <span>H: <strong className="text-white">{(hoveredCandle || latestCandle).high.toFixed(2)}</strong></span>
              <span>L: <strong className="text-white">{(hoveredCandle || latestCandle).low.toFixed(2)}</strong></span>
              <span>C: <strong className="text-white">{(hoveredCandle || latestCandle).close.toFixed(2)}</strong></span>
              <span>Vol: <strong className="text-white">{((hoveredCandle || latestCandle).volume / 1000).toFixed(0)}K</strong></span>
            </div>
            <div className="text-[10px] text-[#2962ff]">
              Paper Trading (Simulated Direct Feed)
            </div>
          </div>

          {/* SVG Chart Canvas */}
          <div className="flex-1 relative overflow-hidden chart-grid-lines flex items-center justify-center p-2">
            <svg
              className="w-full h-full cursor-crosshair"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
              onMouseLeave={() => setHoveredCandle(null)}
            >
              {/* Horizontal Reference Grids */}
              {[0.2, 0.4, 0.6, 0.8].map((pct, i) => {
                const y = chartHeight * pct;
                const price = (maxPrice - pct * priceRange).toFixed(2);
                return (
                  <g key={i}>
                    <line x1="0" y1={y} x2={chartWidth} y2={y} stroke="#2a2e39" strokeDasharray="3 3" strokeOpacity="0.6" />
                    <text x={chartWidth - 55} y={y - 4} fill="#787b86" fontSize="10" fontFamily="monospace">
                      {price}
                    </text>
                  </g>
                );
              })}

              {/* Take Profit Bracket Line */}
              {tpEnabled && (
                <g>
                  <line x1="0" y1={getY(tpPrice)} x2={chartWidth} y2={getY(tpPrice)} stroke="#089981" strokeWidth="1.5" strokeDasharray="4 4" />
                  <rect x="12" y={getY(tpPrice) - 12} width="160" height="20" rx="3" fill="#089981" />
                  <text x="18" y={getY(tpPrice) + 2} fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    TP Limit: ${tpPrice.toFixed(2)}
                  </text>
                </g>
              )}

              {/* Stop Loss Bracket Line */}
              {slEnabled && (
                <g>
                  <line x1="0" y1={getY(slPrice)} x2={chartWidth} y2={getY(slPrice)} stroke="#f23645" strokeWidth="1.5" strokeDasharray="4 4" />
                  <rect x="12" y={getY(slPrice) - 12} width="150" height="20" rx="3" fill="#f23645" />
                  <text x="18" y={getY(slPrice) + 2} fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    SL Stop: ${slPrice.toFixed(2)}
                  </text>
                </g>
              )}

              {/* Candlesticks Rendering */}
              {candles.map((candle, idx) => {
                const x = idx * (candleWidth + candleGap) + 20;
                const isGreen = candle.close >= candle.open;
                const color = isGreen ? '#089981' : '#f23645';
                const openY = getY(candle.open);
                const closeY = getY(candle.close);
                const highY = getY(candle.high);
                const lowY = getY(candle.low);
                const bodyTop = Math.min(openY, closeY);
                const bodyHeight = Math.max(Math.abs(closeY - openY), 2);

                // Volume Bar
                const volHeight = Math.min((candle.volume / 1000000) * 45, 60);

                return (
                  <g
                    key={idx}
                    onMouseEnter={() => setHoveredCandle(candle)}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {/* Volume Bar at bottom */}
                    {showVolume && (
                      <rect
                        x={x}
                        y={chartHeight - volHeight - 2}
                        width={candleWidth}
                        height={volHeight}
                        fill={color}
                        opacity="0.3"
                      />
                    )}

                    {/* High-Low Wick */}
                    <line x1={x + candleWidth / 2} y1={highY} x2={x + candleWidth / 2} y2={lowY} stroke={color} strokeWidth="1" />

                    {/* Candlestick Body */}
                    <rect
                      x={x}
                      y={bodyTop}
                      width={candleWidth}
                      height={bodyHeight}
                      fill={color}
                      rx="1"
                    />
                  </g>
                );
              })}

              {/* Live Current Price Cursor Line */}
              <line
                x1="0"
                y1={getY(latestCandle.close)}
                x2={chartWidth}
                y2={getY(latestCandle.close)}
                stroke="#2962ff"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <rect x={chartWidth - 65} y={getY(latestCandle.close) - 9} width="65" height="18" fill="#2962ff" rx="2" />
              <text x={chartWidth - 60} y={getY(latestCandle.close) + 4} fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace">
                {latestCandle.close.toFixed(2)}
              </text>
            </svg>
          </div>

          {/* Bottom Positions & Orders Tray */}
          <div className="h-44 bg-[#131722] border-t border-[#2a2e39] flex flex-col">
            <div className="h-8 bg-[#1e222d] px-4 flex items-center space-x-6 text-xs border-b border-[#2a2e39]">
              <button
                onClick={() => setActiveBottomTab('POSITIONS')}
                className={`flex items-center gap-1.5 font-semibold transition-colors ${
                  activeBottomTab === 'POSITIONS' ? 'text-[#2962ff] border-b-2 border-[#2962ff] py-1.5' : 'text-[#787b86] hover:text-white'
                }`}
              >
                <span>Positions</span>
                <span className="bg-[#2a2e39] text-[10px] px-1.5 rounded-full">{positions.length}</span>
              </button>
              <button
                onClick={() => setActiveBottomTab('ORDERS')}
                className={`font-semibold transition-colors ${
                  activeBottomTab === 'ORDERS' ? 'text-[#2962ff] border-b-2 border-[#2962ff] py-1.5' : 'text-[#787b86] hover:text-white'
                }`}
              >
                Working Orders (0)
              </button>
              <button
                onClick={() => setActiveBottomTab('ACCOUNT')}
                className={`font-semibold transition-colors ${
                  activeBottomTab === 'ACCOUNT' ? 'text-[#2962ff] border-b-2 border-[#2962ff] py-1.5' : 'text-[#787b86] hover:text-white'
                }`}
              >
                Account History
              </button>
            </div>

            <div className="flex-1 overflow-auto p-2 text-xs font-mono">
              {activeBottomTab === 'POSITIONS' && (
                positions.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-[#787b86]">
                    No open positions. Use the order ticket on the right to place a paper trade.
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="text-[#787b86] text-[11px] border-b border-[#2a2e39]">
                      <tr>
                        <th className="pb-1.5">Symbol</th>
                        <th className="pb-1.5">Side</th>
                        <th className="pb-1.5">Units</th>
                        <th className="pb-1.5">Entry Price</th>
                        <th className="pb-1.5">Current Price</th>
                        <th className="pb-1.5">TP / SL</th>
                        <th className="pb-1.5">Unrealized P&L</th>
                        <th className="pb-1.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2a2e39]/50">
                      {positions.map((pos) => (
                        <tr key={pos.id} className="hover:bg-[#1e222d]/60">
                          <td className="py-2 text-white font-bold">{pos.symbol}</td>
                          <td className="py-2">
                            <span className={pos.side === 'BUY' ? 'text-[#089981]' : 'text-[#f23645]'}>
                              {pos.side}
                            </span>
                          </td>
                          <td className="py-2 text-white">{pos.units}</td>
                          <td className="py-2">${pos.entryPrice.toFixed(2)}</td>
                          <td className="py-2 font-bold">${latestCandle.close.toFixed(2)}</td>
                          <td className="py-2 text-[#787b86]">
                            {pos.tp ? `$${pos.tp}` : '—'} / {pos.sl ? `$${pos.sl}` : '—'}
                          </td>
                          <td className={`py-2 font-bold ${pos.pnl >= 0 ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                            {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toFixed(2)} ({pos.pnlPercent}%)
                          </td>
                          <td className="py-2 text-right">
                            <button
                              onClick={() => onClosePosition(pos.id)}
                              className="px-2 py-0.5 rounded bg-[#f23645]/20 hover:bg-[#f23645] text-[#f23645] hover:text-white transition-colors text-[10px]"
                            >
                              Close
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}

              {activeBottomTab === 'ACCOUNT' && (
                <div className="grid grid-cols-4 gap-4 p-2">
                  <div className="bg-[#1e222d] p-3 rounded border border-[#2a2e39]">
                    <div className="text-[#787b86] text-[10px]">Net Equity</div>
                    <div className="text-white text-base font-bold">${accountEquity.toLocaleString()}</div>
                  </div>
                  <div className="bg-[#1e222d] p-3 rounded border border-[#2a2e39]">
                    <div className="text-[#787b86] text-[10px]">Virtual Margin Used</div>
                    <div className="text-white text-base font-bold">18.4% ($18,400)</div>
                  </div>
                  <div className="bg-[#1e222d] p-3 rounded border border-[#2a2e39]">
                    <div className="text-[#787b86] text-[10px]">Available Purchasing Power</div>
                    <div className="text-[#089981] text-base font-bold">$85,850.80</div>
                  </div>
                  <div className="bg-[#1e222d] p-3 rounded border border-[#2a2e39]">
                    <div className="text-[#787b86] text-[10px]">Connected Broker</div>
                    <div className="text-white text-base font-bold">Paper Simulator</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar (Order Ticket / DOM / Watchlist) */}
        <div className="w-80 bg-[#1e222d] border-l border-[#2a2e39] flex flex-col">
          {/* Tab Selector */}
          <div className="h-10 bg-[#131722] border-b border-[#2a2e39] flex items-center text-xs font-semibold">
            <button
              onClick={() => setActiveRightTab('ORDER')}
              className={`flex-1 h-full flex items-center justify-center transition-colors ${
                activeRightTab === 'ORDER' ? 'text-[#2962ff] border-b-2 border-[#2962ff] bg-[#1e222d]' : 'text-[#787b86] hover:text-white'
              }`}
            >
              Order Ticket
            </button>
            <button
              onClick={() => setActiveRightTab('DOM')}
              className={`flex-1 h-full flex items-center justify-center transition-colors ${
                activeRightTab === 'DOM' ? 'text-[#2962ff] border-b-2 border-[#2962ff] bg-[#1e222d]' : 'text-[#787b86] hover:text-white'
              }`}
            >
              DOM
            </button>
            <button
              onClick={() => setActiveRightTab('WATCHLIST')}
              className={`flex-1 h-full flex items-center justify-center transition-colors ${
                activeRightTab === 'WATCHLIST' ? 'text-[#2962ff] border-b-2 border-[#2962ff] bg-[#1e222d]' : 'text-[#787b86] hover:text-white'
              }`}
            >
              Watchlist
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-4 overflow-y-auto text-xs">
            {activeRightTab === 'ORDER' && (
              <div className="space-y-4">
                {/* Buy / Sell Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSide('SELL')}
                    className={`py-3 rounded font-bold transition-all ${
                      side === 'SELL'
                        ? 'bg-[#f23645] text-white shadow-lg'
                        : 'bg-[#f23645]/20 text-[#f23645] border border-[#f23645]/40 hover:bg-[#f23645]/30'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-normal">Sell</div>
                    <div className="font-mono text-sm">${(latestCandle.close - 0.04).toFixed(2)}</div>
                  </button>
                  <button
                    onClick={() => setSide('BUY')}
                    className={`py-3 rounded font-bold transition-all ${
                      side === 'BUY'
                        ? 'bg-[#2962ff] text-white shadow-lg'
                        : 'bg-[#2962ff]/20 text-[#2962ff] border border-[#2962ff]/40 hover:bg-[#2962ff]/30'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-normal">Buy</div>
                    <div className="font-mono text-sm">${latestCandle.close.toFixed(2)}</div>
                  </button>
                </div>

                {/* Order Type */}
                <div className="flex border-b border-[#2a2e39] pb-2 font-semibold text-[#787b86]">
                  {(['MARKET', 'LIMIT', 'STOP'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setOrderType(t)}
                      className={`flex-1 py-1 text-center transition-colors ${
                        orderType === t ? 'text-white border-b-2 border-[#2962ff]' : 'hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Units input */}
                <div>
                  <div className="flex justify-between text-[11px] text-[#787b86] mb-1">
                    <span>Units</span>
                    <span className="text-[#2962ff] font-mono">
                      ≈ ${(units * latestCandle.close).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="bg-[#131722] border border-[#2a2e39] rounded px-3 py-2 flex items-center justify-between font-mono">
                    <input
                      type="number"
                      value={units}
                      onChange={(e) => setUnits(Math.max(1, Number(e.target.value)))}
                      className="bg-transparent text-white outline-none w-28 text-sm"
                    />
                    <span className="text-[#787b86] text-[10px]">Shares</span>
                  </div>
                </div>

                {/* Brackets */}
                <div className="space-y-3 pt-2 border-t border-[#2a2e39]">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tpEnabled}
                        onChange={(e) => setTpEnabled(e.target.checked)}
                        className="rounded bg-[#131722] text-[#089981]"
                      />
                      <span className="text-[#089981] font-semibold text-xs">Take Profit</span>
                    </label>
                    <input
                      type="number"
                      value={tpPrice}
                      onChange={(e) => setTpPrice(Number(e.target.value))}
                      disabled={!tpEnabled}
                      className="bg-[#131722] border border-[#2a2e39] text-white px-2 py-1 rounded w-24 text-right font-mono text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={slEnabled}
                        onChange={(e) => setSlEnabled(e.target.checked)}
                        className="rounded bg-[#131722] text-[#f23645]"
                      />
                      <span className="text-[#f23645] font-semibold text-xs">Stop Loss</span>
                    </label>
                    <input
                      type="number"
                      value={slPrice}
                      onChange={(e) => setSlPrice(Number(e.target.value))}
                      disabled={!slEnabled}
                      className="bg-[#131722] border border-[#2a2e39] text-white px-2 py-1 rounded w-24 text-right font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Submit Order */}
                <button
                  onClick={handleSendOrder}
                  className={`w-full py-3 rounded-lg font-bold text-white transition-all shadow-lg active:scale-98 ${
                    side === 'BUY'
                      ? 'bg-[#2962ff] hover:bg-[#1e53e5] shadow-[#2962ff]/30'
                      : 'bg-[#f23645] hover:bg-[#d62030] shadow-[#f23645]/30'
                  }`}
                >
                  Send Order: {side} {units} {currentAsset.symbol}
                </button>
              </div>
            )}

            {activeRightTab === 'DOM' && (
              <div className="space-y-2 font-mono">
                <div className="text-[10px] text-[#787b86] flex justify-between pb-1 border-b border-[#2a2e39]">
                  <span>Size (Asks)</span>
                  <span>Price</span>
                  <span>Size (Bids)</span>
                </div>
                {domLevels.map((lvl, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      onExecuteTrade({
                        symbol: currentAsset.symbol,
                        side: lvl.askSize > 0 ? 'SELL' : 'BUY',
                        type: 'LIMIT',
                        units: 100,
                        price: lvl.price,
                      });
                    }}
                    className={`flex items-center justify-between p-1.5 rounded cursor-pointer transition-colors ${
                      lvl.current
                        ? 'bg-[#2962ff]/20 text-[#2962ff] font-bold border border-[#2962ff]/40'
                        : 'hover:bg-[#2a2e39]'
                    }`}
                  >
                    <span className="text-[#f23645] text-left w-16">
                      {lvl.askSize > 0 ? lvl.askSize : ''}
                    </span>
                    <span className="text-white text-center font-bold">
                      ${lvl.price.toFixed(2)}
                    </span>
                    <span className="text-[#089981] text-right w-16">
                      {lvl.bidSize > 0 ? lvl.bidSize : ''}
                    </span>
                  </div>
                ))}
                <div className="text-[10px] text-[#787b86] pt-3 text-center">
                  Click any price ladder row to place an instant limit order.
                </div>
              </div>
            )}

            {activeRightTab === 'WATCHLIST' && (
              <div className="space-y-1">
                {allAssets.map((asset) => (
                  <button
                    key={asset.symbol}
                    onClick={() => onSelectAsset(asset.symbol)}
                    className={`w-full p-2.5 rounded-lg flex items-center justify-between transition-colors text-left ${
                      asset.symbol === currentAsset.symbol ? 'bg-[#2962ff]/10 border border-[#2962ff]/30' : 'hover:bg-[#2a2e39]'
                    }`}
                  >
                    <div>
                      <div className="text-white font-bold">{asset.symbol}</div>
                      <div className="text-[10px] text-[#787b86]">{asset.name}</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-white font-semibold">${asset.price.toFixed(2)}</div>
                      <div className={`text-[10px] ${asset.change >= 0 ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                        {asset.change >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
