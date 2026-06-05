export type FileRequestStatus =
  | "not started"
  | "uploaded"
  | "needs review"
  | "accepted"
  | "rejected"
  | "overdue";

export type ClientUserRole = "owner" | "manager" | "viewer";
export type AdminUserRole = "owner" | "admin" | "reviewer";
export type NotificationChannel = "email" | "sms";

export type ClientAccount = {
  id: string;
  businessName: string;
  businessType: string;
  contactName: string;
  email: string;
  phone: string;
  status: "active" | "onboarding" | "archived";
  accountingSoftware: string;
  payrollProvider: string;
  fiscalYearEnd: string;
  oneDriveFolderId?: string;
};

export type ClientUser = {
  id: string;
  clientId: string;
  name: string;
  email: string;
  role: ClientUserRole;
  lastActive?: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminUserRole;
  status: "active" | "invited" | "deactivated";
  lastActive?: string;
};

export type UploadedFile = {
  id: string;
  requestId: string;
  fileName: string;
  fileType: string;
  uploadedBy: string;
  uploadedAt: string;
  status: "uploaded" | "accepted" | "rejected" | "removed";
  rejectionNote?: string;
};

export type FileRequest = {
  id: string;
  clientId: string;
  title: string;
  description: string;
  acceptedFileTypes: string[];
  dueDate: string;
  category: string;
  required: boolean;
  status: FileRequestStatus;
  adminNotes?: string;
  notificationSchedule: string[];
  uploadedFiles: UploadedFile[];
};

export type Message = {
  id: string;
  senderName: string;
  senderRole: "client" | "admin";
  body: string;
  sentAt: string;
  attachments: string[];
  linkedFileRequestIds: string[];
};

export type MessageThread = {
  id: string;
  clientId: string;
  subject: string;
  unreadForClient: boolean;
  unreadForAdmin: boolean;
  messages: Message[];
};

export type AuditEvent = {
  id: string;
  clientId: string;
  actor: string;
  actorRole: "client" | "admin" | "system";
  action:
    | "file requested"
    | "file uploaded"
    | "file accepted"
    | "file rejected"
    | "deadline changed"
    | "user added"
    | "message sent"
    | "notification sent"
    | "client archived"
    | "folder mapped";
  timestamp: string;
  relatedEntity: string;
  note?: string;
};

export type NotificationPreference = {
  clientId: string;
  emailEnabled: boolean;
  smsEnabled: boolean;
  reminderDaysBefore: number[];
  smsDaysBefore: number[];
};

export type Deadline = {
  id: string;
  clientId: string;
  title: string;
  dueDate: string;
  status: "overdue" | "due this week" | "due this month" | "no deadline";
};

export type FileRequestTemplate = {
  id: string;
  title: string;
  description: string;
  acceptedFileTypes: string[];
  category: string;
  required: boolean;
  notificationSchedule: string[];
};

export type OneDriveConnection = {
  id: string;
  status: "not connected" | "connected" | "needs attention";
  accountName?: string;
  lastVerified?: string;
};

export type OneDriveFolderMapping = {
  id: string;
  clientId: string;
  folderName: string;
  folderPath: string;
  accessStatus: "not mapped" | "verified" | "needs attention";
  lastChecked?: string;
};
