import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const db = 
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    },
    // Connection pooling configuration for production
    ...(process.env.NODE_ENV === 'production' && {
      errorFormat: 'minimal',
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// Graceful shutdown handlers
if (process.env.NODE_ENV === 'production') {
  process.on('beforeExit', async () => {
    await db.$disconnect();
  });

  process.on('SIGINT', async () => {
    await db.$disconnect();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await db.$disconnect();
    process.exit(0);
  });
}

// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.
