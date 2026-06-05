import { notFound } from "next/navigation";
import { PortalShell } from "@/components/app/Shells";
import { ChatWorkspace, PageHeader } from "@/components/app/Ui";
import { sendClientMessage, uploadFile } from "@/lib/portal-actions";
import { fileRequests, messageThreads } from "@/lib/mock-portal-data";

export default async function PortalMessageThreadPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;
  const thread = messageThreads.find((item) => item.id === threadId);

  if (!thread) {
    notFound();
  }

  const threadRequests = fileRequests.filter(
    (request) => request.clientId === thread.clientId,
  );

  return (
    <PortalShell>
      <>
        <PageHeader title={thread.subject} />
        <ChatWorkspace
          thread={thread}
          requests={threadRequests}
          currentRole="client"
          requestBasePath="/portal/files"
          sendAction={sendClientMessage}
          uploadAction={uploadFile}
        />
      </>
    </PortalShell>
  );
}
