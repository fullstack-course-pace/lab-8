// app/dashboard/invoices/page.tsx
import { fetchFilteredInvoices } from "@/app/lib/data";

export default async function InvoicesPage() {
  // simple first page (no search yet)
  const invoices = await fetchFilteredInvoices("", 1);

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
                  <td className="py-2 pr-4">{inv.name}</td>
                  <td className="py-2 pr-4">{inv.email}</td>
                  <td className="py-2 pr-4">${Number(inv.amount).toLocaleString()}</td>
                  <td className="py-2 pr-4 capitalize">{inv.status}</td>
                  <td className="py-2 pr-4">
                    {new Date(inv.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
