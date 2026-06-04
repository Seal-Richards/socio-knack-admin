"use client";

import React, { useState } from "react";
import SearchBar from "@/components/_atoms/SearchBar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import cn from "@/lib/utils";
import type { TerritoryData } from "@/types/territory";

interface ZoneTabProps {
	zones: TerritoryData[];
	isLoading: boolean;
	selectedZoneId: string | null;
	setSelectedZoneId: (id: string | null) => void;
	onAddZoneClick: () => void;
}

export default function ZoneTab({
	zones,
	isLoading,
	selectedZoneId,
	setSelectedZoneId,
	onAddZoneClick,
}: ZoneTabProps) {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredZones = zones.filter((zone) =>
		zone.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	let content;
	if (isLoading) {
		content = (
			<div className="flex h-20 items-center justify-center">
				<div className="size-6 animate-spin rounded-full border-2 border-[#1d4ea8] border-t-transparent" />
			</div>
		);
	} else if (filteredZones.length === 0) {
		content = (
			<div className="flex h-20 flex-col items-center justify-center p-4 text-center">
				<p className="text-xs font-semibold text-gray-400">No Zones Found</p>
			</div>
		);
	} else {
		content = filteredZones.map((zone) => {
			const isActive = selectedZoneId === zone._id;
			const agentsCount = zone.assignedAgents?.length || 0;
			const statusColor = zone.status === "active" ? "#10b981" : "#ef4444";

			return (
				<button
					key={zone._id}
					type="button"
					onClick={() => setSelectedZoneId(zone._id)}
					className={cn(
						"flex w-full cursor-pointer items-center justify-between rounded-xl border p-4 transition-all hover:shadow-md",
						isActive ? "border-[#1d4ea8] bg-gray-50/50" : "border-gray-100 bg-white",
					)}
				>
					<div className="flex items-center gap-3">
						<div
							className="h-12 w-1.5 rounded-full"
							style={{ backgroundColor: zone.color }}
						/>
						<div className="text-left">
							<div className="flex items-center gap-2">
								<div
									className="size-2 rounded-full"
									style={{ backgroundColor: statusColor }}
								/>
								<h3 className="max-w-[130px] truncate text-sm font-bold text-gray-900">
									{zone.name}
								</h3>
							</div>
							<p className="pl-4 text-xs font-medium text-gray-400">
								{agentsCount} Agents
							</p>
						</div>
					</div>
					<div
						className={cn(
							"flex size-6 items-center justify-center rounded-full bg-green-50",
						)}
					>
						<Icon icon="solar:alt-arrow-right-bold" className="size-3 text-green-500" />
					</div>
				</button>
			);
		});
	}

	return (
		<div className="flex size-full flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Icon icon="solar:map-point-bold-duotone" className="size-5 text-[#1d4ea8]" />
					<h2 className="text-lg font-bold text-gray-900">Zones</h2>
				</div>
				<button
					type="button"
					onClick={onAddZoneClick}
					className="cursor-pointer text-gray-400 transition-colors hover:text-[#1d4ea8]"
					title="Draw New Territory"
				>
					<Icon icon="solar:add-circle-bold" className="size-6" />
				</button>
			</div>

			<div className="mb-4 flex gap-2">
				<SearchBar
					placeholder="Search"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					containerClassName="flex-1"
				/>
				<Button
					variant="ghost"
					className="size-10 shrink-0 rounded-xl border border-gray-100 p-0"
				>
					<Icon icon="solar:tuning-bold-duotone" className="size-5 text-[#1d4ea8]" />
				</Button>
			</div>

			<div className="custom-scrollbar flex max-h-[300px] flex-col gap-3 overflow-y-auto pr-1 lg:max-h-[calc(100vh-320px)]">
				{content}
			</div>
		</div>
	);
}
