import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Badge, PrimaryButton } from "@/components/AppShell";
import { Clock, PawPrint, Calendar } from "lucide-react";

export const Route = createFileRoute("/app/visits")({
  head: () => ({ meta: [{ title: "ویزیت‌ها — پت‌کر" }, { name: "description", content: "نوبت‌ها و گزارش ویزیت‌های دامپزشک." }] }),
  component: Visits,
});

const SLOTS = ["۰۸:۰۰","۰۹:۰۰","۱۰:۰۰","۱۱:۰۰","۱۲:۰۰","۱۳:۰۰","۱۴:۰۰","۱۵:۰۰","۱۶:۰۰","۱۷:۰۰"];
const EVENTS: Record<string, { pet: string; reason: string; tone: "primary"|"success"|"info"|"warning" }[]> = {
  "۰۹:۰۰": [{ pet: "میلو", reason: "واکسن سالانه", tone: "primary" }],
  "۱۰:۰۰": [{ pet: "راکی", reason: "معاینه دوره‌ای", tone: "info" }],
  "۱۱:۰۰": [{ pet: "بل", reason: "جراحی عقیم‌سازی", tone: "warning" }],
  "۱۲:۰۰": [{ pet: "کوکو", reason: "بررسی پوست", tone: "success" }],
  "۱۵:۰۰": [{ pet: "تامی", reason: "ادامه درمان", tone: "info" }],
};

function Visits() {
  return (
    <AppShell
      title="ویزیت‌ها و نوبت‌دهی"
      subtitle="مدیریت برنامه روزانه و گزارش معاینات"
      action={<PrimaryButton>ثبت نوبت</PrimaryButton>}
    >
      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">برنامه امروز</h3>
            </div>
            <div className="inline-flex rounded-xl border border-border bg-card p-1 text-xs">
              {["روز","هفته","ماه"].map((t,i) => (
                <button key={t} className={`px-3 py-1.5 rounded-lg ${i===0?"bg-primary text-primary-foreground":"text-muted-foreground"}`}>{t}</button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            {SLOTS.map((s) => (
              <div key={s} className="grid grid-cols-[60px_1fr] gap-3 items-start py-2 border-t border-dashed border-border first:border-t-0">
                <div className="text-xs tabular-nums text-muted-foreground pt-1.5 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {s}
                </div>
                <div className="space-y-1.5">
                  {(EVENTS[s] ?? []).map((e, i) => (
                    <div key={i} className="rounded-xl border border-border bg-card hover:border-primary/40 transition p-3 flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                        e.tone === "primary" ? "bg-primary-soft text-primary" :
                        e.tone === "info" ? "bg-info/15 text-info" :
                        e.tone === "warning" ? "bg-warning/20 text-warning" : "bg-success/15 text-success"
                      }`}>
                        <PawPrint className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold">{e.pet}</div>
                        <div className="text-[11px] text-muted-foreground">{e.reason}</div>
                      </div>
                      <Badge tone={e.tone}>{e.reason.includes("جراحی") ? "آماده" : "تأیید"}</Badge>
                    </div>
                  ))}
                  {!EVENTS[s] && (
                    <button className="w-full text-[11px] text-muted-foreground rounded-lg border border-dashed border-border py-2 hover:bg-muted/60">+ افزودن نوبت</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="font-semibold mb-3">آمار امروز</h3>
            <ul className="space-y-3 text-sm">
              <Row label="ویزیت تکمیل‌شده" value="۹" />
              <Row label="در حال انجام" value="۲" />
              <Row label="پیش‌رو" value="۷" />
              <Row label="لغو شده" value="۱" muted />
            </ul>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold mb-3">دامپزشک فعال</h3>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">ا.ا</div>
              <div>
                <div className="text-sm font-semibold">دکتر احمدی</div>
                <div className="text-[11px] text-muted-foreground">شیفت ۸ تا ۱۸</div>
              </div>
            </div>
            <button className="mt-4 w-full rounded-xl border border-input bg-card py-2 text-xs hover:bg-accent">تغییر دامپزشک</button>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <li className="flex items-center justify-between">
      <span className={muted ? "text-muted-foreground" : ""}>{label}</span>
      <span className="font-bold tabular-nums">{value}</span>
    </li>
  );
}
