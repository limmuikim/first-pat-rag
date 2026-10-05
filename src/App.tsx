/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FreedomSection } from './components/FreedomSection';
import { MadeToTradeSection } from './components/MadeToTradeSection';
import { TheLeapSection } from './components/TheLeapSection';
import { TrustSection } from './components/TrustSection';
import { ReadyToTradeSection } from './components/ReadyToTradeSection';
import { Footer } from './components/Footer';
import { SuperchartsWorkspace } from './components/SuperchartsWorkspace';
import { SymbolSearchModal } from './components/SymbolSearchModal';
import { BrokersModal } from './components/BrokersModal';
import { TheLeapModal } from './components/TheLeapModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { AuthModal } from './components/AuthModal';
import { Toast, ToastMessage } from './components/Toast';
import {
  INITIAL_ASSETS,
  INITIAL_BROKERS,
  INITIAL_TOURNAMENT_LEADERS,
  INITIAL_POSITIONS,
} from './data/mockData';
import { AssetQuote, Broker, Position, Order, TournamentLeader } from './types';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<'landing' | 'supercharts' | 'paper-trading'>('landing');
  const [currentSymbol, setCurrentSymbol] = useState<string>('AAPL');

  // Application Data State
  const [assets, setAssets] = useState<AssetQuote[]>(INITIAL_ASSETS);
  const [brokers, setBrokers] = useState<Broker[]>(INITIAL_BROKERS);
  const [tournamentLeaders, setTournamentLeaders] = useState<TournamentLeader[]>(INITIAL_TOURNAMENT_LEADERS);
  const [positions, setPositions] = useState<Position[]>(INITIAL_POSITIONS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [accountEquity, setAccountEquity] = useState<number>(104250.80);

  // Modal Visibility State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBrokersOpen, setIsBrokersOpen] = useState(false);
  const [isLeapOpen, setIsLeapOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Toasts Notification State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'error', title: string, message: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Current active asset object
  const currentAsset = assets.find((a) => a.symbol === currentSymbol) || assets[0];

  const handleSelectAsset = (sym: string) => {
    setCurrentSymbol(sym);
  };

  // Trade Execution Simulator
  const handleExecuteTrade = (newTrade: {
    symbol: string;
    side: 'BUY' | 'SELL';
    type: 'MARKET' | 'LIMIT' | 'STOP';
    units: number;
    price: number;
    tp?: number;
    sl?: number;
  }) => {
    const orderCost = newTrade.units * newTrade.price;
    const newPosId = `pos-${Date.now()}`;
    const newPosition: Position = {
      id: newPosId,
      symbol: newTrade.symbol,
      side: newTrade.side,
      units: newTrade.units,
      entryPrice: newTrade.price,
      currentPrice: newTrade.price,
      tp: newTrade.tp,
      sl: newTrade.sl,
      pnl: 0,
      pnlPercent: 0,
      openTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setPositions((prev) => [newPosition, ...prev]);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      symbol: newTrade.symbol,
      side: newTrade.side,
      type: newTrade.type,
      units: newTrade.units,
      price: newTrade.price,
      status: 'FILLED',
      time: new Date().toLocaleTimeString(),
    };
    setOrders((prev) => [newOrder, ...prev]);

    addToast(
      'success',
      `Order Filled: ${newTrade.side} ${newTrade.units} ${newTrade.symbol}`,
      `Executed at $${newTrade.price.toFixed(2)} (Valued at $${orderCost.toLocaleString('en-US', {
        maximumFractionDigits: 2,
      })})`
    );
  };

  // Close Position Handler
  const handleClosePosition = (id: string) => {
    const pos = positions.find((p) => p.id === id);
    if (!pos) return;

    setPositions((prev) => prev.filter((p) => p.id !== id));
    setAccountEquity((prev) => prev + pos.pnl);

    addToast(
      pos.pnl >= 0 ? 'success' : 'info',
      `Position Closed: ${pos.symbol}`,
      `Realized P&L: ${pos.pnl >= 0 ? '+' : ''}$${pos.pnl.toFixed(2)} (${pos.pnlPercent}%)`
    );
  };

  // Toggle Broker Connect
  const handleToggleBrokerConnect = (brokerId: string) => {
    setBrokers((prev) =>
      prev.map((b) => {
        if (b.id === brokerId) {
          const nextState = !b.connected;
          addToast(
            nextState ? 'success' : 'info',
            nextState ? `${b.name} Connected` : `${b.name} Disconnected`,
            nextState
              ? 'Real-time order routing active with sub-15ms latency.'
              : 'Switched back to local paper trading simulator.'
          );
          return { ...b, connected: nextState };
        }
        return b;
      })
    );
  };

  // Register in The Leap
  const handleRegisterLeap = () => {
    setTournamentLeaders((prev) =>
      prev.map((item) => (item.isUser ? { ...item, handle: 'You (Registered)', rank: 7 } : item))
    );
    addToast(
      'success',
      'The Leap Registration Confirmed',
      'You are enrolled in Season 4 with $100k virtual balance. Good luck!'
    );
  };

  // Reset Balance
  const handleResetBalance = () => {
    setAccountEquity(100000.0);
    setPositions([]);
    addToast('info', 'Paper Account Reset', 'Simulated capital reset to $100,000.00 USD.');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#d1d4dc] selection:bg-[#2962ff] selection:text-white flex flex-col font-sans">
      {/* If in full Supercharts Pro view, show dedicated pro screen */}
      {currentView === 'supercharts' ? (
        <SuperchartsWorkspace
          currentAsset={currentAsset}
          onSelectAsset={handleSelectAsset}
          onBackToLanding={() => setCurrentView('landing')}
          onOpenSearch={() => setIsSearchOpen(true)}
          positions={positions}
          onExecuteTrade={handleExecuteTrade}
          onClosePosition={handleClosePosition}
          accountEquity={accountEquity}
          allAssets={assets}
        />
      ) : (
        /* Otherwise render the complete Tradingverse Showcase Page matching the screenshot */
        <>
          {/* Main Top Header */}
          <Header
            currentView={currentView}
            onNavigateView={setCurrentView}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenBrokers={() => setIsBrokersOpen(true)}
            onOpenLeap={() => setIsLeapOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
            accountEquity={accountEquity}
          />

          {/* Hero Section with Interactive 3D Perspective Mockup */}
          <main className="flex-1">
            <HeroSection
              currentAsset={currentAsset}
              onSelectAsset={handleSelectAsset}
              onExecuteTrade={handleExecuteTrade}
              onOpenSupercharts={() => setCurrentView('supercharts')}
            />

            {/* Freedom is within reach (4 Pillars) */}
            <FreedomSection
              onOpenSupercharts={() => setCurrentView('supercharts')}
              onOpenBrokers={() => setIsBrokersOpen(true)}
              onOpenLeap={() => setIsLeapOpen(true)}
            />

            {/* Made to trade (Supercharts, Execution Suite, Command Center, Paper Trading) */}
            <MadeToTradeSection
              onOpenSupercharts={() => setCurrentView('supercharts')}
              onOpenPaperTrading={() => {
                addToast('info', 'Paper Trading Activated', 'Enjoy $100k risk-free sandbox simulator.');
                setCurrentView('supercharts');
              }}
              positions={positions}
              onClosePosition={handleClosePosition}
              accountEquity={accountEquity}
            />

            {/* The Leap Tournament Banner */}
            <TheLeapSection onOpenLeap={() => setIsLeapOpen(true)} />

            {/* Trust is a must (100+ verified broker partners, secure connection, no hidden costs) */}
            <TrustSection onOpenBrokers={() => setIsBrokersOpen(true)} />

            {/* Ready to trade? CTA */}
            <ReadyToTradeSection
              onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
              onOpenSupercharts={() => setCurrentView('supercharts')}
              onOpenBrokers={() => setIsBrokersOpen(true)}
              onOpenToolkit={() => setIsHowItWorksOpen(true)}
            />
          </main>

          {/* Footer Directory */}
          <Footer
            onOpenSupercharts={() => setCurrentView('supercharts')}
            onOpenBrokers={() => setIsBrokersOpen(true)}
            onOpenLeap={() => setIsLeapOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        </>
      )}

      {/* Interactive Modals */}
      <SymbolSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        assets={assets}
        onSelectAsset={(sym) => {
          handleSelectAsset(sym);
          addToast('info', `Loaded ${sym}`, `Switched current active symbol to ${sym}.`);
        }}
      />

      <BrokersModal
        isOpen={isBrokersOpen}
        onClose={() => setIsBrokersOpen(false)}
        brokers={brokers}
        onToggleConnect={handleToggleBrokerConnect}
      />

      <TheLeapModal
        isOpen={isLeapOpen}
        onClose={() => setIsLeapOpen(false)}
        leaders={tournamentLeaders}
        onRegister={handleRegisterLeap}
      />

      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        onStartTrading={() => {
          setIsHowItWorksOpen(false);
          setCurrentView('supercharts');
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(email) => {
          addToast('success', 'Welcome to Tradingverse!', `Logged in as ${email}. Paper account activated.`);
        }}
        onResetBalance={handleResetBalance}
      />

      {/* Floating Notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
