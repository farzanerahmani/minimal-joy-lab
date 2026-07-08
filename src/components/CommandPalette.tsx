import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator, CommandShortcut,
} from "@/components/ui/command";
import {
  LayoutDashboard, PawPrint, Stethoscope, FilePlus2, Bell,
  MessageSquare, BarChart3, Wallet, Users, Settings, Plus, Search,
} from "lucide-react";

const NAV = [
  { to: "/app/dashboard", label: "داشبورد", icon: LayoutDashboard, keys: "G D" },
  { to: "/app/patients", label: "بیماران", icon: PawPrint, keys: "G P" },
  { to: "/app/visits", label: "ویزیت‌ها", icon: Stethoscope, keys: "G V" },
  { to: "/app/prescriptions", label: "نسخه‌ها", icon: FilePlus2, keys: "G R" },
  { to: "/app/reminders", label: "یادآور واکسن", icon: Bell },
  { to: "/app/sms", label: "پیامک", icon: MessageSquare },
  { to: "/app/reports", label: "گزارش‌ها", icon: BarChart3 },
  { to: "/app/pricing", label: "تعرفه خدمات", icon: Wallet },
  { to: "/app/users", label: "کاربران", icon: Users },
  { to: "/app/settings", label: "تنظیمات", icon: Settings },
];

const SAMPLE_PATIENTS = [
  { name: "میلو", owner: "خانم رضایی" },
  { name: "راکی", owner: "آقای کریمی" },
  { name: "بل", owner: "خانم محمدی" },
  { name: "تامی", owner: "خانم نوری" },
  { name: "کوکو", owner: "آقای ایزدی" },
];

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  const go = (to: string) => { onOpenChange(false); navigate({ to }); };
  const act = (label: string) => { onOpenChange(false); toast.success(label); };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="جستجوی بیمار، صاحب، صفحه یا اجرای عملیات…" />
      <CommandList>
        <CommandEmpty>موردی یافت نشد.</CommandEmpty>

        <CommandGroup heading="عملیات سریع">
          <CommandItem onSelect={() => act("پذیرش جدید باز شد")}>
            <Plus className="ml-2 h-4 w-4 text-primary" /> پذیرش بیمار جدید
            <CommandShortcut>N</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => act("فرم ویزیت جدید")}>
            <Stethoscope className="ml-2 h-4 w-4 text-primary" /> ثبت ویزیت جدید
          </CommandItem>
          <CommandItem onSelect={() => act("نسخه جدید")}>
            <FilePlus2 className="ml-2 h-4 w-4 text-primary" /> نسخه جدید
          </CommandItem>
          <CommandItem onSelect={() => act("پیامک گروهی آماده ارسال")}>
            <MessageSquare className="ml-2 h-4 w-4 text-primary" /> ارسال پیامک گروهی
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="بیماران">
          {SAMPLE_PATIENTS.map((p) => (
            <CommandItem key={p.name} onSelect={() => go("/app/patients")}>
              <PawPrint className="ml-2 h-4 w-4 text-muted-foreground" />
              {p.name} <span className="mr-2 text-xs text-muted-foreground">· {p.owner}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="پیمایش">
          {NAV.map((n) => {
            const Icon = n.icon;
            return (
              <CommandItem key={n.to} onSelect={() => go(n.to)}>
                <Icon className="ml-2 h-4 w-4 text-muted-foreground" />
                {n.label}
                {n.keys && <CommandShortcut>{n.keys}</CommandShortcut>}
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="راهنما">
          <CommandItem onSelect={() => act("میانبرها: ⌘K جستجو، N پذیرش جدید، G+D داشبورد، G+P بیماران، G+V ویزیت‌ها")}>
            <Search className="ml-2 h-4 w-4 text-muted-foreground" /> میانبرهای صفحه‌کلید
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function useAppShortcuts(setOpenPalette: (v: boolean) => void) {
  const navigate = useNavigate();
  useEffect(() => {
    let waitingG = false;
    let gTimer: ReturnType<typeof setTimeout> | null = null;

    const isTyping = (el: EventTarget | null) => {
      const t = el as HTMLElement | null;
      if (!t) return false;
      const tag = t.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || t.isContentEditable;
    };

    const onKey = (e: KeyboardEvent) => {
      // ⌘K / Ctrl+K → open palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenPalette(true);
        return;
      }
      if (isTyping(e.target)) return;

      // "/" → focus palette
      if (e.key === "/") {
        e.preventDefault();
        setOpenPalette(true);
        return;
      }
      // "N" → new intake toast
      if (e.key.toLowerCase() === "n" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        toast.success("پذیرش جدید باز شد");
        return;
      }
      // "G" then D/P/V/R
      if (e.key.toLowerCase() === "g") {
        waitingG = true;
        if (gTimer) clearTimeout(gTimer);
        gTimer = setTimeout(() => (waitingG = false), 800);
        return;
      }
      if (waitingG) {
        waitingG = false;
        const map: Record<string, string> = {
          d: "/app/dashboard", p: "/app/patients", v: "/app/visits", r: "/app/prescriptions",
        };
        const to = map[e.key.toLowerCase()];
        if (to) { e.preventDefault(); navigate({ to }); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, setOpenPalette]);
}
