// src/lib/requests/team/index.ts

import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/generic";
import type { UserProfileData, InvitationData } from "@/types/profile";

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

	async getSupervisorById(id: string): Promise<ApiResponse<UserProfileData>> {
		return apiClient.get<ApiResponse<UserProfileData>>(
			`/admin/supervisors/${id}`,
			"Failed to load supervisor details.",
		);
	},

	async logout(): Promise<ApiResponse<unknown>> {
		return apiClient.post<ApiResponse<unknown>, undefined>(
			"/auth/logout",
			undefined,
			"Failed to log out.",
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
		payload: { status?: string; kycStatus?: string },
	): Promise<ApiResponse<{ id: string; status: string }>> {
		return apiClient.patch<
			ApiResponse<{ id: string; status: string }>,
			{ status?: string; kycStatus?: string }
		>(`/admin/users/${userId}/status`, payload, "Failed to update user status.");
	},

	async getInvitations(): Promise<ApiResponse<InvitationData[]>> {
		return apiClient.get<ApiResponse<InvitationData[]>>(
			"/admin/invitations",
			"Failed to load invitations list.",
		);
	},

	async cancelInvitation(invitationId: string): Promise<ApiResponse<InvitationData>> {
		return apiClient.post<ApiResponse<InvitationData>, undefined>(
			`/admin/invitations/${invitationId}/cancel`,
			undefined,
			"Failed to cancel invitation.",
		);
	},

	async deleteInvitation(invitationId: string): Promise<ApiResponse<unknown>> {
		return apiClient.delete<ApiResponse<unknown>>(
			`/admin/invitations/${invitationId}`,
			"Failed to delete invitation.",
		);
	},

	async revokeTeamAccess(userId: string): Promise<ApiResponse<unknown>> {
		return apiClient.delete<ApiResponse<unknown>>(
			`/admin/users/${userId}`,
			"Failed to revoke team access.",
		);
	},
};
