import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Badge, PrimaryButton } from "@/components/AppShell";
import { Syringe, Send } from "lucide-react";

export const Route = createFileRoute("/app/reminders")({
  head: () => ({ meta: [{ title: "یادآور واکسن — پت‌کر" }, { name: "description", content: "زمان‌بندی هوشمند واکسیناسیون و ارسال خودکار پیامک یادآور." }] }),
  component: Reminders,
});

const QUEUE = [
  { pet: "میلو", owner: "خانم رضایی", phone: "۰۹۱۲•••۴۵۶۷", vaccine: "هاری", due: "فردا ۰۹:۰۰", status: "زمان‌بندی" },
  { pet: "راکی", owner: "آقای کریمی", phone: "۰۹۱۳•••۸۸۲۰", vaccine: "RCP", due: "۳ روز دیگر", status: "زمان‌بندی" },
  { pet: "اسپایک", owner: "آقای مرادی", phone: "۰۹۱۴•••۱۲۳۴", vaccine: "تقویتی", due: "۵ روز دیگر", status: "زمان‌بندی" },
  { pet: "لیلی", owner: "خانم احمدی", phone: "۰۹۳۰•••۱۱۸۹", vaccine: "هاری", due: "هفته آینده", status: "زمان‌بندی" },
  { pet: "بل", owner: "خانم محمدی", phone: "۰۹۱۰•••۲۲۳۴", vaccine: "RCP", due: "امروز ۱۸:۰۰", status: "ارسال شد" },
  { pet: "تامی", owner: "خانم نوری", phone: "۰۹۳۵•••۷۸۱۲", vaccine: "تقویتی", due: "دیروز", status: "تأخیر" },
];

function Reminders() {
  return (
    <AppShell
      title="یادآور واکسیناسیون"
      subtitle="مدیریت هوشمند زمان‌بندی واکسن و پیامک خودکار"
      action={<PrimaryButton>یادآور جدید</PrimaryButton>}
    >
      <div className="grid sm:grid-cols-4 gap-4 mb-5">
        <Stat label="در صف ارسال" value="۲۱" tone="primary" />
        <Stat label="ارسال‌شده امروز" value="۹" tone="success" />
        <Stat label="پاسخ دریافت‌شده" value="۴" tone="info" />
        <Stat label="تأخیر" value="۲" tone="destructive" />
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs">
            {["همه","امروز","این هفته","تأخیر"].map((t,i) => (
              <button key={t} className={`rounded-full px-3 py-1.5 ${i===0?"bg-primary text-primary-foreground":"bg-secondary text-secondary-foreground hover:bg-accent"}`}>{t}</button>
            ))}
          </div>
          <div className="flex-1" />
          <button className="inline-flex items-center gap-1.5 rounded-xl border border-input bg-card px-3 py-1.5 text-xs hover:bg-accent">
            <Send className="h-3.5 w-3.5" /> ارسال انتخاب‌شده‌ها
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="text-right text-[11px] uppercase text-muted-foreground bg-muted/40">
            <tr>
              <th className="py-3 px-4 font-medium"></th>
              <th className="py-3 px-4 font-medium">حیوان</th>
              <th className="py-3 px-4 font-medium">صاحب</th>
              <th className="py-3 px-4 font-medium">واکسن</th>
              <th className="py-3 px-4 font-medium">موعد</th>
              <th className="py-3 px-4 font-medium">وضعیت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {QUEUE.map((q) => (
              <tr key={q.pet+q.vaccine} className="hover:bg-muted/40">
                <td className="py-3 px-4"><input type="checkbox" className="accent-primary" /></td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-success/15 text-success flex items-center justify-center">
                      <Syringe className="h-4 w-4" />
                    </div>
                    <div className="font-semibold">{q.pet}</div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div>{q.owner}</div>
                  <div className="text-[11px] text-muted-foreground">{q.phone}</div>
                </td>
                <td className="py-3 px-4">{q.vaccine}</td>
                <td className="py-3 px-4 text-muted-foreground">{q.due}</td>
                <td className="py-3 px-4">
                  <Badge tone={q.status === "ارسال شد" ? "success" : q.status === "تأخیر" ? "destructive" : "info"}>{q.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "primary"|"success"|"info"|"destructive" }) {
  const map = {
    primary: "bg-primary-soft text-primary",
    success: "bg-success/15 text-success",
    info: "bg-info/15 text-info",
    destructive: "bg-destructive/10 text-destructive",
  };
  return (
    <Card className="p-4 flex items-center gap-3">
      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${map[tone]}`}>
        <Syringe className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </Card>
  );
}
