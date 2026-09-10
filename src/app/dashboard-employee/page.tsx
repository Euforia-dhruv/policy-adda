"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Icon } from "@/components/icons";
import type { UserProfile, Application, CustomerAssignment } from "@/types/database";

type AssignmentWithCustomer = CustomerAssignment & {
  customer: { full_name: string; email: string } | null;
  application: { status: string; policy: { name: string } | null } | null;
};

export default function EmployeeOverviewPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [assignments, setAssignments] = useState<AssignmentWithCustomer[]>([]);
  const [stats, setStats] = useState({ customers: 0, active: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;

      const { data: profile } = await supabase.from("users").select("*").eq("id", authUser.id).single();
      setUser(profile as UserProfile);

      const { data: assigns } = await supabase
        .from("customer_assignments")
        .select("*, customer:users(full_name, email), application:applications(status, policy:policies(name))")
        .eq("employee_id", authUser.id)
        .order("assigned_at", { ascending: false });

      const data = (assigns as AssignmentWithCustomer[]) || [];
      setAssignments(data);
      setStats({
        customers: data.length,
        active: data.filter((a) => a.application?.status && !["settled", "rejected"].includes(a.application.status)).length,
        pending: data.filter((a) => a.application?.status === "submitted" || a.application?.status === "under_review").length,
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
        <h1 className="text-2xl font-medium text-ivory">Welcome back, {user?.full_name?.split(" ")[0] || "there"}</h1>
        <p className="mt-1 text-sm text-ash">Here is your work overview for today</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Assigned Customers", value: stats.customers, icon: "users", color: "text-cobalt" },
          { label: "Active Applications", value: stats.active, icon: "file-text", color: "text-emerald-400" },
          { label: "Pending Review", value: stats.pending, icon: "clock", color: "text-amber-400" },
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
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-ivory">Recent Customers</h2>
          <Link href="/dashboard-employee/customers" className="text-sm text-cobalt hover:underline">View all</Link>
        </div>
        {assignments.length === 0 ? (
          <div className="mt-8 text-center">
            <Icon name="users" size={40} className="mx-auto text-ash/40" />
            <p className="mt-3 text-sm text-ash">No assigned customers yet</p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {assignments.slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-elevated p-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cobalt to-cobalt/70 text-xs font-medium text-ivory">
                    {a.customer?.full_name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2) || "?"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ivory">{a.customer?.full_name || "Unknown"}</p>
                    <p className="text-xs text-ash">{a.application?.policy?.name || "No policy"}</p>
                  </div>
                </div>
                <span className="text-xs text-ash">{new Date(a.assigned_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
