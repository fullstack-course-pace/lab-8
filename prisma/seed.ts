// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.customer.upsert({
    where: { email: 'alice@acme.com' },
    update: {},
    create: { name: 'Alice Johnson', email: 'alice@acme.com', imageUrl: '/customers/alice.png' },
  });
  const bob = await prisma.customer.upsert({
    where: { email: 'bob@acme.com' },
    update: {},
    create: { name: 'Bob Williams', email: 'bob@acme.com', imageUrl: '/customers/bob.png' },
  });

  await prisma.revenue.deleteMany();
  await prisma.revenue.createMany({
    data: [
      { month: 'Jan', amount: 12000 },
      { month: 'Feb', amount: 9000 },
      { month: 'Mar', amount: 14500 },
      { month: 'Apr', amount: 11000 },
      { month: 'May', amount: 17000 },
      { month: 'Jun', amount: 13000 },
    ],
  });

  await prisma.invoice.createMany({
    data: [
      { customerId: alice.id, amount: 19999, status: 'paid',    date: new Date('2025-09-01') },
      { customerId: alice.id, amount:  9999, status: 'pending', date: new Date('2025-09-10') },
      { customerId: bob.id,   amount: 24999, status: 'paid',    date: new Date('2025-09-12') },
      { customerId: bob.id,   amount:  7999, status: 'pending', date: new Date('2025-09-18') },
    ],
  });
}

main().finally(() => prisma.$disconnect());
