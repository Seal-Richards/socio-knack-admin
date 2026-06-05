// src/hooks/useInvite/index.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inviteRequests } from "@/lib/requests/invite";
import type { InviteSupervisorPayload, InviteStaffPayload } from "@/types/invite";

export function useInviteSupervisor() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: InviteSupervisorPayload) => inviteRequests.inviteSupervisor(body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["invitations"] }).catch((err) => {
				console.error("Failed to invalidate invitations query:", err);
			});
		},
	});
}

export function useInviteStaff() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: InviteStaffPayload) => inviteRequests.inviteStaff(body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["invitations"] }).catch((err) => {
				console.error("Failed to invalidate invitations query:", err);
			});
		},
	});
}
