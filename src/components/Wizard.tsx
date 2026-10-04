import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Globe2, 
  Package, 
  AlertTriangle, 
  Flame, 
  Battery, 
  Wine, 
  Gem, 
  Apple, 
  ShieldAlert, 
  Layers,
  Search
} from 'lucide-react';
import { PRESET_PRODUCTS, COUNTRIES } from '../data/regulations';
import type { AnalysisInput } from '../services/analyzer';
import type { ProductPreset } from '../types';

interface WizardProps {
  onAnalyze: (input: AnalysisInput) => void;
  isLoading: boolean;
}

export const Wizard: React.FC<WizardProps> = ({ onAnalyze, isLoading }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Preset Filters
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('ALL');
  const [presetSearchQuery, setPresetSearchQuery] = useState<string>('');

  // Form State
  const [productName, setProductName] = useState('Alkol Bazlı Parfüm & Kolonya (%80 Alkol)');
  const [description, setDescription] = useState('50ml cam şişede, %80 etil alkol içeren el yapımı lüks parfüm (IATA DG Class 3).');
  
  // Attributes
  const [isLiquid, setIsLiquid] = useState(true);
  const [hasAlcohol, setHasAlcohol] = useState(true);
  const [alcoholPercentage, setAlcoholPercentage] = useState(80);
  const [hasBattery, setHasBattery] = useState(false);
  const [batteryType, setBatteryType] = useState('Lityum-İyon');
  const [isFragile, setIsFragile] = useState(true);
  const [isFoodOrConsumable, setIsFoodOrConsumable] = useState(false);
  const [isPreciousMetal, setIsPreciousMetal] = useState(false);
  const [isWoodOrPlant, setIsWoodOrPlant] = useState(false);
  const [isTextile, setIsTextile] = useState(false);

  // Destination & Financials
  const [targetCountry, setTargetCountry] = useState('DE');
  const [salePrice, setSalePrice] = useState(48);
  const [marketplace, setMarketplace] = useState('Etsy');

  const filteredPresets = PRESET_PRODUCTS.filter((preset) => {
    const matchesCategory = 
      selectedCategoryTab === 'ALL' ||
      (selectedCategoryTab === 'COSMETIC' && preset.category.includes('Kozmetik')) ||
      (selectedCategoryTab === 'FOOD' && preset.category.includes('Gıda')) ||
      (selectedCategoryTab === 'JEWELRY' && preset.category.includes('Takı')) ||
      (selectedCategoryTab === 'ELECTRONIC' && preset.category.includes('Elektronik')) ||
      (selectedCategoryTab === 'TEXTILE' && (preset.category.includes('Tekstil') || preset.category.includes('Deri'))) ||
      (selectedCategoryTab === 'WOOD_CRAFT' && (preset.category.includes('Ahşap') || preset.category.includes('Seramik') || preset.category.includes('Mutfak'))) ||
      (selectedCategoryTab === 'OTHER' && (preset.category.includes('Bebek') || preset.category.includes('Avcılık')));

    const matchesSearch = 
      preset.name.toLowerCase().includes(presetSearchQuery.toLowerCase()) ||
      preset.category.toLowerCase().includes(presetSearchQuery.toLowerCase()) ||
      preset.description.toLowerCase().includes(presetSearchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleSelectPreset = (preset: ProductPreset) => {
    setProductName(preset.name);
    setDescription(preset.description);
    setIsLiquid(preset.attributes.isLiquid);
    setHasAlcohol(preset.attributes.hasAlcohol);
    setAlcoholPercentage(preset.attributes.alcoholPercentage || 0);
    setHasBattery(preset.attributes.hasBattery);
    setBatteryType(preset.attributes.batteryType || 'Lityum-İyon');
    setIsFragile(preset.attributes.isFragile);
    setIsFoodOrConsumable(preset.attributes.isFoodOrConsumable);
    setIsPreciousMetal(preset.attributes.isPreciousMetal);
    setIsWoodOrPlant(preset.attributes.isWoodOrPlant);
    setIsTextile(preset.attributes.isTextile);
    setTargetCountry(preset.suggestedCountry);
    setSalePrice(preset.defaultPrice);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze({
      productName,
      description,
      attributes: {
        isLiquid,
        hasAlcohol,
        alcoholPercentage,
        hasBattery,
        batteryType,
        isFragile,
        isFoodOrConsumable,
        isPreciousMetal,
        isWoodOrPlant,
        isTextile
      },
      targetCountry,
      salePrice: Number(salePrice),
      currency: COUNTRIES[targetCountry]?.currency || 'EUR',
      marketplace
    });
  };

  const selectedCountryInfo = COUNTRIES[targetCountry];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Gümrük Müşavirine Gerek Kalmadan Tek Tıkla Analiz & Otomatik Evrak</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          E-İhracat Mevzuat ve Risk Asistanı
        </h1>
        <p className="mt-2 text-base text-slate-600 max-w-2xl mx-auto">
          Karmaşık gümrük kurallarını, vergi sınırlarını ve IATA tehlikeli madde kısıtlarını satmak istediğiniz ürüne göre 3 adımda sadeleştirin.
        </p>
      </div>

      {/* Preset Quick Selection Buttons - Expanded with Category Tabs & Search */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 mb-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600" />
              Tüm E-İhracat Ürün Kategorileri & Test Senaryoları
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Tek tıkla formu doldurur ve özel mevzuatını getirir</p>
          </div>

          {/* Preset Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text"
              placeholder="Ürün veya kategori ara (parfüm, zeytinyağı, bıçak)..."
              value={presetSearchQuery}
              onChange={(e) => setPresetSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          {[
            { id: 'ALL', label: 'Tümü (' + PRESET_PRODUCTS.length + ')' },
            { id: 'COSMETIC', label: 'Kozmetik & Parfüm' },
            { id: 'FOOD', label: 'Gıda & Tüketim' },
            { id: 'JEWELRY', label: 'Takı & Kıymetli Maden' },
            { id: 'ELECTRONIC', label: 'Elektronik & Pilli' },
            { id: 'TEXTILE', label: 'Tekstil & Deri' },
            { id: 'WOOD_CRAFT', label: 'Ahşap & El Sanatları' },
            { id: 'OTHER', label: 'Bebek & Diğer' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategoryTab(cat.id)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedCategoryTab === cat.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Preset Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
          {filteredPresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className={`text-left p-3 rounded-xl border text-xs transition-all ${
                productName === preset.name
                  ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold ring-1 ring-emerald-500 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="font-bold text-slate-900 truncate">{preset.name}</div>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                <span className="truncate max-w-[140px]">{preset.category}</span>
                <span className="font-mono font-bold text-emerald-700 shrink-0">
                  {COUNTRIES[preset.suggestedCountry]?.flag} {preset.defaultPrice} {COUNTRIES[preset.suggestedCountry]?.symbol}
                </span>
              </div>
            </button>
          ))}
          {filteredPresets.length === 0 && (
            <div className="col-span-3 text-center py-6 text-xs text-slate-400">
              Aramanıza uygun ürün şablonu bulunamadı. Kendi ürün adınızı aşağıdaki formda girebilirsiniz.
            </div>
          )}
        </div>
      </div>

      {/* Wizard Step Navigation */}
      <div className="flex items-center justify-between mb-6 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
        <button
          type="button"
          onClick={() => setStep(1)}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            step === 1 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-xs flex items-center justify-center font-bold">1</span>
          <span>Ne Satacaksın?</span>
        </button>

        <button
          type="button"
          onClick={() => setStep(2)}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            step === 2 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-xs flex items-center justify-center font-bold">2</span>
          <span>İçerik & Nitelik</span>
        </button>

        <button
          type="button"
          onClick={() => setStep(3)}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            step === 3 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-xs flex items-center justify-center font-bold">3</span>
          <span>Hedef Ülke & Fiyat</span>
        </button>
      </div>

      {/* Main Wizard Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* STEP 1: ÜRÜN BİLGİSİ */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">1. Ne satmak istiyorsun?</h3>
                <p className="text-xs text-slate-500">Ürünün günlük ticari adını ve kısa açıklamasını girin.</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Ürün Adı
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Örn: Lavanta Parfümü, Doğal Zeytinyağı, Gümüş Yüzük..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 text-sm font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Kısa Açıklama ve Materyal Bilgisi
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Örn: 50 ml cam şişe içerisinde, %80 alkol içeren el yapımı esansiyel oda parfümü."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 text-sm"
              />
              <p className="text-xs text-slate-400 mt-1">
                İpucu: Boyut, şişe cinsi veya kumaş türü belirtmek GTİP ve gümrük tespitini kolaylaştırır.
              </p>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all"
              >
                <span>Sonraki Adım: İçerik & Nitelik</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: İÇERİK VE NİTELİK SEÇİCİ */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">2. Ürünün içeriğinde ne var veya niteliği nedir?</h3>
                <p className="text-xs text-slate-500">IATA uçak kargo ve gümrük denetimi için kritik özellikleri işaretleyin.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Alkol & Yanıcı Madde */}
              <div 
                onClick={() => setHasAlcohol(!hasAlcohol)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  hasAlcohol ? 'border-red-400 bg-red-50/60' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${hasAlcohol ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <Flame className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">Alkol veya Uçucu Çözücü Var</span>
                    <input 
                      type="checkbox" 
                      checked={hasAlcohol} 
                      onChange={() => {}} 
                      className="rounded text-red-600 focus:ring-red-500"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Parfüm, kolonya, vernik veya yanıcı solventler (IATA DG).</p>
                  
                  {hasAlcohol && (
                    <div className="mt-2.5 pt-2 border-t border-red-200/60" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-between text-xs font-medium text-red-900 mb-1">
                        <span>Alkol Oranı:</span>
                        <span className="font-bold font-mono">%{alcoholPercentage} Hacimce</span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="96" 
                        value={alcoholPercentage} 
                        onChange={(e) => setAlcoholPercentage(Number(e.target.value))}
                        className="w-full accent-red-600"
                      />
                      <span className="text-[10px] text-red-700">
                        {alcoholPercentage >= 24 ? '🚨 %24 üzerinde olduğu için Yanıcı Sıvı (DG Class 3) sayılır!' : 'Düşük alkollü.'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sıvı Maddeler */}
              <div 
                onClick={() => setIsLiquid(!isLiquid)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  isLiquid ? 'border-blue-400 bg-blue-50/60' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${isLiquid ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <Wine className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">Sıvı veya Krem / Jel</span>
                    <input 
                      type="checkbox" 
                      checked={isLiquid} 
                      onChange={() => {}} 
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Zeytinyağı, serum, krem, şampuan vb. (Sızdırmaz koli gerektirir).</p>
                </div>
              </div>

              {/* Lityum Pil / Elektronik */}
              <div 
                onClick={() => setHasBattery(!hasBattery)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  hasBattery ? 'border-amber-400 bg-amber-50/60' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${hasBattery ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <Battery className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">Lityum Pil / Şarjlı Cihaz</span>
                    <input 
                      type="checkbox" 
                      checked={hasBattery} 
                      onChange={() => {}} 
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Dahili bataryalı lamba, oyuncak veya kulaklık (UN3481).</p>
                </div>
              </div>

              {/* Gıda & Tüketilebilir */}
              <div 
                onClick={() => setIsFoodOrConsumable(!isFoodOrConsumable)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  isFoodOrConsumable ? 'border-emerald-400 bg-emerald-50/60' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${isFoodOrConsumable ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <Apple className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">Gıda / Baharat / İçecek</span>
                    <input 
                      type="checkbox" 
                      checked={isFoodOrConsumable} 
                      onChange={() => {}} 
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Kahve, zeytinyağı, lokum, takviye edici gıda (FDA/Sağlık izni).</p>
                </div>
              </div>

              {/* Kıymetli Maden / Takı */}
              <div 
                onClick={() => setIsPreciousMetal(!isPreciousMetal)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  isPreciousMetal ? 'border-purple-400 bg-purple-50/60' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${isPreciousMetal ? 'bg-purple-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <Gem className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">Gümüş / Altın / Değerli Maden</span>
                    <input 
                      type="checkbox" 
                      checked={isPreciousMetal} 
                      onChange={() => {}} 
                      className="rounded text-purple-600 focus:ring-purple-500"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">925 ayar gümüş takı veya mücevherat (Ayar damgası ve limitler).</p>
                </div>
              </div>

              {/* Cam & Kırılabilir */}
              <div 
                onClick={() => setIsFragile(!isFragile)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  isFragile ? 'border-slate-400 bg-slate-100' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${isFragile ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">Cam / Seramik / Kırılabilir</span>
                    <input 
                      type="checkbox" 
                      checked={isFragile} 
                      onChange={() => {}} 
                      className="rounded text-slate-800 focus:ring-slate-700"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Cam şişe, porselen kupa veya hassas süs eşyası.</p>
                </div>
              </div>

            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Geri
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all"
              >
                <span>Sonraki Adım: Hedef Ülke & Fiyat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: HEDEF ÜLKE VE VERGİ DETAYLARI */}
        {step === 3 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">3. Hangi ülkeye yollayacaksın?</h3>
                <p className="text-xs text-slate-500">Gümrük muafiyet sınırı (De Minimis) ve vergi hesabı için detayları girin.</p>
              </div>
            </div>

            {/* Country Selector Cards */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Hedef Ülke
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {Object.values(COUNTRIES).map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setTargetCountry(c.code)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      targetCountry === c.code
                        ? 'border-emerald-600 bg-emerald-50/80 font-semibold ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{c.flag}</div>
                    <div className="font-bold text-xs text-slate-900 truncate">{c.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Sınır: <span className="font-mono font-semibold text-emerald-700">{c.deMinimisAmount} {c.symbol}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price and Marketplace inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Satış Fiyatı ({selectedCountryInfo.symbol} {selectedCountryInfo.currency})
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="15000"
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-semibold text-slate-900 text-sm"
                    required
                  />
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">
                    {selectedCountryInfo.symbol}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>De Minimis Eşiği: {selectedCountryInfo.deMinimisAmount} {selectedCountryInfo.symbol}</span>
                  {salePrice > selectedCountryInfo.deMinimisAmount ? (
                    <span className="text-red-600 font-semibold">⚠️ Eşik Aşılıyor!</span>
                  ) : (
                    <span className="text-emerald-600 font-semibold">✓ Eşik Altında</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Satış Yapılan Kanal / Platform
                </label>
                <select
                  value={marketplace}
                  onChange={(e) => setMarketplace(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 text-sm font-medium bg-white"
                >
                  <option value="Etsy">Etsy (Otomatik IOSS / KDV Kesintili)</option>
                  <option value="Amazon">Amazon Global / FBM</option>
                  <option value="Shopify">Shopify (Kendi E-Ticaret Sitem)</option>
                  <option value="eBay">eBay</option>
                  <option value="Direct">Doğrudan Sipariş / Instagram / B2B</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Pazaryerleri KDV'yi sepette peşin keserek alıcıyı sürpriz gümrük vergisinden korur.
                </p>
              </div>
            </div>

            {/* Country Warning Banner */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-start gap-3">
              <span className="text-xl">{selectedCountryInfo.flag}</span>
              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-900">{selectedCountryInfo.name} Mevzuat Özeti:</p>
                <p>{selectedCountryInfo.notes}</p>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Geri
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-8 py-3 rounded-xl text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-102 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Mevzuat Taranıyor...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Tek Tıkla Risk ve Evrak Analizi Yap</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </form>

    </div>
  );
};
