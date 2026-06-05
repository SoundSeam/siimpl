import Link from "next/link";
import { AdminShell } from "@/components/app/Shells";
import { PageHeader, StatusPill, formatDate } from "@/components/app/Ui";
import { archiveClientAccount } from "@/lib/portal-actions";
import { clientAccounts, deadlines, fileRequests } from "@/lib/mock-portal-data";

export default function AdminClientsPage() {
  return (
    <AdminShell>
      <div className="mx-auto max-w-6xl">
        <PageHeader
          title="Clients"
          action={
            <Link href="/admin/clients/new" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium">
              Create client
            </Link>
          }
        />
        <label className="mb-5 block text-sm font-medium text-neutral-950">
          Search
          <input className="mt-2 h-12 w-full rounded-full border border-neutral-200 bg-white px-5 outline-none focus:border-neutral-950" />
        </label>
        <div className="divide-y divide-neutral-200 rounded-[1.5rem] border border-neutral-200 bg-white">
          {clientAccounts.map((client) => {
            const nextDeadline = deadlines
              .filter((deadline) => deadline.clientId === client.id)
              .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0];
            const openRequests = fileRequests.filter(
              (request) => request.clientId === client.id && request.status !== "accepted",
            ).length;

            return (
              <div key={client.id} className="grid gap-4 p-5 lg:grid-cols-[minmax(0,1fr)_10rem_8rem_auto] lg:items-center">
                <div>
                  <Link href={`/admin/clients/${client.id}`} className="font-medium text-neutral-950">
                    {client.businessName}
                  </Link>
                  <p className="mt-1 text-sm text-neutral-500">{client.contactName}</p>
                </div>
                <p className="text-sm text-neutral-600">
                  {nextDeadline ? formatDate(nextDeadline.dueDate) : "No deadline"}
                </p>
                <p className="text-sm text-neutral-600">{openRequests} open</p>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusPill status={client.status} />
                  <form action={archiveClientAccount}>
                    <button className="text-sm font-medium text-neutral-950">Archive</button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminShell>
  );
}
