import { PortalShell } from "@/components/app/Shells";
import { FileRequestList, PageHeader, Section } from "@/components/app/Ui";
import { getClientRequests } from "@/lib/mock-portal-data";

const categories = ["Overdue", "Bookkeeping", "Sales tax", "Payroll"] as const;

export default function PortalFilesPage() {
  const requests = getClientRequests();

  return (
    <PortalShell>
      <div className="mx-auto max-w-5xl">
        <PageHeader title="Requested files" />
        {categories.map((category) => {
          const group =
            category === "Overdue"
              ? requests.filter((request) => request.status === "overdue")
              : requests.filter((request) => request.category === category);

          return (
            <Section key={category} title={category}>
              <FileRequestList requests={group} />
            </Section>
          );
        })}
      </div>
    </PortalShell>
  );
}
