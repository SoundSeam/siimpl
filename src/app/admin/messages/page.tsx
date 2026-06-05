import { AdminShell } from "@/components/app/Shells";
import { MessageThreadList, PageHeader } from "@/components/app/Ui";
import { messageThreads } from "@/lib/mock-portal-data";

export default function AdminMessagesPage() {
  return (
    <AdminShell>
      <div className="mx-auto max-w-4xl">
        <PageHeader title="Messages" />
        <MessageThreadList threads={messageThreads} basePath="/admin/messages" admin />
      </div>
    </AdminShell>
  );
}
