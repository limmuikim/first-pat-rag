import { AssetQuote, Broker, TournamentLeader, Candle, Position } from '../types';

export const INITIAL_ASSETS: AssetQuote[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 220.16,
    change: 1.84,
    changePercent: 0.84,
    high: 221.40,
    low: 218.90,
    volume: '54.2M',
    category: 'Stocks',
  },
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin / US Dollar',
    price: 64280.50,
    change: 2125.10,
    changePercent: 3.42,
    high: 65100.00,
    low: 62150.00,
    volume: '24.8B',
    category: 'Crypto',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 248.80,
    change: -3.40,
    changePercent: -1.35,
    high: 254.20,
    low: 246.10,
    volume: '68.1M',
    category: 'Stocks',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 132.45,
    change: 4.15,
    changePercent: 3.23,
    high: 134.00,
    low: 128.50,
    volume: '82.9M',
    category: 'Stocks',
  },
  {
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    price: 1.0845,
    change: 0.0022,
    changePercent: 0.20,
    high: 1.0870,
    low: 1.0820,
    volume: '112.4B',
    category: 'Forex',
  },
  {
    symbol: 'ETHUSD',
    name: 'Ethereum / US Dollar',
    price: 3490.20,
    change: 85.40,
    changePercent: 2.51,
    high: 3540.00,
    low: 3410.00,
    volume: '14.2B',
    category: 'Crypto',
  },
  {
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    price: 574.60,
    change: 3.20,
    changePercent: 0.56,
    high: 576.10,
    low: 572.30,
    volume: '48.3M',
    category: 'Indices',
  },
  {
    symbol: 'NQ1!',
    name: 'Nasdaq 100 E-mini Futures',
    price: 20180.25,
    change: 145.50,
    changePercent: 0.73,
    high: 20250.00,
    low: 20040.00,
    volume: '560K',
    category: 'Futures',
  }
];

export const INITIAL_BROKERS: Broker[] = [
  {
    id: 'ibkr',
    name: 'Interactive Brokers',
    category: 'Multi-Asset / Global',
    rating: 4.9,
    reviewsCount: 18450,
    minDeposit: '$0',
    spreads: 'From 0.1 pips / $0.005 per share',
    regulation: 'SEC, FINRA, FCA, ASIC',
    markets: ['Stocks', 'Options', 'Futures', 'Forex', 'Bonds', 'Crypto'],
    connected: false,
    highlight: 'Lowest margin rates & 150+ global exchanges'
  },
  {
    id: 'tradestation',
    name: 'TradeStation',
    category: 'Futures & Equities',
    rating: 4.8,
    reviewsCount: 9230,
    minDeposit: '$0',
    spreads: '$0 commission on stocks / $0.85 futures',
    regulation: 'SEC, FINRA, NFA',
    markets: ['Stocks', 'Futures', 'Options', 'Crypto'],
    connected: true,
    highlight: 'Ultra-low latency institutional execution engine'
  },
  {
    id: 'oanda',
    name: 'OANDA',
    category: 'Forex & CFD',
    rating: 4.7,
    reviewsCount: 14120,
    minDeposit: '$0',
    spreads: 'EUR/USD from 0.8 pips',
    regulation: 'FCA, CFTC, NFA, ASIC',
    markets: ['Forex', 'Indices', 'Commodities', 'Bonds'],
    connected: false,
    highlight: 'Reliable pricing & deep forex liquidity pools'
  },
  {
    id: 'alpaca',
    name: 'Alpaca Trading',
    category: 'API-First & Algo',
    rating: 4.8,
    reviewsCount: 6540,
    minDeposit: '$0',
    spreads: '$0 stock trading commission',
    regulation: 'SEC, FINRA, SIPC',
    markets: ['Stocks', 'ETFs', 'Crypto', 'Options'],
    connected: false,
    highlight: 'Direct REST/WebSocket API and fractional shares'
  },
  {
    id: 'bingx',
    name: 'BingX',
    category: 'Crypto Derivatives',
    rating: 4.6,
    reviewsCount: 11200,
    minDeposit: '$10',
    spreads: 'Maker 0.02% / Taker 0.05%',
    regulation: 'MSB, FSCA',
    markets: ['Crypto', 'Futures', 'Copy Trading'],
    connected: false,
    highlight: 'Over 700 crypto pairs and high-leverage perpetuals'
  },
  {
    id: 'capital',
    name: 'Capital.com',
    category: 'Global CFD & Spread Betting',
    rating: 4.7,
    reviewsCount: 12890,
    minDeposit: '$20',
    spreads: 'Tight variable spreads & 0% commission',
    regulation: 'FCA, CySEC, ASIC',
    markets: ['Stocks', 'Indices', 'Forex', 'Commodities'],
    connected: false,
    highlight: 'Award-winning execution speed and smart risk tools'
  }
];

export const INITIAL_TOURNAMENT_LEADERS: TournamentLeader[] = [
  { rank: 1, handle: 'QuantumFlow_Alpha', country: 'Singapore', countryCode: 'SG', returnPercent: 184.2, winRate: 78.4, tradesCount: 42, prize: '$35,000' },
  { rank: 2, handle: 'Aethelgard_Macro', country: 'United Kingdom', countryCode: 'GB', returnPercent: 142.8, winRate: 72.1, tradesCount: 38, prize: '$20,000' },
  { rank: 3, handle: 'SiliconSniper', country: 'United States', countryCode: 'US', returnPercent: 121.5, winRate: 69.8, tradesCount: 64, prize: '$12,000' },
  { rank: 4, handle: 'NordicScalp', country: 'Norway', countryCode: 'NO', returnPercent: 98.4, winRate: 74.0, tradesCount: 89, prize: '$8,000' },
  { rank: 5, handle: 'TokyoBreakout', country: 'Japan', countryCode: 'JP', returnPercent: 86.2, winRate: 65.5, tradesCount: 51, prize: '$5,000' },
  { rank: 6, handle: 'ZurichMomentum', country: 'Switzerland', countryCode: 'CH', returnPercent: 74.1, winRate: 68.2, tradesCount: 33, prize: '$4,000' },
  { rank: 7, handle: 'SydneySwings', country: 'Australia', countryCode: 'AU', returnPercent: 67.8, winRate: 63.9, tradesCount: 47, prize: '$3,000' },
  { rank: 8, handle: 'You (Paper Trader)', country: 'Global', countryCode: 'GL', returnPercent: 42.5, winRate: 66.7, tradesCount: 18, prize: '$1,500', isUser: true },
];

export const INITIAL_POSITIONS: Position[] = [
  {
    id: 'pos-1',
    symbol: 'AAPL',
    side: 'BUY',
    units: 100,
    entryPrice: 216.50,
    currentPrice: 220.16,
    tp: 230.00,
    sl: 215.00,
    pnl: 366.00,
    pnlPercent: 1.69,
    openTime: 'Today 09:32:14'
  },
  {
    id: 'pos-2',
    symbol: 'NVDA',
    side: 'BUY',
    units: 150,
    entryPrice: 128.00,
    currentPrice: 132.45,
    tp: 140.00,
    sl: 125.00,
    pnl: 667.50,
    pnlPercent: 3.48,
    openTime: 'Yesterday 14:15:20'
  },
  {
    id: 'pos-3',
    symbol: 'BTCUSD',
    side: 'BUY',
    units: 0.5,
    entryPrice: 62050.00,
    currentPrice: 64280.50,
    tp: 66500.00,
    sl: 61800.00,
    pnl: 1115.25,
    pnlPercent: 3.59,
    openTime: 'Oct 02 11:04:00'
  }
];

// Generate realistic candle history for any asset
export function generateCandles(basePrice: number, count = 28): Candle[] {
  const candles: Candle[] = [];
  let price = basePrice * 0.94;
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  for (let i = count - 1; i >= 0; i--) {
    const timestamp = now - i * dayMs;
    const dateObj = new Date(timestamp);
    const timeStr = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
    
    // Slight upward trend with natural volatility
    const volatility = price * 0.016;
    const change = (Math.random() - 0.46) * volatility;
    const open = Number(price.toFixed(2));
    const close = Number((open + change).toFixed(2));
    const high = Number((Math.max(open, close) + Math.random() * volatility * 0.7).toFixed(2));
    const low = Number((Math.min(open, close) - Math.random() * volatility * 0.7).toFixed(2));
    const volume = Math.floor(Math.random() * 800000 + 200000);

    candles.push({
      time: timeStr,
      timestamp,
      open,
      high,
      low,
      close,
      volume
    });

    price = close;
  }

  // Anchor the final candle to the current basePrice
  const last = candles[candles.length - 1];
  last.close = basePrice;
  if (basePrice > last.high) last.high = Number((basePrice * 1.004).toFixed(2));
  if (basePrice < last.low) last.low = Number((basePrice * 0.996).toFixed(2));

  return candles;
}
