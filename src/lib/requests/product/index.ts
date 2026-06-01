// src/lib/requests/product/index.ts

import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/generic";

export type ProductData = {
	_id: string;
	id?: string;
	name: string;
	cost: number;
	description?: string;
	code?: string;
	category?: { _id: string; name: string } | string | null;
	incentiveEligible: boolean;
	incentiveType?: "flat" | "percentage";
	incentiveValue?: number;
	status: "active" | "inactive";
	avatar?: string | null;
	businessId: string;
	createdBy: string;
	createdAt?: string;
};

export type CreateProductPayload = {
	name: string;
	cost: number;
	description?: string;
	code?: string;
	category?: string | null;
	incentiveEligible: boolean | string;
	incentiveType?: "flat" | "percentage";
	incentiveValue?: number;
	status?: "active" | "inactive";
	avatar?: string;
};

export const productRequests = {
	async getProducts(): Promise<ApiResponse<ProductData[]>> {
		return apiClient.get<ApiResponse<ProductData[]>>(
			"/admin/products",
			"Failed to load products list.",
		);
	},

	async createProduct(body: CreateProductPayload): Promise<ApiResponse<ProductData>> {
		return apiClient.post<ApiResponse<ProductData>, CreateProductPayload>(
			"/admin/products",
			body,
			"Failed to create product/service.",
		);
	},

	async updateProduct(
		id: string,
		body: Partial<CreateProductPayload>,
	): Promise<ApiResponse<ProductData>> {
		return apiClient.patch<ApiResponse<ProductData>, Partial<CreateProductPayload>>(
			`/admin/products/${id}`,
			body,
			"Failed to update product/service.",
		);
	},

	async deleteProduct(id: string): Promise<ApiResponse<null>> {
		return apiClient.delete<ApiResponse<null>>(
			`/admin/products/${id}`,
			"Failed to delete product/service.",
		);
	},
};
