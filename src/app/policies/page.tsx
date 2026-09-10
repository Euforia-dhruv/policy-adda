import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Icon } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function PoliciesPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("policy_categories")
    .select("*")
    .eq("status", "active")
    .order("name");

  const { data: policies } = await supabase
    .from("policies")
    .select("*, category:policy_categories(name, slug, icon)")
    .eq("status", "active")
    .order("name");

  return (
    <>
      <Nav />
      <main className="container-page py-16 lg:py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <Icon name="shield" size={15} />
            Our Products
          </span>
          <h1 className="mt-5 text-4xl font-medium text-ivory sm:text-5xl">
            Insurance covers, explained simply
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ash">
            We work with 12+ insurer partners to find the right cover for you.
            Every policy is explained in plain language — no jargon, no surprises.
          </p>
        </div>

        {(!policies || policies.length === 0) ? (
          <div className="mt-12 card-material rounded-xl p-12 text-center">
            <Icon name="shield" size={48} className="mx-auto text-ash/40" />
            <h3 className="mt-4 text-lg font-medium text-ivory">No policies available yet</h3>
            <p className="mt-2 text-sm text-ash">We are adding new policies soon. Check back later.</p>
          </div>
        ) : (
          <>
            {categories?.map((cat) => {
              const catPolicies = policies?.filter(
                (p) => (p.category as { slug: string })?.slug === cat.slug
              );
              if (!catPolicies || catPolicies.length === 0) return null;

              return (
                <div key={cat.id} className="mt-16 first:mt-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-cobalt/10 text-cobalt">
                      <Icon name={cat.icon || "shield"} size={20} />
                    </span>
                    <div>
                      <h2 className="text-xl font-medium text-ivory">{cat.name}</h2>
                      {cat.description && (
                        <p className="text-sm text-ash">{cat.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {catPolicies.map((p) => (
                      <Link
                        key={p.id}
                        href={`/policies/${cat.slug}/${p.slug}`}
                        className="card-hover group flex h-full flex-col rounded-xl border border-white/60 bg-surface p-6"
                      >
                        <div className="flex items-start justify-between">
                          <h3 className="text-lg font-medium text-ivory group-hover:text-cobalt transition-colors">
                            {p.name}
                          </h3>
                          <span className="translate-y-1 text-cobalt opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                            <Icon name="arrow" size={18} />
                          </span>
                        </div>
                        {p.short_description && (
                          <p className="mt-3 text-sm leading-relaxed text-ash line-clamp-3">
                            {p.short_description}
                          </p>
                        )}
                        {p.benefits && p.benefits.length > 0 && (
                          <ul className="mt-4 space-y-2">
                            {p.benefits.slice(0, 3).map((b: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-ash">
                                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-ivory" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="mt-auto pt-4 border-t border-white/10">
                          <span className="text-xs font-medium uppercase tracking-wide text-ash/80">
                            {p.provider}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
