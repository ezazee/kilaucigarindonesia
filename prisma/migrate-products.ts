import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

type Variant = { packagingType: "SATUAN" | "CARD_BOX" | "WOODEN_BOX"; price: number; qtyPerBox?: number };

interface ProductSeed {
  slug: string;
  categorySlug: string;
  nameId: string;
  nameEn: string;
  shortDescId: string;
  shortDescEn: string;
  descriptionId: string;
  descriptionEn: string;
  length?: string;
  ring?: string;
  shape?: string;
  strengthId?: string;
  strengthEn?: string;
  wrapper?: string;
  binder?: string;
  filler?: string;
  stockStatus: "READY" | "SOLD_OUT" | "DISCONTINUED";
  mainImage?: string;
  boxImage?: string;
  variants: Variant[];
}

// Specs are cross-checked across 3 official sources: "Katalog Montenegro.docx",
// "PL Montenegro Cigar 2026.pdf" (price list), and "Katalog Cigar Montenegro .pdf"
// (the full photo catalog). Where sources disagree on size, the value agreed by
// 2 of 3 sources wins (docx has the most typos on fractional lengths). Where the
// docx leaves a spec fully blank (10 Aniversario / Toro 10 Aniversario), it is
// left blank here too rather than guessed — all 3 sources agree it's unspecified.
// Packaging/pricing always comes from the price list PDF.
const products: ProductSeed[] = [
  // ---- Black Gold ----
  {
    slug: "toro-10-aniversario",
    categorySlug: "black-gold",
    nameId: "Toro 10 Aniversario",
    nameEn: "Toro 10th Anniversary",
    shortDescId: "Edisi perayaan yang merangkum satu dekade tradisi Montenegro.",
    shortDescEn: "An anniversary edition capturing a decade of Montenegro tradition.",
    descriptionId: "Toro 10 Aniversario dibuat untuk memperingati tonggak sejarah brand ini.",
    descriptionEn: "Toro 10th Anniversary was crafted to mark a milestone for the brand.",
    length: "6", ring: "60",
    stockStatus: "READY",
    mainImage: "black-toro-10-aniversario.png",
    boxImage: "black-toro-10-aniversario-box.png",
    variants: [{ packagingType: "SATUAN", price: 430000 }],
  },
  {
    slug: "10-aniversario",
    categorySlug: "black-gold",
    nameId: "10 Aniversario",
    nameEn: "10th Anniversary",
    shortDescId: "Cerutu edisi khusus 10 tahun, kekuatan dan kompleksitas dalam satu batang.",
    shortDescEn: "A special 10th-anniversary cigar, blending strength and complexity in one stick.",
    descriptionId: "10 Aniversario menghadirkan blend eksklusif yang dirancang untuk perayaan satu dekade Montenegro Cigar.",
    descriptionEn: "10th Anniversary features an exclusive blend crafted to celebrate a decade of Montenegro Cigar.",
    length: "6", ring: "60",
    stockStatus: "READY",
    mainImage: "black-10-aniversario.png",
    boxImage: "black-10-aniversario-box.png",
    variants: [{ packagingType: "SATUAN", price: 340000 }],
  },
  {
    slug: "gran-torpedo-serie-e",
    categorySlug: "black-gold",
    nameId: "Gran Torpedo Serie E",
    nameEn: "Gran Torpedo Serie E",
    shortDescId: "Bentuk torpedo yang elegan dengan karakter rasa yang tajam dan terfokus.",
    shortDescEn: "An elegant torpedo shape with a sharp, focused flavor character.",
    descriptionId: "Gran Torpedo Serie E menawarkan intensitas yang unik berkat ujungnya yang meruncing, memusatkan aliran asap untuk rasa yang lebih pekat.",
    descriptionEn: "Gran Torpedo Serie E offers a unique intensity thanks to its tapered tip, concentrating the smoke for a denser flavor.",
    length: "7", ring: "60", shape: "Torpedo", strengthId: "Sedang - Berat", strengthEn: "Medium - Full",
    wrapper: "Ecuadorian Habano", binder: "Nicaragua", filler: "Nicaragua",
    stockStatus: "READY",
    mainImage: "black-gran-torpedo-serie-e.png",
    boxImage: "black-gran-torpedo-serie-e-cardbox.png",
    variants: [
      { packagingType: "SATUAN", price: 420000 },
      { packagingType: "CARD_BOX", price: 1400000, qtyPerBox: 3 },
      { packagingType: "WOODEN_BOX", price: 4650000, qtyPerBox: 20 },
    ],
  },
  {
    slug: "toro-serie-f",
    categorySlug: "black-gold",
    nameId: "Toro Serie F",
    nameEn: "Toro Serie F",
    shortDescId: "Keseimbangan sempurna antara kekuatan dan kelembutan aroma.",
    shortDescEn: "A perfect balance between strength and a gentle aroma.",
    descriptionId: "Serie F menghadirkan interpretasi baru dari ukuran Toro klasik.",
    descriptionEn: "Serie F offers a new take on the classic Toro size.",
    length: "5½", ring: "55", shape: "Toro", strengthId: "Sedang - Berat", strengthEn: "Medium - Full",
    wrapper: "Ecuadorian Habano", binder: "Nicaragua", filler: "Nicaragua",
    stockStatus: "READY",
    mainImage: "black-toro-serie-f.png",
    boxImage: "black-toro-serie-f-box.png",
    variants: [
      { packagingType: "SATUAN", price: 370000 },
      { packagingType: "WOODEN_BOX", price: 8000000, qtyPerBox: 20 },
    ],
  },
  {
    slug: "comandante-serie-e",
    categorySlug: "black-gold",
    nameId: "Comandante Serie E",
    nameEn: "Comandante Serie E",
    shortDescId: "Puncak kemewahan dalam setiap hisapan, seri ultra-premium untuk penikmat sejati.",
    shortDescEn: "The pinnacle of luxury in every draw, an ultra-premium series for true connoisseurs.",
    descriptionId: "Comandante Serie E adalah mahakarya dari koleksi Black Gold, dirancang untuk memberikan pengalaman yang mendalam.",
    descriptionEn: "Comandante Serie E is a masterpiece from the Black Gold collection, designed to deliver a deep experience.",
    length: "7", ring: "60", strengthId: "Sedang", strengthEn: "Medium",
    wrapper: "Ecuadorian Habano", binder: "Nicaragua", filler: "Nicaragua",
    stockStatus: "READY",
    mainImage: "black-comandante-serie-e.png",
    boxImage: "black-comandante-serie-e-cardbox.png",
    variants: [
      { packagingType: "SATUAN", price: 420000 },
      { packagingType: "CARD_BOX", price: 1400000, qtyPerBox: 3 },
    ],
  },
  {
    slug: "toro-serie-s",
    categorySlug: "black-gold",
    nameId: "Toro Especial Serie S",
    nameEn: "Toro Especial Serie S",
    shortDescId: "Serie S yang misterius, dengan kekayaan rasa earthy yang mendominasi.",
    shortDescEn: "The mysterious Serie S, dominated by rich earthy flavors.",
    descriptionId: "Toro Especial Serie S adalah varian eksklusif dari koleksi Black Gold.",
    descriptionEn: "Toro Especial Serie S is an exclusive variant from the Black Gold collection.",
    length: "5½", ring: "55", shape: "Toro", strengthId: "Mild - Sedang", strengthEn: "Mild - Medium",
    wrapper: "Connecticut", binder: "Nicaragua", filler: "Nicaragua",
    stockStatus: "READY",
    mainImage: "black-toro-serie-s.png",
    boxImage: "black-toro-serie-s-box.png",
    variants: [{ packagingType: "WOODEN_BOX", price: 8000000, qtyPerBox: 20 }],
  },
  {
    slug: "toro-especial-serie-e",
    categorySlug: "black-gold",
    nameId: "Toro Especial Serie E",
    nameEn: "Toro Especial Serie E",
    shortDescId: "Varian Serie E dengan karakter rasa yang tajam dan elegan.",
    shortDescEn: "The Serie E variant with a sharp, elegant flavor character.",
    descriptionId: "Toro Especial Serie E menghadirkan interpretasi lain dari seri E dengan ukuran Toro yang lebih ringkas.",
    descriptionEn: "Toro Especial Serie E offers another take on the E series in a more compact Toro size.",
    length: "5½", ring: "55", shape: "Toro", strengthId: "Sedang - Berat", strengthEn: "Medium - Full",
    wrapper: "Ecuadorian Habano", binder: "Nicaragua", filler: "Nicaragua",
    stockStatus: "SOLD_OUT",
    variants: [],
  },

  // ---- Blue Gold ----
  {
    slug: "gran-robusto-blue",
    categorySlug: "blue-gold",
    nameId: "Gran Robusto",
    nameEn: "Gran Robusto",
    shortDescId: "Klasik Robusto dengan sentuhan kemewahan modern.",
    shortDescEn: "A classic Robusto with a touch of modern luxury.",
    descriptionId: "Gran Robusto dari seri Blue Gold adalah pilihan favorit bagi mereka yang menginginkan durasi merokok yang pas.",
    descriptionEn: "Gran Robusto from the Blue Gold series is a favorite for those who want just the right smoking duration.",
    length: "5", ring: "60", shape: "Robusto", strengthId: "Sedang - Berat", strengthEn: "Medium - Full",
    wrapper: "Ecuadorian Habano", binder: "Nicaragua", filler: "Nicaragua",
    stockStatus: "READY",
    mainImage: "blue-gran-robusto.png",
    boxImage: "blue-gran-robusto-box.png",
    variants: [
      { packagingType: "SATUAN", price: 310000 },
      { packagingType: "WOODEN_BOX", price: 6750000, qtyPerBox: 20 },
    ],
  },
  {
    slug: "toro-blue",
    categorySlug: "blue-gold",
    nameId: "Toro",
    nameEn: "Toro",
    shortDescId: "Ukuran legendaris untuk sesi merokok yang santai namun berkelas.",
    shortDescEn: "A legendary size for a relaxed yet classy smoking session.",
    descriptionId: "Toro Blue Gold memberikan volume asap yang melimpah dan profil rasa krimi yang khas.",
    descriptionEn: "Toro Blue Gold delivers an abundant smoke volume and a signature creamy flavor profile.",
    length: "5½", ring: "55", shape: "Toro", strengthId: "Sedang - Berat", strengthEn: "Medium - Full",
    wrapper: "Ecuadorian Habano", binder: "Nicaragua", filler: "Nicaragua",
    stockStatus: "READY",
    mainImage: "blue-toro.png",
    boxImage: "blue-toro-box.png",
    variants: [
      { packagingType: "SATUAN", price: 310000 },
      { packagingType: "WOODEN_BOX", price: 7200000, qtyPerBox: 20 },
    ],
  },
  {
    slug: "torpedo-blue",
    categorySlug: "blue-gold",
    nameId: "Torpedo",
    nameEn: "Torpedo",
    shortDescId: "Elegansi torpedo dengan fokus rasa yang presisi.",
    shortDescEn: "Torpedo elegance with a precise flavor focus.",
    descriptionId: "Torpedo Blue Gold menggabungkan pembakaran yang sempurna dengan aliran asap yang terkonsentrasi.",
    descriptionEn: "Torpedo Blue Gold combines a perfect burn with a concentrated smoke flow.",
    length: "6", ring: "54", shape: "Torpedo", strengthId: "Sedang", strengthEn: "Medium",
    wrapper: "Ecuadorian Habano", binder: "Nicaragua", filler: "Nicaragua",
    stockStatus: "READY",
    mainImage: "blue-torpedo.png",
    boxImage: "blue-torpedo-box.png",
    variants: [{ packagingType: "WOODEN_BOX", price: 6750000, qtyPerBox: 20 }],
  },

  // ---- Red Gold ----
  {
    slug: "gorditto-red",
    categorySlug: "red-gold",
    nameId: "Gorditto",
    nameEn: "Gorditto",
    shortDescId: "Kecil namun perkasa, dengan ring gauge besar untuk karakter asap yang tebal.",
    shortDescEn: "Small but mighty, with a large ring gauge for a bold smoke character.",
    descriptionId: "Gorditto adalah tentang volume. Meskipun pendek, ring gauge-nya yang besar memungkinkan sensasi merokok yang penuh.",
    descriptionEn: "Gorditto is all about volume. Though short, its large ring gauge delivers a full smoking sensation.",
    length: "4", ring: "64", strengthId: "Sedang", strengthEn: "Medium",
    wrapper: "Ecuadorian Habano", binder: "Nicaragua", filler: "Nicaragua",
    stockStatus: "READY",
    mainImage: "red-gorditto.png",
    boxImage: "red-gorditto-box.png",
    variants: [
      { packagingType: "SATUAN", price: 350000 },
      { packagingType: "CARD_BOX", price: 1550000, qtyPerBox: 4 },
    ],
  },
  {
    slug: "petit-corona-red",
    categorySlug: "red-gold",
    nameId: "Petite Corona",
    nameEn: "Petite Corona",
    shortDescId: "Proporsi klasik untuk rasa yang berani.",
    shortDescEn: "Classic proportions for a bold flavor.",
    descriptionId: "Petite Corona Red Gold adalah tentang intensitas. Dengan ring gauge yang lebih kecil, ia menonjolkan aroma wrapper.",
    descriptionEn: "Petite Corona Red Gold is about intensity. With a smaller ring gauge, it highlights the wrapper's aroma.",
    length: "5½", ring: "42", strengthId: "Sedang", strengthEn: "Medium",
    wrapper: "Ecuadorian Habano", binder: "Nicaragua", filler: "Nicaragua",
    stockStatus: "READY",
    mainImage: "red-petit-corona.png",
    boxImage: "red-petit-corona-box.png",
    variants: [{ packagingType: "SATUAN", price: 310000 }],
  },
  {
    slug: "cigarillos-red",
    categorySlug: "red-gold",
    nameId: "Cigarillos",
    nameEn: "Cigarillos",
    shortDescId: "Kenikmatan premium dalam format ringkas untuk momen singkat Anda.",
    shortDescEn: "Premium enjoyment in a compact format for your quick moments.",
    descriptionId: "Cigarillos Red Gold membawa kualitas tembakau premium Montenegro ke dalam ukuran yang lebih kecil.",
    descriptionEn: "Cigarillos Red Gold brings Montenegro's premium tobacco quality into a smaller size.",
    length: "4", ring: "30", strengthId: "Sedang", strengthEn: "Medium",
    wrapper: "Indonesian Besuki", binder: "Nicaragua", filler: "Nicaragua",
    stockStatus: "SOLD_OUT",
    mainImage: "red-cigarillos.png",
    boxImage: "red-cigarillos-cardbox.png",
    variants: [],
  },

  // ---- White Gold ----
  {
    slug: "bomba-white",
    categorySlug: "white-gold",
    nameId: "Bomba",
    nameEn: "Bomba",
    shortDescId: "Ledakan rasa yang unik dan tak terduga, koleksi terbatas bagi kolektor.",
    shortDescEn: "A unique, unexpected burst of flavor, a limited collection for collectors.",
    descriptionId: "Bomba dirancang untuk memberikan kejutan pada setiap tahap pembakaran.",
    descriptionEn: "Bomba is designed to deliver a surprise at every stage of the burn.",
    length: "4", ring: "64", strengthId: "Full", strengthEn: "Full",
    wrapper: "Ecuadorian Habano", binder: "Nicaragua", filler: "Nicaragua",
    stockStatus: "READY",
    mainImage: "white-bomba.png",
    boxImage: "white-bomba-box.png",
    variants: [
      { packagingType: "SATUAN", price: 435000 },
      { packagingType: "WOODEN_BOX", price: 9300000, qtyPerBox: 20 },
    ],
  },
  {
    slug: "crucero-white",
    categorySlug: "white-gold",
    nameId: "Crucero",
    nameEn: "Crucero",
    shortDescId: "Simbol petualangan rasa lintas samudera tembakau.",
    shortDescEn: "A symbol of a flavor adventure across tobacco-growing regions.",
    descriptionId: "Crucero menghadirkan perpaduan tembakau dari berbagai daerah.",
    descriptionEn: "Crucero brings together a blend of tobacco from various regions.",
    length: "5¼", ring: "56", strengthId: "Sedang - Berat", strengthEn: "Medium - Full",
    wrapper: "Ecuadorian Habano", binder: "Nicaragua", filler: "Nicaragua",
    stockStatus: "READY",
    mainImage: "white-crucero.png",
    boxImage: "white-crucero-box.png",
    variants: [
      { packagingType: "SATUAN", price: 420000 },
      { packagingType: "WOODEN_BOX", price: 9300000, qtyPerBox: 20 },
    ],
  },
  {
    slug: "el-jefe-white",
    categorySlug: "white-gold",
    nameId: "El Jefe",
    nameEn: "El Jefe",
    shortDescId: "Sang Pemimpin di kelasnya, ukuran besar untuk kepuasan yang tahan lama.",
    shortDescEn: "The Boss of its class, a large size for long-lasting satisfaction.",
    descriptionId: "El Jefe (The Boss) adalah cigar yang menuntut perhatian. Dengan ukuran yang dominan, ia menawarkan perjalanan rasa yang panjang.",
    descriptionEn: "El Jefe (The Boss) is a cigar that demands attention. With its dominant size, it offers a long flavor journey.",
    length: "8¼", ring: "60", strengthId: "Sedang - Berat", strengthEn: "Medium - Full",
    wrapper: "Ecuadorian Habano", binder: "Nicaragua", filler: "Nicaragua",
    stockStatus: "READY",
    mainImage: "white-el-jefe.png",
    boxImage: "white-el-jefe-box.png",
    variants: [{ packagingType: "SATUAN", price: 520000 }],
  },
];

async function main() {
  const categories = await prisma.category.findMany();
  const categoryIdBySlug = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  for (const [index, p] of products.entries()) {
    const categoryId = categoryIdBySlug[p.categorySlug];
    if (!categoryId) {
      console.error(`Category not found: ${p.categorySlug}, skipping ${p.slug}`);
      continue;
    }

    const images = [];
    if (p.mainImage) images.push({ url: `/uploads/products/${p.mainImage}`, alt: `${p.nameId} - Kilau Cigar Indonesia` });
    if (p.boxImage) images.push({ url: `/uploads/products/${p.boxImage}`, alt: `${p.nameId} Box - Kilau Cigar Indonesia` });

    const mediaRecords = [];
    for (const img of images) {
      const existing = await prisma.media.findFirst({ where: { url: img.url } });
      const media = existing ?? (await prisma.media.create({ data: { url: img.url, alt: img.alt } }));
      mediaRecords.push(media);
    }

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        nameId: p.nameId, nameEn: p.nameEn,
        shortDescId: p.shortDescId, shortDescEn: p.shortDescEn,
        descriptionId: p.descriptionId, descriptionEn: p.descriptionEn,
        length: p.length, ring: p.ring, shape: p.shape,
        strengthId: p.strengthId, strengthEn: p.strengthEn,
        wrapper: p.wrapper, binder: p.binder, filler: p.filler,
        stockStatus: p.stockStatus,
        categoryId,
        order: index,
        images: { set: mediaRecords.map((m) => ({ id: m.id })) },
      },
      create: {
        slug: p.slug,
        nameId: p.nameId, nameEn: p.nameEn,
        shortDescId: p.shortDescId, shortDescEn: p.shortDescEn,
        descriptionId: p.descriptionId, descriptionEn: p.descriptionEn,
        length: p.length, ring: p.ring, shape: p.shape,
        strengthId: p.strengthId, strengthEn: p.strengthEn,
        wrapper: p.wrapper, binder: p.binder, filler: p.filler,
        stockStatus: p.stockStatus,
        categoryId,
        order: index,
        images: { connect: mediaRecords.map((m) => ({ id: m.id })) },
        variants: { create: p.variants.map((v) => ({ packagingType: v.packagingType, price: v.price, qtyPerBox: v.qtyPerBox })) },
      },
    });

    console.log(`Seeded: ${p.nameId} (${p.stockStatus})`);
  }

  console.log(`Done. ${products.length} products processed.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
