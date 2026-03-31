"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  User,
  MessageSquare,
  Search,
  Compass,
  Rss,
  LayoutDashboard,
  CalendarDays,
  LogOut,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { getInitials, cn } from "@/lib/utils";
import { mockUsers } from "@/lib/mock-data/users";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Fil", href: "/fil", icon: Rss },
  { label: "Explorer", href: "/explorer", icon: Compass },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Recherche", href: "/recherche", icon: Search },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, switchUser } = useApp();
  const [sheetOpen, setSheetOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-border/40">
      <nav className="flex items-center justify-between h-16 px-6 max-w-7xl mx-auto">
        {/* Left: Logo — editorial masthead */}
        <Link
          href="/"
          className="font-heading text-hc-blue font-bold text-xl italic shrink-0"
        >
          HandiConnect
        </Link>

        {/* Center: Desktop nav links — editorial uppercase tracking */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors",
                isActive(link.href)
                  ? "text-hc-blue"
                  : "text-hc-text-muted hover:text-hc-blue"
              )}
            >
              <link.icon className="size-4" />
              {link.label}
              {/* Active dot indicator */}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-hc-blue" />
              )}
            </Link>
          ))}
        </div>

        {/* Right: Desktop user menu */}
        <div className="hidden md:flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring group"
            >
              <Avatar size="default" className="w-9 h-9 transition-all group-hover:ring-2 group-hover:ring-hc-sage/30">
                {currentUser.avatar ? (
                  <AvatarImage
                    src={currentUser.avatar}
                    alt={currentUser.name}
                  />
                ) : null}
                <AvatarFallback>
                  {getInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" sideOffset={8} className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium text-hc-text">{currentUser.name}</p>
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
                    user.id === currentUser.id && "bg-hc-blue/5"
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

        {/* Right: Mobile hamburger */}
        <div className="flex md:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Ouvrir le menu" />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent side="right" showCloseButton={false}>
              <SheetHeader className="border-b border-border/40 pb-4">
                <div className="flex items-center justify-between">
                  <SheetTitle>
                    <Link
                      href="/"
                      className="font-heading text-hc-blue font-bold text-xl italic"
                      onClick={() => setSheetOpen(false)}
                    >
                      HandiConnect
                    </Link>
                  </SheetTitle>
                  <SheetClose
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Fermer le menu"
                      />
                    }
                  >
                    <X className="size-4" />
                  </SheetClose>
                </div>
              </SheetHeader>

              {/* Mobile nav links */}
              <div className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSheetOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium uppercase tracking-wider transition-colors",
                      isActive(link.href)
                        ? "text-hc-blue bg-hc-blue/5"
                        : "text-hc-text-muted hover:text-hc-blue hover:bg-muted"
                    )}
                  >
                    <link.icon className="size-5" />
                    {link.label}
                  </Link>
                ))}
              </div>

              <Separator className="bg-border/40" />

              {/* Mobile user section */}
              <div className="flex flex-col gap-1 px-4 py-4">
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                  <Avatar size="default" className="w-9 h-9">
                    {currentUser.avatar ? (
                      <AvatarImage
                        src={currentUser.avatar}
                        alt={currentUser.name}
                      />
                    ) : null}
                    <AvatarFallback>
                      {getInitials(currentUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-hc-text">
                      {currentUser.name}
                    </span>
                    <span className="text-xs text-hc-text-muted">
                      {currentUser.email}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/profil/${currentUser.id}`}
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-hc-text-muted hover:text-hc-blue hover:bg-muted transition-colors"
                >
                  <User className="size-5" />
                  Mon profil
                </Link>

                <Link
                  href="/mes-reservations"
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-hc-text-muted hover:text-hc-blue hover:bg-muted transition-colors"
                >
                  <CalendarDays className="size-5" />
                  Mes reservations
                </Link>

                {currentUser.role === "BUSINESS" && (
                  <Link
                    href="/tableau-de-bord"
                    onClick={() => setSheetOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-hc-text-muted hover:text-hc-blue hover:bg-muted transition-colors"
                  >
                    <LayoutDashboard className="size-5" />
                    Tableau de bord
                  </Link>
                )}
              </div>

              <Separator className="bg-border/40" />

              {/* Mobile profile switcher */}
              <div className="flex flex-col gap-1 px-4 py-4">
                <p className="px-3 text-xs font-medium text-hc-text-muted uppercase tracking-wider mb-1">
                  Changer de profil
                </p>
                {mockUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      switchUser(user.id);
                      setSheetOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left hover:bg-muted w-full transition-colors",
                      user.id === currentUser.id && "bg-hc-blue/5"
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
                  </button>
                ))}
              </div>

              <Separator className="bg-border/40" />

              {/* Mobile logout */}
              <div className="px-4 py-4">
                <Link
                  href="/connexion"
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="size-5" />
                  Se deconnecter
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
