import { PortalShell } from "@/components/app/Shells";
import { NotificationPreferencesForm, PageHeader, Section } from "@/components/app/Ui";
import { optIntoSms, optOutOfSms, updateNotificationPreferences } from "@/lib/portal-actions";

export default function PortalNotificationsPage() {
  return (
    <PortalShell>
      <div className="mx-auto max-w-3xl">
        <PageHeader title="Notifications" />
        <Section title="Reminder schedule">
          <NotificationPreferencesForm action={updateNotificationPreferences} />
          <div className="mt-5 flex flex-wrap gap-3">
            <form action={optIntoSms}>
              <button className="text-sm font-medium text-neutral-950">Opt into SMS</button>
            </form>
            <form action={optOutOfSms}>
              <button className="text-sm font-medium text-neutral-950">Opt out of SMS</button>
            </form>
          </div>
        </Section>
      </div>
    </PortalShell>
  );
}
