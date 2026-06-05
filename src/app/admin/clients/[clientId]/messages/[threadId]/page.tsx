import { notFound } from "next/navigation";
import { AdminShell } from "@/components/app/Shells";
import { ChatWorkspace, PageHeader } from "@/components/app/Ui";
import { createFileRequestFromMessage, sendAdminMessage } from "@/lib/portal-actions";
import { fileRequests, messageThreads } from "@/lib/mock-portal-data";

export default async function AdminClientMessageThreadPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;
  const thread = messageThreads.find((item) => item.id === threadId);

  if (!thread) {
    notFound();
  }

  return (
    <AdminShell>
      <>
        <PageHeader title={thread.subject} />
        <ChatWorkspace
          thread={thread}
          requests={fileRequests.filter(
            (request) => request.clientId === thread.clientId,
          )}
          currentRole="admin"
          requestBasePath={`/admin/clients/${thread.clientId}/files`}
          sendAction={sendAdminMessage}
          createRequestAction={createFileRequestFromMessage}
        />
      </>
    </AdminShell>
  );
}
