import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardRequests, type ScheduleVisitPayload } from "@/lib/requests/dashboard";
import useBaseStatsQuery from "@/hooks/useBaseStatsQuery";
import type { ApiResponse } from "@/types/generic";
import type { VisitData } from "@/types/dashboard";

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

export function useCreateVisit() {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<VisitData>, Error, ScheduleVisitPayload>({
		mutationFn: (payload: ScheduleVisitPayload) => dashboardRequests.scheduleVisit(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["dashboard-visits"] }).catch((err) => {
				console.error("Failed to invalidate dashboard-visits query:", err);
			});
			queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] }).catch((err) => {
				console.error("Failed to invalidate dashboard-stats query:", err);
			});
		},
	});
}

export function useUpdateVisit() {
	const queryClient = useQueryClient();
	return useMutation<
		ApiResponse<VisitData>,
		Error,
		{
			visitId: string;
			payload: Partial<ScheduleVisitPayload> & { status?: string };
		}
	>({
		mutationFn: ({
			visitId,
			payload,
		}: {
			visitId: string;
			payload: Partial<ScheduleVisitPayload> & { status?: string };
		}) => dashboardRequests.updateVisit(visitId, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["dashboard-visits"] }).catch((err) => {
				console.error("Failed to invalidate dashboard-visits query:", err);
			});
			queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] }).catch((err) => {
				console.error("Failed to invalidate dashboard-stats query:", err);
			});
		},
	});
}
