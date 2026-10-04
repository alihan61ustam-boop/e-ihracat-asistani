# E-İhracat Mevzuat ve Risk Asistanı 🌍📦

> **Mikro İhracat (ETGB) yapan Etsy, Amazon ve Shopify satıcıları için gümrük kurallarını, vergi sınırlarını ve tehlikeli madde (DG) kısıtlamalarını sadeleştiren ve zorunlu dış ticaret evraklarını otomatik üreten akıllı web uygulaması.**

---

## 🚀 Öne Çıkan Özellikler

1. **Akıllı Soru Sihirbazı (3 Adımlı Analiz):**
   * **1. Ne Satacaksın?:** Ürün adı, serbest metin arama ve 16 farklı popüler e-ihracat kategorisi (Parfüm, Zeytinyağı, Kahve, Gümüş Takı, Pilli Gece Lambası, Yün Triko, Hakiki Deri Ceket, Ceviz Ağacı Mutfak Tahtası, Çini Seramik, Montessori Oyuncağı, Avcı Çakısı vb.).
   * **2. İçerik & Nitelik:** Alkol oranı (%24 üzeri IATA DG alevlenir sıvı denetimi), sıvı/cam, lityum pil (UN3481), gıda/tüketim, kıymetli maden (925 ayar), kesici alet kısıtları.
   * **3. Hedef Ülke & Fiyat:** Almanya (AB), ABD, İngiltere, Kanada, BAE.

2. **Otomasyonlu Evrak Doldurucu & İndirici (Document Automation):**
   * **Mikro İhracat Commercial Invoice (ETGB E-Fatura & Proforma)**
   * **MSDS / SDS 16 Bölümlük Güvenlik Bilgi Formu** (IATA DG Class 3 / UN 1266)
   * **INCI Kozmetik İçerik ve Güvenlik Beyannamesi**
   * **ABD FDA Gıda Ön Bildirim Formu (Prior Notice Confirmation)**
   * **Almanya LUCID VerpackG Ambalaj Lisansı Beyannamesi**
   * **Kıymetli Maden (925 Gümüş / Altın) Ayar & Menşe Beyanı**
   * **UN 3481 Lityum Pil Taşıma Beyanı (PI 967)**
   * **Deri Ürün CITES Vahşi Hayvan Olmadığı Beyannamesi**
   * **Tekstil Elyaf İçerik & Bakım Beyannamesi**
   * **Kesici Alet / Kamp Bıçağı Gümrük Güvenlik Beyanı**
   * *Tüm belgeleri tarayıcı üzerinden canlı düzenleyip A4 formatında tek tıkla yazdırma veya PDF olarak kaydetme imkanı!*

3. **Vergi & De Minimis Simülatörü:**
   * Fiyat kaydırıcısı ile De Minimis eşiğinin (150€ / 800$ / 135£) canlı takibi ve alıcıya kapıda vergi çıkıp çıkmayacağının anlık tespiti.

4. **Koli & Ürün Etiket Motoru:**
   * Uluslararası INCI şişe/kutu etiketi ve dış koli uyarı etiketleri (*Class 3 Flammable Liquid*, *UN 3481 Lithium Battery*, *This Way Up / Fragile*).

---

## 🛠️ Yerel Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için:

```bash
# Proje dizinine girin
cd e-ihracat-asistani

# Bağımlılıkları yükleyin (İlk sefer için)
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Uygulama varsayılan olarak `http://127.0.0.1:5173` adresinde açılır.

---

## 🌐 GitHub'a Yükleme ve Canlıya Alma (Deployment)

Projeyi GitHub'a yükleyip Vercel veya Netlify üzerinde ekibinizle paylaşmak için:

### 1. GitHub'da Yeni Bir Repository Oluşturun
1. [GitHub](https://github.com/new) üzerinde `e-ihracat-asistani` adında boş bir repo açın.
2. Terminalinizde şu komutları çalıştırın:

```bash
git remote add origin https://github.com/<KULLANICI_ADINIZ>/e-ihracat-asistani.git
git branch -M main
git push -u origin main
```

### 2. Tek Tıkla Canlıya Alma (Vercel / Netlify)
* **Vercel:** [vercel.com](https://vercel.com) adresine gidin, GitHub reponuzu seçin ve `Deploy` butonuna basın. 30 saniye içinde herkese açık bir `https://e-ihracat-asistani.vercel.app` linki oluşturulur!
* **Netlify:** [netlify.com](https://netlify.com) üzerinde `Import from Git` diyerek aynı şekilde yayınlayabilirsiniz.
