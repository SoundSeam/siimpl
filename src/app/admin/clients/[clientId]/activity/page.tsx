import { AdminShell } from "@/components/app/Shells";
import { AuditTrail, PageHeader } from "@/components/app/Ui";
import { getClientEvents } from "@/lib/mock-portal-data";

export default async function AdminClientActivityPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;

  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl">
        <PageHeader title="Client audit" />
        <AuditTrail events={getClientEvents(clientId)} detailed />
      </div>
    </AdminShell>
  );
}
