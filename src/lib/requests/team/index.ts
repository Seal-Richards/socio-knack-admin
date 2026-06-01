// src/lib/requests/team/index.ts

import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/generic";
import type { UserProfileData } from "@/types/profile";

export const teamRequests = {
	async getSupervisors(): Promise<ApiResponse<UserProfileData[]>> {
		return apiClient.get<ApiResponse<UserProfileData[]>>(
			"/admin/supervisors",
			"Failed to load supervisors list.",
		);
	},

	async getAdmins(): Promise<ApiResponse<UserProfileData[]>> {
		return apiClient.get<ApiResponse<UserProfileData[]>>(
			"/admin/admins",
			"Failed to load admins list.",
		);
	},

	async getStaff(): Promise<ApiResponse<UserProfileData[]>> {
		return apiClient.get<ApiResponse<UserProfileData[]>>(
			"/admin/staff",
			"Failed to load staff list.",
		);
	},

	async updateUserRole(
		userId: string,
		role: string,
	): Promise<ApiResponse<{ id: string; role: string }>> {
		return apiClient.patch<ApiResponse<{ id: string; role: string }>, { role }>(
			`/admin/users/${userId}/role`,
			{ role },
			"Failed to update user role.",
		);
	},

	async updateUserStatus(
		userId: string,
		status: string,
	): Promise<ApiResponse<{ id: string; status: string }>> {
		return apiClient.patch<ApiResponse<{ id: string; status: string }>, { status }>(
			`/admin/users/${userId}/status`,
			{ status },
			"Failed to update user status.",
		);
	},
};
