"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import type { Policy, PolicyCategory, PolicyBenefit, PolicyExclusion, PolicyDocumentRequired, PolicyFaq, PolicyStatus } from "@/types/database";

export default function AdminPolicyEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<PolicyCategory[]>([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    category_id: "",
    provider: "",
    short_description: "",
    full_description: "",
    eligibility_criteria: "",
    coverage_details: "",
    benefits: [] as string[],
    exclusions: [] as string[],
    required_documents: [] as string[],
    premium_range: "",
    status: "draft" as PolicyStatus,
  });
  const [newBenefit, setNewBenefit] = useState("");
  const [newExclusion, setNewExclusion] = useState("");
  const [newDoc, setNewDoc] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      const { data: cats } = await supabase.from("policy_categories").select("*").order("name");
      setCategories(cats || []);

      if (!isNew) {
        const { data: policy } = await supabase.from("policies").select("*").eq("id", id).single();
        if (policy) {
          setForm({
            name: policy.name || "",
            slug: policy.slug || "",
            category_id: policy.category_id || "",
            provider: policy.provider || "",
            short_description: policy.short_description || "",
            full_description: policy.full_description || "",
            eligibility_criteria: policy.eligibility_criteria || "",
            coverage_details: policy.coverage_details || "",
            benefits: policy.benefits || [],
            exclusions: policy.exclusions || [],
            required_documents: policy.required_documents || [],
            premium_range: policy.premium_range || "",
            status: policy.status || "draft",
          });
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [id, isNew]);

  function generateSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function handleNameChange(name: string) {
    setForm((f) => ({ ...f, name, slug: isNew ? generateSlug(name) : f.slug }));
  }

  function addToList(field: "benefits" | "exclusions" | "required_documents", value: string, setter: (v: string) => void) {
    if (!value.trim()) return;
    setForm((f) => ({ ...f, [field]: [...f[field], value.trim()] }));
    setter("");
  }

  function removeFromList(field: "benefits" | "exclusions" | "required_documents", index: number) {
    setForm((f) => ({ ...f, [field]: f[field].filter((_, i) => i !== index) }));
  }

  async function handleSave() {
    if (!form.name || !form.slug || !form.category_id) return;
    setSaving(true);
    const supabase = createClient();

    const payload = {
      name: form.name,
      slug: form.slug,
      category_id: form.category_id,
      provider: form.provider,
      short_description: form.short_description,
      full_description: form.full_description,
      eligibility_criteria: form.eligibility_criteria,
      coverage_details: form.coverage_details,
      benefits: form.benefits,
      exclusions: form.exclusions,
      required_documents: form.required_documents,
      premium_range: form.premium_range,
      status: form.status,
      updated_at: new Date().toISOString(),
    };

    if (isNew) {
      const { error } = await supabase.from("policies").insert(payload);
      if (!error) router.push("/dashboard-admin/policies");
    } else {
      const { error } = await supabase.from("policies").update(payload).eq("id", id);
      if (!error) router.push("/dashboard-admin/policies");
    }
    setSaving(false);
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
          <div className="flex items-center gap-2 text-sm text-ash">
            <Link href="/dashboard-admin/policies" className="hover:text-cobalt">Policies</Link>
            <Icon name="chevron-right" size={14} />
            <span className="text-ivory">{isNew ? "New Policy" : "Edit Policy"}</span>
          </div>
          <h1 className="mt-2 text-2xl font-medium text-ivory">{isNew ? "Create New Policy" : "Edit Policy"}</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard-admin/policies" className="rounded-full border border-white/10 px-4 py-2.5 text-sm font-medium text-ash hover:text-ivory">Cancel</Link>
          <button onClick={handleSave} disabled={saving} className="rounded-full bg-cobalt px-4 py-2.5 text-sm font-medium text-white hover:bg-cobalt-dark disabled:opacity-50">
            {saving ? "Saving..." : isNew ? "Create Policy" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="card-material rounded-xl p-6">
            <h2 className="text-lg font-medium text-ivory">Basic Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-ash">Policy Name *</label>
                <input value={form.name} onChange={(e) => handleNameChange(e.target.value)} className="rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none" placeholder="e.g. Comprehensive Car Insurance" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-ash">Slug *</label>
                <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none" placeholder="e.g. comprehensive-car-insurance" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-ash">Category *</label>
                <select value={form.category_id} onChange={(e) => setForm((f) => ({ ...f, category_id: e.target.value }))} className="rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory focus:border-cobalt focus:outline-none">
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-ash">Status</label>
                <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as PolicyStatus }))} className="rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory focus:border-cobalt focus:outline-none">
                  <option value="draft">Draft</option>
                  <option value="under_review">Under Review</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-medium text-ash">Provider</label>
                <input value={form.provider} onChange={(e) => setForm((f) => ({ ...f, provider: e.target.value }))} className="rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none" placeholder="e.g. ICICI Lombard, HDFC ERGO" />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-medium text-ash">Short Description</label>
                <input value={form.short_description} onChange={(e) => setForm((f) => ({ ...f, short_description: e.target.value }))} className="rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none" placeholder="One-line description for listings" />
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="card-material rounded-xl p-6">
            <h2 className="text-lg font-medium text-ivory">Full Description</h2>
            <textarea value={form.full_description} onChange={(e) => setForm((f) => ({ ...f, full_description: e.target.value }))} rows={6} className="mt-4 w-full rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none" placeholder="Detailed policy description..." />
          </div>

          {/* Benefits */}
          <div className="card-material rounded-xl p-6">
            <h2 className="text-lg font-medium text-ivory">Benefits</h2>
            <div className="mt-4 flex gap-2">
              <input value={newBenefit} onChange={(e) => setNewBenefit(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addToList("benefits", newBenefit, setNewBenefit))} className="flex-1 rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none" placeholder="Add a benefit" />
              <button onClick={() => addToList("benefits", newBenefit, setNewBenefit)} className="rounded-lg bg-cobalt px-3 py-2 text-sm text-white hover:bg-cobalt-dark"><Icon name="plus" size={16} /></button>
            </div>
            <ul className="mt-3 space-y-2">
              {form.benefits.map((b, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory">
                  <span>{b}</span>
                  <button onClick={() => removeFromList("benefits", i)} className="text-ash hover:text-red-400"><Icon name="trash" size={14} /></button>
                </li>
              ))}
            </ul>
          </div>

          {/* Coverage & Eligibility */}
          <div className="card-material rounded-xl p-6">
            <h2 className="text-lg font-medium text-ivory">Coverage Details</h2>
            <textarea value={form.coverage_details} onChange={(e) => setForm((f) => ({ ...f, coverage_details: e.target.value }))} rows={4} className="mt-4 w-full rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none" placeholder="What does this policy cover?" />
            <h2 className="mt-6 text-lg font-medium text-ivory">Eligibility Criteria</h2>
            <textarea value={form.eligibility_criteria} onChange={(e) => setForm((f) => ({ ...f, eligibility_criteria: e.target.value }))} rows={4} className="mt-4 w-full rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none" placeholder="Who is eligible for this policy?" />
          </div>

          {/* Exclusions */}
          <div className="card-material rounded-xl p-6">
            <h2 className="text-lg font-medium text-ivory">Exclusions</h2>
            <div className="mt-4 flex gap-2">
              <input value={newExclusion} onChange={(e) => setNewExclusion(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addToList("exclusions", newExclusion, setNewExclusion))} className="flex-1 rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none" placeholder="Add an exclusion" />
              <button onClick={() => addToList("exclusions", newExclusion, setNewExclusion)} className="rounded-lg bg-cobalt px-3 py-2 text-sm text-white hover:bg-cobalt-dark"><Icon name="plus" size={16} /></button>
            </div>
            <ul className="mt-3 space-y-2">
              {form.exclusions.map((ex, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory">
                  <span>{ex}</span>
                  <button onClick={() => removeFromList("exclusions", i)} className="text-ash hover:text-red-400"><Icon name="trash" size={14} /></button>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents */}
          <div className="card-material rounded-xl p-6">
            <h2 className="text-lg font-medium text-ivory">Required Documents</h2>
            <div className="mt-4 flex gap-2">
              <input value={newDoc} onChange={(e) => setNewDoc(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addToList("required_documents", newDoc, setNewDoc))} className="flex-1 rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory placeholder:text-ash/60 focus:border-cobalt focus:outline-none" placeholder="Add a required document" />
              <button onClick={() => addToList("required_documents", newDoc, setNewDoc)} className="rounded-lg bg-cobalt px-3 py-2 text-sm text-white hover:bg-cobalt-dark"><Icon name="plus" size={16} /></button>
            </div>
            <ul className="mt-3 space-y-2">
              {form.required_documents.map((doc, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-ivory">
                  <span>{doc}</span>
                  <button onClick={() => removeFromList("required_documents", i)} className="text-ash hover:text-red-400"><Icon name="trash" size={14} /></button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="card-material rounded-xl p-6">
            <h3 className="font-medium text-ivory">Preview</h3>
            <p className="mt-2 text-sm text-ash">
              {form.name ? `/${form.category_id ? categories.find(c => c.id === form.category_id)?.slug || "..." : "..."}/${form.slug || "..."}` : "/policies/..."}
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ash">Status</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${form.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                  {form.status.replace(/_/g, " ")}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ash">Benefits</span>
                <span className="text-ivory">{form.benefits.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ash">Exclusions</span>
                <span className="text-ivory">{form.exclusions.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ash">Documents</span>
                <span className="text-ivory">{form.required_documents.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
