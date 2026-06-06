// src/lib/requests/reportsPayout/index.ts

import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/generic";
import type { ReportsPayoutMetrics, ReportPayoutItem, VisitDetails } from "@/types/reportsPayout";

export const reportsPayoutRequests = {
	async getMetrics(): Promise<ApiResponse<ReportsPayoutMetrics>> {
		return apiClient.get<ApiResponse<ReportsPayoutMetrics>>(
			"/admin/reports-payouts/metrics",
			"Failed to load reports and payouts metrics.",
		);
	},

	async getList(): Promise<ApiResponse<ReportPayoutItem[]>> {
		return apiClient.get<ApiResponse<ReportPayoutItem[]>>(
			"/admin/reports-payouts/list",
			"Failed to load reports and payouts list.",
		);
	},

	async getReportDetails(id: string): Promise<ApiResponse<VisitDetails>> {
		return apiClient.get<ApiResponse<VisitDetails>>(
			`/admin/visits/${id}`,
			"Failed to load report details.",
		);
	},

	async approveVisit(visitId: string, isSupervisor: boolean): Promise<ApiResponse<any>> {
		const prefix = isSupervisor ? "/supervisor" : "/admin";
		return apiClient.patch<ApiResponse<any>>(
			`${prefix}/visits/${visitId}/approve`,
			{},
			"Failed to approve visit.",
		);
	},
};
