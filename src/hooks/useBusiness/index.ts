import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { businessRequests } from "@/lib/requests/business";
import type {
	UpdateBusinessSettingsPayload,
	UpdateBusinessIncentivePayload,
	SetupBusinessPayload,
	LinkBankPayload,
	InitializeSubscriptionPayload,
	BusinessSettingsData,
} from "@/types/business";
import type { ApiResponse } from "@/types/generic";

export function useGetBusinessSettings(
	options?: Omit<
		UseQueryOptions<ApiResponse<BusinessSettingsData>, Error>,
		"queryKey" | "queryFn"
	>,
) {
	return useQuery<ApiResponse<BusinessSettingsData>, Error>({
		queryKey: ["businessSettings"],
		queryFn: () => businessRequests.getSettings(),
		staleTime: 5 * 60 * 1000, // 5 min
		...options,
	});
}

export function useUpdateBusinessSettings() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: UpdateBusinessSettingsPayload) => businessRequests.updateSettings(body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["businessSettings"] }).catch((err) => {
				console.error("Failed to invalidate businessSettings query:", err);
			});
			// Also invalidate getMe to sync business changes (logo, domain, plan)
			queryClient.invalidateQueries({ queryKey: ["me"] }).catch((err) => {
				console.error("Failed to invalidate me query:", err);
			});
		},
	});
}

export function useUpdateBusinessIncentive() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: UpdateBusinessIncentivePayload) =>
			businessRequests.updateIncentive(body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["businessSettings"] }).catch((err) => {
				console.error("Failed to invalidate businessSettings query:", err);
			});
		},
	});
}

export function useSetupBusiness() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: SetupBusinessPayload) => businessRequests.setupBusiness(body),
		onSuccess: () => {
			queryClient
				.invalidateQueries({ queryKey: ["businessSettings"] })
				.catch(() => undefined);
			queryClient.invalidateQueries({ queryKey: ["me"] }).catch(() => undefined);
		},
	});
}

export function useUploadBusinessKyc() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (formData: FormData) => businessRequests.uploadBusinessKyc(formData),
		onSuccess: () => {
			queryClient
				.invalidateQueries({ queryKey: ["businessSettings"] })
				.catch(() => undefined);
			queryClient.invalidateQueries({ queryKey: ["me"] }).catch(() => undefined);
		},
	});
}

export function useUploadOwnerId() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (formData: FormData) => businessRequests.uploadOwnerId(formData),
		onSuccess: () => {
			queryClient
				.invalidateQueries({ queryKey: ["businessSettings"] })
				.catch(() => undefined);
			queryClient.invalidateQueries({ queryKey: ["me"] }).catch(() => undefined);
		},
	});
}

export function useLinkBank() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: LinkBankPayload) => businessRequests.linkBank(body),
		onSuccess: () => {
			queryClient
				.invalidateQueries({ queryKey: ["businessSettings"] })
				.catch(() => undefined);
		},
	});
}

export function useInitializeSubscription() {
	return useMutation({
		mutationFn: (body: InitializeSubscriptionPayload) =>
			businessRequests.initializeSubscription(body),
	});
}

export function useVerifySubscription() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (transactionId: string) => businessRequests.verifySubscription(transactionId),
		onSuccess: () => {
			queryClient
				.invalidateQueries({ queryKey: ["businessSettings"] })
				.catch(() => undefined);
			queryClient.invalidateQueries({ queryKey: ["me"] }).catch(() => undefined);
		},
	});
}
