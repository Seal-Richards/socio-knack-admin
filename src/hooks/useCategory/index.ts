// src/hooks/useCategory/index.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryRequests } from "@/lib/requests/category";

export function useGetCategories() {
	return useQuery({
		queryKey: ["categories"],
		queryFn: () => categoryRequests.getCategories(),
		staleTime: 5 * 60 * 1000, // 5 min
	});
}

export function useCreateCategory() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (name: string) => categoryRequests.createCategory(name),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] }).catch((err) => {
				console.error("Failed to invalidate categories query:", err);
			});
		},
	});
}

export function useUpdateCategory() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, name }: { id: string; name: string }) =>
			categoryRequests.updateCategory(id, name),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] }).catch((err) => {
				console.error("Failed to invalidate categories query:", err);
			});
			// Also invalidate products since they list categories
			queryClient.invalidateQueries({ queryKey: ["products"] }).catch((err) => {
				console.error("Failed to invalidate products query:", err);
			});
		},
	});
}

export function useDeleteCategory() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => categoryRequests.deleteCategory(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] }).catch((err) => {
				console.error("Failed to invalidate categories query:", err);
			});
			// Also invalidate products since some products' category reference might have been nulled out
			queryClient.invalidateQueries({ queryKey: ["products"] }).catch((err) => {
				console.error("Failed to invalidate products query:", err);
			});
		},
	});
}
