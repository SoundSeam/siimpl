import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/app/Shells";
import {
  AuditTrail,
  ClientUserList,
  DefinitionList,
  FileRequestList,
  MessageThreadList,
  OneDriveStatus,
  PageHeader,
  Section,
  StatusPill,
} from "@/components/app/Ui";
import {
  getClient,
  getClientEvents,
  getClientRequests,
  getClientThreads,
  getClientUsers,
  oneDriveConnection,
  oneDriveFolderMappings,
} from "@/lib/mock-portal-data";

export default async function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const client = getClient(clientId);

  if (!client) {
    notFound();
  }

  const mapping = oneDriveFolderMappings.find((item) => item.clientId === clientId);

  return (
    <AdminShell>
      <div className="mx-auto max-w-6xl">
        <PageHeader
          title={client.businessName}
          action={<StatusPill status={client.status} />}
        />
        <div className="mb-8 flex flex-wrap gap-3">
          <Link href={`/admin/clients/${clientId}/files`} className="text-sm font-medium">Files</Link>
          <Link href={`/admin/clients/${clientId}/messages`} className="text-sm font-medium">Messages</Link>
          <Link href={`/admin/clients/${clientId}/users`} className="text-sm font-medium">Users</Link>
          <Link href={`/admin/clients/${clientId}/activity`} className="text-sm font-medium">Activity</Link>
        </div>
        <Section title="Profile">
          <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
            <DefinitionList
              items={[
                { label: "Contact", value: client.contactName },
                { label: "Email", value: client.email },
                { label: "Phone", value: client.phone },
                { label: "Fiscal year-end", value: client.fiscalYearEnd },
                { label: "Accounting", value: client.accountingSoftware },
                { label: "Payroll", value: client.payrollProvider },
              ]}
            />
          </div>
        </Section>
        <Section title="Users">
          <ClientUserList users={getClientUsers(clientId)} />
        </Section>
        <Section title="Open file requests">
          <FileRequestList
            requests={getClientRequests(clientId).filter((request) => request.status !== "accepted")}
            basePath={`/admin/clients/${clientId}/files`}
            admin
          />
        </Section>
        <Section title="Messages">
          <MessageThreadList
            threads={getClientThreads(clientId)}
            basePath={`/admin/clients/${clientId}/messages`}
            admin
          />
        </Section>
        <Section title="Audit">
          <AuditTrail events={getClientEvents(clientId).slice(0, 4)} detailed />
        </Section>
        <Section title="OneDrive">
          <OneDriveStatus connection={oneDriveConnection} mapping={mapping} />
        </Section>
      </div>
    </AdminShell>
  );
}
