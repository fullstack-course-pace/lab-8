import bcrypt from "bcrypt";
import postgres, { Sql } from "postgres";
import { invoices, customers, revenue, users } from "@/app/lib/placeholder-data";

// IMPORTANT: make sure your .env.local contains POSTGRES_URL=<your-connection-string>
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// If you deploy this to Vercel and want to force dynamic execution each call, uncomment:
// export const dynamic = "force-dynamic";

async function seedUsers(tx: Sql) {
  await tx`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await tx`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await tx`
      INSERT INTO users (id, name, email, password)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
}

async function seedCustomers(tx: Sql) {
  await tx`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await tx`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  for (const c of customers) {
    await tx`
      INSERT INTO customers (id, name, email, image_url)
      VALUES (${c.id}, ${c.name}, ${c.email}, ${c.image_url})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
}

async function seedInvoices(tx: Sql) {
  await tx`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await tx`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  for (const inv of invoices) {
    await tx`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${inv.customer_id}, ${inv.amount}, ${inv.status}, ${inv.date})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
}

async function seedRevenue(tx: Sql) {
  // Ensure table exists
  await tx`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE
      -- don't declare 'revenue' here because the table might already exist
    );
  `;

  // If someone created the table with a different schema, normalize it:
  // 1) If there's an 'amount' column, rename it to 'revenue'
  await tx`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'revenue' AND column_name = 'amount'
      ) THEN
        EXECUTE 'ALTER TABLE revenue RENAME COLUMN amount TO revenue';
      END IF;
    END
    $$;
  `;

  // 2) Ensure the 'revenue' column exists
  await tx`ALTER TABLE revenue ADD COLUMN IF NOT EXISTS revenue INT NOT NULL DEFAULT 0;`;

  // Insert rows (skip duplicates by month)
  for (const r of revenue) {
    await tx`
      INSERT INTO revenue (month, revenue)
      VALUES (${r.month}, ${r.revenue})
      ON CONFLICT (month) DO NOTHING;
    `;
  }
}
export async function GET() {
  try {
    await sql.begin(async (tx) => {
      await seedUsers(tx);
      await seedCustomers(tx);
      await seedInvoices(tx);
      await seedRevenue(tx);
    });

    return Response.json({ message: "Database seeded successfully" });
  } catch (error: any) {
    console.error("Seed error:", error);
    return Response.json({ error: String(error?.message ?? error) }, { status: 500 });
  }
}
