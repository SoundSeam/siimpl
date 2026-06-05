import { AdminShell } from "@/components/app/Shells";
import { AuditTrail, PageHeader, Section, inputClass, selectClass } from "@/components/app/Ui";
import { auditEvents, clientAccounts, adminUsers } from "@/lib/mock-portal-data";

export default function AdminAuditPage() {
  return (
    <AdminShell>
      <div className="mx-auto max-w-6xl">
        <PageHeader title="Audit" />
        <Section title="Filters">
          <form className="grid gap-5 rounded-[1.5rem] border border-neutral-200 bg-white p-5 sm:grid-cols-4">
            <label className="block text-sm font-medium text-neutral-950">
              Client
              <select className={selectClass}>
                <option>All</option>
                {clientAccounts.map((client) => (
                  <option key={client.id}>{client.businessName}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-neutral-950">
              Admin
              <select className={selectClass}>
                <option>All</option>
                {adminUsers.map((admin) => (
                  <option key={admin.id}>{admin.name}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-neutral-950">
              Action
              <select className={selectClass}>
                <option>All</option>
                <option>file requested</option>
                <option>file uploaded</option>
                <option>notification sent</option>
              </select>
            </label>
            <label className="block text-sm font-medium text-neutral-950">
              Date
              <input type="date" className={inputClass} />
            </label>
          </form>
        </Section>
        <Section title="Events">
          <AuditTrail events={auditEvents} detailed />
        </Section>
      </div>
    </AdminShell>
  );
}
