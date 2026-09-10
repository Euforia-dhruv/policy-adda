-- Policy Management System Migration
-- Run this in Supabase SQL Editor AFTER the initial schema.sql

-- ============================================
-- ALTER EXISTING TABLES
-- ============================================

-- Add updated_at to policy_categories
ALTER TABLE policy_categories ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Add new columns to policies
ALTER TABLE policies ADD COLUMN IF NOT EXISTS short_description text;
ALTER TABLE policies ADD COLUMN IF NOT EXISTS full_description text;
ALTER TABLE policies ADD COLUMN IF NOT EXISTS eligibility_criteria text;
ALTER TABLE policies ADD COLUMN IF NOT EXISTS coverage_details text;

-- Update policies status check to include new statuses
ALTER TABLE policies DROP CONSTRAINT IF EXISTS policies_status_check;
ALTER TABLE policies ADD CONSTRAINT policies_status_check
  CHECK (status IN ('draft', 'under_review', 'active', 'inactive', 'archived'));

-- ============================================
-- INSURANCE PROVIDERS
-- ============================================
CREATE TABLE IF NOT EXISTS insurance_providers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  logo_url text,
  website text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- POLICY PROVIDERS (many-to-many)
-- ============================================
CREATE TABLE IF NOT EXISTS policy_providers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  policy_id uuid NOT NULL REFERENCES policies(id) ON DELETE CASCADE,
  provider_id uuid NOT NULL REFERENCES insurance_providers(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(policy_id, provider_id)
);

-- ============================================
-- POLICY BENEFITS
-- ============================================
CREATE TABLE IF NOT EXISTS policy_benefits (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  policy_id uuid NOT NULL REFERENCES policies(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- POLICY EXCLUSIONS
-- ============================================
CREATE TABLE IF NOT EXISTS policy_exclusions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  policy_id uuid NOT NULL REFERENCES policies(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- POLICY DOCUMENTS REQUIRED
-- ============================================
CREATE TABLE IF NOT EXISTS policy_documents_required (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  policy_id uuid NOT NULL REFERENCES policies(id) ON DELETE CASCADE,
  document_name text NOT NULL,
  description text,
  required boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- POLICY FAQs
-- ============================================
CREATE TABLE IF NOT EXISTS policy_faqs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  policy_id uuid NOT NULL REFERENCES policies(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- RLS: ENABLE ON NEW TABLES
-- ============================================
ALTER TABLE insurance_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_exclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_documents_required ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_faqs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS: INSURANCE PROVIDERS
-- ============================================
-- Public can view active providers
CREATE POLICY "Anyone can view active providers" ON insurance_providers
  FOR SELECT USING (status = 'active');

-- Admins can manage all providers
CREATE POLICY "Admins can manage providers" ON insurance_providers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- RLS: POLICY PROVIDERS
-- ============================================
-- Public can view active policy-provider links
CREATE POLICY "Anyone can view active policy providers" ON policy_providers
  FOR SELECT USING (status = 'active');

-- Admins can manage all policy providers
CREATE POLICY "Admins can manage policy providers" ON policy_providers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- RLS: POLICY BENEFITS
-- ============================================
-- Public can view benefits for active policies
CREATE POLICY "Anyone can view benefits for active policies" ON policy_benefits
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM policies WHERE id = policy_benefits.policy_id AND status = 'active')
  );

-- Admins can manage all benefits
CREATE POLICY "Admins can manage benefits" ON policy_benefits
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- RLS: POLICY EXCLUSIONS
-- ============================================
-- Public can view exclusions for active policies
CREATE POLICY "Anyone can view exclusions for active policies" ON policy_exclusions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM policies WHERE id = policy_exclusions.policy_id AND status = 'active')
  );

-- Admins can manage all exclusions
CREATE POLICY "Admins can manage exclusions" ON policy_exclusions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- RLS: POLICY DOCUMENTS REQUIRED
-- ============================================
-- Public can view documents for active policies
CREATE POLICY "Anyone can view documents for active policies" ON policy_documents_required
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM policies WHERE id = policy_documents_required.policy_id AND status = 'active')
  );

-- Admins can manage all documents
CREATE POLICY "Admins can manage required documents" ON policy_documents_required
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- RLS: POLICY FAQs
-- ============================================
-- Public can view FAQs for active policies
CREATE POLICY "Anyone can view FAQs for active policies" ON policy_faqs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM policies WHERE id = policy_faqs.policy_id AND status = 'active')
  );

-- Admins can manage all FAQs
CREATE POLICY "Admins can manage policy FAQs" ON policy_faqs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- RLS: UPDATE EXISTING POLICIES POLICY
-- ============================================
-- Employees and managers can read all policies (not just active)
DROP POLICY IF EXISTS "Anyone can view active policies" ON policies;
CREATE POLICY "Public can view active policies" ON policies
  FOR SELECT USING (
    status = 'active'
    OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'executive', 'support', 'manager'))
  );

-- ============================================
-- RLS: UPDATE EXISTING CATEGORIES POLICY
-- ============================================
-- Employees and managers can read all categories
DROP POLICY IF EXISTS "Anyone can view categories" ON policy_categories;
CREATE POLICY "Public can view active categories" ON policy_categories
  FOR SELECT USING (
    status = 'active'
    OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'executive', 'support', 'manager'))
  );

-- ============================================
-- RLS: UPDATE EXISTING SUPPORT MESSAGES (fix locked table)
-- ============================================
CREATE POLICY "Ticket participants can view messages" ON support_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM support_tickets st
      WHERE st.id = support_messages.ticket_id
      AND (
        st.customer_id = auth.uid()
        OR st.assigned_to = auth.uid()
        OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager', 'support'))
      )
    )
  );

CREATE POLICY "Ticket participants can insert messages" ON support_messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id
  );

-- ============================================
-- RLS: UPDATE CUSTOMER ASSIGNMENTS (fix locked table)
-- ============================================
CREATE POLICY "Employees can view own assignments" ON customer_assignments
  FOR SELECT USING (
    employee_id = auth.uid()
    OR customer_id = auth.uid()
    OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
  );

CREATE POLICY "Admins and managers can manage assignments" ON customer_assignments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
  );

-- ============================================
-- RLS: UPDATE APPLICATION STATUS HISTORY (fix locked table)
-- ============================================
CREATE POLICY "Application participants can view history" ON application_status_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM applications a
      WHERE a.id = application_status_history.application_id
      AND (
        a.customer_id = auth.uid()
        OR a.assigned_employee_id = auth.uid()
        OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
      )
    )
  );

CREATE POLICY "Staff can insert status history" ON application_status_history
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager', 'executive', 'support'))
  );

-- ============================================
-- RLS: UPDATE AUDIT LOGS (fix locked table)
-- ============================================
CREATE POLICY "Admins can view audit logs" ON audit_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "System can insert audit logs" ON audit_logs
  FOR INSERT WITH CHECK (true);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_policies_category ON policies(category_id);
CREATE INDEX IF NOT EXISTS idx_policies_status ON policies(status);
CREATE INDEX IF NOT EXISTS idx_policies_slug ON policies(slug);
CREATE INDEX IF NOT EXISTS idx_insurance_providers_slug ON insurance_providers(slug);
CREATE INDEX IF NOT EXISTS idx_policy_providers_policy ON policy_providers(policy_id);
CREATE INDEX IF NOT EXISTS idx_policy_providers_provider ON policy_providers(provider_id);
CREATE INDEX IF NOT EXISTS idx_policy_benefits_policy ON policy_benefits(policy_id);
CREATE INDEX IF NOT EXISTS idx_policy_exclusions_policy ON policy_exclusions(policy_id);
CREATE INDEX IF NOT EXISTS idx_policy_documents_policy ON policy_documents_required(policy_id);
CREATE INDEX IF NOT EXISTS idx_policy_faqs_policy ON policy_faqs(policy_id);
