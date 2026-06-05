import { OnboardingFlow } from "@/components/app/Forms";
import { PortalShell } from "@/components/app/Shells";
import { PageHeader } from "@/components/app/Ui";

export default function OnboardingPage() {
  return (
    <PortalShell>
      <PageHeader title="Onboarding" />
      <OnboardingFlow />
    </PortalShell>
  );
}
