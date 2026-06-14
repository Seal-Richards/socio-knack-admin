import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/generic";

export type NotificationData = {
	_id: string;
	recipient: string;
	title: string;
	message: string;
	type: string;
	isRead: boolean;
	data?: Record<string, unknown>;
	createdAt: string;
	updatedAt: string;
};

export const notificationRequests = {
	async getNotifications(): Promise<ApiResponse<NotificationData[]>> {
		return apiClient.get<ApiResponse<NotificationData[]>>(
			"/notifications",
			"Failed to load notifications.",
		);
	},

	async markAllAsRead(): Promise<ApiResponse<null>> {
		return apiClient.put<ApiResponse<null>, Record<string, never>>(
			"/notifications/read-all",
			{},
			"Failed to mark all notifications as read.",
		);
	},

	async markAsRead(id: string): Promise<ApiResponse<NotificationData>> {
		return apiClient.put<ApiResponse<NotificationData>, Record<string, never>>(
			`/notifications/${id}/read`,
			{},
			"Failed to mark notification as read.",
		);
	},

	async delete(id: string): Promise<ApiResponse<null>> {
		return apiClient.delete<ApiResponse<null>>(
			`/notifications/${id}`,
			"Failed to delete notification.",
		);
	},

	async deleteAll(): Promise<ApiResponse<null>> {
		return apiClient.delete<ApiResponse<null>>(
			"/notifications",
			"Failed to clear notifications.",
		);
	},
};
