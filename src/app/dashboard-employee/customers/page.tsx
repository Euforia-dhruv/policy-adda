"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import type { CustomerAssignment } from "@/types/database";

type AssignmentWithDetails = CustomerAssignment & {
  customer: { full_name: string; email: string; phone: string } | null;
  application: { status: string; policy: { name: string } | null } | null;
};

export default function AssignedCustomersPage() {
  const [assignments, setAssignments] = useState<AssignmentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("customer_assignments")
        .select("*, customer:users(full_name, email, phone), application:applications(status, policy:policies(name))")
        .eq("employee_id", user.id)
        .order("assigned_at", { ascending: false });

      setAssignments((data as AssignmentWithDetails[]) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = assignments.filter((a) => {
    if (!search) return true;
    const name = a.customer?.full_name?.toLowerCase() || "";
    const phone = a.customer?.phone || "";
    return name.includes(search.toLowerCase()) || phone.includes(search);
  });

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-cobalt border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">Assigned Customers</h1>
        <p className="mt-1 text-sm text-ash">Manage your assigned customer relationships</p>
      </div>

      <div className="relative">
        <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ash" />
        <input type="text" placeholder="Search by name or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-full border border-white/10 bg-elevated py-2.5 pl-10 pr-4 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none" />
      </div>

      {filtered.length === 0 ? (
        <div className="card-material rounded-xl p-12 text-center">
          <Icon name="users" size={48} className="mx-auto text-ash/40" />
          <h3 className="mt-4 text-lg font-medium text-ivory">No customers assigned</h3>
          <p className="mt-2 text-sm text-ash">Customers will appear here when assigned by a manager</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <div key={a.id} className="card-material rounded-xl p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-cobalt to-cobalt/70 text-sm font-medium text-ivory">
                    {a.customer?.full_name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2) || "?"}
                  </div>
                  <div>
                    <h3 className="font-medium text-ivory">{a.customer?.full_name || "Unknown"}</h3>
                    <p className="text-sm text-ash">{a.application?.policy?.name || "No policy"} · Assigned {new Date(a.assigned_at).toLocaleDateString()}</p>
                    {a.customer?.phone && <p className="text-xs text-ash">{a.customer.phone}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    a.application?.status === "approved" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                  }`}>
                    {(a.application?.status || "pending").replace(/_/g, " ")}
                  </span>
                  {a.customer?.phone && (
                    <a href={`tel:${a.customer.phone}`} className="rounded-lg border border-white/10 p-2 text-ash hover:text-ivory">
                      <Icon name="phone" size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
