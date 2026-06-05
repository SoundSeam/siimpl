import Link from "next/link";
import { notFound } from "next/navigation";
import { PortalShell } from "@/components/app/Shells";
import {
  AuditTrail,
  DefinitionList,
  FileUploadControl,
  MessageThreadList,
  PageHeader,
  Section,
  StatusPill,
  formatDate,
} from "@/components/app/Ui";
import {
  removeUploadedFile,
  replaceUploadedFile,
  uploadFile,
} from "@/lib/portal-actions";
import {
  fileRequests,
  getClientEvents,
  getClientThreads,
} from "@/lib/mock-portal-data";

export default async function FileRequestDetailPage({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const { requestId } = await params;
  const request = fileRequests.find((item) => item.id === requestId);

  if (!request) {
    notFound();
  }

  const relatedThreads = getClientThreads(request.clientId).filter((thread) =>
    thread.messages.some((message) =>
      message.linkedFileRequestIds.includes(request.id),
    ),
  );

  return (
    <PortalShell>
      <div className="mx-auto max-w-4xl">
        <PageHeader
          title={request.title}
          action={<StatusPill status={request.status} />}
        />
        <Section title="Request">
          <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
            <DefinitionList
              items={[
                { label: "Types", value: request.acceptedFileTypes.join(", ") },
                { label: "Deadline", value: formatDate(request.dueDate) },
                { label: "Category", value: request.category },
                { label: "Required", value: request.required ? "Yes" : "No" },
              ]}
            />
            {request.adminNotes ? (
              <p className="mt-5 text-sm leading-6 text-neutral-600">
                {request.adminNotes}
              </p>
            ) : null}
          </div>
        </Section>
        <Section title="Upload">
          <form action={uploadFile}>
            <FileUploadControl label="Upload" />
          </form>
        </Section>
        <Section title="Upload history">
          <div className="divide-y divide-neutral-200 rounded-[1.5rem] border border-neutral-200 bg-white">
            {request.uploadedFiles.map((file) => (
              <div key={file.id} className="grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto]">
                <div>
                  <p className="font-medium text-neutral-950">{file.fileName}</p>
                  <p className="mt-1 text-sm text-neutral-500">
                    {formatDate(file.uploadedAt)} · {file.uploadedBy}
                  </p>
                  {file.rejectionNote ? (
                    <p className="mt-2 text-sm text-neutral-600">{file.rejectionNote}</p>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-3">
                  <StatusPill status={file.status} />
                  <form action={replaceUploadedFile}>
                    <button className="text-sm font-medium text-neutral-950">Replace</button>
                  </form>
                  <form action={removeUploadedFile}>
                    <button className="text-sm font-medium text-neutral-950">Remove</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <Section
          title="Messages"
          action={<Link href="/portal/messages" className="text-sm font-medium">Open inbox</Link>}
        >
          <MessageThreadList threads={relatedThreads} />
        </Section>
        <Section title="Activity">
          <AuditTrail events={getClientEvents(request.clientId).slice(0, 3)} />
        </Section>
      </div>
    </PortalShell>
  );
}
