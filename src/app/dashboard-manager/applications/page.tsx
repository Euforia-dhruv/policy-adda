"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";

const mockApplications = [
  { id: "APP-201", customer: "Rahul Kumar", employee: "Priya Sinha", policy: "Car Comprehensive", status: "processing", submitted: "05 Sep 2026" },
  { id: "APP-202", customer: "Sunita Devi", employee: "Amit Kumar", policy: "Family Floater", status: "documents_pending", submitted: "03 Sep 2026" },
  { id: "APP-203", customer: "Amit Singh", employee: "Neha Rawat", policy: "Term Life", status: "advisor_assigned", submitted: "01 Sep 2026" },
  { id: "APP-204", customer: "Priya Gupta", employee: "Rahul Verma", policy: "Car Insurance", status: "under_review", submitted: "28 Aug 2026" },
  { id: "APP-205", customer: "Vikram Prasad", employee: "Priya Sinha", policy: "Health Insurance", status: "approved", submitted: "25 Aug 2026" },
  { id: "APP-206", customer: "Neha Kumari", employee: "Amit Kumar", policy: "Bike Insurance", status: "settled", submitted: "20 Aug 2026" },
];

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

export default function ManagerApplicationsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? mockApplications : mockApplications.filter((a) => a.status === filter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">Applications</h1>
        <p className="mt-1 text-sm text-ash">Monitor all team applications</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {["all", "submitted", "under_review", "processing", "approved", "settled"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${filter === s ? "bg-cobalt text-white" : "border border-white/10 text-ash hover:text-ivory"}`}>
            {s === "all" ? "All" : s.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((app) => (
          <div key={app.id} className="card-material rounded-xl p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-ivory">{app.customer}</h3>
                  <span className="text-xs text-ash">{app.id}</span>
                </div>
                <p className="mt-1 text-sm text-ash">
                  {app.policy} · Assigned to: <span className="text-ivory">{app.employee}</span>
                </p>
                <p className="text-xs text-ash">Submitted: {app.submitted}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[app.status]}`}>
                  {app.status.replace(/_/g, " ")}
                </span>
                <button className="rounded-lg border border-white/10 p-2 text-ash hover:text-ivory">
                  <Icon name="eye" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
