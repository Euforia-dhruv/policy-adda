"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/types/database";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const adminLinks = [
  { href: "/dashboard-admin", label: "Overview", icon: "dashboard" },
  { href: "/dashboard-admin/users", label: "Users", icon: "users" },
  { href: "/dashboard-admin/employees", label: "Employees", icon: "user-check" },
  { href: "/dashboard-admin/roles", label: "Roles", icon: "shield" },
  { href: "/dashboard-admin/policies", label: "Policies", icon: "file-text" },
  { href: "/dashboard-admin/categories", label: "Categories", icon: "folder" },
  { href: "/dashboard-admin/applications", label: "Applications", icon: "clipboard-list" },
  { href: "/dashboard-admin/support", label: "Support", icon: "message-square" },
  { href: "/dashboard-admin/settings", label: "Settings", icon: "settings" },
];

function AdminSidebar({ user, pathname }: { user: UserProfile | null; pathname: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <>
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
        <Icon name="shield" size={24} className="text-cobalt" />
        <span className="text-lg font-medium text-ivory">Policy Adda</span>
        <span className="ml-2 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-400">
          Admin
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? "bg-cobalt/10 text-cobalt" : "text-ash hover:bg-elevated hover:text-ivory"
              }`}
            >
              <Icon name={link.icon} size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-sm font-medium text-ivory">
            {user?.full_name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ivory truncate">{user?.full_name}</p>
            <p className="text-xs text-ash truncate">{user?.email}</p>
          </div>
        </div>
        <Button onClick={handleLogout} variant="ghost" className="mt-3 w-full justify-start gap-2 text-ash hover:text-ivory">
          <Icon name="log-out" size={18} />
          Sign out
        </Button>
      </div>
    </>
  );
}

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        router.push("/auth/login");
        return;
      }
      const { data: profile } = await supabase.from("users").select("*").eq("id", authUser.id).single();
      if (profile && profile.role !== "admin") {
        router.push("/dashboard");
        return;
      }
      setUser(profile as UserProfile);
      setLoading(false);
    };
    getUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cobalt border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-canvas">
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-white/10 lg:bg-surface">
        <AdminSidebar user={user} pathname={pathname} />
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-surface px-4 lg:hidden">
          <Sheet>
            <SheetTrigger render={<button className="text-ivory" />}>
              <Icon name="menu" size={24} />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-surface p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <AdminSidebar user={user} pathname={pathname} />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <Icon name="shield" size={20} className="text-cobalt" />
            <span className="font-medium text-ivory">Admin</span>
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-xs font-medium text-ivory">
            {user?.full_name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "A"}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
