import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/generic";
import type { DashboardStats, VisitData, PendingKYCUser } from "@/types/dashboard";

export const dashboardRequests = {
	async getStats(): Promise<ApiResponse<DashboardStats>> {
		return apiClient.get<ApiResponse<DashboardStats>>(
			"/admin/stats",
			"Failed to load dashboard stats.",
		);
	},

	async getVisits(): Promise<ApiResponse<VisitData[]>> {
		return apiClient.get<ApiResponse<VisitData[]>>(
			"/admin/visits",
			"Failed to load tasks/visits.",
		);
	},

	async getPendingKYC(): Promise<ApiResponse<PendingKYCUser[]>> {
		return apiClient.get<ApiResponse<PendingKYCUser[]>>(
			"/admin/kyc/pending",
			"Failed to load pending KYC users.",
		);
	},
};
