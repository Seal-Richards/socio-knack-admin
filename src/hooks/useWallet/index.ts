// src/hooks/useWallet/index.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { walletRequests } from "@/lib/requests/wallet";

export function useGetWalletBalance() {
	return useQuery({
		queryKey: ["walletBalance"],
		queryFn: () => walletRequests.getBalance(),
		staleTime: 60 * 1000, // 1 min refresh is healthy for payouts/wallet
	});
}

export function useActivateWallet() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (bvn: string) => walletRequests.activateWallet(bvn),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["walletBalance"] }).catch((err) => {
				console.error("Failed to invalidate walletBalance query:", err);
			});
		},
	});
}

export function useGetBankList() {
	return useQuery({
		queryKey: ["bankList"],
		queryFn: () => walletRequests.getBanks(),
		staleTime: 24 * 60 * 60 * 1000, // Static data, cache it for 24 hours
	});
}
