import "dotenv/config";
import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

type PageSeed = {
  slug: string;
  titleId: string;
  titleEn: string;
  contentId: Record<string, unknown>;
  contentEn: Record<string, unknown>;
  images?: Record<string, string>;
};

const pages: PageSeed[] = [
  {
    slug: "home",
    titleId: "Home / Beranda",
    titleEn: "Home",
    contentId: {
      heroBadge: "Lintingan Tangan Premium",
      heroTitle: "Black Gold",
      heroEdition: "Edisi",
      heroDesc:
        "Dibuat untuk pria modern. Warisan tradisi selama satu abad yang terwujud dalam setiap hisapan, perpaduan tembakau kokoh dengan sentuhan akhir merah crimson yang halus.",
      explore: "Jelajahi Koleksi",
      about: "Tentang Kami",
      traditionTitle: "100 Tahun\nTradisi Cerutu",
      traditionDesc:
        "Selamat datang di Kilau Cigar Indonesia tempat di mana keanggunan bertemu dengan kejantanan dalam dunia cigar. Kami mengundang Anda untuk menjelajahi keindahan seni merokok yang tak tertandingi.",
      legacyTitle: "WARISAN",
      legacySubtitle: "Tembakau Asli",
      legacyDesc:
        "Warisan cita rasa yang melampaui waktu. Setiap batang cerutu kami bercerita tentang tradisi satu abad yang dibentuk oleh tangan-tangan ahli, menghasilkan simfoni rasa yang tak tertandingi dalam setiap hisapan.",
      ctaFind: "Temukan Koleksi Kami",
      differenceTitle: "Rasakan\nPerbedaannya",
      differenceDesc:
        "Kami melakukan segalanya dengan cara tradisional, mulai dari bajak sawah yang ditarik lembu, hingga petikan tangan dari tim kami yang menghabiskan waktu berbulan-bulan, hingga daun-daun yang dijahit tangan dan digantung untuk dikeringkan. Semua melalui proses fermentasi, pembuangan tulang daun, penyortiran, penuaan, penggulungan, hingga penyelesaian cerutu yang sempurna.",
      smokingExp: "Pengalaman\nMerokok Terbaik",
      smokingDesc:
        "Label emas mewah Montenegro Selección Privada dipadukan dengan pita Biru, Hitam, Putih & Merah yang membungkus cerutu buatan tangan yang penuh aroma dan digulung dengan sempurna.",
      recommended: "Rekomendasi\nProduk Cerutu",
    },
    contentEn: {
      heroBadge: "Premium Hand Rolled",
      heroTitle: "Black Gold",
      heroEdition: "Edition",
      heroDesc:
        "Crafted for the modern gentleman. A century of tradition in every puff, melding robust tobacco with a smooth crimson finish.",
      explore: "Explore Collection",
      about: "About Us",
      traditionTitle: "100 Years of\nCigar Tradition",
      traditionDesc:
        "Welcome to Kilau Cigar Indonesia, where elegance meets masculinity in the world of cigars. We invite you to explore the incomparable beauty of the art of smoking.",
      legacyTitle: "LEGACY",
      legacySubtitle: "Authentic Tobacco",
      legacyDesc:
        "A legacy of flavor that transcends time. Every single one of our cigars tells a century-old story shaped by expert hands, resulting in an unmatched symphony of flavor in every puff.",
      ctaFind: "Find Our Collection",
      differenceTitle: "Experience\nThe Difference",
      differenceDesc:
        "We do everything the traditional way, from ox-drawn plows to hand-picking by our team over months, to hand-sewn leaves hung to dry. All through the process of fermentation, leaf stripping, sorting, aging, rolling, to the perfect cigar finish.",
      smokingExp: "Ultimate\nSmoking Experience",
      smokingDesc:
        "The luxurious gold label Montenegro Selección Privada is paired with Blue, Black, White & Red bands wrapping perfectly rolled, aromatic hand-made cigars.",
      recommended: "Recommended\nCigar Products",
    },
    images: {
      heroImage: "/images/hero.png",
      legacyImage: "/uploads/products/black-toro-serie-s-box.png",
      differenceImage: "/uploads/products/black-comandante-serie-e-cardbox.png",
      smokingImage: "/uploads/products/blue-gran-robusto-box.png",
    },
  },
  {
    slug: "produk",
    titleId: "Halaman Produk",
    titleEn: "Products Page",
    contentId: {
      heroTitle: "Koleksi",
      heroSubtitle: "Cigar",
      heroDescription:
        "Temukan pilihan cigar premium terbaik kami. Dari koleksi Black Gold yang mendalam hingga keanggunan White Gold, setiap batang adalah mahakarya seni tembakau.",
    },
    contentEn: {
      heroTitle: "Cigar",
      heroSubtitle: "Collection",
      heroDescription:
        "Discover our finest premium cigar selection. From the deep Black Gold collection to the elegance of White Gold, every piece is a masterpiece of tobacco art.",
    },
  },
  {
    slug: "montenegro-black-gold",
    titleId: "Koleksi Black Gold",
    titleEn: "Black Gold Collection",
    contentId: {
      title: "Pilihan Montenegro\nBlack Gold Collection",
      desc: "Penting bagi kami untuk menekankan bahwa setiap langkah dalam pembuatan Cigar kami dilakukan dengan penuh dedikasi, dari pemilihan tembakau hingga tangan terampil yang membalutnya. Montenegro adalah simbol kebanggaan kami, sebuah mahakarya yang lahir dari tradisi panjang.",
    },
    contentEn: {
      title: "Montenegro's Choice\nBlack Gold Collection",
      desc: "It is important for us to emphasize that every step in the creation of our cigars is done with full dedication, from the selection of the tobacco to the skilled hands that wrap it. Montenegro is a symbol of our pride, a masterpiece born of long tradition.",
    },
    images: {
      leftImage: "/images/collections/black_left.png",
      rightImage: "/images/collections/black_right.png",
    },
  },
  {
    slug: "montenegro-blue-gold",
    titleId: "Koleksi Blue Gold",
    titleEn: "Blue Gold Collection",
    contentId: {
      title: "Pilihan Montenegro\nBlue Gold Collection",
      desc: "Koleksi Blue Gold menghadirkan perpaduan sempurna antara kekuatan dan kelembutan. Setiap batang dirancang untuk memberikan pengalaman merokok yang tenang namun mendalam bagi para penikmat sejati yang menghargai dedikasi dalam setiap helai daun tembakau.",
    },
    contentEn: {
      title: "Montenegro's Choice\nBlue Gold Collection",
      desc: "The Blue Gold collection presents a perfect blend of strength and softness. Each stick is designed to provide a calm yet deep smoking experience for true connoisseurs who appreciate the dedication in every leaf of tobacco.",
    },
    images: { mainImage: "/images/collections/blue_box.png" },
  },
  {
    slug: "montenegro-red-gold",
    titleId: "Koleksi Red Gold",
    titleEn: "Red Gold Collection",
    contentId: {
      title: "Pilihan Montenegro\nRed Gold Collection",
      desc: "Red Gold adalah perayaan tradisi dan semangat. Kami percaya bahwa keahlian tangan manusia memberikan sentuhan unik dalam setiap helai tembakau yang dirangkai dengan penuh dedikasi untuk menciptakan aroma yang kaya dan karakter yang berani.",
    },
    contentEn: {
      title: "Montenegro's Choice\nRed Gold Collection",
      desc: "Red Gold is a celebration of tradition and passion. We believe that human craftsmanship gives a unique touch to every leaf of tobacco that is meticulously assembled to create a rich aroma and bold character.",
    },
    images: { mainImage: "/images/products/gorditto_cardboard.png" },
  },
  {
    slug: "montenegro-white-gold",
    titleId: "Koleksi White Gold",
    titleEn: "White Gold Collection",
    contentId: {
      title: "Pilihan Montenegro\nWhite Gold Collection",
      desc: "Kemurnian dan keanggunan terpancar dari setiap helai tembakau dalam koleksi White Gold. Kami yakin bahwa dedikasi tangan manusia memberikan kompleksitas rasa yang ringan namun berkesan, merangkai mahakarya dalam setiap batang Cigar.",
    },
    contentEn: {
      title: "Montenegro's Choice\nWhite Gold Collection",
      desc: "Purity and elegance radiate from every leaf of tobacco in the White Gold collection. We are certain that human dedication provides a light yet memorable flavor complexity, weaving a masterpiece in every stick of cigar.",
    },
    images: { mainImage: "/images/products/eljefe.png" },
  },
  {
    slug: "tentang-kami",
    titleId: "Tentang Kami",
    titleEn: "About Us",
    contentId: {
      badge: "Tentang Kami",
      tagline:
        '"Selamat datang di Kilau Cigar Indonesia, tempat di mana keindahan dan keunggulan cerutu bersatu dalam setiap kenikmatan. Sejak pendirian kami, kami berkomitmen untuk menyajikan pengalaman cerutu terbaik, memadukan tradisi tembakau yang kokoh dengan inovasi modern."',
      historyBadge: "Sejarah Singkat",
      historyTitle: "Perjalanan",
      historySubtitle: "Penuh Tantangan",
      historyDesc1:
        "Didirikan pada tahun 2023, Kilau Cigar Indonesia berawal dari hasrat untuk membawa cerutu berkualitas tinggi kepada pecinta tembakau di seluruh dunia.",
      historyDesc2:
        "Melalui perjalanan yang penuh tantangan, kami telah tumbuh menjadi pemimpin industri yang diakui, terus menggabungkan kearifan tradisional dengan keunggulan modern.",
      experienceTitle: "Pengalaman Terbaik dengan Cerutu",
      experienceDesc:
        "Puncak kebanggaan kami adalah ketika setiap pecinta cerutu menemukan kebahagiaan sejati dalam setiap hirupan. Dari cerutu klasik hingga kreasi eksklusif, setiap produk kami adalah persembahan cinta untuk mereka yang menghargai seni merokok.",
      nicaraguaTitle: "Latar Belakang Cerutu Nicaragua",
      nicaraguaDesc:
        "Nicaragua, dengan tanah yang subur dan iklim yang ideal, telah menjadi tempat lahir bagi beberapa cerutu terbaik di dunia. Tembakau Nicaragua dikenal akan keberagamannya, memberikan nuansa bumi, kayu manis, dan cokelat yang unik pada cerutu.",
      innovationTitle: "Inovasi",
      innovationSubtitle: "Menikmati Cigar",
      innovationDesc:
        "Kami dengan proud memasukkan keahlian tembakau Nicaragua dalam koleksi kami, menghadirkan pengalaman merokok yang istimewa dan autentik.",
      quote: "Terus menciptakan pengalaman menikmati Cigar yang menginspirasi melalui inovasi dan kreasi tanpa henti.",
      heritage: "Kilau Cigar Indonesia",
      qualityTitle: "Kilau Cigar Indonesia",
      qualitySubtitle: "Selalu Memberikan Cigar Terbaik",
      qualityDesc:
        "Menghadirkan cerutu berkualitas tinggi dari seluruh dunia, dipilih dengan cermat untuk memastikan kenikmatan sejati bagi para penikmat cerutu di manapun berada.",
    },
    contentEn: {
      badge: "About Us",
      tagline:
        '"Welcome to Kilau Cigar Indonesia, where cigar beauty and excellence unite in every enjoyment. Since our founding, we have been committed to presenting the best cigar experience, blending robust tobacco traditions with modern innovation."',
      historyBadge: "Brief History",
      historyTitle: "A Journey",
      historySubtitle: "Full of Challenges",
      historyDesc1:
        "Founded in 2023, Kilau Cigar Indonesia began with a passion for bringing high-quality cigars to tobacco lovers worldwide.",
      historyDesc2:
        "Through a challenging journey, we have grown into a recognized industry leader, continuing to combine traditional wisdom with modern excellence.",
      experienceTitle: "The Ultimate Cigar Experience",
      experienceDesc:
        "Our ultimate pride is when every cigar lover finds true joy in every puff. From classic cigars to exclusive creations, every product is a labor of love for those who appreciate the art of smoking.",
      nicaraguaTitle: "Nicaraguan Cigar Background",
      nicaraguaDesc:
        "Nicaragua, with its fertile soil and ideal climate, has become the birthplace of some of the world's best cigars. Nicaraguan tobacco is known for its diversity, providing unique notes of earth, cinnamon, and chocolate to the cigar.",
      innovationTitle: "Innovation",
      innovationSubtitle: "Enjoying Cigars",
      innovationDesc:
        "We proudly incorporate Nicaraguan tobacco expertise into our collections, delivering a distinguished and authentic smoking experience.",
      quote: "Continuously creating inspiring cigar experiences through relentless innovation and creation.",
      heritage: "Kilau Cigar Indonesia",
      qualityTitle: "Kilau Cigar Indonesia",
      qualitySubtitle: "Always Providing the Best Cigars",
      qualityDesc:
        "Presenting high-quality cigars from around the world, carefully selected to ensure true enjoyment for cigar enthusiasts wherever they are.",
    },
    images: {
      heroImage: "/images/about/lifestyle.webp",
      portraitImage: "/images/about/portrait.webp",
      innovationImage: "/images/about/montenegro_box.png",
    },
  },
  {
    slug: "kontak",
    titleId: "Kontak",
    titleEn: "Contact",
    contentId: {
      title: "Pemesanan",
      subtitle: "Eksklusif",
      whatsapp: "6281120078910",
      email: "admin@kilaucigarindonesia.com",
      officeLabel: "Jakarta Selatan",
      officeAddress: "Jl. Dukuh Patra II No.75, RT.1/RW.13, Menteng Dalam, Kec. Tebet, Kota Jakarta Selatan",
    },
    contentEn: {
      title: "Exclusive",
      subtitle: "Ordering",
      whatsapp: "6281120078910",
      email: "admin@kilaucigarindonesia.com",
      officeLabel: "Jakarta Selatan",
      officeAddress: "Jl. Dukuh Patra II No.75, RT.1/RW.13, Menteng Dalam, Kec. Tebet, Kota Jakarta Selatan",
    },
    images: { heroImage: "/images/contact/hero.webp" },
  },
  {
    slug: "privacy",
    titleId: "Kebijakan Privasi",
    titleEn: "Privacy Policy",
    contentId: {
      intro:
        'Kilau Cigar Indonesia ("kami") menghormati privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat menggunakan situs dan layanan kami.',
      dataCollection:
        "Kami dapat mengumpulkan informasi seperti nama, alamat email, nomor WhatsApp, alamat pengiriman, dan detail pesanan yang Anda berikan saat menghubungi kami atau melakukan pemesanan.",
      dataUse:
        "Informasi yang dikumpulkan digunakan untuk memproses pesanan, memberikan layanan pelanggan, mengirimkan informasi produk, dan meningkatkan kualitas layanan kami.",
      dataSharing:
        "Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga. Data hanya dibagikan kepada mitra logistik/pengiriman sejauh diperlukan untuk memproses pesanan Anda.",
      cookies:
        "Situs kami dapat menggunakan cookies untuk meningkatkan pengalaman menjelajah Anda. Anda dapat menonaktifkan cookies melalui pengaturan browser, meskipun beberapa fitur situs mungkin tidak berfungsi optimal.",
      contact:
        "Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan hubungi kami melalui WhatsApp atau email yang tercantum di halaman Kontak.",
    },
    contentEn: {
      intro:
        'Kilau Cigar Indonesia ("we") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our site and services.',
      dataCollection:
        "We may collect information such as your name, email address, WhatsApp number, shipping address, and order details that you provide when contacting us or placing an order.",
      dataUse:
        "Collected information is used to process orders, provide customer service, send product information, and improve the quality of our service.",
      dataSharing:
        "We do not sell or rent your personal data to third parties. Data is only shared with logistics/shipping partners to the extent necessary to process your order.",
      cookies:
        "Our site may use cookies to improve your browsing experience. You can disable cookies through your browser settings, though some site features may not work optimally.",
      contact:
        "If you have questions about this Privacy Policy, please contact us via WhatsApp or the email listed on the Contact page.",
    },
  },
  {
    slug: "shipping",
    titleId: "Kebijakan Pengiriman",
    titleEn: "Shipping Policy",
    contentId: {
      intro: "Kebijakan Pengiriman ini menjelaskan bagaimana Kilau Cigar Indonesia memproses dan mengirimkan pesanan Anda.",
      processingTime: "Pesanan yang telah dikonfirmasi akan diproses dalam 1-3 hari kerja sebelum dikirimkan.",
      shippingArea: "Kami melayani pengiriman ke seluruh wilayah Indonesia melalui jasa ekspedisi rekanan.",
      shippingCost:
        "Biaya dan estimasi waktu pengiriman akan diinformasikan saat konfirmasi pesanan via WhatsApp, mengikuti tarif ekspedisi yang berlaku dan lokasi tujuan.",
      packaging: "Setiap produk dikemas dengan material pelindung khusus untuk menjaga kualitas cerutu selama proses pengiriman.",
      damagedItems:
        "Apabila produk diterima dalam kondisi rusak akibat proses pengiriman, segera hubungi kami maksimal 2x24 jam setelah barang diterima disertai foto/video bukti untuk proses klaim.",
    },
    contentEn: {
      intro: "This Shipping Policy explains how Kilau Cigar Indonesia processes and delivers your orders.",
      processingTime: "Confirmed orders are processed within 1-3 business days before shipment.",
      shippingArea: "We ship to all regions across Indonesia through our partner courier services.",
      shippingCost:
        "Shipping cost and estimated delivery time will be informed during order confirmation via WhatsApp, based on the applicable courier rates and destination.",
      packaging: "Every product is packed with special protective material to preserve cigar quality during shipping.",
      damagedItems:
        "If a product arrives damaged due to shipping, please contact us within 2x24 hours of receipt with photo/video evidence for the claim process.",
    },
  },
  {
    slug: "terms",
    titleId: "Syarat & Ketentuan",
    titleEn: "Terms of Service",
    contentId: {
      intro: "Dengan mengakses dan menggunakan situs Kilau Cigar Indonesia, Anda menyetujui syarat dan ketentuan berikut.",
      ageRestriction:
        "Produk yang kami jual adalah produk tembakau dan hanya diperuntukkan bagi konsumen berusia 21 tahun ke atas. Dengan melakukan pemesanan, Anda menyatakan telah memenuhi batas usia yang berlaku sesuai peraturan perundang-undangan yang berlaku di Indonesia.",
      orderTerms:
        "Pemesanan dilakukan melalui WhatsApp berdasarkan ketersediaan stok. Konfirmasi pesanan dianggap sah setelah pembeli dan penjual menyepakati detail produk, harga, dan metode pengiriman.",
      pricingTerms: "Harga yang tercantum di situs dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Harga final akan dikonfirmasi saat proses pemesanan.",
      ipTerms:
        "Seluruh konten di situs ini, termasuk logo, gambar produk, dan teks, adalah milik Kilau Cigar Indonesia dan dilindungi oleh hukum hak cipta yang berlaku.",
      liabilityTerms:
        "Kilau Cigar Indonesia tidak bertanggung jawab atas kerugian yang timbul akibat penyalahgunaan produk atau penggunaan yang tidak sesuai dengan peruntukannya.",
      governingLaw: "Syarat dan Ketentuan ini tunduk pada hukum yang berlaku di Republik Indonesia.",
    },
    contentEn: {
      intro: "By accessing and using the Kilau Cigar Indonesia website, you agree to the following terms and conditions.",
      ageRestriction:
        "The products we sell are tobacco products and are intended only for consumers aged 21 and above. By placing an order, you confirm that you meet the applicable age requirement under the laws of Indonesia.",
      orderTerms:
        "Orders are placed via WhatsApp based on stock availability. An order is considered confirmed once the buyer and seller agree on product details, price, and shipping method.",
      pricingTerms: "Prices listed on the site are subject to change without prior notice. The final price will be confirmed during the ordering process.",
      ipTerms:
        "All content on this site, including logos, product images, and text, is the property of Kilau Cigar Indonesia and is protected under applicable copyright law.",
      liabilityTerms:
        "Kilau Cigar Indonesia is not liable for any losses arising from misuse of the product or use inconsistent with its intended purpose.",
      governingLaw: "These Terms of Service are governed by the laws of the Republic of Indonesia.",
    },
  },
  {
    slug: "faq",
    titleId: "Pertanyaan Umum",
    titleEn: "Frequently Asked Questions",
    contentId: {
      q1: "Apakah cerutu Kilau Cigar Indonesia asli dan legal?",
      a1: "Ya, seluruh produk kami adalah cerutu premium asli yang dipasarkan sesuai dengan ketentuan yang berlaku di Indonesia.",
      q2: "Bagaimana cara memesan produk?",
      a2: "Anda dapat memesan melalui tombol WhatsApp di situs kami atau mengisi formulir di halaman Kontak. Tim kami akan membantu proses pemesanan dan pembayaran.",
      q3: "Metode pembayaran apa saja yang tersedia?",
      a3: "Pembayaran dapat dilakukan melalui transfer bank yang akan diinformasikan oleh tim kami saat proses konfirmasi pesanan via WhatsApp.",
      q4: "Berapa lama waktu pengiriman?",
      a4: "Estimasi waktu pengiriman bervariasi tergantung lokasi tujuan dan jasa ekspedisi yang dipilih, umumnya 2-7 hari kerja setelah pesanan diproses.",
      q5: "Bagaimana cara menyimpan cerutu agar tetap awet?",
      a5: "Simpan cerutu di tempat sejuk dengan kelembapan terjaga (idealnya menggunakan humidor) dan hindari paparan sinar matahari langsung.",
      q6: "Apakah bisa custom jumlah pesanan (satuan/box)?",
      a6: "Bisa. Sebagian besar produk kami tersedia dalam pilihan satuan, card box, maupun wooden box sesuai ketersediaan stok.",
    },
    contentEn: {
      q1: "Are Kilau Cigar Indonesia cigars authentic and legal?",
      a1: "Yes, all our products are authentic premium cigars marketed in accordance with applicable regulations in Indonesia.",
      q2: "How do I place an order?",
      a2: "You can order via the WhatsApp button on our site or fill out the form on the Contact page. Our team will assist with the ordering and payment process.",
      q3: "What payment methods are available?",
      a3: "Payment can be made via bank transfer, which will be provided by our team during order confirmation via WhatsApp.",
      q4: "How long does shipping take?",
      a4: "Estimated delivery time varies depending on destination and chosen courier, generally 2-7 business days after the order is processed.",
      q5: "How should I store cigars to keep them fresh?",
      a5: "Store cigars in a cool place with controlled humidity (ideally in a humidor) and avoid direct sunlight exposure.",
      q6: "Can I customize the order quantity (single/box)?",
      a6: "Yes. Most of our products are available as single sticks, card boxes, or wooden boxes depending on stock availability.",
    },
  },
];

async function main() {
  for (const p of pages) {
    const contentId = { ...p.contentId, images: p.images ?? {} };
    await prisma.page.upsert({
      where: { slug: p.slug },
      update: {
        titleId: p.titleId,
        titleEn: p.titleEn,
        contentId: contentId as Prisma.InputJsonValue,
        contentEn: p.contentEn as Prisma.InputJsonValue,
        status: "PUBLISHED",
      },
      create: {
        slug: p.slug,
        titleId: p.titleId,
        titleEn: p.titleEn,
        contentId: contentId as Prisma.InputJsonValue,
        contentEn: p.contentEn as Prisma.InputJsonValue,
        status: "PUBLISHED",
      },
    });
    console.log(`seeded page: ${p.slug}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
