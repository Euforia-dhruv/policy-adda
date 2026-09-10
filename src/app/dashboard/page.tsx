"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Icon } from "@/components/icons";
import type { UserProfile, Application, SupportTicket } from "@/types/database";

type ApplicationWithPolicy = Application & { policy: { name: string } | null };

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [applications, setApplications] = useState<ApplicationWithPolicy[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;

      const { data: profile } = await supabase.from("users").select("*").eq("id", authUser.id).single();
      setUser(profile as UserProfile);

      const [appsRes, ticketsRes] = await Promise.all([
        supabase
          .from("applications")
          .select("*, policy:policies(name)")
          .eq("customer_id", authUser.id)
          .order("submitted_at", { ascending: false })
          .limit(5),
        supabase
          .from("support_tickets")
          .select("*")
          .eq("customer_id", authUser.id)
          .eq("status", "open"),
      ]);

      setApplications((appsRes.data as ApplicationWithPolicy[]) || []);
      setTickets((ticketsRes.data as SupportTicket[]) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-cobalt border-t-transparent" /></div>;
  }

  const activeApps = applications.filter((a) => !["settled", "rejected"].includes(a.status));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">
          Good morning, {user?.full_name?.split(" ")[0] || "there"}
        </h1>
        <p className="mt-1 text-sm text-ash">Here&apos;s an overview of your account</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Applications", value: applications.length, icon: "file-text", color: "text-cobalt" },
          { label: "Active Applications", value: activeApps.length, icon: "clock", color: "text-emerald-400" },
          { label: "Open Tickets", value: tickets.length, icon: "message-square", color: "text-amber-400" },
        ].map((stat) => (
          <div key={stat.label} className="card-material rounded-xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ash">{stat.label}</span>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            <p className="mt-2 text-3xl font-medium text-ivory">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="card-material rounded-xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-ivory">Recent Applications</h2>
          <Link href="/dashboard/applications" className="text-sm text-cobalt hover:underline">View all</Link>
        </div>
        {applications.length === 0 ? (
          <div className="mt-8 text-center">
            <Icon name="file-text" size={40} className="mx-auto text-ash/40" />
            <p className="mt-3 text-sm text-ash">No applications yet</p>
            <a href="/#quote" className="mt-3 inline-block rounded-full bg-cobalt px-5 py-2 text-sm font-medium text-white hover:bg-cobalt-dark">
              Get your first quote
            </a>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {applications.map((app) => (
              <div key={app.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-elevated p-4">
                <div>
                  <p className="text-sm font-medium text-ivory">{app.policy?.name || "Application"}</p>
                  <p className="text-xs text-ash">Submitted {new Date(app.submitted_at).toLocaleDateString()}</p>
                </div>
                <span className="rounded-full bg-cobalt/10 px-3 py-1 text-xs font-medium text-cobalt">
                  {app.status.replace(/_/g, " ")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/applications" className="card-material group flex items-center gap-4 rounded-xl p-5 transition-colors hover:bg-white/[0.06]">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-cobalt/10 text-cobalt"><Icon name="file-text" size={24} /></div>
          <div><p className="font-medium text-ivory">My Applications</p><p className="text-sm text-ash">Track your insurance applications</p></div>
        </Link>
        <Link href="/dashboard/documents" className="card-material group flex items-center gap-4 rounded-xl p-5 transition-colors hover:bg-white/[0.06]">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400"><Icon name="folder" size={24} /></div>
          <div><p className="font-medium text-ivory">Documents</p><p className="text-sm text-ash">Manage your documents</p></div>
        </Link>
        <Link href="/dashboard/support" className="card-material group flex items-center gap-4 rounded-xl p-5 transition-colors hover:bg-white/[0.06]">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-500/10 text-amber-400"><Icon name="message-square" size={24} /></div>
          <div><p className="font-medium text-ivory">Support</p><p className="text-sm text-ash">Get help with your queries</p></div>
        </Link>
      </div>
    </div>
  );
}
