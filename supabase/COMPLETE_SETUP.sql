-- ============================================================
-- POLICY ADDA - COMPLETE DATABASE SETUP
-- Run this SINGLE file in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ROLES
-- ============================================
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

INSERT INTO roles (name, description) VALUES
  ('customer', 'Regular customer'),
  ('executive', 'Customer Executive'),
  ('support', 'Support Team'),
  ('manager', 'Manager'),
  ('admin', 'Administrator')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- USERS (extends Supabase auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL DEFAULT '',
  phone text,
  role text NOT NULL DEFAULT 'customer' REFERENCES roles(name),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, phone, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'phone', NULL),
    COALESCE(new.raw_user_meta_data->>'role', 'customer')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- POLICY CATEGORIES
-- ============================================
CREATE TABLE IF NOT EXISTS policy_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

INSERT INTO policy_categories (name, slug, description, icon) VALUES
  ('Motor Insurance', 'motor', 'Car, bike, and commercial vehicle insurance', 'car'),
  ('Health Insurance', 'health', 'Individual and family health plans', 'health'),
  ('Life Insurance', 'life', 'Term life and family protection plans', 'shield'),
  ('Business / SME Insurance', 'business', 'Corporate and SME insurance solutions', 'briefcase')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- POLICIES
-- ============================================
CREATE TABLE IF NOT EXISTS policies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id uuid REFERENCES policy_categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  provider text NOT NULL DEFAULT '',
  description text,
  short_description text,
  full_description text,
  eligibility_criteria text,
  coverage_details text,
  benefits text[] DEFAULT '{}',
  eligibility text[] DEFAULT '{}',
  coverage text[] DEFAULT '{}',
  exclusions text[] DEFAULT '{}',
  required_documents text[] DEFAULT '{}',
  premium_range text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'under_review', 'active', 'inactive', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

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
-- APPLICATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  policy_id uuid REFERENCES policies(id) ON DELETE SET NULL,
  assigned_employee_id uuid REFERENCES users(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'submitted' CHECK (status IN (
    'submitted', 'under_review', 'documents_pending', 'advisor_assigned',
    'processing', 'approved', 'rejected', 'settled'
  )),
  form_data jsonb DEFAULT '{}',
  submitted_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- APPLICATION STATUS HISTORY
-- ============================================
CREATE TABLE IF NOT EXISTS application_status_history (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE,
  previous_status text,
  new_status text NOT NULL,
  changed_by uuid REFERENCES users(id) ON DELETE SET NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- CUSTOMER ASSIGNMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS customer_assignments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE,
  employee_id uuid REFERENCES users(id) ON DELETE CASCADE,
  assigned_at timestamptz DEFAULT now(),
  notes text
);

-- ============================================
-- DOCUMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id uuid REFERENCES users(id) ON DELETE CASCADE,
  application_id uuid REFERENCES applications(id) ON DELETE SET NULL,
  document_type text NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_size bigint,
  uploaded_at timestamptz DEFAULT now()
);

-- ============================================
-- SUPPORT TICKETS
-- ============================================
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
  subject text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'open' CHECK (status IN (
    'open', 'in_progress', 'waiting', 'resolved', 'closed'
  )),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN (
    'low', 'medium', 'high', 'urgent'
  )),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- SUPPORT MESSAGES
-- ============================================
CREATE TABLE IF NOT EXISTS support_messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id uuid REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES users(id) ON DELETE SET NULL,
  message text NOT NULL,
  is_internal boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- NOTIFICATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text,
  type text NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read boolean DEFAULT false,
  link text,
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- AUDIT LOGS
-- ============================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  details jsonb DEFAULT '{}',
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_exclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_documents_required ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Users
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "Admins can manage users" ON users
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Policy categories
CREATE POLICY "Public can view active categories" ON policy_categories
  FOR SELECT USING (
    status = 'active'
    OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'executive', 'support', 'manager'))
  );
CREATE POLICY "Admins can manage categories" ON policy_categories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Policies
CREATE POLICY "Public can view active policies" ON policies
  FOR SELECT USING (
    status = 'active'
    OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'executive', 'support', 'manager'))
  );
CREATE POLICY "Admins can manage policies" ON policies
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Insurance providers
CREATE POLICY "Anyone can view active providers" ON insurance_providers
  FOR SELECT USING (status = 'active');
CREATE POLICY "Admins can manage providers" ON insurance_providers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Policy providers
CREATE POLICY "Anyone can view active policy providers" ON policy_providers
  FOR SELECT USING (status = 'active');
CREATE POLICY "Admins can manage policy providers" ON policy_providers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Policy benefits
CREATE POLICY "Anyone can view benefits for active policies" ON policy_benefits
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM policies WHERE id = policy_benefits.policy_id AND status = 'active')
    OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'executive', 'support', 'manager'))
  );
CREATE POLICY "Admins can manage benefits" ON policy_benefits
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Policy exclusions
CREATE POLICY "Anyone can view exclusions for active policies" ON policy_exclusions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM policies WHERE id = policy_exclusions.policy_id AND status = 'active')
    OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'executive', 'support', 'manager'))
  );
CREATE POLICY "Admins can manage exclusions" ON policy_exclusions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Policy documents required
CREATE POLICY "Anyone can view documents for active policies" ON policy_documents_required
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM policies WHERE id = policy_documents_required.policy_id AND status = 'active')
    OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'executive', 'support', 'manager'))
  );
CREATE POLICY "Admins can manage required documents" ON policy_documents_required
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Policy FAQs
CREATE POLICY "Anyone can view FAQs for active policies" ON policy_faqs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM policies WHERE id = policy_faqs.policy_id AND status = 'active')
    OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'executive', 'support', 'manager'))
  );
CREATE POLICY "Admins can manage policy FAQs" ON policy_faqs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Applications
CREATE POLICY "Customers can view own applications" ON applications
  FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Customers can insert own applications" ON applications
  FOR INSERT WITH CHECK (auth.uid() = customer_id OR customer_id IS NULL);
CREATE POLICY "Employees can view assigned applications" ON applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM customer_assignments ca
      WHERE ca.application_id = applications.id
      AND ca.employee_id = auth.uid()
    )
  );
CREATE POLICY "Admins can manage all applications" ON applications
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
  );

-- Application status history
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

-- Customer assignments
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

-- Documents
CREATE POLICY "Users can view own documents" ON documents
  FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Users can upload own documents" ON documents
  FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Admins can view all documents" ON documents
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Support tickets
CREATE POLICY "Customers can view own tickets" ON support_tickets
  FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Customers can create tickets" ON support_tickets
  FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Support can view assigned tickets" ON support_tickets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid()
      AND role IN ('support', 'admin', 'manager')
    )
  );

-- Support messages
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
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Notifications
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Audit logs
CREATE POLICY "Admins can view audit logs" ON audit_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "System can insert audit logs" ON audit_logs
  FOR INSERT WITH CHECK (true);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_policies_category ON policies(category_id);
CREATE INDEX IF NOT EXISTS idx_policies_status ON policies(status);
CREATE INDEX IF NOT EXISTS idx_policies_slug ON policies(slug);
CREATE INDEX IF NOT EXISTS idx_applications_customer ON applications(customer_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_employee ON applications(assigned_employee_id);
CREATE INDEX IF NOT EXISTS idx_documents_owner ON documents(owner_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_customer ON support_tickets(customer_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_insurance_providers_slug ON insurance_providers(slug);
CREATE INDEX IF NOT EXISTS idx_policy_providers_policy ON policy_providers(policy_id);
CREATE INDEX IF NOT EXISTS idx_policy_providers_provider ON policy_providers(provider_id);
CREATE INDEX IF NOT EXISTS idx_policy_benefits_policy ON policy_benefits(policy_id);
CREATE INDEX IF NOT EXISTS idx_policy_exclusions_policy ON policy_exclusions(policy_id);
CREATE INDEX IF NOT EXISTS idx_policy_documents_policy ON policy_documents_required(policy_id);
CREATE INDEX IF NOT EXISTS idx_policy_faqs_policy ON policy_faqs(policy_id);

-- ============================================
-- SEED: INSURANCE PROVIDERS
-- ============================================
INSERT INTO insurance_providers (name, slug, website, status) VALUES
  ('Liberty General Insurance', 'liberty-general', 'https://www.libertygeneral.in', 'active'),
  ('TATA AIG', 'tata-aig', 'https://www.tataaig.com', 'active'),
  ('Bajaj Allianz', 'bajaj-allianz', 'https://www.bajajallianz.com', 'active'),
  ('HDFC ERGO', 'hdfc-ergo', 'https://www.hdfcergo.com', 'active'),
  ('ICICI Lombard', 'icici-lombard', 'https://www.icicilombard.com', 'active'),
  ('IFFCO Tokio', 'iffco-tokio', 'https://www.iffcotokio.co.in', 'active'),
  ('United India Insurance', 'united-india', 'https://www.uiic.co.in', 'active'),
  ('Cholamandalam', 'cholamandalam', 'https://www.cholainsurance.com', 'active'),
  ('Kotak', 'kotak', 'https://www.kotakgeneral.com', 'active'),
  ('Future Generali', 'future-generali', 'https://www.futuregenerali.in', 'active'),
  ('Universal Sompo', 'universal-sompo', 'https://www.universalsompo.com', 'active'),
  ('Bharti AXA', 'bharti-axa', 'https://www.bajajfinservmarkets.in', 'active')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SEED: POLICIES
-- ============================================

-- POLICY 1: Comprehensive Two-Wheeler Insurance
INSERT INTO policies (
  category_id, name, slug, provider, short_description, full_description,
  eligibility_criteria, coverage_details, status, benefits, exclusions, required_documents
) VALUES (
  (SELECT id FROM policy_categories WHERE slug = 'motor'),
  'Comprehensive Two-Wheeler Insurance',
  'comprehensive-two-wheeler-insurance',
  'Aggregated via top general insurers including Liberty General Insurance and TATA AIG',
  'Total financial protection for your bike or scooter against accidents, theft, and third-party liabilities.',
  'This plan covers physical damage to your two-wheeler resulting from road accidents, natural disasters such as floods and earthquakes, fires, and malicious acts. It satisfies applicable legal requirements by bundling Third-Party Liability with Own Damage security.',
  'Any registered two-wheeler owner with a valid Indian driving license and active vehicle registration.',
  'Own Damage protection up to the applicable Insured Declared Value (IDV). Third-Party coverage according to the applicable policy terms and regulations.',
  'active',
  ARRAY[
    'Cashless repairs across available network garages.',
    'Quick digital claim settlement where supported by the insurer.',
    'No Claim Bonus transfer from previous insurance providers where applicable.'
  ],
  ARRAY[
    'Driving under the influence of alcohol or drugs.',
    'Driving without a valid license.',
    'Routine wear and tear.',
    'Mechanical breakdowns.'
  ],
  ARRAY[
    'Previous policy copy.',
    'Registration Certificate.',
    'Valid KYC details such as Aadhaar/PAN where required.'
  ]
);

-- POLICY 2: Comprehensive Private Car Insurance
INSERT INTO policies (
  category_id, name, slug, provider, short_description, full_description,
  eligibility_criteria, coverage_details, status, benefits, exclusions, required_documents
) VALUES (
  (SELECT id FROM policy_categories WHERE slug = 'motor'),
  'Comprehensive Private Car Insurance',
  'comprehensive-private-car-insurance',
  'Aggregated partners including Bajaj Allianz, HDFC ERGO, and Liberty General',
  'Premium end-to-end coverage for your private vehicle against accidental damages, theft, and third-party liabilities.',
  'A complete motor policy designed to safeguard private cars against unexpected losses. The policy combines legally required third-party coverage with Own Damage protection and may provide customizable add-ons such as Zero Depreciation or Engine Protection depending on the insurer and selected plan.',
  'Individual or corporate owners of private passenger vehicles registered in India.',
  'Vehicle damage according to policy terms. Owner-driver Personal Accident cover where applicable. Third-party liability coverage according to applicable regulations and policy terms.',
  'active',
  ARRAY[
    'Zero Depreciation add-on options where available.',
    'Roadside Assistance where included or selected.',
    'Third-party liability coverage according to applicable policy terms.'
  ],
  ARRAY[
    'Depreciation may apply under standard policies.',
    'Damage outside geographical coverage.',
    'Using a private car outside permitted usage.'
  ],
  ARRAY[
    'Car Registration Certificate.',
    'Previous policy document.',
    'Owner identification proof.'
  ]
);

-- POLICY 3: Health Secure Family Floater Plan
INSERT INTO policies (
  category_id, name, slug, provider, short_description, full_description,
  eligibility_criteria, coverage_details, status, benefits, exclusions, required_documents
) VALUES (
  (SELECT id FROM policy_categories WHERE slug = 'health'),
  'Health Secure Family Floater Plan',
  'health-secure-family-floater-plan',
  'Multiple leading standalone health insurers',
  'A single comprehensive health policy covering medical and hospitalization expenses for your entire family.',
  'This plan uses a floating sum insured structure, allowing designated family members to use the shared coverage pool according to policy terms. It is designed to help manage hospitalization and eligible medical expenses.',
  'Proposer age between 18 and 65 years. Dependent children may be covered according to insurer and plan rules.',
  'Coverage amounts may range depending on the selected insurer and plan. Coverage may include: Hospitalization, ICU charges, Surgeon fees, Pre-hospitalization expenses, Other eligible medical expenses.',
  'active',
  ARRAY[
    'Cashless hospitalization at eligible network hospitals.',
    'Tax benefits under applicable laws, including Section 80D where eligible.',
    'Coverage for eligible modern treatments and day-care procedures according to policy terms.'
  ],
  ARRAY[
    'Pre-existing diseases may have applicable waiting periods.',
    'Cosmetic surgery unless medically necessary and covered.',
    'Self-inflicted injuries, subject to policy terms.'
  ],
  ARRAY[
    'Age proof of covered members.',
    'Medical reports if required.',
    'PAN/Aadhaar of the primary applicant where required.'
  ]
);

-- POLICY 4: Group Health & Liability Cover
INSERT INTO policies (
  category_id, name, slug, provider, short_description, full_description,
  eligibility_criteria, coverage_details, status, benefits, exclusions, required_documents
) VALUES (
  (SELECT id FROM policy_categories WHERE slug = 'business'),
  'Group Health & Liability Cover',
  'group-health-liability-cover',
  'Customizable corporate plans from leading insurers',
  'Tailor-made employee health and liability benefits designed specifically for corporate houses and SMEs.',
  'A customizable business insurance solution designed to help organizations provide employee health benefits and relevant liability protection according to selected coverage and underwriting terms.',
  'Registered businesses or SMEs meeting the insurer''s group size and underwriting requirements.',
  'Customizable sum insured. Employee coverage tiers. Corporate buffer options where available. Coverage geography depending on selected policy.',
  'active',
  ARRAY[
    'Group health coverage options.',
    'Maternity and newborn coverage options where selected.',
    'Corporate benefit structures designed to support employee welfare.'
  ],
  ARRAY[
    'Non-medical expenses where excluded.',
    'Experimental or unproven treatments where excluded.',
    'Other exclusions according to final policy wording.'
  ],
  ARRAY[
    'Company PAN card.',
    'GST registration certificate where applicable.',
    'Employee roster with required details.'
  ]
);

-- ============================================
-- SEED: POLICY BENEFITS (normalized)
-- ============================================
INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Cashless Repairs', 'Cashless repairs across available network garages.', 1
FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';
INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Quick Digital Claims', 'Quick digital claim settlement where supported by the insurer.', 2
FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';
INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'No Claim Bonus Transfer', 'No Claim Bonus transfer from previous insurance providers where applicable.', 3
FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';

INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Zero Depreciation', 'Zero Depreciation add-on options where available.', 1
FROM policies WHERE slug = 'comprehensive-private-car-insurance';
INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Roadside Assistance', 'Roadside Assistance where included or selected.', 2
FROM policies WHERE slug = 'comprehensive-private-car-insurance';
INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Third-Party Liability', 'Third-party liability coverage according to applicable policy terms.', 3
FROM policies WHERE slug = 'comprehensive-private-car-insurance';

INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Cashless Hospitalization', 'Cashless hospitalization at eligible network hospitals.', 1
FROM policies WHERE slug = 'health-secure-family-floater-plan';
INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Tax Benefits', 'Tax benefits under applicable laws, including Section 80D where eligible.', 2
FROM policies WHERE slug = 'health-secure-family-floater-plan';
INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Day-Care Procedures', 'Coverage for eligible modern treatments and day-care procedures according to policy terms.', 3
FROM policies WHERE slug = 'health-secure-family-floater-plan';

INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Group Health Coverage', 'Group health coverage options.', 1
FROM policies WHERE slug = 'group-health-liability-cover';
INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Maternity Coverage', 'Maternity and newborn coverage options where selected.', 2
FROM policies WHERE slug = 'group-health-liability-cover';
INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Corporate Benefits', 'Corporate benefit structures designed to support employee welfare.', 3
FROM policies WHERE slug = 'group-health-liability-cover';

-- ============================================
-- SEED: POLICY EXCLUSIONS
-- ============================================
INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'DUI / Drugs', 'Driving under the influence of alcohol or drugs.', 1
FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';
INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'No Valid License', 'Driving without a valid license.', 2
FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';
INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Wear and Tear', 'Routine wear and tear.', 3
FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';
INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Mechanical Breakdown', 'Mechanical breakdowns.', 4
FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';

INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Depreciation', 'Depreciation may apply under standard policies.', 1
FROM policies WHERE slug = 'comprehensive-private-car-insurance';
INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Outside Geographical Coverage', 'Damage outside geographical coverage.', 2
FROM policies WHERE slug = 'comprehensive-private-car-insurance';
INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Non-Permitted Usage', 'Using a private car outside permitted usage.', 3
FROM policies WHERE slug = 'comprehensive-private-car-insurance';

INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Pre-existing Waiting Period', 'Pre-existing diseases may have applicable waiting periods.', 1
FROM policies WHERE slug = 'health-secure-family-floater-plan';
INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Cosmetic Surgery', 'Cosmetic surgery unless medically necessary and covered.', 2
FROM policies WHERE slug = 'health-secure-family-floater-plan';
INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Self-inflicted Injuries', 'Self-inflicted injuries, subject to policy terms.', 3
FROM policies WHERE slug = 'health-secure-family-floater-plan';

INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Non-medical Expenses', 'Non-medical expenses where excluded.', 1
FROM policies WHERE slug = 'group-health-liability-cover';
INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Experimental Treatments', 'Experimental or unproven treatments where excluded.', 2
FROM policies WHERE slug = 'group-health-liability-cover';

-- ============================================
-- SEED: POLICY REQUIRED DOCUMENTS
-- ============================================
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Previous Policy Copy', NULL, true, 1 FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Registration Certificate', NULL, true, 2 FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'KYC Details', 'Aadhaar/PAN where required', true, 3 FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';

INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Car Registration Certificate', NULL, true, 1 FROM policies WHERE slug = 'comprehensive-private-car-insurance';
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Previous Policy Document', NULL, true, 2 FROM policies WHERE slug = 'comprehensive-private-car-insurance';
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Owner Identification Proof', NULL, true, 3 FROM policies WHERE slug = 'comprehensive-private-car-insurance';

INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Age Proof', 'Of covered members', true, 1 FROM policies WHERE slug = 'health-secure-family-floater-plan';
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Medical Reports', 'If required', false, 2 FROM policies WHERE slug = 'health-secure-family-floater-plan';
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'PAN/Aadhaar', 'Of the primary applicant where required', true, 3 FROM policies WHERE slug = 'health-secure-family-floater-plan';

INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Company PAN Card', NULL, true, 1 FROM policies WHERE slug = 'group-health-liability-cover';
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'GST Registration Certificate', 'Where applicable', false, 2 FROM policies WHERE slug = 'group-health-liability-cover';
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Employee Roster', 'With required details', true, 3 FROM policies WHERE slug = 'group-health-liability-cover';

-- ============================================
-- SEED: POLICY FAQs
-- ============================================
INSERT INTO policy_faqs (policy_id, question, answer, sort_order)
SELECT id, 'Can an employee add their parents to the group plan?',
  'Parent inclusion depends on the specific corporate plan structure and whether parent coverage is selected during corporate onboarding.',
  1 FROM policies WHERE slug = 'group-health-liability-cover';

INSERT INTO policy_faqs (policy_id, question, answer, sort_order)
SELECT id, 'What is IDV in two-wheeler insurance?',
  'IDV stands for Insured Declared Value. It is the current market value of your vehicle and determines the maximum amount payable in case of total loss or theft.',
  1 FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';

INSERT INTO policy_faqs (policy_id, question, answer, sort_order)
SELECT id, 'Is zero depreciation mandatory?',
  'No, Zero Depreciation is an optional add-on. It must be selected and paid for separately during policy purchase or renewal.',
  2 FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';

INSERT INTO policy_faqs (policy_id, question, answer, sort_order)
SELECT id, 'Can I add family members later?',
  'Yes, most family floater plans allow adding spouse and children at the time of renewal, subject to insurer rules and underwriting.',
  1 FROM policies WHERE slug = 'health-secure-family-floater-plan';

-- ============================================
-- SEED: POLICY PROVIDERS (links)
-- ============================================
INSERT INTO policy_providers (policy_id, provider_id, status)
SELECT p.id, ip.id, 'active'
FROM policies p, insurance_providers ip
WHERE p.slug = 'comprehensive-two-wheeler-insurance' AND ip.slug IN ('liberty-general', 'tata-aig');

INSERT INTO policy_providers (policy_id, provider_id, status)
SELECT p.id, ip.id, 'active'
FROM policies p, insurance_providers ip
WHERE p.slug = 'comprehensive-private-car-insurance' AND ip.slug IN ('bajaj-allianz', 'hdfc-ergo', 'liberty-general');

INSERT INTO policy_providers (policy_id, provider_id, status)
SELECT p.id, ip.id, 'active'
FROM policies p, insurance_providers ip
WHERE p.slug = 'health-secure-family-floater-plan' AND ip.slug IN ('bajaj-allianz', 'tata-aig', 'icici-lombard');

INSERT INTO policy_providers (policy_id, provider_id, status)
SELECT p.id, ip.id, 'active'
FROM policies p, insurance_providers ip
WHERE p.slug = 'group-health-liability-cover' AND ip.slug IN ('bajaj-allianz', 'hdfc-ergo', 'tata-aig');
