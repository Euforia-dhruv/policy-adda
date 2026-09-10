"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import type { PolicyCategory } from "@/types/database";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<(PolicyCategory & { policy_count?: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formIcon, setFormIcon] = useState("shield");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const supabase = createClient();
    const { data } = await supabase
      .from("policy_categories")
      .select("*")
      .order("name");

    if (data) {
      const withCounts = await Promise.all(
        data.map(async (cat) => {
          const { count } = await supabase
            .from("policies")
            .select("*", { count: "exact", head: true })
            .eq("category_id", cat.id);
          return { ...cat, policy_count: count || 0 };
        })
      );
      setCategories(withCounts);
    }
    setLoading(false);
  }

  async function handleSave() {
    if (!formName || !formSlug) return;
    const supabase = createClient();

    if (editId) {
      const { error } = await supabase
        .from("policy_categories")
        .update({ name: formName, slug: formSlug, description: formDescription, icon: formIcon, updated_at: new Date().toISOString() })
        .eq("id", editId);
      if (!error) fetchCategories();
    } else {
      const { error } = await supabase
        .from("policy_categories")
        .insert({ name: formName, slug: formSlug, description: formDescription, icon: formIcon });
      if (!error) fetchCategories();
    }

    setShowForm(false);
    setEditId(null);
    setFormName("");
    setFormSlug("");
    setFormDescription("");
    setFormIcon("shield");
  }

  function handleEdit(cat: PolicyCategory) {
    setEditId(cat.id);
    setFormName(cat.name);
    setFormSlug(cat.slug);
    setFormDescription(cat.description);
    setFormIcon(cat.icon);
    setShowForm(true);
  }

  async function handleToggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const supabase = createClient();
    await supabase.from("policy_categories").update({ status: newStatus, updated_at: new Date().toISOString() }).eq("id", id);
    fetchCategories();
  }

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
          <h1 className="text-2xl font-medium text-ivory">Categories</h1>
          <p className="mt-1 text-sm text-ash">Manage policy categories</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setFormName(""); setFormSlug(""); setFormDescription(""); setFormIcon("shield"); }}
          className="inline-flex items-center gap-2 rounded-full bg-cobalt px-4 py-2.5 text-sm font-medium text-white hover:bg-cobalt-dark"
        >
          <Icon name="plus" size={16} />
          Add Category
        </button>
      </div>

      {showForm && (
        <div className="card-material rounded-xl p-6">
          <h3 className="text-lg font-medium text-ivory">{editId ? "Edit Category" : "New Category"}</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-ash">Name</label>
              <input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none"
                placeholder="e.g. Motor Insurance"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-ash">Slug</label>
              <input
                value={formSlug}
                onChange={(e) => setFormSlug(e.target.value)}
                className="rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none"
                placeholder="e.g. motor"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-ash">Icon</label>
              <input
                value={formIcon}
                onChange={(e) => setFormIcon(e.target.value)}
                className="rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none"
                placeholder="e.g. shield"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-ash">Description</label>
              <input
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none"
                placeholder="Short description"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleSave}
              className="rounded-full bg-cobalt px-4 py-2 text-sm font-medium text-white hover:bg-cobalt-dark"
            >
              {editId ? "Update" : "Create"}
            </button>
            <button
              onClick={() => { setShowForm(false); setEditId(null); }}
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-ash hover:text-ivory"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <div key={cat.id} className="card-material rounded-xl p-6">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-cobalt/10 text-cobalt">
                <Icon name={cat.icon || "folder"} size={20} />
              </span>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(cat)} className="rounded-lg p-1.5 text-ash hover:text-ivory">
                  <Icon name="edit" size={16} />
                </button>
                <button
                  onClick={() => handleToggleStatus(cat.id, cat.status)}
                  className="rounded-lg p-1.5 text-ash hover:text-ivory"
                >
                  <Icon name={cat.status === "active" ? "eye-off" : "eye"} size={16} />
                </button>
              </div>
            </div>
            <h3 className="mt-4 font-medium text-ivory">{cat.name}</h3>
            <p className="mt-1 text-sm text-ash">{cat.description}</p>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-xs text-ash">{cat.policy_count} policies</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                cat.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-ash/10 text-ash"
              }`}>
                {cat.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
