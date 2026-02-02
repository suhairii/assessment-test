export const iqAnswerKeys: Record<number, string> = {
  1: "B", 2: "E", 3: "D", 4: "C", 5: "B", 6: "B", 7: "E", 8: "E", 9: "C", 10: "E",
  11: "C", 12: "B", 13: "D", 14: "E", 15: "H", 16: "D", 17: "B", 18: "D", 19: "D", 20: "D",
  21: "D", 22: "B", 23: "C", 24: "B", 25: "B", 26: "B", 27: "D", 28: "C", 29: "C", 30: "E",
  31: "D", 32: "C", 33: "B", 34: "C", 35: "B", 36: "D", 37: "B", 38: "D", 39: "D", 40: "C",
  41: "D", 42: "B", 43: "E", 44: "A", 45: "B", 46: "D", 47: "D", 48: "C", 49: "E", 50: "B",
  51: "C", 52: "B", 53: "B", 54: "H", 55: "C", 56: "A", 57: "E", 58: "C", 59: "C", 60: "D",
};

export const iqScoreMap: Record<number, number> = {
  22: 80, 23: 82, 24: 84, 25: 86, 26: 88, 27: 90, 28: 92, 29: 94, 30: 96,
  31: 98, 32: 100, 33: 102, 34: 104, 35: 106, 36: 108, 37: 110, 38: 112, 39: 114, 40: 116,
  41: 118, 42: 120, 43: 122, 44: 124, 45: 126, 46: 128, 47: 130, 48: 132, 49: 134, 50: 136,
  51: 138, 52: 140, 53: 142, 54: 146, 55: 150, 56: 155, 57: 160, 58: 165, 59: 165, 60: 165,
};

export const iqQuestions = [
  {
    id: 1,
    question: "Mana dari ke-5 ini yang paling TIDAK mirip dengan 4 yang lain?",
    options: ["Beruang", "Ular", "Sapi", "Anjing", "Harimau"]
  },
  {
    id: 2,
    question: "Jika Anda mengatur ulang kata-kata \"LINKECI\", maka Anda akan mendapat nama sebuah:",
    options: ["Lautan", "Negara", "Provinsi", "Kota", "Hewan"]
  },
  {
    id: 3,
    question: "Mana dari ke-5 gambar ini yang paling melengkapi kalimat gambar tersebut? [Soal Gambar: Pola Logika]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-3.jpg"
  },
  {
    id: 4,
    question: "Mana dari ke-5 ini yang paling TIDAK mirip dengan 4 yang lain?",
    options: ["Kentang", "Jagung", "Apel", "Wortel", "Kacang"]
  },
  {
    id: 5,
    question: "Mana dari ke-5 gambar ini yang paling melengkapi kalimat gambar tersebut? [Soal Gambar: Pola Logika]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-5.jpg"
  },
  {
    id: 6,
    question: "Saat ini John berumur 12 tahun, yaitu 3 kali lebih tua dari adiknya. Berapa umur John saat umurnya 2 kali lebih tua dari umur adiknya?",
    options: ["15", "16", "18", "20", "21"]
  },
  {
    id: 7,
    question: "Mana dari ke-5 kata ini yang paling melengkapi kalimat tersebut? Jika \"Kakak Laki-Laki\" itu \"Kakak Perempuan\", maka \"Keponakan Perempuan\" adalah:",
    options: ["Ibu", "Anak Perempuan", "Bibi", "Paman", "Keponakan Laki-laki"]
  },
  {
    id: 8,
    question: "Mana dari ke-5 ini yang paling TIDAK mirip dengan 4 yang lain?",
    options: ["A", "Z", "F", "N", "E"]
  },
  {
    id: 9,
    question: "Mana dari ke-5 kata ini yang paling melengkapi kalimat tersebut. Jika \"Susu\" itu \"Gelas\", maka \"Surat\" itu:",
    options: ["Stempel", "Ballpoin", "Amplop", "Buku", "Kiriman"]
  },
  {
    id: 10,
    question: "Mana dari ke-5 yang paling TIDAK mirip dengan 4 yang lain? [Soal Gambar: Pola Tanda Kurung]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-10.jpg"
  },
  {
    id: 11,
    question: "Mana dari ke-5 kata ini yang paling melengkapi kalimat tersebut? Jika \"HIDUP\" itu \"PUDIH\" maka 5232 adalah:",
    options: ["2523", "3252", "2325", "3225", "5223"]
  },
  {
    id: 12,
    question: "\"Jika beberapa Smaugs adalah Thors dan beberapa Thors adalah Thrains, maka beberapa Smaugs pasti adalah Thrains.\" Pernyataan ini adalah:",
    options: ["Benar", "Salah", "Tidak keduanya"]
  },
  {
    id: 13,
    question: "Mana dari ke-5 ini yang paling TIDAK mirip dengan 4 yang lain? [Soal Gambar: Bentuk Geometri]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-13.jpg"
  },
  {
    id: 14,
    question: "Mana dari ke-5 kata yang paling melengkapi kalimat tersebut? Jika \"Pohon\" itu \"Tanah\" maka \"Cerobong Asap\" itu:",
    options: ["Asap", "Batu bata", "Langit", "Garasi", "Rumah"]
  },
  {
    id: 15,
    question: "Mana dari angka-angka ini yang TIDAK masuk ke dalam urutan di bawah ini? 9 - 7 - 8 - 6 - 7 - 5 - 6 - 3",
    options: ["9", "7", "8", "6", "7", "5", "6", "3"]
  },
  {
    id: 16,
    question: "Mana dari ke-5 ini yang paling TIDAK mirip dengan 4 yang lain?",
    options: ["Sentuh", "Rasa", "Dengar", "Senyum", "Lihat"]
  },
  {
    id: 17,
    question: "Mana dari ke-5 gambar ini yang paling melengkapi kalimat gambar tersebut? [Soal Gambar: Pola Panah]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-17.jpg"
  },
  {
    id: 18,
    question: "Jack lebih tinggi dari Peter, dan Bill lebih pendek dari Jack. Mana kalimat yang paling akurat?",
    options: ["Bill lebih tinggi dari Peter", "Bill lebih pendek dari Peter", "Bill sama tingginya dengan Peter", "Mustahil untuk mengetahui apakah Bill or Peter yang lebih tinggi"]
  },
  {
    id: 19,
    question: "Mana dari ke-5 ini yang paling TIDAK mirip dengan 4 yang lain?",
    options: ["Kaus kaki", "Baju", "Sepatu", "Dompet", "Topi"]
  },
  {
    id: 20,
    question: "Mana dari ke-5 ini yang paling melengkapi kalimat tersebut? Jika \"CAACCAC\" adalah \"3113313\" maka \"CACAACAC\" adalah:",
    options: ["13133131", "13133313", "31311131", "31311313", "31313113"]
  },
  {
    id: 21,
    question: "Jika Anda mengatur ulang kata \"RAPIS\", maka Anda akan mendapat nama sebuah:",
    options: ["Lautan", "Negara", "Provinsi", "Kota", "Hewan"]
  },
  {
    id: 22,
    question: "Mana dari ke-5 ini yang paling TIDAK mirip dengan 4 yang lain? [Soal Gambar: Pola Garis/Bentuk]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-22.jpg"
  },
  {
    id: 23,
    question: "Mana dari ke-5 kata ini yang paling melengkapi kalimat tersebut? Jika \"Peluru\" adalah \"Senjata\" maka \"Bola Api\" adalah:",
    options: ["Pentungan", "Ketapel", "Meriam", "Pelempar", "Jepretan"]
  },
  {
    id: 24,
    question: "\"Jika beberapa Bifurs adalah Bofurs dan semua Gloins adalah Bofurs, maka beberapa Bifurs pasti adalah Gloins.\" Pernyataan ini adalah:",
    options: ["Benar", "Salah", "Tidak keduanya"]
  },
  {
    id: 25,
    question: "Mana dari ke-5 ini yang paling TIDAK mirip dengan 4 yang lain?",
    options: ["A1", "E6", "04 (atau O4)", "82 (atau B2)", "D4"]
  },
  {
    id: 26,
    question: "Mana dari angka-angka ini yang TIDAK masuk ke dalam urutan di bawah ini? A - D - G - I - J - M - P - S",
    options: ["D", "I", "J", "M", "S"]
  },
  {
    id: 27,
    question: "Mana dari ke-5 gambar ini yang paling melengkapi kalimat gambar tersebut? [Soal Gambar: Pola Persegi dan Lingkaran]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-27.jpg"
  },
  {
    id: 28,
    question: "Harga dari sebuah baju di-discount 20% untuk sebuah acara tahunan. Berapa % baju tersebut harus di-naik-kan dari harga discount tersebut, sehingga harga baju tersebut menjadi sama dengan awalnya?",
    options: ["15%", "20%", "25%", "30%", "40%"]
  },
  {
    id: 29,
    question: "Mana dari ke-5 ini yang paling TIDAK mirip dengan 4 yang lain?",
    options: ["Tembaga", "Besi", "Kuningan", "Emas", "Timah"]
  },
  {
    id: 30,
    question: "Mana dari ke-5 gambar ini yang paling melengkapi kalimat gambar tersebut? [Soal Gambar: Pola Geometri Segitiga/Kotak]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-30.jpg"
  },
  {
    id: 31,
    question: "Mana dari ke-5 ini yang paling TIDAK mirip dengan 4 yang lain?",
    options: ["Botol", "Cangkir", "Bak", "Terowongan", "Mangkuk"]
  },
  {
    id: 32,
    question: "Mary memiliki beberapa kue. Setelah makan 1 kue, Mary memberikan ½ dari sisanya untuk adiknya. Setelah makan 1 kue lagi, Mary memberikan ½ dari sisanya untuk adiknya. Mary sekarang hanya memiliki 5 kue. Berapakah jumlah awal kue yang dimiliki Mary?",
    options: ["11", "22", "23", "45", "46"]
  },
  {
    id: 33,
    question: "Mana dari ke-5 ini yang paling TIDAK mirip dengan 4 yang lain?",
    options: ["Terigu", "Jerami", "Gandum", "Bubur", "Beras"]
  },
  {
    id: 34,
    question: "Mana dari angka-angka ini yang TIDAK masuk ke dalam urutan di bawah ini? 2 - 3 - 6 - 7 - 8 - 14 - 15 - 30",
    options: ["Tiga", "Tujuh", "Delapan", "Lima belas", "Tiga puluh"]
  },
  {
    id: 35,
    question: "Mana dari ke-5 gambar ini yang paling melengkapi kalimat gambar tersebut? [Soal Gambar: Pola Kotak Hitam Putih]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-35.jpg"
  },
  {
    id: 36,
    question: "Sebuah pesawat ruang angkasa menerima 3 pesan dalam bahasa yang aneh... 'Elros Aldarion Elendil' -> 'Bahaya Ledakan Roket'... Apakah arti dari \"Elendil\"?",
    options: ["Bahaya", "Ledakan", "Bukan apa-apa", "Roket", "Gas"]
  },
  {
    id: 37,
    question: "Mana dari ke-5 gambar ini yang paling TIDAK mirip dengan 4 yang lain? [Soal Gambar: Pola Garis dalam Lingkaran]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-37.jpg"
  },
  {
    id: 38,
    question: "Mana dari ke-5 ini yang paling melengkapi kalimat tersebut? Jika \"GESPER\" adalah \"Kepala Gesper\", maka \"SEPATU\" adalah:",
    options: ["Kaos Kaki", "Tumit", "Kaki", "Tali Sepatu", "Sol Sepatu"]
  },
  {
    id: 39,
    question: "Mana dari ke-5 gambar ini yang paling TIDAK mirip dengan 4 yang lain? [Soal Gambar: Pola Garis/Sudut]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-39.jpg"
  },
  {
    id: 40,
    question: "John menerima USD 0.41 sebagai kembalian... Jika John menerima 6 koin, maka ketiga dari koin-koin tersebut harusnya:",
    options: ["Satu Sen", "Lima sen", "Sepuluh sen", "Seperempat dollar", "Setengah dollar"]
  },
  {
    id: 41,
    question: "Mana dari ke-5 gambar ini yang paling TIDAK mirip dengan 4 yang lain? [Soal Gambar: Pola Geometris]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-41.jpg"
  },
  {
    id: 42,
    question: "Jika Anda mengatur ulang kata-kata \"RMANJE\", maka anda akan mendapat nama sebuah:",
    options: ["Lautan", "Negara", "Provinsi", "Kota", "Hewan"]
  },
  {
    id: 43,
    question: "Which one of the five designs makes the best comparison? (Mana dari 5 desain ini yang merupakan perbandingan terbaik?) [Soal Gambar: Analogi Visual]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-43.jpg"
  },
  {
    id: 44,
    question: "\"Jika semua Wargs adalah Twerps dan tidak ada Twerps yang merupakan Gollums maka tidak ada Gollums yang pasti adalah Wargs.\" Pernyataan ini adalah:",
    options: ["Benar", "Salah", "Tidak Keduanya"]
  },
  {
    id: 45,
    question: "Mana dari ke-5 ini yang paling TIDAK mirip dengan 4 yang lain?",
    options: ["Kuda", "Kanguru", "Zebra", "Rusa", "Keledai"]
  },
  {
    id: 46,
    question: "Mana dari gambar ini yang TIDAK sesuai dengan urutan gambar-gambar ini? [Soal Gambar: Urutan Huruf/Posisi A, B, C, D dst]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-46.jpg"
  },
  {
    id: 47,
    question: "Mana dari ke-5 ini yang paling melengkapi kalimat tersebut? Jika \"Jari\" adalah \"Tangan\" maka \"Daun\" adalah:",
    options: ["Pohon", "Cabang", "Bunga", "Ranting", "Kulit Kayu"]
  },
  {
    id: 48,
    question: "Ibunya John mengirimkannya ke toko untuk membeli 9 kotak besar jeruk. John hanya dapat membawa 2 kotak dalam sekali jalan. Berapa kali ia harus bolak-balik ke toko?",
    options: ["4", "4 ½", "5", "½", "6"]
  },
  {
    id: 49,
    question: "Mana dari gambar ini yang TIDAK sesuai dengan urutan gambar-gambar ini? [Soal Gambar: Pola Wajah/Emotikon]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-49.jpg"
  },
  {
    id: 50,
    question: "Mana dari ke-5 ini yang paling melengkapi kalimat tersebut? Jika \"Kaki\" adalah \"Lutut\", maka \"Tangan\" adalah:",
    options: ["Jari", "Sikut", "Tumit", "Kaki", "Lengan"]
  },
  {
    id: 51,
    question: "Mana gambar yang paling mengikuti logika dari diagram di bawah ini? [Soal Gambar: Diagram Alur/Pohon]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-51.jpg"
  },
  {
    id: 52,
    question: "Mary ada di peringkat ke-13 dari yang terbaik dan juga peringkat ke-13 dari yang terburuk dalam lomba mengeja kata. Ada berapa peserta dalam lomba mengeja kata tersebut?",
    options: ["13", "25", "26", "27", "28"]
  },
  {
    id: 53,
    question: "Mana dari ke-5 ini yang paling melengkapi kalimat tersebut? Jika \"Air\" adalah \"Es Batu\", maka \"Susu\" adalah:",
    options: ["Madu", "Keju", "Sereal", "Kopi", "Kue"]
  },
  {
    id: 54,
    question: "Mana dari angka ini yang TIDAK sesuai dengan urutan angka-angka ini? 1 - 2 - 5 - 10 - 13 - 26 - 29 - 48",
    options: ["1", "2", "5", "10", "13", "26", "29", "48"]
  },
  {
    id: 55,
    question: "Mana dari ke-5 ini yang paling TIDAK mirip dengan 4 yang lain?",
    options: ["Sayap", "Iga", "Salmon", "Ayam", "Sapi"]
  },
  {
    id: 56,
    question: "\"Jika semua Fleeps adalah Sloops dan semua Sloops adalah Loopies, maka semua Fleeps adalah pasti Loopies.\" Pernyataan ini adalah:",
    options: ["Benar", "Salah", "Tidak Keduanya"]
  },
  {
    id: 57,
    question: "Mana dari ke-5 gambar ini yang paling melengkapi kalimat gambar tersebut? [Soal Gambar: Pola Simbol Kartu/Bentuk]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-57.jpg"
  },
  {
    id: 58,
    question: "Mana dari ke-5 ini yang paling TIDAK mirip dengan 4 yang lain?",
    options: ["Sentimeter", "Kilometer", "Hektar", "Meter", "Kaki"]
  },
  {
    id: 59,
    question: "Mana dari ke-5 gambar ini yang paling melengkapi kalimat gambar tersebut? [Soal Gambar: Pola Garis dan Titik]",
    options: ["A", "B", "C", "D", "E"],
    image: "/images/iq/soal-59.jpg"
  },
  {
    id: 60,
    question: "Seekor ikan mempunyai kepala sepanjang 9mm. Buntutnya sama panjangnya dengan ukuran kepalanya ditambah setengah kali ukuran badannya. Ukuran badannya adalah sama dengan ukuran kepala ditambah ukuran buntutnya. Berapa panjang ikan tersebut?",
    options: ["27mm", "54mm", "63mm", "72mm", "81mm"]
  }
];