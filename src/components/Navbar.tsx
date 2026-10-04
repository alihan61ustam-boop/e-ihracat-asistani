import React from 'react';
import { ShieldCheck, Compass, BookOpen, Tag, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'wizard' | 'explorer' | 'labels';
  setActiveTab: (tab: 'wizard' | 'explorer' | 'labels') => void;
  onNewAnalysis: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onNewAnalysis }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <div 
          onClick={onNewAnalysis}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white">E-İhracat Asistanı</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Mevzuat & Risk AI
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Mikro İhracat (ETGB) Gümrük ve Kargo Karar Destek Sistemi
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('wizard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'wizard'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Risk Analizi</span>
          </button>

          <button
            onClick={() => setActiveTab('explorer')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'explorer'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Mevzuat Rehberi</span>
            <span className="sm:hidden">Mevzuat</span>
          </button>

          <button
            onClick={() => setActiveTab('labels')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'labels'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span className="hidden md:inline">Etiket Oluşturucu</span>
            <span className="md:hidden">Etiket</span>
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNewAnalysis}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold px-3.5 py-1.5 rounded-lg text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all hover:scale-102"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Yeni Sorgulama</span>
          </button>
        </div>

      </div>
    </header>
  );
};
