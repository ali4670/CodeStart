import { useQuery } from "@tanstack/react-query";
import { codestartApi } from "@/lib/api/codestart";
import { dashboardFallback } from "@/lib/api/fallback-data";

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["codestart", "dashboard-summary"],
    queryFn: async () => {
      try {
        return await codestartApi.dashboardSummary();
      } catch {
        return dashboardFallback;
      }
    },
  });
}
