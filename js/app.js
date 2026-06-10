/* ============================================
   WisataKu — app.js
   API: Wikipedia REST API (gratis, tanpa API key)
   URL: https://id.wikipedia.org/api/rest_v1/page/summary/{title}
   Fallback: Data statis jika API gagal
   Toggle: Bisa pilih API atau Statis dari tombol di header
   ============================================ */

// -----------------------------------------------
// DATA STATIS FALLBACK (minimal 3 item, 3+ atribut)
// -----------------------------------------------
const WISATA_FALLBACK = [
  {
    id: 1,
    nama: "Pantai Kuta",
    lokasi: "Badung, Bali",
    kategori: "Pantai",
    harga: "Rp 10.000",
    rating: "4.7",
    deskripsi: "Pantai Kuta adalah salah satu pantai paling terkenal di Indonesia. Terkenal dengan ombak yang cocok untuk surfing, sunset yang memukau, dan suasana yang ramai namun menyenangkan.",
    gambarEmoji: "🏖️",
    gambar: "assets/Pantaikuta.jpg",
    sumber: "Data Statis"
  },
  {
    id: 2,
    nama: "Candi Borobudur",
    lokasi: "Magelang, Jawa Tengah",
    kategori: "Budaya",
    harga: "Rp 50.000",
    rating: "4.9",
    deskripsi: "Borobudur adalah candi Buddha terbesar di dunia dan merupakan Situs Warisan Dunia UNESCO. Dibangun pada abad ke-8, candi ini memiliki 2.672 panel relief dan 504 arca Buddha.",
    gambarEmoji: "🏛️",
    gambar: "assets/Candiborobudur.jpeg",
    sumber: "Data Statis"
  },
  {
    id: 3,
    nama: "Raja Ampat",
    lokasi: "Papua Barat Daya",
    kategori: "Alam",
    harga: "Rp 500.000",
    rating: "5.0",
    deskripsi: "Raja Ampat adalah kepulauan dengan keanekaragaman hayati laut tertinggi di dunia. Surga bagi para penyelam dengan terumbu karang yang indah, laguna biru, dan satwa laut yang langka.",
    gambarEmoji: "🌊",
    gambar: "assets/Rajaampat.jpg",
    sumber: "Data Statis"
  },
  {
    id: 4,
    nama: "Gunung Bromo",
    lokasi: "Probolinggo, Jawa Timur",
    kategori: "Alam",
    harga: "Rp 32.000",
    rating: "4.8",
    deskripsi: "Gunung Bromo adalah gunung berapi aktif yang ikonik dengan pemandangan matahari terbit yang menakjubkan di atas lautan pasir yang luas. Destinasi favorit para pecinta alam dan fotografer.",
    gambarEmoji: "🌋",
    gambar: "assets/Gunungbromo.jpg",
    sumber: "Data Statis"
  },
  {
    id: 5,
    nama: "Taman Mini Indonesia Indah",
    lokasi: "Jakarta Timur, DKI Jakarta",
    kategori: "Kota",
    harga: "Rp 25.000",
    rating: "4.3",
    deskripsi: "TMII adalah taman hiburan bertema budaya Indonesia yang menampilkan miniatur kepulauan Indonesia beserta anjungan dari 34 provinsi, museum, dan berbagai wahana hiburan keluarga.",
    gambarEmoji: "🏙️",
    gambar: "assets/Tamanminiindonesia.jpg",
    sumber: "Data Statis"
  },
  {
    id: 6,
    nama: "Danau Toba",
    lokasi: "Sumatera Utara",
    kategori: "Alam",
    harga: "Rp 15.000",
    rating: "4.6",
    deskripsi: "Danau Toba adalah danau vulkanik terbesar di dunia dengan Pulau Samosir di tengahnya. Kawasan ini kaya akan budaya Batak dan menawarkan pemandangan danau yang mempesona.",
    gambarEmoji: "🏞️",
    gambar: "assets/Danautoba.jpg",
    sumber: "Data Statis"
  },
  {
    id: 7,
    nama: "Keraton Yogyakarta",
    lokasi: "Kota Yogyakarta, DIY",
    kategori: "Budaya",
    harga: "Rp 15.000",
    rating: "4.5",
    deskripsi: "Keraton Yogyakarta atau Kraton Ngayogyakarta Hadiningrat adalah istana resmi Kesultanan Yogyakarta. Pengunjung dapat menyaksikan pertunjukan seni budaya Jawa dan koleksi benda bersejarah.",
    gambarEmoji: "🏯",
    gambar: "assets/Kratonyogyakarta.jpg",
    sumber: "Data Statis"
  },
  {
    id: 8,
    nama: "Pantai Pink Lombok",
    lokasi: "Lombok Timur, NTB",
    kategori: "Pantai",
    harga: "Rp 10.000",
    rating: "4.8",
    deskripsi: "Pantai Pink adalah salah satu dari sedikit pantai berpasir merah muda di dunia. Warna uniknya berasal dari campuran karang merah Foraminifera. Air lautnya jernih dan sangat cocok untuk snorkeling.",
    gambarEmoji: "🌸",
    gambar: "assets/Pantaipink.jpg",
    sumber: "Data Statis"
  },
];

// -----------------------------------------------
// DAFTAR WISATA — judul artikel Wikipedia (bahasa Inggris)
// -----------------------------------------------
const WISATA_LIST = [
  { title: "Pantai Kuta",                 lokasi: "Badung, Bali",             kategori: "Pantai", harga: "Rp 10.000",  emoji: "🏖️" },
  { title: "Borobudur",                  lokasi: "Magelang, Jawa Tengah",    kategori: "Budaya", harga: "Rp 50.000",  emoji: "🏛️" },
  { title: "Kepulauan Raja Ampat",         lokasi: "Papua Barat Daya",         kategori: "Alam",   harga: "Rp 500.000", emoji: "🌊" },
  { title: "Gunung Bromo",                lokasi: "Probolinggo, Jawa Timur",  kategori: "Alam",   harga: "Rp 32.000",  emoji: "🌋" },
  { title: "Lake Toba",                  lokasi: "Sumatera Utara",           kategori: "Alam",   harga: "Rp 15.000",  emoji: "🏞️" },
  { title: "Kraton Yogyakarta",          lokasi: "Kota Yogyakarta, DIY",     kategori: "Budaya", harga: "Rp 15.000",  emoji: "🏯" },
  { title: "Pulau Komodo",       lokasi: "Nusa Tenggara Timur",      kategori: "Alam",   harga: "Rp 150.000", emoji: "🦎" },
  { title: "Tanah Lot",                  lokasi: "Tabanan, Bali",            kategori: "Budaya", harga: "Rp 30.000",  emoji: "🛕" },
  { title: "Prambanan",                  lokasi: "Sleman, Yogyakarta",       kategori: "Budaya", harga: "Rp 50.000",  emoji: "🏛️" },
  { title: "Taman Nasional Bunaken",      lokasi: "Manado, Sulawesi Utara",   kategori: "Pantai", harga: "Rp 150.000", emoji: "🐠" },
  { title: "Dataran tinggi Dieng",              lokasi: "Wonosobo, Jawa Tengah",    kategori: "Alam",   harga: "Rp 20.000",  emoji: "⛰️" },
  { title: "Taman Mini Indonesia Indah", lokasi: "Jakarta Timur",            kategori: "Kota",   harga: "Rp 25.000",  emoji: "🏙️" },
];

// -----------------------------------------------
// STATE
// -----------------------------------------------
let allWisata = [];
let filteredWisata = [];
let sumberAktif = "api"; // default: pakai API

// -----------------------------------------------
// WIKIPEDIA REST API — Tanpa API Key, 100% Gratis
// Docs: https://en.wikipedia.org/api/rest_v1/
// -----------------------------------------------
async function fetchSatuWisata(item, index) {
  const titleEncoded = encodeURIComponent(item.title);
  const url = `https://id.wikipedia.org/api/rest_v1/page/summary/${titleEncoded}`;

  const response = await fetch(url, {
    headers: { "Accept": "application/json" }
  });

  if (!response.ok) throw new Error(`Gagal fetch: ${item.title} (${response.status})`);

  const data = await response.json();

  // Potong deskripsi agar tidak terlalu panjang
  let deskripsi = data.extract || "";
  if (deskripsi.length > 250) {
    deskripsi = deskripsi.substring(0, 250).trimEnd() + "...";
  }

  return {
    id: index + 1,
    nama: data.title || item.title,
    lokasi: item.lokasi,
    kategori: item.kategori,
    harga: item.harga,
    rating: (3.8 + Math.random() * 1.2).toFixed(1),
    deskripsi: deskripsi || `${item.title} adalah salah satu destinasi wisata terbaik di Indonesia.`,
    gambarEmoji: item.emoji,
    gambar: data.thumbnail ? data.thumbnail.source : null,
    sumber: "Wikipedia API",
    wikiUrl: data.content_urls ? data.content_urls.desktop.page : null
  };
}

async function fetchFromAPI() {
  // Fetch semua destinasi secara paralel
  // Promise.allSettled = tidak berhenti meski 1-2 item gagal
  const promises = WISATA_LIST.map((item, i) => fetchSatuWisata(item, i));
  const results = await Promise.allSettled(promises);

  const berhasil = results
    .filter(r => r.status === "fulfilled")
    .map(r => r.value);

  console.log(`✅ Wikipedia API: ${berhasil.length}/${WISATA_LIST.length} berhasil dimuat`);

  if (berhasil.length < 3) {
    throw new Error("Terlalu sedikit data berhasil diambil dari API");
  }

  return berhasil;
}

// -----------------------------------------------
// RENDER CARDS
// -----------------------------------------------
function renderCards(data) {
  const grid = document.getElementById("cardGrid");
  const emptyState = document.getElementById("emptyState");

  if (!data || data.length === 0) {
    grid.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  grid.innerHTML = data.map(item => `
    <article class="card">
      <div class="card-img-wrap">
        ${item.gambar
          ? `<img class="card-img" src="${item.gambar}" alt="${item.nama}" loading="lazy"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />`
          : ""}
        <div class="card-img-placeholder" ${item.gambar ? 'style="display:none"' : ""}>
          <span>${item.gambarEmoji}</span>
          <span>Foto tidak tersedia</span>
        </div>
        <span class="badge-category badge-${item.kategori || "default"}">${item.kategori || "Wisata"}</span>
        <span class="badge-rating">⭐ ${item.rating}</span>
      </div>

      <div class="card-body">
        <h2 class="card-title">${item.nama}</h2>
        <p class="card-location">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${item.lokasi}
        </p>
        <p class="card-desc">${item.deskripsi}</p>
      </div>

      <div class="card-footer">
        <span class="card-harga">${item.harga}</span>
        ${item.wikiUrl
          ? `<a class="card-btn" href="${item.wikiUrl}" target="_blank" rel="noopener">Lihat Detail →</a>`
          : `<button class="card-btn" onclick="lihatDetail(${item.id})">Lihat Detail →</button>`}
      </div>

      <div class="card-api-badge ${item.sumber !== 'Wikipedia API' ? 'static' : ''}">
        ${item.sumber === "Wikipedia API" ? "🌐 via Wikipedia API" : "📦 Data Statis"}
      </div>
    </article>
  `).join("");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// -----------------------------------------------
// FILTER & SEARCH
// -----------------------------------------------
function filterWisata() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const category = document.getElementById("categoryFilter").value;

  filteredWisata = allWisata.filter(item => {
    const matchSearch =
      item.nama.toLowerCase().includes(query) ||
      item.lokasi.toLowerCase().includes(query) ||
      item.deskripsi.toLowerCase().includes(query);
    const matchCategory = category === "" || item.kategori === category;
    return matchSearch && matchCategory;
  });

  renderCards(filteredWisata);
  updateStats();
}

function updateStats() {
  const total = allWisata.length;
  const shown = filteredWisata.length;
  const el = document.getElementById("totalCount");
  const label = allWisata.some(w => w.sumber === "Wikipedia API")
    ? "via Wikipedia API"
    : "data statis";

  el.textContent = shown === total
    ? `Menampilkan ${total} tempat wisata (${label})`
    : `Menampilkan ${shown} dari ${total} tempat wisata`;
}

// -----------------------------------------------
// DETAIL
// -----------------------------------------------
function lihatDetail(id) {
  const item = allWisata.find(w => w.id === id);
  if (!item) return;
  alert(
    `📍 ${item.nama}\n\n` +
    `Lokasi   : ${item.lokasi}\n` +
    `Kategori : ${item.kategori}\n` +
    `Harga    : ${item.harga}\n` +
    `Rating   : ⭐ ${item.rating}\n\n` +
    `${item.deskripsi}`
  );
}

// -----------------------------------------------
// TOGGLE SUMBER DATA
// Dipanggil dari tombol di index.html
// -----------------------------------------------
async function gantiSumber(sumber) {
  if (sumber === sumberAktif) return;
  sumberAktif = sumber;

  // Update tombol aktif
  document.getElementById("btnAPI").classList.toggle("active", sumber === "api");
  document.getElementById("btnStatis").classList.toggle("active", sumber === "statis");

  // Reset search & filter
  document.getElementById("searchInput").value = "";
  document.getElementById("categoryFilter").value = "";

  const loading    = document.getElementById("loading");
  const loadingText = document.getElementById("loadingText");
  const errorState = document.getElementById("errorState");
  const cardGrid   = document.getElementById("cardGrid");

  cardGrid.innerHTML = "";
  errorState.style.display = "none";
  loading.style.display = "flex";

  if (sumber === "statis") {
    loadingText.textContent = "Memuat data statis...";
    await new Promise(r => setTimeout(r, 400)); // efek loading sebentar
    allWisata = WISATA_FALLBACK;
    loading.style.display = "none";
  } else {
    loadingText.textContent = "Mengambil data dari Wikipedia API...";
    try {
      allWisata = await fetchFromAPI();
      errorState.style.display = "none";
    } catch (err) {
      console.warn("⚠️ API gagal:", err.message);
      allWisata = WISATA_FALLBACK;
      errorState.style.display = "block";
    }
    loading.style.display = "none";
  }

  filteredWisata = [...allWisata];
  renderCards(filteredWisata);
  updateStats();
}

// -----------------------------------------------
// INIT — Jalankan saat halaman pertama kali dibuka
// -----------------------------------------------
async function init() {
  const loading    = document.getElementById("loading");
  const errorState = document.getElementById("errorState");

  loading.style.display = "flex";

  try {
    allWisata = await fetchFromAPI();
    errorState.style.display = "none";
  } catch (err) {
    console.warn("⚠️ API gagal, pakai data fallback:", err.message);
    allWisata = WISATA_FALLBACK;
    errorState.style.display = "block";
    // Kalau API gagal, set tombol ke statis
    sumberAktif = "statis";
    document.getElementById("btnAPI")?.classList.remove("active");
    document.getElementById("btnStatis")?.classList.add("active");
  }

  filteredWisata = [...allWisata];
  loading.style.display = "none";
  renderCards(filteredWisata);
  updateStats();
}

document.addEventListener("DOMContentLoaded", init);