// ================================================================
// CONFIG.JS — EDIT DI SINI UNTUK MENYESUAIKAN UNDANGAN
// ================================================================

const CONFIG = {

  // --- DETAIL ACARA ---
  event: {
    title: "UNDANGAN JARINGAN HEALING",                   // ← Ganti nama acara
    subtitle: "#Bermain Bersama, Bertumbuh Bersama", // ← Ganti subtitle
    date: "2026-07-15T08:00:00",           // ← Format: YYYY-MM-DDTHH:MM:SS
    dateDisplay: "RABU, 15 Juli 2026",    // ← Tampilan tanggal
    time: "08.00 WIB – Selesai",           // ← Tampilan jam
  },

  // --- LOKASI ---
  venue: {
    name: "Plunyong Kalikuning",                        // ← Nama gedung
    address: "Kedungsriti, RT.01/RW.06, Sidorejo, Umbulharjo, Kec. Cangkringan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55583",             // ← Alamat lengkap
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=-7.615634854393573,110.44125586703395", // ← Link Google Maps langsung ke lokasi
    // Untuk embed map: buka Google Maps → Share → Embed a map → copy src URL
    embedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75687.85892595357!2d110.44125586703395!3d-7.615634854393573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a673067694c21%3A0xf0138441f0b05e9b!2sPlunyon%20Kalikuning!5e0!3m2!1sen!2sid!4v1782626205185!5m2!1sen!2sid",
  },

  // --- TEKS KONTEN ---
  content: {
    pendahuluan: `Bismillahirrahmanirrahim. Segala puji bagi Allah SWT yang telah memberikan kita kesempatan sehingga akan berkumpul kembali pada tanggal 15 juli di plunyong.`,

    tujuan: [
      "Mempererat tali silaturahmi antar anggota organisasi",
      "Meningkatkan kapasitas dan kompetensi anggota",
      "Memperkuat nilai-nilai keislaman dalam berorganisasi",
      "Mewujudkan visi Kabinet Lentera Asa yang progresif",
      "Menginspirasi untuk lanjut 2 periode pengurusan",
    ],

    rundown: [
      { time: "08.00", event: "Registrasi Peserta dan beli tiket" },
      { time: "08.30", event: "Berjalan menelusuri lembah" },
      { time: "09.00", event: "Masak makanan dan bermain" },
      { time: "09.30", event: "Pembukaan, tilawah al-qur'an dan pengajian akbar" },
      { time: "12.00", event: "Shalat berjamaah" },
      { time: "13.30", event: "Sesi Lanjutan & Diskusi proker jaringan" },
      { time: "15.30", event: "Penutupan & Do'a Bersama" },
    ],

    penutup: `Kehadiran Anda adalah kehormatan dan kebahagiaan bagi kami. Semoga Allah SWT 
      meridhoi setiap langkah kita, memudahkan urusan kita, dan menjadikan acara ini penuh 
      keberkahan bagi kita semua. Jazakumullahu khairan katsiran.`,
  },

  // --- PENGURUS / FOTO ---
  // Ganti dengan nama asli dan path foto (taruh foto di folder yang sama)
  pengurus: [
    { nama: "King Thobiq",       jabatan: "Ketua Guild",       foto: "thobiq.png" },
    { nama: "King Rusdi",       jabatan: "Wakil Ketua",         foto: "rusdi.jpg" },
    { nama: "Mas Amba",  jabatan: "Sekretaris",          foto: "mas amba.jpg" },
    { nama: "Putri Kecil Ayah",   jabatan: "Bendahara",           foto: "putri-.jpg" },
    { nama: "Mas Gatot",    jabatan: "Koordinator Divisi Acara",  foto: "gatot.jpg" },
    { nama: "Mas Fuad imam besar",    jabatan: "Wakil Koordinator Divisi Acara",  foto: "fuad.jpg" },
  ],

  // --- KONFIRMASI WHATSAPP ---
  whatsapp: {
    nomor: "6282138823773",       // ← Ganti nomor WA (tanpa +)
    pesan: "Assalamu'alaikum, saya konfirmasi kehadiran saya di acara Kabinet Lentera Asa",
  },

  // --- MUSIK ---
  // Taruh file musik.mp3 di folder yang sama dan beri nama "music.mp3"
  // Atau ganti dengan URL musik
  musicSrc: "musikweb.mp3",

};
