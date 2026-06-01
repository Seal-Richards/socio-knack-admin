// src/lib/requests/business/index.ts

import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/generic";
import type {
	BusinessSettingsData,
	UpdateBusinessSettingsPayload,
	UpdateBusinessIncentivePayload,
} from "@/types/business";

export const businessRequests = {
	async getSettings(): Promise<ApiResponse<BusinessSettingsData>> {
		return apiClient.get<ApiResponse<BusinessSettingsData>>(
			"/admin/business/settings",
			"Failed to load business settings.",
		);
	},

	async updateSettings(
		body: UpdateBusinessSettingsPayload,
	): Promise<ApiResponse<BusinessSettingsData>> {
		return apiClient.patch<ApiResponse<BusinessSettingsData>, UpdateBusinessSettingsPayload>(
			"/admin/business/settings",
			body,
			"Failed to update business settings.",
		);
	},

	async updateIncentive(
		body: UpdateBusinessIncentivePayload,
	): Promise<ApiResponse<BusinessSettingsData>> {
		return apiClient.patch<ApiResponse<BusinessSettingsData>, UpdateBusinessIncentivePayload>(
			"/admin/business/incentive",
			body,
			"Failed to update incentive configuration.",
		);
	},
};
