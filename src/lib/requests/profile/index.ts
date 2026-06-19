// src/lib/requests/profile/index.ts

import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/generic";
import type {
	UserProfileData,
	UpdateProfilePayload,
	UpdatePasswordPayload,
	NigeriaStatesAndCities,
} from "@/types/profile";

export const profileRequests = {
	/** GET /auth/me — returns the logged-in user's full profile for any role */
	async getMe(): Promise<ApiResponse<UserProfileData>> {
		return apiClient.get<ApiResponse<UserProfileData>>(
			"/auth/me",
			"Failed to load user profile.",
		);
	},

	async updateProfile(body: UpdateProfilePayload): Promise<ApiResponse<UserProfileData>> {
		return apiClient.patch<ApiResponse<UserProfileData>, UpdateProfilePayload>(
			"/auth/profile",
			body,
			"Failed to update profile settings.",
		);
	},

	async updatePassword(body: UpdatePasswordPayload): Promise<ApiResponse<null>> {
		return apiClient.post<ApiResponse<null>, UpdatePasswordPayload>(
			"/auth/update-password",
			body,
			"Failed to update security password.",
		);
	},
	async uploadPersonalKyc(formData: FormData, isSupervisor = false): Promise<ApiResponse<any>> {
		const url = isSupervisor ? "/supervisor/kyc/upload" : "/admin/kyc/owner-upload";
		return apiClient.post<ApiResponse<any>, FormData>(
			url,
			formData,
			"Failed to upload personal KYC document.",
		);
	},
	async getNigeriaData(): Promise<ApiResponse<NigeriaStatesAndCities>> {
		return apiClient.get<ApiResponse<NigeriaStatesAndCities>>(
			"/auth/nigeria-data",
			"Failed to load Nigeria states and cities.",
		);
	},
};
