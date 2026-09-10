"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import type { Application } from "@/types/database";

type ApplicationWithDetails = Application & {
  customer: { full_name: string } | null;
  policy: { name: string } | null;
};

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

export default function EmployeeApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("applications")
        .select("*, customer:users(full_name), policy:policies(name)")
        .eq("assigned_employee_id", user.id)
        .order("submitted_at", { ascending: false });

      setApplications((data as ApplicationWithDetails[]) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = filter === "all" ? applications : applications.filter((a) => a.status === filter);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-cobalt border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">Applications</h1>
        <p className="mt-1 text-sm text-ash">Track and manage your assigned applications</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {["all", "submitted", "under_review", "documents_pending", "processing", "approved"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${filter === s ? "bg-cobalt text-white" : "border border-white/10 text-ash hover:text-ivory"}`}>
            {s === "all" ? "All" : s.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card-material rounded-xl p-12 text-center">
          <Icon name="file-text" size={48} className="mx-auto text-ash/40" />
          <h3 className="mt-4 text-lg font-medium text-ivory">No applications found</h3>
          <p className="mt-2 text-sm text-ash">Applications assigned to you will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => (
            <div key={app.id} className="card-material rounded-xl p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-ivory">{app.customer?.full_name || "Unknown"}</h3>
                    <span className="text-xs text-ash">#{app.id.slice(0, 8)}</span>
                  </div>
                  <p className="mt-1 text-sm text-ash">
                    {app.policy?.name || "Policy"} · Submitted: {new Date(app.submitted_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[app.status] || "bg-ash/10 text-ash"}`}>
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
