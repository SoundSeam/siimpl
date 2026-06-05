import Link from "next/link";
import { BusinessProfileForm } from "@/components/app/Forms";
import { PortalShell } from "@/components/app/Shells";
import {
  ClientUserList,
  NotificationPreferencesForm,
  OneDriveStatus,
  PageHeader,
  Section,
} from "@/components/app/Ui";
import { updateNotificationPreferences } from "@/lib/portal-actions";
import {
  currentClientId,
  getClientUsers,
  notificationPreferences,
  oneDriveConnection,
  oneDriveFolderMappings,
} from "@/lib/mock-portal-data";

export default function PortalSettingsPage() {
  const prefs = notificationPreferences.find((item) => item.clientId === currentClientId);
  const mapping = oneDriveFolderMappings.find((item) => item.clientId === currentClientId);

  return (
    <PortalShell>
      <div className="mx-auto max-w-5xl">
        <PageHeader title="Settings" />
        <Section title="Business profile">
          <BusinessProfileForm />
        </Section>
        <Section
          title="Users"
          action={<Link href="/portal/settings/users" className="text-sm font-medium">Manage</Link>}
        >
          <ClientUserList users={getClientUsers()} />
        </Section>
        <Section
          title="Notifications"
          action={<Link href="/portal/settings/notifications" className="text-sm font-medium">Edit</Link>}
        >
          <NotificationPreferencesForm
            action={updateNotificationPreferences}
            smsEnabled={prefs?.smsEnabled}
          />
        </Section>
        <Section title="Connected folders">
          <OneDriveStatus connection={oneDriveConnection} mapping={mapping} />
        </Section>
      </div>
    </PortalShell>
  );
}
