// src/lib/requests/category/index.ts

import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/generic";

export type CategoryData = {
	_id: string;
	id?: string;
	name: string;
	businessId: string;
	createdBy: string;
	createdAt?: string;
	updatedAt?: string;
};

export const categoryRequests = {
	async getCategories(): Promise<ApiResponse<CategoryData[]>> {
		return apiClient.get<ApiResponse<CategoryData[]>>(
			"/admin/categories",
			"Failed to load categories list.",
		);
	},

	async createCategory(name: string): Promise<ApiResponse<CategoryData>> {
		return apiClient.post<ApiResponse<CategoryData>, { name }>(
			"/admin/categories",
			{ name },
			"Failed to create product category.",
		);
	},

	async updateCategory(id: string, name: string): Promise<ApiResponse<CategoryData>> {
		return apiClient.patch<ApiResponse<CategoryData>, { name }>(
			`/admin/categories/${id}`,
			{ name },
			"Failed to update product category.",
		);
	},

	async deleteCategory(id: string): Promise<ApiResponse<null>> {
		return apiClient.delete<ApiResponse<null>>(
			`/admin/categories/${id}`,
			"Failed to delete product category.",
		);
	},
};
