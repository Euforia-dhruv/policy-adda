-- Seed Data for Policy Management System
-- Run this AFTER migration_002_policy_management.sql

-- ============================================
-- INSURANCE PROVIDERS
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
-- SEED POLICIES (4 policies from spec)
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
  (SELECT id FROM policy_categories WHERE slug = 'health'),
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
-- SEED POLICY BENEFITS (normalized tables)
-- ============================================

-- Benefits for Two-Wheeler
INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Cashless Repairs', 'Cashless repairs across available network garages.', 1
FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';

INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Quick Digital Claims', 'Quick digital claim settlement where supported by the insurer.', 2
FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';

INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'No Claim Bonus Transfer', 'No Claim Bonus transfer from previous insurance providers where applicable.', 3
FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';

-- Benefits for Car
INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Zero Depreciation', 'Zero Depreciation add-on options where available.', 1
FROM policies WHERE slug = 'comprehensive-private-car-insurance';

INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Roadside Assistance', 'Roadside Assistance where included or selected.', 2
FROM policies WHERE slug = 'comprehensive-private-car-insurance';

INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Third-Party Liability', 'Third-party liability coverage according to applicable policy terms.', 3
FROM policies WHERE slug = 'comprehensive-private-car-insurance';

-- Benefits for Family Floater
INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Cashless Hospitalization', 'Cashless hospitalization at eligible network hospitals.', 1
FROM policies WHERE slug = 'health-secure-family-floater-plan';

INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Tax Benefits', 'Tax benefits under applicable laws, including Section 80D where eligible.', 2
FROM policies WHERE slug = 'health-secure-family-floater-plan';

INSERT INTO policy_benefits (policy_id, title, description, sort_order)
SELECT id, 'Day-Care Procedures', 'Coverage for eligible modern treatments and day-care procedures according to policy terms.', 3
FROM policies WHERE slug = 'health-secure-family-floater-plan';

-- Benefits for Group Health
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
-- SEED POLICY EXCLUSIONS
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

-- Car exclusions
INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Depreciation', 'Depreciation may apply under standard policies.', 1
FROM policies WHERE slug = 'comprehensive-private-car-insurance';

INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Outside Geographical Coverage', 'Damage outside geographical coverage.', 2
FROM policies WHERE slug = 'comprehensive-private-car-insurance';

INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Non-Permitted Usage', 'Using a private car outside permitted usage.', 3
FROM policies WHERE slug = 'comprehensive-private-car-insurance';

-- Health exclusions
INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Pre-existing Waiting Period', 'Pre-existing diseases may have applicable waiting periods.', 1
FROM policies WHERE slug = 'health-secure-family-floater-plan';

INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Cosmetic Surgery', 'Cosmetic surgery unless medically necessary and covered.', 2
FROM policies WHERE slug = 'health-secure-family-floater-plan';

INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Self-inflicted Injuries', 'Self-inflicted injuries, subject to policy terms.', 3
FROM policies WHERE slug = 'health-secure-family-floater-plan';

-- Group health exclusions
INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Non-medical Expenses', 'Non-medical expenses where excluded.', 1
FROM policies WHERE slug = 'group-health-liability-cover';

INSERT INTO policy_exclusions (policy_id, title, description, sort_order)
SELECT id, 'Experimental Treatments', 'Experimental or unproven treatments where excluded.', 2
FROM policies WHERE slug = 'group-health-liability-cover';

-- ============================================
-- SEED POLICY REQUIRED DOCUMENTS
-- ============================================

INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Previous Policy Copy', null, true, 1 FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Registration Certificate', null, true, 2 FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'KYC Details', 'Aadhaar/PAN where required', true, 3 FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';

INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Car Registration Certificate', null, true, 1 FROM policies WHERE slug = 'comprehensive-private-car-insurance';
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Previous Policy Document', null, true, 2 FROM policies WHERE slug = 'comprehensive-private-car-insurance';
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Owner Identification Proof', null, true, 3 FROM policies WHERE slug = 'comprehensive-private-car-insurance';

INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Age Proof', 'Of covered members', true, 1 FROM policies WHERE slug = 'health-secure-family-floater-plan';
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Medical Reports', 'If required', false, 2 FROM policies WHERE slug = 'health-secure-family-floater-plan';
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'PAN/Aadhaar', 'Of the primary applicant where required', true, 3 FROM policies WHERE slug = 'health-secure-family-floater-plan';

INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Company PAN Card', null, true, 1 FROM policies WHERE slug = 'group-health-liability-cover';
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'GST Registration Certificate', 'Where applicable', false, 2 FROM policies WHERE slug = 'group-health-liability-cover';
INSERT INTO policy_documents_required (policy_id, document_name, description, required, sort_order)
SELECT id, 'Employee Roster', 'With required details', true, 3 FROM policies WHERE slug = 'group-health-liability-cover';

-- ============================================
-- SEED POLICY FAQs
-- ============================================

INSERT INTO policy_faqs (policy_id, question, answer, sort_order)
SELECT id, 'Can an employee add their parents to the group plan?',
  'Parent inclusion depends on the specific corporate plan structure and whether parent coverage is selected during corporate onboarding.',
  1
FROM policies WHERE slug = 'group-health-liability-cover';

INSERT INTO policy_faqs (policy_id, question, answer, sort_order)
SELECT id, 'What is IDV in two-wheeler insurance?',
  'IDV stands for Insured Declared Value. It is the current market value of your vehicle and determines the maximum amount payable in case of total loss or theft.',
  1
FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';

INSERT INTO policy_faqs (policy_id, question, answer, sort_order)
SELECT id, 'Is zero depreciation mandatory?',
  'No, Zero Depreciation is an optional add-on. It must be selected and paid for separately during policy purchase or renewal.',
  2
FROM policies WHERE slug = 'comprehensive-two-wheeler-insurance';

INSERT INTO policy_faqs (policy_id, question, answer, sort_order)
SELECT id, 'Can I add family members later?',
  'Yes, most family floater plans allow adding spouse and children at the time of renewal, subject to insurer rules and underwriting.',
  1
FROM policies WHERE slug = 'health-secure-family-floater-plan';

-- ============================================
-- SEED POLICY PROVIDERS (link policies to providers)
-- ============================================

INSERT INTO policy_providers (policy_id, provider_id, status)
SELECT p.id, ip.id, 'active'
FROM policies p, insurance_providers ip
WHERE p.slug = 'comprehensive-two-wheeler-insurance'
  AND ip.slug IN ('liberty-general', 'tata-aig');

INSERT INTO policy_providers (policy_id, provider_id, status)
SELECT p.id, ip.id, 'active'
FROM policies p, insurance_providers ip
WHERE p.slug = 'comprehensive-private-car-insurance'
  AND ip.slug IN ('bajaj-allianz', 'hdfc-ergo', 'liberty-general');

INSERT INTO policy_providers (policy_id, provider_id, status)
SELECT p.id, ip.id, 'active'
FROM policies p, insurance_providers ip
WHERE p.slug = 'health-secure-family-floater-plan'
  AND ip.slug IN ('bajaj-allianz', 'tata-aig', 'icici-lombard');

INSERT INTO policy_providers (policy_id, provider_id, status)
SELECT p.id, ip.id, 'active'
FROM policies p, insurance_providers ip
WHERE p.slug = 'group-health-liability-cover'
  AND ip.slug IN ('bajaj-allianz', 'hdfc-ergo', 'tata-aig');
