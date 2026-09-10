"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UserProfile } from "@/types/database";

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) return;

      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (profile) {
        setUser(profile as UserProfile);
        setFullName(profile.full_name || "");
        setPhone(profile.phone || "");
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const supabase = createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (authUser) {
      await supabase
        .from("users")
        .update({ full_name: fullName, phone, updated_at: new Date().toISOString() })
        .eq("id", authUser.id);
    }

    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cobalt border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-ivory">Profile</h1>
        <p className="mt-1 text-sm text-ash">Manage your account information</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="card-material rounded-xl p-6">
          <div className="text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-cobalt to-cobalt/70 text-2xl font-medium text-ivory">
              {fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U"}
            </div>
            <h2 className="mt-4 text-lg font-medium text-ivory">{fullName || "User"}</h2>
            <p className="text-sm text-ash">{user?.email}</p>
            <span className="mt-2 inline-block rounded-full bg-cobalt/10 px-3 py-1 text-xs font-medium text-cobalt capitalize">
              {user?.role || "customer"}
            </span>
          </div>

          <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3 text-sm">
              <Icon name="mail" size={16} className="text-ash" />
              <span className="text-ivory">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Icon name="phone" size={16} className="text-ash" />
              <span className="text-ivory">{phone || "Not provided"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Icon name="calendar" size={16} className="text-ash" />
              <span className="text-ivory">
                Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="card-material rounded-xl p-6">
          <h2 className="text-lg font-medium text-ivory">Edit Profile</h2>
          <form onSubmit={handleSave} className="mt-6 space-y-5">
            {success && (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                Profile updated successfully!
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-ivory">Full Name</Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border-white/10 bg-elevated text-ivory focus:border-cobalt"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-ivory">Email</Label>
              <Input
                value={user?.email || ""}
                disabled
                className="border-white/10 bg-elevated text-ash"
              />
              <p className="text-xs text-ash">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label className="text-ivory">Phone Number</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="border-white/10 bg-elevated text-ivory placeholder:text-ash/60 focus:border-cobalt"
              />
            </div>

            <Button
              type="submit"
              disabled={saving}
              className="rounded-full bg-cobalt text-white hover:bg-cobalt-dark"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
