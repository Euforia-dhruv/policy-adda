"use client";

import { useTheme } from "@/lib/theme-provider";
import { Icon } from "@/components/icons";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-elevated text-ash transition-all hover:bg-white/10 hover:text-ivory"
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
    </button>
  );
}
