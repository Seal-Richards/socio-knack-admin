// src/hooks/useProfile/index.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { profileRequests } from "@/lib/requests/profile";
import type { UpdateProfilePayload, UpdatePasswordPayload } from "@/types/profile";

/**
 * Fetches the currently logged-in user's full profile via GET /auth/me.
 * Works for all roles: admin, supervisor, staffs, superadmin.
 * No id/role params needed — the backend derives identity from the JWT.
 */
export function useGetMe() {
	const { status } = useSession();
	return useQuery({
		queryKey: ["me"],
		queryFn: () => profileRequests.getMe(),
		// Only run once authenticated
		enabled: status === "authenticated",
		staleTime: 5 * 60 * 1000, // 5 min — avoid hammering on every nav
		retry: false,
	});
}

export function useUpdateProfile() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: UpdateProfilePayload) => profileRequests.updateProfile(body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["me"] }).catch(() => undefined);
			queryClient.invalidateQueries({ queryKey: ["supervisor"] }).catch(() => undefined);
		},
	});
}

export function useChangePassword() {
	return useMutation({
		mutationFn: (body: UpdatePasswordPayload) => profileRequests.updatePassword(body),
	});
}

export function useUploadPersonalKyc() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ formData, isSupervisor }: { formData: FormData; isSupervisor: boolean }) =>
			profileRequests.uploadPersonalKyc(formData, isSupervisor),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["me"] }).catch(() => undefined);
			queryClient.invalidateQueries({ queryKey: ["supervisor"] }).catch(() => undefined);
		},
	});
}
