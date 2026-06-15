// src/hooks/useAgent/index.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { agentRequests } from "@/lib/requests/agent";
import type { UpdateAgentProfilePayload, UpdateAgentStatusPayload } from "@/types/agent";

export function useGetAgents() {
	return useQuery({
		queryKey: ["agents"],
		queryFn: () => agentRequests.getAgents(),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

export function useGetAgentById(id: string) {
	return useQuery({
		queryKey: ["agent", id],
		queryFn: () => agentRequests.getAgentById(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

export function useUpdateAgentProfile() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateAgentProfilePayload }) =>
			agentRequests.updateAgentProfile(id, payload),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["agent", variables.id] }).catch((err) => {
				console.error("Failed to invalidate agent query:", err);
			});
			queryClient.invalidateQueries({ queryKey: ["agents"] }).catch((err) => {
				console.error("Failed to invalidate agents list query:", err);
			});
		},
	});
}

export function useUpdateAgentStatus() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, payload }: { userId: string; payload: UpdateAgentStatusPayload }) =>
			agentRequests.updateAgentStatus(userId, payload),
		onSuccess: (_, variables) => {
			queryClient
				.invalidateQueries({ queryKey: ["agent", variables.userId] })
				.catch((err) => {
					console.error("Failed to invalidate agent query:", err);
				});
			queryClient.invalidateQueries({ queryKey: ["agents"] }).catch((err) => {
				console.error("Failed to invalidate agents list query:", err);
			});
		},
	});
}

export function useSendAgentKycComment() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, comment }: { userId: string; comment: string }) =>
			agentRequests.sendAgentKycComment(userId, comment),
		onSuccess: (_, variables) => {
			queryClient
				.invalidateQueries({ queryKey: ["agent", variables.userId] })
				.catch((err) => {
					console.error("Failed to invalidate agent query:", err);
				});
		},
	});
}

export function useDeleteAgent() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => agentRequests.deleteAgent(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["agents"] }).catch((err) => {
				console.error("Failed to invalidate agents list query:", err);
			});
		},
	});
}
