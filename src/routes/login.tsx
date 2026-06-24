import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PawPrint, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { authService } from "@/lib/api/services";
import { auth, ApiError } from "@/lib/api/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "ورود کلینیک — پت‌کر" },
      { name: "description", content: "ورود اعضای کلینیک به پنل مدیریت پت‌کر." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      <section className="relative hidden lg:flex flex-col justify-between p-12 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 80% 70%, white 0, transparent 35%)"
        }} />
        <Link to="/" className="relative flex items-center gap-3 hover:opacity-90">
          <div className="h-11 w-11 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
            <PawPrint className="h-6 w-6" />
          </div>
          <div>
            <div className="font-bold text-lg leading-tight">پت‌کر</div>
            <div className="text-xs opacity-75">سامانه کلینیک دامپزشکی</div>
          </div>
        </Link>

        <div className="relative space-y-5 max-w-md">
          <h1 className="text-4xl font-bold leading-snug">به پنل کلینیک خوش آمدید.</h1>
          <p className="text-sm leading-7 opacity-85">
            با حساب کاربری‌تان وارد شوید. دسترسی‌ها بر اساس نقش شما (مدیر، دامپزشک یا منشی) به‌صورت خودکار اعمال می‌شود.
          </p>
        </div>

        <Link to="/" className="relative inline-flex items-center gap-1 text-xs opacity-80 hover:opacity-100">
          <ArrowRight className="h-3.5 w-3.5" /> بازگشت به صفحه اصلی
        </Link>
      </section>

      <section className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-7">
          <div className="lg:hidden flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                <PawPrint className="h-5 w-5" />
              </div>
              <div className="font-bold">پت‌کر</div>
            </Link>
            <Link to="/" className="text-xs text-muted-foreground">بازگشت</Link>
          </div>

          <div>
            <h2 className="text-2xl font-bold">ورود به پنل کلینیک</h2>
            <p className="text-sm text-muted-foreground mt-1">ایمیل و رمز عبور خود را وارد کنید.</p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/app/dashboard" }); }}
          >
            <Field label="ایمیل یا نام کاربری" placeholder="you@clinic.com" defaultValue="dr.ahmadi@parsa.vet" />
            <Field label="رمز عبور" type="password" placeholder="••••••••" defaultValue="password" />
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="accent-primary" defaultChecked /> مرا به خاطر بسپار
              </label>
              <a href="#" className="text-primary hover:underline">فراموشی رمز؟</a>
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-sm shadow-primary/20"
            >
              ورود به پنل
              <ArrowLeft className="h-4 w-4" />
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center">
            کلینیک شما هنوز عضو پت‌کر نیست؟ <a href="/#contact" className="text-primary hover:underline">درخواست دمو</a>
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
