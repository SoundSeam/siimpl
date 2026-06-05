import { AdminShell } from "@/components/app/Shells";
import { PageHeader, Section, StatusPill, inputClass, selectClass } from "@/components/app/Ui";
import {
  changeAdminRole,
  createAdminAccountInvite,
  deactivateAdminAccount,
} from "@/lib/portal-actions";
import { adminUsers } from "@/lib/mock-portal-data";

export default function AdminAdminsPage() {
  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl">
        <PageHeader title="Admins" />
        <Section title="Invite admin">
          <form action={createAdminAccountInvite} className="grid gap-5 sm:grid-cols-[1fr_12rem_auto] sm:items-end">
            <label className="block text-sm font-medium text-neutral-950">
              Email
              <input type="email" className={inputClass} placeholder="name@siimpl.com" />
            </label>
            <label className="block text-sm font-medium text-neutral-950">
              Role
              <select className={selectClass}>
                <option>admin</option>
                <option>reviewer</option>
                <option>owner</option>
              </select>
            </label>
            <button className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium">Invite</button>
          </form>
        </Section>
        <Section title="Accounts">
          <div className="divide-y divide-neutral-200 rounded-[1.5rem] border border-neutral-200 bg-white">
            {adminUsers.map((admin) => (
              <div key={admin.id} className="grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <div>
                  <p className="font-medium text-neutral-950">{admin.name}</p>
                  <p className="mt-1 text-sm text-neutral-500">{admin.email}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <StatusPill status={admin.role} />
                  <StatusPill status={admin.status} />
                  <form action={changeAdminRole}>
                    <button className="text-sm font-medium text-neutral-950">Change role</button>
                  </form>
                  <form action={deactivateAdminAccount}>
                    <button className="text-sm font-medium text-neutral-950">Deactivate</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </AdminShell>
  );
}
