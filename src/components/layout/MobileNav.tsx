"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Plus, MessageSquare, User, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/components/providers/AppProvider";

interface TabItem {
  label: string;
  href: string;
  icon: typeof Home;
  isCenter: boolean;
}

const familyTabs: TabItem[] = [
  { label: "Fil", href: "/fil", icon: Home, isCenter: false },
  { label: "Explorer", href: "/explorer", icon: Compass, isCenter: false },
  { label: "Creer", href: "/fil#create", icon: Plus, isCenter: true },
  { label: "Messages", href: "/messages", icon: MessageSquare, isCenter: false },
  { label: "Profil", href: "/profil", icon: User, isCenter: false },
];

const businessTabs: TabItem[] = [
  { label: "Fil", href: "/fil", icon: Home, isCenter: false },
  { label: "Dashboard", href: "/tableau-de-bord", icon: LayoutDashboard, isCenter: false },
  { label: "Creer", href: "/fil#create", icon: Plus, isCenter: true },
  { label: "Messages", href: "/messages", icon: MessageSquare, isCenter: false },
  { label: "Profil", href: "/profil", icon: User, isCenter: false },
];

export function MobileNav() {
  const pathname = usePathname();
  const { currentUser } = useApp();

  const tabs = currentUser.role === "BUSINESS" ? businessTabs : familyTabs;

  // Make Profil href dynamic
  const resolvedTabs = tabs.map((tab) =>
    tab.label === "Profil" ? { ...tab, href: `/profil/${currentUser.id}` } : tab
  );

  const isActive = (href: string) => {
    if (href.startsWith("/profil/")) return pathname.startsWith("/profil");
    if (href === "/fil#create") return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="bottom-nav md:hidden" aria-label="Navigation mobile">
      <div className="flex items-center justify-around px-2 pt-2 pb-1">
        {resolvedTabs.map((tab) => {
          if (tab.isCenter) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center gap-0.5 -mt-3"
                aria-label={tab.label}
              >
                <div className="w-10 h-10 rounded-full gradient-warm flex items-center justify-center shadow-md">
                  <Plus className="size-5 text-white" />
                </div>
                <span className="text-[10px] font-medium text-hc-text-muted">
                  {tab.label}
                </span>
              </Link>
            );
          }

          const active = isActive(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-1 px-3 transition-colors",
                active ? "text-hc-text" : "text-hc-text-muted"
              )}
            >
              <tab.icon className="size-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
