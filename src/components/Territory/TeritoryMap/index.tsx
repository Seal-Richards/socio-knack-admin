"use client";

import React from "react";
import Map from "@/components/Map";
import { useGetAgents } from "@/hooks/useAgent";
import { useSocketAgentTracking } from "@/hooks/useDashboard/useSocketAgentTracking";
import type { TerritoryData } from "@/types/territory";

interface TeritoryMapProps {
	zones: TerritoryData[];
	selectedZoneId: string | null;
	isDrawing: boolean;
	setIsDrawing: (drawing: boolean) => void;
	onSaveTerritory: (coords: Array<{ lat: number; lng: number }>) => void;
}

export default function TeritoryMap({
	zones,
	selectedZoneId,
	isDrawing,
	setIsDrawing,
	onSaveTerritory,
}: TeritoryMapProps) {
	// Enable real-time location update listeners via sockets
	useSocketAgentTracking();

	// Fetch active agents to display their locations on the map
	const { data: agentsRes } = useGetAgents();
	const agents = agentsRes?.data || [];

	return (
		<div className="relative size-full min-h-[400px] flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:min-h-full">
			<Map
				className="size-full"
				zones={zones}
				selectedZoneId={selectedZoneId}
				isDrawing={isDrawing}
				setIsDrawing={setIsDrawing}
				onSaveTerritory={onSaveTerritory}
				agents={agents}
			/>
		</div>
	);
}
