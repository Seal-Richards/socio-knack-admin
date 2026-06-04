// src/hooks/useTerritory/index.ts

import { useMutation, useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import { territoryRequests, type CreateTerritoryPayload } from "@/lib/requests/territory";
import type { ApiResponse } from "@/types/generic";
import type { TerritorySalesTargetData } from "@/types/territory";

export function useGetTerritories() {
	return useQuery({
		queryKey: ["territories"],
		queryFn: () => territoryRequests.getTerritories(),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

export function useCreateTerritory() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: CreateTerritoryPayload) => territoryRequests.createTerritory(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["territories"] }).catch((err) => {
				console.error("Failed to invalidate territories query:", err);
			});
			// Also invalidate dashboard stats since activeTerritories might have changed
			queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] }).catch((err) => {
				console.error("Failed to invalidate dashboard stats query:", err);
			});
		},
	});
}

export function useAssignAgent() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ territoryId, agentId }: { territoryId: string; agentId: string }) =>
			territoryRequests.assignAgent(territoryId, agentId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["territories"] }).catch((err) => {
				console.error("Failed to invalidate territories query:", err);
			});
			queryClient.invalidateQueries({ queryKey: ["agents"] }).catch((err) => {
				console.error("Failed to invalidate agents query:", err);
			});
		},
	});
}

export function useUpdateTerritory() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			id,
			payload,
		}: {
			id: string;
			payload: Partial<CreateTerritoryPayload> & { status?: string };
		}) => territoryRequests.updateTerritory(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["territories"] }).catch((err) => {
				console.error("Failed to invalidate territories query:", err);
			});
		},
	});
}

export function useDeleteTerritory() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => territoryRequests.deleteTerritory(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["territories"] }).catch((err) => {
				console.error("Failed to invalidate territories query:", err);
			});
			queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] }).catch((err) => {
				console.error("Failed to invalidate dashboard stats query:", err);
			});
		},
	});
}

export function useGetTerritorySalesTarget(
	territoryId: string | null | undefined,
	period: "daily" | "weekly" | "monthly" = "monthly",
): UseQueryResult<ApiResponse<TerritorySalesTargetData>, Error> {
	return useQuery<ApiResponse<TerritorySalesTargetData>, Error>({
		queryKey: ["territory-sales-target", territoryId, period],
		queryFn: () => territoryRequests.getTerritorySalesTarget(territoryId || "", period),
		enabled: !!territoryId,
		staleTime: 60 * 1000,
	});
}
