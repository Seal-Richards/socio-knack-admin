import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationRequests } from "@/lib/requests/notification";

export function useGetNotifications() {
	return useQuery({
		queryKey: ["notifications"],
		queryFn: () => notificationRequests.getNotifications(),
		staleTime: 30 * 1000, // 30 seconds
	});
}

export function useMarkAllNotificationsAsRead() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => notificationRequests.markAllAsRead(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notifications"] }).catch((err) => {
				console.error("Failed to invalidate notifications query:", err);
			});
		},
	});
}

export function useMarkNotificationAsRead() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => notificationRequests.markAsRead(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notifications"] }).catch((err) => {
				console.error("Failed to invalidate notifications query:", err);
			});
		},
	});
}
