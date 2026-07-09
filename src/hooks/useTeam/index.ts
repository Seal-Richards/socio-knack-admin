// src/hooks/useTeam/index.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teamRequests } from "@/lib/requests/team";

export function useGetSupervisors() {
	return useQuery({
		queryKey: ["supervisors"],
		queryFn: () => teamRequests.getSupervisors(),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
}

export function useGetAdmins() {
	return useQuery({
		queryKey: ["admins"],
		queryFn: () => teamRequests.getAdmins(),
		staleTime: 1000 * 60 * 5,
	});
}

export function useGetStaff() {
	return useQuery({
		queryKey: ["staff"],
		queryFn: () => teamRequests.getStaff(),
		staleTime: 1000 * 60 * 5,
	});
}

export function useUpdateUserRole() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, role }: { userId: string; role: string }) =>
			teamRequests.updateUserRole(userId, role),
		onSuccess: () => {
			queryClient
				.invalidateQueries({ queryKey: ["admins"] })
				.catch((err) => console.error(err));
			queryClient
				.invalidateQueries({ queryKey: ["supervisors"] })
				.catch((err) => console.error(err));
			queryClient
				.invalidateQueries({ queryKey: ["staff"] })
				.catch((err) => console.error(err));
		},
	});
}

export function useUpdateUserStatus() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			userId,
			payload,
		}: {
			userId: string;
			payload: { status?: string; kycStatus?: string; reason?: string };
		}) => teamRequests.updateUserStatus(userId, payload),
		onSuccess: () => {
			queryClient
				.invalidateQueries({ queryKey: ["admins"] })
				.catch((err) => console.error(err));
			queryClient
				.invalidateQueries({ queryKey: ["supervisors"] })
				.catch((err) => console.error(err));
			queryClient
				.invalidateQueries({ queryKey: ["supervisor"] })
				.catch((err) => console.error(err));
			queryClient
				.invalidateQueries({ queryKey: ["staff"] })
				.catch((err) => console.error(err));
		},
	});
}

export function useGetSupervisorById(id: string) {
	return useQuery({
		queryKey: ["supervisor", id],
		queryFn: () => teamRequests.getSupervisorById(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 5,
	});
}

export function useLogoutUser() {
	return useMutation({
		mutationFn: () => teamRequests.logout(),
	});
}

export function useGetInvitations() {
	return useQuery({
		queryKey: ["invitations"],
		queryFn: () => teamRequests.getInvitations(),
		staleTime: 1000 * 60 * 5,
	});
}

export function useCancelInvitation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (invitationId: string) => teamRequests.cancelInvitation(invitationId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["invitations"] }).catch((err) => {
				console.error("Failed to invalidate invitations query:", err);
			});
		},
	});
}

export function useDeleteInvitation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (invitationId: string) => teamRequests.deleteInvitation(invitationId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["invitations"] }).catch((err) => {
				console.error("Failed to invalidate invitations query:", err);
			});
		},
	});
}

export function useRevokeTeamAccess() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, reason }: { userId: string; reason?: string }) =>
			teamRequests.revokeTeamAccess(userId, reason),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admins"] }).catch((err) => {
				console.error("Failed to invalidate admins query:", err);
			});
			queryClient.invalidateQueries({ queryKey: ["supervisors"] }).catch((err) => {
				console.error("Failed to invalidate supervisors query:", err);
			});
			queryClient.invalidateQueries({ queryKey: ["staff"] }).catch((err) => {
				console.error("Failed to invalidate staff query:", err);
			});
		},
	});
}
