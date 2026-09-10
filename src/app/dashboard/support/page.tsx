"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import type { SupportTicket } from "@/types/database";

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

export default function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  async function fetchTickets() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("support_tickets")
      .select("*")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false });

    setTickets((data as SupportTicket[]) || []);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim()) return;
    setSubmitting(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("support_tickets").insert({
      customer_id: user.id,
      subject: subject.trim(),
      description: description.trim(),
      priority,
    });

    setSubject("");
    setDescription("");
    setPriority("medium");
    setShowForm(false);
    setSubmitting(false);
    fetchTickets();
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-cobalt border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-ivory">Support</h1>
          <p className="mt-1 text-sm text-ash">Get help with your queries and issues</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 rounded-full bg-cobalt px-4 py-2.5 text-sm font-medium text-white hover:bg-cobalt-dark">
          <Icon name="plus" size={16} />
          New Ticket
        </button>
      </div>

      {showForm && (
        <div className="card-material rounded-xl p-6">
          <h2 className="text-lg font-medium text-ivory">Create Support Ticket</h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-ash">Subject</label>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} required className="w-full rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none" placeholder="Brief description of your issue" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-ash">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none" placeholder="Provide more details..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-ash">Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory focus:border-cobalt focus:outline-none">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={submitting} className="rounded-full bg-cobalt px-4 py-2 text-sm font-medium text-white hover:bg-cobalt-dark disabled:opacity-50">
                {submitting ? "Submitting..." : "Submit Ticket"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-ash hover:text-ivory">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {tickets.length === 0 ? (
        <div className="card-material rounded-xl p-12 text-center">
          <Icon name="message-square" size={48} className="mx-auto text-ash/40" />
          <h3 className="mt-4 text-lg font-medium text-ivory">No support tickets</h3>
          <p className="mt-2 text-sm text-ash">Need help? Create a ticket or contact us directly.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="card-material rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-ivory">{ticket.subject}</h3>
                    <span className="text-xs text-ash">#{ticket.id.slice(0, 8)}</span>
                  </div>
                  <p className="mt-1 text-sm text-ash">
                    Created: {new Date(ticket.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColors[ticket.priority]}`}>{ticket.priority}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[ticket.status]}`}>{ticket.status.replace(/_/g, " ")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="card-material rounded-xl p-6">
        <h2 className="text-lg font-medium text-ivory">Need immediate help?</h2>
        <p className="mt-2 text-sm text-ash">Contact us directly for urgent queries</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="tel:+917677888748" className="inline-flex items-center gap-2 rounded-full bg-elevated px-4 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-cobalt">
            <Icon name="phone" size={16} />Call: +91 76778 88748
          </a>
          <a href="https://wa.me/917677888748" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-surface">
            <Icon name="chat" size={16} />WhatsApp
          </a>
          <a href="mailto:info@policyadda.co.in" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-surface">
            <Icon name="mail" size={16} />Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
