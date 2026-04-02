export interface Product {
  id: number;
  slug: string;
  name: string;
  category: "Black Gold" | "Blue Gold" | "Red Gold" | "White Gold";
  img: string;
  price?: string;
  shortDesc: string;
  description: string;
  specs: {
    length?: string;
    ring?: string;
    shape?: string;
    strength?: string;
    wrapper?: string;
    binder?: string;
    filler?: string;
  };
}

export const ALL_PRODUCTS: Product[] = [
  // Black Gold (5)
  {
    id: 3,
    slug: "comandate-series-e",
    name: "Comandate Series E",
    category: "Black Gold",
    img: "/images/icons/black.png",
    shortDesc: "Puncak kemewahan dalam setiap hisapan, seri ultra-premium untuk penikmat sejati.",
    description: "Comandate Series E adalah mahakarya dari koleksi Black Gold. Dirancang untuk memberikan pengalaman yang mendalam dengan profil rasa yang kompleks dan evolusi aroma yang memikat dari awal hingga akhir.",
    specs: {
      length: "6 inci",
      ring: "52",
      shape: "Toro",
      strength: "Sedang hingga Berat",
      wrapper: "Nicaragua Habano",
      binder: "Nicaragua",
      filler: "Nicaragua Estelí & Jalapa"
    }
  },
  {
    id: 9,
    slug: "gran-torpedo-series-e",
    name: "Grend Torpedo Series E",
    category: "Black Gold",
    img: "/images/products/gran_torpedo_e.png",
    shortDesc: "Bentuk torpedo yang elegan dengan karakter rasa yang tajam dan terfokus.",
    description: "Gran Torpedo Series E menawarkan intensitas yang unik berkat ujungnya yang meruncing, memusatkan aliran asap untuk rasa yang lebih pekat.",
    specs: {
      length: "6 1/8 inci",
      ring: "52",
      shape: "Torpedo",
      strength: "Berat",
      wrapper: "Dark Ecuadorian Sumatra",
      binder: "Nicaraguan Habano",
      filler: "Nicaraguan Criollo '98"
    }
  },
  {
    id: 14,
    slug: "toro-especial-serie-f",
    name: "Toro Especial Serie F",
    category: "Black Gold",
    img: "/images/products/toro_especial_f.png",
    shortDesc: "Keseimbangan sempurna antara kekuatan dan kelembutan aroma.",
    description: "Serie F menghadirkan interpretasi baru dari ukuran Toro klasik. Dengan pembakaran yang lambat dan konsisten, cigar ini mengungkapkan catatan kayu cedar.",
    specs: {
      length: "6 inci",
      ring: "50",
      shape: "Toro",
      strength: "Sedang",
      wrapper: "Habano 2000",
      binder: "Indonesian Besuki",
      filler: "Nicaraguan & Dominican"
    }
  },
  {
    id: 18,
    slug: "toro-especial-serie-s",
    name: "Toro Especial Serie S",
    category: "Black Gold",
    img: "/images/icons/black.png",
    shortDesc: "Serie S yang misterius, dengan kekayaan rasa earthy yang mendominasi.",
    description: "Toro Especial Serie S adalah varian eksklusif dari koleksi Black Gold. Menggunakan tembakau yang ditanam di tanah vulkanik.",
    specs: {
      length: "6 inci",
      ring: "52",
      shape: "Toro",
      strength: "Sedang-Berat",
      wrapper: "San Andrés Maduro",
      binder: "Nicaragua",
      filler: "Nicaragua Estelí"
    }
  },
  {
    id: 19,
    slug: "toro-special-aniv",
    name: "Toro Special Aniv",
    category: "Black Gold",
    img: "/images/icons/black.png",
    shortDesc: "Edisi perayaan yang merangkum satu abad tradisi Montenegro.",
    description: "Toro Special Anniversary dibuat dalam jumlah yang sangat terbatas untuk memperingati tonggak sejarah brand ini.",
    specs: {
      length: "6 1/2 inci",
      ring: "54",
      shape: "Toro",
      strength: "Sedang",
      wrapper: "Habano Ecuador Aged",
      binder: "Nicaragua",
      filler: "Nicaragua Secret Blend"
    }
  },
  
  // Blue Gold (3)
  {
    id: 8,
    slug: "grand-robusto-blue",
    name: "Grand Robusto (Blue)",
    category: "Blue Gold",
    img: "/images/products/gran_robusto.png",
    shortDesc: "Klasik Robusto dengan sentuhan kemewahan modern.",
    description: "Grand Robusto dari seri Blue Gold adalah pilihan favorit bagi mereka yang menginginkan durasi merokok yang pas.",
    specs: {
      length: "5 inci",
      ring: "54",
      shape: "Robusto",
      strength: "Sedang",
      wrapper: "Connecticut Broadleaf",
      binder: "Nicaragua",
      filler: "Nicaragua & Brazil"
    }
  },
  {
    id: 12,
    slug: "toro-blue",
    name: "Toro (Blue)",
    category: "Blue Gold",
    img: "/images/products/toro.png",
    shortDesc: "Ukuran legendaris untuk sesi merokok yang santai namun berkelas.",
    description: "Toro Blue Gold memberikan volume asap yang melimpah dan profil rasa krimi yang khas.",
    specs: {
      length: "6 inci",
      ring: "52",
      shape: "Toro",
      strength: "Ringan hingga Sedang",
      wrapper: "Ecuadorian Connecticut",
      binder: "Honduras",
      filler: "Nicaragua"
    }
  },
  {
    id: 15,
    slug: "torpedo-blue",
    name: "Torpedo (Blue)",
    category: "Blue Gold",
    img: "/images/products/torpedo.png",
    shortDesc: "Elegansi torpedo dengan fokus rasa yang presisi.",
    description: "Torpedo Blue Gold menggabungkan pembakaran yang sempurna dengan aliran asap yang terkonsentrasi.",
    specs: {
      length: "6 1/8 inci",
      ring: "52",
      shape: "Torpedo",
      strength: "Sedang",
      wrapper: "Sumatra Ecuador",
      binder: "Nicaragua",
      filler: "Nicaragua Blend"
    }
  },

  // Red Gold (3)
  {
    id: 2,
    slug: "cigarillos-red",
    name: "Cigarillos",
    category: "Red Gold",
    img: "/images/products/cigarillos.png",
    shortDesc: "Kenikmatan premium dalam format ringkas untuk momen singkat Anda.",
    description: "Cigarillos Red Gold membawa kualitas tembakau premium Montenegro ke dalam ukuran yang lebih kecil.",
    specs: {
      length: "4 inci",
      ring: "30",
      shape: "Short Panatela",
      strength: "Sedang",
      wrapper: "Indonesian Java",
      binder: "Indonesia",
      filler: "Nicaragua Blend"
    }
  },
  {
    id: 6,
    slug: "gorditto-red",
    name: "Gorditto",
    category: "Red Gold",
    img: "/images/products/gorditto.png",
    shortDesc: "Kecil namun perkasa, dengan ring gauge besar untuk karakter asap yang tebal.",
    description: "Gorditto adalah tentang volume. Meskipun pendek, ring gauge-nya yang besar memungkinkan sensasi merokok yang penuh.",
    specs: {
      length: "4 1/2 inci",
      ring: "60",
      shape: "Nub",
      strength: "Berat",
      wrapper: "Mexican San Andrés",
      binder: "Nicaragua",
      filler: "Nicaragua Ligero"
    }
  },
  {
    id: 11,
    slug: "petit-corona-red",
    name: "Petit Corona",
    category: "Red Gold",
    img: "/images/icons/red.png",
    shortDesc: "Proporsi klasik untuk rasa yang berani.",
    description: "Petit Corona Red Gold adalah tentang intensitas. Dengan ring gauge yang lebih kecil, ia menonjolkan aroma wrapper.",
    specs: {
      length: "5 inci",
      ring: "42",
      shape: "Petit Corona",
      strength: "Sedang-Berat",
      wrapper: "Habano 2000",
      binder: "Indonesian Besuki",
      filler: "Nicaragua Jalapa"
    }
  },

  // White Gold (3)
  {
    id: 1,
    slug: "bomba-white",
    name: "Bomba",
    category: "White Gold",
    img: "/images/products/bomba.png",
    shortDesc: "Ledakan rasa yang unik dan tak terduga, koleksi terbatas bagi kolektor.",
    description: "Bomba dirancang untuk memberikan kejutan pada setiap tahap pembakaran.",
    specs: {
      length: "5 1/2 inci",
      ring: "50",
      shape: "Figurado",
      strength: "Sedang hingga Berat",
      wrapper: "Corojo '99",
      binder: "Nicaragua",
      filler: "Nicaragua & Peru"
    }
  },
  {
    id: 4,
    slug: "crucero-white",
    name: "Crucero",
    category: "White Gold",
    img: "/images/products/crucero.png",
    shortDesc: "Simbol petualangan rasa lintas samudera tembakau.",
    description: "Crucero menghadirkan perpaduan tembakau dari berbagai daerah.",
    specs: {
      length: "6 inci",
      ring: "52",
      shape: "Belicoso",
      strength: "Sedang",
      wrapper: "Connecticut Shade",
      binder: "Honduras",
      filler: "Multi-Country Blend"
    }
  },
  {
    id: 5,
    slug: "el-jefe-white",
    name: "El Jefe",
    category: "White Gold",
    img: "/images/products/eljefe.png",
    shortDesc: "Sang Pemimpin di kelasnya, ukuran besar untuk kepuasan yang tahan lama.",
    description: "El Jefe (The Boss) adalah cigar yang menuntut perhatian. Dengan ukuran yang dominan, ia menawarkan perjalanan rasa yang panjang.",
    specs: {
      length: "7 inci",
      ring: "58",
      shape: "Double Toro",
      strength: "Sedang +",
      wrapper: "Ecuadorian Habano",
      binder: "Dominican Republic",
      filler: "Nicaragua & Peru"
    }
  }
];
