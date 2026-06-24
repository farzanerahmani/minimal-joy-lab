import { http, auth, type AuthUser } from "./client";

export type LoginPayload = { email: string; password: string };
export type LoginResponse = { token: string; user: AuthUser };

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const res = await http.post<LoginResponse>("/api/auth/login", payload, { auth: false });
    auth.setSession(res.token, res.user);
    return res;
  },
  async me(): Promise<AuthUser> {
    return http.get<AuthUser>("/api/auth/me");
  },
  logout() {
    auth.clear();
  },
};

// ---------- بیماران ----------
export type Patient = {
  id: number | string;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  ownerName: string;
  ownerPhone: string;
};

export const patientsService = {
  list: (q?: string) => http.get<Patient[]>("/api/patients", { query: { q } }),
  get: (id: string | number) => http.get<Patient>(`/api/patients/${id}`),
  create: (data: Omit<Patient, "id">) => http.post<Patient>("/api/patients", data),
  update: (id: string | number, data: Partial<Patient>) => http.put<Patient>(`/api/patients/${id}`, data),
  remove: (id: string | number) => http.delete<void>(`/api/patients/${id}`),
};

// ---------- ویزیت‌ها ----------
export type Visit = {
  id: number | string;
  patientId: number | string;
  vetId: number | string;
  date: string; // ISO
  reason: string;
  status: "SCHEDULED" | "DONE" | "CANCELLED";
};

export const visitsService = {
  list: (params?: { date?: string; patientId?: string | number }) =>
    http.get<Visit[]>("/api/visits", { query: params }),
  create: (data: Omit<Visit, "id">) => http.post<Visit>("/api/visits", data),
  update: (id: string | number, data: Partial<Visit>) => http.put<Visit>(`/api/visits/${id}`, data),
  remove: (id: string | number) => http.delete<void>(`/api/visits/${id}`),
};

// ---------- نسخه‌ها ----------
export type PrescriptionItem = { drug: string; dose: string; duration: string };
export type Prescription = {
  id: number | string;
  patientId: number | string;
  visitId?: number | string;
  date: string;
  notes?: string;
  items: PrescriptionItem[];
};

export const prescriptionsService = {
  list: (patientId?: string | number) =>
    http.get<Prescription[]>("/api/prescriptions", { query: { patientId } }),
  create: (data: Omit<Prescription, "id">) => http.post<Prescription>("/api/prescriptions", data),
  get: (id: string | number) => http.get<Prescription>(`/api/prescriptions/${id}`),
};

// ---------- یادآور واکسن ----------
export type Reminder = {
  id: number | string;
  patientId: number | string;
  vaccine: string;
  dueDate: string;
  status: "PENDING" | "SENT" | "FAILED" | "DONE";
};

export const remindersService = {
  list: (status?: Reminder["status"]) => http.get<Reminder[]>("/api/reminders", { query: { status } }),
  sendNow: (id: string | number) => http.post<Reminder>(`/api/reminders/${id}/send`),
};

// ---------- پیامک ----------
export type SmsMessage = { id: number | string; to: string; body: string; sentAt: string; status: string };
export const smsService = {
  list: () => http.get<SmsMessage[]>("/api/sms"),
  send: (to: string, body: string) => http.post<SmsMessage>("/api/sms", { to, body }),
};

// ---------- تعرفه ----------
export type Service = { id: number | string; name: string; price: number; active: boolean };
export const pricingService = {
  list: () => http.get<Service[]>("/api/services"),
  upsert: (data: Service) =>
    data.id ? http.put<Service>(`/api/services/${data.id}`, data) : http.post<Service>("/api/services", data),
  remove: (id: string | number) => http.delete<void>(`/api/services/${id}`),
};

// ---------- کاربران ----------
export type ClinicUser = { id: number | string; fullName: string; email: string; role: string; active: boolean };
export const usersService = {
  list: () => http.get<ClinicUser[]>("/api/users"),
  create: (data: Omit<ClinicUser, "id">) => http.post<ClinicUser>("/api/users", data),
  update: (id: string | number, data: Partial<ClinicUser>) => http.put<ClinicUser>(`/api/users/${id}`, data),
  remove: (id: string | number) => http.delete<void>(`/api/users/${id}`),
};

// ---------- تنظیمات کلینیک ----------
export type WorkingHour = { day: number; from: string; to: string; enabled: boolean };
export type SmsTemplate = { id?: number | string; name: string; body: string };
export type ReminderRule = { id?: number | string; type: string; daysBefore: number; templateName: string; retry: boolean };
export type ClinicSettings = {
  clinic: { name: string; phone: string; email: string; taxId: string; address: string };
  workingHours: WorkingHour[];
  smsTemplates: SmsTemplate[];
  reminders: ReminderRule[];
  smsSender: { name: string; line: string; sendTime: string; autoConfirm: boolean };
};

export const settingsService = {
  get: () => http.get<ClinicSettings>("/api/settings"),
  update: (data: Partial<ClinicSettings>) => http.put<ClinicSettings>("/api/settings", data),
};

// ---------- گزارش‌ها ----------
export type ReportSummary = {
  visitsToday: number;
  revenueToday: number;
  activePatients: number;
  pendingReminders: number;
};
export const reportsService = {
  summary: () => http.get<ReportSummary>("/api/reports/summary"),
  visitsByDay: (from?: string, to?: string) =>
    http.get<{ date: string; count: number }[]>("/api/reports/visits", { query: { from, to } }),
};
