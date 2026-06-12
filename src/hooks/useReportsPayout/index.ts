// src/hooks/useReportsPayout/index.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reportsPayoutRequests } from "@/lib/requests/reportsPayout";

export function useGetReportsPayoutMetrics() {
	return useQuery({
		queryKey: ["reportsPayoutMetrics"],
		queryFn: () => reportsPayoutRequests.getMetrics(),
		staleTime: 5 * 60 * 1000, // 5 min
	});
}

export function useGetReportsPayoutList() {
	return useQuery({
		queryKey: ["reportsPayoutList"],
		queryFn: () => reportsPayoutRequests.getList(),
		staleTime: 5 * 60 * 1000, // 5 min
	});
}

export function useGetReportDetails(id: string) {
	return useQuery({
		queryKey: ["reportDetails", id],
		queryFn: () => reportsPayoutRequests.getReportDetails(id),
		staleTime: 5 * 60 * 1000,
		enabled: !!id,
	});
}

export function useApproveVisit() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, isSupervisor }: { id: string; isSupervisor: boolean }) =>
			reportsPayoutRequests.approveVisit(id, isSupervisor),
		onSuccess: async (res, variables) => {
			await queryClient.invalidateQueries({ queryKey: ["reportDetails", variables.id] });
			await queryClient.invalidateQueries({ queryKey: ["reportsPayoutList"] });
			await queryClient.invalidateQueries({ queryKey: ["reportsPayoutMetrics"] });
			await queryClient.invalidateQueries({ queryKey: ["dashboard-visits"] });
			await queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
		},
	});
}
