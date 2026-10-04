import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Building2, 
  User, 
  FileText, 
  Stamp 
} from 'lucide-react';
import type { RequiredDocument, ComplianceReport } from '../types';

interface DocumentEditorModalProps {
  document: RequiredDocument;
  report: ComplianceReport;
  onClose: () => void;
}

export const DocumentEditorModal: React.FC<DocumentEditorModalProps> = ({
  document,
  report,
  onClose
}) => {
  // Shared Form State
  const [shipperName, setShipperName] = useState('ANATOLIA HANDCRAFT ATELIER LTD.');
  const [shipperAddress, setShipperAddress] = useState('Moda Cad. No: 42/B, Kadikoy, Istanbul / TURKIYE');
  const [shipperTaxId, setShipperTaxId] = useState('VKN: 1234567890 (Kadikoy VD)');
  const [shipperPhone, setShipperPhone] = useState('+90 216 555 0199');

  const [consigneeName, setConsigneeName] = useState('Sarah Miller');
  const [consigneeAddress, setConsigneeAddress] = useState('Friedrichstrasse 176, 10117 Berlin, GERMANY');
  const [consigneePhone, setConsigneePhone] = useState('+49 151 2345678');

  const [invoiceNo, setInvoiceNo] = useState('EXP-2026-' + Math.floor(1000 + Math.random() * 9000));
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [awbNumber, setAwbNumber] = useState('DHL-TR-' + Math.floor(100000000 + Math.random() * 900000000));

  // Specific Product & Field states
  const [productTitle, setProductTitle] = useState(report.productName);
  const [hsCodeVal, setHsCodeVal] = useState(report.hsCode);
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(report.salePrice);

  // Document Specific Fields
  const [customField1, setCustomField1] = useState(() => {
    if (document.id === 'MSDS') return 'UN 1266, PERFUMERY PRODUCTS, CLASS 3, PG III';
    if (document.id === 'FDA_PRIOR_NOTICE') return 'FDA-REG-TR-9823412';
    if (document.id === 'LUCID_REGISTRATION') return 'DE5849204918234';
    if (document.id === 'BATTERY_UN383') return 'UN 3481, PI 967 SECTION II (<100Wh)';
    if (document.id === 'HALLMARK_CERT') return '925 STERLING SILVER (Ayar 925/1000)';
    if (document.id === 'LEATHER_CITES') return '100% Domestic Sheep/Lambskin (Ovis Aries)';
    if (document.id === 'TEXTILE_COMPOSITION') return '100% Anatolian Virgin Wool';
    if (document.id === 'KNIFE_DECLARATION') return 'Handmade Kitchen Chef Knife, 18cm Carbon Steel';
    return 'STANDART GÜMRÜK BEYANI';
  });

  const [customField2, setCustomField2] = useState(() => {
    if (document.id === 'MSDS') return 'Flash Point: 21°C / Boiling Point: 78°C / Ethanol: 80%';
    if (document.id === 'FDA_PRIOR_NOTICE') return 'Prior Notice Confirmation: PN-2026-US-8912';
    if (document.id === 'LUCID_REGISTRATION') return 'Dual System Contract Partner: Der Grüne Punkt (DSD)';
    if (document.id === 'BATTERY_UN383') return 'Capacity: 1200mAh / 4.44Wh / 1 Cell contained';
    if (document.id === 'HALLMARK_CERT') return 'Net Metal Weight: 14.20 Grams (No Plated Base Metal)';
    if (document.id === 'LEATHER_CITES') return 'Non-Endangered Species / Non-CITES Material';
    if (document.id === 'TEXTILE_COMPOSITION') return 'Care: Dry Clean Only, Do Not Bleach, Low Iron';
    if (document.id === 'KNIFE_DECLARATION') return 'Non-Tactical Culinary Craft Cutlery, Dulled Tip Guarded';
    return 'Mikro İhracat Elektronik Ticaret Gümrük Beyanı (ETGB)';
  });

  const totalAmount = (quantity * unitPrice).toFixed(2);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <FileText className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">{document.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Otomatik Doldurucu
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Sol paneldeki kutulardan bilgileri güncelleyip resmi formatta indirin veya yazdırın.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Yazdır / PDF Olarak Kaydet</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split 2 columns (Form on Left, Official Document Preview on Right) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          
          {/* LEFT COLUMN: FORM INPUTS (Hidden when printing) */}
          <div className="lg:col-span-5 p-5 sm:p-6 bg-slate-50 border-r border-slate-200 space-y-4 overflow-y-auto no-print text-xs">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                İhracatçı Firma Bilgileri (Shipper)
              </span>
              <span className="text-[10px] text-slate-400">Türkiye</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Şirket / Üretici Unvanı</label>
              <input 
                type="text" 
                value={shipperName} 
                onChange={(e) => setShipperName(e.target.value)}
                className="w-full px-3 py-1.5 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Açık Adres (Türkiye)</label>
              <input 
                type="text" 
                value={shipperAddress} 
                onChange={(e) => setShipperAddress(e.target.value)}
                className="w-full px-3 py-1.5 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Vergi No / TC</label>
                <input 
                  type="text" 
                  value={shipperTaxId} 
                  onChange={(e) => setShipperTaxId(e.target.value)}
                  className="w-full px-3 py-1.5 border rounded-lg bg-white font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Telefon</label>
                <input 
                  type="text" 
                  value={shipperPhone} 
                  onChange={(e) => setShipperPhone(e.target.value)}
                  className="w-full px-3 py-1.5 border rounded-lg bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200 pb-2 pt-2">
              <span className="font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                Alıcı / Müşteri Bilgileri (Consignee)
              </span>
              <span className="text-[10px] text-slate-400">{report.targetCountry}</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Alıcı Adı Soyadı</label>
              <input 
                type="text" 
                value={consigneeName} 
                onChange={(e) => setConsigneeName(e.target.value)}
                className="w-full px-3 py-1.5 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Teslimat Adresi & Ülke</label>
                <input 
                  type="text" 
                  value={consigneeAddress} 
                  onChange={(e) => setConsigneeAddress(e.target.value)}
                  className="w-full px-3 py-1.5 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Alıcı Telefon</label>
                <input 
                  type="text" 
                  value={consigneePhone} 
                  onChange={(e) => setConsigneePhone(e.target.value)}
                  className="w-full px-3 py-1.5 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Fatura No</label>
                <input 
                  type="text" 
                  value={invoiceNo} 
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  className="w-full px-2 py-1.5 border rounded-lg bg-white font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tarih</label>
                <input 
                  type="date" 
                  value={invoiceDate} 
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full px-2 py-1.5 border rounded-lg bg-white font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kargo Takip / AWB</label>
                <input 
                  type="text" 
                  value={awbNumber} 
                  onChange={(e) => setAwbNumber(e.target.value)}
                  className="w-full px-2 py-1.5 border rounded-lg bg-white font-mono"
                />
              </div>
            </div>

            {/* Product description & HS code edit */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Belgedeki Ürün Tanımı</label>
                <input 
                  type="text" 
                  value={productTitle} 
                  onChange={(e) => setProductTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded-lg bg-white font-semibold"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">GTİP / HS</label>
                <input 
                  type="text" 
                  value={hsCodeVal} 
                  onChange={(e) => setHsCodeVal(e.target.value)}
                  className="w-full px-2 py-1.5 border rounded-lg bg-white font-mono font-bold"
                />
              </div>
            </div>

            {/* Document Specific Dynamic Inputs */}
            <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 space-y-2 mt-2">
              <span className="font-bold text-emerald-900 block text-[11px] uppercase tracking-wider">
                Belgeye Özel Deklarasyon Parametreleri
              </span>
              
              <div>
                <label className="block text-[11px] font-semibold text-slate-800 mb-0.5">
                  Özel Kod / Standart Beyanı
                </label>
                <input 
                  type="text" 
                  value={customField1} 
                  onChange={(e) => setCustomField1(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded-lg bg-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-800 mb-0.5">
                  Teknik Nitelik / Kimyasal / Lisans Açıklaması
                </label>
                <textarea 
                  rows={2}
                  value={customField2} 
                  onChange={(e) => setCustomField2(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded-lg bg-white font-mono text-xs"
                />
              </div>
            </div>

            {/* Item Pricing */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Miktar</label>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border rounded-lg bg-white font-mono font-bold"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Birim Fiyat ({report.currency})</label>
                <input 
                  type="number" 
                  value={unitPrice} 
                  onChange={(e) => setUnitPrice(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border rounded-lg bg-white font-mono font-bold"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Toplam ({report.currency})</label>
                <div className="px-2 py-1.5 border rounded-lg bg-slate-200 font-mono font-bold text-slate-900">
                  {totalAmount} {report.currency}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: OFFICIAL A4 DOCUMENT PREVIEW (PRINT TARGET) */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-white overflow-y-auto flex justify-center">
            
            <div className="w-full max-w-2xl bg-white border-2 border-slate-900 p-8 rounded-xl shadow-lg font-sans text-slate-950 space-y-6 print:border-black print:p-0 print:shadow-none print:max-w-none">
              
              {/* Document Header */}
              <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-950">
                    {document.shortName}
                  </h1>
                  <p className="text-xs font-semibold text-slate-600 mt-0.5">
                    OFFICIAL CUSTOMS & EXPORT DECLARATION / MİKRO İHRACAT BEYANI
                  </p>
                </div>
                <div className="text-right text-xs font-mono space-y-0.5">
                  <div><strong>DOC REF:</strong> {invoiceNo}</div>
                  <div><strong>DATE:</strong> {invoiceDate}</div>
                  <div><strong>AWB / TRK:</strong> {awbNumber}</div>
                </div>
              </div>

              {/* Parties Box */}
              <div className="grid grid-cols-2 gap-4 border border-slate-900 p-3 rounded-lg text-xs leading-relaxed">
                <div>
                  <span className="font-bold text-[10px] text-slate-500 uppercase block border-b border-slate-300 pb-0.5 mb-1">
                    EXPORTER / SHIPPER (İHRACATÇI)
                  </span>
                  <div className="font-extrabold text-slate-900">{shipperName}</div>
                  <div className="text-slate-700">{shipperAddress}</div>
                  <div className="font-mono text-slate-600 mt-1">{shipperTaxId}</div>
                  <div className="text-slate-600">Tel: {shipperPhone}</div>
                </div>

                <div>
                  <span className="font-bold text-[10px] text-slate-500 uppercase block border-b border-slate-300 pb-0.5 mb-1">
                    CONSIGNEE / BUYER (ALICI)
                  </span>
                  <div className="font-extrabold text-slate-900">{consigneeName}</div>
                  <div className="text-slate-700">{consigneeAddress}</div>
                  <div className="font-mono text-slate-600 mt-1">Country: {report.targetCountry}</div>
                  <div className="text-slate-600">Tel: {consigneePhone}</div>
                </div>
              </div>

              {/* Items Table */}
              <div className="border border-slate-900 rounded-lg overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-900 font-bold text-[11px]">
                      <th className="p-2 border-r border-slate-900">ITEM / DESCRIPTION</th>
                      <th className="p-2 border-r border-slate-900 text-center">HS / GTİP</th>
                      <th className="p-2 border-r border-slate-900 text-center">QTY</th>
                      <th className="p-2 border-r border-slate-900 text-right">UNIT PRICE</th>
                      <th className="p-2 text-right">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-300">
                      <td className="p-2 border-r border-slate-900 font-semibold">
                        <div>{productTitle}</div>
                        <div className="text-[10px] text-slate-500">{report.category}</div>
                      </td>
                      <td className="p-2 border-r border-slate-900 font-mono text-center font-bold">
                        {hsCodeVal}
                      </td>
                      <td className="p-2 border-r border-slate-900 font-mono text-center">
                        {quantity} PCS
                      </td>
                      <td className="p-2 border-r border-slate-900 font-mono text-right">
                        {unitPrice} {report.currency}
                      </td>
                      <td className="p-2 font-mono text-right font-black">
                        {totalAmount} {report.currency}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-50 font-black">
                      <td colSpan={4} className="p-2 text-right border-r border-slate-900">
                        TOTAL DECLARED VALUE (KDV %0):
                      </td>
                      <td className="p-2 text-right font-mono text-sm">
                        {totalAmount} {report.currency}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Document Specific Declaration Clause */}
              <div className="bg-slate-50 border border-slate-900 p-3 rounded-lg text-xs space-y-2">
                <div className="font-extrabold uppercase text-[11px] text-slate-900 border-b border-slate-200 pb-1">
                  OFFICIAL COMPLIANCE CLAUSE & TECHNICAL DECLARATION:
                </div>
                <div className="font-mono text-slate-800 text-[11px] space-y-1">
                  <div>• <strong>REGULATION CODE:</strong> {customField1}</div>
                  <div>• <strong>SPECIFICATION / TEST:</strong> {customField2}</div>
                </div>
                <p className="text-[10px] text-slate-600 leading-tight pt-1">
                  We certify that the particulars given in this document are true and correct, and that the goods are of Turkish Origin (Made in Türkiye) dispatched under Micro Export (ETGB) customs regime.
                </p>
              </div>

              {/* Signature and Stamp Block */}
              <div className="pt-4 flex justify-between items-end border-t border-slate-300 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">CARRIER / NOTIFICATION:</div>
                  <div className="font-semibold">{report.carrierNotes.recommendedCarriers[0] || 'DHL Express'}</div>
                  <div className="text-[10px] text-slate-500">Electronic ETGB Manifest Ready</div>
                </div>

                <div className="text-center w-48 border-t border-dashed border-slate-900 pt-1">
                  <div className="font-bold text-slate-900">{shipperName}</div>
                  <div className="text-[10px] text-slate-500">Authorized Signature & Seal (İmza / Kaşe)</div>
                  <div className="h-10 flex items-center justify-center text-slate-300">
                    <Stamp className="w-8 h-8 text-slate-400 opacity-60" />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
