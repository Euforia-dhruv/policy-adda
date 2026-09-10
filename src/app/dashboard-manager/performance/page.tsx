"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import type { UserProfile, Application } from "@/types/database";

interface TeamMemberStats {
  user: UserProfile;
  totalApps: number;
  resolved: number;
}

export default function PerformancePage() {
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });
  const [teamStats, setTeamStats] = useState<TeamMemberStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      const [appsRes, empsRes] = await Promise.all([
        supabase.from("applications").select("status, assigned_employee_id"),
        supabase.from("users").select("*").in("role", ["executive", "support"]).order("full_name"),
      ]);

      const apps = (appsRes.data as Application[]) || [];
      const emps = (empsRes.data as UserProfile[]) || [];

      const resolved = apps.filter((a) => a.status === "settled" || a.status === "approved").length;

      setStats({
        total: apps.length,
        resolved,
        pending: apps.filter((a) => ["submitted", "under_review", "documents_pending"].includes(a.status)).length,
      });

      const team = emps.map((emp) => {
        const empApps = apps.filter((a) => a.assigned_employee_id === emp.id);
        return {
          user: emp,
          totalApps: empApps.length,
          resolved: empApps.filter((a) => a.status === "settled" || a.status === "approved").length,
        };
      });

      setTeamStats(team);
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
        <h1 className="text-2xl font-medium text-ivory">Performance</h1>
        <p className="mt-1 text-sm text-ash">Team metrics and performance tracking</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Applications", value: stats.total, icon: "file-text", color: "text-iris-gleam" },
          { label: "Resolved", value: stats.resolved, icon: "check-circle", color: "text-emerald-400" },
          { label: "Pending", value: stats.pending, icon: "clock", color: "text-amber-400" },
          { label: "Team Members", value: teamStats.length, icon: "users", color: "text-purple-400" },
        ].map((stat) => (
          <div key={stat.label} className="card-material rounded-xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ash">{stat.label}</span>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            <p className="mt-2 text-3xl font-medium text-ivory">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="card-material rounded-xl p-6">
        <h2 className="text-lg font-medium text-ivory">Individual Performance</h2>
        {teamStats.length === 0 ? (
          <p className="mt-4 text-sm text-ash">No team members yet</p>
        ) : (
          <div className="mt-4 space-y-3">
            {teamStats.map((m) => (
              <div key={m.user.id} className="rounded-lg border border-white/10 bg-elevated p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-iris-gleam to-iris-gleam/70 text-xs font-medium text-void">
                      {m.user.full_name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2) || "?"}
                    </div>
                    <div>
                      <p className="font-medium text-ivory">{m.user.full_name}</p>
                      <p className="text-xs text-ash">{m.user.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-ash">
                    <span>{m.totalApps} apps</span>
                    <span>{m.resolved} resolved</span>
                  </div>
                </div>
                {m.totalApps > 0 && (
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-iris-gleam to-iris-gleam/70" style={{ width: `${(m.resolved / m.totalApps) * 100}%` }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
