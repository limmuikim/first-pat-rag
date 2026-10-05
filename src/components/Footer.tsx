import React from 'react';

interface FooterProps {
  onOpenSupercharts: () => void;
  onOpenBrokers: () => void;
  onOpenLeap: () => void;
  onOpenSearch: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSupercharts,
  onOpenBrokers,
  onOpenLeap,
  onOpenSearch,
}) => {
  return (
    <footer className="bg-[#000000] text-[#787b86] text-xs pt-16 pb-12 border-t border-[#2a2e39]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Footer Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-[#2a2e39]/60">
          {/* Column 1: Products */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Products</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenSupercharts} className="hover:text-white transition text-left">
                  Supercharts
                </button>
              </li>
              <li><a className="hover:text-white transition" href="#pine">Pine Script®</a></li>
              <li><button onClick={onOpenSearch} className="hover:text-white transition text-left">Stock Screener</button></li>
              <li><button onClick={onOpenSearch} className="hover:text-white transition text-left">ETF Screener</button></li>
              <li><button onClick={onOpenSearch} className="hover:text-white transition text-left">Crypto Screener</button></li>
              <li><a className="hover:text-white transition" href="#calendar">Economic Calendar</a></li>
              <li><a className="hover:text-white transition" href="#earnings">Earnings Calendar</a></li>
            </ul>
          </div>

          {/* Column 2: Community */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Community</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-white transition" href="#social">Social Network</a></li>
              <li><a className="hover:text-white transition" href="#love">Wall of Love</a></li>
              <li><a className="hover:text-white transition" href="#ideas">Trading Ideas</a></li>
              <li><a className="hover:text-white transition" href="#scripts">Educational Scripts</a></li>
              <li><a className="hover:text-white transition" href="#indicators">Indicators & Strategies</a></li>
              <li><a className="hover:text-white transition" href="#moderators">Moderators</a></li>
            </ul>
          </div>

          {/* Column 3: Markets */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Markets</h4>
            <ul className="space-y-2">
              <li><button onClick={onOpenSearch} className="hover:text-white transition text-left">Stocks</button></li>
              <li><button onClick={onOpenSearch} className="hover:text-white transition text-left">Crypto coins</button></li>
              <li><button onClick={onOpenSearch} className="hover:text-white transition text-left">Forex pairs</button></li>
              <li><button onClick={onOpenSearch} className="hover:text-white transition text-left">Indices</button></li>
              <li><button onClick={onOpenSearch} className="hover:text-white transition text-left">Futures</button></li>
              <li><button onClick={onOpenSearch} className="hover:text-white transition text-left">Bonds</button></li>
            </ul>
          </div>

          {/* Column 4: Trading */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Trading</h4>
            <ul className="space-y-2">
              <li><button onClick={onOpenSupercharts} className="hover:text-white transition text-left">Overview</button></li>
              <li><button onClick={onOpenBrokers} className="hover:text-white transition text-left">Brokers</button></li>
              <li><button onClick={onOpenBrokers} className="hover:text-white transition text-left">Broker Comparison</button></li>
              <li><button onClick={onOpenSupercharts} className="hover:text-white transition text-left">Paper Trading</button></li>
              <li><button onClick={onOpenLeap} className="hover:text-white transition text-left">The Leap Tournament</button></li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-white transition" href="#about">About us</a></li>
              <li><a className="hover:text-white transition" href="#space">Space Mission</a></li>
              <li><a className="hover:text-white transition" href="#careers">Careers</a></li>
              <li><a className="hover:text-white transition" href="#blog">Official Blog</a></li>
              <li><a className="hover:text-white transition" href="#media">Media Kit</a></li>
              <li><a className="hover:text-white transition" href="#store">Store / Merch</a></li>
            </ul>
          </div>

          {/* Column 6: Business Solutions */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Business Solutions</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-white transition" href="#libraries">Charting Libraries</a></li>
              <li><a className="hover:text-white transition" href="#lightweight">Lightweight Charts™</a></li>
              <li><a className="hover:text-white transition" href="#advanced">Advanced Charts</a></li>
              <li><button onClick={onOpenBrokers} className="hover:text-white transition text-left">Brokerage Integration</button></li>
              <li><a className="hover:text-white transition" href="#partner">Partner Program</a></li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright Notice */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            {/* Small tradingview logo */}
            <svg className="h-4 w-6 fill-white" viewBox="0 0 36 28">
              <path d="M14 22H7V6h7v16zm8-22h-6v28h6V0zm8 14h-6v14h6V14z"></path>
            </svg>
            <span className="text-[#787b86]">Made by humans. © 2026 TradingView, Inc.</span>
          </div>

          {/* Disclaimers */}
          <p className="text-[11px] text-[#5d606b] max-w-xl text-center md:text-right">
            Select market data provided by ICE Data Services. Reference data provided by FactSet. All rights reserved. SEC filings provided by Quartr.
          </p>
        </div>
      </div>
    </footer>
  );
};
