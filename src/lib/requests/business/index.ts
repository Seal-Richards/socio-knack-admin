// src/lib/requests/business/index.ts

import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/generic";
import type {
	BusinessSettingsData,
	UpdateBusinessSettingsPayload,
	UpdateBusinessIncentivePayload,
	SetupBusinessPayload,
	LinkBankPayload,
	InitializeSubscriptionPayload,
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

	async setupBusiness(body: SetupBusinessPayload): Promise<ApiResponse<any>> {
		return apiClient.post<ApiResponse<any>, SetupBusinessPayload>(
			"/admin/setup-business",
			body,
			"Failed to set up business details.",
		);
	},

	async uploadBusinessKyc(formData: FormData): Promise<ApiResponse<any>> {
		return apiClient.post<ApiResponse<any>, FormData>(
			"/admin/kyc/upload",
			formData,
			"Failed to upload business KYC documents.",
		);
	},

	async uploadOwnerId(formData: FormData): Promise<ApiResponse<any>> {
		return apiClient.post<ApiResponse<any>, FormData>(
			"/admin/kyc/owner-upload",
			formData,
			"Failed to upload owner ID document.",
		);
	},

	async linkBank(body: LinkBankPayload): Promise<ApiResponse<any>> {
		return apiClient.post<ApiResponse<any>, LinkBankPayload>(
			"/admin/link-bank",
			body,
			"Failed to link settlement bank details.",
		);
	},

	async initializeSubscription(
		body: InitializeSubscriptionPayload,
	): Promise<ApiResponse<{ link: string }>> {
		return apiClient.post<ApiResponse<{ link: string }>, InitializeSubscriptionPayload>(
			"/admin/subscription/initialize",
			body,
			"Failed to initialize subscription payment.",
		);
	},

	async verifySubscription(transactionId: string): Promise<ApiResponse<any>> {
		return apiClient.get<ApiResponse<any>>(
			`/admin/subscription/verify?transaction_id=${transactionId}`,
			"Failed to verify subscription status.",
		);
	},
};
