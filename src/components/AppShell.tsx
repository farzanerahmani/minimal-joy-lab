import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, Stethoscope, FilePlus2, MessageSquare,
  Bell, BarChart3, Wallet, Settings, PawPrint, Search, LogOut, Plus, Menu, X
} from "lucide-react";
import { useState, type ReactNode } from "react";

const NAV = [
  { to: "/app/dashboard", label: "داشبورد", icon: LayoutDashboard },
  { to: "/app/patients", label: "بیماران", icon: PawPrint },
  { to: "/app/visits", label: "ویزیت‌ها", icon: Stethoscope },
  { to: "/app/prescriptions", label: "نسخه‌ها", icon: FilePlus2 },
  { to: "/app/reminders", label: "یادآور واکسن", icon: Bell },
  { to: "/app/sms", label: "پیامک", icon: MessageSquare },
  { to: "/app/reports", label: "گزارش‌ها", icon: BarChart3 },
  { to: "/app/pricing", label: "تعرفه خدمات", icon: Wallet },
  { to: "/app/users", label: "کاربران و دسترسی", icon: Users },
  { to: "/app/settings", label: "تنظیمات", icon: Settings },
];

export function AppShell({ children, title, subtitle, action }: {
  children: ReactNode; title: string; subtitle?: string; action?: ReactNode;
}) {
  const loc = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const SidebarBody = (
    <>
      <div className="p-5 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm shadow-primary/20">
          <PawPrint className="h-5 w-5" />
        </div>
        <div>
          <div className="font-bold leading-tight">پت‌کر</div>
          <div className="text-[11px] text-muted-foreground">کلینیک دامپزشکی پارسا</div>
        </div>
      </div>
      <nav className="px-3 py-2 space-y-0.5 flex-1 overflow-y-auto">
        {NAV.map((n) => {
          const Icon = n.icon;
          const active = loc.pathname === n.to || loc.pathname.startsWith(n.to + "/");
          return (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setMobileOpen(false)}
              aria-current={active ? "page" : undefined}
              className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              {active && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-l-full bg-primary-foreground/80" />
              )}
              <Icon className="h-4.5 w-4.5" />
              <span className="font-medium">{n.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="m-3 rounded-2xl bg-card border p-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary-soft text-primary flex items-center justify-center font-bold">ا.ا</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">دکتر احمدی</div>
            <div className="text-[11px] text-muted-foreground">دامپزشک</div>
          </div>
          <Link to="/" className="text-muted-foreground hover:text-destructive" aria-label="خروج">
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
  return (
    <div className="min-h-screen flex">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-l border-sidebar-border bg-sidebar/80 backdrop-blur sticky top-0 h-screen">
        {SidebarBody}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-72 bg-sidebar flex flex-col shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-3 left-3 h-8 w-8 rounded-lg hover:bg-sidebar-accent flex items-center justify-center"
              aria-label="بستن"
            >
              <X className="h-4 w-4" />
            </button>
            {SidebarBody}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-background/70 backdrop-blur border-b border-border">
          <div className="flex items-center gap-3 px-5 sm:px-8 py-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden h-9 w-9 rounded-lg border border-border bg-card hover:bg-accent flex items-center justify-center"
              aria-label="منو"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold truncate">{title}</h1>
              {subtitle && <p className="text-xs text-muted-foreground mt-0.5 truncate">{subtitle}</p>}
            </div>
            <div className="flex-1 max-w-md mx-auto hidden md:block">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="جستجوی بیمار، نسخه یا صاحب…"
                  className="w-full rounded-full border border-input bg-card pr-9 pl-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {action}
              <button className="relative h-9 w-9 rounded-full border border-border bg-card hover:bg-accent flex items-center justify-center">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 left-1.5 h-2 w-2 rounded-full bg-destructive" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}

export function PrimaryButton({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition shadow-sm shadow-primary/20"
    >
      <Plus className="h-4 w-4" />
      {children}
    </button>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card ${className}`}>{children}</div>
  );
}

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "success" | "warning" | "info" | "destructive" }) {
  const map = {
    default: "bg-secondary text-secondary-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning",
    info: "bg-info/15 text-info",
    destructive: "bg-destructive/10 text-destructive",
  } as const;
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${map[tone]}`}>{children}</span>;
}
