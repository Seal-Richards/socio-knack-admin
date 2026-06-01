// src/lib/requests/invite/index.ts

import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/generic";
import type {
	InviteSupervisorPayload,
	InviteStaffPayload,
	InvitationResponseData,
} from "@/types/invite";

export const inviteRequests = {
	async inviteSupervisor(
		body: InviteSupervisorPayload,
	): Promise<ApiResponse<InvitationResponseData>> {
		return apiClient.post<ApiResponse<InvitationResponseData>, InviteSupervisorPayload>(
			"/admin/invite-supervisor",
			body,
			"Failed to send supervisor invitation.",
		);
	},

	async inviteStaff(body: InviteStaffPayload): Promise<ApiResponse<InvitationResponseData>> {
		return apiClient.post<ApiResponse<InvitationResponseData>, InviteStaffPayload>(
			"/admin/invite-staff",
			body,
			"Failed to send staff invitation.",
		);
	},
};
