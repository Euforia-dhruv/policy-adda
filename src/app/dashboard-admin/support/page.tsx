"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import type { SupportTicket } from "@/types/database";

type TicketWithDetails = SupportTicket & {
  customer: { full_name: string } | null;
  assigned: { full_name: string } | null;
};

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
  const [tickets, setTickets] = useState<TicketWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("support_tickets")
        .select("*, customer:users!support_tickets_customer_id_fkey(full_name), assigned:users!support_tickets_assigned_to_fkey(full_name)")
        .order("created_at", { ascending: false });
      setTickets((data as TicketWithDetails[]) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = filter === "all" ? tickets : tickets.filter((t) => t.status === filter);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-iris-gleam border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">Support Tickets</h1>
        <p className="mt-1 text-sm text-ash">Manage all customer support tickets</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {["all", "open", "in_progress", "resolved", "closed"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${filter === s ? "bg-iris-gleam text-void" : "border border-white/10 text-ash hover:text-ivory"}`}>
            {s === "all" ? "All" : s.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card-material rounded-xl p-12 text-center">
          <Icon name="message-square" size={48} className="mx-auto text-ash/40" />
          <h3 className="mt-4 text-lg font-medium text-ivory">No tickets found</h3>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((ticket) => (
            <div key={ticket.id} className="card-material rounded-xl p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-ivory">{ticket.subject}</h3>
                    <span className="text-xs text-ash">#{ticket.id.slice(0, 8)}</span>
                  </div>
                  <p className="mt-1 text-sm text-ash">
                    Customer: {ticket.customer?.full_name || "Unknown"} · Assigned: {ticket.assigned?.full_name || "Unassigned"}
                  </p>
                  <p className="text-xs text-ash">Created: {new Date(ticket.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColors[ticket.priority]}`}>{ticket.priority}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[ticket.status]}`}>{ticket.status.replace(/_/g, " ")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
