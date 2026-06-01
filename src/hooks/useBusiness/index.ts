// src/hooks/useBusiness/index.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { businessRequests } from "@/lib/requests/business";
import type {
	UpdateBusinessSettingsPayload,
	UpdateBusinessIncentivePayload,
} from "@/types/business";

export function useGetBusinessSettings() {
	return useQuery({
		queryKey: ["businessSettings"],
		queryFn: () => businessRequests.getSettings(),
		staleTime: 5 * 60 * 1000, // 5 min
	});
}

export function useUpdateBusinessSettings() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: UpdateBusinessSettingsPayload) => businessRequests.updateSettings(body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["businessSettings"] }).catch((err) => {
				console.error("Failed to invalidate businessSettings query:", err);
			});
			// Also invalidate getMe to sync business changes (logo, domain, plan)
			queryClient.invalidateQueries({ queryKey: ["me"] }).catch((err) => {
				console.error("Failed to invalidate me query:", err);
			});
		},
	});
}

export function useUpdateBusinessIncentive() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: UpdateBusinessIncentivePayload) =>
			businessRequests.updateIncentive(body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["businessSettings"] }).catch((err) => {
				console.error("Failed to invalidate businessSettings query:", err);
			});
		},
	});
}
