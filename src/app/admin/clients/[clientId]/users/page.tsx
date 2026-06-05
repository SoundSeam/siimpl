import { InviteUserForm } from "@/components/app/Forms";
import { AdminShell } from "@/components/app/Shells";
import { ClientUserList, PageHeader, Section } from "@/components/app/Ui";
import { changeClientUserRoleAdmin, inviteClientUser, removeClientUser } from "@/lib/portal-actions";
import { getClientUsers } from "@/lib/mock-portal-data";

export default async function AdminClientUsersPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;

  return (
    <AdminShell>
      <div className="mx-auto max-w-4xl">
        <PageHeader title="Client users" />
        <Section title="Invite">
          <InviteUserForm />
          <form action={inviteClientUser} className="mt-4">
            <button className="text-sm font-medium text-neutral-950">Send invite</button>
          </form>
        </Section>
        <Section title="Users">
          <ClientUserList users={getClientUsers(clientId)} />
          <div className="mt-5 flex flex-wrap gap-3">
            <form action={changeClientUserRoleAdmin}>
              <button className="text-sm font-medium text-neutral-950">Change role</button>
            </form>
            <form action={removeClientUser}>
              <button className="text-sm font-medium text-neutral-950">Remove user</button>
            </form>
          </div>
        </Section>
      </div>
    </AdminShell>
  );
}
