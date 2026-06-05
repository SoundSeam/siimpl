import Link from "next/link";
import { PortalShell } from "@/components/app/Shells";
import {
  AuditTrail,
  DeadlineSummary,
  FileRequestList,
  MessageThreadList,
  PageHeader,
  Section,
  statusPriority,
} from "@/components/app/Ui";
import {
  currentClientId,
  deadlines,
  getClientEvents,
  getClientRequests,
  getClientThreads,
} from "@/lib/mock-portal-data";

export default function PortalPage() {
  const requests = getClientRequests();
  const sortedRequests = [...requests].sort(
    (a, b) => statusPriority(a.status) - statusPriority(b.status),
  );
  const nextDeadline = deadlines
    .filter((deadline) => deadline.clientId === currentClientId)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0];
  const recentUploads = requests.flatMap((request) => request.uploadedFiles).slice(0, 3);

  return (
    <PortalShell>
      <div className="mx-auto max-w-5xl">
        <PageHeader title="Portal" />
        <Section title="Next deadline">
          <DeadlineSummary deadline={nextDeadline} />
        </Section>
        <Section
          title="Requested files"
          action={<Link href="/portal/files" className="text-sm font-medium">View all</Link>}
        >
          <FileRequestList requests={sortedRequests.slice(0, 3)} />
        </Section>
        <Section title="Recent uploads">
          {recentUploads.length > 0 ? (
            <div className="divide-y divide-neutral-200 rounded-[1.5rem] border border-neutral-200 bg-white">
              {recentUploads.map((file) => (
                <div key={file.id} className="flex items-center justify-between gap-4 p-5">
                  <span className="text-sm font-medium text-neutral-950">{file.fileName}</span>
                  <span className="text-sm text-neutral-500">{file.status}</span>
                </div>
              ))}
            </div>
          ) : null}
        </Section>
        <Section title="Latest messages">
          <MessageThreadList threads={getClientThreads().slice(0, 2)} />
        </Section>
        <Section title="Activity">
          <AuditTrail events={getClientEvents().slice(0, 3)} />
        </Section>
      </div>
    </PortalShell>
  );
}
