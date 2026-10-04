import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Printer, 
  Flame, 
  FileText, 
  DollarSign, 
  Truck, 
  Package, 
  RotateCcw,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Info,
  Sparkles
} from 'lucide-react';
import type { ComplianceReport, RequiredDocument } from '../types';
import { DocumentEditorModal } from './DocumentEditorModal';

interface ReportDashboardProps {
  report: ComplianceReport;
  onReset: () => void;
  onOpenLabelGenerator: () => void;
}

export const ReportDashboard: React.FC<ReportDashboardProps> = ({ 
  report, 
  onReset,
  onOpenLabelGenerator
}) => {
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  const [simulatedPrice, setSimulatedPrice] = useState(report.salePrice);
  const [activeEditingDoc, setActiveEditingDoc] = useState<RequiredDocument | null>(null);

  const toggleDocCheck = (id: string) => {
    setCheckedDocs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isDangerous = report.dangerousGoods.isDangerous;
  const isHighRisk = report.riskLevel === 'HIGH';
  const isMediumRisk = report.riskLevel === 'MEDIUM';

  const riskBadgeColor = isHighRisk 
    ? 'bg-red-500/10 text-red-700 border-red-300'
    : isMediumRisk 
    ? 'bg-amber-500/10 text-amber-800 border-amber-300'
    : 'bg-emerald-500/10 text-emerald-800 border-emerald-300';

  const deMinimisLimit = report.taxAnalysis.deMinimisThreshold;
  const isSimulatedOverDeMinimis = simulatedPrice > deMinimisLimit;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Action Bar (Top) */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 no-print">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm hover:bg-slate-50 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Yeni Analiz Başlat</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLabelGenerator}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 px-3.5 py-2 rounded-xl transition-all"
          >
            <Package className="w-4 h-4" />
            <span>Kutu & Ürün Etiketleri</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl shadow-md transition-all hover:scale-102"
          >
            <Printer className="w-4 h-4" />
            <span>Resmi PDF / Yazdır</span>
          </button>
        </div>
      </div>

      {/* Main Printable Document Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print:shadow-none print:border-none">
        
        {/* Certificate Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white p-6 sm:p-8 border-b border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Resmi Uyumluluk Raporu
                </span>
                <span className="text-xs text-slate-400 font-mono">#{report.id}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {report.productName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 flex flex-wrap items-center gap-3">
                <span>📍 Hedef Ülke: <strong className="text-white">{report.targetCountry}</strong></span>
                <span>•</span>
                <span>📦 Kategori: <strong className="text-white">{report.category}</strong></span>
                <span>•</span>
                <span>🏷️ GTİP: <strong className="font-mono text-emerald-400">{report.hsCode}</strong></span>
              </p>
            </div>

            {/* Risk Gauge Pill */}
            <div className={`p-4 rounded-2xl border ${riskBadgeColor} bg-white text-center min-w-[170px] shadow-sm`}>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-0.5">
                Genel Risk Seviyesi
              </div>
              <div className="text-2xl font-black flex items-center justify-center gap-1.5">
                {isHighRisk && <AlertTriangle className="w-6 h-6 text-red-600" />}
                {isMediumRisk && <AlertTriangle className="w-6 h-6 text-amber-600" />}
                {!isHighRisk && !isMediumRisk && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                <span>
                  {isHighRisk ? 'YÜKSEK RİSK' : isMediumRisk ? 'ORTA RİSK' : 'DÜŞÜK RİSK'}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                <div 
                  className={`h-full rounded-full ${
                    isHighRisk ? 'bg-red-600' : isMediumRisk ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${report.riskScore}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-mono font-semibold">
                Risk Skoru: %{report.riskScore}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-xl">
            <strong>Özet Tespit:</strong> {report.riskSummary}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* SECTION 1: 🚨 KRİTİK RİSKLER VE UYARILAR */}
          <div className="rounded-2xl border border-red-200 bg-red-50/40 p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-3 text-red-900">
              <div className="p-2 rounded-xl bg-red-500 text-white shadow-sm">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg">1. Kritik Riskler ve Taşıma Kısıtlamaları</h3>
                <p className="text-xs text-red-700">Kargo uçağına kabul ve varış gümrüğü muayene koşulları</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              
              {/* DG Status */}
              <div className="bg-white p-4 rounded-xl border border-red-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tehlikeli Madde (DG) Statüsü</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isDangerous ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {isDangerous ? 'TEHLİKELİ MADDE (DG)' : 'STANDART KARGO'}
                  </span>
                </div>
                {isDangerous ? (
                  <>
                    <p className="text-xs text-slate-700 font-medium">
                      <strong className="text-red-700">{report.dangerousGoods.iataClass}</strong>
                    </p>
                    <p className="text-xs text-slate-600 font-mono bg-slate-100 p-1.5 rounded border border-slate-200">
                      UN Kodu: {report.dangerousGoods.unCode}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {report.dangerousGoods.carrierWarning}
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bu ürün IATA Dangerous Goods regulasyonu kapsamında uçuş engeline sahip değildir. Standart ekspres hava kargo ile sevk edilebilir.
                  </p>
                )}
              </div>

              {/* Inspection and Compliance Warning */}
              <div className="bg-white p-4 rounded-xl border border-red-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gümrük & İçerik Denetimi</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Varış gümrüğünde ({report.targetCountry}) ürünlerin fiziksel veya kimyasal analiz için bekletilme riski:
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                  {report.category.includes('Kozmetik') && (
                    <li><strong>İnsan Sağlığı & Kozmetik Denetimi:</strong> Cilde temas eden ürünler için varış gümrüğü içerik ve uygunluk raporu talep edebilir.</li>
                  )}
                  {report.category.includes('Gıda') && (
                    <li><strong>Biyogüvenlik Denetimi:</strong> Gıda ve bitkisel ürünler FDA veya yerel gıda otoritesi tarafından incelemeye alınabilir.</li>
                  )}
                  {report.category.includes('Takı') && (
                    <li><strong>Kıymetli Maden Denetimi:</strong> Takının ayarı (925 gümüş vb.) ve fatura tutarının piyasa rayici ile uyumu incelenir.</li>
                  )}
                  {report.category.includes('Kesici') && (
                    <li><strong>Güvenlik Taraması:</strong> Kesici ve delici aletler için özel kurye beyanı ve muhafaza kılıfı denetlenir.</li>
                  )}
                  <li><strong>Ambalaj & Geri Dönüşüm:</strong> {report.taxAnalysis.packagingLawName || 'Yerel ambalaj yönetmeliği'} kurallarına uygunluk aranır.</li>
                </ul>
              </div>

            </div>
          </div>

          {/* SECTION 2: 📄 HAZIRLANMASI GEREKEN BELGELER (OTOMASYONLU DOLDURMA ENTEGRELİ) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500 text-white shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">2. Hazırlanması Gereken Zorunlu Belgeler (Otomasyonlu)</h3>
                  <p className="text-xs text-slate-500">Her belgenin üzerine tıklayarak bilgileri otomatik doldurup yazdırabilirsiniz</p>
                </div>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {Object.values(checkedDocs).filter(Boolean).length} / {report.requiredDocuments.length} Tamamlandı
              </span>
            </div>

            <div className="space-y-3">
              {report.requiredDocuments.map((doc) => {
                const isChecked = !!checkedDocs[doc.id];
                const isExpanded = expandedDoc === doc.id;

                return (
                  <div
                    key={doc.id}
                    className={`rounded-xl border transition-all ${
                      isChecked 
                        ? 'border-emerald-300 bg-emerald-50/40' 
                        : doc.importance === 'CRITICAL' 
                        ? 'border-amber-300 bg-amber-50/30' 
                        : 'border-slate-200 bg-slate-50/50'
                    }`}
                  >
                    <div className="p-4 flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => toggleDocCheck(doc.id)}
                        className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors no-print ${
                          isChecked 
                            ? 'bg-emerald-600 border-emerald-600 text-white' 
                            : 'border-slate-300 bg-white hover:border-slate-400'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                      </button>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className={`text-sm font-bold ${isChecked ? 'text-emerald-950 line-through' : 'text-slate-900'}`}>
                            {doc.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                              Veren: {doc.issuer}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              doc.importance === 'CRITICAL' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {doc.importance === 'CRITICAL' ? 'KRİTİK ZORUNLU' : 'GEREKLİ'}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 mt-1">
                          {doc.description}
                        </p>

                        {/* Action buttons: Fill Form Modal & Tips */}
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/60 pt-2.5">
                          <button
                            type="button"
                            onClick={() => setActiveEditingDoc(doc)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg text-xs shadow-sm transition-all hover:scale-102 no-print"
                          >
                            <Sparkles className="w-3.5 h-3.5 fill-current" />
                            <span>Formu Doldur & Resmi İndir</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setExpandedDoc(isExpanded ? null : doc.id)}
                            className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 no-print"
                          >
                            <Info className="w-3.5 h-3.5" />
                            <span>{isExpanded ? 'İpuçlarını Gizle' : 'Nasıl Temin Edilir & İpuçları'}</span>
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="mt-2.5 p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
                            <strong className="text-emerald-800">Pratik İpucu:</strong> {doc.tips}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: 💰 VERGİ, EŞİK VE MALİYET SİMÜLATÖRÜ */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-sm">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">3. Vergi, Eşik ve Maliyet Yönetimi</h3>
                  <p className="text-xs text-slate-500">{report.targetCountry} gümrük muafiyeti ve kapıda ödeme simülasyonu</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
                <span>Rejim:</span>
                <span className="text-emerald-700">{report.taxAnalysis.vatSchemeName}</span>
              </div>
            </div>

            {/* Interactive Price Slider for De Minimis Testing */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-5 no-print">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                <span className="flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                  Canlı Fatura Simülatörü: Fiyatı Değiştirin ve Eşik Değişimini Görün
                </span>
                <span className="font-mono text-sm font-bold text-slate-900">
                  {simulatedPrice} {report.currency}
                </span>
              </div>
              <input 
                type="range"
                min="5"
                max={deMinimisLimit * 2}
                value={simulatedPrice}
                onChange={(e) => setSimulatedPrice(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                <span>0 {report.currency}</span>
                <span className="font-bold text-emerald-800">Eşik Sınırı: {deMinimisLimit} {report.currency}</span>
                <span>{deMinimisLimit * 2} {report.currency}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Box 1: De Minimis */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Gümrük Muafiyet Sınırı</span>
                <div className="text-xl font-black text-slate-900 mt-1 font-mono">
                  {deMinimisLimit} {report.currency}
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Bu tutarın altındaki paketler gümrük vergisine tabi tutulmaz.
                </p>
              </div>

              {/* Box 2: Kapıda Vergi Çıkar mı? */}
              <div className={`p-4 rounded-xl border ${
                isSimulatedOverDeMinimis 
                  ? 'bg-red-50 border-red-200 text-red-950' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              }`}>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Alıcı Kapıda Vergi Öder mi?</span>
                <div className="text-xl font-black mt-1">
                  {isSimulatedOverDeMinimis ? 'EVET (Vergi Doğar)' : 'HAYIR (Sürpriz Yok)'}
                </div>
                <p className="text-xs mt-1 leading-snug">
                  {isSimulatedOverDeMinimis 
                    ? `Fiyat (${simulatedPrice} ${report.currency}) limiti aştığı için alıcıya teslimatta ithalat vergisi çıkar!` 
                    : `Sipariş ${report.marketplace} üzerinde KDV dahil satıldıysa alıcı ek ücret ödemez.`
                  }
                </p>
              </div>

              {/* Box 3: Tahmini Masraflar */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tahmini Gümrük & KDV Oranı</span>
                <div className="text-xl font-black text-slate-900 mt-1 font-mono">
                  %{isSimulatedOverDeMinimis ? report.taxAnalysis.estimatedCustomsDutyPercent + report.taxAnalysis.vatRatePercent : report.taxAnalysis.vatRatePercent}
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  KDV: %{report.taxAnalysis.vatRatePercent} | Gümrük: {isSimulatedOverDeMinimis ? `%${report.taxAnalysis.estimatedCustomsDutyPercent}` : '%0'}
                </p>
              </div>

            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed">
              <strong>Önemli Kural:</strong> {report.taxAnalysis.explanation}
            </div>

          </div>

          {/* SECTION 4: 📦 PAKETLEME VE KARGO TAVSİYELERİ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Packaging */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-5 h-5 text-slate-700" />
                <h4 className="font-bold text-sm text-slate-900">Paketleme & Güvenlik Standartları</h4>
              </div>
              <ul className="text-xs text-slate-600 space-y-2">
                {report.packagingRequirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Carriers & Micro Export */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-sm text-slate-900">Tavsiye Edilen Kargo Firmaları & ETGB</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {report.carrierNotes.microExportETGB}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {report.carrierNotes.recommendedCarriers.map((carrier, idx) => (
                  <span key={idx} className="text-[11px] font-semibold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200">
                    {carrier}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Official Disclaimer */}
          <div className="border-t border-slate-200 pt-5 text-[11px] text-slate-400 text-center leading-relaxed">
            <p>
              <strong>Yasal Uyarı:</strong> Bu rapor, kamuya açık uluslararası gümrük tarifeleri, IATA DGR el kitapları ve De Minimis eşikleri baz alınarak bilgilendirme amacıyla üretilmiştir. Resmi gümrük müşavirliği veya hukuki danışmanlık yerine geçmez. Ürününüzün kesin sevkiyatında taşıyıcı firmanızın güncel kabul şartlarını teyit ediniz.
            </p>
          </div>

        </div>

      </div>

      {/* Interactive Document Generator Modal */}
      {activeEditingDoc && (
        <DocumentEditorModal
          document={activeEditingDoc}
          report={report}
          onClose={() => setActiveEditingDoc(null)}
        />
      )}

    </div>
  );
};
