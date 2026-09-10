"use client";

import { Icon } from "@/components/icons";

const roles = [
  { name: "admin", label: "Administrator", description: "Full system access. Can manage users, employees, policies, and all settings.", users: 1, color: "text-red-400", bgColor: "bg-red-500/10" },
  { name: "manager", label: "Manager", description: "Can manage team members, assignments, and view all applications.", users: 1, color: "text-purple-400", bgColor: "bg-purple-500/10" },
  { name: "executive", label: "Customer Executive", description: "Can manage assigned customers and applications. Can add follow-ups.", users: 3, color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
  { name: "support", label: "Support Team", description: "Can handle support tickets and respond to customer queries.", users: 2, color: "text-amber-400", bgColor: "bg-amber-500/10" },
  { name: "customer", label: "Customer", description: "Can view own policies, applications, documents, and create support tickets.", users: 241, color: "text-blue-400", bgColor: "bg-blue-500/10" },
];

const permissions = [
  { action: "View own profile", admin: true, manager: true, executive: true, support: true, customer: true },
  { action: "View all users", admin: true, manager: false, executive: false, support: false, customer: false },
  { action: "Manage users", admin: true, manager: false, executive: false, support: false, customer: false },
  { action: "Manage employees", admin: true, manager: true, executive: false, support: false, customer: false },
  { action: "Manage policies", admin: true, manager: false, executive: false, support: false, customer: false },
  { action: "View all applications", admin: true, manager: true, executive: false, support: false, customer: false },
  { action: "Manage assignments", admin: true, manager: true, executive: false, support: false, customer: false },
  { action: "Handle support tickets", admin: true, manager: true, executive: false, support: true, customer: false },
  { action: "View analytics", admin: true, manager: true, executive: false, support: false, customer: false },
  { action: "System settings", admin: true, manager: false, executive: false, support: false, customer: false },
];

export default function RolesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">Roles & Permissions</h1>
        <p className="mt-1 text-sm text-ash">Manage role-based access control</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <div key={role.name} className="card-material rounded-xl p-6">
            <div className="flex items-center gap-3">
              <span className={`grid h-10 w-10 place-items-center rounded-xl ${role.bgColor} ${role.color}`}>
                <Icon name="shield" size={20} />
              </span>
              <div>
                <h3 className="font-medium text-ivory">{role.label}</h3>
                <p className="text-xs text-ash">{role.users} users</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-ash">{role.description}</p>
          </div>
        ))}
      </div>

      <div className="card-material overflow-hidden rounded-xl">
        <div className="p-6">
          <h2 className="text-lg font-medium text-ivory">Permission Matrix</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Permission</th>
                {["admin", "manager", "executive", "support", "customer"].map((r) => (
                  <th key={r} className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-ash capitalize">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {permissions.map((p) => (
                <tr key={p.action} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-3 text-sm text-ivory">{p.action}</td>
                  {["admin", "manager", "executive", "support", "customer"].map((r) => (
                    <td key={r} className="px-4 py-3 text-center">
                      {p[r as keyof typeof p] ? (
                        <Icon name="check" size={16} className="mx-auto text-emerald-400" />
                      ) : (
                        <Icon name="x" size={16} className="mx-auto text-ash/30" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
