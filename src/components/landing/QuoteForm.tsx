"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { branches } from "@/data/branches";
import { createClient } from "@/lib/supabase/client";
import type { Policy } from "@/types/database";

type FormStatus = "idle" | "submitting" | "success" | "error";

const branchOptions = branches.map((b) => ({
  value: b.id,
  label: `${b.city}${b.hq ? " (HQ)" : ""}`,
}));

export function QuoteForm({ className }: { className?: string }) {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [product, setProduct] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    const fetchPolicies = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("policies")
        .select("id, name")
        .eq("status", "active")
        .order("name");
      setPolicies((data as Policy[]) || []);
    };
    fetchPolicies();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, name, mobile, branch }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setName("");
      setMobile("");
      setProduct("");
      setBranch("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={cn("rounded-2xl border border-white/10 bg-elevated/90 p-6 backdrop-blur-xl", className)}>
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cobalt/15 text-cobalt">
            <Icon name="check-circle" size={24} />
          </span>
          <h3 className="text-lg font-semibold text-ivory">Request received!</h3>
          <p className="text-sm leading-relaxed text-ash">
            An advisor will call you within 30 minutes during working hours. You can also
            WhatsApp us anytime.
          </p>
          <Button type="button" variant="outline" className="mt-2" onClick={() => setStatus("idle")}>
            Send another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("rounded-2xl border border-white/10 bg-elevated/90 p-6 backdrop-blur-xl", className)}>
      <div className="mb-5 text-center">
        <p className="eyebrow justify-center">Free quote</p>
        <h3 className="mt-2 text-xl font-semibold text-ivory">Get a quote in 60 seconds</h3>
        <p className="mt-1 text-sm text-ash">Compare 12+ insurers. No spam, no obligation.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="product">Insurance type</Label>
          <Select value={product} onValueChange={(v) => setProduct(v ?? "")}>
            <SelectTrigger id="product" className="w-full">
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              {policies.length === 0 ? (
                <SelectItem value="general" disabled>Loading policies...</SelectItem>
              ) : (
                policies.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rakesh Kumar" required autoComplete="name" />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="mobile">Mobile number</Label>
          <Input id="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/[^\d]/g, ""))} placeholder="10-digit mobile number" required minLength={10} maxLength={10} autoComplete="tel" />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="branch">Nearest branch</Label>
          <Select value={branch} onValueChange={(v) => setBranch(v ?? "")}>
            <SelectTrigger id="branch" className="w-full">
              <SelectValue placeholder="Select your branch" />
            </SelectTrigger>
            <SelectContent>
              {branchOptions.map((b) => (
                <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {status === "error" && (
          <p className="flex items-center gap-2 text-sm text-red-400">
            <Icon name="alert-circle" size={16} />
            Something went wrong. Please try again or call us directly.
          </p>
        )}

        <Button type="submit" size="lg" disabled={status === "submitting"} className="mt-1 h-11 w-full rounded-full bg-cobalt text-white hover:bg-cobalt-dark">
          {status === "submitting" ? "Sending..." : (
            <>
              <Icon name="spark" size={16} />
              Get My Free Quote
            </>
          )}
        </Button>

        <p className="text-center text-xs leading-relaxed text-ash/80">
          By submitting, you agree to be contacted by a Policy Adda advisor. We respect your
          privacy — no spam, ever.
        </p>
      </div>
    </form>
  );
}
