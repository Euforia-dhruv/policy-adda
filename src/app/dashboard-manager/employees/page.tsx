"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import type { UserProfile } from "@/types/database";

export default function ManagerEmployeesPage() {
  const [employees, setEmployees] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("users")
        .select("*")
        .in("role", ["executive", "support"])
        .order("full_name");
      setEmployees((data as UserProfile[]) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = employees.filter((e) =>
    e.full_name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-cobalt border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">Team Members</h1>
        <p className="mt-1 text-sm text-ash">Manage your team and their assignments</p>
      </div>

      <div className="relative">
        <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ash" />
        <input type="text" placeholder="Search by name or role..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-full border border-white/10 bg-elevated py-2.5 pl-10 pr-4 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none" />
      </div>

      {filtered.length === 0 ? (
        <div className="card-material rounded-xl p-12 text-center">
          <Icon name="users" size={48} className="mx-auto text-ash/40" />
          <h3 className="mt-4 text-lg font-medium text-ivory">No team members found</h3>
          <p className="mt-2 text-sm text-ash">Employees will appear here once added by admin</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((emp) => (
            <div key={emp.id} className="card-material rounded-xl p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-medium text-ivory">
                    {emp.full_name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2) || "?"}
                  </div>
                  <div>
                    <h3 className="font-medium text-ivory">{emp.full_name}</h3>
                    <p className="text-sm text-ash">{emp.role}</p>
                    <p className="text-xs text-ash">{emp.email}</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">Active</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
