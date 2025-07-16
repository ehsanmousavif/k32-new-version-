// lib/prisma.ts
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | null;
};

let prisma!: PrismaClient;

if (!globalForPrisma.prisma) {
  try {
    prisma = new PrismaClient();
    globalForPrisma.prisma = prisma;
    console.log("✅ Prisma connected.");
  } catch (error) {
    console.error("❌ Error connecting to Prisma:", error);
    globalForPrisma.prisma = null;
  }
} else {
  prisma = globalForPrisma.prisma;
}

export async function disconnectPrisma() {
  if (prisma) {
    await prisma.$disconnect();
    console.log("🔌 Prisma disconnected.");
  }
}

export const db = prisma;
