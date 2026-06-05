import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/app/Shells";
import { FileRequestList, PageHeader, Section } from "@/components/app/Ui";
import {
  acceptUploadedFile,
  changeFileRequestDeadline,
  deleteFileRequest,
  rejectUploadedFile,
  requestReplacement,
  updateFileRequest,
} from "@/lib/portal-actions";
import { getClient, getClientRequests } from "@/lib/mock-portal-data";

type FormAction = (formData: FormData) => void | Promise<void>;

export default async function AdminClientFilesPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const client = getClient(clientId);
  const requestActions: { label: string; action: FormAction }[] = [
    { label: "Edit request", action: updateFileRequest },
    { label: "Change deadline", action: changeFileRequestDeadline },
    { label: "Accept", action: acceptUploadedFile },
    { label: "Reject", action: rejectUploadedFile },
    { label: "Request replacement", action: requestReplacement },
    { label: "Cancel request", action: deleteFileRequest },
  ];

  if (!client) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl">
        <PageHeader
          title="File requests"
          action={<Link href={`/admin/clients/${clientId}/files/new`} className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-medium">Create request</Link>}
        />
        <Section title={client.businessName}>
          <FileRequestList requests={getClientRequests(clientId)} basePath={`/admin/clients/${clientId}/files`} admin />
          <div className="mt-5 flex flex-wrap gap-3">
            {requestActions.map(({ label, action }) => (
              <form key={label} action={action}>
                <button className="text-sm font-medium text-neutral-950">{label}</button>
              </form>
            ))}
          </div>
        </Section>
      </div>
    </AdminShell>
  );
}
