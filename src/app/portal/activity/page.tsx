import { PortalShell } from "@/components/app/Shells";
import { AuditTrail, PageHeader } from "@/components/app/Ui";
import { getClientEvents } from "@/lib/mock-portal-data";

export default function PortalActivityPage() {
  return (
    <PortalShell>
      <div className="mx-auto max-w-4xl">
        <PageHeader title="Activity" />
        <AuditTrail events={getClientEvents()} />
      </div>
    </PortalShell>
  );
}
