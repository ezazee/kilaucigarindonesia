import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const existing = await prisma.setting.findUnique({ where: { key: "general" } });
  if (existing) {
    console.log("setting 'general' already exists, skipping");
    return;
  }
  await prisma.setting.create({
    data: {
      key: "general",
      value: {
        siteTitle: "Kilau Cigar Indonesia | Cerutu Premium & Eksklusif",
        siteDescription: "",
        instagramUrl: "https://www.instagram.com/kilaucigarindonesia",
        facebookUrl: "",
        youtubeUrl: "",
        whatsappNumber: "6281120078910",
        contactEmail: "info@kilaucigarindonesia.com",
        officeLocation: "Jakarta, Indonesia",
        footerDescription:
          "Kilau Cigar Indonesia provides the ultimate premium experience for cigar aficionados worldwide. Artisanally crafted, traditionally aged, and hand-rolled to perfection.",
        googleVerification: "",
      },
    },
  });
  console.log("seeded setting: general");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
