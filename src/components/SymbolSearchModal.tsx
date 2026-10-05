import React, { useState } from 'react';
import { Search, X, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { AssetQuote } from '../types';

interface SymbolSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: AssetQuote[];
  onSelectAsset: (symbol: string) => void;
}

export const SymbolSearchModal: React.FC<SymbolSearchModalProps> = ({
  isOpen,
  onClose,
  assets,
  onSelectAsset,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Stocks', 'Crypto', 'Forex', 'Indices', 'Futures'];

  const filteredAssets = assets.filter((asset) => {
    const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
    const matchesQuery =
      asset.symbol.toLowerCase().includes(query.toLowerCase()) ||
      asset.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[#1e222d] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#2a2e39] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#787b86]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, company, ticker, currency... (e.g. AAPL, BTC)"
            autoFocus
            className="flex-1 bg-transparent text-white placeholder-[#787b86] outline-none text-base font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#2a2e39] text-[#787b86] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-4 py-2 bg-[#131722] border-b border-[#2a2e39] flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#2962ff] text-white'
                  : 'text-[#787b86] hover:text-white hover:bg-[#2a2e39]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#2a2e39]/60">
          {filteredAssets.length === 0 ? (
            <div className="p-8 text-center text-[#787b86]">
              No symbols found matching "{query}"
            </div>
          ) : (
            filteredAssets.map((asset) => (
              <div
                key={asset.symbol}
                onClick={() => {
                  onSelectAsset(asset.symbol);
                  onClose();
                }}
                className="p-4 flex items-center justify-between hover:bg-[#2a2e39]/70 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#131722] border border-[#2a2e39] flex items-center justify-center font-bold text-xs text-white group-hover:border-[#2962ff] transition-colors">
                    {asset.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white group-hover:text-[#2962ff] transition-colors">
                        {asset.symbol}
                      </span>
                      <span className="text-[10px] bg-[#131722] text-[#787b86] px-1.5 py-0.5 rounded font-mono">
                        {asset.category}
                      </span>
                    </div>
                    <div className="text-xs text-[#787b86]">{asset.name}</div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-white font-semibold">
                    ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div
                    className={`text-xs flex items-center justify-end gap-1 ${
                      asset.change >= 0 ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {asset.change >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>
                      {asset.change >= 0 ? '+' : ''}
                      {asset.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#131722] border-t border-[#2a2e39] text-center text-[11px] text-[#787b86]">
          Tip: Select any symbol to immediately load live Supercharts & paper order book.
        </div>
      </div>
    </div>
  );
};
