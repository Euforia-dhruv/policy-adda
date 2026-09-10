export type UserRole = "customer" | "executive" | "support" | "manager" | "admin";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface PolicyCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at?: string;
}

export type PolicyStatus = "draft" | "under_review" | "active" | "inactive" | "archived";

export interface Policy {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  provider: string;
  description: string;
  short_description?: string;
  full_description?: string;
  eligibility_criteria?: string;
  coverage_details?: string;
  benefits: string[];
  eligibility: string[];
  coverage: string[];
  exclusions: string[];
  required_documents: string[];
  premium_range?: string;
  status: PolicyStatus;
  created_at: string;
  updated_at: string;
  category?: PolicyCategory;
}

export interface InsuranceProvider {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  website?: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

export interface PolicyProvider {
  id: string;
  policy_id: string;
  provider_id: string;
  status: "active" | "inactive";
  created_at: string;
  provider?: InsuranceProvider;
}

export interface PolicyBenefit {
  id: string;
  policy_id: string;
  title: string;
  description?: string;
  sort_order: number;
  created_at: string;
}

export interface PolicyExclusion {
  id: string;
  policy_id: string;
  title: string;
  description?: string;
  sort_order: number;
  created_at: string;
}

export interface PolicyDocumentRequired {
  id: string;
  policy_id: string;
  document_name: string;
  description?: string;
  required: boolean;
  sort_order: number;
  created_at: string;
}

export interface PolicyFaq {
  id: string;
  policy_id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
}

export type ApplicationStatus =
  | "submitted"
  | "under_review"
  | "documents_pending"
  | "advisor_assigned"
  | "processing"
  | "approved"
  | "rejected"
  | "settled";

export interface Application {
  id: string;
  customer_id: string;
  policy_id: string;
  assigned_employee_id?: string;
  status: ApplicationStatus;
  form_data: Record<string, unknown>;
  submitted_at: string;
  updated_at: string;
}

export interface ApplicationStatusHistory {
  id: string;
  application_id: string;
  previous_status: ApplicationStatus | null;
  new_status: ApplicationStatus;
  changed_by: string;
  notes?: string;
  created_at: string;
}

export interface CustomerAssignment {
  id: string;
  customer_id: string;
  application_id: string;
  employee_id: string;
  assigned_at: string;
  notes?: string;
}

export interface Document {
  id: string;
  owner_id: string;
  application_id?: string;
  document_type: string;
  file_name: string;
  file_url: string;
  file_size: number;
  uploaded_at: string;
}

export type TicketStatus = "open" | "in_progress" | "waiting" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";

export interface SupportTicket {
  id: string;
  customer_id: string;
  assigned_to?: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  created_at: string;
  updated_at: string;
}

export interface SupportMessage {
  id: string;
  ticket_id: string;
  sender_id: string;
  message: string;
  is_internal: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  is_read: boolean;
  link?: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: Record<string, unknown>;
  ip_address?: string;
  created_at: string;
}
