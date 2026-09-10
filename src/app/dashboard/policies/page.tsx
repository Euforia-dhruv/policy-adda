"use client";

import { Icon } from "@/components/icons";

const policies = [
  {
    id: "1",
    name: "Car Comprehensive",
    provider: "ICICI Lombard",
    type: "Motor Insurance",
    status: "Active",
    renewalDate: "12 Mar 2026",
    premium: "₹12,400/year",
  },
  {
    id: "2",
    name: "Family Floater Health",
    provider: "HDFC ERGO",
    type: "Health Insurance",
    status: "Active",
    renewalDate: "15 Jul 2026",
    premium: "₹18,500/year",
  },
  {
    id: "3",
    name: "Term Life - 1 Cr",
    provider: "Bajaj Allianz",
    type: "Life Insurance",
    status: "Active",
    renewalDate: "01 Jan 2027",
    premium: "₹8,200/year",
  },
  {
    id: "4",
    name: "Two-Wheeler OD",
    provider: "Digit Insurance",
    type: "Motor Insurance",
    status: "Active",
    renewalDate: "20 Sep 2026",
    premium: "₹3,600/year",
  },
];

export default function PoliciesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">My Policies</h1>
        <p className="mt-1 text-sm text-ash">View and manage all your active insurance policies</p>
      </div>

      <div className="space-y-4">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="card-material rounded-xl p-6 transition-colors hover:bg-white/[0.04]"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-cobalt/10 text-cobalt">
                  <Icon name="shield" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-ivory">{policy.name}</h3>
                  <p className="text-sm text-ash">{policy.provider} · {policy.type}</p>
                  <p className="mt-1 text-sm text-ash">
                    Renewal: <span className="text-ivory">{policy.renewalDate}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-ivory">{policy.premium}</p>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                    {policy.status}
                  </span>
                </div>
                <button className="rounded-lg border border-white/10 p-2 text-ash hover:text-ivory">
                  <Icon name="chevron-right" size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
