import type { ComplianceReport, DangerousGoodsRule, RequiredDocument, RiskLevel, TaxAndCustomsRule } from '../types';
import { COUNTRIES, MASTER_DOCUMENTS } from '../data/regulations';

export interface AnalysisInput {
  productName: string;
  description?: string;
  category?: string;
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
  targetCountry: string;
  salePrice: number;
  currency: string;
  marketplace: string;
}

export function detectCategoryAndHsCode(name: string, attrs: AnalysisInput['attributes']): {
  category: string;
  hsCode: string;
  hsDescription: string;
} {
  const lower = name.toLowerCase();

  // Bıçak & Kesici Alet
  if (lower.includes('bıçak') || lower.includes('çakı') || lower.includes('knife') || lower.includes('kılıç')) {
    return {
      category: 'El Sanatları & Kesici Aletler',
      hsCode: '8211.92.00.00',
      hsDescription: 'Sabit veya Katlanır Bıçaklar (Av, Kamp, Mutfak Bıçakları)'
    };
  }

  // Parfüm & Kolonya (Alkol Bazlı)
  if (attrs.hasAlcohol || lower.includes('parfüm') || lower.includes('kolonya') || lower.includes('esans')) {
    return {
      category: 'Kozmetik & Parfüm',
      hsCode: '3303.00.10.00',
      hsDescription: 'Parfümler ve Tuvalet Suları (Alkol içeren kokular)'
    };
  }

  // Cilt Bakımı, Serum, Krem, Sabun
  if (lower.includes('serum') || lower.includes('krem') || lower.includes('sabun') || lower.includes('şampuan') || lower.includes('losyon') || lower.includes('kozmetik')) {
    if (lower.includes('sabun')) {
      return {
        category: 'Kozmetik & Sabun',
        hsCode: '3401.11.00.00',
        hsDescription: 'Tuvalet Müstahzarları İçin Kalıp Sabunlar ve Organik Yüzey Aktif Maddeler'
      };
    }
    return {
      category: 'Kozmetik & Cilt Bakımı',
      hsCode: '3304.99.00.00',
      hsDescription: 'Cilt Bakım Müstahzarları (Güzellik serumları, yüz kremleri)'
    };
  }

  // Gıda & Sıvı Yağlar / Baharat / Kahve
  if (attrs.isFoodOrConsumable || lower.includes('kahve') || lower.includes('zeytinyağ') || lower.includes('lokum') || lower.includes('baharat') || lower.includes('çay')) {
    if (lower.includes('zeytinyağ')) {
      return {
        category: 'Gıda & Sıvı Yağlar',
        hsCode: '1509.20.00.00',
        hsDescription: 'Sızma Zeytinyağı (İşlenmiş bitkisel yağlar)'
      };
    }
    if (lower.includes('kahve')) {
      return {
        category: 'Gıda & Sıcak İçecekler',
        hsCode: '0901.21.00.00',
        hsDescription: 'Kavrulmuş Kahve (Kafeini alınmamış)'
      };
    }
    if (lower.includes('lokum') || lower.includes('tatlı')) {
      return {
        category: 'Gıda & Şekerlemeler',
        hsCode: '1704.90.71.00',
        hsDescription: 'Türk Lokumu ve Benzeri Şekerli Mamuller'
      };
    }
    return {
      category: 'Gıda & Baharatlar',
      hsCode: '0910.99.91.00',
      hsDescription: 'Kurutulmuş Bitkiler, Kekik ve Karışık Baharatlar'
    };
  }

  // Takı & Değerli Maden / Bijuteri
  if (attrs.isPreciousMetal || lower.includes('gümüş') || lower.includes('altın') || lower.includes('kolye') || lower.includes('küpe') || lower.includes('takı') || lower.includes('yüzük')) {
    if (lower.includes('gümüş') || attrs.isPreciousMetal) {
      return {
        category: 'Takı & Kıymetli Madenler',
        hsCode: '7113.11.00.00',
        hsDescription: 'Gümüş Mücevherci Eşyası (925 Ayar veya Altın Kaplama)'
      };
    }
    return {
      category: 'Takı & İmitasyon Bijuteri',
      hsCode: '7117.19.00.00',
      hsDescription: 'Adi Metallerden İmitasyon Takı ve Mücevherat Eşyası'
    };
  }

  // Elektronik & Pilli Eşyalar
  if (attrs.hasBattery || lower.includes('lamba') || lower.includes('kulaklık') || lower.includes('şarj') || lower.includes('elektronik') || lower.includes('saat')) {
    if (lower.includes('kulaklık')) {
      return {
        category: 'Elektronik & Ses Ekipmanı',
        hsCode: '8518.30.00.00',
        hsDescription: 'Kablosuz Kulaklıklar ve Mikrofonlu Kulaklık Setleri'
      };
    }
    return {
      category: 'Aydınlatma & Elektronik Eşya',
      hsCode: '9405.20.40.00',
      hsDescription: 'Masa, Yatak veya Ayak Lambaları (Dahili Bataryalı/Elektrikli)'
    };
  }

  // Deri Ürünler
  if (lower.includes('deri') || lower.includes('leather') || lower.includes('cüzdan') || lower.includes('kemer')) {
    return {
      category: 'Deri & Konfeksiyon',
      hsCode: '4203.10.00.00',
      hsDescription: 'Tabii Deriden Giyecek Eşyası (Ceket, Mont) ve Deri Aksesuar'
    };
  }

  // Tekstil & Hazır Giyim
  if (attrs.isTextile || lower.includes('kazak') || lower.includes('şal') || lower.includes('hırka') || lower.includes('giyim') || lower.includes('elbise')) {
    return {
      category: 'Tekstil & Hazır Giyim',
      hsCode: '6110.11.10.00',
      hsDescription: 'Yün veya İnce Hayvan Kılından Örme Kazak, Süveter, Hırka'
    };
  }

  // Seramik & Cam
  if (lower.includes('seramik') || lower.includes('çini') || lower.includes('porselen') || lower.includes('fincan') || lower.includes('tabak')) {
    return {
      category: 'Seramik & Sofra Eşyası',
      hsCode: '6912.00.25.00',
      hsDescription: 'Seramik ve Kilden Sofra ve Mutfak Eşyası (El Sanatı)'
    };
  }

  // Oyuncak & Çocuk
  if (lower.includes('oyuncak') || lower.includes('bebek') || lower.includes('toy') || lower.includes('montessori')) {
    return {
      category: 'Bebek & Eğitici Oyuncaklar',
      hsCode: '9503.00.70.00',
      hsDescription: 'Ahşaptan Diğer Oyuncaklar (Montessori ve Aktivite Setleri)'
    };
  }

  // Ahşap Eşya
  if (attrs.isWoodOrPlant || lower.includes('ahşap') || lower.includes('ağaç') || lower.includes('epoksi')) {
    return {
      category: 'Ahşap & Mutfak Eşyası',
      hsCode: '4419.90.00.00',
      hsDescription: 'Ahşaptan Sofra ve Mutfak Eşyası (Kesme ve Sunum Tahtaları)'
    };
  }

  return {
    category: 'Genel Eşya & El Sanatları',
    hsCode: '9602.00.00.00',
    hsDescription: 'İşlenmiş Maddelerden Mamul Sanat ve Dekorasyon Eşyası'
  };
}

export function analyzeCompliance(input: AnalysisInput): ComplianceReport {
  const country = COUNTRIES[input.targetCountry] || COUNTRIES.DE;
  const { category, hsCode, hsDescription } = detectCategoryAndHsCode(input.productName, input.attributes);
  const lower = input.productName.toLowerCase();

  // 1. Dangerous Goods (IATA) Rule Check
  let dgRule: DangerousGoodsRule = {
    isDangerous: false,
    airCourierStatus: 'ALLOWED',
    carrierWarning: 'Ürün kargo uçağı açısından standart taşımaya uygundur.',
    packagingInstructions: [
      'Sağlam çift katmanlı oluklu mukavva kutu kullanınız.',
      'Kutu içi boşlukları hava yastığı veya kraft kağıtla doldurunuz.'
    ]
  };

  if (input.attributes.hasAlcohol && (input.attributes.alcoholPercentage ?? 0) >= 24) {
    dgRule = {
      isDangerous: true,
      iataClass: 'Class 3 (Alevlenir Sıvı - Flammable Liquid)',
      unCode: 'UN 1266 (Perfumery Products)',
      properShippingName: 'PERFUMERY PRODUCTS with flammable solvents',
      airCourierStatus: 'SPECIAL_APPROVAL',
      carrierWarning: 'Kritik DG Riski: Parfüm alkol içerdiğinden IATA tehlikeli madde sınıfına girer. Standart ekonomi uçuşlarına verilemez. Mutlaka "DG Yetkili Ekspres Kurye" (DHL Express / FedEx DG) seçilmeli ve bildirim yapılmalıdır.',
      packagingInstructions: [
        'Şişe kapağı yivli ve contalı olmalı, sızdırmaz emniyet bandı çekilmelidir.',
        'Her şişe sızdırmaz polietilen kilitli poşete konulmalıdır.',
        'Koli içinde oluşabilecek tüm sıvıyı emecek kapasitede emici ped (absorbent pad) bulunmalıdır.',
        'Dış koli üzerine kırmızı alevli "Class 3 Flammable Liquid" tehlikeli madde etiketi ve yön okları yapıştırılmalıdır.'
      ]
    };
  } else if (input.attributes.hasBattery) {
    dgRule = {
      isDangerous: true,
      iataClass: 'Class 9 (Muhtelif Tehlikeli Madde - Lityum Pil)',
      unCode: 'UN 3481 (Lithium Ion Batteries contained in equipment)',
      properShippingName: 'LITHIUM ION BATTERIES CONTAINED IN EQUIPMENT',
      airCourierStatus: 'SPECIAL_APPROVAL',
      carrierWarning: 'Dahili lityum pil içerdiğinden kargo uçağında Section II / PI967 kurallarına tabidir. Cihazın koli içinde kendiliğinden açılması önlenmelidir.',
      packagingInstructions: [
        'Açma/kapama tuşunun koli içinde kazara basılmasını önleyecek koruma sağlanmalıdır.',
        'Koli dışına "UN3481 Lithium Battery Mark" etiketi ve acil durum irtibat numarası yazılmalıdır.',
        'Tek pakette ekipman içine yerleşik pil sayısı kurye limitlerini (genelde maks 2 cihaz) aşmamalıdır.'
      ]
    };
  } else if (lower.includes('bıçak') || lower.includes('çakı')) {
    dgRule = {
      isDangerous: true,
      iataClass: 'Kesici / Delici Alet (Sharps & Security Controlled)',
      unCode: 'GÜVENLİK KONTROLLÜ EŞYA',
      properShippingName: 'HANDMADE CUTLERY / KITCHEN CRAFT KNIFE',
      airCourierStatus: 'SPECIAL_APPROVAL',
      carrierWarning: 'Kesici aletler uluslararası hava kargoda güvenlik taramasına (X-ray) girer. Kılıflı olmalı, ucu köreltici koruma ile sarılmalı ve ticari el sanatı bıçağı olduğu bildirilmelidir.',
      packagingInstructions: [
        'Bıçak namlusu mutlaka deri kılıfı veya sert plastik koruma içine alınmalıdır.',
        'Namlu ucu delinmeye dirençli katmanla sarılmalıdır.',
        'Koli üzerine "Handle With Care / Cutlery" uyarısı eklenmelidir.'
      ]
    };
  } else if (input.attributes.isLiquid) {
    dgRule.packagingInstructions.unshift('Sıvı ürün: Koli içine kırılma riskine karşı çift kat balonlu naylon sarılmalı, "Kırılabilir / Fragile" ve dik taşıma okları yapıştırılmalıdır.');
  }

  // 2. Tax & Customs Analysis
  const isOverDeMinimis = input.salePrice > country.deMinimisAmount;
  let estimatedDuty = 0;
  let buyerTaxAtDoor = false;
  let taxExplanation = '';

  if (country.code === 'DE') {
    if (isOverDeMinimis) {
      estimatedDuty = 6.5;
      buyerTaxAtDoor = true;
      taxExplanation = `Sipariş tutarı 150€ sınırını aşıyor (${input.salePrice} €). IOSS uygulanamaz! Almanya gümrüğünde takribi %${estimatedDuty} gümrük vergisi + %19 KDV tahakkuk eder. Alıcı kapıda kurye masrafıyla birlikte bu bedeli ödemek zorunda kalır.`;
    } else {
      estimatedDuty = 0;
      buyerTaxAtDoor = false;
      taxExplanation = `Sipariş 150€ altında (${input.salePrice} €). ${input.marketplace === 'Etsy' || input.marketplace === 'Amazon' ? 'Satış anında pazar yeri tarafından IOSS ile %19 KDV tahsil edilmiştir.' : 'IOSS numarası kullanılarak KDV beyan edilebilir.'} Alıcı kapıda ek bir gümrük vergisi ÖDEMEZ.`;
    }
  } else if (country.code === 'US') {
    if (isOverDeMinimis) {
      estimatedDuty = 5.0;
      buyerTaxAtDoor = true;
      taxExplanation = `Sipariş tutarı 800$ De Minimis sınırını aşıyor (${input.salePrice} $). ABD Gümrüğü (CBP) resmi gümrük girişi (Formal Entry) talep eder ve gümrük vergisi tahsil edilir.`;
    } else {
      estimatedDuty = 0;
      buyerTaxAtDoor = false;
      taxExplanation = `Section 321 De Minimis kapsamında 800$ altına kadar (${input.salePrice} $) ABD\'ye gümrük vergisiz ve KDV\'siz giriş yapılır. Alıcı kapıda hiçbir vergi ödemez.`;
    }
  } else if (country.code === 'GB') {
    if (isOverDeMinimis) {
      estimatedDuty = 4.0;
      buyerTaxAtDoor = true;
      taxExplanation = `Sipariş 135£ eşiğini aşıyor (${input.salePrice} £). Gümrük vergisi ve %20 ithalat KDV alıcıya veya göndericiye fatura edilir.`;
    } else {
      estimatedDuty = 0;
      buyerTaxAtDoor = false;
      taxExplanation = `Sipariş 135£ altında (${input.salePrice} £). Satış esnasında %20 İngiltere KDV tahsil edildiği için paket gümrükten doğrudan geçer, alıcı kapıda vergi ödemez.`;
    }
  } else {
    estimatedDuty = 5.0;
    buyerTaxAtDoor = isOverDeMinimis;
    taxExplanation = `${country.name} için De Minimis eşiği ${country.deMinimisAmount} ${country.currency} düzeyindedir. Bu tutarın üzerinde yerel gümrük tarifesi uygulanır.`;
  }

  const taxAnalysis: TaxAndCustomsRule = {
    countryCode: country.code,
    countryName: country.name,
    currency: country.currency,
    deMinimisThreshold: country.deMinimisAmount,
    deMinimisDescription: `${country.deMinimisAmount} ${country.symbol} altı gümrük vergisinden muaftır.`,
    vatThreshold: country.vatThreshold,
    vatRatePercent: country.vatRate,
    vatSchemeName: country.scheme,
    packagingLawName: country.packagingLaw,
    buyerTaxAtDoor,
    estimatedCustomsDutyPercent: estimatedDuty,
    explanation: taxExplanation
  };

  // 3. Mandatory Documents Checklist Generation
  const docs: RequiredDocument[] = [];
  docs.push(MASTER_DOCUMENTS.ETGB_INVOICE);

  if (country.code === 'DE') {
    docs.push(MASTER_DOCUMENTS.LUCID_REGISTRATION);
  }

  // Kozmetik
  if (category.includes('Kozmetik') || input.attributes.hasAlcohol) {
    docs.push(MASTER_DOCUMENTS.INCI_LABEL);
    if (input.attributes.hasAlcohol || input.attributes.isLiquid) {
      docs.push(MASTER_DOCUMENTS.MSDS);
    }
    if (country.code === 'DE') {
      docs.push(MASTER_DOCUMENTS.CPNP_DECLARATION);
    }
  }

  // Gıda
  if (category.includes('Gıda') || input.attributes.isFoodOrConsumable) {
    if (country.code === 'US') {
      docs.push(MASTER_DOCUMENTS.FDA_PRIOR_NOTICE);
    }
    if (input.attributes.isWoodOrPlant || lower.includes('çay') || lower.includes('kekik') || lower.includes('tohum')) {
      docs.push(MASTER_DOCUMENTS.PHYTO_CERTIFICATE);
    }
  }

  // Takı
  if (category.includes('Takı') || input.attributes.isPreciousMetal) {
    docs.push(MASTER_DOCUMENTS.HALLMARK_CERT);
  }

  // Batarya
  if (input.attributes.hasBattery) {
    docs.push(MASTER_DOCUMENTS.BATTERY_UN383);
  }

  // Deri
  if (category.includes('Deri') || lower.includes('deri')) {
    docs.push(MASTER_DOCUMENTS.LEATHER_CITES);
  }

  // Tekstil
  if (category.includes('Tekstil') || input.attributes.isTextile) {
    docs.push(MASTER_DOCUMENTS.TEXTILE_COMPOSITION);
  }

  // Bıçak & Kesici Alet
  if (lower.includes('bıçak') || lower.includes('çakı')) {
    docs.push(MASTER_DOCUMENTS.KNIFE_DECLARATION);
  }

  // 4. Calculate Risk Score
  let score = 15;
  if (dgRule.isDangerous) score += 35;
  if (input.attributes.isLiquid) score += 10;
  if (input.attributes.isFoodOrConsumable) score += 20;
  if (category.includes('Kozmetik')) score += 15;
  if (lower.includes('bıçak') || lower.includes('çakı')) score += 30;
  if (isOverDeMinimis) score += 15;
  if (country.code === 'DE') score += 5;

  score = Math.min(Math.max(score, 10), 95);

  let riskLevel: RiskLevel = 'LOW';
  let riskSummary = 'Bu gönderi düşük risklidir. Standart mikro ihracat prosedürleriyle sorunsuz sevk edilebilir.';

  if (score >= 60) {
    riskLevel = 'HIGH';
    riskSummary = 'Yüksek Risk / Kritik Prosedürler: Bu ürün tehlikeli madde (DG), kesici alet, özel içerik denetimi veya yüksek vergi riski içermektedir. Belgeler eksik olursa kargo firması ürünü kabul etmez veya varış gümrüğünde imha edilebilir.';
  } else if (score >= 35) {
    riskLevel = 'MEDIUM';
    riskSummary = 'Orta Risk: Ürünün sevk edilmesi mümkündür ancak özel ambalajlama, etiketleme ve vergi eşik kurallarına harfiyen uyulması gerekmektedir.';
  }

  const recommendedCarriers = dgRule.isDangerous
    ? ['DHL Express (Tehlikeli Madde Lisanslı Şube)', 'FedEx International Priority DG']
    : ['Navlungo Mikro İhracat', 'ShipEntegra', 'DHL Express', 'FedEx', 'UPS', 'PTS'];

  return {
    id: 'REP-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    timestamp: new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }),
    productName: input.productName,
    category,
    hsCode,
    hsDescription,
    targetCountry: country.name,
    salePrice: input.salePrice,
    currency: country.symbol,
    marketplace: input.marketplace,
    riskScore: score,
    riskLevel,
    riskSummary,
    dangerousGoods: dgRule,
    taxAnalysis,
    requiredDocuments: docs,
    packagingRequirements: dgRule.packagingInstructions,
    carrierNotes: {
      recommendedCarriers,
      microExportETGB: 'Mikro İhracat (ETGB) kapsamında gümrük müşaviri ücreti ödemeden, kargo firmasının bedelsiz elektronik beyanı ile KDV iadeli gönderim yapılabilir (Maksimum limit: 15.000 € ve 300 kg).',
      specialHandling: dgRule.isDangerous
        ? 'DİKKAT: Kuryeye teslim ederken ürünün niteliğini (parfüm/alkol/pil/kesici alet) ve ekteki doldurulmuş beyan formlarını koli cebine koyduğunuzu belirtiniz.'
        : 'Standart ihracat koli bandı ve fatura cebi (Waybill pouch) ile teslim ediniz.'
    }
  };
}
