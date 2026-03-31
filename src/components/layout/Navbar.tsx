"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  MessageSquare,
  Search,
  User,
  CalendarDays,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { getInitials, cn } from "@/lib/utils";
import { mockUsers } from "@/lib/mock-data/users";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const familyNavLinks = [
  { label: "Fil", href: "/fil", icon: Home },
  { label: "Explorer", href: "/explorer", icon: Compass },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Recherche", href: "/recherche", icon: Search },
] as const;

const businessNavLinks = [
  { label: "Fil", href: "/fil", icon: Home },
  { label: "Dashboard", href: "/tableau-de-bord", icon: LayoutDashboard },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Recherche", href: "/recherche", icon: Search },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { currentUser, switchUser } = useApp();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-hc-border h-14">
      <nav className="flex items-center justify-between h-full px-4 max-w-5xl mx-auto">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <span className="font-extrabold text-lg text-hc-text">Handi</span>
          <span className="font-extrabold text-lg text-gradient-warm">Connect</span>
        </Link>

        {/* Center: Desktop nav — icon + label columns like Instagram web */}
        <div className="hidden md:flex items-center gap-8">
          {(currentUser.role === "BUSINESS" ? businessNavLinks : familyNavLinks).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-0.5 transition-colors",
                isActive(link.href)
                  ? "text-hc-coral"
                  : "text-hc-text-muted hover:text-hc-text"
              )}
            >
              <link.icon className="size-5" />
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Right: Avatar with dropdown (desktop) / Avatar only (mobile) */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full">
              <div className="avatar-ring">
                <Avatar size="default" className="w-8 h-8">
                  {currentUser.avatar ? (
                    <AvatarImage
                      src={currentUser.avatar}
                      alt={currentUser.name}
                    />
                  ) : null}
                  <AvatarFallback className="text-xs">
                    {getInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" sideOffset={8} className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold text-hc-text">{currentUser.name}</p>
                  <p className="text-xs text-hc-text-muted">
                    {currentUser.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                render={<Link href={`/profil/${currentUser.id}`} />}
              >
                <User className="size-4" />
                Mon profil
              </DropdownMenuItem>

              <DropdownMenuItem
                render={<Link href="/mes-reservations" />}
              >
                <CalendarDays className="size-4" />
                Mes reservations
              </DropdownMenuItem>

              {currentUser.role === "BUSINESS" && (
                <DropdownMenuItem
                  render={<Link href="/tableau-de-bord" />}
                >
                  <LayoutDashboard className="size-4" />
                  Tableau de bord
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              <DropdownMenuLabel className="text-xs text-hc-text-muted">Changer de profil</DropdownMenuLabel>
              {mockUsers.map((user) => (
                <DropdownMenuItem
                  key={user.id}
                  onSelect={() => switchUser(user.id)}
                  className={cn(
                    user.id === currentUser.id && "bg-hc-coral/5"
                  )}
                >
                  <Avatar size="sm">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : null}
                    <AvatarFallback>
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">{user.name}</span>
                  <span className="ml-auto text-xs text-hc-text-muted">
                    {user.role === "BUSINESS" ? "Pro" : "Famille"}
                  </span>
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuItem
                render={<Link href="/connexion" />}
                variant="destructive"
              >
                <LogOut className="size-4" />
                Se deconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
