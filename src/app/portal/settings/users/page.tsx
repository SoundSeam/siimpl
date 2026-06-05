import { InviteUserForm } from "@/components/app/Forms";
import { PortalShell } from "@/components/app/Shells";
import { ClientUserList, PageHeader, Section } from "@/components/app/Ui";
import { changeClientUserRole, removeClientAccountUser } from "@/lib/portal-actions";
import { getClientUsers } from "@/lib/mock-portal-data";

export default function PortalUsersPage() {
  return (
    <PortalShell>
      <div className="mx-auto max-w-4xl">
        <PageHeader title="Users" />
        <Section title="Invite user">
          <InviteUserForm />
        </Section>
        <Section title="Current users">
          <ClientUserList users={getClientUsers()} />
          <div className="mt-5 flex flex-wrap gap-3">
            <form action={changeClientUserRole}>
              <button className="text-sm font-medium text-neutral-950">Change role</button>
            </form>
            <form action={removeClientAccountUser}>
              <button className="text-sm font-medium text-neutral-950">Remove user</button>
            </form>
          </div>
        </Section>
      </div>
    </PortalShell>
  );
}
