import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "kilaucigarindonesia@gmail.com";
  const password = "password123";
  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Superadmin",
      password: hashed,
      role: "SUPERADMIN",
    },
  });

  console.log("Seeded superadmin:", user.email);

  const categories = [
    { name: "Black Gold", slug: "black-gold", order: 1 },
    { name: "Blue Gold", slug: "blue-gold", order: 2 },
    { name: "Red Gold", slug: "red-gold", order: 3 },
    { name: "White Gold", slug: "white-gold", order: 4 },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log("Seeded categories.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
