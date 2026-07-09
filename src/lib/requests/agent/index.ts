// src/lib/requests/agent/index.ts

import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/generic";
import type { AgentData, UpdateAgentProfilePayload, UpdateAgentStatusPayload } from "@/types/agent";

export const agentRequests = {
	async getAgents(): Promise<ApiResponse<AgentData[]>> {
		return apiClient.get<ApiResponse<AgentData[]>>(
			"/admin/agents",
			"Failed to load agents list.",
		);
	},

	async getAgentById(id: string): Promise<ApiResponse<AgentData>> {
		return apiClient.get<ApiResponse<AgentData>>(
			`/admin/agents/${id}`,
			"Failed to load agent details.",
		);
	},

	async updateAgentProfile(
		id: string,
		payload: UpdateAgentProfilePayload,
	): Promise<ApiResponse<AgentData>> {
		return apiClient.patch<ApiResponse<AgentData>, UpdateAgentProfilePayload>(
			`/admin/agents/${id}`,
			payload,
			"Failed to update agent profile settings.",
		);
	},

	async updateAgentStatus(
		userId: string,
		payload: UpdateAgentStatusPayload,
	): Promise<ApiResponse<any>> {
		return apiClient.patch<ApiResponse<any>, UpdateAgentStatusPayload>(
			`/admin/users/${userId}/status`,
			payload,
			"Failed to update agent KYC status.",
		);
	},

	async sendAgentKycComment(
		userId: string,
		comment: string,
	): Promise<ApiResponse<{ kycComment: string }>> {
		return apiClient.post<ApiResponse<{ kycComment: string }>, { comment: string }>(
			`/admin/users/${userId}/kyc-comment`,
			{ comment },
			"Failed to send KYC comment.",
		);
	},

	async sendAgentComplianceComment(
		userId: string,
		comment: string,
		status: string,
	): Promise<ApiResponse<any>> {
		return apiClient.post<ApiResponse<any>, { comment: string; status: string }>(
			`/admin/users/${userId}/compliance-comment`,
			{ comment, status },
			"Failed to send compliance comment.",
		);
	},

	async deleteAgent(id: string, reason?: string): Promise<ApiResponse<any>> {
		return apiClient.delete<ApiResponse<any>>(
			`/admin/agents/${id}`,
			"Failed to delete agent.",
			reason ? { data: { reason } } : undefined,
		);
	},
};
