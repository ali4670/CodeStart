import { toast } from "sonner";

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiRequestOptions<TBody> {
  method?: RequestMethod;
  body?: TBody;
  showErrorToast?: boolean;
}

async function ensureCsrfCookie() {
  await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
    credentials: "include",
  }).catch(() => undefined);
}

function readCookie(name: string) {
  return document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.split("=")[1];
}

export async function apiRequest<TResponse, TBody = unknown>(
  path: string,
  options: ApiRequestOptions<TBody> = {},
): Promise<TResponse> {
  const method = options.method ?? "GET";

  if (method !== "GET") {
    await ensureCsrfCookie();
  }

  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const xsrfToken = readCookie("XSRF-TOKEN");
  if (xsrfToken) {
    headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrfToken);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: "include",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null && "message" in data
        ? String(data.message)
        : "CodeStart API request failed.";
    const error = new ApiError(message, response.status, data);
    if (options.showErrorToast !== false) {
      toast.error(message);
    }
    throw error;
  }

  return data as TResponse;
}

export const apiClient = {
  get: <TResponse>(path: string) => apiRequest<TResponse>(path),
  post: <TResponse, TBody>(path: string, body: TBody) =>
    apiRequest<TResponse, TBody>(path, { method: "POST", body }),
  put: <TResponse, TBody>(path: string, body: TBody) =>
    apiRequest<TResponse, TBody>(path, { method: "PUT", body }),
  delete: <TResponse>(path: string) =>
    apiRequest<TResponse>(path, { method: "DELETE" }),
};

export { API_BASE_URL };
