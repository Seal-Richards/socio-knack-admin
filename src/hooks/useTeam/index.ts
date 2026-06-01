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
		mutationFn: ({ userId, status }: { userId: string; status: string }) =>
			teamRequests.updateUserStatus(userId, status),
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
