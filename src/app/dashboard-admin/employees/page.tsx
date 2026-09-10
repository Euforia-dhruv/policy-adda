"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import type { UserProfile } from "@/types/database";

const roleColors: Record<string, string> = {
  executive: "bg-emerald-500/10 text-emerald-400",
  support: "bg-amber-500/10 text-amber-400",
  manager: "bg-purple-500/10 text-purple-400",
};

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("users").select("*").in("role", ["executive", "support", "manager"]).order("full_name");
      setEmployees((data as UserProfile[]) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = employees.filter((e) =>
    e.full_name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-iris-gleam border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">Employees</h1>
        <p className="mt-1 text-sm text-ash">Manage employee accounts and access</p>
      </div>

      <div className="relative">
        <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ash" />
        <input type="text" placeholder="Search employees..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-full border border-white/10 bg-elevated py-2.5 pl-10 pr-4 text-sm text-ivory placeholder:text-ash/60 focus:border-iris-gleam focus:outline-none" />
      </div>

      {filtered.length === 0 ? (
        <div className="card-material rounded-xl p-12 text-center">
          <Icon name="users" size={48} className="mx-auto text-ash/40" />
          <h3 className="mt-4 text-lg font-medium text-ivory">No employees found</h3>
          <p className="mt-2 text-sm text-ash">Employees will appear here once added</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((emp) => (
            <div key={emp.id} className="card-material rounded-xl p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-iris-gleam to-iris-gleam/70 text-sm font-medium text-void">
                    {emp.full_name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2) || "?"}
                  </div>
                  <div>
                    <h3 className="font-medium text-ivory">{emp.full_name}</h3>
                    <p className="text-sm text-ash">{emp.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${roleColors[emp.role] || "bg-ash/10 text-ash"}`}>
                    {emp.role}
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
