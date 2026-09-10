"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import type { CustomerAssignment, UserProfile } from "@/types/database";

type AssignmentWithDetails = CustomerAssignment & {
  customer: { full_name: string } | null;
  employee: { full_name: string } | null;
  application: { policy: { name: string } | null } | null;
};

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<AssignmentWithDetails[]>([]);
  const [employees, setEmployees] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const supabase = createClient();
    const [assignsRes, empsRes] = await Promise.all([
      supabase
        .from("customer_assignments")
        .select("*, customer:users!customer_assignments_customer_id_fkey(full_name), employee:users!customer_assignments_employee_id_fkey(full_name), application:applications(policy:policies(name))")
        .order("assigned_at", { ascending: false }),
      supabase.from("users").select("*").in("role", ["executive", "support"]).order("full_name"),
    ]);
    setAssignments((assignsRes.data as AssignmentWithDetails[]) || []);
    setEmployees((empsRes.data as UserProfile[]) || []);
    setLoading(false);
  }

  async function handleReassign(assignmentId: string) {
    const supabase = createClient();
    await supabase.from("customer_assignments").update({ employee_id: selectedEmployee }).eq("id", assignmentId);
    setEditingId(null);
    fetchData();
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-iris-gleam border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">Assignments</h1>
        <p className="mt-1 text-sm text-ash">Assign and reassign customers to team members</p>
      </div>

      {assignments.length === 0 ? (
        <div className="card-material rounded-xl p-12 text-center">
          <Icon name="users" size={48} className="mx-auto text-ash/40" />
          <h3 className="mt-4 text-lg font-medium text-ivory">No assignments yet</h3>
          <p className="mt-2 text-sm text-ash">Assignments will appear when applications are submitted</p>
        </div>
      ) : (
        <div className="card-material overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Policy</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-ash">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {assignments.map((a) => (
                  <tr key={a.id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-ivory">{a.customer?.full_name || "Unknown"}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-ash">{a.application?.policy?.name || "—"}</td>
                    <td className="px-6 py-4">
                      {editingId === a.id ? (
                        <div className="flex items-center gap-2">
                          <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} className="rounded-lg border border-white/10 bg-elevated px-2 py-1 text-sm text-ivory focus:border-iris-gleam focus:outline-none">
                            {employees.map((emp) => (
                              <option key={emp.id} value={emp.id}>{emp.full_name}</option>
                            ))}
                          </select>
                          <button onClick={() => handleReassign(a.id)} className="rounded-lg p-1.5 text-emerald-400 hover:bg-emerald-500/10"><Icon name="check" size={16} /></button>
                          <button onClick={() => setEditingId(null)} className="rounded-lg p-1.5 text-ash hover:text-ivory"><Icon name="x" size={16} /></button>
                        </div>
                      ) : (
                        <span className="text-sm text-ivory">{a.employee?.full_name || "Unassigned"}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-ash">{new Date(a.assigned_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      {!editingId && (
                        <button onClick={() => { setEditingId(a.id); setSelectedEmployee(a.employee_id || ""); }} className="rounded-lg p-1.5 text-ash hover:text-ivory">
                          <Icon name="edit" size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
