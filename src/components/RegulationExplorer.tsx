import React, { useState } from 'react';
import { BookOpen, Search, Globe2, FileText, Sparkles } from 'lucide-react';
import { COUNTRIES, MASTER_DOCUMENTS } from '../data/regulations';
import type { RequiredDocument } from '../types';

interface RegulationExplorerProps {
  onOpenDocEditor?: (doc: RequiredDocument) => void;
}

export const RegulationExplorer: React.FC<RegulationExplorerProps> = ({ onOpenDocEditor }) => {
  const [selectedCountryKey, setSelectedCountryKey] = useState('DE');
  const [searchDocQuery, setSearchDocQuery] = useState('');

  const selectedCountry = COUNTRIES[selectedCountryKey];

  const filteredDocs = Object.values(MASTER_DOCUMENTS).filter(doc => 
    doc.name.toLowerCase().includes(searchDocQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchDocQuery.toLowerCase()) ||
    doc.issuer.toLowerCase().includes(searchDocQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Güncel Küresel E-İhracat Kütüphanesi</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Ülke Mevzuat ve Zorunlu Evrak Rehberi
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          Avrupa Birliği, ABD, İngiltere ve diğer hedef pazarların De Minimis sınırları, vergi kuralları ve gümrük belgeleri.
        </p>
      </div>

      {/* Part 1: Country Navigation Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-emerald-600" />
          <span>Hedef Pazar Seçin:</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {Object.values(COUNTRIES).map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => setSelectedCountryKey(c.code)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedCountryKey === c.code
                  ? 'border-emerald-600 bg-white ring-2 ring-emerald-600/30 shadow-md'
                  : 'border-slate-200 bg-white/80 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="text-3xl mb-2">{c.flag}</div>
              <div className="font-extrabold text-xs text-slate-900">{c.name.split('(')[0]}</div>
              <div className="text-[11px] text-slate-500 mt-1">
                De Minimis: <strong className="text-emerald-700 font-mono">{c.deMinimisAmount} {c.symbol}</strong>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Country Deep Dive Details */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{selectedCountry.flag}</span>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">{selectedCountry.name}</h3>
              <p className="text-xs text-slate-500">Para Birimi: {selectedCountry.currency} ({selectedCountry.symbol})</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-800">
              Vergi Rejimi: <strong className="text-emerald-700">{selectedCountry.scheme}</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-500">Gümrük Muafiyet Limiti (De Minimis)</span>
            <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
              {selectedCountry.deMinimisAmount} {selectedCountry.symbol}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Bu tutara kadar gönderilen mikro ihracat paketleri gümrük vergisinden muaftır.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-500">Yerel KDV (VAT / Sales Tax) Oranı</span>
            <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
              %{selectedCountry.vatRate}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Etsy veya Amazon gibi pazar yerleri üzerinden satıldığında sepette tahsil edilir.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-500">Ambalaj & Geri Dönüşüm Yasası</span>
            <div className="text-sm font-bold text-slate-900 mt-1">
              {selectedCountry.packagingLaw}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Ülkeye koli veya ambalaj yollayan üreticilerin lisans alma zorunluluğu.
            </p>
          </div>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-950 leading-relaxed">
          <strong className="text-emerald-900">Uygulama Notu ve Pratik Tavsiye:</strong> {selectedCountry.notes}
        </div>
      </div>

      {/* Part 2: Master Documents Catalog */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Zorunlu Dış Ticaret Evrak Kütüphanesi</h3>
            <p className="text-xs text-slate-500">Gümrükte takılmamak için ürün bazında talep edilen temel evraklar</p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Evrak veya kurum ara (MSDS, INCI, FDA)..."
              value={searchDocQuery}
              onChange={(e) => setSearchDocQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{doc.name}</h4>
                    <span className="text-[11px] text-slate-500">Düzenleyen: {doc.issuer}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  doc.importance === 'CRITICAL' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {doc.importance === 'CRITICAL' ? 'KRİTİK' : 'ZORUNLU'}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {doc.description}
              </p>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-700">
                <strong className="text-emerald-800">Pratik Rehber:</strong> {doc.tips}
              </div>

              {onOpenDocEditor && (
                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => onOpenDocEditor(doc)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-current text-emerald-400" />
                    <span>Şablonu Aç, Doldur & İndir</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
