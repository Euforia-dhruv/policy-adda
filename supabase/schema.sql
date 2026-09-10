# Policy Adda - Supabase Database Schema
# Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- ROLES
-- ============================================
create table if not exists roles (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  description text,
  created_at timestamptz default now()
);

insert into roles (name, description) values
  ('customer', 'Regular customer'),
  ('executive', 'Customer Executive'),
  ('support', 'Support Team'),
  ('manager', 'Manager'),
  ('admin', 'Administrator');

-- ============================================
-- USERS (extends Supabase auth.users)
-- ============================================
create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  phone text,
  role text not null default 'customer' references roles(name),
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create user profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, phone, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'phone', null),
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================
-- POLICY CATEGORIES
-- ============================================
create table if not exists policy_categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  icon text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz default now()
);

insert into policy_categories (name, slug, description, icon) values
  ('Motor Insurance', 'motor', 'Car, bike, and commercial vehicle insurance', 'car'),
  ('Health Insurance', 'health', 'Individual and family health plans', 'health'),
  ('Life Insurance', 'life', 'Term life and family protection plans', 'shield'),
  ('General Insurance', 'general', 'Home, personal accident, and other general insurance', 'shield');

-- ============================================
-- POLICIES
-- ============================================
create table if not exists policies (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references policy_categories(id) on delete set null,
  name text not null,
  slug text unique not null,
  provider text not null,
  description text,
  benefits text[] default '{}',
  eligibility text[] default '{}',
  coverage text[] default '{}',
  exclusions text[] default '{}',
  required_documents text[] default '{}',
  premium_range text,
  status text not null default 'active' check (status in ('active', 'inactive', 'draft')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- APPLICATIONS
-- ============================================
create table if not exists applications (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references users(id) on delete cascade,
  policy_id uuid references policies(id) on delete set null,
  assigned_employee_id uuid references users(id) on delete set null,
  status text not null default 'submitted' check (status in (
    'submitted', 'under_review', 'documents_pending', 'advisor_assigned',
    'processing', 'approved', 'rejected', 'settled'
  )),
  form_data jsonb default '{}',
  submitted_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- APPLICATION STATUS HISTORY
-- ============================================
create table if not exists application_status_history (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid references applications(id) on delete cascade,
  previous_status text,
  new_status text not null,
  changed_by uuid references users(id) on delete set null,
  notes text,
  created_at timestamptz default now()
);

-- ============================================
-- CUSTOMER ASSIGNMENTS
-- ============================================
create table if not exists customer_assignments (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references users(id) on delete cascade,
  application_id uuid references applications(id) on delete cascade,
  employee_id uuid references users(id) on delete cascade,
  assigned_at timestamptz default now(),
  notes text
);

-- ============================================
-- DOCUMENTS
-- ============================================
create table if not exists documents (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references users(id) on delete cascade,
  application_id uuid references applications(id) on delete set null,
  document_type text not null,
  file_name text not null,
  file_url text not null,
  file_size bigint,
  uploaded_at timestamptz default now()
);

-- ============================================
-- SUPPORT TICKETS
-- ============================================
create table if not exists support_tickets (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references users(id) on delete cascade,
  assigned_to uuid references users(id) on delete set null,
  subject text not null,
  description text,
  status text not null default 'open' check (status in (
    'open', 'in_progress', 'waiting', 'resolved', 'closed'
  )),
  priority text not null default 'medium' check (priority in (
    'low', 'medium', 'high', 'urgent'
  )),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- SUPPORT MESSAGES
-- ============================================
create table if not exists support_messages (
  id uuid primary key default uuid_generate_v4(),
  ticket_id uuid references support_tickets(id) on delete cascade,
  sender_id uuid references users(id) on delete set null,
  message text not null,
  is_internal boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- NOTIFICATIONS
-- ============================================
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  title text not null,
  message text,
  type text not null default 'info' check (type in ('info', 'success', 'warning', 'error')),
  is_read boolean default false,
  link text,
  created_at timestamptz default now()
);

-- ============================================
-- AUDIT LOGS
-- ============================================
create table if not exists audit_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  details jsonb default '{}',
  ip_address text,
  created_at timestamptz default now()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
alter table users enable row level security;
alter table policy_categories enable row level security;
alter table policies enable row level security;
alter table applications enable row level security;
alter table application_status_history enable row level security;
alter table customer_assignments enable row level security;
alter table documents enable row level security;
alter table support_tickets enable row level security;
alter table support_messages enable row level security;
alter table notifications enable row level security;
alter table audit_logs enable row level security;

-- Users: can read own profile, admins can read all
create policy "Users can view own profile" on users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on users
  for update using (auth.uid() = id);

create policy "Admins can view all users" on users
  for select using (
    exists (select 1 from users where id = auth.uid() and role = 'admin')
  );

-- Policies: public read, admin write
create policy "Anyone can view active policies" on policies
  for select using (status = 'active');

create policy "Admins can manage policies" on policies
  for all using (
    exists (select 1 from users where id = auth.uid() and role = 'admin')
  );

-- Policy categories: public read, admin write
create policy "Anyone can view categories" on policy_categories
  for select using (true);

create policy "Admins can manage categories" on policy_categories
  for all using (
    exists (select 1 from users where id = auth.uid() and role = 'admin')
  );

-- Applications: customer sees own, employee sees assigned, admin sees all
create policy "Customers can view own applications" on applications
  for select using (auth.uid() = customer_id);

create policy "Customers can insert own applications" on applications
  for insert with check (auth.uid() = customer_id);

create policy "Employees can view assigned applications" on applications
  for select using (
    exists (
      select 1 from customer_assignments ca
      where ca.application_id = applications.id
      and ca.employee_id = auth.uid()
    )
  );

create policy "Admins can manage all applications" on applications
  for all using (
    exists (select 1 from users where id = auth.uid() and role in ('admin', 'manager'))
  );

-- Documents: owner read, assigned employee read, admin all
create policy "Users can view own documents" on documents
  for select using (auth.uid() = owner_id);

create policy "Users can upload own documents" on documents
  for insert with check (auth.uid() = owner_id);

create policy "Admins can view all documents" on documents
  for all using (
    exists (select 1 from users where id = auth.uid() and role = 'admin')
  );

-- Support tickets: customer sees own, assigned staff sees assigned
create policy "Customers can view own tickets" on support_tickets
  for select using (auth.uid() = customer_id);

create policy "Customers can create tickets" on support_tickets
  for insert with check (auth.uid() = customer_id);

create policy "Support can view assigned tickets" on support_tickets
  for select using (
    exists (
      select 1 from users where id = auth.uid()
      and role in ('support', 'admin', 'manager')
    )
  );

-- Notifications: user sees own
create policy "Users can view own notifications" on notifications
  for select using (auth.uid() = user_id);

create policy "Users can update own notifications" on notifications
  for update using (auth.uid() = user_id);

-- ============================================
-- INDEXES
-- ============================================
create index if not exists idx_users_email on users(email);
create index if not exists idx_users_role on users(role);
create index if not exists idx_applications_customer on applications(customer_id);
create index if not exists idx_applications_status on applications(status);
create index if not exists idx_applications_employee on applications(assigned_employee_id);
create index if not exists idx_documents_owner on documents(owner_id);
create index if not exists idx_support_tickets_customer on support_tickets(customer_id);
create index if not exists idx_support_tickets_status on support_tickets(status);
create index if not exists idx_notifications_user on notifications(user_id);
create index if not exists idx_notifications_read on notifications(is_read);
