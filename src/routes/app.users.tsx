import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Badge, PrimaryButton } from "@/components/AppShell";
import { ShieldCheck, Check } from "lucide-react";

export const Route = createFileRoute("/app/users")({
  head: () => ({ meta: [{ title: "کاربران و دسترسی — پت‌کر" }, { name: "description", content: "مدیریت کاربران، نقش‌ها و دسترسی‌های پنل." }] }),
  component: Users,
});

const USERS = [
  { name: "دکتر علی احمدی", role: "دامپزشک", email: "ahmadi@parsa.vet", status: "فعال" },
  { name: "دکتر سارا کریمی", role: "دامپزشک", email: "karimi@parsa.vet", status: "فعال" },
  { name: "نگار پارسا", role: "منشی", email: "negar@parsa.vet", status: "فعال" },
  { name: "محسن یوسفی", role: "مدیر سیستم", email: "admin@parsa.vet", status: "فعال" },
  { name: "زهرا مهدوی", role: "منشی", email: "z.mahdavi@parsa.vet", status: "غیرفعال" },
];

const PERMS = [
  { feat: "مشاهده بیماران", admin: true, vet: true, sec: true },
  { feat: "ثبت/ویرایش بیمار", admin: true, vet: true, sec: true },
  { feat: "ثبت ویزیت و نسخه", admin: true, vet: true, sec: false },
  { feat: "ارسال پیامک", admin: true, vet: true, sec: true },
  { feat: "مدیریت تعرفه", admin: true, vet: false, sec: false },
  { feat: "گزارش‌های مالی", admin: true, vet: false, sec: false },
  { feat: "مدیریت کاربران", admin: true, vet: false, sec: false },
];

function Users() {
  return (
    <AppShell
      title="کاربران و دسترسی"
      subtitle="مدیریت اعضای تیم و سطح دسترسی‌ها"
      action={<PrimaryButton>کاربر جدید</PrimaryButton>}
    >
      <div className="grid lg:grid-cols-[1fr_460px] gap-4">
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-right text-[11px] uppercase text-muted-foreground bg-muted/40">
              <tr>
                <th className="py-3 px-4 font-medium">کاربر</th>
                <th className="py-3 px-4 font-medium">نقش</th>
                <th className="py-3 px-4 font-medium">وضعیت</th>
                <th className="py-3 px-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {USERS.map((u) => (
                <tr key={u.email} className="hover:bg-muted/40">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                        {u.name.split(" ")[1]?.[0] ?? u.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold">{u.name}</div>
                        <div className="text-[11px] text-muted-foreground">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge tone={u.role === "مدیر سیستم" ? "info" : u.role === "دامپزشک" ? "success" : "default"}>{u.role}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge tone={u.status === "فعال" ? "success" : "destructive"}>{u.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-left">
                    <button className="text-xs text-primary hover:underline">ویرایش</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">سطح دسترسی نقش‌ها</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-[10px] uppercase text-muted-foreground">
                <tr>
                  <th className="text-right py-2">قابلیت</th>
                  <th className="py-2">مدیر</th>
                  <th className="py-2">دامپزشک</th>
                  <th className="py-2">منشی</th>
                </tr>
              </thead>
              <tbody>
                {PERMS.map((p) => (
                  <tr key={p.feat} className="border-t border-border">
                    <td className="py-2.5 text-right">{p.feat}</td>
                    <Cell on={p.admin} />
                    <Cell on={p.vet} />
                    <Cell on={p.sec} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-muted-foreground mt-4 leading-6">
            تنها مدیر سیستم می‌تواند نقش‌ها و دسترسی‌ها را تغییر دهد. تغییرات بلافاصله اعمال می‌شوند.
          </p>
        </Card>
      </div>
    </AppShell>
  );
}

function Cell({ on }: { on: boolean }) {
  return (
    <td className="py-2.5 text-center">
      {on ? (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
          <Check className="h-3 w-3" />
        </span>
      ) : (
        <span className="inline-block h-1 w-3 rounded bg-border" />
      )}
    </td>
  );
}
