"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";

const assignments = [
  { id: "1", customer: "Rahul Kumar", employee: "Priya Sinha", policy: "Car Comprehensive", assignedDate: "01 Sep 2026", status: "active" },
  { id: "2", customer: "Sunita Devi", employee: "Amit Kumar", policy: "Family Floater", assignedDate: "03 Sep 2026", status: "active" },
  { id: "3", customer: "Amit Singh", employee: "Neha Rawat", policy: "Term Life", assignedDate: "05 Sep 2026", status: "active" },
  { id: "4", customer: "Priya Gupta", employee: "Rahul Verma", policy: "Car Insurance", assignedDate: "28 Aug 2026", status: "pending" },
  { id: "5", customer: "Vikram Prasad", employee: "Priya Sinha", policy: "Health Insurance", assignedDate: "25 Aug 2026", status: "active" },
  { id: "6", customer: "Neha Kumari", employee: "Amit Kumar", policy: "Bike Insurance", assignedDate: "06 Sep 2026", status: "pending" },
];

const employees = ["Priya Sinha", "Amit Kumar", "Neha Rawat", "Rahul Verma"];

export default function AssignmentsPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">Assignments</h1>
        <p className="mt-1 text-sm text-ash">Assign and reassign customers to team members</p>
      </div>

      <div className="card-material overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Policy</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-ash">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {assignments.map((a) => (
                <tr key={a.id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-ivory">{a.customer}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-ash">{a.policy}</td>
                  <td className="px-6 py-4">
                    {editingId === a.id ? (
                      <select
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                        className="rounded-lg border border-white/10 bg-elevated px-2 py-1 text-sm text-ivory focus:border-cobalt focus:outline-none"
                      >
                        {employees.map((emp) => (
                          <option key={emp} value={emp}>{emp}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-sm text-ivory">{a.employee}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-ash">{a.assignedDate}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      a.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {editingId === a.id ? (
                        <>
                          <button onClick={() => setEditingId(null)} className="rounded-lg p-1.5 text-emerald-400 hover:bg-emerald-500/10">
                            <Icon name="check" size={16} />
                          </button>
                          <button onClick={() => setEditingId(null)} className="rounded-lg p-1.5 text-ash hover:text-ivory">
                            <Icon name="x" size={16} />
                          </button>
                        </>
                      ) : (
                        <button onClick={() => { setEditingId(a.id); setSelectedEmployee(a.employee); }} className="rounded-lg p-1.5 text-ash hover:text-ivory">
                          <Icon name="edit" size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
