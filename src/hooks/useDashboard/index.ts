import { dashboardRequests } from "@/lib/requests/dashboard";
import useBaseStatsQuery from "@/hooks/useBaseStatsQuery";

export function useGetDashboardStats() {
	return useBaseStatsQuery(["dashboard-stats"], () => dashboardRequests.getStats(), null, {
		staleTime: 60 * 1000,
	});
}

export function useGetDashboardVisits() {
	return useBaseStatsQuery(["dashboard-visits"], () => dashboardRequests.getVisits(), null, {
		staleTime: 60 * 1000,
	});
}

export function useGetPendingKYC() {
	return useBaseStatsQuery(["pending-kyc"], () => dashboardRequests.getPendingKYC(), null, {
		staleTime: 60 * 1000,
	});
}
