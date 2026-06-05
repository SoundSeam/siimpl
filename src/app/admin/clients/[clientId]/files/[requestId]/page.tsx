import { notFound } from "next/navigation";
import { AdminShell } from "@/components/app/Shells";
import {
  DefinitionList,
  FileUploadControl,
  PageHeader,
  Section,
  StatusPill,
  formatDate,
} from "@/components/app/Ui";
import {
  acceptUploadedFile,
  rejectUploadedFile,
  replaceUploadedFile,
  requestReplacement,
} from "@/lib/portal-actions";
import { fileRequests } from "@/lib/mock-portal-data";

export default async function AdminFileRequestDetailPage({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const { requestId } = await params;
  const request = fileRequests.find((item) => item.id === requestId);

  if (!request) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-4xl">
        <PageHeader title={request.title} action={<StatusPill status={request.status} />} />
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
            <p className="mt-5 text-sm leading-6 text-neutral-600">
              {request.description}
            </p>
          </div>
        </Section>
        <Section title="Upload history">
          <div className="divide-y divide-neutral-200 rounded-[1.5rem] border border-neutral-200 bg-white">
            {request.uploadedFiles.map((file) => (
              <div key={file.id} className="grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto]">
                <div>
                  <p className="font-medium text-neutral-950">{file.fileName}</p>
                  <p className="mt-1 text-sm text-neutral-500">{formatDate(file.uploadedAt)}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <StatusPill status={file.status} />
                  <form action={acceptUploadedFile}>
                    <button className="text-sm font-medium text-neutral-950">Accept</button>
                  </form>
                  <form action={rejectUploadedFile}>
                    <button className="text-sm font-medium text-neutral-950">Reject</button>
                  </form>
                  <form action={requestReplacement}>
                    <button className="text-sm font-medium text-neutral-950">Request replacement</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Replacement">
          <form action={replaceUploadedFile}>
            <FileUploadControl label="Replace" replacement />
          </form>
        </Section>
      </div>
    </AdminShell>
  );
}
