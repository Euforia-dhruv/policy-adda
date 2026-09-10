"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";

const tickets = [
  { id: "TK-101", customer: "Rahul Kumar", subject: "Claim status update", status: "open", priority: "high", assigned: "Neha Rawat", created: "05 Sep 2026" },
  { id: "TK-102", customer: "Sunita Devi", subject: "Policy renewal query", status: "in_progress", priority: "medium", assigned: "Sunita Devi", created: "03 Sep 2026" },
  { id: "TK-103", customer: "Amit Singh", subject: "Document upload issue", status: "resolved", priority: "low", assigned: "Neha Rawat", created: "01 Sep 2026" },
  { id: "TK-104", customer: "Priya Gupta", subject: "Premium payment failed", status: "open", priority: "urgent", assigned: null, created: "06 Sep 2026" },
  { id: "TK-105", customer: "Vikram Prasad", subject: "Policy comparison help", status: "closed", priority: "low", assigned: "Sunita Devi", created: "28 Aug 2026" },
];

const statusColors: Record<string, string> = {
  open: "bg-blue-500/10 text-blue-400",
  in_progress: "bg-amber-500/10 text-amber-400",
  waiting: "bg-orange-500/10 text-orange-400",
  resolved: "bg-emerald-500/10 text-emerald-400",
  closed: "bg-ash/10 text-ash",
};

const priorityColors: Record<string, string> = {
  low: "bg-ash/10 text-ash",
  medium: "bg-blue-500/10 text-blue-400",
  high: "bg-amber-500/10 text-amber-400",
  urgent: "bg-red-500/10 text-red-400",
};

export default function AdminSupportPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? tickets : tickets.filter((t) => t.status === filter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">Support Tickets</h1>
        <p className="mt-1 text-sm text-ash">Manage all customer support tickets</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {["all", "open", "in_progress", "resolved", "closed"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${filter === s ? "bg-cobalt text-white" : "border border-white/10 text-ash hover:text-ivory"}`}>
            {s === "all" ? "All" : s.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((ticket) => (
          <div key={ticket.id} className="card-material rounded-xl p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-ivory">{ticket.subject}</h3>
                  <span className="text-xs text-ash">{ticket.id}</span>
                </div>
                <p className="mt-1 text-sm text-ash">
                  Customer: {ticket.customer} · Assigned: {ticket.assigned || "Unassigned"}
                </p>
                <p className="text-xs text-ash">Created: {ticket.created}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColors[ticket.priority]}`}>
                  {ticket.priority}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[ticket.status]}`}>
                  {ticket.status.replace(/_/g, " ")}
                </span>
                <button className="rounded-lg border border-white/10 p-2 text-ash hover:text-ivory"><Icon name="eye" size={16} /></button>
                <button className="rounded-lg border border-white/10 p-2 text-ash hover:text-ivory"><Icon name="edit" size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
