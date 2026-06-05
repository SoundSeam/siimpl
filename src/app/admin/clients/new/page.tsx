import { ClientAccountForm } from "@/components/app/Forms";
import { AdminShell } from "@/components/app/Shells";
import { PageHeader } from "@/components/app/Ui";

export default function NewClientPage() {
  return (
    <AdminShell>
      <PageHeader title="Create client" />
      <ClientAccountForm />
    </AdminShell>
  );
}
