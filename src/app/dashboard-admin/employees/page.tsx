"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";

const employees = [
  { id: "1", name: "Priya Sinha", email: "priya@policyadda.co.in", role: "executive", branch: "Ranchi", status: "active", customers: 15 },
  { id: "2", name: "Amit Kumar", email: "amit.k@policyadda.co.in", role: "executive", branch: "Patna", status: "active", customers: 12 },
  { id: "3", name: "Neha Rawat", email: "neha@policyadda.co.in", role: "support", branch: "Jamshedpur", status: "active", customers: 0 },
  { id: "4", name: "Rahul Verma", email: "rahul.v@policyadda.co.in", role: "manager", branch: "Hazaribagh", status: "active", customers: 0 },
  { id: "5", name: "Sunita Devi", email: "sunita@policyadda.co.in", role: "support", branch: "Ranchi", status: "active", customers: 0 },
  { id: "6", name: "Vikram Prasad", email: "vikram@policyadda.co.in", role: "executive", branch: "Dhanbad", status: "inactive", customers: 8 },
];

const roleColors: Record<string, string> = {
  executive: "bg-emerald-500/10 text-emerald-400",
  support: "bg-amber-500/10 text-amber-400",
  manager: "bg-purple-500/10 text-purple-400",
};

export default function AdminEmployeesPage() {
  const [search, setSearch] = useState("");

  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-ivory">Employees</h1>
          <p className="mt-1 text-sm text-ash">Manage employee accounts and access</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-cobalt px-4 py-2.5 text-sm font-medium text-white hover:bg-cobalt-dark">
          <Icon name="plus" size={16} />
          Add Employee
        </button>
      </div>

      <div className="relative">
        <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ash" />
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-white/10 bg-elevated py-2.5 pl-10 pr-4 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((emp) => (
          <div key={emp.id} className="card-material rounded-xl p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-cobalt to-cobalt/70 text-sm font-medium text-ivory">
                  {emp.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-medium text-ivory">{emp.name}</h3>
                  <p className="text-sm text-ash">{emp.email} · {emp.branch}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${roleColors[emp.role]}`}>
                  {emp.role}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  emp.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-ash/10 text-ash"
                }`}>
                  {emp.status}
                </span>
                <button className="rounded-lg border border-white/10 p-2 text-ash hover:text-ivory"><Icon name="edit" size={16} /></button>
                <button className="rounded-lg border border-white/10 p-2 text-ash hover:text-red-400"><Icon name="trash" size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
