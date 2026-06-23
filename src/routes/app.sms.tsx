import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Badge, PrimaryButton } from "@/components/AppShell";
import { Send, MessageSquare, Inbox } from "lucide-react";

export const Route = createFileRoute("/app/sms")({
  head: () => ({ meta: [{ title: "پیامک — پت‌کر" }, { name: "description", content: "ارسال و دریافت پیامک با صاحبان حیوانات از پنل کلینیک." }] }),
  component: Sms,
});

const THREADS = [
  { name: "خانم رضایی", pet: "میلو", last: "ممنونم دکتر، فردا میام.", time: "۱۰:۲۴", unread: 2 },
  { name: "آقای کریمی", pet: "راکی", last: "داروها رو شروع کردیم.", time: "۰۹:۵۰", unread: 0 },
  { name: "خانم محمدی", pet: "بل", last: "ساعت چند بیاریم؟", time: "دیروز", unread: 1 },
  { name: "آقای ایزدی", pet: "کوکو", last: "تشکر از یادآوری.", time: "دیروز", unread: 0 },
  { name: "خانم نوری", pet: "تامی", last: "بهتر شده ولی هنوز…", time: "۲ روز پیش", unread: 0 },
];

const MESSAGES = [
  { who: "them", text: "سلام دکتر، میلو امروز کمی بی‌حال بود.", time: "۰۹:۴۰" },
  { who: "me", text: "سلام، آیا غذا خورده؟ دمای بدنش رو چک کنید لطفاً.", time: "۰۹:۴۵" },
  { who: "them", text: "غذا کم خورد. دما چطور اندازه بگیرم؟", time: "۰۹:۵۲" },
  { who: "me", text: "اگر ممکنه فردا ساعت ۹ بیارش کلینیک. یادآور پیامکی هم ارسال شد.", time: "۱۰:۰۵" },
  { who: "them", text: "ممنونم دکتر، فردا میام.", time: "۱۰:۲۴" },
];

function Sms() {
  return (
    <AppShell
      title="پیامک"
      subtitle="گفتگو با صاحبان حیوانات و ارسال یادآور خودکار"
      action={<PrimaryButton>پیامک گروهی</PrimaryButton>}
    >
      <Card className="overflow-hidden grid lg:grid-cols-[320px_1fr] h-[calc(100vh-13rem)]">
        {/* Threads */}
        <div className="border-l border-border flex flex-col">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Inbox className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input placeholder="جستجوی گفتگو…" className="w-full rounded-xl border border-input bg-background pr-9 pl-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <ul className="flex-1 overflow-y-auto">
            {THREADS.map((t, i) => (
              <li key={t.name} className={`flex items-start gap-3 p-3 cursor-pointer transition border-b border-border ${i===0 ? "bg-primary-soft/40" : "hover:bg-muted/50"}`}>
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {t.name.split(" ")[1]?.[0] ?? "؟"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold truncate">{t.name}</div>
                    <span className="text-[10px] text-muted-foreground">{t.time}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mb-0.5">{t.pet}</div>
                  <div className="text-xs text-muted-foreground truncate">{t.last}</div>
                </div>
                {t.unread > 0 && (
                  <span className="mt-1 h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {t.unread}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Conversation */}
        <div className="flex flex-col bg-muted/20">
          <div className="px-5 py-3 border-b border-border bg-background flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">خانم رضایی</div>
              <div className="text-[11px] text-muted-foreground">میلو — گربه پرشین · ۰۹۱۲•••۴۵۶۷</div>
            </div>
            <Badge tone="success">پاسخگو</Badge>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {MESSAGES.map((m, i) => (
              <div key={i} className={`flex ${m.who === "me" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-md rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  m.who === "me"
                    ? "bg-primary text-primary-foreground rounded-bl-sm"
                    : "bg-card border border-border rounded-br-sm"
                }`}>
                  <div>{m.text}</div>
                  <div className={`text-[10px] mt-1 ${m.who==="me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</div>
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <Badge tone="info">یادآور واکسن خودکار ارسال شد — ۱۸:۰۰</Badge>
            </div>
          </div>

          <div className="p-3 border-t border-border bg-background">
            <div className="flex items-center gap-2 rounded-2xl border border-input bg-card px-3 py-1.5">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="پیام خود را بنویسید…"
                className="flex-1 bg-transparent outline-none text-sm py-2"
              />
              <button className="rounded-xl bg-primary text-primary-foreground p-2 hover:bg-primary/90">
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground">
              <button className="rounded-full bg-secondary px-2.5 py-1 hover:bg-accent">قالب: یادآور واکسن</button>
              <button className="rounded-full bg-secondary px-2.5 py-1 hover:bg-accent">قالب: تأیید نوبت</button>
              <button className="rounded-full bg-secondary px-2.5 py-1 hover:bg-accent">قالب: پیگیری درمان</button>
            </div>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}
