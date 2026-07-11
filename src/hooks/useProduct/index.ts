// src/hooks/useProduct/index.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productRequests } from "@/lib/requests/product";
import type { CreateProductPayload } from "@/lib/requests/product";

export function useGetProducts() {
	return useQuery({
		queryKey: ["products"],
		queryFn: () => productRequests.getProducts(),
		staleTime: 5 * 60 * 1000, // 5 min
	});
}

export function useGetProductStats() {
	return useQuery({
		queryKey: ["product-stats"],
		queryFn: () => productRequests.getProductStats(),
		staleTime: 5 * 60 * 1000, // 5 min
	});
}

export function useCreateProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: CreateProductPayload) => productRequests.createProduct(body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] }).catch((err) => {
				console.error("Failed to invalidate products query:", err);
			});
			queryClient.invalidateQueries({ queryKey: ["product-stats"] }).catch((err) => {
				console.error("Failed to invalidate product stats query:", err);
			});
		},
	});
}

export function useUpdateProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, body }: { id: string; body: Partial<CreateProductPayload> }) =>
			productRequests.updateProduct(id, body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] }).catch((err) => {
				console.error("Failed to invalidate products query:", err);
			});
			queryClient.invalidateQueries({ queryKey: ["product-stats"] }).catch((err) => {
				console.error("Failed to invalidate product stats query:", err);
			});
		},
	});
}

export function useDeleteProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => productRequests.deleteProduct(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] }).catch((err) => {
				console.error("Failed to invalidate products query:", err);
			});
			queryClient.invalidateQueries({ queryKey: ["product-stats"] }).catch((err) => {
				console.error("Failed to invalidate product stats query:", err);
			});
		},
	});
}
