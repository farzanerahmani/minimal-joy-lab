import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { AppShell, Card, PrimaryButton } from "@/components/AppShell";
import { Clock, MessageSquare, Bell, Building2, Save, Plus, Trash2, Check, Pencil } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "تنظیمات کلینیک — پت‌کر" }, { name: "description", content: "ساعت کاری، قالب پیامک و زمان‌بندی یادآور." }] }),
  component: Settings,
});

const DAYS = ["شنبه","یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه"];

function Settings() {
  const [tab, setTab] = useState<"clinic"|"hours"|"sms"|"reminders">("clinic");
  return (
    <AppShell
      title="تنظیمات کلینیک"
      subtitle="پیکربندی ساعات کاری، قالب پیامک‌ها و یادآورها"
      action={<PrimaryButton><Save className="h-4 w-4" /> ذخیره تغییرات</PrimaryButton>}
    >
      <div className="flex flex-wrap gap-1 mb-5 bg-muted/40 p-1 rounded-xl w-fit">
        {[
          { id: "clinic", label: "اطلاعات کلینیک", icon: Building2 },
          { id: "hours", label: "ساعات کاری", icon: Clock },
          { id: "sms", label: "قالب پیامک", icon: MessageSquare },
          { id: "reminders", label: "یادآورها", icon: Bell },
        ].map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                active ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}>
              <Icon className="h-3.5 w-3.5" /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "clinic" && <ClinicInfo />}
      {tab === "hours" && <WorkingHours />}
      {tab === "sms" && <SmsTemplates />}
      {tab === "reminders" && <Reminders />}
    </AppShell>
  );
}

function ClinicInfo() {
  const [data, setData] = useState({
    name: "کلینیک دامپزشکی پارسا",
    phone: "۰۲۱-۸۸۰۰۰۰۰۰",
    email: "info@parsa.vet",
    tax: "۱۴۰۰۲۲۳۳۴۴۵۵",
    address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
  });

  return (
    <Card className="p-6 max-w-3xl">
      <h3 className="font-semibold mb-1">اطلاعات کلینیک</h3>
      <p className="text-xs text-muted-foreground mb-5">
        روی هر مقدار کلیک کنید تا در همان جا ویرایش شود — تغییرات فوری اعمال می‌شوند و می‌توانید فوراً بازگردانی کنید.
      </p>
      <div className="grid sm:grid-cols-2 gap-2">
        <InlineField label="نام کلینیک" value={data.name} onSave={(v) => setData({ ...data, name: v })} />
        <InlineField label="شماره تماس" value={data.phone} onSave={(v) => setData({ ...data, phone: v })} />
        <InlineField label="ایمیل" value={data.email} onSave={(v) => setData({ ...data, email: v })} />
        <InlineField label="کد ملی / مالیاتی" value={data.tax} onSave={(v) => setData({ ...data, tax: v })} />
        <div className="sm:col-span-2">
          <InlineField label="آدرس" value={data.address} onSave={(v) => setData({ ...data, address: v })} />
        </div>
      </div>
    </Card>
  );
}

function InlineField({ label, value, onSave }: { label: string; value: string; onSave: (v: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const prevRef = useRef(value);

  const commit = () => {
    setEditing(false);
    if (draft === value) return;
    prevRef.current = value;
    onSave(draft);
    toast.success(`«${label}» به‌روزرسانی شد`, {
      action: {
        label: "بازگردانی",
        onClick: () => { onSave(prevRef.current); setDraft(prevRef.current); },
      },
    });
  };

  return (
    <div className="group flex items-start justify-between gap-3 rounded-xl px-3.5 py-2.5 hover:bg-muted/50 transition cursor-text"
         onClick={() => !editing && setEditing(true)}>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-medium text-muted-foreground mb-1">{label}</div>
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") { setDraft(value); setEditing(false); }
            }}
            className="w-full rounded-lg border border-primary/40 bg-card px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          />
        ) : (
          <div className="text-sm font-medium truncate">{value}</div>
        )}
      </div>
      <div className="pt-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition">
        {editing ? <Check className="h-3.5 w-3.5 text-success" /> : <Pencil className="h-3.5 w-3.5" />}
      </div>
    </div>
  );
}

function WorkingHours() {
  return (
    <Card className="p-6 max-w-3xl">
      <h3 className="font-semibold mb-1">ساعات کاری کلینیک</h3>
      <p className="text-xs text-muted-foreground mb-5">روزها و بازه‌های کاری برای نوبت‌دهی و پیامک یادآور.</p>
      <div className="space-y-2">
        {DAYS.map((d, i) => (
          <div key={d} className="flex items-center gap-3 rounded-xl border border-border p-3">
            <label className="flex items-center gap-2 w-28">
              <input type="checkbox" defaultChecked={i !== 6} className="accent-primary" />
              <span className="text-sm font-medium">{d}</span>
            </label>
            <div className="flex items-center gap-2 flex-1">
              <TimeInput defaultValue="09:00" />
              <span className="text-xs text-muted-foreground">تا</span>
              <TimeInput defaultValue="20:00" />
            </div>
            <button className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1">
              <Plus className="h-3.5 w-3.5" /> بازه دوم
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TimeInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="time" {...props}
      className="rounded-lg border border-input bg-card px-3 py-1.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
    />
  );
}

const TEMPLATES = [
  { name: "یادآور واکسن", body: "{owner} عزیز، زمان واکسن {vaccine} {pet} در تاریخ {date} ساعت {time} است. کلینیک پارسا" },
  { name: "تأیید نوبت", body: "{owner} عزیز، نوبت {pet} در تاریخ {date} ساعت {time} ثبت شد. لغو: ۱" },
  { name: "پیگیری پس از ویزیت", body: "سلام {owner}، حال {pet} چطور است؟ در صورت سوال با ما در ارتباط باشید." },
];

function SmsTemplates() {
  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-4 max-w-5xl">
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">قالب‌های پیامک</h3>
          <button className="text-xs text-primary inline-flex items-center gap-1 hover:underline"><Plus className="h-3.5 w-3.5" /> قالب جدید</button>
        </div>
        {TEMPLATES.map((t) => (
          <div key={t.name} className="rounded-xl border border-border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <input defaultValue={t.name} className="text-sm font-semibold bg-transparent outline-none border-b border-transparent focus:border-primary" />
              <button className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
            <textarea
              defaultValue={t.body} rows={3}
              className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
            <div className="text-[11px] text-muted-foreground">
              متغیرها: <code className="bg-muted px-1 rounded">{"{owner}"}</code> <code className="bg-muted px-1 rounded">{"{pet}"}</code> <code className="bg-muted px-1 rounded">{"{vaccine}"}</code> <code className="bg-muted px-1 rounded">{"{date}"}</code> <code className="bg-muted px-1 rounded">{"{time}"}</code>
            </div>
          </div>
        ))}
      </Card>

      <Card className="p-6 h-fit">
        <h4 className="font-semibold mb-3">تنظیمات ارسال</h4>
        <div className="space-y-4">
          <Field label="نام فرستنده" defaultValue="ParsaVet" />
          <Field label="خط ارسال" defaultValue="۳۰۰۰۲۲۳۳۴۴" />
          <Select label="ساعت ارسال یادآور" defaultValue="10:00">
            {["08:00","09:00","10:00","11:00","17:00","18:00"].map(o => <option key={o}>{o}</option>)}
          </Select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="accent-primary" defaultChecked />
            <span>ارسال خودکار پیامک تأیید پس از ثبت نوبت</span>
          </label>
        </div>
      </Card>
    </div>
  );
}

function Reminders() {
  return (
    <Card className="p-6 max-w-3xl">
      <h3 className="font-semibold mb-1">زمان‌بندی یادآورها</h3>
      <p className="text-xs text-muted-foreground mb-5">چند روز قبل از موعد، چه قالبی ارسال شود.</p>

      <div className="space-y-3">
        {[
          { type: "یادآور واکسن", days: "۳", template: "یادآور واکسن", retry: true },
          { type: "تأیید نوبت", days: "۱", template: "تأیید نوبت", retry: false },
          { type: "پیگیری ویزیت", days: "۲ بعد از ویزیت", template: "پیگیری پس از ویزیت", retry: false },
        ].map((r) => (
          <div key={r.type} className="grid sm:grid-cols-[1fr_120px_1fr_auto] gap-3 items-center rounded-xl border border-border p-4">
            <div>
              <div className="text-sm font-semibold">{r.type}</div>
              <div className="text-[11px] text-muted-foreground">ارسال خودکار</div>
            </div>
            <div>
              <input defaultValue={r.days} className="w-full rounded-lg border border-input bg-card px-3 py-1.5 text-sm" />
              <div className="text-[10px] text-muted-foreground mt-1">روز</div>
            </div>
            <select defaultValue={r.template} className="rounded-lg border border-input bg-card px-3 py-1.5 text-sm">
              {TEMPLATES.map(t => <option key={t.name}>{t.name}</option>)}
            </select>
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" defaultChecked={r.retry} className="accent-primary" /> تلاش مجدد
            </label>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Field({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-foreground/80 mb-1.5 block">{label}</span>
      <input {...rest} className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
    </label>
  );
}

function Select({ label, children, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-foreground/80 mb-1.5 block">{label}</span>
      <select {...rest} className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15">
        {children}
      </select>
    </label>
  );
}
