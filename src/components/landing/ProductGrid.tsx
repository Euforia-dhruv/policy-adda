import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Icon } from "@/components/icons";

export async function ProductGrid() {
  const supabase = await createClient();

  const { data: policies } = await supabase
    .from("policies")
    .select("id, name, slug, short_description, benefits, category:policy_categories(name, slug, icon)")
    .eq("status", "active")
    .order("name")
    .limit(8);

  if (!policies || policies.length === 0) return null;

  return (
    <section id="products" className="scroll-mt-28 py-20">
      <div className="container-page">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="eyebrow">Products</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ivory sm:text-4xl">
            Cover for every chapter of life
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ash">
            Motor, health, life and more — compared across 12+ insurers and explained in plain
            language by an advisor who sits on your side of the table.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {policies.map((product) => {
            const rawCat = product.category;
            const cat = Array.isArray(rawCat) ? rawCat[0] : rawCat;
            const benefits = (product.benefits || []).slice(0, 3);

            return (
              <Link
                key={product.id}
                href={`/policies/${cat?.slug || "general"}/${product.slug}`}
                className="card-raised card-hover flex flex-col gap-4 p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cobalt/15 text-cobalt">
                  <Icon name={cat?.icon || "shield"} size={22} />
                </span>

                <div>
                  <h3 className="font-semibold text-ivory">{product.name}</h3>
                  {cat && (
                    <p className="mt-0.5 text-sm font-medium text-cobalt">{cat.name}</p>
                  )}
                </div>

                {product.short_description && (
                  <p className="text-sm leading-relaxed text-ash line-clamp-2">{product.short_description}</p>
                )}

                {benefits.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {benefits.map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ash">
                        <Icon name="check" size={14} className="mt-0.5 shrink-0 text-cobalt" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto flex items-center gap-2 rounded-lg bg-elevated px-3 py-2.5 text-xs text-ash ring-1 ring-white/10">
                  <Icon name="arrow" size={14} className="text-cobalt" />
                  <span className="font-medium text-ivory">View Details</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
