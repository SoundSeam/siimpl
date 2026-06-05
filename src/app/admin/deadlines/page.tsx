import { AdminShell } from "@/components/app/Shells";
import { DeadlineGroupList, PageHeader } from "@/components/app/Ui";
import { deadlines } from "@/lib/mock-portal-data";

export default function AdminDeadlinesPage() {
  const groups = ["overdue", "due this week", "due this month", "no deadline"].map(
    (status) => ({
      title: status,
      deadlines: deadlines.filter((deadline) => deadline.status === status),
    }),
  );

  return (
    <AdminShell>
      <div className="mx-auto max-w-6xl">
        <PageHeader title="Deadlines" />
        <DeadlineGroupList groups={groups} />
      </div>
    </AdminShell>
  );
}
