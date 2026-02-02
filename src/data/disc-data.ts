export const discAnswerKeysMost: Record<number, string> = {
  1: "SICX", 2: "ICDX", 3: "XDSI", 4: "CSXI", 5: "XCXS", 6: "DSXX",
  7: "XSDI", 8: "DIXX", 9: "ISDC", 10: "DCXS", 11: "ISXD", 12: "XDCS",
  13: "DISX", 14: "CDIS", 15: "SXCX", 16: "IXXD", 17: "CSXD", 18: "ISXD",
  19: "CDIS", 20: "DCXI", 21: "SXDC", 22: "IXDS", 23: "ICDX", 24: "DSIC",
};

export const discAnswerKeysLeast: Record<number, string> = {
  1: "SXCD", 2: "ICDS", 3: "CDXI", 4: "XSDI", 5: "ICDS", 6: "DSIC",
  7: "CXDI", 8: "XXSC", 9: "ISDX", 10: "DXIS", 11: "ISCD", 12: "IDXS",
  13: "XISC", 14: "CXIX", 15: "XICD", 16: "XSCD", 17: "XSID", 18: "XXCD",
  19: "XDIS", 20: "DXSI", 21: "ISDC", 22: "ICDS", 23: "IXDS", 24: "DSIC",
};

export const conversionTables = {
  most: {
    D: { 20: 100, 19: 100, 18: 99, 17: 98, 16: 97, 15: 93, 14: 95, 13: 83, 12: 79, 11: 76, 10: 73, 9: 65, 8: 59, 7: 53, 6: 48, 5: 43, 4: 38, 3: 33, 2: 24, 1: 15, 0: 3 },
    I: { 19: 100, 18: 100, 17: 100, 16: 100, 15: 100, 14: 100, 13: 100, 12: 100, 11: 100, 10: 97, 9: 92, 8: 88, 7: 83, 6: 73, 5: 68, 4: 56, 3: 43, 2: 35, 1: 20, 0: 8 },
    S: { 19: 100, 18: 100, 17: 100, 16: 100, 15: 100, 14: 100, 13: 100, 12: 97, 11: 89, 10: 85, 9: 78, 8: 74, 7: 67, 6: 61, 5: 55, 4: 45, 3: 38, 2: 30, 1: 22, 0: 11 },
    C: { 15: 100, 14: 100, 13: 100, 12: 100, 11: 100, 10: 100, 9: 96, 8: 89, 7: 84, 6: 73, 5: 66, 4: 54, 3: 40, 2: 29, 1: 16, 0: 0 },
  },
  least: {
    D: { 21: 1, 20: 1, 19: 2, 18: 3, 17: 4, 16: 5, 15: 8, 14: 11, 13: 15, 12: 21, 11: 25, 10: 28, 9: 31, 8: 38, 7: 42, 6: 48, 5: 53, 4: 59, 3: 67, 2: 75, 1: 87, 0: 100 },
    I: { 19: 0, 18: 1, 17: 1, 16: 2, 15: 3, 14: 4, 13: 5, 12: 6, 11: 7, 10: 10, 9: 15, 8: 22, 7: 28, 6: 37, 5: 46, 4: 55, 3: 67, 2: 75, 1: 86, 0: 100 },
    S: { 19: 1, 18: 1, 17: 1, 16: 1, 15: 2, 14: 3, 13: 4, 12: 8, 11: 15, 10: 23, 9: 29, 8: 37, 7: 42, 6: 53, 5: 59, 4: 67, 3: 75, 2: 85, 1: 96, 0: 100 },
    C: { 16: 0, 15: 1, 14: 2, 13: 3, 12: 7, 11: 14, 10: 23, 9: 33, 8: 39, 7: 47, 6: 52, 5: 58, 4: 65, 3: 74, 2: 82, 1: 95, 0: 100 },
  },
};

export const profileCodes: Record<string, string> = {
  "HCLDLILS": "Analyzer #7", "HCLILDLS": "Analyzer #7", "HCHSLDLI": "Coordinator #21",
  "HCHSLILD": "Coordinator #21", "HCHDLILS": "Implementor #24", "HCHDLSLI": "Implementor #24",
  "HCHILSLD": "Analyzer #60", "HCHILDLS": "Analyzer #60", "HCHIHDLS": "Analyzer #55",
  "HCHDHILS": "Analyzer #55", "HCHSHDLI": "Analyzer #38", "HCHDHSLI": "Analyzer #38",
  "HDLILCLS": "Conductor #1", "HDHILSLC": "Persuader #12", "HDHILCLS": "Persuader #12",
  "HDHCLILS": "Implementor #9", "HDHCLSLI": "Implementor #9", "HDHSLILC": "Conductor #57",
  "HDHSLCLI": "Conductor #57", "HDHIHCLS": "Conductor #27", "HDHCHILS": "Conductor #27",
  "HDHSHCLI": "Conductor #42", "HDHCHSLI": "Conductor #42", "HSLDLCLI": "Supporter #5",
  "HSLDLILC": "Supporter #5", "HSLCLDLI": "Supporter #5", "HSLCLILD": "Supporter #5",
  "HSLILDLC": "Supporter #5", "HSLILCLD": "Supporter #5", "HSHCLDLI": "Coordinator #20",
  "HSHCLILD": "Coordinator #20", "HSHILDLC": "Relater #17", "HSHILCLD": "Relater #17",
  "HSHDLILC": "Supporter #59", "HSHDLCLI": "Supporter #59", "HSHIHCLD": "Supporter #35",
  "HSHCHILD": "Supporter #35", "HSHDHILC": "Supporter #50", "HSHIHDLC": "Supporter #50",
  "HILDLCLS": "Promoter #3", "HILDLSLC": "Promoter #3", "HILCLDLS": "Promoter #3",
  "HILCLSLD": "Promoter #3", "HILSLDLC": "Promoter #3", "HILSLCLD": "Promoter #3",
  "HIHDLSLC": "Persuader #13", "HIHDLCLS": "Persuader #13", "HIHSLDLC": "Relater #16",
  "HIHSLCLD": "Relater #16", "HIHCLDLS": "Promoter #58", "HIHCLSLD": "Promoter #58",
  "HIHSHCLD": "Promoter #47", "HIHCHSLD": "Promoter #47", "HIHDHSLC": "Promoter #30",
  "HIHSHDLC": "Promoter #30",
};


export const personalityDescriptions: Record<string, any> = {
  "Analyzer #7": {
    "strength": [
      "Kemampuan untuk melakukan tugas yang berat dengan benar pada pertama kali",
      "Waspada dan peka terhadap kesalahan pada saat ketepatan dan akurasi diperlukan",
      "Profesional dan disiplin dalam pendekatan mereka yang berkaitan dengan bidang keahlian mereka",
      "Keterampilan organisasi, bijak menggunakan waktu"
    ],
    "improve": [
      "Mengurangi perfeksionis",
      "Kurangi pendekatan \"berdasarkan buku\"",
      "Lebih antusias, kurangi ketergantungan pada data"
    ],
    "tendencies": {
      "goal": "Akurasi dan kualitas",
      "judge": "Hasil yang benar dan fakta yang disajikan",
      "influence": "Penggunaan data dan ketepatan",
      "valueorg": "Standar yang tinggi untuk diri sendiri dan bawahan, disiplin",
      "overuses": "Peraturan-peraturan",
      "understress": "Menjadi terlalu kritis terhadap diri sendiri dan orang lain",
      "fears": "Keputusan berisiko tinggi"
    }
  },
  "Coordinator #21": {
    "strength": [
      "Kemampuan untuk menetapkan dan mencapai standar perilaku kerja yang tinggi",
      "Waspada dan peka terhadap masalah, aturan, kesalahan dan prosedur",
      "Kemampuan untuk membuat keputusan sulit tanpa terganggu emosi",
      "Kemampuan untuk memahami dan memelihara kebutuhan untuk sistem yang berkualitas"
    ],
    "improve": [
      "Menyatakan perasaan yang sebenarnya tentang isu-isu",
      "Kurangi kekhawatiran bahwa perubahan dapat merusak hubungan atau kualitas",
      "Lebih percaya diri, interdependensi"
    ],
    "tendencies": {
      "goal": "Keamanan dan kerapian",
      "judge": "Standar yang tepat",
      "influence": "Hal yang dapat diandalkan, perhatian terhadap detail",
      "valueorg": "Kesadaran, mempertahankan standar",
      "overuses": "Ketergantungan pada Standar Prosedur Operasi (SOP)",
      "understress": "Menjadi introver, keras kepala",
      "fears": "Pertentangan"
    }
  },
  "Implementor #24": {
    "strength": [
      "Kemampuan untuk melakukan pekerjaan yang berkualitas sambil mencari cara-cara baru untuk meningkatkan kuantitas",
      "Kemampuan untuk membuat keputusan sulit, menggunakan wawasan dan fakta, namun tetap tidak emosional",
      "Kemampuan untuk menemukan solusi yang dapat diterima untuk masalah",
      "Mengharapkan dan menantang tim untuk standar kinerja yang lebih tinggi"
    ],
    "improve": [
      "Menjadi peka terhadap perasaan orang lain",
      "Mengurangi sikap terus terang & terlalu langsung",
      "Lebih menampilkan ketulusan"
    ],
    "tendencies": {
      "goal": "Merancang sistem",
      "judge": "Standar tinggi mereka sendiri",
      "influence": "Pengaturan langkah dalam mengembangkan sistem",
      "valueorg": "Tepat, pekerja teliti",
      "overuses": "Fakta dan angka",
      "understress": "Mengambil terlalu banyak",
      "fears": "Disorganisasi"
    }
  },
  "Analyzer #60": {
    "strength": [
      "Seorang promotor sistem yang berkualitas",
      "Rasa urgensi yang baik sambil mempertahankan standar yang tinggi",
      "Terorganisir, bahkan dalam hubungan. Menghargai orang dengan ide yang sama, suka yang terorganisir dan sadar akan kualitas",
      "Peka terhadap perubahan lingkungan sosial dan pekerjaan"
    ],
    "improve": [
      "Menjadi lebih menerima ide-ide dan keyakinan orang lain",
      "Menetapkan tujuan yang realistis",
      "Tidak menjadi terlalu sensitif terhadap komentar orang lain"
    ],
    "tendencies": {
      "goal": "Diplomatis",
      "judge": "Siapa yang mereka tahu, nama baik dan prestasinya",
      "influence": "Strategi dengan hubungan baik",
      "valueorg": "Menciptakan lingkungan kerja yang baik",
      "overuses": "Kebijaksanaan",
      "understress": "Menjadi terlalu ramah tamah",
      "fears": "Harus menukar kualitas dengan hubungan yang baik"
    }
  },
  "Analyzer #55": {
    "strength": [
      "Kemampuan untuk menyelesaikan banyak proyek dengan standar tinggi",
      "Kemampuan untuk mempertahankan perasaan yang kuat pada isu-isu tertentu",
      "Kemampuan untuk mendapatkan hasil melalui orang lain",
      "Mempertahankan standar dengan mengikuti prosedur yang telah terbukti"
    ],
    "improve": [
      "Tidak terlalu mengendalikan situasi",
      "Menjadi realistis ketika menilai orang",
      "Menjadi lebih mudah beradaptasi di bawah tekanan"
    ],
    "tendencies": {
      "goal": "Banyak tantangan",
      "judge": "Keterampilan dan komitmen mereka",
      "influence": "Menjadi optimis",
      "valueorg": "Menggabungkan tugas dan keterampilan yang berhubungan dengan orang",
      "overuses": "Standar Prosedur",
      "understress": "Menjadi mengendalikan",
      "fears": "Tidak memenuhi tenggat waktu"
    }
  },
  "Analyzer #38": {
    "strength": [
      "Kemampuan berjuang keras untuk hasil dan/atau prosedur untuk memastikan kualitas dan ketepatan",
      "Kemampuan dalam mengajukan pertanyaan yang tepat untuk mengungkap fakta tersembunyi",
      "Menghindari favoritisme ketika mengevaluasi personil",
      "Menggabungkan kemampuan analisis dan intuitif ketika berhadapan dengan isu-isu kompleks"
    ],
    "improve": [
      "Mengurangi analisis untuk mencapai kebenaran",
      "Tidak menyembunyikan emosi dan mengekspresikan lebih banyak pikiran kepada orang lain",
      "Berbagi informasi, kerjasama tim"
    ],
    "tendencies": {
      "goal": "Pemecah masalah",
      "judge": "Penggunaan data mereka",
      "influence": "Fakta dan angka",
      "valueorg": "Mandiri menerima tugas yang menantang",
      "overuses": "Perfeksionis",
      "understress": "Menjadi terus terang",
      "fears": "Kontak dengan orang, resiko tinggi dan kurangnya privasi"
    }
  },
  "Conductor #1": {
    "strength": [
      "Kemampuan untuk mengatasi masalah yang berurusan dengan banyak hal",
      "Memandang ke depan, agresif dan kompetitif",
      "Kemampuan untuk bekerja di lingkungan yang memiliki variasi dan perubahan",
      "Memulai aktivitas dan menetapkan langkah untuk mencapai hasil yang diinginkan"
    ],
    "improve": [
      "Mengurangi rasa intens, keras kepala dan terus terang",
      "Tidak memaksa orang lain yang mungkin tidak terlalu berkomitmen untuk sebuah proyek",
      "Kesabaran, kepedulian terhadap orang, kerendahan hati"
    ],
    "tendencies": {
      "goal": "Dominasi dan kemandirian",
      "judge": "Kemampuan mereka untuk meyelesaikan tugas dengan cepat",
      "influence": "Karakter, ketekunan",
      "valueorg": "Tampilkan sikap mampu",
      "overuses": "Tantangan dan lomba",
      "understress": "Menjadi tenang dan analitikal",
      "fears": "Kehilangan kontrol"
    }
  },
  "Persuader #12": {
    "strength": [
      "Berorientasi pada hasil dengan rasa urgensi untuk mencapai tujuan dan memenuhi tenggat waktu",
      "Tegas dan agresif ketika dihadapkan pada tantangan",
      "Memulai kegiatan melalui orang lain untuk mendapatkan hasil yang diinginkan",
      "Ekstrover dan aktif mencari hubungan dengan berbagai orang"
    ],
    "improve": [
      "Mengurangi kekesalan karena tenggat waktu yang tidak tercapai",
      "Tidak mengambil terlalu banyak tanggung jawab pada satu waktu, lebih konsisten",
      "Lebih tindak lanjut, terus terang, menurunkan harapan"
    ],
    "tendencies": {
      "goal": "Agresif dan percaya diri untuk menang",
      "judge": "Kemampuan untuk berkomunikasi dan berpikir",
      "influence": "Keramahan dan keinginan untuk hasil",
      "valueorg": "Perencana dan  pemecah masalah yang baik",
      "overuses": "Posisi dan cara mereka",
      "understress": "Menjadi gelisah, tidak sabar dan tidak sensitif",
      "fears": "Kehilangan dan gagal"
    }
  },
  "Implementor #9": {
    "strength": [
      "Menetapkan standar tinggi untuk diri sendiri dan orang lain, mengharapkan kinerja dan kerja sama tim",
      "Sadar dan peka terhadap resiko sebuah kesalahan",
      "Terstruktur dalam penggunaan waktu",
      "Sistematis memecahkan masalah tanpa membiarkan emosi mempengaruhi keputusan"
    ],
    "improve": [
      "Lebih hangat dan apresiasi anggota tim lainnya",
      "Lebih konsisten dengan keputusan-kuantitas dibandingkan kualitas",
      "Tidak begitu terus terang dan kritis terhadap orang-orang yang tidak memenuhi standar mereka"
    ],
    "tendencies": {
      "goal": "Dominasi dan perintis",
      "judge": "Standar mereka sendiri, ide-ide progresif",
      "influence": "Persaingan dan tantangan yang unik",
      "valueorg": "Memulai perubahan pada mereka sendiri",
      "overuses": "Keterusterangan, terlalu kritis",
      "understress": "Mengendalikan dan menuntut",
      "fears": "Tidak menjadi berpengaruh"
    }
  },
  "Conductor #57": {
    "strength": [
      "Kemampuan untuk memberikan ide-ide baru dan menyelesaikannya",
      "Menghargai orang lain yang pemain tim",
      "Kemampuan untuk melihat \"gambaran besar\" bersama dengan detail-detail kecil",
      "Ketetapan hati dan ketekunan"
    ],
    "improve": [
      "Tidak menjadi terlalu fokus pada satu masalah dan kehilangan kesempatan lainnya",
      "Kurangi kepedulian terhadap standar pribadi",
      "Memeriksa prioritas dengan orang lain"
    ],
    "tendencies": {
      "goal": "Penentu",
      "judge": "Jumlah pekerjaan yang telah diselesaikan",
      "influence": "Kegigihan dan ketekunan",
      "valueorg": "Berorientasi pada hasil secara konsistens",
      "overuses": "Ketergantungan pada diri",
      "understress": "Keras kepala, tenang dan tidak demonstratif",
      "fears": "Keterlibatan dengan terlalu banyak orang"
    }
  },
  "Conductor #27": {
    "strength": [
      "Mencapai hasil melalui orang",
      "Menghadapi hambatan dan tantangan dengan optimis",
      "Tujuan pribadi yang tinggi",
      "Rasa urgensi untuk membuat sesuatu terjadi"
    ],
    "improve": [
      "Menjadi lebih berhati-hati dengan detail",
      "Mengurangi kecepatan ketika mendelegasikan seluruh proyek",
      "Mengembangkan konsistensi ketika mendisiplinkan orang lain"
    ],
    "tendencies": {
      "goal": "Agresif bekerja melalui orang-orang untuk mencapai hasil",
      "judge": "Partisipasi dalam team",
      "influence": "Bujukan",
      "valueorg": "Inovasi dan futuristik",
      "overuses": "Kemauan yang kuat",
      "understress": "Tidak sabar dan mengendalikan",
      "fears": "Tidak mencapai tujuan yang diinginkan"
    }
  },
  "Conductor #42": {
    "strength": [
      "Kemampuan untuk mengekspresikan ide-ide tanpa emosional",
      "Konsentrasi pada tujuan dan isu-isu penting",
      "Hati-hati mengamati orang lain yang dapat mempengaruhi kinerja",
      "Kemampuan untuk menjelaskan data teknis secara jelas dan menerjemahkan teori ke dalam solusi yang bisa diterapkan"
    ],
    "improve": [
      "Berbagi pengetahuan, pikiran dan emosi dengan orang lain",
      "Tidak ragu-ragu untuk bertindak di bawah tekanan berat",
      "Lebih mengembangkan keterampilan yang berhubungan dengan orang dan kata-kata"
    ],
    "tendencies": {
      "goal": "Berdikari, dapat berdiri sendiri",
      "judge": "Pemahaman dan kekuatan penalaran",
      "influence": "Rasional, secara tak langsung",
      "valueorg": "Bisa memulai sendiri, berorientasi pada tujuan",
      "overuses": "Kemandirian",
      "understress": "Ambivalen dan pesimis",
      "fears": "Tenggat waktu tanpa waktu untuk jaminan kualitas"
    }
  },
  "Promoter #3": {
    "strength": [
      "Sangat optimis dengan rasa humor yang positif",
      "Menempatkan fokus pada orang dan kepercayaan yang tinggi dalam suatu hubungan",
      "Mengembangkan persahabatan secara cepat, menikmati jaringan/networking",
      "Menggunakan pendekatan konsensus untuk pengambilan keputusan"
    ],
    "improve": [
      "Menetapkan pandangan pada tujuan karir",
      "Kurangi kepedulian terhadap perasaan orang lain",
      "Menjadi terorganisir dan memiliki sikap yang realistis"
    ],
    "tendencies": {
      "goal": "Bersedia membantu dan akomodatif",
      "judge": "Kehangatan mereka",
      "influence": "Keramahan dan keterampilan interpersonal",
      "valueorg": "Mengkomunikasikan \"mimpi besar\", kemampuan untuk membawa tim bersama-sama",
      "overuses": "Ketergantungan pada orang lain dan optimis",
      "understress": "Emosional, terlalu percaya",
      "fears": "Tidak merasa disenangi"
    }
  },
  "Persuader #13": {
    "strength": [
      "Kemampuan untuk mempengaruhi orang untuk mengikuti cara berpikir mereka",
      "Berkomunikasi dengan cara yang sangat terbuka",
      "Kemampuan untuk menenangkan situasi konflik",
      "Kemampuan untuk mempromosikan ide-ide & produk baru"
    ],
    "improve": [
      "Kurangi membuat keputusan berdasarkan emosi",
      "Bersedia untuk konfrontasi bila diperlukan",
      "Membuat tenggat waktu yang realistis dan berlatih manajemen waktu yang baik"
    ],
    "tendencies": {
      "goal": "Menjaga persahabatan",
      "judge": "Kontak yang berpengaruh, komitmen",
      "influence": "Inspirasi dan karisma",
      "valueorg": "Stabil, dapat diandalkan, bersahabat",
      "overuses": "Antusiasme",
      "understress": "Terlalu lisan",
      "fears": "Kegagalan"
    }
  },
  "Relater #16": {
    "strength": [
      "Kemampuan untuk membantu orang lain menggunakan kehangatan, empati dan pemahaman",
      "Melindungi dan menghargai manusia serta segala sesuatu",
      "Pendengar & pembicara yang baik",
      ""
    ],
    "improve": [
      "Bersikap tegas dalam situasi tertentu",
      "Tidak menghindari konfrontasi, bahkan ketika berisiko",
      "Lebih inisiatif, rasa urgensi"
    ],
    "tendencies": {
      "goal": "Menjaga persahabatan jangka panjang",
      "judge": "Kesetiaan mereka kepada hubungan",
      "influence": "Hubungan pribadi, menetapkan contoh yang baik",
      "valueorg": "Pendengar yang baik, sabar terhadap orang lain",
      "overuses": "Toleransi",
      "understress": "Gelisah di bawah situasi stres",
      "fears": "Konfrontasi"
    }
  },
  "Promoter #58": {
    "strength": [
      "Kemampuan untuk menangani situasi sulit secara bijaksana, peka terhadap kebutuhan orang-orang",
      "Kemampuan untuk membuat suasana yang menyenangkan dan nyaman",
      "Kemampuan untuk mempromosikan ide-ide secara efektif",
      "Lebih menyukai lingkungan yang serba cepat"
    ],
    "improve": [
      "Mengurangi analisis",
      "Mengkomunikasikan informasi yang lebih sedikit ketika menjual produk atau ide",
      "Menjadi lebih tegas"
    ],
    "tendencies": {
      "goal": "Persetujuan dan penerimaan",
      "judge": "Kemampuan mereka untuk membaca petunjuk verbal dan nonverbal",
      "influence": "Ketenangan dan keyakinan",
      "valueorg": "Meredakan ketegangan dan mempromosikan orang dan proyek",
      "overuses": "Pengendalian percakapan",
      "understress": "Verbal, tajam terhadap orang lain",
      "fears": "Hilangnya keunikan"
    }
  },
  "Promoter #47": {
    "strength": [
      "Kemampuan untuk beradaptasi dalam berbagai situasi",
      "Pemain tim optimis, bersosialisasi dan kooperatif",
      "Akan berusaha untuk membawa tim bersama-sama dengan cara yang terorganisir dengan baik",
      "Kesabaran untuk mendengarkan apa yang orang lain katakan"
    ],
    "improve": [
      "Mengurangi akomodatif terhadap orang lain",
      "Lebih konsisten dalam menunjukkan ketegasan",
      "Lebih terusterangan dan manajemen waktu yang lebih baik"
    ],
    "tendencies": {
      "goal": "Hasil sistematis melalui orang lain",
      "judge": "Kemampuan mereka untuk berkomunikasi dan berpikir",
      "influence": "Diplomasi",
      "valueorg": "Hati-hati dan menarik",
      "overuses": "Posisi dan standar mereka",
      "understress": "Posesif dan terlalu sensitif",
      "fears": "Tidak menjadi bagian dari tim"
    }
  },
  "Promoter #30": {
    "strength": [
      "Kemampuan untuk menjadi persuasif, tegas dan mantap",
      "Kemampuan untuk mandiri jika diperlukan",
      "Kemampuan untuk membuat dan mempromosikan ide",
      "Kemampuan untuk mempresentasikan ide dengan cara yang positif dan agak langsung"
    ],
    "improve": [
      "Kurangi pendirian yang keras",
      "Mengumpulkan informasi yang cukup sebelum bertindak",
      "Lebih banyak perhatian terhadap detail, organisasi"
    ],
    "tendencies": {
      "goal": "Supel dan meyakinkan",
      "judge": "Dedikasi dan kegigihan mereka Mengambil tanggung jawab",
      "influence": "Mengambil tanggung jawab",
      "valueorg": "Antusiasme dan terus terang dengan ide-ide baru dan opini",
      "overuses": "Ambisi",
      "understress": "Dangkal",
      "fears": "Tidak terlihat sebagai pemain tim"
    }
  },
  "Supporter #5": {
    "strength": [
      "Kemampuan untuk memperkenalkan diri dengan cara yang tenang dan terkendali, menggunakan kemampuan untuk berkonsentrasi sebagai sarana untuk mendengarkan dan belajar",
      "Kemampuan untuk terus dengan tugas yang memberikan kontribusi yang berarti bagi organisasi",
      "Seorang anggota tim yang dapat terbuka, sabar dan toleran terhadap perbedaan",
      "Suka memuji orang lain"
    ],
    "improve": [
      "Memproyeksikan rasa urgensi ketika kebutuhan muncul",
      "Kurangi ketergantungan pada rutinitas",
      "Lebih inisiatif, kemampuan beradaptasi terhadap perubahan"
    ],
    "tendencies": {
      "goal": "Keteguhan dan stabilitas",
      "judge": "Konsistensi mereka",
      "influence": "Sebuah pengaturan menyenangkan, melayani orang lain",
      "valueorg": "Menstabilkan lingkungan dengan cara yang ramah",
      "overuses": "Ketenangan",
      "understress": "Non-ekspresif",
      "fears": "Tidak dihargai dan dikenal"
    }
  },
  "Coordinator #20": {
    "strength": [
      "Kemampuan untuk memulai sebuah proyek dan mengikutinya sampai selesai",
      "Bersedia bekerja untuk seorang pemimpin dan tujuan",
      "Unggul dalam mencari solusi untuk masalah melalui logika yang menyenangkan untuk semua yang terlibat",
      "Menunjukkan kepemimpinan yang positif melalui pertimbangan yang ditunjukkan oleh perasaan orang lain di tim"
    ],
    "improve": [
      "Belajar untuk mempromosikan diri sendiri",
      "Menggunakan pendekatan langsung",
      "Menampilkan kepedulian dan perasaan"
    ],
    "tendencies": {
      "goal": "Mencapai standar tinggi yang ditetapkan untuk diri sendiri",
      "judge": "Penggunaan pengetahuan",
      "influence": "Kemampuan untuk menindaklanjuti",
      "valueorg": "Menambahkan fokus dan logika terhadap kebutuhan yang ada",
      "overuses": "BERLEBIHAN MENGGUNAKAN : Resistensi terhadap perubahan",
      "understress": "Menjadi keras kepala",
      "fears": "Tidak memenuhi persyaratan tertentu"
    }
  },
  "Relater #17": {
    "strength": [
      "Keterampilan mendengarkan yang baik dengan kemampuan untuk berempati dengan orang-orang",
      "Terampil untuk membantu dan mendukung orang lain mencapai tujuan dan aspirasi",
      "Berbakat menerima sentimen orang-orang, keyakinan dan nilai-nilai",
      "Kemampuan untuk menciptakan lingkungan di mana orang merasa signifikan"
    ],
    "improve": [
      "Bersikap tegas",
      "Kurangi penerimaan akan status quo",
      "Lebih kuat, teguh dan ketegasan diri"
    ],
    "tendencies": {
      "goal": "Penerimaan",
      "judge": "Loyalitas, ketulusan, keteguhan",
      "influence": "Menawarkan pemahaman, persahabatan",
      "valueorg": "Mendukung, menyelaraskan dan menawarkan stabilitas di bawah tekanan",
      "overuses": "Kebaikan, kasih sayang",
      "understress": "Menyendiri",
      "fears": "Perpecahan, konflik, tidak disukai"
    }
  },
  "Supporter #59": {
    "strength": [
      "Kemampuan untuk menghadapi masalah dan menindaklanjutinya untuk diselesaikan",
      "Gigih, bertekad, ulet dan logis dalam mengejar hasil",
      "Unggul untuk mempertahankan hubungan baik di dalam dan di luar pekerjaan",
      "Pemain tim yang menunjukkan keterampilan kepemimpinan dan berpegang teguh atas keyakinan yang mereka percayai"
    ],
    "improve": [
      "Kurangi menunjukkan perilaku yang pasif, bahkan jika itu mempengaruhi keamanan mereka",
      "Menggunakan pemikiran baru dan kreatif saat memecahkan masalah",
      "Tidak menolak situasi baru yang mungkin keluar dari zona kenyamanan mereka"
    ],
    "tendencies": {
      "goal": "Prestasi pribadi",
      "judge": "Pencapaian dan keberhasilan mereka",
      "influence": "Ketekunan",
      "valueorg": "Bekerja secara independen dan menyukai tantangan",
      "overuses": "Keterusterangan",
      "understress": "Keras kepala, tidak fleksibel, keras hati",
      "fears": "Tidak mencapai hasil yang diinginkan"
    }
  },
  "Supporter #35": {
    "strength": [
      "Kemampuan untuk mendukung, ramah dan optimis dalam hubungan apapun",
      "Bersosialisasi dengan kemampuan untuk menikmati keunikan setiap manusia",
      "Kemampuan untuk menggunakan penilaian yang seimbang, membawa stabilitas kepada seluruh tim",
      "Baik untuk menganalisis situasi yang dapat dirasakan, disentuh, dilihat, didengar, diamati atau dialami secara pribadi"
    ],
    "improve": [
      "Tetap fokus pada peran dan harapan untuk menjadi efektif",
      "Memiliki rasa urgensi",
      "Penghargaan yang tulus metode jalan pintas"
    ],
    "tendencies": {
      "goal": "Status quo",
      "judge": "Persahabatan",
      "influence": "Konsistensi kinerja, akomodasi",
      "valueorg": "Perencana, konsistensi, mempertahankan kecepatan",
      "overuses": "Kesederhanaan, konservatif",
      "understress": "Dendam",
      "fears": "Konflik, kehilangan muka"
    }
  },
  "Supporter #50": {
    "strength": [
      "Kemampuan untuk berempati dengan perasaan orang lain dengan tetap menjaga independensi mereka sendiri",
      "Unggul di proyek yang memerlukan tekad dan ketekunan untuk menang",
      "Pengaruh positif terhadap anggota tim yang tidak kooperatif atau negatif",
      "Baik untuk membawa orang-orang untuk proses negosiasi dan mendengarkan pandangan yang bertentangan"
    ],
    "improve": [
      "Memprioritaskan kegiatan sehari-hari",
      "Lebih mengukur pro dan kontra",
      "Menjadi lebih tegas dan konsisten dalam keyakinan mereka"
    ],
    "tendencies": {
      "goal": "Sukses melalui konsistensi",
      "judge": "Persahabatan yang setia",
      "influence": "Keterampilan persuasif",
      "valueorg": "Memecahkan masalah secara kreatif dan bekerja untuk berinovasi melalui orang",
      "overuses": "Intensitas",
      "understress": "Bergairah, tegas",
      "fears": "Tidak didukung oleh tim dan perubahan"
    }
  }
}
;

export const discQuestions = [
  { id: 1, options: [ { label: "A. Lembut, ramah", value: "A" }, { label: "B. Membujuk, meyakinkan", value: "B" }, { label: "C. Sederhana, mudah menerima, rendah hati", value: "C" }, { label: "D. Asli, berdaya cipta, individualis", value: "D" } ] },
  { id: 2, options: [ { label: "A. Menarik, mempesona, menarik bagi orang lain", value: "A" }, { label: "B. Dapat bekerja sama, mudah menyetujui", value: "B" }, { label: "C. Keras kepala, tidak mudah menyerah", value: "C" }, { label: "D. Manis, memuaskan/menyenangkan", value: "D" } ] },
  { id: 3, options: [ { label: "A. Mau dipimpin, cenderung mengikuti/pengikut", value: "A" }, { label: "B. Tangguh, berani", value: "B" }, { label: "C. Loyal, setia, mengabdi", value: "C" }, { label: "D. Mempesona, menyenangkan", value: "D" } ] },
  { id: 4, options: [ { label: "A. Berpandangan terbuka, mau menerima", value: "A" }, { label: "B. Berani, suka menolong", value: "B" }, { label: "C. Pemelihara, berkemauan keras", value: "C" }, { label: "D. Periang, selalu bergembira", value: "D" } ] },
  { id: 5, options: [ { label: "A. Periang, suka bergurau", value: "A" }, { label: "B. Teliti, tepat", value: "B" }, { label: "C. Kasar, berani, kurang sopan, tidak mudah malu", value: "C" }, { label: "D. Tenang, emosi yang terkendali, tidak mudah heboh", value: "D" } ] },
  { id: 6, options: [ { label: "A. Kompetitif, selalu ingin berhasil", value: "A" }, { label: "B. Timbang rasa, peduli, bijaksana", value: "B" }, { label: "C. Terbuka, ramah, suka bersenang-senang", value: "C" }, { label: "D. Harmonis, mudah menyetujui", value: "D" } ] },
  { id: 7, options: [ { label: "A. Rewel, cerewet, sulit untuk dipuaskan hatinya", value: "A" }, { label: "B. Taat, melakukan apa yang diperintahkan, patuh", value: "B" }, { label: "C. Tidak mudah mundur, fokus akan satu hal, ulet", value: "C" }, { label: "D. Suka melucu, lincah, periang", value: "D" } ] },
  { id: 8, options: [ { label: "A. Berani, tidak gentar, tangguh", value: "A" }, { label: "B. Membangkitkan semangat, memotivasi", value: "B" }, { label: "C. Patuh, berhasil, menyerah", value: "C" }, { label: "D. Takut-takut, malu, pendiam", value: "D" } ] },
  { id: 9, options: [ { label: "A. Suka bergaul dan bersosialisasi", value: "A" }, { label: "B. Sabar, penuh keyakinan, bersikap toleransi", value: "B" }, { label: "C. Percaya diri, mandiri", value: "C" }, { label: "D. Berwatak halus/lembut, pendiam, suka menyendiri", value: "D" } ] },
  { id: 10, options: [ { label: "A. Menyukai hal-hal baru, suka tantangan", value: "A" }, { label: "B. Terbuka dan mau menerima ide-ide baru dan saran", value: "B" }, { label: "C. Ramah, hangat, bersahabat", value: "C" }, { label: "D. Moderat, menghindari hal-hal yang ekstrim atau aneh", value: "D" } ] },
  { id: 11, options: [ { label: "A. Banyak bicara, cerewet", value: "A" }, { label: "B. Terkendali, mandiri", value: "B" }, { label: "C. Melakukan hal-hal yang sudah biasa, tidak berlebihan", value: "C" }, { label: "D. Tegas, cepat dalam membuat keputusan", value: "D" } ] },
  { id: 12, options: [ { label: "A. Berbudi bahasa halus, tingkah laku yang halus", value: "A" }, { label: "B. Berani, suka mengambil resiko", value: "B" }, { label: "C. Diplomatik, bijaksana", value: "C" }, { label: "D. Mudah puas atau senang", value: "D" } ] },
  { id: 13, options: [ { label: "A. Agresif, suka tantangan, penuh inisiatif", value: "A" }, { label: "B. Menyukai hiburan, ramah, suka pesta/acara kumpul", value: "B" }, { label: "C. Pengikut, mudah diguna-dayakan oleh orang lain", value: "C" }, { label: "D. Gelisah, khawatir", value: "D" } ] },
  { id: 14, options: [ { label: "A. Berhati-hati", value: "A" }, { label: "B. Fokus pada satu hal tertentu, tidak mudah goyah", value: "B" }, { label: "C. Meyakinkan", value: "C" }, { label: "D. Baik hati, menyenangkan", value: "D" } ] },
  { id: 15, options: [ { label: "A. Rela berkorban, mengikuti arus", value: "A" }, { label: "B. Antusias, selalu ingin tahu", value: "B" }, { label: "C. Mudah menyetujui", value: "C" }, { label: "D. Lincah, antusias", value: "D" } ] },
  { id: 16, options: [ { label: "A. Percaya diri, yakin pada diri sendiri", value: "A" }, { label: "B. Simpatik, orang yang pengertian", value: "B" }, { label: "C. Toleran", value: "C" }, { label: "D. Tegas, agresif", value: "D" } ] },
  { id: 17, options: [ { label: "A. Disiplin, terkendali", value: "A" }, { label: "B. Dermawan, suka berbagi", value: "B" }, { label: "C. Suka berekspresi", value: "C" }, { label: "D. Gigih, tidak mudah menyerah", value: "D" } ] },
  { id: 18, options: [ { label: "A. Terpuji, dapat dikagumi, patut dipuji", value: "A" }, { label: "B. Ramah, senang menolong", value: "B" }, { label: "C. Mudah menyerah/menerima pendapat yang lain", value: "C" }, { label: "D. Memiliki karakter kuat, tangguh", value: "D" } ] },
  { id: 19, options: [ { label: "A. Menunjukkan rasa hormat", value: "A" }, { label: "B. Pelopor, perintis, giat, mau berusaha", value: "B" }, { label: "C. Optimis, pandangan positif", value: "C" }, { label: "D. Selalu siap membantu", value: "D" } ] },
  { id: 20, options: [ { label: "A. Dapat berargumentasi", value: "A" }, { label: "B. Fleksibel, mudah beradaptasi", value: "B" }, { label: "C. Naif, acuh tak acuh, tidak perhatian", value: "C" }, { label: "D. Riang, tiada yang dipikirkan sama sekali", value: "D" } ] },
  { id: 21, options: [ { label: "A. Dapat dipercaya, percaya kepada orang lain", value: "A" }, { label: "B. Mudah puas, selalu merasa cukup", value: "B" }, { label: "C. Selalu positif, tidak diragukan", value: "C" }, { label: "D. Tenang, pendiam", value: "D" } ] },
  { id: 22, options: [ { label: "A. Mudah bergaul, suka berteman", value: "A" }, { label: "B. Berbudaya, memiliki banyak pengetahuan", value: "B" }, { label: "C. Bersemangat, giat", value: "C" }, { label: "D. Toleransi, tidak tegas", value: "D" } ] },
  { id: 23, options: [ { label: "A. Menyenangkan, ramah", value: "A" }, { label: "B. Teliti, akurat", value: "B" }, { label: "C. Terus terang, bicara bebas", value: "C" }, { label: "D. Terkendali, emosi terkendali", value: "D" } ] },
  { id: 24, options: [ { label: "A. Resah, tidak bisa santai", value: "A" }, { label: "B. Baik hati, ramah", value: "B" }, { label: "C. Populer, disukai banyak orang", value: "C" }, { label: "D. Rapi, teratur", value: "D" } ] }
];

