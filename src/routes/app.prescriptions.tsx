import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, PrimaryButton } from "@/components/AppShell";
import { Printer, FileSignature, PawPrint, Pill, Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/app/prescriptions")({
  head: () => ({ meta: [{ title: "نسخه‌نویسی — پت‌کر" }, { name: "description", content: "صدور نسخه دامپزشکی با امضای الکترونیکی و چاپ." }] }),
  component: Prescriptions,
});

const ITEMS = [
  { name: "آموکسی‌سیلین ۲۵۰", dose: "۱ قاشق هر ۸ ساعت — ۷ روز" },
  { name: "متاکام", dose: "نیم میلی‌گرم — یک‌بار در روز" },
  { name: "ضد انگل خوراکی", dose: "تک‌دوز" },
];

function Prescriptions() {
  return (
    <AppShell
      title="نسخه‌نویسی"
      subtitle="ثبت دستور دارویی و چاپ نسخه با امضای الکترونیکی"
      action={<PrimaryButton>نسخه جدید</PrimaryButton>}
    >
      <div className="grid lg:grid-cols-[1fr_420px] gap-4">
        {/* Form */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">جزئیات نسخه</h3>
            <span className="text-[11px] text-muted-foreground">پیش‌نویس — ذخیره خودکار</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="بیمار" options={["میلو — گربه پرشین", "راکی — سگ ژرمن", "بل — اسکاتیش"]} />
            <Select label="نوع ویزیت" options={["معاینه دوره‌ای","واکسیناسیون","پیگیری درمان","جراحی"]} />
            <Input label="تشخیص" placeholder="مثلاً عفونت گوش خارجی" />
            <Input label="وزن (کیلوگرم)" placeholder="۴.۲" />
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-medium">داروها و دستور مصرف</label>
              <button className="text-xs text-primary inline-flex items-center gap-1 hover:underline">
                <Plus className="h-3.5 w-3.5" /> افزودن دارو
              </button>
            </div>
            <ul className="space-y-2">
              {ITEMS.map((it, i) => (
                <li key={i} className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
                  <div className="h-9 w-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
                    <Pill className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{it.name}</div>
                    <div className="text-[11px] text-muted-foreground">{it.dose}</div>
                  </div>
                  <button className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <label className="text-xs font-medium mb-1.5 block">توضیحات تکمیلی</label>
            <textarea
              rows={3}
              placeholder="توصیه‌های پس از ویزیت…"
              className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div className="mt-6 flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <FileSignature className="h-4 w-4" /> امضا و صدور
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-input bg-card px-4 py-2.5 text-sm hover:bg-accent">
              <Printer className="h-4 w-4" /> چاپ نسخه
            </button>
          </div>
        </Card>

        {/* Print preview */}
        <Card className="p-5">
          <div className="text-[11px] text-muted-foreground mb-2">پیش‌نمایش چاپ</div>
          <div className="rounded-xl border border-border bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                  <PawPrint className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">کلینیک دامپزشکی پارسا</div>
                  <div className="text-[10px] text-muted-foreground">تهران — خیابان ولیعصر · ۰۲۱-۸۸۱۲۳۴۵۶</div>
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground">شماره: ۲۴۸۰۱</div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 text-[11px]">
              <div><span className="text-muted-foreground">بیمار:</span> میلو</div>
              <div><span className="text-muted-foreground">گونه:</span> گربه پرشین</div>
              <div><span className="text-muted-foreground">صاحب:</span> خانم رضایی</div>
              <div><span className="text-muted-foreground">تاریخ:</span> ۲ تیر ۱۴۰۵</div>
            </div>

            <div className="mt-3 pt-3 border-t">
              <div className="text-xs font-semibold mb-2">تشخیص: عفونت گوش خارجی</div>
              <ol className="space-y-1.5 text-[11px] list-decimal mr-4">
                {ITEMS.map((it,i) => (
                  <li key={i}><strong>{it.name}</strong> — <span className="text-muted-foreground">{it.dose}</span></li>
                ))}
              </ol>
            </div>

            <div className="mt-4 pt-3 border-t flex items-end justify-between">
              <div className="text-[10px] text-muted-foreground">
                <div>مهر و امضای دامپزشک</div>
              </div>
              <div className="text-center">
                <div className="font-[cursive] text-primary text-lg italic">Dr. Ahmadi</div>
                <div className="text-[10px] text-muted-foreground border-t pt-0.5 mt-0.5">دکتر علی احمدی — ن.ن ۱۲۴۵۶</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium mb-1.5 block">{label}</span>
      <input {...props} className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
    </label>
  );
}
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs font-medium mb-1.5 block">{label}</span>
      <select className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
