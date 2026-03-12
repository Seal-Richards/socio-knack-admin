"use client";

import React, { useState } from "react";
import SearchBar from "@/components/_atoms/SearchBar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import cn from "@/lib/utils";

const zones = [
	{
		id: "1",
		name: "Yaba Zone",
		agents: 13,
		status: "up",
		color: "bg-[#10b981]",
		dotColor: "bg-[#10b981]",
	},
	{
		id: "2",
		name: "Ikeja Zone",
		agents: 13,
		status: "up",
		color: "bg-[#f59e0b]",
		dotColor: "bg-[#f59e0b]",
	},
	{
		id: "3",
		name: "V.I Zone",
		agents: 2,
		status: "down",
		color: "bg-[#1d4ea8]",
		dotColor: "bg-[#ef4444]",
	},
];

export default function ZoneTab() {
	const [activeZone, setActiveZone] = useState("1");

	return (
		<div className="flex h-full w-[300px] flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Icon icon="solar:map-point-bold-duotone" className="size-5 text-[#1d4ea8]" />
					<h2 className="text-lg font-bold text-gray-900">Zones</h2>
				</div>
				<button className="text-gray-400 transition-colors hover:text-gray-600">
					<Icon icon="solar:add-circle-bold" className="size-6" />
				</button>
			</div>

			<div className="mb-4 flex gap-2">
				<SearchBar placeholder="Search" containerClassName="flex-1" />
				<Button
					variant="ghost"
					className="size-10 shrink-0 rounded-xl border border-gray-100 p-0"
				>
					<Icon icon="solar:tuning-bold-duotone" className="size-5 text-[#1d4ea8]" />
				</Button>
			</div>

			<div className="flex flex-col gap-3">
				{zones.map((zone) => (
					<button
						key={zone.id}
						type="button"
						onClick={() => setActiveZone(zone.id)}
						className={cn(
							"flex w-full cursor-pointer items-center justify-between rounded-xl border p-4 transition-all hover:shadow-md",
							activeZone === zone.id
								? "border-[#1d4ea8] bg-gray-50/50"
								: "border-gray-100 bg-white",
						)}
					>
						<div className="flex items-center gap-3">
							<div className={`h-12 w-1.5 rounded-full ${zone.color}`} />
							<div className="text-left">
								<div className="flex items-center gap-2">
									<div className={`size-2 rounded-full ${zone.dotColor}`} />
									<h3 className="text-sm font-bold text-gray-900">{zone.name}</h3>
								</div>
								<p className="pl-4 text-xs font-medium text-gray-400">
									{zone.agents} Agents
								</p>
							</div>
						</div>
						<div
							className={cn(
								"flex size-6 items-center justify-center rounded-full",
								zone.status === "up" ? "bg-green-50" : "bg-red-50",
							)}
						>
							<Icon
								icon={
									zone.status === "up"
										? "solar:alt-arrow-up-bold"
										: "solar:alt-arrow-down-bold"
								}
								className={cn(
									"size-3",
									zone.status === "up" ? "text-green-500" : "text-red-500",
								)}
							/>
						</div>
					</button>
				))}
			</div>
		</div>
	);
}
