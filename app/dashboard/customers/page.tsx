// app/dashboard/customers/page.tsx
import { fetchFilteredCustomers } from "@/app/lib/data";

export default async function CustomersPage() {
  // show everyone (no search yet)
  const customers = await fetchFilteredCustomers("");

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Customers</h1>

      {customers.length === 0 ? (
        <p className="text-sm text-gray-500">No customers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[640px] w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Total Invoices</th>
                <th className="py-2 pr-4">Total Paid</th>
                <th className="py-2 pr-4">Total Pending</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b last:border-0">
                  <td className="py-2 pr-4">{c.name}</td>
                  <td className="py-2 pr-4">{c.email}</td>
                  <td className="py-2 pr-4">{c.total_invoices}</td>
                  <td className="py-2 pr-4">{c.total_paid}</td>
                  <td className="py-2 pr-4">{c.total_pending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
