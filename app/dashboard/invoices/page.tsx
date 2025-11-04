// app/dashboard/invoices/page.tsx
import { fetchFilteredInvoices } from '@/app/lib/data';

// If you already have these in app/lib/utils from the tutorial, import those instead.
function formatCurrency(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    .format(cents / 100);
}

function formatUTCDate(d: string | Date) {
  // Ensure consistent display if DB returns 'YYYY-MM-DD'
  const date = typeof d === 'string' ? new Date(d + 'T00:00:00Z') : d;
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
    .format(date);
}

type InvoiceRow = {
  id: string;
  name: string | null;    // from customers.name
  email: string | null;   // from customers.email
  amount: number;         // cents (integer)
  status: 'pending' | 'paid' | string;
  date: string;           // 'YYYY-MM-DD' or ISO
};

export default async function InvoicesPage() {
  // Simple first page (no search/pagination yet)
  const invoices: InvoiceRow[] = await fetchFilteredInvoices('', 1);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Invoices</h1>

      {invoices.length === 0 ? (
        <p className="text-sm text-gray-500">No invoices found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[640px] w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b last:border-0">
                  <td className="py-2 pr-4">{inv.name ?? '—'}</td>
                  <td className="py-2 pr-4">{inv.email ?? '—'}</td>
                  <td className="py-2 pr-4">{formatCurrency(Number(inv.amount))}</td>
                  <td className="py-2 pr-4 capitalize">{inv.status}</td>
                  <td className="py-2 pr-4">{formatUTCDate(inv.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
