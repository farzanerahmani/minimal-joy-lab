import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PawPrint, Stethoscope, ShieldCheck, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ورود — پت‌کر" },
      { name: "description", content: "ورود به سامانه مدیریت کلینیک دامپزشکی پت‌کر." },
    ],
  }),
  component: LoginPage,
});

const ROLES = [
  { id: "admin", label: "مدیر سیستم", icon: ShieldCheck, desc: "دسترسی کامل" },
  { id: "vet", label: "دامپزشک", icon: Stethoscope, desc: "ویزیت و نسخه" },
  { id: "secretary", label: "منشی", icon: PawPrint, desc: "پذیرش و نوبت‌دهی" },
] as const;

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("vet");

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* Brand panel */}
      <section className="relative hidden lg:flex flex-col justify-between p-12 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 80% 70%, white 0, transparent 35%)"
        }} />
        <div className="relative flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
            <PawPrint className="h-6 w-6" />
          </div>
          <div>
            <div className="font-bold text-lg leading-tight">پت‌کر</div>
            <div className="text-xs opacity-75">سامانه کلینیک دامپزشکی</div>
          </div>
        </div>

        <div className="relative space-y-6 max-w-md">
          <h1 className="text-4xl font-bold leading-snug">
            مراقبت دقیق‌تر،
            <br />
            مدیریت ساده‌تر.
          </h1>
          <p className="text-sm leading-7 opacity-85">
            از پذیرش بیمار تا نسخه‌نویسی، یادآور واکسن و پیامک خودکار — همه‌چیز در یک پنل مینیمال و سریع.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-4">
            {[
              { n: "۱۲٬۴۰۰", l: "پرونده فعال" },
              { n: "۸۹٪", l: "حضور به‌موقع" },
              { n: "۲۴/۷", l: "یادآور پیامکی" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-white/10 p-3 backdrop-blur">
                <div className="text-lg font-bold">{s.n}</div>
                <div className="text-[11px] opacity-80">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs opacity-70">© ۱۴۰۵ پت‌کر</div>
      </section>

      {/* Form */}
      <section className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-7">
          <div className="lg:hidden flex items-center gap-2 mb-2">
            <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
              <PawPrint className="h-5 w-5" />
            </div>
            <div className="font-bold">پت‌کر</div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">ورود به حساب</h2>
            <p className="text-sm text-muted-foreground mt-1">نقش خود را انتخاب و وارد شوید.</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {ROLES.map((r) => {
              const Icon = r.icon;
              const active = role === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`group rounded-xl border p-3 text-right transition ${
                    active
                      ? "border-primary bg-primary-soft/60 ring-1 ring-primary"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <Icon className={`h-5 w-5 mb-2 ${active ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="text-sm font-semibold">{r.label}</div>
                  <div className="text-[11px] text-muted-foreground">{r.desc}</div>
                </button>
              );
            })}
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/app/dashboard" });
            }}
          >
            <Field label="نام کاربری" placeholder="مثلاً dr.ahmadi" defaultValue="dr.ahmadi" />
            <Field label="رمز عبور" type="password" placeholder="••••••••" defaultValue="password" />
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="accent-primary" defaultChecked />
              مرا به خاطر بسپار
            </label>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-sm shadow-primary/20"
            >
              ورود به پنل
              <ArrowLeft className="h-4 w-4" />
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center">
            مشکل در ورود؟ با مدیر سیستم تماس بگیرید.
          </p>
        </div>
      </section>
    </main>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-foreground/80 mb-1.5 block">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition"
      />
    </label>
  );
}
