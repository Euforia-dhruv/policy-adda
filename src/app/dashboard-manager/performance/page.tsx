"use client";

import { Icon } from "@/components/icons";

const teamPerformance = [
  { name: "Priya Sinha", customers: 15, applications: 8, resolved: 42, avgDays: 7, rating: 4.9 },
  { name: "Amit Kumar", customers: 12, applications: 6, resolved: 35, avgDays: 9, rating: 4.8 },
  { name: "Neha Rawat", customers: 18, applications: 11, resolved: 51, avgDays: 6, rating: 4.9 },
  { name: "Rahul Verma", customers: 10, applications: 4, resolved: 28, avgDays: 8, rating: 4.7 },
];

const monthlyStats = [
  { month: "Sep", applications: 29, resolved: 23, revenue: "₹4.2L" },
  { month: "Aug", applications: 34, resolved: 31, revenue: "₹5.1L" },
  { month: "Jul", applications: 28, resolved: 26, revenue: "₹3.8L" },
  { month: "Jun", applications: 31, resolved: 29, revenue: "₹4.5L" },
];

export default function PerformancePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">Performance</h1>
        <p className="mt-1 text-sm text-ash">Team metrics and performance tracking</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Applications", value: "122", icon: "file-text", color: "text-cobalt", change: "+12%" },
          { label: "Resolved", value: "109", icon: "check-circle", color: "text-emerald-400", change: "+8%" },
          { label: "Avg. Resolution", value: "7.5 days", icon: "clock", color: "text-amber-400", change: "-1.2 days" },
          { label: "Revenue", value: "₹17.6L", icon: "dollar-sign", color: "text-purple-400", change: "+15%" },
        ].map((stat) => (
          <div key={stat.label} className="card-material rounded-xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ash">{stat.label}</span>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            <p className="mt-2 text-3xl font-medium text-ivory">{stat.value}</p>
            <p className="mt-1 text-xs text-emerald-400">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-material rounded-xl p-6">
          <h2 className="text-lg font-medium text-ivory">Individual Performance</h2>
          <div className="mt-4 space-y-3">
            {teamPerformance.map((m) => (
              <div key={m.name} className="rounded-lg border border-white/10 bg-elevated p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-cobalt to-cobalt/70 text-xs font-medium text-ivory">
                      {m.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-ivory">{m.name}</p>
                      <p className="text-xs text-ash">★ {m.rating}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-ash">
                    <span>{m.resolved} resolved</span>
                    <span>{m.avgDays}d avg</span>
                  </div>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cobalt to-cobalt/70"
                    style={{ width: `${(m.resolved / 51) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-material rounded-xl p-6">
          <h2 className="text-lg font-medium text-ivory">Monthly Trends</h2>
          <div className="mt-4 space-y-3">
            {monthlyStats.map((m) => (
              <div key={m.month} className="flex items-center justify-between rounded-lg border border-white/10 bg-elevated p-4">
                <div>
                  <p className="font-medium text-ivory">{m.month} 2026</p>
                  <p className="text-xs text-ash">{m.applications} applications</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-emerald-400">{m.resolved} resolved</span>
                  <span className="font-medium text-ivory">{m.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
