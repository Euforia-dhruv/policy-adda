"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import type { Policy, PolicyCategory, PolicyStatus } from "@/types/database";

const statusColors: Record<PolicyStatus, string> = {
  active: "bg-emerald-500/10 text-emerald-400",
  draft: "bg-amber-500/10 text-amber-400",
  inactive: "bg-ash/10 text-ash",
  under_review: "bg-blue-500/10 text-blue-400",
  archived: "bg-red-500/10 text-red-400",
};

type PolicyWithCategory = Policy & { category: PolicyCategory | null };

export default function AdminPoliciesPage() {
  const [policies, setPolicies] = useState<PolicyWithCategory[]>([]);
  const [categories, setCategories] = useState<PolicyCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const supabase = createClient();

    const [policiesRes, categoriesRes] = await Promise.all([
      supabase
        .from("policies")
        .select("*, category:policy_categories(*)")
        .order("created_at", { ascending: false }),
      supabase
        .from("policy_categories")
        .select("*")
        .order("name"),
    ]);

    setPolicies((policiesRes.data as PolicyWithCategory[]) || []);
    setCategories(categoriesRes.data || []);
    setLoading(false);
  }

  async function handleStatusChange(id: string, newStatus: PolicyStatus) {
    const supabase = createClient();
    const { error } = await supabase
      .from("policies")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (!error) {
      setPolicies((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this policy?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("policies").delete().eq("id", id);
    if (!error) {
      setPolicies((prev) => prev.filter((p) => p.id !== id));
    }
  }

  const filtered = policies.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.provider.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !filterCategory || p.category_id === filterCategory;
    const matchesStatus = !filterStatus || p.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cobalt border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-ivory">Policies</h1>
          <p className="mt-1 text-sm text-ash">Manage the policy catalog</p>
        </div>
        <Link
          href="/dashboard-admin/policies/new"
          className="inline-flex items-center gap-2 rounded-full bg-cobalt px-4 py-2.5 text-sm font-medium text-white hover:bg-cobalt-dark"
        >
          <Icon name="plus" size={16} />
          Add Policy
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ash" />
          <input
            type="text"
            placeholder="Search policies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-elevated py-2.5 pl-10 pr-4 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-full border border-white/10 bg-elevated px-4 py-2.5 text-sm text-ivory focus:border-cobalt focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-full border border-white/10 bg-elevated px-4 py-2.5 text-sm text-ivory focus:border-cobalt focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="under_review">Under Review</option>
          <option value="inactive">Inactive</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="card-material overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Policy</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Provider</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-ash">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-ash">
                    No policies found
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-ivory">{p.name}</p>
                        <p className="text-xs text-ash truncate max-w-[200px]">{p.slug}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-cobalt/10 px-2.5 py-0.5 text-xs font-medium text-cobalt">
                        {p.category?.name || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-ash">{p.provider}</td>
                    <td className="px-6 py-4">
                      <select
                        value={p.status}
                        onChange={(e) => handleStatusChange(p.id, e.target.value as PolicyStatus)}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[p.status]} border-0 bg-transparent focus:outline-none cursor-pointer`}
                      >
                        <option value="draft">Draft</option>
                        <option value="under_review">Under Review</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard-admin/policies/${p.id}`}
                          className="rounded-lg p-1.5 text-ash hover:text-ivory"
                        >
                          <Icon name="edit" size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="rounded-lg p-1.5 text-ash hover:text-red-400"
                        >
                          <Icon name="trash" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
