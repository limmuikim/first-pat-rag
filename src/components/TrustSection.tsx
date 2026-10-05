import React from 'react';
import { ShieldCheck, Lock, FileText, ArrowRight } from 'lucide-react';

interface TrustSectionProps {
  onOpenBrokers: () => void;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ onOpenBrokers }) => {
  return (
    <section className="py-20 bg-[#000000] border-b border-[#2a2e39]/40" id="trust">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Trust is a must
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#787b86]">
            Both traders and brokers agree, trusting us to provide a secure and reliable trading experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Trust Point 1 */}
          <div className="bg-[#131722] border border-[#2a2e39] rounded-2xl p-8 hover:border-[#2962ff]/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-[#2962ff]/10 text-[#2962ff] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">100+ verified broker partners</h3>
            <p className="text-sm text-[#787b86] mb-6 leading-relaxed">
              We work only with licensed brokers, verified credentials, and real user reviews.
            </p>
            <button
              onClick={onOpenBrokers}
              className="text-sm text-[#2962ff] hover:text-[#1e53e5] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              <span>Explore brokers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Point 2 */}
          <div className="bg-[#131722] border border-[#2a2e39] rounded-2xl p-8 hover:border-[#2962ff]/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-[#089981]/10 text-[#089981] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Secure connection method</h3>
            <p className="text-sm text-[#787b86] leading-relaxed">
              Your credentials for the broker account are safe — stored locally in your browser and never on our servers.
            </p>
          </div>

          {/* Trust Point 3 */}
          <div className="bg-[#131722] border border-[#2a2e39] rounded-2xl p-8 hover:border-[#2962ff]/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No hidden costs</h3>
            <p className="text-sm text-[#787b86] leading-relaxed">
              We are not a broker. We make our money only through low-cost subscriptions and ads. For us, objectivity is excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
