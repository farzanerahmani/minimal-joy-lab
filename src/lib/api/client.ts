// HTTP client برای ارتباط با بک‌اند Java Spring
// پایه: VITE_API_BASE_URL (پیش‌فرض: http://localhost:8080)

const BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, "") ||
  "http://localhost:8080";

const TOKEN_KEY = "petcare_token";
const USER_KEY = "petcare_user";

export type AuthUser = {
  id: string | number;
  fullName: string;
  email: string;
  role: "ADMIN" | "VET" | "SECRETARY" | string;
  clinicId?: string | number;
};

export const auth = {
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(TOKEN_KEY);
  },
  getUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  },
  setSession(token: string, user: AuthUser) {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  },
  isAuthenticated(): boolean {
    return Boolean(this.getToken());
  },
  hasRole(...roles: string[]): boolean {
    const u = this.getUser();
    return !!u && roles.includes(u.role);
  },
};

export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

type Options = Omit<RequestInit, "body"> & {
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined | null>;
  auth?: boolean; // پیش‌فرض true
};

function buildUrl(path: string, query?: Options["query"]) {
  const url = new URL(path.startsWith("http") ? path : `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

export async function api<T = unknown>(path: string, opts: Options = {}): Promise<T> {
  const { body, query, auth: useAuth = true, headers, ...rest } = opts;
  const h = new Headers(headers);
  if (body !== undefined && !(body instanceof FormData)) {
    h.set("Content-Type", "application/json");
  }
  h.set("Accept", "application/json");
  if (useAuth) {
    const token = auth.getToken();
    if (token) h.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(buildUrl(path, query), {
    ...rest,
    headers: h,
    body:
      body === undefined
        ? undefined
        : body instanceof FormData
        ? body
        : JSON.stringify(body),
  });

  const text = await res.text();
  const data = text ? safeJson(text) : null;

  if (!res.ok) {
    if (res.status === 401) auth.clear();
    let message = res.statusText || "خطای ارتباط با سرور";
    if (data && typeof data === "object" && "message" in data) {
      message = String((data as Record<string, unknown>).message);
    }
    throw new ApiError(message, res.status, data);
  }
  return data as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export const http = {
  get: <T = unknown>(p: string, o?: Options) => api<T>(p, { ...o, method: "GET" }),
  post: <T = unknown>(p: string, body?: unknown, o?: Options) => api<T>(p, { ...o, method: "POST", body }),
  put: <T = unknown>(p: string, body?: unknown, o?: Options) => api<T>(p, { ...o, method: "PUT", body }),
  patch: <T = unknown>(p: string, body?: unknown, o?: Options) => api<T>(p, { ...o, method: "PATCH", body }),
  delete: <T = unknown>(p: string, o?: Options) => api<T>(p, { ...o, method: "DELETE" }),
};
