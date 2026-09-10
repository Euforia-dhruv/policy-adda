"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Icon } from "@/components/icons";
import type { Application } from "@/types/database";

type ApplicationWithPolicy = Application & { policy: { name: string; provider: string } | null };

const statusColors: Record<string, string> = {
  submitted: "bg-blue-500/10 text-blue-400",
  under_review: "bg-amber-500/10 text-amber-400",
  documents_pending: "bg-orange-500/10 text-orange-400",
  advisor_assigned: "bg-purple-500/10 text-purple-400",
  processing: "bg-cobalt/10 text-cobalt",
  approved: "bg-emerald-500/10 text-emerald-400",
  rejected: "bg-red-500/10 text-red-400",
  settled: "bg-emerald-500/10 text-emerald-400",
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationWithPolicy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("applications")
        .select("*, policy:policies(name, provider)")
        .eq("customer_id", user.id)
        .order("submitted_at", { ascending: false });

      setApplications((data as ApplicationWithPolicy[]) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-cobalt border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">Applications</h1>
        <p className="mt-1 text-sm text-ash">Track the status of your insurance applications</p>
      </div>

      {applications.length === 0 ? (
        <div className="card-material rounded-xl p-12 text-center">
          <Icon name="file-text" size={48} className="mx-auto text-ash/40" />
          <h3 className="mt-4 text-lg font-medium text-ivory">No applications yet</h3>
          <p className="mt-2 text-sm text-ash">Submit a quote to get started</p>
          <a href="/#quote" className="mt-4 inline-block rounded-full bg-cobalt px-5 py-2 text-sm font-medium text-white hover:bg-cobalt-dark">
            Get a Quote
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div key={app.id} className="card-material rounded-xl p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-ivory">{app.policy?.name || "Application"}</h3>
                    <span className="text-xs text-ash">#{app.id.slice(0, 8)}</span>
                  </div>
                  <p className="mt-1 text-sm text-ash">
                    Submitted: {new Date(app.submitted_at).toLocaleDateString()}
                  </p>
                  {app.policy?.provider && (
                    <p className="text-sm text-ash">
                      Provider: <span className="text-ivory">{app.policy.provider}</span>
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[app.status] || "bg-ash/10 text-ash"}`}>
                    {app.status.replace(/_/g, " ")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
