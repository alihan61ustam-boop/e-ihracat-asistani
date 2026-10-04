export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface ProductPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  attributes: {
    isLiquid: boolean;
    hasAlcohol: boolean;
    alcoholPercentage?: number;
    hasBattery: boolean;
    batteryType?: string;
    isFragile: boolean;
    isFoodOrConsumable: boolean;
    isPreciousMetal: boolean;
    isWoodOrPlant: boolean;
    isTextile: boolean;
  };
  suggestedCountry: string;
  defaultPrice: number;
  currency: string;
}

export interface RequiredDocument {
  id: string;
  name: string;
  shortName: string;
  issuer: string; // 'Üretici / Tedarikçi' | 'İhracatçı Firma' | 'Yetkili Laboratuvar' | 'Gümrük Müşaviri / Kurye'
  description: string;
  importance: 'CRITICAL' | 'REQUIRED' | 'RECOMMENDED';
  templateAvailable: boolean;
  tips: string;
}

export interface DangerousGoodsRule {
  isDangerous: boolean;
  iataClass?: string;
  unCode?: string;
  properShippingName?: string;
  airCourierStatus: 'BLOCKED' | 'SPECIAL_APPROVAL' | 'ALLOWED';
  carrierWarning: string;
  packagingInstructions: string[];
}

export interface TaxAndCustomsRule {
  countryCode: string;
  countryName: string;
  currency: string;
  deMinimisThreshold: number;
  deMinimisDescription: string;
  vatThreshold: number;
  vatRatePercent: number;
  vatSchemeName: string; // 'IOSS', 'Section 321', 'HMRC VAT'
  packagingLawName?: string; // 'VerpackG (LUCID)', 'EPR'
  buyerTaxAtDoor: boolean;
  estimatedCustomsDutyPercent: number;
  explanation: string;
}

export interface ComplianceReport {
  id: string;
  timestamp: string;
  productName: string;
  category: string;
  hsCode: string;
  hsDescription: string;
  targetCountry: string;
  salePrice: number;
  currency: string;
  marketplace: string;
  
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  riskSummary: string;
  
  dangerousGoods: DangerousGoodsRule;
  taxAnalysis: TaxAndCustomsRule;
  requiredDocuments: RequiredDocument[];
  packagingRequirements: string[];
  carrierNotes: {
    recommendedCarriers: string[];
    microExportETGB: string;
    specialHandling: string;
  };
}
