import React, { useState } from 'react';
import { Tag, Printer, Flame, ArrowUp } from 'lucide-react';

export const LabelGenerator: React.FC = () => {
  const [labelType, setLabelType] = useState<'inci' | 'box_hazard'>('inci');

  // INCI Label state
  const [brandName, setBrandName] = useState('ANATOLIA BOTANICALS');
  const [productNameEn, setProductNameEn] = useState('Handcrafted Lavender Eau De Parfum');
  const [volume, setVolume] = useState('50 ml e 1.7 FL. OZ.');
  const [ingredients, setIngredients] = useState(
    'Alcohol Denat. (80% Vol.), Parfum (Fragrance), Aqua (Water), Lavandula Angustifolia Oil, Linalool, Limonene, Geraniol, Coumarin.'
  );
  const [batchNo, setBatchNo] = useState('LOT-2026-TR01');
  const [origin, setOrigin] = useState('Made in Türkiye');
  const [producerAddress, setProducerAddress] = useState('Atolye No: 4, Kadikoy, Istanbul / Turkiye');

  // Box hazard label type
  const [boxHazardType, setBoxHazardType] = useState<'flammable' | 'battery' | 'fragile'>('flammable');

  const handlePrintLabel = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
          <Tag className="w-3.5 h-3.5" />
          <span>Baskıya Hazır Dış Ticaret Etiket Motoru</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          İngilizce INCI ve Kargo Koli Etiketi Oluşturucu
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          Gümrük muayenesinden sorunsuz geçmek için ürün kutusuna ve dış koliye yapıştırılması gereken resmi etiketler.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center no-print">
        <div className="bg-slate-200/80 p-1 rounded-2xl inline-flex gap-1 border border-slate-300">
          <button
            type="button"
            onClick={() => setLabelType('inci')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              labelType === 'inci'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Ürün / Şişe INCI Etiketi (Kozmetik)
          </button>
          <button
            type="button"
            onClick={() => setLabelType('box_hazard')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              labelType === 'box_hazard'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Dış Koli Uyarı Etiketleri (DG / Kırılabilir)
          </button>
        </div>
      </div>

      {/* INCI LABEL SECTION */}
      {labelType === 'inci' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Controls */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm no-print">
            <h3 className="font-extrabold text-base text-slate-900 border-b pb-3">
              Etiket Bilgilerini Düzenleyin
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Marka / Üretici Adı</label>
              <input 
                type="text" 
                value={brandName} 
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">İngilizce Ürün Adı</label>
              <input 
                type="text" 
                value={productNameEn} 
                onChange={(e) => setProductNameEn(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Hacim / Net Ağırlık</label>
              <input 
                type="text" 
                value={volume} 
                onChange={(e) => setVolume(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                INCI Formatında İngilizce Bileşenler (Ingredients)
              </label>
              <textarea 
                rows={3}
                value={ingredients} 
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 font-mono"
              />
              <span className="text-[10px] text-slate-400">
                Alerjenler (Linalool, Limonene) mutlaka en sonda listelenmelidir.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Parti / Lot Numarası</label>
                <input 
                  type="text" 
                  value={batchNo} 
                  onChange={(e) => setBatchNo(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Menşe Ülke</label>
                <input 
                  type="text" 
                  value={origin} 
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Üretici / Atölye İletişim Adresi</label>
              <input 
                type="text" 
                value={producerAddress} 
                onChange={(e) => setProducerAddress(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="button"
              onClick={handlePrintLabel}
              className="w-full mt-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Etiketi Yazıcıya Gönder (A4 / Termal)</span>
            </button>
          </div>

          {/* Live Preview (Product Label) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between no-print">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Canlı Etiket Önizleme (Şişe/Kutu Arkası)
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Uluslararası Uyumluluk (EU/FDA INCI)
              </span>
            </div>

            <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-2xl max-w-sm mx-auto font-sans text-slate-950 text-center space-y-3.5 print:border-black print:max-w-none">
              <div className="font-black text-sm tracking-widest uppercase border-b border-slate-200 pb-2">
                {brandName}
              </div>

              <div className="font-bold text-xs uppercase tracking-wide">
                {productNameEn}
              </div>

              <div className="text-[11px] font-mono font-bold text-slate-800">
                {volume}
              </div>

              <div className="text-[10px] text-slate-700 leading-tight text-left bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="font-bold block mb-0.5">INGREDIENTS / INCI:</span>
                <span className="font-mono">{ingredients}</span>
              </div>

              <div className="text-[9px] text-slate-500 text-left space-y-0.5">
                <p><strong>CAUTION:</strong> Flammable until dry. Keep away from flames and heat. Avoid spraying in eyes. For external use only.</p>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-600">
                <span>BATCH: {batchNo}</span>
                <span className="font-bold border border-slate-900 px-1 py-0.5 rounded">24M</span>
                <span>{origin}</span>
              </div>

              <div className="text-[8px] text-slate-400">
                {producerAddress}
              </div>
            </div>

            <p className="text-xs text-slate-500 text-center no-print">
              Bu etiketi şeffaf veya kuşe yapışkanlı kağıda bastırıp şişenizin ya da kutunuzun üzerine yapıştırabilirsiniz.
            </p>
          </div>

        </div>
      )}

      {/* BOX HAZARD LABELS */}
      {labelType === 'box_hazard' && (
        <div className="space-y-6">
          
          <div className="flex justify-center gap-3 no-print">
            <button
              onClick={() => setBoxHazardType('flammable')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                boxHazardType === 'flammable'
                  ? 'bg-red-600 text-white border-red-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Class 3 Alevlenir Sıvı (Parfüm)
            </button>

            <button
              onClick={() => setBoxHazardType('battery')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                boxHazardType === 'battery'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              UN 3481 Lityum Pil Etiketi
            </button>

            <button
              onClick={() => setBoxHazardType('fragile')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                boxHazardType === 'fragile'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Kırılabilir & Dik Taşıma (Fragile)
            </button>
          </div>

          {/* Render Selected Box Label */}
          <div className="flex justify-center">
            
            {boxHazardType === 'flammable' && (
              <div className="w-80 h-80 bg-red-600 text-white border-8 border-white shadow-2xl p-6 flex flex-col justify-between items-center text-center font-black rounded-lg">
                <Flame className="w-24 h-24 stroke-[2.5]" />
                <div>
                  <div className="text-2xl tracking-wider uppercase">FLAMMABLE LIQUID</div>
                  <div className="text-sm font-mono mt-1">UN 1266 / CLASS 3</div>
                </div>
                <div className="text-4xl font-mono">3</div>
              </div>
            )}

            {boxHazardType === 'battery' && (
              <div className="w-80 h-72 bg-white text-slate-950 border-4 border-dashed border-red-600 shadow-2xl p-6 flex flex-col justify-between items-center text-center font-black rounded-lg">
                <div className="text-sm font-extrabold text-red-600 tracking-wider">
                  DO NOT LOAD OR TRANSPORT PACKAGE IF DAMAGED
                </div>
                <div className="text-4xl font-mono font-black text-slate-900">
                  UN 3481
                </div>
                <div className="text-xs text-slate-700">
                  Lithium ion batteries contained in equipment
                </div>
                <div className="text-xs font-mono border-t border-slate-200 pt-2 w-full">
                  Emergency Contact: +90 (___) ___ __ __
                </div>
              </div>
            )}

            {boxHazardType === 'fragile' && (
              <div className="w-80 h-80 bg-white text-slate-950 border-4 border-slate-950 shadow-2xl p-6 flex flex-col justify-between items-center text-center font-black rounded-lg">
                <div className="flex gap-8">
                  <ArrowUp className="w-16 h-16 stroke-[3]" />
                  <ArrowUp className="w-16 h-16 stroke-[3]" />
                </div>
                <div>
                  <div className="text-3xl tracking-widest uppercase">THIS WAY UP</div>
                  <div className="text-lg text-red-600 mt-1 uppercase">FRAGILE / SIVI İÇERİR</div>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  HANDLE WITH CARE · DO NOT DROP
                </div>
              </div>
            )}

          </div>

          <div className="text-center no-print pt-4">
            <button
              onClick={handlePrintLabel}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Koli Etiketini Yazdır</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
