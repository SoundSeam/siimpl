import type {
  AdminUser,
  AuditEvent,
  ClientAccount,
  ClientUser,
  Deadline,
  FileRequest,
  FileRequestTemplate,
  MessageThread,
  NotificationPreference,
  OneDriveConnection,
  OneDriveFolderMapping,
} from "./portal-types";

export const clientAccounts: ClientAccount[] = [
  {
    id: "northstar",
    businessName: "Northstar Studio Inc.",
    businessType: "Design services",
    contactName: "Maya Chen",
    email: "maya@northstar.example",
    phone: "514-555-0184",
    status: "active",
    accountingSoftware: "QuickBooks Online",
    payrollProvider: "Wagepoint",
    fiscalYearEnd: "December 31",
    oneDriveFolderId: "folder-northstar",
  },
  {
    id: "riverstone",
    businessName: "Riverstone Foods",
    businessType: "Restaurant group",
    contactName: "Olivier Martin",
    email: "olivier@riverstone.example",
    phone: "450-555-0172",
    status: "onboarding",
    accountingSoftware: "Xero",
    payrollProvider: "Nethris",
    fiscalYearEnd: "August 31",
    oneDriveFolderId: "folder-riverstone",
  },
  {
    id: "atelier",
    businessName: "Atelier Brossard",
    businessType: "Retail",
    contactName: "Sofia Romano",
    email: "sofia@atelier.example",
    phone: "438-555-0129",
    status: "active",
    accountingSoftware: "Sage",
    payrollProvider: "None",
    fiscalYearEnd: "March 31",
  },
];

export const clientUsers: ClientUser[] = [
  {
    id: "cu-1",
    clientId: "northstar",
    name: "Maya Chen",
    email: "maya@northstar.example",
    role: "owner",
    lastActive: "2026-06-05T09:20:00-04:00",
  },
  {
    id: "cu-2",
    clientId: "northstar",
    name: "Theo Bernard",
    email: "theo@northstar.example",
    role: "manager",
    lastActive: "2026-06-03T15:10:00-04:00",
  },
  {
    id: "cu-3",
    clientId: "riverstone",
    name: "Olivier Martin",
    email: "olivier@riverstone.example",
    role: "owner",
    lastActive: "2026-06-01T10:00:00-04:00",
  },
];

export const adminUsers: AdminUser[] = [
  {
    id: "au-1",
    name: "Daniel Roy",
    email: "daniel@siimpl.com",
    role: "owner",
    status: "active",
    lastActive: "2026-06-05T10:20:00-04:00",
  },
  {
    id: "au-2",
    name: "Nadia Singh",
    email: "nadia@siimpl.com",
    role: "admin",
    status: "active",
    lastActive: "2026-06-04T16:45:00-04:00",
  },
  {
    id: "au-3",
    name: "Marc Ellis",
    email: "marc@siimpl.com",
    role: "reviewer",
    status: "invited",
  },
];

export const fileRequests: FileRequest[] = [
  {
    id: "fr-sales-tax-may",
    clientId: "northstar",
    title: "May sales tax records",
    description: "Sales reports and expense receipts for the May filing.",
    acceptedFileTypes: ["PDF", "CSV", "XLSX"],
    dueDate: "2026-06-10",
    category: "Sales tax",
    required: true,
    status: "needs review",
    adminNotes: "Include marketplace payout reports if separate.",
    notificationSchedule: ["14 days", "7 days", "2 days email", "1 day SMS"],
    uploadedFiles: [
      {
        id: "uf-1",
        requestId: "fr-sales-tax-may",
        fileName: "may-sales-summary.xlsx",
        fileType: "XLSX",
        uploadedBy: "Maya Chen",
        uploadedAt: "2026-06-04T13:14:00-04:00",
        status: "uploaded",
      },
    ],
  },
  {
    id: "fr-bank-may",
    clientId: "northstar",
    title: "May bank statements",
    description: "Operating account and credit card statements.",
    acceptedFileTypes: ["PDF"],
    dueDate: "2026-06-07",
    category: "Bookkeeping",
    required: true,
    status: "not started",
    notificationSchedule: ["7 days", "2 days email", "1 day SMS"],
    uploadedFiles: [],
  },
  {
    id: "fr-payroll-q2",
    clientId: "northstar",
    title: "Q2 payroll register",
    description: "Payroll register and remittance confirmation.",
    acceptedFileTypes: ["PDF", "CSV"],
    dueDate: "2026-06-03",
    category: "Payroll",
    required: true,
    status: "overdue",
    notificationSchedule: ["14 days", "7 days", "2 days email", "1 day SMS"],
    uploadedFiles: [],
  },
  {
    id: "fr-riverstone-onboarding",
    clientId: "riverstone",
    title: "Prior year tax return",
    description: "Most recent corporate return and notices.",
    acceptedFileTypes: ["PDF"],
    dueDate: "2026-06-14",
    category: "Onboarding",
    required: true,
    status: "uploaded",
    notificationSchedule: ["7 days", "2 days email"],
    uploadedFiles: [
      {
        id: "uf-2",
        requestId: "fr-riverstone-onboarding",
        fileName: "2025-corporate-return.pdf",
        fileType: "PDF",
        uploadedBy: "Olivier Martin",
        uploadedAt: "2026-06-02T11:05:00-04:00",
        status: "accepted",
      },
    ],
  },
  {
    id: "fr-atelier-year-end",
    clientId: "atelier",
    title: "Year-end documents",
    description: "Inventory count, statements, and major invoices.",
    acceptedFileTypes: ["PDF", "XLSX"],
    dueDate: "2026-06-21",
    category: "Year end",
    required: true,
    status: "rejected",
    adminNotes: "Inventory file is missing final counts.",
    notificationSchedule: ["14 days", "7 days", "2 days email"],
    uploadedFiles: [
      {
        id: "uf-3",
        requestId: "fr-atelier-year-end",
        fileName: "inventory-draft.xlsx",
        fileType: "XLSX",
        uploadedBy: "Sofia Romano",
        uploadedAt: "2026-06-01T08:42:00-04:00",
        status: "rejected",
        rejectionNote: "Missing final count sheet.",
      },
    ],
  },
];

export const messageThreads: MessageThread[] = [
  {
    id: "thread-sales-tax",
    clientId: "northstar",
    subject: "May sales tax records",
    unreadForClient: true,
    unreadForAdmin: false,
    messages: [
      {
        id: "m-1",
        senderName: "Nadia Singh",
        senderRole: "admin",
        body: "Please add the Stripe payout export when ready. I linked the request below.",
        sentAt: "2026-06-04T14:05:00-04:00",
        attachments: [],
        linkedFileRequestIds: ["fr-sales-tax-may"],
      },
      {
        id: "m-2",
        senderName: "Maya Chen",
        senderRole: "client",
        body: "Uploaded the sales summary. Stripe export is next.",
        sentAt: "2026-06-04T14:22:00-04:00",
        attachments: ["may-sales-summary.xlsx"],
        linkedFileRequestIds: ["fr-sales-tax-may"],
      },
    ],
  },
  {
    id: "thread-bank",
    clientId: "northstar",
    subject: "Bank statements",
    unreadForClient: false,
    unreadForAdmin: true,
    messages: [
      {
        id: "m-3",
        senderName: "Maya Chen",
        senderRole: "client",
        body: "The bank portal is delayed. I can upload screenshots today.",
        sentAt: "2026-06-05T08:58:00-04:00",
        attachments: [],
        linkedFileRequestIds: ["fr-bank-may"],
      },
      {
        id: "m-4",
        senderName: "Nadia Singh",
        senderRole: "admin",
        body: "Screenshots are fine for today. Please upload the statement PDF once the portal is available.",
        sentAt: "2026-06-05T09:12:00-04:00",
        attachments: [],
        linkedFileRequestIds: ["fr-bank-may"],
      },
    ],
  },
];

export const auditEvents: AuditEvent[] = [
  {
    id: "ae-1",
    clientId: "northstar",
    actor: "Nadia Singh",
    actorRole: "admin",
    action: "file requested",
    timestamp: "2026-05-29T10:00:00-04:00",
    relatedEntity: "May bank statements",
  },
  {
    id: "ae-2",
    clientId: "northstar",
    actor: "Maya Chen",
    actorRole: "client",
    action: "file uploaded",
    timestamp: "2026-06-04T13:14:00-04:00",
    relatedEntity: "may-sales-summary.xlsx",
  },
  {
    id: "ae-3",
    clientId: "northstar",
    actor: "System",
    actorRole: "system",
    action: "notification sent",
    timestamp: "2026-06-05T08:00:00-04:00",
    relatedEntity: "Q2 payroll register",
    note: "SMS reminder",
  },
  {
    id: "ae-4",
    clientId: "atelier",
    actor: "Daniel Roy",
    actorRole: "admin",
    action: "file rejected",
    timestamp: "2026-06-02T09:32:00-04:00",
    relatedEntity: "inventory-draft.xlsx",
    note: "Missing final count sheet",
  },
];

export const notificationPreferences: NotificationPreference[] = [
  {
    clientId: "northstar",
    emailEnabled: true,
    smsEnabled: true,
    reminderDaysBefore: [14, 7, 2],
    smsDaysBefore: [1],
  },
  {
    clientId: "riverstone",
    emailEnabled: true,
    smsEnabled: false,
    reminderDaysBefore: [7, 2],
    smsDaysBefore: [1],
  },
];

export const deadlines: Deadline[] = [
  {
    id: "dl-1",
    clientId: "northstar",
    title: "Q2 payroll register",
    dueDate: "2026-06-03",
    status: "overdue",
  },
  {
    id: "dl-2",
    clientId: "northstar",
    title: "May bank statements",
    dueDate: "2026-06-07",
    status: "due this week",
  },
  {
    id: "dl-3",
    clientId: "riverstone",
    title: "Prior year tax return",
    dueDate: "2026-06-14",
    status: "due this month",
  },
  {
    id: "dl-4",
    clientId: "atelier",
    title: "Year-end documents",
    dueDate: "2026-06-21",
    status: "due this month",
  },
];

export const fileRequestTemplates: FileRequestTemplate[] = [
  {
    id: "tpl-bookkeeping",
    title: "Monthly bookkeeping package",
    description: "Bank statements, credit card statements, receipts, and sales exports.",
    acceptedFileTypes: ["PDF", "CSV", "XLSX"],
    category: "Bookkeeping",
    required: true,
    notificationSchedule: ["7 days", "2 days email", "1 day SMS"],
  },
  {
    id: "tpl-tax",
    title: "Tax return package",
    description: "Prior filings, notices, slips, statements, and supporting schedules.",
    acceptedFileTypes: ["PDF"],
    category: "Tax",
    required: true,
    notificationSchedule: ["14 days", "7 days", "2 days email"],
  },
  {
    id: "tpl-payroll",
    title: "Payroll documents",
    description: "Payroll register, remittance confirmations, and year-end slips.",
    acceptedFileTypes: ["PDF", "CSV"],
    category: "Payroll",
    required: true,
    notificationSchedule: ["7 days", "2 days email"],
  },
  {
    id: "tpl-year-end",
    title: "Year-end documents",
    description: "Inventory, fixed asset additions, loan statements, and major invoices.",
    acceptedFileTypes: ["PDF", "XLSX"],
    category: "Year end",
    required: true,
    notificationSchedule: ["30 days", "14 days", "7 days", "2 days email"],
  },
];

export const oneDriveConnection: OneDriveConnection = {
  id: "od-1",
  status: "needs attention",
  accountName: "Siimpl Shared Documents",
  lastVerified: "2026-05-30T12:00:00-04:00",
};

export const oneDriveFolderMappings: OneDriveFolderMapping[] = [
  {
    id: "map-1",
    clientId: "northstar",
    folderName: "Northstar Studio Inc.",
    folderPath: "/Clients/Northstar Studio Inc.",
    accessStatus: "verified",
    lastChecked: "2026-06-04T09:00:00-04:00",
  },
  {
    id: "map-2",
    clientId: "riverstone",
    folderName: "Riverstone Foods",
    folderPath: "/Clients/Riverstone Foods",
    accessStatus: "needs attention",
    lastChecked: "2026-06-01T09:00:00-04:00",
  },
];

export const currentClientId = "northstar";

export function getClient(clientId = currentClientId) {
  return clientAccounts.find((client) => client.id === clientId) ?? clientAccounts[0];
}

export function getClientRequests(clientId = currentClientId) {
  return fileRequests.filter((request) => request.clientId === clientId);
}

export function getClientThreads(clientId = currentClientId) {
  return messageThreads.filter((thread) => thread.clientId === clientId);
}

export function getClientEvents(clientId = currentClientId) {
  return auditEvents.filter((event) => event.clientId === clientId);
}

export function getClientUsers(clientId = currentClientId) {
  return clientUsers.filter((user) => user.clientId === clientId);
}
