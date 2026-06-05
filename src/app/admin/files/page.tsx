import Link from "next/link";
import { AdminShell } from "@/components/app/Shells";
import { PageHeader, Section, StatusPill, formatDate } from "@/components/app/Ui";
import {
  acceptUploadedFile,
  rejectUploadedFile,
  requestReplacement,
  sendAdminMessage,
} from "@/lib/portal-actions";
import { clientAccounts, fileRequests } from "@/lib/mock-portal-data";

export default function AdminFilesPage() {
  const reviewQueue = fileRequests.filter((request) =>
    ["needs review", "uploaded", "rejected"].includes(request.status),
  );

  return (
    <AdminShell>
      <div className="mx-auto max-w-6xl">
        <PageHeader title="File review" />
        <Section title="Queue">
          <div className="divide-y divide-neutral-200 rounded-[1.5rem] border border-neutral-200 bg-white">
            {reviewQueue.map((request) => {
              const client = clientAccounts.find((item) => item.id === request.clientId);

              return (
                <div key={request.id} className="grid gap-4 p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                  <div>
                    <Link href={`/admin/clients/${request.clientId}/files/${request.id}`} className="font-medium text-neutral-950">
                      {request.title}
                    </Link>
                    <p className="mt-1 text-sm text-neutral-500">
                      {client?.businessName} · {formatDate(request.dueDate)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusPill status={request.status} />
                    <form action={acceptUploadedFile}>
                      <button className="text-sm font-medium text-neutral-950">Accept</button>
                    </form>
                    <form action={rejectUploadedFile}>
                      <button className="text-sm font-medium text-neutral-950">Reject</button>
                    </form>
                    <form action={requestReplacement}>
                      <button className="text-sm font-medium text-neutral-950">Replacement</button>
                    </form>
                    <form action={sendAdminMessage}>
                      <button className="text-sm font-medium text-neutral-950">Message</button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </div>
    </AdminShell>
  );
}
