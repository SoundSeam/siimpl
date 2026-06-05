import { AdminShell } from "@/components/app/Shells";
import { OneDriveStatus, PageHeader, Section, inputClass, selectClass } from "@/components/app/Ui";
import {
  connectOneDrive,
  mapClientToOneDriveFolder,
  verifyOneDriveFolderAccess,
} from "@/lib/portal-actions";
import {
  clientAccounts,
  oneDriveConnection,
  oneDriveFolderMappings,
} from "@/lib/mock-portal-data";

export default function OneDriveSettingsPage() {
  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl">
        <PageHeader title="OneDrive" />
        <Section title="Connection">
          <OneDriveStatus connection={oneDriveConnection} />
          <div className="mt-5 flex flex-wrap gap-3">
            <form action={connectOneDrive}>
              <button className="text-sm font-medium text-neutral-950">Connect OneDrive</button>
            </form>
            <form action={verifyOneDriveFolderAccess}>
              <button className="text-sm font-medium text-neutral-950">Verify folder access</button>
            </form>
          </div>
        </Section>
        <Section title="Folder mapping">
          <form action={mapClientToOneDriveFolder} className="mb-5 grid gap-5 rounded-[1.5rem] border border-neutral-200 bg-white p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <label className="block text-sm font-medium text-neutral-950">
              Client
              <select className={selectClass}>
                {clientAccounts.map((client) => (
                  <option key={client.id}>{client.businessName}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-neutral-950">
              Folder path
              <input className={inputClass} placeholder="/Clients/Business name" />
            </label>
            <button className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium">
              Map
            </button>
          </form>
          <div className="grid gap-4">
            {oneDriveFolderMappings.map((mapping) => (
              <OneDriveStatus key={mapping.id} connection={oneDriveConnection} mapping={mapping} />
            ))}
          </div>
        </Section>
      </div>
    </AdminShell>
  );
}
