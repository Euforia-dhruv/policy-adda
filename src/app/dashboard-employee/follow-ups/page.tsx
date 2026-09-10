"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";

export default function FollowUpsPage() {
  const [filter, setFilter] = useState("pending");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-ivory">Follow-ups</h1>
          <p className="mt-1 text-sm text-ash">Manage your scheduled follow-up tasks</p>
        </div>
      </div>

      <div className="flex gap-2">
        {["pending", "completed", "all"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${filter === f ? "bg-cobalt text-white" : "border border-white/10 text-ash hover:text-ivory"}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="card-material rounded-xl p-12 text-center">
        <Icon name="clock" size={48} className="mx-auto text-ash/40" />
        <h3 className="mt-4 text-lg font-medium text-ivory">No follow-ups scheduled</h3>
        <p className="mt-2 text-sm text-ash">Follow-ups will appear here when assigned by a manager</p>
      </div>
    </div>
  );
}
