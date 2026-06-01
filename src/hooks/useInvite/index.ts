// src/hooks/useInvite/index.ts

import { useMutation } from "@tanstack/react-query";
import { inviteRequests } from "@/lib/requests/invite";
import type { InviteSupervisorPayload, InviteStaffPayload } from "@/types/invite";

export function useInviteSupervisor() {
	return useMutation({
		mutationFn: (body: InviteSupervisorPayload) => inviteRequests.inviteSupervisor(body),
	});
}

export function useInviteStaff() {
	return useMutation({
		mutationFn: (body: InviteStaffPayload) => inviteRequests.inviteStaff(body),
	});
}
