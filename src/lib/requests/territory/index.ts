// src/lib/requests/territory/index.ts

import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/generic";
import type { TerritoryData, TerritorySalesTargetData } from "@/types/territory";

export type CreateTerritoryPayload = {
	name: string;
	color: string;
	description?: string;
	salesTarget?: number;
	warningMessage?: string;
	boundary: {
		type: "Polygon";
		coordinates: number[][][];
	};
	assignedSupervisor?: string | null;
	assignedAgents?: string[];
};

export const territoryRequests = {
	async getTerritories(): Promise<ApiResponse<TerritoryData[]>> {
		return apiClient.get<ApiResponse<TerritoryData[]>>(
			"/admin/territories",
			"Failed to load territories list.",
		);
	},

	async createTerritory(payload: CreateTerritoryPayload): Promise<ApiResponse<TerritoryData>> {
		return apiClient.post<ApiResponse<TerritoryData>, CreateTerritoryPayload>(
			"/admin/territories",
			payload,
			"Failed to create territory zone.",
		);
	},

	async assignAgent(
		territoryId: string,
		agentId: string,
	): Promise<ApiResponse<{ message: string }>> {
		return apiClient.post<ApiResponse<{ message: string }>, { territoryId; agentId }>(
			"/admin/territories/assign",
			{ territoryId, agentId },
			"Failed to assign agent to territory.",
		);
	},

	async updateTerritory(
		id: string,
		payload: Partial<CreateTerritoryPayload> & { status?: string },
	): Promise<ApiResponse<TerritoryData>> {
		return apiClient.patch<
			ApiResponse<TerritoryData>,
			Partial<CreateTerritoryPayload> & { status?: string }
		>(`/admin/territories/${id}`, payload, "Failed to update territory zone.");
	},

	async deleteTerritory(id: string): Promise<ApiResponse<{ message: string }>> {
		return apiClient.delete<ApiResponse<{ message: string }>>(
			`/admin/territories/${id}`,
			"Failed to delete territory zone.",
		);
	},

	async getTerritorySalesTarget(
		id: string,
		period: "daily" | "weekly" | "monthly" = "monthly",
	): Promise<ApiResponse<TerritorySalesTargetData>> {
		return apiClient.get<ApiResponse<TerritorySalesTargetData>>(
			`/admin/territories/${id}/sales-target?period=${period}`,
			"Failed to load territory sales target chart data.",
		);
	},
};
