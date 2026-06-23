import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, PrimaryButton } from "@/components/AppShell";
import { Pencil, Wallet } from "lucide-react";

export const Route = createFileRoute("/app/pricing")({
  head: () => ({ meta: [{ title: "تعرفه خدمات — پت‌کر" }, { name: "description", content: "مدیریت قیمت خدمات کلینیک، واکسن، جراحی و ویزیت." }] }),
  component: Pricing,
});

const SERVICES = [
  { cat: "ویزیت", items: [
    { name: "ویزیت عمومی", price: "۳۵۰٬۰۰۰" },
    { name: "ویزیت تخصصی", price: "۵۰۰٬۰۰۰" },
    { name: "ویزیت در منزل", price: "۸۰۰٬۰۰۰" },
  ]},
  { cat: "واکسن", items: [
    { name: "هاری", price: "۲۲۰٬۰۰۰" },
    { name: "RCP گربه", price: "۳۸۰٬۰۰۰" },
    { name: "DHPP سگ", price: "۴۲۰٬۰۰۰" },
  ]},
  { cat: "جراحی", items: [
    { name: "عقیم‌سازی نر", price: "۲٬۵۰۰٬۰۰۰" },
    { name: "عقیم‌سازی ماده", price: "۳٬۵۰۰٬۰۰۰" },
    { name: "جراحی دندان", price: "۲٬۸۰۰٬۰۰۰" },
  ]},
];

function Pricing() {
  return (
    <AppShell
      title="تعرفه خدمات"
      subtitle="مدیریت قیمت ویزیت، واکسن و جراحی"
      action={<PrimaryButton>خدمت جدید</PrimaryButton>}
    >
      <div className="grid lg:grid-cols-3 gap-4">
        {SERVICES.map((s) => (
          <Card key={s.cat} className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
                  <Wallet className="h-4 w-4" />
                </div>
                <h3 className="font-semibold">{s.cat}</h3>
              </div>
              <span className="text-[11px] text-muted-foreground">{s.items.length} مورد</span>
            </div>
            <ul className="divide-y divide-border">
              {s.items.map((it) => (
                <li key={it.name} className="flex items-center justify-between py-3 group">
                  <span className="text-sm">{it.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold tabular-nums">{it.price} <span className="text-[10px] text-muted-foreground font-normal">تومان</span></span>
                    <button className="opacity-0 group-hover:opacity-100 transition text-muted-foreground hover:text-primary">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
