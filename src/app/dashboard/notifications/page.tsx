"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import type { Notification } from "@/types/database";

const typeIcons: Record<string, string> = {
  info: "info",
  success: "check-circle",
  warning: "alert-triangle",
  error: "x-circle",
};

const typeColors: Record<string, string> = {
  info: "text-cobalt",
  success: "text-emerald-400",
  warning: "text-amber-400",
  error: "text-red-400",
};

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setNotifications((data as Notification[]) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  async function markAllRead() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("notifications").update({ is_read: true }).eq("user_id", user.id).eq("is_read", false);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-cobalt border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-ivory">Notifications</h1>
          <p className="mt-1 text-sm text-ash">Stay updated on your applications and policies</p>
        </div>
        {notifications.some((n) => !n.is_read) && (
          <button onClick={markAllRead} className="text-sm text-cobalt hover:underline">Mark all as read</button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="card-material rounded-xl p-12 text-center">
          <Icon name="bell" size={48} className="mx-auto text-ash/40" />
          <h3 className="mt-4 text-lg font-medium text-ivory">No notifications</h3>
          <p className="mt-2 text-sm text-ash">You&apos;re all caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div key={notif.id} className={`card-material flex items-start gap-4 rounded-xl p-5 ${!notif.is_read ? "border-l-2 border-l-cobalt" : ""}`}>
              <div className={`mt-0.5 ${typeColors[notif.type]}`}>
                <Icon name={typeIcons[notif.type]} size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-medium ${!notif.is_read ? "text-ivory" : "text-ash"}`}>{notif.title}</h3>
                  <span className="text-xs text-ash">{timeAgo(notif.created_at)}</span>
                </div>
                {notif.message && <p className="mt-1 text-sm text-ash">{notif.message}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
