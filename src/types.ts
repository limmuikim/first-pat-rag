export interface AssetQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
  category: 'Stocks' | 'Crypto' | 'Forex' | 'Indices' | 'Futures';
}

export interface Candle {
  time: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Position {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  units: number;
  entryPrice: number;
  currentPrice: number;
  tp?: number;
  sl?: number;
  pnl: number;
  pnlPercent: number;
  openTime: string;
}

export interface Order {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  type: 'MARKET' | 'LIMIT' | 'STOP';
  units: number;
  price: number;
  status: 'FILLED' | 'PENDING' | 'CANCELLED';
  time: string;
}

export interface Broker {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  minDeposit: string;
  spreads: string;
  regulation: string;
  markets: string[];
  connected: boolean;
  highlight: string;
}

export interface TournamentLeader {
  rank: number;
  handle: string;
  country: string;
  countryCode: string;
  returnPercent: number;
  winRate: number;
  tradesCount: number;
  prize: string;
  isUser?: boolean;
}
