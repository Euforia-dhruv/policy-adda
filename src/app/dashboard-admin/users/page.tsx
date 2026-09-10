"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import type { UserProfile } from "@/types/database";

const roleColors: Record<string, string> = {
  customer: "bg-blue-500/10 text-blue-400",
  executive: "bg-emerald-500/10 text-emerald-400",
  support: "bg-amber-500/10 text-amber-400",
  manager: "bg-purple-500/10 text-purple-400",
  admin: "bg-red-500/10 text-red-400",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("users").select("*").order("created_at", { ascending: false });
      setUsers((data as UserProfile[]) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = users.filter((u) => {
    const matchesSearch = u.full_name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-iris-gleam border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-ivory">Users</h1>
          <p className="mt-1 text-sm text-ash">Manage all platform users</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ash" />
          <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-full border border-white/10 bg-elevated py-2.5 pl-10 pr-4 text-sm text-ivory placeholder:text-ash/60 focus:border-iris-gleam focus:outline-none" />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="rounded-full border border-white/10 bg-elevated px-4 py-2.5 text-sm text-ivory focus:border-iris-gleam focus:outline-none">
          <option value="all">All Roles</option>
          <option value="customer">Customer</option>
          <option value="executive">Executive</option>
          <option value="support">Support</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="card-material overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filtered.length === 0 ? (
                <tr><td colSpan={3} className="px-6 py-12 text-center text-sm text-ash">No users found</td></tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-iris-gleam to-iris-gleam/70 text-xs font-medium text-void">
                          {u.full_name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2) || "?"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-ivory">{u.full_name || "Unknown"}</p>
                          <p className="text-xs text-ash">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${roleColors[u.role] || "bg-ash/10 text-ash"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-ash">{new Date(u.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
