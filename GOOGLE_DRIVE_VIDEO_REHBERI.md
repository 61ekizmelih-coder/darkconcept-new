# Google Drive Video Ekleme Rehberi

## 📹 Google Drive'dan Video Linki Alma

### Adım 1: Videoyu Google Drive'a Yükle
1. Google Drive'a giriş yap
2. Videoyu yükle
3. Videoya sağ tıkla → "Paylaş"

### Adım 2: Paylaşım Ayarları
1. "Bağlantısı olan herkes" seçeneğini aktif et
2. "Kopyala" butonuna tıkla
3. Link şu formatta olacak:
   ```
   https://drive.google.com/file/d/1abc123XYZ456/view?usp=sharing
   ```

### Adım 3: Link'i HTML'e Ekle

`index.html` dosyasında `GOOGLE_DRIVE_LINK_X` yazan yerleri gerçek linklerle değiştir:

**Örnek:**
```html
<!-- ÖNCE -->
onclick="openVideoModal('GOOGLE_DRIVE_LINK_1')"

<!-- SONRA -->
onclick="openVideoModal('https://drive.google.com/file/d/1abc123XYZ456/view?usp=sharing')"
```

## 🎯 Hangi Videolar Hangi Yerlerde?

Video 1 (GOOGLE_DRIVE_LINK_1) → Teknoloji Fuarı 2024
Video 2 (GOOGLE_DRIVE_LINK_2) → Otomotiv Showroom
Video 3 (GOOGLE_DRIVE_LINK_3) → Gıda Fuarı Stand
Video 4 (GOOGLE_DRIVE_LINK_4) → Mobilya Sergisi
Video 5 (GOOGLE_DRIVE_LINK_5) → İnovasyon Merkezi
Video 6 (GOOGLE_DRIVE_LINK_6) → Araç Lansmanı
Video 7 (GOOGLE_DRIVE_LINK_7) → Yazılım Fuarı
Video 8 (GOOGLE_DRIVE_LINK_8) → Organik Ürünler
Video 9 (GOOGLE_DRIVE_LINK_9) → Tasarım Haftası

## ✅ Avantajlar

- ✨ Site daha hızlı yüklenir (videolar sunucuda değil)
- 💾 Hosting alanından tasarruf
- 🔄 Videoları kolayca değiştirebilirsin
- 📊 Google Drive'ın bant genişliğini kullanırsın
- 🎬 Otomatik video optimizasyonu

## 🔧 Link Formatları

Kod otomatik olarak şu formatları destekler:

1. **Normal Link:**
   ```
   https://drive.google.com/file/d/FILE_ID/view
   ```

2. **Share Link:**
   ```
   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   ```

3. **Embed Link (Otomatik Çevrilir):**
   ```
   https://drive.google.com/file/d/FILE_ID/preview
   ```

## 📝 Not

Tüm videolar için "Bağlantısı olan herkes görüntüleyebilir" iznini vermeyi unutma!
