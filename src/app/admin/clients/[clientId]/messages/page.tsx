import { notFound } from "next/navigation";
import { AdminShell } from "@/components/app/Shells";
import { MessageThreadList, PageHeader } from "@/components/app/Ui";
import { getClient, getClientThreads } from "@/lib/mock-portal-data";

export default async function AdminClientMessagesPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const client = getClient(clientId);

  if (!client) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-4xl">
        <PageHeader title={`${client.businessName} messages`} />
        <MessageThreadList threads={getClientThreads(clientId)} basePath={`/admin/clients/${clientId}/messages`} admin />
      </div>
    </AdminShell>
  );
}
