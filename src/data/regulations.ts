import type { ProductPreset, RequiredDocument } from '../types';

export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  exchangeRateToTRY: number;
  deMinimisAmount: number;
  vatThreshold: number;
  vatRate: number;
  scheme: string;
  packagingLaw: string;
  notes: string;
}

export const COUNTRIES: Record<string, CountryInfo> = {
  DE: {
    code: 'DE',
    name: 'Almanya (Avrupa Birliği)',
    flag: '🇩🇪',
    currency: 'EUR',
    symbol: '€',
    exchangeRateToTRY: 38.5,
    deMinimisAmount: 150,
    vatThreshold: 0,
    vatRate: 19,
    scheme: 'IOSS (Import One-Stop Shop)',
    packagingLaw: 'VerpackG (LUCID Ambalaj Sicil Kaydı)',
    notes: '150€ altı gönderilerde IOSS ile KDV sepette tahsil edilir, alıcı kapıda sürpriz vergi ödemez. 150€ üstünde ise gümrük vergisi ve ithalat KDV alıcıya veya satıcıya tahakkuk ettirilir. Ambalaj için LUCID kaydı zorunludur.'
  },
  US: {
    code: 'US',
    name: 'Amerika Birleşik Devletleri',
    flag: '🇺🇸',
    currency: 'USD',
    symbol: '$',
    exchangeRateToTRY: 35.0,
    deMinimisAmount: 800,
    vatThreshold: 800,
    vatRate: 0,
    scheme: 'Section 321 (De Minimis Muafiyeti)',
    packagingLaw: 'Eyalet Bazlı EPR (Kaliforniya vb.)',
    notes: '800$ altına kadar Section 321 kapsamında tamamen gümrüksüz ve vergisiz giriş yapılır. Ancak gıda, kozmetik ve takılarda FDA ve CPSC güvenlik standartları harfiyen aranır.'
  },
  GB: {
    code: 'GB',
    name: 'Birleşik Krallık (İngiltere)',
    flag: '🇬🇧',
    currency: 'GBP',
    symbol: '£',
    exchangeRateToTRY: 45.0,
    deMinimisAmount: 135,
    vatThreshold: 0,
    vatRate: 20,
    scheme: 'HMRC VAT Rejimi',
    packagingLaw: 'UK EPR Packaging Waste',
    notes: '135£ altındaki siparişlerde KDV pazar yeri (Etsy/Amazon/Shopify) tarafından satış anında kesilir. 135£ üzeri siparişlerde gümrük vergisi ve %20 KDV kapıda veya gümrükte tahsil edilir.'
  },
  CA: {
    code: 'CA',
    name: 'Kanada',
    flag: '🇨🇦',
    currency: 'CAD',
    symbol: 'C$',
    exchangeRateToTRY: 25.5,
    deMinimisAmount: 20,
    vatThreshold: 20,
    vatRate: 13,
    scheme: 'CBSA De Minimis',
    packagingLaw: 'Federal Ambalaj Kuralları',
    notes: 'Kanada muafiyet sınırı çok düşüktür (20-40 CAD). 20 CAD üzerindeki neredeyse tüm ürünlere kapıda ithalat vergisi ve eyalet vergisi (GST/HST) çıkar. Alıcıyı önceden uyarmak şarttır.'
  },
  AE: {
    code: 'AE',
    name: 'Birleşik Arap Emirlikleri',
    flag: '🇦🇪',
    currency: 'AED',
    symbol: 'AED',
    exchangeRateToTRY: 9.5,
    deMinimisAmount: 300,
    vatThreshold: 300,
    vatRate: 5,
    scheme: 'GCC Customs & UAE VAT',
    packagingLaw: 'MoIAT Standartları',
    notes: '300 AED altı gönderiler gümrük vergisinden muaftır. Üzerinde %5 gümrük vergisi + %5 KDV tahsil edilir. Kozmetik ve parfümlerde ESMA / ECAS uygunluk belgeleri talep edilebilir.'
  }
};

export const MASTER_DOCUMENTS: Record<string, RequiredDocument> = {
  ETGB_INVOICE: {
    id: 'ETGB_INVOICE',
    name: 'Mikro İhracat E-Arşiv Faturası ve İngilizce Commercial Invoice',
    shortName: 'Commercial Invoice (ETGB)',
    issuer: 'İhracatçı Firma / Muhasebe',
    description: 'Kargo firmasının adınıza elektronik gümrük beyanı (ETGB) açabilmesi için KDV\'siz düzenlenen resmi fatura ve İngilizce Commercial Invoice.',
    importance: 'CRITICAL',
    templateAvailable: true,
    tips: 'Faturada mutlaka "Mikro İhracat / ETGB kapsamında gönderilmiştir" ibaresi ve GTİP kodu yer almalıdır. KDV %0 olarak düzenlenir.'
  },
  MSDS: {
    id: 'MSDS',
    name: 'Malzeme Güvenlik Bilgi Formu (MSDS / SDS - 16 Bölüm)',
    shortName: 'MSDS Güvenlik Raporu',
    issuer: 'Kimya Laboratuvarı veya Hammadde Tedarikçisi',
    description: '16 maddelik standart güvenlik raporu. Ürünün parlama noktasını (Flash Point), yanıcılık derecesini ve IATA DG sınıfını kanıtlar.',
    importance: 'CRITICAL',
    templateAvailable: true,
    tips: 'Kargo uçaklarına ürün kabulü için DHL/FedEx bu belgeyi zorunlu tutar. Parfüm, kolonya veya kimyasal içeren tüm ürünlerde şarttır.'
  },
  INCI_LABEL: {
    id: 'INCI_LABEL',
    name: 'İngilizce İçerik ve INCI Kozmetik Güvenlik Beyanı',
    shortName: 'INCI Kozmetik Beyanı',
    issuer: 'İhracatçı / Üretici',
    description: 'Kozmetik ve koku ürünlerinin uluslararası INCI standardında tam bileşen listesi, alerjen dökümü ve güvenlik beyan mektubu.',
    importance: 'CRITICAL',
    templateAvailable: true,
    tips: 'Türkçe etiket tek başına kabul edilmez. Alerjenler (Linalool, Limonene) ve alkol yüzdesi açıkça belirtilmelidir.'
  },
  FDA_PRIOR_NOTICE: {
    id: 'FDA_PRIOR_NOTICE',
    name: 'ABD FDA Gıda Ön Bildirim Formu (Prior Notice Confirmation)',
    shortName: 'FDA Ön Bildirim Belgesi',
    issuer: 'İhracatçı / ABD FDA Portalı',
    description: 'Gıda, baharat, kahve, çay ve takviyelerin ABD gümrüğüne ulaşmadan önce FDA sistemine tescil edildiğini kanıtlayan resmi onay formu.',
    importance: 'CRITICAL',
    templateAvailable: true,
    tips: 'FDA onay kodu (PN Confirmation No) koli konşimentosuna yazılmazsa paket ABD gümrüğünde derhal imha edilir veya geri çevrilir.'
  },
  LUCID_REGISTRATION: {
    id: 'LUCID_REGISTRATION',
    name: 'Almanya LUCID Ambalaj Kayıt ve Lisans Beyanı (VerpackG)',
    shortName: 'LUCID VerpackG Beyanı',
    issuer: 'Almanya ZSVR / İhracatçı',
    description: 'Almanya\'ya ürün gönderen satıcıların karton, bant ve plastik ambalaj geri dönüşüm sistemine lisanslı olduğunu gösteren beyanname.',
    importance: 'CRITICAL',
    templateAvailable: true,
    tips: 'LUCID kayıt numarası pazar yeri panelinde ve koli belgelerinde yer almalıdır. 200.000€ para cezası riskini engeller.'
  },
  HALLMARK_CERT: {
    id: 'HALLMARK_CERT',
    name: 'Kıymetli Maden Ayar Damgası ve Menşe Beyannamesi',
    shortName: 'Gümüş / Altın Ayar Belgesi',
    issuer: 'Darphane / Üretici Ayar Beyanı',
    description: '925 ayar gümüş veya altın takıların saflık derecesini, gram ağırlığını ve maden menşeini belgeleyen resmi deklarasyon.',
    importance: 'REQUIRED',
    templateAvailable: true,
    tips: 'İngiltere\'de 7.78 gram üzeri gümüş takılarda resmi ayar evi (Hallmark) damgası olmadan satış yasal değildir.'
  },
  BATTERY_UN383: {
    id: 'BATTERY_UN383',
    name: 'Lityum Pil Taşıma ve Güvenlik Beyanı (UN 38.3 & PI 967)',
    shortName: 'UN 3481 Batarya Beyannamesi',
    issuer: 'Pil Üreticisi / İhracatçı',
    description: 'Lityum iyon pilli cihazların IATA DGR Bölüm II / PI 967 paketleme talimatına uygun olduğunu teyit eden taşıma deklarasyonu.',
    importance: 'CRITICAL',
    templateAvailable: true,
    tips: 'Kargo uçuşu için bataryanın ekipman içinde monteli olduğu ve Watt-saat değerinin 100Wh altında olduğu beyan edilir.'
  },
  CPNP_DECLARATION: {
    id: 'CPNP_DECLARATION',
    name: 'AB Kozmetik Bildirimi & Sorumlu Kişi (CPNP) Beyanı',
    shortName: 'CPNP Uygunluk Beyanı',
    issuer: 'AB Yetkili Temsilcisi (Responsible Person)',
    description: 'Avrupa Birliği Kozmetik Regülasyonu (EC No 1223/2009) kapsamında ürünün güvenli olduğunu beyan eden belge.',
    importance: 'REQUIRED',
    templateAvailable: true,
    tips: 'AB gümrüklerinde şüpheli içerik kontrollerinde ibraz edilir.'
  },
  PHYTO_CERTIFICATE: {
    id: 'PHYTO_CERTIFICATE',
    name: 'Bitki Sağlık ve Zirai Karantina Uygunluk Beyanı',
    shortName: 'Bitki Sağlık Beyannamesi',
    issuer: 'T.C. Tarım ve Orman Bakanlığı / Üretici',
    description: 'İşlenmiş tarımsal veya bitkisel ürünlerin zararlı böcek ve yabani tohum barındırmadığını teyit eden form.',
    importance: 'REQUIRED',
    templateAvailable: true,
    tips: 'Kavrulmuş kahve ve zeytinyağında genelde aranmaz; kurutulmuş bitki ve çaylarda gereklidir.'
  },
  LEATHER_CITES: {
    id: 'LEATHER_CITES',
    name: 'Deri Ürün CITES Vahşi Hayvan Olmadığı Beyannamesi',
    shortName: 'CITES Deri Beyannamesi',
    issuer: 'İhracatçı / Deri Üreticisi',
    description: 'Deri ceket, çanta veya cüzdanın koruma altındaki nesli tükenmekte olan vahşi hayvanlardan değil, çiftlik hayvanlarından elde edildiğini kanıtlar.',
    importance: 'REQUIRED',
    templateAvailable: true,
    tips: 'Yılan, timsah veya egzotik deri şüphesini ortadan kaldırır. "Domestic Bovine / Ovine Leather" ibaresi yazılır.'
  },
  TEXTILE_COMPOSITION: {
    id: 'TEXTILE_COMPOSITION',
    name: 'Tekstil Elyaf İçerik ve Bakım Beyannamesi',
    shortName: 'Tekstil Elyaf Beyanı',
    issuer: 'Üretici Firma',
    description: 'Giyim eşyasının %100 yün, pamuk veya keten gibi net elyaf oranlarını ve yıkama talimatlarını belgeleyen form.',
    importance: 'REQUIRED',
    templateAvailable: true,
    tips: 'ABD FTC ve AB tekstil etiketleme mevzuatı için zorunludur.'
  },
  KNIFE_DECLARATION: {
    id: 'KNIFE_DECLARATION',
    name: 'El Sanatları Mutfak / Kamp Bıçağı Güvenlik Beyanı',
    shortName: 'Kesici Alet Gümrük Beyanı',
    issuer: 'Zanaatkar / Üretici',
    description: 'El yapımı şef bıçağı veya kamp çakısının ateşli/saldırı silahı olmadığını, koleksiyonluk mutfak ve el sanatı ürünü olduğunu belirten beyan.',
    importance: 'CRITICAL',
    templateAvailable: true,
    tips: 'Hava kargoda kabin/kargo ayrımı için kurye sistemine özel bildirim yapılmalıdır.'
  }
};

export const PRESET_PRODUCTS: ProductPreset[] = [
  // 1. Kozmetik & Parfüm
  {
    id: 'perfume_fragrance',
    name: 'Alkol Bazlı Parfüm & Kolonya (%80 Alkol)',
    category: 'Kozmetik & Parfüm',
    description: '50ml cam şişede, %80 etil alkol içeren el yapımı lüks parfüm (IATA DG Class 3).',
    icon: 'Sparkles',
    attributes: {
      isLiquid: true,
      hasAlcohol: true,
      alcoholPercentage: 80,
      hasBattery: false,
      isFragile: true,
      isFoodOrConsumable: false,
      isPreciousMetal: false,
      isWoodOrPlant: false,
      isTextile: false
    },
    suggestedCountry: 'DE',
    defaultPrice: 48,
    currency: 'EUR'
  },
  {
    id: 'skincare_serum',
    name: 'Doğal Cilt Bakım Serumu & Yüz Kremi',
    category: 'Kozmetik & Cilt Bakımı',
    description: '30ml damlalıklı cam şişede hyaluronik asit ve gül suyu bazlı alkolsüz serum.',
    icon: 'Sparkles',
    attributes: {
      isLiquid: true,
      hasAlcohol: false,
      hasBattery: false,
      isFragile: true,
      isFoodOrConsumable: false,
      isPreciousMetal: false,
      isWoodOrPlant: false,
      isTextile: false
    },
    suggestedCountry: 'DE',
    defaultPrice: 38,
    currency: 'EUR'
  },
  {
    id: 'artisan_soap',
    name: 'Doğal Zeytinyağlı El Yapımı Katı Sabun Seti',
    category: 'Kozmetik & Sabun',
    description: '4 adet 100gr kraft kutulu soğuk sıkım defne ve zeytinyağı sabunu.',
    icon: 'Sparkles',
    attributes: {
      isLiquid: false,
      hasAlcohol: false,
      hasBattery: false,
      isFragile: false,
      isFoodOrConsumable: false,
      isPreciousMetal: false,
      isWoodOrPlant: false,
      isTextile: false
    },
    suggestedCountry: 'US',
    defaultPrice: 28,
    currency: 'USD'
  },

  // 2. Gıda & Tüketim
  {
    id: 'olive_oil_food',
    name: 'Erken Hasat Soğuk Sıkım Sızma Zeytinyağı',
    category: 'Gıda & Sıvı Yağlar',
    description: '500ml koyu cam şişede Ege zeytinyağı (FDA Prior Notice gerektirir).',
    icon: 'Apple',
    attributes: {
      isLiquid: true,
      hasAlcohol: false,
      hasBattery: false,
      isFragile: true,
      isFoodOrConsumable: true,
      isPreciousMetal: false,
      isWoodOrPlant: false,
      isTextile: false
    },
    suggestedCountry: 'US',
    defaultPrice: 36,
    currency: 'USD'
  },
  {
    id: 'turkish_coffee_delight',
    name: 'Taze Çekilmiş Türk Kahvesi & Antep Fıstıklı Lokum',
    category: 'Gıda & Tatlılar',
    description: '250gr teneke kutu kahve ve 350gr vakumlu ambalajda lokum hediye seti.',
    icon: 'Apple',
    attributes: {
      isLiquid: false,
      hasAlcohol: false,
      hasBattery: false,
      isFragile: false,
      isFoodOrConsumable: true,
      isPreciousMetal: false,
      isWoodOrPlant: false,
      isTextile: false
    },
    suggestedCountry: 'US',
    defaultPrice: 32,
    currency: 'USD'
  },
  {
    id: 'herbal_tea_spices',
    name: 'Doğal Dağ Kekiği & Kurutulmuş Bitki Çayı',
    category: 'Gıda & Baharat',
    description: 'Cam kavanozda organik Ege kekiği ve ıhlamur çayı.',
    icon: 'Apple',
    attributes: {
      isLiquid: false,
      hasAlcohol: false,
      hasBattery: false,
      isFragile: true,
      isFoodOrConsumable: true,
      isPreciousMetal: false,
      isWoodOrPlant: true,
      isTextile: false
    },
    suggestedCountry: 'DE',
    defaultPrice: 24,
    currency: 'EUR'
  },

  // 3. Takı & Kıymetli Maden
  {
    id: 'silver_necklace',
    name: '925 Ayar Gümüş Telkari Kolye & Küpe Seti',
    category: 'Takı & Kıymetli Maden',
    description: '14 gram el işçiliği 925 ayar gümüş takı (Hallmark ayar belgesi zorunlu).',
    icon: 'Gem',
    attributes: {
      isLiquid: false,
      hasAlcohol: false,
      hasBattery: false,
      isFragile: false,
      isFoodOrConsumable: false,
      isPreciousMetal: true,
      isWoodOrPlant: false,
      isTextile: false
    },
    suggestedCountry: 'GB',
    defaultPrice: 85,
    currency: 'GBP'
  },
  {
    id: 'fashion_jewelry',
    name: '18K Altın Kaplama Çelik Bijuteri Yüzük',
    category: 'Takı & Bijuteri',
    description: 'Paslanmaz çelik üzerine altın kaplama antialerjik kadın yüzüğü.',
    icon: 'Gem',
    attributes: {
      isLiquid: false,
      hasAlcohol: false,
      hasBattery: false,
      isFragile: false,
      isFoodOrConsumable: false,
      isPreciousMetal: false,
      isWoodOrPlant: false,
      isTextile: false
    },
    suggestedCountry: 'US',
    defaultPrice: 29,
    currency: 'USD'
  },

  // 4. Elektronik & Pilli Cihazlar
  {
    id: 'lithium_lamp',
    name: 'Şarjlı Ahşap Gece Lambası (1200mAh Lityum Pil)',
    category: 'Elektronik & Dekorasyon',
    description: 'Ceviz ağacından oyulmuş, dahili şarjlı lityum pilli LED lamba (UN 3481 PI967).',
    icon: 'Battery',
    attributes: {
      isLiquid: false,
      hasAlcohol: false,
      hasBattery: true,
      batteryType: 'Lityum-İyon (Dahili/Ekipman İçinde)',
      isFragile: true,
      isFoodOrConsumable: false,
      isPreciousMetal: false,
      isWoodOrPlant: true,
      isTextile: false
    },
    suggestedCountry: 'DE',
    defaultPrice: 65,
    currency: 'EUR'
  },
  {
    id: 'wireless_earbuds',
    name: 'Kablosuz Bluetooth Kulaklık & Şarj Kutusu',
    category: 'Elektronik & Ses',
    description: 'Dahili lityum pilli kablosuz kulaklık ve kutu (UN 3481 batarya testi).',
    icon: 'Battery',
    attributes: {
      isLiquid: false,
      hasAlcohol: false,
      hasBattery: true,
      batteryType: 'Lityum-İyon Polimer Batarya',
      isFragile: false,
      isFoodOrConsumable: false,
      isPreciousMetal: false,
      isWoodOrPlant: false,
      isTextile: false
    },
    suggestedCountry: 'US',
    defaultPrice: 55,
    currency: 'USD'
  },

  // 5. Tekstil & Deri
  {
    id: 'wool_sweater',
    name: 'El Örgüsü %100 Doğal Yün Hırka & Kaşkol',
    category: 'Tekstil & Giyim',
    description: 'Anadolu koyun yününden elde örülmüş geleneksel motifli triko hırka.',
    icon: 'Package',
    attributes: {
      isLiquid: false,
      hasAlcohol: false,
      hasBattery: false,
      isFragile: false,
      isFoodOrConsumable: false,
      isPreciousMetal: false,
      isWoodOrPlant: false,
      isTextile: true
    },
    suggestedCountry: 'US',
    defaultPrice: 125,
    currency: 'USD'
  },
  {
    id: 'leather_jacket',
    name: 'Hakiki Kuzu Derisi Ceket & Omuz Çantası',
    category: 'Deri & Konfeksiyon',
    description: 'Hakiki yerli kuzu derisinden dikilmiş lüks kadın ceketi (CITES beyanı aranır).',
    icon: 'Package',
    attributes: {
      isLiquid: false,
      hasAlcohol: false,
      hasBattery: false,
      isFragile: false,
      isFoodOrConsumable: false,
      isPreciousMetal: false,
      isWoodOrPlant: false,
      isTextile: false
    },
    suggestedCountry: 'DE',
    defaultPrice: 185,
    currency: 'EUR'
  },

  // 6. Ahşap & El Sanatları
  {
    id: 'wooden_cutting_board',
    name: 'Doğal Ceviz Ağacı Epoksi Mutfak Sunum Tahtası',
    category: 'Ahşap & Mutfak',
    description: 'Fırınlanmış ceviz ağacı ve gıda uyumlu şeffaf epoksi sunum tepsisi (Lacey Act).',
    icon: 'Package',
    attributes: {
      isLiquid: false,
      hasAlcohol: false,
      hasBattery: false,
      isFragile: false,
      isFoodOrConsumable: false,
      isPreciousMetal: false,
      isWoodOrPlant: true,
      isTextile: false
    },
    suggestedCountry: 'US',
    defaultPrice: 72,
    currency: 'USD'
  },
  {
    id: 'ceramic_cup_set',
    name: 'El Yapımı Çini Motifli Seramik Fincan & Tabak Seti',
    category: 'Seramik & Sofra',
    description: 'İznik çinisi el boyaması 2 kişilik kahve fincan takımı (Kırılabilir ambalaj).',
    icon: 'Package',
    attributes: {
      isLiquid: false,
      hasAlcohol: false,
      hasBattery: false,
      isFragile: true,
      isFoodOrConsumable: false,
      isPreciousMetal: false,
      isWoodOrPlant: false,
      isTextile: false
    },
    suggestedCountry: 'GB',
    defaultPrice: 45,
    currency: 'GBP'
  },

  // 7. Bebek, Çocuk & Diğer
  {
    id: 'montessori_toy',
    name: 'Doğal Ahşap Montessori Çocuk Aktivite Oyuncağı',
    category: 'Bebek & Oyuncak',
    description: 'Boyasız kayın ağacından üretilmiş eğitici ahşap oyuncak (CE / EN 71 standartları).',
    icon: 'Package',
    attributes: {
      isLiquid: false,
      hasAlcohol: false,
      hasBattery: false,
      isFragile: false,
      isFoodOrConsumable: false,
      isPreciousMetal: false,
      isWoodOrPlant: true,
      isTextile: false
    },
    suggestedCountry: 'DE',
    defaultPrice: 42,
    currency: 'EUR'
  },
  {
    id: 'handmade_knife',
    name: 'Dövme Çelik El Yapımı Kamp & Avcı Çakısı',
    category: 'Avcılık & Kesici Alet',
    description: 'Geyik boynuzu kabzalı dövme karbon çeliği kamp bıçağı (Hava kargo güvenlik bildirimli).',
    icon: 'Package',
    attributes: {
      isLiquid: false,
      hasAlcohol: false,
      hasBattery: false,
      isFragile: false,
      isFoodOrConsumable: false,
      isPreciousMetal: false,
      isWoodOrPlant: false,
      isTextile: false
    },
    suggestedCountry: 'US',
    defaultPrice: 95,
    currency: 'USD'
  }
];
