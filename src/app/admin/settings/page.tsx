import Link from "next/link";
import { AdminShell } from "@/components/app/Shells";
import { OneDriveStatus, PageHeader, Section } from "@/components/app/Ui";
import { oneDriveConnection } from "@/lib/mock-portal-data";

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <div className="mx-auto max-w-4xl">
        <PageHeader title="Settings" />
        <Section title="Notification defaults">
          <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5 text-sm text-neutral-600">
            Email at 14, 7, and 2 days. SMS at 1 day.
          </div>
        </Section>
        <Section title="File request templates">
          <Link href="/admin/settings/file-templates" className="text-sm font-medium text-neutral-950">
            Manage templates
          </Link>
        </Section>
        <Section title="OneDrive">
          <OneDriveStatus connection={oneDriveConnection} />
          <Link href="/admin/settings/onedrive" className="mt-4 inline-flex text-sm font-medium text-neutral-950">
            Manage OneDrive
          </Link>
        </Section>
        <Section title="Account preferences">
          <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5 text-sm text-neutral-600">
            Quiet notifications. Compact lists.
          </div>
        </Section>
      </div>
    </AdminShell>
  );
}
