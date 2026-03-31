"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/components/providers/AppProvider";
import { cn } from "@/lib/utils";
import { BarChart3, Ticket, CalendarDays, Star } from "lucide-react";

const navItems = [
  { label: "Apercu", href: "/tableau-de-bord", icon: BarChart3 },
  { label: "Activites", href: "/tableau-de-bord/activites", icon: Ticket },
  { label: "Reservations", href: "/tableau-de-bord/reservations", icon: CalendarDays },
  { label: "Avis", href: "/tableau-de-bord/avis", icon: Star },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (currentUser.role !== "BUSINESS") {
      router.push("/fil");
    }
  }, [currentUser.role, router]);

  if (currentUser.role !== "BUSINESS") {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Mobile: horizontal nav */}
      <nav
        className="flex gap-1 overflow-x-auto rounded-xl border bg-card p-1.5 ring-1 ring-foreground/10 lg:hidden"
        aria-label="Navigation tableau de bord"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-hc-blue text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="size-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Desktop: left sidebar */}
      <nav
        className="hidden w-56 shrink-0 lg:block"
        aria-label="Navigation tableau de bord"
      >
        <div className="sticky top-24 rounded-xl border bg-card p-2 ring-1 ring-foreground/10">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-hc-blue text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <item.icon className="size-4" aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
