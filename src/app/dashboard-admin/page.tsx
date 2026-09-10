"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Icon } from "@/components/icons";
import type { UserProfile } from "@/types/database";

interface AdminStats {
  users: number;
  policies: number;
  applications: number;
  openTickets: number;
}

export default function AdminOverviewPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<AdminStats>({ users: 0, policies: 0, applications: 0, openTickets: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data: profile } = await supabase.from("users").select("*").eq("id", authUser.id).single();
        setUser(profile as UserProfile);
      }

      const [usersRes, policiesRes, appsRes, ticketsRes] = await Promise.all([
        supabase.from("users").select("*", { count: "exact", head: true }),
        supabase.from("policies").select("*", { count: "exact", head: true }),
        supabase.from("applications").select("*", { count: "exact", head: true }),
        supabase.from("support_tickets").select("*", { count: "exact", head: true }).eq("status", "open"),
      ]);

      setStats({
        users: usersRes.count || 0,
        policies: policiesRes.count || 0,
        applications: appsRes.count || 0,
        openTickets: ticketsRes.count || 0,
      });
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-cobalt border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-ash">System overview and management</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Users", value: stats.users, icon: "users", color: "text-cobalt" },
          { label: "Active Policies", value: stats.policies, icon: "shield", color: "text-emerald-400" },
          { label: "Applications", value: stats.applications, icon: "file-text", color: "text-amber-400" },
          { label: "Open Tickets", value: stats.openTickets, icon: "message-square", color: "text-purple-400" },
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

      <div className="grid gap-6 lg:grid-cols-2">
        <Link href="/dashboard-admin/users" className="card-material group flex items-center gap-4 rounded-xl p-5 transition-colors hover:bg-white/[0.06]">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-cobalt/10 text-cobalt"><Icon name="users" size={24} /></div>
          <div><p className="font-medium text-ivory">Manage Users</p><p className="text-sm text-ash">View, edit, and manage all users</p></div>
        </Link>
        <Link href="/dashboard-admin/employees" className="card-material group flex items-center gap-4 rounded-xl p-5 transition-colors hover:bg-white/[0.06]">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400"><Icon name="user-check" size={24} /></div>
          <div><p className="font-medium text-ivory">Manage Employees</p><p className="text-sm text-ash">Employee accounts and roles</p></div>
        </Link>
        <Link href="/dashboard-admin/policies" className="card-material group flex items-center gap-4 rounded-xl p-5 transition-colors hover:bg-white/[0.06]">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-500/10 text-amber-400"><Icon name="file-text" size={24} /></div>
          <div><p className="font-medium text-ivory">Manage Policies</p><p className="text-sm text-ash">Policy catalog and configuration</p></div>
        </Link>
        <Link href="/dashboard-admin/settings" className="card-material group flex items-center gap-4 rounded-xl p-5 transition-colors hover:bg-white/[0.06]">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-purple-500/10 text-purple-400"><Icon name="settings" size={24} /></div>
          <div><p className="font-medium text-ivory">System Settings</p><p className="text-sm text-ash">Platform configuration</p></div>
        </Link>
      </div>
    </div>
  );
}
