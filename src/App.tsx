import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Wizard } from './components/Wizard';
import { ReportDashboard } from './components/ReportDashboard';
import { RegulationExplorer } from './components/RegulationExplorer';
import { LabelGenerator } from './components/LabelGenerator';
import { DocumentEditorModal } from './components/DocumentEditorModal';
import { analyzeCompliance } from './services/analyzer';
import type { AnalysisInput } from './services/analyzer';
import type { ComplianceReport, RequiredDocument } from './types';
import { ShieldCheck } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'wizard' | 'explorer' | 'labels'>('wizard');
  const [currentReport, setCurrentReport] = useState<ComplianceReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [libraryEditingDoc, setLibraryEditingDoc] = useState<RequiredDocument | null>(null);

  const handleAnalyze = (input: AnalysisInput) => {
    setIsLoading(true);
    setTimeout(() => {
      const result = analyzeCompliance(input);
      setCurrentReport(result);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
  };

  const handleNewAnalysis = () => {
    setCurrentReport(null);
    setActiveTab('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fallback report for when users open doc templates directly from the explorer
  const defaultReport: ComplianceReport = currentReport || {
    id: 'DEMO-TEMPLATE',
    timestamp: new Date().toLocaleDateString('tr-TR'),
    productName: 'Örnek İhracat Ürünü (Numune)',
    category: 'Genel E-İhracat Eşyası',
    hsCode: '3303.00.10.00',
    hsDescription: 'Uluslararası Ticari Eşya',
    targetCountry: 'Almanya (Avrupa Birliği)',
    salePrice: 50,
    currency: '€',
    marketplace: 'Etsy / Mikro İhracat',
    riskScore: 20,
    riskLevel: 'LOW',
    riskSummary: 'Standart mikro ihracat prosedürü.',
    dangerousGoods: {
      isDangerous: false,
      airCourierStatus: 'ALLOWED',
      carrierWarning: 'Standart kargo',
      packagingInstructions: ['Çift kat oluklu mukavva']
    },
    taxAnalysis: {
      countryCode: 'DE',
      countryName: 'Almanya',
      currency: 'EUR',
      deMinimisThreshold: 150,
      deMinimisDescription: '150€ altı muaf',
      vatThreshold: 0,
      vatRatePercent: 19,
      vatSchemeName: 'IOSS',
      buyerTaxAtDoor: false,
      estimatedCustomsDutyPercent: 0,
      explanation: 'IOSS kapsamında KDV sepette tahsil edilir.'
    },
    requiredDocuments: [],
    packagingRequirements: [],
    carrierNotes: {
      recommendedCarriers: ['DHL Express', 'FedEx', 'Navlungo'],
      microExportETGB: 'Mikro İhracat ETGB',
      specialHandling: 'Normal taşıma'
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onNewAnalysis={handleNewAnalysis}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'wizard' && (
          <>
            {currentReport ? (
              <ReportDashboard 
                report={currentReport} 
                onReset={handleNewAnalysis}
                onOpenLabelGenerator={() => setActiveTab('labels')}
              />
            ) : (
              <Wizard onAnalyze={handleAnalyze} isLoading={isLoading} />
            )}
          </>
        )}

        {activeTab === 'explorer' && (
          <RegulationExplorer 
            onOpenDocEditor={(doc) => setLibraryEditingDoc(doc)}
          />
        )}

        {activeTab === 'labels' && (
          <LabelGenerator />
        )}
      </main>

      {/* Direct document editor opened from library */}
      {libraryEditingDoc && (
        <DocumentEditorModal
          document={libraryEditingDoc}
          report={defaultReport}
          onClose={() => setLibraryEditingDoc(null)}
        />
      )}

      {/* Footer (Hidden in Print) */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-10 mt-16 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                  <ShieldCheck className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                </div>
                <span className="font-extrabold text-white text-base">E-İhracat Mevzuat ve Risk Asistanı</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                Etsy, Amazon ve Shopify satıcılarının mikro ihracatta (ETGB) karşılaştığı gümrük engellerini, vergi sınırlarını ve tehlikeli madde kurallarını tek tıkla analiz eden akıllı karar destek yazılımı.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono text-emerald-400 pt-1">
                <span>✓ 15.000 € / 300 Kg ETGB Limiti</span>
                <span>✓ IATA DGR Class 3 & 9</span>
                <span>✓ AB IOSS 150 € Kuralı</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Desteklenen Pazarlar</h4>
              <ul className="text-xs space-y-2 text-slate-400">
                <li className="flex items-center gap-1.5">🇩🇪 Almanya & Avrupa Birliği (IOSS / CPNP)</li>
                <li className="flex items-center gap-1.5">🇺🇸 Amerika Birleşik Devletleri (Section 321 / FDA)</li>
                <li className="flex items-center gap-1.5">🇬🇧 Birleşik Krallık (HMRC VAT / 135£)</li>
                <li className="flex items-center gap-1.5">🇨🇦 Kanada (CBSA De Minimis)</li>
                <li className="flex items-center gap-1.5">🇦🇪 Birleşik Arap Emirlikleri (ECAS)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Lojistik ve Entegrasyon</h4>
              <ul className="text-xs space-y-2 text-slate-400">
                <li>• DHL Express DG Kargo</li>
                <li>• FedEx International Priority</li>
                <li>• Navlungo / ShipEntegra ETGB</li>
                <li>• ZSVR LUCID Ambalaj Lisansı</li>
                <li>• T.C. Ticaret Bakanlığı Mikro İhracat</li>
              </ul>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 E-İhracat Asistanı. Tüm hakları saklıdır.</span>
            <span>RegTech · Otomatik GTİP Eşleme · IATA DG Uçuş İzni Denetimi</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
