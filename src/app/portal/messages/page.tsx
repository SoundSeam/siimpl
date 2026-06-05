import { PortalShell } from "@/components/app/Shells";
import { MessageThreadList, PageHeader } from "@/components/app/Ui";
import { getClientThreads } from "@/lib/mock-portal-data";

export default function PortalMessagesPage() {
  return (
    <PortalShell>
      <div className="mx-auto max-w-4xl">
        <PageHeader title="Messages" />
        <MessageThreadList threads={getClientThreads()} />
      </div>
    </PortalShell>
  );
}
