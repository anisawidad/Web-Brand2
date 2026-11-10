# Simply Modern — Website

Website landing page untuk brand dessert, food & sparkling drinks.

## Cara menjalankan

1. Extract folder project.
2. Buka `index.html` di browser.
3. Untuk hasil terbaik saat development, jalankan dengan Live Server di VS Code.

## File

- `index.html` — struktur halaman
- `css/style.css` — seluruh visual/design
- `js/script.js` — filter menu, search, cart, animasi dan interaksi
- `assets/` — foto produk yang Anda upload

## Yang perlu Anda ubah

### 1. Nomor WhatsApp
Cari:
`6280000000000`

Ganti dengan nomor WhatsApp bisnis Anda, contoh:
`6281234567890`

### 2. Nama produk & harga
Edit array `products` di:
`js/script.js`

### 3. Instagram / TikTok
Edit link `href="#"` di bagian footer `index.html`.

### 4. Logo
Saat ini logo menggunakan monogram SVG-style berbasis HTML/CSS:
`SM` + botanical accent.

Jika nanti Anda sudah menentukan logo final, bagian `.brand-mark` dapat diganti dengan `<img src="assets/logo.svg">`.

## Catatan

Font menggunakan Google Fonts sehingga membutuhkan koneksi internet. Jika offline, browser otomatis memakai font fallback.


Layout update: the menu grid is fixed to 3 columns on desktop/tablet and contains 9 menu cards, giving exactly 3 rows × 3 cards. Mobile remains responsive.
