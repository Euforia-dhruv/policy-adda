"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import type { UserProfile, Application, CustomerAssignment } from "@/types/database";

export default function ManagerOverviewPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState({ employees: 0, customers: 0, applications: 0, resolved: 0 });
  const [employees, setEmployees] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;

      const { data: profile } = await supabase.from("users").select("*").eq("id", authUser.id).single();
      setUser(profile as UserProfile);

      const [empRes, appsRes, assignsRes] = await Promise.all([
        supabase.from("users").select("*").in("role", ["executive", "support"]),
        supabase.from("applications").select("*, assigned_employee:users(full_name)"),
        supabase.from("customer_assignments").select("*"),
      ]);

      const emps = (empRes.data as UserProfile[]) || [];
      const apps = (appsRes.data as Application[]) || [];
      const assigns = (assignsRes.data as CustomerAssignment[]) || [];

      setEmployees(emps);
      setStats({
        employees: emps.length,
        customers: assigns.length,
        applications: apps.length,
        resolved: apps.filter((a) => a.status === "settled" || a.status === "approved").length,
      });
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
        <h1 className="text-2xl font-medium text-ivory">Manager Dashboard</h1>
        <p className="mt-1 text-sm text-ash">Team overview and performance metrics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Team Members", value: stats.employees, icon: "users", color: "text-cobalt" },
          { label: "Total Customers", value: stats.customers, icon: "briefcase", color: "text-emerald-400" },
          { label: "Applications", value: stats.applications, icon: "file-text", color: "text-amber-400" },
          { label: "Resolved", value: stats.resolved, icon: "check-circle", color: "text-purple-400" },
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
        <h2 className="text-lg font-medium text-ivory">Team Members</h2>
        {employees.length === 0 ? (
          <p className="mt-4 text-sm text-ash">No team members yet</p>
        ) : (
          <div className="mt-4 space-y-3">
            {employees.map((emp) => (
              <div key={emp.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-elevated p-4">
                <div className="flex items-center gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-cobalt to-cobalt/70 text-sm font-medium text-ivory">
                    {emp.full_name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2) || "?"}
                  </div>
                  <div>
                    <p className="font-medium text-ivory">{emp.full_name}</p>
                    <p className="text-sm text-ash">{emp.role}</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">Active</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
