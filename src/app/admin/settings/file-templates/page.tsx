import { FileTemplateForm } from "@/components/app/Forms";
import { AdminShell } from "@/components/app/Shells";
import { PageHeader, Section, StatusPill } from "@/components/app/Ui";
import {
  deleteFileRequestTemplate,
  updateFileRequestTemplate,
} from "@/lib/portal-actions";
import { fileRequestTemplates } from "@/lib/mock-portal-data";

export default function FileTemplatesPage() {
  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl">
        <PageHeader title="File templates" />
        <Section title="Create template">
          <FileTemplateForm />
        </Section>
        <Section title="Templates">
          <div className="divide-y divide-neutral-200 rounded-[1.5rem] border border-neutral-200 bg-white">
            {fileRequestTemplates.map((template) => (
              <div key={template.id} className="grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <div>
                  <p className="font-medium text-neutral-950">{template.title}</p>
                  <p className="mt-1 text-sm text-neutral-500">{template.description}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <StatusPill status={template.category} />
                  <form action={updateFileRequestTemplate}>
                    <button className="text-sm font-medium text-neutral-950">Edit</button>
                  </form>
                  <form action={deleteFileRequestTemplate}>
                    <button className="text-sm font-medium text-neutral-950">Delete</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </AdminShell>
  );
}
