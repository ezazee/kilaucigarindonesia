import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Plain TCP Postgres connection — this app runs on a persistent Node.js
// server (not an edge/serverless runtime), so it doesn't need Neon's
// WebSocket-based driver (which requires outbound WSS access that isn't
// guaranteed on every VPS/firewall setup).
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
