# WisataKu

Project web sederhana untuk menampilkan daftar tempat wisata Indonesia dengan gambar, deskripsi, kategori, dan harga.

## Fitur
- Menampilkan daftar wisata dalam bentuk kartu
- Filter pencarian berdasarkan nama wisata
- Filter kategori wisata
- Dukungan data dari Wikipedia API dan data statis sebagai fallback
- Menampilkan gambar lokal dari folder assets

## Struktur Folder
- `index.html` — halaman utama
- `css/style.css` — styling tampilan
- `js/app.js` — logika daftar wisata, filter, dan render kartu
- `assets/` — file gambar destinasi wisata

## Cara Menjalankan
1. Buka folder proyek
2. Jalankan server lokal, misalnya:
   ```bash
   python -m http.server 8000
   ```
3. Buka browser ke:
   ```text
   http://localhost:8000/
   ```

## Catatan
- Jika gambar dari API tidak tersedia, sistem akan menampilkan placeholder emoji.
- Jika API gagal, aplikasi otomatis beralih ke data statis.
