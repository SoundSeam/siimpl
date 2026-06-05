import { FileRequestForm } from "@/components/app/Forms";
import { AdminShell } from "@/components/app/Shells";
import { PageHeader } from "@/components/app/Ui";

export default function NewFileRequestPage() {
  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl">
        <PageHeader title="Create request" />
        <FileRequestForm preview />
      </div>
    </AdminShell>
  );
}
