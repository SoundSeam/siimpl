"use client";

import { useEffect, useState } from "react";
import {
  completeOnboarding,
  createClientAccount,
  createFileRequest,
  createFileRequestTemplate,
  inviteClientAccountUser,
  updateBusinessProfile,
} from "@/lib/portal-actions";
import {
  buttonClass,
  inputClass,
  secondaryButtonClass,
  selectClass,
  textareaClass,
} from "./Ui";

const onboardingSteps = ["Business", "Notifications", "Accounting", "Access"];

type OnboardingDraft = {
  businessName: string;
  businessType: string;
  contactPerson: string;
  email: string;
  phone: string;
  notificationMethod: string;
  smsOptIn: boolean;
  accountingSoftware: string;
  payrollProvider: string;
  fiscalYearEnd: string;
  taxDeadlineAwareness: string;
  fileAccessPreference: string;
};

const emptyDraft: OnboardingDraft = {
  businessName: "Northstar Studio Inc.",
  businessType: "Design services",
  contactPerson: "Maya Chen",
  email: "maya@northstar.example",
  phone: "514-555-0184",
  notificationMethod: "Email",
  smsOptIn: true,
  accountingSoftware: "QuickBooks Online",
  payrollProvider: "Wagepoint",
  fiscalYearEnd: "December 31",
  taxDeadlineAwareness: "Send reminders",
  fileAccessPreference: "Siimpl folder",
};

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<OnboardingDraft>(() => {
    if (typeof window === "undefined") {
      return emptyDraft;
    }

    const saved = window.localStorage.getItem("siimpl-onboarding");

    return saved ? (JSON.parse(saved) as OnboardingDraft) : emptyDraft;
  });

  useEffect(() => {
    window.localStorage.setItem("siimpl-onboarding", JSON.stringify(draft));
  }, [draft]);

  const update = (field: keyof OnboardingDraft, value: string | boolean) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  return (
    <form action={completeOnboarding} className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center gap-2">
        {onboardingSteps.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(index)}
            className={`h-2 flex-1 rounded-full transition-colors ${
              index <= step ? "bg-neutral-950" : "bg-neutral-200"
            }`}
            aria-label={label}
          />
        ))}
      </div>

      {step === 0 ? (
        <div className="grid gap-5">
          <TextField
            label="Business name"
            value={draft.businessName}
            onChange={(value) => update("businessName", value)}
          />
          <TextField
            label="Business type"
            value={draft.businessType}
            onChange={(value) => update("businessType", value)}
          />
          <TextField
            label="Contact person"
            value={draft.contactPerson}
            onChange={(value) => update("contactPerson", value)}
          />
          <TextField
            label="Email"
            type="email"
            value={draft.email}
            onChange={(value) => update("email", value)}
          />
          <TextField
            label="Phone"
            value={draft.phone}
            onChange={(value) => update("phone", value)}
          />
        </div>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-5">
          <SelectField
            label="Preferred notification"
            value={draft.notificationMethod}
            options={["Email", "Email and SMS"]}
            onChange={(value) => update("notificationMethod", value)}
          />
          <label className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-neutral-200 bg-white p-5 text-sm font-medium text-neutral-950">
            SMS opt-in
            <input
              type="checkbox"
              checked={draft.smsOptIn}
              onChange={(event) => update("smsOptIn", event.target.checked)}
              className="h-4 w-4"
            />
          </label>
          <SelectField
            label="Tax deadlines"
            value={draft.taxDeadlineAwareness}
            options={["Send reminders", "I track them", "Unsure"]}
            onChange={(value) => update("taxDeadlineAwareness", value)}
          />
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-5">
          <TextField
            label="Accounting software"
            value={draft.accountingSoftware}
            onChange={(value) => update("accountingSoftware", value)}
          />
          <TextField
            label="Payroll provider"
            value={draft.payrollProvider}
            onChange={(value) => update("payrollProvider", value)}
          />
          <TextField
            label="Fiscal year-end"
            value={draft.fiscalYearEnd}
            onChange={(value) => update("fiscalYearEnd", value)}
          />
        </div>
      ) : null}

      {step === 3 ? (
        <div className="grid gap-5">
          <SelectField
            label="File access"
            value={draft.fileAccessPreference}
            options={["Siimpl folder", "Upload files here", "Use my OneDrive"]}
            onChange={(value) => update("fileAccessPreference", value)}
          />
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          className={secondaryButtonClass}
          onClick={() => setStep((current) => Math.max(0, current - 1))}
        >
          Back
        </button>
        {step < onboardingSteps.length - 1 ? (
          <button
            type="button"
            className={buttonClass}
            onClick={() =>
              setStep((current) =>
                Math.min(onboardingSteps.length - 1, current + 1),
              )
            }
          >
            Continue
          </button>
        ) : (
          <button className={buttonClass}>Complete</button>
        )}
      </div>
    </form>
  );
}

export function BusinessProfileForm() {
  return (
    <form action={updateBusinessProfile} className="grid gap-5 sm:grid-cols-2">
      <TextField label="Business name" defaultValue="Northstar Studio Inc." />
      <TextField label="Business type" defaultValue="Design services" />
      <TextField label="Contact person" defaultValue="Maya Chen" />
      <TextField label="Email" type="email" defaultValue="maya@northstar.example" />
      <TextField label="Phone" defaultValue="514-555-0184" />
      <TextField label="Fiscal year-end" defaultValue="December 31" />
      <div className="sm:col-span-2">
        <button className={buttonClass}>Save</button>
      </div>
    </form>
  );
}

export function InviteUserForm() {
  return (
    <form action={inviteClientAccountUser} className="grid gap-5 sm:grid-cols-[1fr_13rem_auto] sm:items-end">
      <TextField label="Email" type="email" placeholder="name@company.com" />
      <SelectField label="Role" options={["manager", "viewer", "owner"]} />
      <button className={buttonClass}>Invite</button>
    </form>
  );
}

export function ClientAccountForm() {
  return (
    <form action={createClientAccount} className="mx-auto grid max-w-2xl gap-5">
      <TextField label="Business name" />
      <TextField label="Business type" />
      <TextField label="Contact person" />
      <TextField label="Email" type="email" />
      <TextField label="Phone" />
      <label className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-neutral-200 bg-white p-5 text-sm font-medium text-neutral-950">
        Send onboarding invite
        <input type="checkbox" name="sendInvite" defaultChecked className="h-4 w-4" />
      </label>
      <button className={`${buttonClass} w-full sm:w-fit`}>Create client</button>
    </form>
  );
}

export function FileRequestForm({ preview = false }: { preview?: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <form action={createFileRequest} className="grid gap-5">
        <TextField label="Title" defaultValue="May bank statements" />
        <label className="block text-sm font-medium text-neutral-950">
          Notes
          <textarea
            name="description"
            className={textareaClass}
            defaultValue="Operating account and credit card statements."
          />
        </label>
        <TextField label="Accepted file types" defaultValue="PDF" />
        <TextField label="Due date" type="date" defaultValue="2026-06-10" />
        <TextField label="Category" defaultValue="Bookkeeping" />
        <SelectField label="Requirement" options={["required", "optional"]} />
        <SelectField
          label="Notifications"
          options={["7 days, 2 days email, 1 day SMS", "14 days, 7 days, 2 days email"]}
        />
        <button className={`${buttonClass} w-full sm:w-fit`}>Save request</button>
      </form>
      {preview ? (
        <aside className="h-fit rounded-[1.5rem] border border-neutral-200 bg-white p-5">
          <p className="font-medium text-neutral-950">May bank statements</p>
          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Operating account and credit card statements.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm text-neutral-600">
            <span className="rounded-full border border-neutral-200 px-3 py-1">
              PDF
            </span>
            <span className="rounded-full border border-neutral-200 px-3 py-1">
              Jun 10, 2026
            </span>
          </div>
        </aside>
      ) : null}
    </div>
  );
}

export function FileTemplateForm() {
  return (
    <form action={createFileRequestTemplate} className="grid gap-5">
      <TextField label="Template name" />
      <label className="block text-sm font-medium text-neutral-950">
        Notes
        <textarea name="description" className={textareaClass} />
      </label>
      <TextField label="Accepted file types" />
      <TextField label="Category" />
      <button className={`${buttonClass} w-full sm:w-fit`}>Create template</button>
    </form>
  );
}

function TextField({
  label,
  type = "text",
  value,
  defaultValue,
  placeholder,
  onChange,
}: {
  label: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-medium text-neutral-950">
      {label}
      <input
        type={type}
        name={label.toLowerCase().replace(/\s+/g, "-")}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        className={inputClass}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value?: string;
  options: string[];
  onChange?: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-medium text-neutral-950">
      {label}
      <select
        name={label.toLowerCase().replace(/\s+/g, "-")}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        className={selectClass}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
