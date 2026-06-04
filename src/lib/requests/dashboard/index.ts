import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/generic";
import type { DashboardStats, VisitData, PendingKYCUser } from "@/types/dashboard";

export type ScheduleVisitPayload = {
	title: string;
	subtitle?: string;
	agentId?: string;
	territoryId?: string;
	scheduledDate: string;
	location?: {
		address: string;
		coordinates: number[]; // [lng, lat]
	};
	priority?: string;
	incentiveType?: string;
	incentiveValue?: number;
	checklist?: Array<{ title: string; isCompleted?: boolean }>;
};

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

	async scheduleVisit(payload: ScheduleVisitPayload): Promise<ApiResponse<VisitData>> {
		return apiClient.post<ApiResponse<VisitData>, ScheduleVisitPayload>(
			"/admin/visit/schedule",
			payload,
			"Failed to schedule new task/visit.",
		);
	},

	async updateVisit(
		visitId: string,
		payload: Partial<ScheduleVisitPayload> & { status?: string },
	): Promise<ApiResponse<VisitData>> {
		return apiClient.patch<
			ApiResponse<VisitData>,
			Partial<ScheduleVisitPayload> & { status?: string }
		>(`/admin/visits/${visitId}`, payload, "Failed to update task/visit.");
	},
};
