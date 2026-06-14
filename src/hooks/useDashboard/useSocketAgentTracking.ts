import { useEffect } from "react";
import { io, type Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { useGetMe } from "@/hooks/useProfile";
import { toast } from "@/lib/toast";

interface SocketAgentData {
	agentId: string;
	isOnline?: boolean;
	lastCheckInTime?: string;
	latitude?: number;
	longitude?: number;
	timestamp?: string;
}

let socket: Socket | null = null;

export function useSocketAgentTracking() {
	const queryClient = useQueryClient();
	const { data: meRes } = useGetMe();
	const businessId = (meRes?.data as Record<string, unknown>)?.businessId as string | undefined;
	const userId = (meRes?.data as Record<string, unknown>)?._id as string | undefined;

	useEffect(() => {
		if (businessId) {
			// Initialize socket connection if not already created
			if (!socket) {
				const SOCKET_URL =
					process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL?.replace("/api", "") ||
					"http://localhost:5000";
				socket = io(SOCKET_URL, {
					withCredentials: true,
				});
			}

			// Join the business room
			socket.emit("join_business_room", businessId);
			if (userId) {
				socket.emit("join_user_room", userId);
			}

			// Listen for agent status updates (online/offline toggle)
			const handleAgentStatusUpdate = () => {
				// Invalidate agents list to fetch fresh data
				queryClient.invalidateQueries({ queryKey: ["agents"] }).catch(console.error);
			};

			// Listen for real-time location updates (for live tracking on the map)
			const handleAgentLocationUpdate = (data: SocketAgentData) => {
				type AgentListCache = { data: Array<Record<string, unknown>> };
				queryClient.setQueryData(
					["agents"],
					(oldData: AgentListCache | undefined): AgentListCache | undefined => {
						if (!oldData?.data) return oldData;
						const updatedAgents = oldData.data.map((agent) => {
							if (agent._id === data.agentId) {
								return {
									...agent,
									lastKnownLocation: {
										latitude: data.latitude,
										longitude: data.longitude,
										lastUpdated: data.timestamp,
									},
								};
							}
							return agent;
						});
						return { ...oldData, data: updatedAgents };
					},
				);
			};

			// Listen for new in-app notifications
			const handleNewNotification = (data: { title: string; body: string }) => {
				toast.info(data.title, {
					description: data.body,
				});
				queryClient.invalidateQueries({ queryKey: ["notifications"] }).catch(console.error);
			};

			socket.on("agent_status_update", handleAgentStatusUpdate);
			socket.on("agent_location_update", handleAgentLocationUpdate);
			socket.on("new_notification", handleNewNotification);

			return () => {
				socket?.off("agent_status_update", handleAgentStatusUpdate);
				socket?.off("agent_location_update", handleAgentLocationUpdate);
				socket?.off("new_notification", handleNewNotification);
			};
		}
		return undefined;
	}, [businessId, userId, queryClient]);
}
