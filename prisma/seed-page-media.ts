import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const items: { url: string; alt: string }[] = [
  { url: "/images/hero.png", alt: "Hero Homepage" },
  { url: "/images/collections/black_left.png", alt: "Black Gold Collection - Kiri" },
  { url: "/images/collections/black_right.png", alt: "Black Gold Collection - Kanan" },
  { url: "/images/collections/blue_box.png", alt: "Blue Gold Collection" },
  { url: "/images/products/gorditto_cardboard.png", alt: "Red Gold Collection" },
  { url: "/images/products/eljefe.png", alt: "White Gold Collection" },
  { url: "/images/about/lifestyle.webp", alt: "Tentang Kami - Hero" },
  { url: "/images/about/portrait.webp", alt: "Tentang Kami - Potret Sejarah" },
  { url: "/images/about/montenegro_box.png", alt: "Tentang Kami - Inovasi" },
  { url: "/images/contact/hero.webp", alt: "Kontak - Hero" },
];

async function main() {
  for (const item of items) {
    const existing = await prisma.media.findFirst({ where: { url: item.url } });
    if (existing) {
      console.log(`skip (exists): ${item.url}`);
      continue;
    }
    await prisma.media.create({ data: item });
    console.log(`added: ${item.url}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
