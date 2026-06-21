import { apiClient } from "./client";
import type {
  AuthResponse,
  DashboardSummary,
  LoginPayload,
  RegisterPayload,
} from "@/types/codestart";

export const codestartApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse, LoginPayload>("/api/auth/login", payload),
  register: (payload: RegisterPayload) =>
    apiClient.post<AuthResponse, RegisterPayload>("/api/auth/register", payload),
  logout: () => apiClient.post<{ message: string }, Record<string, never>>("/api/auth/logout", {}),
  user: () => apiClient.get<AuthResponse["user"]>("/api/auth/user"),
  dashboardSummary: () =>
    apiClient.get<DashboardSummary>("/api/dashboard/summary"),
};
