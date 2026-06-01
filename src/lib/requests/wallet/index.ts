// src/lib/requests/wallet/index.ts

import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/generic";

export type WalletData = {
	id?: string;
	balance: number;
	currency: string;
	fincraVirtualAccountId?: string | null;
	fincraAccountNumber?: string | null;
	fincraBankName?: string | null;
	fincraAccountName?: string | null;
	needsActivation?: boolean;
};

export const walletRequests = {
	async getBalance(): Promise<ApiResponse<WalletData>> {
		return apiClient.get<ApiResponse<WalletData>>(
			"/wallet/balance",
			"Failed to load wallet balance details.",
		);
	},

	async activateWallet(bvn: string): Promise<ApiResponse<WalletData>> {
		return apiClient.post<ApiResponse<WalletData>, { bvn }>(
			"/wallet/activate",
			{ bvn },
			"Failed to activate virtual wallet.",
		);
	},
};
