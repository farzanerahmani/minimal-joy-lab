import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Card, Badge, PrimaryButton } from "@/components/AppShell";
import { CalendarClock, Syringe, MessageSquare, TrendingUp, ChevronLeft, PawPrint, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "داشبورد — پت‌کر" }, { name: "description", content: "نمای کلی فعالیت کلینیک: نوبت‌ها، یادآور واکسن، پیامک‌ها و درآمد." }] }),
  component: Dashboard,
});

const KPIS = [
  { label: "ویزیت‌های امروز", value: "۱۸", delta: "+۳ نسبت به دیروز", icon: Stethoscope, tone: "primary" as const },
  { label: "بیماران فعال", value: "۱٬۲۴۸", delta: "+۲۴ این هفته", icon: PawPrint, tone: "info" as const },
  { label: "واکسن این هفته", value: "۴۲", delta: "۹ یادآور پیامکی", icon: Syringe, tone: "success" as const },
  { label: "درآمد ماه", value: "۸۴٫۵م", delta: "+۱۲٪", icon: TrendingUp, tone: "warning" as const },
];

const APPTS = [
  { time: "۰۹:۰۰", pet: "میلو", kind: "گربه پرشین", owner: "خانم رضایی", reason: "واکسن سالانه", status: "تأیید شده" },
  { time: "۰۹:۳۰", pet: "راکی", kind: "سگ ژرمن", owner: "آقای کریمی", reason: "معاینه دوره‌ای", status: "در انتظار" },
  { time: "۱۰:۱۵", pet: "بل", kind: "گربه اسکاتیش", owner: "خانم محمدی", reason: "جراحی عقیم‌سازی", status: "آماده" },
  { time: "۱۱:۰۰", pet: "کوکو", kind: "خرگوش", owner: "آقای ایزدی", reason: "بررسی پوست", status: "تأیید شده" },
  { time: "۱۲:۳۰", pet: "تامی", kind: "سگ پامرانین", owner: "خانم نوری", reason: "ادامه درمان", status: "پیگیری" },
];

const REMINDERS = [
  { pet: "میلو", owner: "خانم رضایی", due: "فردا", type: "هاری" },
  { pet: "راکی", owner: "آقای کریمی", due: "۳ روز دیگر", type: "RCP" },
  { pet: "اسپایک", owner: "آقای مرادی", due: "۵ روز دیگر", type: "تقویتی" },
  { pet: "لیلی", owner: "خانم احمدی", due: "هفته آینده", type: "هاری" },
];

function Dashboard() {
  return (
    <AppShell
      title="خوش آمدید، دکتر احمدی"
      subtitle="نمای کلی کلینیک — سه‌شنبه ۲ تیر ۱۴۰۵"
      action={<PrimaryButton>پذیرش جدید</PrimaryButton>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((k) => {
          const Icon = k.icon;
          const toneMap = {
            primary: "bg-primary-soft text-primary",
            info: "bg-info/15 text-info",
            success: "bg-success/15 text-success",
            warning: "bg-warning/20 text-warning",
          };
          return (
            <Card key={k.label} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">{k.label}</div>
                  <div className="text-2xl font-bold mt-1">{k.value}</div>
                </div>
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${toneMap[k.tone]}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="text-[11px] text-muted-foreground mt-3">{k.delta}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        {/* Appointments */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">نوبت‌های امروز</h3>
            </div>
            <Link to="/app/visits" className="text-xs text-primary hover:underline flex items-center gap-1">
              همه نوبت‌ها <ChevronLeft className="h-3 w-3" />
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {APPTS.map((a) => (
              <li key={a.time + a.pet} className="flex items-center gap-4 py-3">
                <div className="w-14 text-center">
                  <div className="text-sm font-bold tabular-nums">{a.time}</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary-soft text-primary flex items-center justify-center">
                  <PawPrint className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{a.pet} · <span className="text-muted-foreground font-normal">{a.kind}</span></div>
                  <div className="text-xs text-muted-foreground">{a.owner} — {a.reason}</div>
                </div>
                <Badge tone={a.status === "آماده" ? "success" : a.status === "در انتظار" ? "warning" : a.status === "پیگیری" ? "info" : "default"}>
                  {a.status}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>

        {/* Reminders */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Syringe className="h-4 w-4 text-success" />
              <h3 className="font-semibold">یادآور واکسن</h3>
            </div>
            <Link to="/app/reminders" className="text-xs text-primary hover:underline">همه</Link>
          </div>
          <ul className="space-y-3">
            {REMINDERS.map((r) => (
              <li key={r.pet + r.type} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/60 transition">
                <div className="h-9 w-9 rounded-lg bg-success/15 text-success flex items-center justify-center">
                  <Syringe className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{r.pet}</div>
                  <div className="text-[11px] text-muted-foreground">{r.owner} · {r.type}</div>
                </div>
                <div className="text-[11px] text-muted-foreground">{r.due}</div>
              </li>
            ))}
          </ul>
          <button className="mt-4 w-full rounded-xl border border-dashed border-border py-2 text-xs text-muted-foreground hover:bg-muted/60 transition flex items-center justify-center gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" />
            ارسال پیامک گروهی
          </button>
        </Card>
      </div>

      {/* Activity */}
      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <Card className="p-5">
          <h3 className="font-semibold mb-1">ویزیت‌ها در ۷ روز اخیر</h3>
          <p className="text-xs text-muted-foreground mb-4">میانگین ۱۹ ویزیت در روز</p>
          <MiniChart />
        </Card>
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">آخرین فعالیت‌ها</h3>
            <span className="text-[11px] text-muted-foreground">به‌روزرسانی لحظه‌ای</span>
          </div>
          <ul className="space-y-3 text-sm">
            <ActivityRow color="primary" title="نسخه برای میلو ثبت شد" who="دکتر احمدی · ۵ دقیقه پیش" />
            <ActivityRow color="success" title="پیامک یادآور واکسن به ۹ صاحب حیوان ارسال شد" who="سیستم خودکار · ۲۰ دقیقه پیش" />
            <ActivityRow color="info" title="پرونده جدید: راکی (سگ ژرمن)" who="منشی پارسا · ۱ ساعت پیش" />
            <ActivityRow color="warning" title="پاسخ پیامک از خانم رضایی دریافت شد" who="ورودی پیامک · ۲ ساعت پیش" />
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}

function ActivityRow({ color, title, who }: { color: "primary"|"success"|"info"|"warning"; title: string; who: string }) {
  const map = { primary: "bg-primary", success: "bg-success", info: "bg-info", warning: "bg-warning" } as const;
  return (
    <li className="flex items-start gap-3">
      <span className={`mt-1.5 h-2 w-2 rounded-full ${map[color]}`} />
      <div className="flex-1">
        <div className="font-medium">{title}</div>
        <div className="text-[11px] text-muted-foreground">{who}</div>
      </div>
    </li>
  );
}

function MiniChart() {
  const bars = [12, 18, 14, 22, 17, 25, 19];
  const max = 25;
  const days = ["ش","ی","د","س","چ","پ","ج"];
  return (
    <div className="flex items-end gap-2 h-32">
      {bars.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
          <div className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary/50" style={{ height: `${(v/max)*100}%` }} />
          <span className="text-[10px] text-muted-foreground">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}
