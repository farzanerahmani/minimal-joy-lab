import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PawPrint, Stethoscope, Syringe, MessageSquare, BarChart3, ShieldCheck,
  ArrowLeft, Sparkles, Clock, CheckCircle2, Calendar, FileText, Heart
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "پت‌کر — سامانه هوشمند کلینیک‌های دامپزشکی" },
      { name: "description", content: "مدیریت یکپارچه‌ی پذیرش، نسخه، یادآور واکسن و ارتباط با صاحبان حیوانات در یک پنل مینیمال." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Logos />
      <About />
      <Features />
      <WhyUs />
      <Blog />
      <ComingSoon />
      <Contact />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-background/70 border-b border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
            <PawPrint className="h-5 w-5" />
          </div>
          <div className="font-bold">پت‌کر</div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#about" className="hover:text-foreground">معرفی</a>
          <a href="#features" className="hover:text-foreground">امکانات</a>
          <a href="#why" className="hover:text-foreground">چرا ما</a>
          <a href="#blog" className="hover:text-foreground">بلاگ</a>
          <a href="#contact" className="hover:text-foreground">ارتباط با ما</a>
        </nav>
        <div className="flex-1" />
        <Link
          to="/login"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-sm shadow-primary/20"
        >
          ورود کلینیک‌ها
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60" style={{
        backgroundImage: "radial-gradient(60% 50% at 80% 10%, oklch(var(--primary) / 0.18) 0, transparent 60%), radial-gradient(50% 40% at 10% 30%, oklch(var(--primary) / 0.10) 0, transparent 60%)"
      }} />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> نسخه‌ی جدید با یادآور هوشمند پیامکی
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            مراقبت دقیق‌تر،
            <br />
            <span className="text-primary">مدیریت ساده‌تر کلینیک</span>
          </h1>
          <p className="text-muted-foreground leading-8 max-w-lg">
            پت‌کر ابزار یکپارچه‌ی پذیرش، پرونده‌ی پزشکی، نسخه‌نویسی، یادآور واکسن و گزارش‌گیری برای کلینیک‌های دامپزشکی است — سریع، مینیمال و کاملاً فارسی.
          </p>
          <div className="flex items-center gap-3">
            <Link to="/login" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-sm shadow-primary/20">
              شروع کنید
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <a href="#features" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium hover:bg-accent">
              امکانات
            </a>
          </div>
          <div className="flex items-center gap-6 pt-4 text-xs text-muted-foreground">
            <Stat n="۱۲٬۴۰۰+" l="پرونده فعال" />
            <Stat n="۸۹٪" l="حضور به‌موقع" />
            <Stat n="۲۴/۷" l="یادآور پیامکی" />
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[5/4] rounded-3xl border border-border bg-card p-5 shadow-xl shadow-primary/5">
            <div className="flex items-center gap-2 pb-4 border-b border-border">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
              <div className="flex-1 text-center text-[11px] text-muted-foreground">پت‌کر / داشبورد</div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { n: "۲۴", l: "ویزیت امروز", i: Stethoscope, c: "bg-primary-soft text-primary" },
                { n: "۹", l: "واکسن", i: Syringe, c: "bg-success/15 text-success" },
                { n: "۱۷", l: "پیامک", i: MessageSquare, c: "bg-info/15 text-info" },
              ].map((k) => {
                const Icon = k.i;
                return (
                  <div key={k.l} className="rounded-2xl border border-border p-3">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center mb-2 ${k.c}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-lg font-bold">{k.n}</div>
                    <div className="text-[11px] text-muted-foreground">{k.l}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 rounded-2xl border border-border p-4">
              <div className="text-xs text-muted-foreground mb-2">روند ویزیت‌ها</div>
              <svg viewBox="0 0 300 80" className="w-full h-20">
                <polyline fill="none" stroke="oklch(var(--primary))" strokeWidth="2.5"
                  points="0,60 40,50 80,55 120,30 160,40 200,18 240,28 280,12 300,20" />
                <polyline fill="oklch(var(--primary) / 0.12)" stroke="none"
                  points="0,60 40,50 80,55 120,30 160,40 200,18 240,28 280,12 300,20 300,80 0,80" />
              </svg>
            </div>
          </div>
          <div className="absolute -bottom-5 -right-5 rounded-2xl bg-card border border-border p-3 shadow-lg hidden sm:flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-success/15 text-success flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">پیامک یادآور</div>
              <div className="text-sm font-semibold">ارسال موفق به ۹ صاحب</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="text-foreground font-bold text-base">{n}</div>
      <div>{l}</div>
    </div>
  );
}

function Logos() {
  const names = ["پارسا‌وت", "حیوان‌دوست", "پت‌هاوس", "دامپزشکی مهر", "وت‌کر", "آرامش"];
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 flex flex-wrap items-center justify-between gap-6 text-xs text-muted-foreground">
        <div>اعتماد کلینیک‌های پیشرو در ایران</div>
        <div className="flex flex-wrap items-center gap-6 opacity-70">
          {names.map((n) => <span key={n} className="font-semibold">{n}</span>)}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
        <div>
          <span className="text-xs uppercase tracking-wide text-primary font-bold">معرفی ما</span>
          <h2 className="text-3xl font-bold mt-2 leading-snug">ساخته‌شده توسط تیمی که کلینیک را از نزدیک می‌شناسد.</h2>
        </div>
        <div className="space-y-4 text-muted-foreground leading-8">
          <p>
            پت‌کر را با کمک دامپزشکان و منشی‌های فعال طراحی کردیم تا هر کاری که هر روز در کلینیک تکرار می‌شود — از پذیرش بیمار تا یادآوری واکسن — ساده، سریع و خطاکم باشد.
          </p>
          <p>
            ما به ابزار مینیمال، رابط فارسی روان و یکپارچگی واقعی با پیامک باور داریم. هدف‌مان این است که شما زمان بیشتری برای حیوان داشته باشید، نه برای نرم‌افزار.
          </p>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { i: Stethoscope, t: "پذیرش و ویزیت", d: "ثبت سریع نوبت، صف ویزیت روزانه و دسترسی فوری به پرونده." },
  { i: FileText, t: "نسخه‌نویسی دیجیتال", d: "نسخه‌های قابل پرینت و پیامک با قالب‌های آماده." },
  { i: Syringe, t: "یادآور واکسن", d: "صف هوشمند واکسیناسیون و پیامک خودکار به صاحبان." },
  { i: MessageSquare, t: "پیامک کلینیک", d: "ارسال انبوه با قالب و تاریخچه گفتگو در یک صفحه." },
  { i: BarChart3, t: "گزارش‌های مدیریتی", d: "نمودار درآمد، حضور و عملکرد دامپزشک‌ها." },
  { i: ShieldCheck, t: "کنترل دسترسی", d: "نقش‌های مدیر، دامپزشک و منشی با ماتریس دسترسی." },
];

function Features() {
  return (
    <section id="features" className="bg-muted/30 border-y border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-wide text-primary font-bold">کارهایی که می‌کنیم</span>
          <h2 className="text-3xl font-bold mt-2">همه چیزی که یک کلینیک مدرن نیاز دارد</h2>
          <p className="text-muted-foreground mt-3 leading-7">یک پنل واحد، بدون پرش بین چند سیستم.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => {
            const Icon = f.i;
            return (
              <div key={f.t} className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition">
                <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-semibold mb-1">{f.t}</div>
                <p className="text-sm text-muted-foreground leading-7">{f.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const WHY = [
  { i: Heart, t: "تجربه‌ی فارسی واقعی", d: "راست‌به‌چپ، تقویم شمسی و واژگان آشنای دامپزشکی." },
  { i: Clock, t: "راه‌اندازی در یک روز", d: "بدون نصب پیچیده — همان روز پذیرش بیمار را شروع کنید." },
  { i: ShieldCheck, t: "امنیت و پشتیبان‌گیری", d: "داده‌های شما رمزنگاری شده و روزانه پشتیبان‌گیری می‌شود." },
];

function WhyUs() {
  return (
    <section id="why" className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-wide text-primary font-bold">چرا پت‌کر</span>
        <h2 className="text-3xl font-bold mt-2">چرا کلینیک‌ها ما را انتخاب می‌کنند</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {WHY.map((w) => {
          const Icon = w.i;
          return (
            <div key={w.t} className="rounded-2xl border border-border bg-card p-6">
              <div className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <div className="font-semibold mb-1">{w.t}</div>
              <p className="text-sm text-muted-foreground leading-7">{w.d}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const POSTS = [
  { tag: "راهنما", t: "چطور واکسیناسیون دوره‌ای را برای کلینیک‌تان خودکار کنیم؟", d: "گام‌به‌گام تنظیم یادآور هوشمند و قالب پیامک مؤثر.", time: "۵ دقیقه" },
  { tag: "تجربه", t: "کاهش ۴۰٪ نوبت‌های ازدست‌رفته با پیامک یادآور", d: "تجربه‌ی کلینیک پارسا در سه ماه استفاده از پت‌کر.", time: "۴ دقیقه" },
  { tag: "آموزش", t: "نسخه‌نویسی استاندارد برای حیوانات خانگی", d: "نکته‌های دوزاژ و قالب آماده برای داروهای پرتکرار.", time: "۷ دقیقه" },
];

function Blog() {
  return (
    <section id="blog" className="bg-muted/30 border-y border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-bold">بلاگ پت‌کر</span>
            <h2 className="text-3xl font-bold mt-2">از تجربه‌ی کلینیک‌های واقعی</h2>
          </div>
          <a href="#" className="text-sm text-primary hover:underline">همه نوشته‌ها</a>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {POSTS.map((p) => (
            <article key={p.t} className="rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 transition">
              <div className="h-36 bg-gradient-to-br from-primary/20 via-primary-soft to-background" />
              <div className="p-5 space-y-2">
                <span className="inline-flex text-[11px] font-medium text-primary bg-primary-soft rounded-full px-2 py-0.5">{p.tag}</span>
                <h3 className="font-semibold leading-7">{p.t}</h3>
                <p className="text-sm text-muted-foreground leading-7">{p.d}</p>
                <div className="text-[11px] text-muted-foreground pt-2">{p.time} مطالعه</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const SOON = [
  { t: "اپلیکیشن صاحبان حیوان", d: "مشاهده پرونده، نوبت و یادآور واکسن از موبایل." },
  { t: "پرداخت آنلاین", d: "تسویه فاکتور ویزیت با درگاه ایرانی." },
  { t: "هوش مصنوعی تشخیص", d: "پیشنهاد افتراقی بر اساس علائم ثبت‌شده." },
];

function ComingSoon() {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
      <div className="rounded-3xl border border-border bg-card p-8 sm:p-12">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-xs uppercase tracking-wide text-primary font-bold">به‌زودی</span>
        </div>
        <h2 className="text-3xl font-bold mb-8">قابلیت‌هایی که در راه است</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {SOON.map((s) => (
            <div key={s.t} className="rounded-2xl border border-dashed border-border p-5">
              <div className="text-xs text-muted-foreground mb-2">Coming soon</div>
              <div className="font-semibold mb-1">{s.t}</div>
              <p className="text-sm text-muted-foreground leading-7">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-wide opacity-80 font-bold">ارتباط با ما</span>
          <h2 className="text-3xl font-bold leading-snug">آماده‌ی شروع هستید؟ ما در کنارتان هستیم.</h2>
          <p className="opacity-85 leading-8">برای دموی رایگان یا مشاوره راه‌اندازی، فرم را پر کنید یا مستقیم تماس بگیرید.</p>
          <div className="text-sm space-y-1 opacity-90 pt-2">
            <div>تلفن: ۰۲۱-۸۸۰۰۰۰۰۰</div>
            <div>ایمیل: hello@petcare.app</div>
            <div>تهران، خیابان ولیعصر، پلاک ۱۲۳</div>
          </div>
        </div>
        <form className="rounded-2xl bg-background text-foreground p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="نام کلینیک" placeholder="مثلاً کلینیک پارسا" />
            <Field label="نام شما" placeholder="نام و نام خانوادگی" />
          </div>
          <Field label="شماره تماس" placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
          <label className="block">
            <span className="text-xs font-medium text-foreground/80 mb-1.5 block">پیام شما</span>
            <textarea rows={4} className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <button className="w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold hover:bg-primary/90 transition">ارسال درخواست</button>
        </form>
      </div>
    </section>
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

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
            <PawPrint className="h-4 w-4" />
          </div>
          <span>© ۱۴۰۵ پت‌کر — تمام حقوق محفوظ است.</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#about" className="hover:text-foreground">معرفی</a>
          <a href="#blog" className="hover:text-foreground">بلاگ</a>
          <a href="#contact" className="hover:text-foreground">تماس</a>
          <Link to="/login" className="hover:text-foreground">ورود کلینیک‌ها</Link>
        </div>
      </div>
    </footer>
  );
}
