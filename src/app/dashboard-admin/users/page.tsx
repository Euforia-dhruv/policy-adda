"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";

const users = [
  { id: "1", name: "Rahul Kumar", email: "rahul@example.com", role: "customer", status: "active", joined: "01 Jan 2024" },
  { id: "2", name: "Sunita Devi", email: "sunita@example.com", role: "customer", status: "active", joined: "15 Mar 2024" },
  { id: "3", name: "Amit Singh", email: "amit@example.com", role: "customer", status: "active", joined: "01 Jun 2024" },
  { id: "4", name: "Priya Sinha", email: "priya@policyadda.co.in", role: "executive", status: "active", joined: "01 Jan 2020" },
  { id: "5", name: "Amit Kumar", email: "amit.k@policyadda.co.in", role: "executive", status: "active", joined: "15 Mar 2021" },
  { id: "6", name: "Neha Rawat", email: "neha@policyadda.co.in", role: "support", status: "active", joined: "01 Jun 2021" },
  { id: "7", name: "Rahul Verma", email: "rahul.v@policyadda.co.in", role: "manager", status: "active", joined: "01 Sep 2019" },
  { id: "8", name: "Admin User", email: "admin@policyadda.co.in", role: "admin", status: "active", joined: "01 Jan 2018" },
];

const roleColors: Record<string, string> = {
  customer: "bg-blue-500/10 text-blue-400",
  executive: "bg-emerald-500/10 text-emerald-400",
  support: "bg-amber-500/10 text-amber-400",
  manager: "bg-purple-500/10 text-purple-400",
  admin: "bg-red-500/10 text-red-400",
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-ivory">Users</h1>
          <p className="mt-1 text-sm text-ash">Manage all platform users</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-cobalt px-4 py-2.5 text-sm font-medium text-white hover:bg-cobalt-dark">
          <Icon name="plus" size={16} />
          Add User
        </button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ash" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-elevated py-2.5 pl-10 pr-4 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-full border border-white/10 bg-elevated px-4 py-2.5 text-sm text-ivory focus:border-cobalt focus:outline-none"
        >
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
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Joined</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-ash">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cobalt to-cobalt/70 text-xs font-medium text-ivory">
                        {u.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ivory">{u.name}</p>
                        <p className="text-xs text-ash">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${roleColors[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-ash">{u.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="rounded-lg p-1.5 text-ash hover:text-ivory"><Icon name="edit" size={16} /></button>
                      <button className="rounded-lg p-1.5 text-ash hover:text-red-400"><Icon name="trash" size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
