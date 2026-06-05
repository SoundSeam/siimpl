import Link from "next/link";
import { AdminShell } from "@/components/app/Shells";
import {
  FileRequestList,
  MessageThreadList,
  PageHeader,
  Section,
} from "@/components/app/Ui";
import {
  clientAccounts,
  deadlines,
  fileRequests,
  messageThreads,
} from "@/lib/mock-portal-data";

export default function AdminPage() {
  const urgentClientIds = new Set(
    deadlines
      .filter((deadline) => deadline.status === "overdue" || deadline.status === "due this week")
      .map((deadline) => deadline.clientId),
  );

  return (
    <AdminShell>
      <div className="mx-auto max-w-6xl">
        <PageHeader title="Admin" />
        <Section title="Urgent deadlines">
          <div className="divide-y divide-neutral-200 rounded-[1.5rem] border border-neutral-200 bg-white">
            {clientAccounts
              .filter((client) => urgentClientIds.has(client.id))
              .map((client) => (
                <Link key={client.id} href={`/admin/clients/${client.id}`} className="block p-5">
                  <p className="font-medium text-neutral-950">{client.businessName}</p>
                  <p className="mt-1 text-sm text-neutral-500">{client.contactName}</p>
                </Link>
              ))}
          </div>
        </Section>
        <Section title="Files needing review">
          <FileRequestList
            requests={fileRequests.filter((request) => request.status === "needs review")}
            basePath="/admin/files"
            admin
          />
        </Section>
        <Section title="Unread messages">
          <MessageThreadList
            threads={messageThreads.filter((thread) => thread.unreadForAdmin)}
            basePath="/admin/messages"
            admin
          />
        </Section>
        <Section title="Recent uploads">
          <FileRequestList
            requests={fileRequests.filter((request) => request.uploadedFiles.length > 0).slice(0, 3)}
            basePath="/admin/files"
            admin
          />
        </Section>
      </div>
    </AdminShell>
  );
}
