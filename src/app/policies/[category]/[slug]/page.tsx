import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Icon } from "@/components/icons";
import type { Metadata } from "next";

interface PolicyPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const supabase = await createClient();

  const { data: categoryData } = await supabase
    .from("policy_categories")
    .select("id")
    .eq("slug", category)
    .single();

  if (!categoryData) return { title: "Policy Not Found" };

  const { data: policy } = await supabase
    .from("policies")
    .select("name, short_description")
    .eq("slug", slug)
    .eq("category_id", categoryData.id)
    .single();

  if (!policy) return { title: "Policy Not Found" };

  return {
    title: `${policy.name} | Policy Adda`,
    description: policy.short_description || policy.name,
  };
}

export default async function PolicyDetailPage({ params }: PolicyPageProps) {
  const { category, slug } = await params;
  const supabase = await createClient();

  const { data: categoryData } = await supabase
    .from("policy_categories")
    .select("*")
    .eq("slug", category)
    .single();

  if (!categoryData) notFound();

  const { data: policy } = await supabase
    .from("policies")
    .select("*")
    .eq("slug", slug)
    .eq("category_id", categoryData.id)
    .single();

  if (!policy || policy.status !== "active") notFound();

  const [benefitsRes, exclusionsRes, docsRes, faqsRes, providersRes] = await Promise.all([
    supabase
      .from("policy_benefits")
      .select("*")
      .eq("policy_id", policy.id)
      .order("sort_order"),
    supabase
      .from("policy_exclusions")
      .select("*")
      .eq("policy_id", policy.id)
      .order("sort_order"),
    supabase
      .from("policy_documents_required")
      .select("*")
      .eq("policy_id", policy.id)
      .order("sort_order"),
    supabase
      .from("policy_faqs")
      .select("*")
      .eq("policy_id", policy.id)
      .order("sort_order"),
    supabase
      .from("policy_providers")
      .select("*, provider:insurance_providers(*)")
      .eq("policy_id", policy.id)
      .eq("status", "active"),
  ]);

  const benefits = benefitsRes.data || [];
  const exclusions = exclusionsRes.data || [];
  const documents = docsRes.data || [];
  const faqs = faqsRes.data || [];
  const providers = (providersRes.data || [])
    .map((pp: Record<string, unknown>) => pp.provider)
    .filter(Boolean) as Array<{ name: string; logo_url?: string; website?: string }>;

  return (
    <>
      <Nav />
      <main className="container-page py-16 lg:py-24">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-ash">
          <Link href="/" className="transition-colors hover:text-cobalt">Home</Link>
          <Icon name="chevron-right" size={14} />
          <Link href="/policies" className="transition-colors hover:text-cobalt">Policies</Link>
          <Icon name="chevron-right" size={14} />
          <Link href={`/policies`} className="transition-colors hover:text-cobalt">{categoryData.name}</Link>
          <Icon name="chevron-right" size={14} />
          <span className="text-ivory">{policy.name}</span>
        </nav>

        {/* Hero */}
        <div className="max-w-3xl">
          <span className="eyebrow">
            <Icon name={categoryData.icon || "shield"} size={15} />
            {categoryData.name}
          </span>
          <h1 className="mt-5 text-4xl font-medium text-ivory sm:text-5xl">
            {policy.name}
          </h1>
          {policy.short_description && (
            <p className="mt-6 text-lg leading-relaxed text-ash">
              {policy.short_description}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#quote"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-cobalt px-7 text-sm font-semibold text-white transition-colors hover:bg-cobalt-dark"
            >
              <Icon name="spark" size={16} />
              Get a Free Quote
            </a>
            <a
              href="tel:+917677888748"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-ivory/30 px-7 text-sm font-semibold text-ivory transition-colors hover:border-ivory hover:bg-white/5"
            >
              <Icon name="phone" size={16} />
              Talk to an Advisor
            </a>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            {/* Full Description */}
            {policy.full_description && (
              <section>
                <h2 className="text-2xl font-medium text-ivory">Overview</h2>
                <p className="mt-4 text-base leading-relaxed text-ash whitespace-pre-line">
                  {policy.full_description}
                </p>
              </section>
            )}

            {/* Key Benefits */}
            {benefits.length > 0 && (
              <section>
                <h2 className="text-2xl font-medium text-ivory">Key Benefits</h2>
                <ul className="mt-4 space-y-3">
                  {benefits.map((b) => (
                    <li key={b.id} className="flex items-start gap-3 text-ash">
                      <Icon name="check-circle" size={18} className="mt-0.5 shrink-0 text-cobalt" />
                      <div>
                        <span className="font-medium text-ivory">{b.title}</span>
                        {b.description && (
                          <span className="ml-1">{b.description}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Coverage Details */}
            {policy.coverage_details && (
              <section>
                <h2 className="text-2xl font-medium text-ivory">Coverage Details</h2>
                <div className="mt-4 text-base leading-relaxed text-ash whitespace-pre-line">
                  {policy.coverage_details}
                </div>
              </section>
            )}

            {/* Legacy coverage array fallback */}
            {policy.coverage && policy.coverage.length > 0 && !policy.coverage_details && (
              <section>
                <h2 className="text-2xl font-medium text-ivory">Coverage</h2>
                <ul className="mt-4 space-y-2">
                  {policy.coverage.map((c: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-ash">
                      <Icon name="check" size={16} className="mt-0.5 shrink-0 text-cobalt" />
                      {c}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Eligibility */}
            {policy.eligibility_criteria && (
              <section>
                <h2 className="text-2xl font-medium text-ivory">Eligibility Criteria</h2>
                <div className="mt-4 text-base leading-relaxed text-ash whitespace-pre-line">
                  {policy.eligibility_criteria}
                </div>
              </section>
            )}

            {/* Legacy eligibility array fallback */}
            {policy.eligibility && policy.eligibility.length > 0 && !policy.eligibility_criteria && (
              <section>
                <h2 className="text-2xl font-medium text-ivory">Eligibility</h2>
                <ul className="mt-4 space-y-2">
                  {policy.eligibility.map((e: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-ash">
                      <Icon name="user" size={16} className="mt-0.5 shrink-0 text-cobalt" />
                      {e}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Exclusions */}
            {exclusions.length > 0 && (
              <section>
                <h2 className="text-2xl font-medium text-ivory">Important Exclusions</h2>
                <ul className="mt-4 space-y-3">
                  {exclusions.map((ex) => (
                    <li key={ex.id} className="flex items-start gap-3 text-ash">
                      <Icon name="x-circle" size={18} className="mt-0.5 shrink-0 text-red-400" />
                      <div>
                        <span className="font-medium text-ivory">{ex.title}</span>
                        {ex.description && (
                          <span className="ml-1">{ex.description}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Legacy exclusions array fallback */}
            {policy.exclusions && policy.exclusions.length > 0 && exclusions.length === 0 && (
              <section>
                <h2 className="text-2xl font-medium text-ivory">Important Exclusions</h2>
                <ul className="mt-4 space-y-2">
                  {policy.exclusions.map((ex: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-ash">
                      <Icon name="x-circle" size={16} className="mt-0.5 shrink-0 text-red-400" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Required Documents */}
            {documents.length > 0 && (
              <section>
                <h2 className="text-2xl font-medium text-ivory">Required Documents</h2>
                <ul className="mt-4 space-y-3">
                  {documents.map((doc) => (
                    <li key={doc.id} className="flex items-start gap-3 text-ash">
                      <Icon name="file-text" size={18} className="mt-0.5 shrink-0 text-cobalt" />
                      <div>
                        <span className="font-medium text-ivory">{doc.document_name}</span>
                        {doc.description && (
                          <span className="ml-1">{doc.description}</span>
                        )}
                        {!doc.required && (
                          <span className="ml-2 text-xs text-ash">(optional)</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Legacy required_documents array fallback */}
            {policy.required_documents && policy.required_documents.length > 0 && documents.length === 0 && (
              <section>
                <h2 className="text-2xl font-medium text-ivory">Required Documents</h2>
                <ul className="mt-4 space-y-2">
                  {policy.required_documents.map((doc: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-ash">
                      <Icon name="file-text" size={16} className="mt-0.5 shrink-0 text-cobalt" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* FAQs */}
            {faqs.length > 0 && (
              <section>
                <h2 className="text-2xl font-medium text-ivory">Frequently Asked Questions</h2>
                <div className="mt-4 space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="card-material rounded-xl p-5">
                      <h3 className="font-medium text-ivory">{faq.question}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ash">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Providers */}
            {providers.length > 0 && (
              <div className="card-material rounded-xl p-6">
                <h3 className="font-medium text-ivory">Available Providers</h3>
                <div className="mt-4 space-y-3">
                  {providers.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-white/10 p-3">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-elevated text-xs font-medium text-ivory">
                        {p.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ivory truncate">{p.name}</p>
                        {p.website && (
                          <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-xs text-cobalt hover:underline">
                            Visit website
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Quote CTA */}
            <div className="card-material rounded-xl p-6">
              <h3 className="font-medium text-ivory">Need Help Choosing?</h3>
              <p className="mt-2 text-sm text-ash">
                Talk to a Policy Adda advisor for free, personalised guidance.
              </p>
              <div className="mt-4 space-y-2">
                <a
                  href="tel:+917677888748"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-cobalt px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cobalt-dark"
                >
                  <Icon name="phone" size={16} />
                  Call +91 76778 88748
                </a>
                <a
                  href="https://wa.me/917677888748?text=Hi%20Policy%20Adda%2C%20I%27d%20like%20help%20with%20a%20policy."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-ivory/25 px-4 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-white/5"
                >
                  <Icon name="chat" size={16} />
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-xl border border-white/10 bg-surface/60 p-5">
              <p className="text-xs leading-relaxed text-ash/80">
                <Icon name="info" size={14} className="mr-1 inline text-cobalt" />
                Policy features, benefits, and premiums may vary depending on the insurer,
                selected plan, add-ons, underwriting, and policy terms. Contact a Policy Adda
                advisor for plan-specific details.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
