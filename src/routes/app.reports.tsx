import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";
import { TrendingUp, Stethoscope, Syringe, Wallet, Download } from "lucide-react";

export const Route = createFileRoute("/app/reports")({
  head: () => ({ meta: [{ title: "گزارش‌ها — پت‌کر" }, { name: "description", content: "گزارش عملکرد ویزیت، درآمد و واکسن کلینیک." }] }),
  component: Reports,
});

function Reports() {
  return (
    <AppShell
      title="گزارش‌ها"
      subtitle="نمای تحلیلی عملکرد کلینیک"
      action={
        <button className="inline-flex items-center gap-1.5 rounded-xl border border-input bg-card px-3.5 py-2 text-sm hover:bg-accent">
          <Download className="h-4 w-4" /> خروجی Excel
        </button>
      }
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <KPI icon={Stethoscope} label="ویزیت ماه" value="۴۸۲" delta="+۱۸٪" />
        <KPI icon={Syringe} label="واکسن ماه" value="۱۹۶" delta="+۹٪" />
        <KPI icon={Wallet} label="درآمد (تومان)" value="۸۴٫۵م" delta="+۱۲٪" />
        <KPI icon={TrendingUp} label="نرخ بازگشت" value="۷۲٪" delta="+۴٪" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <h3 className="font-semibold mb-1">روند ویزیت‌ها (۱۲ ماه گذشته)</h3>
          <p className="text-[11px] text-muted-foreground mb-5">سال ۱۴۰۴</p>
          <BigChart />
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold mb-4">پرتکرارترین خدمات</h3>
          <ul className="space-y-3">
            {[
              { name: "واکسیناسیون", pct: 36 },
              { name: "معاینه دوره‌ای", pct: 28 },
              { name: "ضد انگل", pct: 14 },
              { name: "جراحی", pct: 12 },
              { name: "سایر", pct: 10 },
            ].map((s) => (
              <li key={s.name}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>{s.name}</span>
                  <span className="font-bold tabular-nums">{s.pct}٪</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${s.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}

function KPI({ icon: Icon, label, value, delta }: { icon: any; label: string; value: string; delta: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-2xl font-bold mt-1">{value}</div>
          <div className="text-[11px] text-success mt-1.5">{delta}</div>
        </div>
        <div className="h-10 w-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

function BigChart() {
  const months = ["فر","ار","خر","تی","مر","شه","مه","آب","آذ","دی","به","اس"];
  const data = [28, 32, 35, 40, 38, 42, 45, 48, 52, 49, 55, 60];
  const max = 60;
  return (
    <svg viewBox="0 0 600 220" className="w-full h-56">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.48 0.08 195)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.48 0.08 195)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0,1,2,3].map(i => (
        <line key={i} x1="30" x2="590" y1={30 + i*45} y2={30 + i*45} stroke="oklch(0.9 0.012 100)" strokeDasharray="3 4" />
      ))}
      {(() => {
        const pts = data.map((d,i) => `${30 + (i*(560/11))},${200 - (d/max)*170}`).join(" ");
        const area = `30,200 ${pts} 590,200`;
        return (
          <>
            <polygon points={area} fill="url(#g)" />
            <polyline points={pts} fill="none" stroke="oklch(0.48 0.08 195)" strokeWidth="2.5" />
            {data.map((d,i) => (
              <circle key={i} cx={30 + (i*(560/11))} cy={200 - (d/max)*170} r="3.5" fill="oklch(0.48 0.08 195)" />
            ))}
          </>
        );
      })()}
      {months.map((m,i) => (
        <text key={m} x={30 + (i*(560/11))} y="215" textAnchor="middle" fontSize="10" fill="oklch(0.5 0.02 210)">{m}</text>
      ))}
    </svg>
  );
}
