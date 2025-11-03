// app/dashboard/page.tsx
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '../lib/data';

export default async function DashboardPage() {
  const [revenue = [], latest = [], cards = {} as any] = await Promise.all([
    fetchRevenue().catch(() => []),
    fetchLatestInvoices().catch(() => []),
    fetchCardData().catch(() => ({})),
  ]);

  const numberOfInvoices = cards.numberOfInvoices ?? 0;
  const numberOfCustomers = cards.numberOfCustomers ?? 0;
  const totalPaidInvoices = cards.totalPaidInvoices ?? '$0.00';
  const totalPendingInvoices = cards.totalPendingInvoices ?? '$0.00';

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Invoices" value={numberOfInvoices} />
        <Card title="Customers" value={numberOfCustomers} />
        <Card title="Paid" value={totalPaidInvoices} />
        <Card title="Pending" value={totalPendingInvoices} />
      </div>

      <section>
        <h2 className="mb-2 font-medium">Revenue</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-sm">
          {revenue.map((r: any, i: number) => (
            <li key={r?.id ?? i} className="rounded border p-2">
              <div className="text-gray-500">{r?.month ?? '—'}</div>
              <div className="font-medium">
                ${Number(r?.amount ?? 0).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-2 font-medium">Latest Invoices</h2>
        <div className="overflow-x-auto">
          <table className="min-w-[520px] w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {latest.map((inv: any) => (
                <tr key={inv?.id ?? `${inv?.email}-${inv?.name}`}>
                  <td className="py-2 pr-4">{inv?.name ?? '—'}</td>
                  <td className="py-2 pr-4">{inv?.email ?? '—'}</td>
                  <td className="py-2 pr-4">{inv?.amount ?? '—'}</td>
                </tr>
              ))}
              {latest.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-gray-500">
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Card({ title, value }: { title: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
