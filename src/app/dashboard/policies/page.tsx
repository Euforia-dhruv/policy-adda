"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Icon } from "@/components/icons";
import type { Application } from "@/types/database";

type AppWithPolicy = Application & { policy: { name: string; provider: string; slug: string; category: { slug: string } | null } | null };

export default function PoliciesPage() {
  const [applications, setApplications] = useState<AppWithPolicy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("applications")
        .select("*, policy:policies(name, provider, slug, category:policy_categories(slug))")
        .eq("customer_id", user.id)
        .in("status", ["approved", "settled"])
        .order("submitted_at", { ascending: false });

      setApplications((data as AppWithPolicy[]) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-iris-gleam border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">My Policies</h1>
        <p className="mt-1 text-sm text-ash">View and manage all your active insurance policies</p>
      </div>

      {applications.length === 0 ? (
        <div className="card-material rounded-xl p-12 text-center">
          <Icon name="shield" size={48} className="mx-auto text-ash/40" />
          <h3 className="mt-4 text-lg font-medium text-ivory">No active policies</h3>
          <p className="mt-2 text-sm text-ash">Your approved policies will appear here</p>
          <a href="/#quote" className="mt-4 inline-block rounded-full bg-iris-gleam px-5 py-2 text-sm font-medium text-void hover:bg-deep-iris">
            Get a Quote
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <Link
              key={app.id}
              href={`/policies/${app.policy?.category?.slug || "general"}/${app.policy?.slug || ""}`}
              className="card-material block rounded-xl p-6 transition-colors hover:bg-white/[0.04]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-iris-gleam/10 text-iris-gleam">
                    <Icon name="shield" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-ivory">{app.policy?.name || "Policy"}</h3>
                    <p className="text-sm text-ash">{app.policy?.provider || ""}</p>
                    <p className="mt-1 text-xs text-ash">
                      Applied: {new Date(app.submitted_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                    {app.status === "settled" ? "Active" : "Approved"}
                  </span>
                  <Icon name="chevron-right" size={18} className="text-ash" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
