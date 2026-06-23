import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Badge, PrimaryButton } from "@/components/AppShell";
import { PawPrint, Filter, Phone } from "lucide-react";

export const Route = createFileRoute("/app/patients")({
  head: () => ({ meta: [{ title: "بیماران — پت‌کر" }, { name: "description", content: "لیست پرونده بیماران، صاحبین و سوابق دامپزشکی." }] }),
  component: Patients,
});

const ROWS = [
  { name: "میلو", species: "گربه", breed: "پرشین", age: "۳ سال", owner: "خانم رضایی", phone: "۰۹۱۲•••۴۵۶۷", last: "۲ روز پیش", status: "سالم" },
  { name: "راکی", species: "سگ", breed: "ژرمن شپرد", age: "۵ سال", owner: "آقای کریمی", phone: "۰۹۱۳•••۸۸۲۰", last: "هفته پیش", status: "تحت درمان" },
  { name: "بل", species: "گربه", breed: "اسکاتیش فولد", age: "۲ سال", owner: "خانم محمدی", phone: "۰۹۱۰•••۲۲۳۴", last: "امروز", status: "نیاز به واکسن" },
  { name: "تامی", species: "سگ", breed: "پامرانین", age: "۴ سال", owner: "خانم نوری", phone: "۰۹۳۵•••۷۸۱۲", last: "۳ روز پیش", status: "سالم" },
  { name: "کوکو", species: "خرگوش", breed: "Mini Lop", age: "۱ سال", owner: "آقای ایزدی", phone: "۰۹۱۲•••۳۳۹۹", last: "دیروز", status: "سالم" },
  { name: "لیلی", species: "گربه", breed: "DSH", age: "۶ سال", owner: "خانم احمدی", phone: "۰۹۳۰•••۱۱۸۹", last: "۲ هفته پیش", status: "نیاز به ویزیت" },
];

function Patients() {
  return (
    <AppShell
      title="بیماران"
      subtitle="مدیریت پرونده حیوانات و صاحبان"
      action={<PrimaryButton>بیمار جدید</PrimaryButton>}
    >
      <Card className="overflow-hidden">
        <div className="p-4 flex items-center gap-3 border-b border-border">
          <input
            placeholder="جستجو با نام، صاحب یا شماره پرونده…"
            className="flex-1 rounded-xl border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
          <button className="inline-flex items-center gap-1.5 rounded-xl border border-input bg-card px-3 py-2 text-xs hover:bg-accent">
            <Filter className="h-3.5 w-3.5" /> فیلتر
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-[11px] uppercase tracking-wide text-muted-foreground border-b border-border bg-muted/40">
                <th className="py-3 px-4 font-medium">حیوان</th>
                <th className="py-3 px-4 font-medium">نژاد / سن</th>
                <th className="py-3 px-4 font-medium">صاحب</th>
                <th className="py-3 px-4 font-medium">تماس</th>
                <th className="py-3 px-4 font-medium">آخرین مراجعه</th>
                <th className="py-3 px-4 font-medium">وضعیت</th>
                <th className="py-3 px-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ROWS.map((r) => (
                <tr key={r.name + r.owner} className="hover:bg-muted/40 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary-soft text-primary flex items-center justify-center">
                        <PawPrint className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-semibold">{r.name}</div>
                        <div className="text-[11px] text-muted-foreground">{r.species}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{r.breed}</div>
                    <div className="text-[11px] text-muted-foreground">{r.age}</div>
                  </td>
                  <td className="py-3 px-4">{r.owner}</td>
                  <td className="py-3 px-4">
                    <div className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" /> {r.phone}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{r.last}</td>
                  <td className="py-3 px-4">
                    <Badge tone={
                      r.status === "سالم" ? "success" :
                      r.status === "تحت درمان" ? "info" :
                      r.status === "نیاز به واکسن" ? "warning" : "destructive"
                    }>{r.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-left">
                    <button className="text-xs font-medium text-primary hover:underline">مشاهده پرونده</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
          <span>نمایش ۱ تا ۶ از ۱٬۲۴۸ بیمار</span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded-md border border-border hover:bg-accent">قبلی</button>
            <button className="px-2.5 py-1 rounded-md bg-primary text-primary-foreground">۱</button>
            <button className="px-2.5 py-1 rounded-md border border-border hover:bg-accent">۲</button>
            <button className="px-2.5 py-1 rounded-md border border-border hover:bg-accent">۳</button>
            <button className="px-2.5 py-1 rounded-md border border-border hover:bg-accent">بعدی</button>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}
