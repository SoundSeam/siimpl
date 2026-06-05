import Link from "next/link";
import type { ReactNode } from "react";
import { FiPaperclip, FiPlus, FiUpload } from "react-icons/fi";
import type {
  AuditEvent,
  ClientUser,
  Deadline,
  FileRequest,
  FileRequestStatus,
  MessageThread,
  OneDriveConnection,
  OneDriveFolderMapping,
} from "@/lib/portal-types";

type FormAction = (formData: FormData) => void | Promise<void>;

export const inputClass =
  "mt-2 h-12 w-full rounded-full border border-neutral-200 bg-white px-5 text-base text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950";

export const selectClass =
  "mt-2 h-12 w-full rounded-full border border-neutral-200 bg-white px-5 text-base text-neutral-950 outline-none transition-colors focus:border-neutral-950";

export const textareaClass =
  "mt-2 min-h-28 w-full rounded-[1.5rem] border border-neutral-200 bg-white px-5 py-4 text-base leading-6 text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950";

export const buttonClass =
  "inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90";

export const secondaryButtonClass =
  "inline-flex h-12 items-center justify-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-medium text-neutral-950 transition-colors hover:border-neutral-950";

export function PageHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950">
        {title}
      </h1>
      {action}
    </div>
  );
}

export function Section({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="border-t border-neutral-200 py-7 first:border-t-0 first:pt-0 first-of-type:border-t-0 first-of-type:pt-0">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-neutral-950">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function StatusPill({ status }: { status: string }) {
  const urgent = status === "overdue" || status === "rejected";
  const done = status === "accepted" || status === "active" || status === "verified";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
        urgent
          ? "border-red-200 bg-red-50 text-red-700"
          : done
            ? "border-neutral-200 bg-white text-neutral-700"
            : "border-neutral-200 bg-neutral-50 text-neutral-600"
      }`}
    >
      {status}
    </span>
  );
}

export function EmptyState({ title }: { title: string }) {
  return (
    <div className="rounded-[1.5rem] border border-neutral-200 bg-white px-5 py-8 text-center text-sm text-neutral-500">
      {title}
    </div>
  );
}

export function DefinitionList({
  items,
}: {
  items: readonly { label: string; value: ReactNode }[];
}) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-xs font-medium uppercase text-neutral-400">
            {item.label}
          </dt>
          <dd className="mt-1 text-sm text-neutral-950">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function DeadlineSummary({
  deadline,
}: {
  deadline: Deadline | undefined;
}) {
  if (!deadline) {
    return <EmptyState title="No deadline" />;
  }

  return (
    <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-950">{deadline.title}</p>
          <p className="mt-1 text-sm text-neutral-500">{formatDate(deadline.dueDate)}</p>
        </div>
        <StatusPill status={deadline.status} />
      </div>
    </div>
  );
}

export function FileRequestList({
  requests,
  basePath = "/portal/files",
  admin = false,
}: {
  requests: FileRequest[];
  basePath?: string;
  admin?: boolean;
}) {
  if (requests.length === 0) {
    return <EmptyState title="No requested files" />;
  }

  return (
    <div className="divide-y divide-neutral-200 rounded-[1.5rem] border border-neutral-200 bg-white">
      {requests.map((request) => (
        <FileRequestRow
          key={request.id}
          request={request}
          href={`${basePath}/${request.id}`}
          admin={admin}
        />
      ))}
    </div>
  );
}

export function FileRequestRow({
  request,
  href,
  admin = false,
}: {
  request: FileRequest;
  href: string;
  admin?: boolean;
}) {
  return (
    <div className="grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <div className="min-w-0">
        <Link
          href={href}
          className="font-medium text-neutral-950 underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
        >
          {request.title}
        </Link>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-500">
          <span>{request.category}</span>
          <span>{formatDate(request.dueDate)}</span>
          <span>{request.acceptedFileTypes.join(", ")}</span>
          {admin ? <span>{request.uploadedFiles.length} uploads</span> : null}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <StatusPill status={request.status} />
        <Link href={href} className="text-sm font-medium text-neutral-950">
          Open
        </Link>
      </div>
    </div>
  );
}

function DropzoneInput({
  name,
  label,
  description = "Drop file here or choose a file",
  compact = false,
}: {
  name: string;
  label: string;
  description?: string;
  compact?: boolean;
}) {
  return (
    <label
      className={`relative flex cursor-pointer flex-col items-center justify-center rounded-[1.25rem] border border-dashed border-neutral-300 bg-neutral-50 text-center transition-colors hover:border-neutral-500 hover:bg-white ${
        compact ? "min-h-24 px-4 py-4" : "min-h-36 px-5 py-6"
      }`}
    >
      <input
        type="file"
        name={name}
        aria-label={label}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700">
        <FiUpload aria-hidden="true" className="h-4 w-4" />
      </span>
      <span className="mt-3 text-sm font-medium text-neutral-950">{label}</span>
      <span className="mt-1 text-sm text-neutral-500">{description}</span>
    </label>
  );
}

export function FileUploadControl({
  label = "Upload",
  replacement = false,
}: {
  label?: string;
  replacement?: boolean;
}) {
  return (
    <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
      <DropzoneInput
        name="file"
        label={replacement ? "Replacement file" : "File"}
      />
      <button type="submit" className={`${buttonClass} mt-5 w-full sm:w-auto`}>
        {label}
      </button>
    </div>
  );
}

export function AuditTrail({
  events,
  detailed = false,
}: {
  events: AuditEvent[];
  detailed?: boolean;
}) {
  if (events.length === 0) {
    return <EmptyState title="No activity" />;
  }

  return (
    <ol className="divide-y divide-neutral-200 rounded-[1.5rem] border border-neutral-200 bg-white">
      {events.map((event) => (
        <li key={event.id} className="p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-950">
                {event.action}
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                {event.relatedEntity}
                {event.note ? ` - ${event.note}` : ""}
              </p>
              {detailed ? (
                <p className="mt-2 text-xs text-neutral-500">
                  {event.actor} · {event.actorRole}
                </p>
              ) : null}
            </div>
            <time className="text-sm text-neutral-500">
              {formatDateTime(event.timestamp)}
            </time>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function MessageThreadList({
  threads,
  basePath = "/portal/messages",
  admin = false,
}: {
  threads: MessageThread[];
  basePath?: string;
  admin?: boolean;
}) {
  if (threads.length === 0) {
    return <EmptyState title="No messages" />;
  }

  return (
    <div className="divide-y divide-neutral-200 rounded-[1.5rem] border border-neutral-200 bg-white">
      {threads.map((thread) => {
        const latest = thread.messages.at(-1);
        const unread = admin ? thread.unreadForAdmin : thread.unreadForClient;

        return (
          <Link
            key={thread.id}
            href={`${basePath}/${thread.id}`}
            className="block p-5 transition-colors hover:bg-neutral-50"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-neutral-950">{thread.subject}</p>
                {latest ? (
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-500">
                    {latest.body}
                  </p>
                ) : null}
              </div>
              {unread ? <StatusPill status="unread" /> : null}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function MessageComposer({
  action,
  admin = false,
  createRequestAction,
}: {
  action: FormAction;
  admin?: boolean;
  createRequestAction?: FormAction;
}) {
  return (
    <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-4">
      <form action={action}>
        <textarea
          name="message"
          rows={2}
          className="min-h-20 w-full resize-none rounded-[1.25rem] border border-neutral-200 bg-white px-4 py-3 text-base leading-6 text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950"
          placeholder="Message"
        />
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-xs">
            <DropzoneInput
              name="attachment"
              label="Attach file"
              description="Drop or choose"
              compact
            />
          </div>
          <button className={buttonClass}>Send</button>
        </div>
      </form>
      {admin && createRequestAction ? (
        <form
          action={createRequestAction}
          className="mt-4 border-t border-neutral-200 pt-4"
        >
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_9rem_8rem_auto] sm:items-end">
            <label className="block text-sm font-medium text-neutral-950">
              Request file
              <input
                name="requestTitle"
                className="mt-2 h-11 w-full rounded-full border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950"
                placeholder="Bank statements"
              />
            </label>
            <label className="block text-sm font-medium text-neutral-950">
              Due
              <input
                type="date"
                name="dueDate"
                className="mt-2 h-11 w-full rounded-full border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors focus:border-neutral-950"
              />
            </label>
            <label className="block text-sm font-medium text-neutral-950">
              Types
              <input
                name="acceptedTypes"
                className="mt-2 h-11 w-full rounded-full border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950"
                placeholder="PDF"
              />
            </label>
            <button className={secondaryButtonClass}>
              <FiPlus aria-hidden="true" className="mr-2 h-4 w-4" />
              Insert
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}

export function ChatWorkspace({
  thread,
  requests,
  currentRole,
  requestBasePath,
  sendAction,
  uploadAction,
  createRequestAction,
}: {
  thread: MessageThread;
  requests: FileRequest[];
  currentRole: "client" | "admin";
  requestBasePath: string;
  sendAction: FormAction;
  uploadAction?: FormAction;
  createRequestAction?: FormAction;
}) {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-8rem)] max-w-5xl flex-col">
      <div className="flex-1 space-y-5 pb-6">
        {thread.messages.map((message) => {
          const own = message.senderRole === currentRole;
          const linkedRequests = requests.filter((request) =>
            message.linkedFileRequestIds.includes(request.id),
          );

          return (
            <article
              key={message.id}
              className={`flex ${own ? "justify-end" : "justify-start"}`}
            >
              <div className={`w-full max-w-2xl ${own ? "sm:pl-16" : "sm:pr-16"}`}>
                <div
                  className={`rounded-[1.5rem] border p-5 ${
                    own
                      ? "border-neutral-200 bg-white"
                      : "border-neutral-200 bg-neutral-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-neutral-950">
                        {message.senderName}
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        {message.senderRole}
                      </p>
                    </div>
                    <time className="text-xs text-neutral-500">
                      {formatDateTime(message.sentAt)}
                    </time>
                  </div>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-neutral-700">
                    {message.body}
                  </p>
                  {message.attachments.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {message.attachments.map((attachment) => (
                        <span
                          key={attachment}
                          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-600"
                        >
                          <FiPaperclip aria-hidden="true" className="h-3.5 w-3.5" />
                          {attachment}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {linkedRequests.length > 0 ? (
                    <div className="mt-4 grid gap-3">
                      {linkedRequests.map((request) => (
                        <FileRequestMessagePane
                          key={request.id}
                          request={request}
                          href={`${requestBasePath}/${request.id}`}
                          uploadAction={currentRole === "client" ? uploadAction : undefined}
                          admin={currentRole === "admin"}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="sticky bottom-0 z-20 -mx-5 border-t border-neutral-200 bg-neutral-100 px-5 py-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <MessageComposer
            action={sendAction}
            admin={currentRole === "admin"}
            createRequestAction={createRequestAction}
          />
        </div>
      </div>
    </div>
  );
}

function FileRequestMessagePane({
  request,
  href,
  uploadAction,
  admin = false,
}: {
  request: FileRequest;
  href: string;
  uploadAction?: FormAction;
  admin?: boolean;
}) {
  return (
    <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-950">{request.title}</p>
          <p className="mt-2 text-sm leading-6 text-neutral-500">
            {request.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600">
              {formatDate(request.dueDate)}
            </span>
            <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600">
              {request.acceptedFileTypes.join(", ")}
            </span>
            <StatusPill status={request.status} />
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link href={href} className={secondaryButtonClass}>
            {admin ? "Open" : "Details"}
          </Link>
          {uploadAction ? (
            <form action={uploadAction} className="grid w-full gap-3 sm:w-72">
              <DropzoneInput
                name="file"
                label="Upload file"
                description="Drop or choose"
                compact
              />
              <button className={buttonClass}>
                <FiUpload aria-hidden="true" className="mr-2 h-4 w-4" />
                Upload
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ClientUserList({ users }: { users: ClientUser[] }) {
  return (
    <div className="divide-y divide-neutral-200 rounded-[1.5rem] border border-neutral-200 bg-white">
      {users.map((user) => (
        <div
          key={user.id}
          className="grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
        >
          <div>
            <p className="font-medium text-neutral-950">{user.name}</p>
            <p className="mt-1 text-sm text-neutral-500">{user.email}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill status={user.role} />
            {user.lastActive ? (
              <span className="text-sm text-neutral-500">
                {formatDate(user.lastActive)}
              </span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export function NotificationPreferencesForm({
  action,
  smsEnabled = true,
}: {
  action: FormAction;
  smsEnabled?: boolean;
}) {
  return (
    <form action={action} className="grid gap-5">
      <label className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-neutral-200 bg-white p-5 text-sm font-medium text-neutral-950">
        Email reminders
        <input type="checkbox" name="email" defaultChecked className="h-4 w-4" />
      </label>
      <label className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-neutral-200 bg-white p-5 text-sm font-medium text-neutral-950">
        SMS near deadline
        <input
          type="checkbox"
          name="sms"
          defaultChecked={smsEnabled}
          className="h-4 w-4"
        />
      </label>
      <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
        <p className="text-sm font-medium text-neutral-950">Schedule</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["14 days email", "7 days email", "2 days email", "1 day SMS"].map(
            (item) => (
              <span
                key={item}
                className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-600"
              >
                {item}
              </span>
            ),
          )}
        </div>
      </div>
      <button className={`${buttonClass} w-full sm:w-fit`}>Save</button>
    </form>
  );
}

export function OneDriveStatus({
  connection,
  mapping,
}: {
  connection: OneDriveConnection;
  mapping?: OneDriveFolderMapping;
}) {
  return (
    <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-neutral-950">
            {connection.accountName ?? "OneDrive"}
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            {mapping?.folderPath ?? "No folder mapped"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusPill status={connection.status} />
          {mapping ? <StatusPill status={mapping.accessStatus} /> : null}
        </div>
      </div>
    </div>
  );
}

export function DeadlineGroupList({
  groups,
}: {
  groups: readonly { title: string; deadlines: Deadline[] }[];
}) {
  return (
    <div className="grid gap-6">
      {groups.map((group) => (
        <Section key={group.title} title={group.title}>
          {group.deadlines.length > 0 ? (
            <div className="divide-y divide-neutral-200 rounded-[1.5rem] border border-neutral-200 bg-white">
              {group.deadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className="grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                >
                  <div>
                    <p className="font-medium text-neutral-950">
                      {deadline.title}
                    </p>
                    <p className="mt-1 text-sm text-neutral-500">
                      {formatDate(deadline.dueDate)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusPill status={deadline.status} />
                    <button className="text-sm font-medium text-neutral-950">
                      Send reminder
                    </button>
                    <Link
                      href={`/admin/clients/${deadline.clientId}`}
                      className="text-sm font-medium text-neutral-950"
                    >
                      Open
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="None" />
          )}
        </Section>
      ))}
    </div>
  );
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function statusPriority(status: FileRequestStatus) {
  const weights: Record<FileRequestStatus, number> = {
    overdue: 0,
    rejected: 1,
    "not started": 2,
    uploaded: 3,
    "needs review": 4,
    accepted: 5,
  };

  return weights[status];
}
