"use client";

import { Icon } from "@/components/icons";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">System Settings</h1>
        <p className="mt-1 text-sm text-ash">Configure platform settings and integrations</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-material rounded-xl p-6">
          <h2 className="text-lg font-medium text-ivory">General Settings</h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-ivory">Platform Name</label>
              <input
                type="text"
                defaultValue="Policy Adda"
                className="w-full rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory focus:border-cobalt focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-ivory">Contact Email</label>
              <input
                type="email"
                defaultValue="info@policyadda.co.in"
                className="w-full rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory focus:border-cobalt focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-ivory">Phone Number</label>
              <input
                type="tel"
                defaultValue="+91 76778 88748"
                className="w-full rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory focus:border-cobalt focus:outline-none"
              />
            </div>
            <button className="rounded-full bg-cobalt px-4 py-2 text-sm font-medium text-white hover:bg-cobalt-dark">
              Save Changes
            </button>
          </div>
        </div>

        <div className="card-material rounded-xl p-6">
          <h2 className="text-lg font-medium text-ivory">Integrations</h2>
          <div className="mt-4 space-y-4">
            {[
              { name: "Supabase", description: "Database & Authentication", status: "connected" },
              { name: "Vercel", description: "Hosting & Deployment", status: "connected" },
              { name: "WhatsApp API", description: "Customer Communication", status: "not_configured" },
              { name: "Email Service", description: "Transactional Emails", status: "not_configured" },
              { name: "Google Analytics", description: "Website Analytics", status: "not_configured" },
            ].map((integration) => (
              <div key={integration.name} className="flex items-center justify-between rounded-lg border border-white/10 bg-elevated p-4">
                <div>
                  <p className="font-medium text-ivory">{integration.name}</p>
                  <p className="text-xs text-ash">{integration.description}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  integration.status === "connected" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                }`}>
                  {integration.status === "connected" ? "Connected" : "Not Configured"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-material rounded-xl p-6">
          <h2 className="text-lg font-medium text-ivory">Notification Settings</h2>
          <div className="mt-4 space-y-4">
            {[
              { label: "Email notifications for new applications", enabled: true },
              { label: "WhatsApp notifications for support tickets", enabled: false },
              { label: "Daily team performance summary", enabled: true },
              { label: "Weekly application report", enabled: true },
            ].map((setting, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-white/10 bg-elevated p-4">
                <span className="text-sm text-ivory">{setting.label}</span>
                <button className={`relative h-6 w-11 rounded-full transition-colors ${setting.enabled ? "bg-cobalt" : "bg-white/10"}`}>
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${setting.enabled ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card-material rounded-xl p-6">
          <h2 className="text-lg font-medium text-ivory">Danger Zone</h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
              <p className="font-medium text-red-400">Delete Account</p>
              <p className="mt-1 text-sm text-ash">Permanently delete your admin account and all associated data.</p>
              <button className="mt-3 rounded-full border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
