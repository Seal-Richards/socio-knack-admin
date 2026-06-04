"use client";

import React, { useState } from "react";
import DynamicAvatar from "@/components/_atoms/DynamicAvatar";
import { Icon } from "@iconify/react";
import Map from "@/components/Map";
import Empty from "@/components/_atoms/Empty";
import { type UserProfileData } from "@/types/profile";
import { useGetTerritories } from "@/hooks/useTerritory";
import { useGetAgents } from "@/hooks/useAgent";
import { useSocketAgentTracking } from "@/hooks/useDashboard/useSocketAgentTracking";

interface TerritoryAndTeamProps {
	supervisor: {
		raw?: UserProfileData;
	};
}

export default function TerritoryAndTeam({ supervisor }: TerritoryAndTeamProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const agents = supervisor?.raw?.agents || [];

	const { data: territoriesRes } = useGetTerritories();
	const zones = territoriesRes?.data || [];

	const { data: agentsRes } = useGetAgents();
	const agentsData = agentsRes?.data || [];

	useSocketAgentTracking();

	const supervisorId = supervisor?.raw?._id || supervisor?.raw?.id;
	const supervisorTerritories = zones.filter(
		(t) =>
			t.assignedSupervisor?._id === supervisorId ||
			t.assignedSupervisor?.id === supervisorId ||
			t.createdBy?._id === supervisorId ||
			t.createdBy?.id === supervisorId,
	);
	const supervisorTerritoryIds = new Set(supervisorTerritories.map((t) => t._id));

	const liveMapAgents = agentsData.filter((agent) => {
		const agentTerritoryId =
			typeof agent.territoryId === "object" && agent.territoryId !== null
				? agent.territoryId._id
				: agent.territoryId;
		return agentTerritoryId && supervisorTerritoryIds.has(agentTerritoryId);
	});

	const filteredAgents = agents.filter(
		(agent) =>
			agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			agent.email.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className="flex flex-col gap-6 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:gap-8 md:p-10">
			<h3 className="text-[14px] font-bold text-gray-500 sm:text-[15px]">Personal Profile</h3>
			<div className="h-px w-full bg-gray-100" />

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
				{/* Left Column: Live Territory Map */}
				<div className="flex flex-col gap-4 rounded-[2rem] border border-gray-200 p-6 md:p-8">
					<h4 className="text-[16px] font-bold text-gray-800 sm:text-[18px]">
						Live Territory Map
					</h4>
					<div className="relative min-h-[300px] w-full flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
						<Map
							className="size-full"
							readOnly
							zones={supervisorTerritories}
							agents={liveMapAgents as any[]}
						/>
					</div>
				</div>

				{/* Right Column: Agent Directory */}
				<div className="flex flex-col gap-6 rounded-[2rem] border border-gray-200 p-6 md:p-8">
					<h4 className="text-[16px] font-bold text-gray-800 sm:text-[18px]">
						Agent Directory
					</h4>

					{/* Search */}
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
							<Icon icon="solar:magnifer-linear" className="size-5 text-gray-400" />
						</div>
						<input
							type="text"
							placeholder="Search"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							aria-label="Search agents"
							className="h-12 w-full rounded-xl border border-gray-100 bg-white pl-11 pr-4 text-[13px] font-medium text-gray-700 placeholder:text-gray-400 focus:border-[#1d4ea8] focus:outline-none focus:ring-1 focus:ring-[#1d4ea8]/20"
						/>
					</div>

					{/* Custom Table/List */}
					<div className="mt-2 flex w-full flex-col gap-4">
						{/* Header row */}
						<div className="grid grid-cols-12 gap-2 border-b border-gray-100 pb-3 text-[12px] font-medium text-gray-500">
							<div className="col-span-4">Agent Name</div>
							<div className="col-span-3">Status</div>
							<div className="col-span-5">Last Check-in</div>
						</div>

						{/* Items */}
						<div className="custom-scrollbar flex max-h-[250px] flex-col gap-4 overflow-y-auto pr-2">
							{filteredAgents.length === 0 ? (
								<Empty
									title="No Agents Found"
									description="There are currently no agents matching your search criteria."
									icon="solar:users-group-two-rounded-bold-duotone"
									className="py-8"
								/>
							) : (
								filteredAgents.map((agent) => (
									<div
										key={agent.id}
										className="grid grid-cols-12 items-center gap-2 border-b border-gray-50 pb-4 last:border-0 last:pb-0"
									>
										<div className="col-span-4 flex items-center gap-2">
											<DynamicAvatar
												name={agent.name}
												image={agent.avatar}
												className="size-8 shrink-0 rounded-full border border-gray-100"
											/>
											<span className="truncate text-[13px] font-bold text-gray-800">
												{agent.name}
											</span>
										</div>
										<div className="col-span-3 flex items-center gap-1.5">
											<div
												className={`size-1.5 shrink-0 rounded-full ${agent.statusColor === "green" ? "bg-green-500" : "bg-orange-500"}`}
											/>
											<span className="text-[13px] font-medium text-gray-700">
												{agent.status}
											</span>
										</div>
										<div className="col-span-4 truncate text-[12px] font-medium text-gray-500">
											{agent.lastCheckIn}
										</div>
										<div className="col-span-1 flex justify-end">
											<button className="flex size-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
												<Icon
													icon="pepicons-pop:dots-y"
													className="size-5"
												/>
											</button>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="h-px w-full bg-gray-100" />

			<div className="flex flex-col gap-6">
				<h4 className="text-[16px] font-bold text-gray-800 sm:text-[18px]">
					Supervised Zones of Operation
				</h4>
				{supervisorTerritories.length === 0 ? (
					<div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-100 bg-gray-50/50 p-8 text-center">
						<Icon
							icon="solar:map-arrow-square-bold-duotone"
							className="size-10 text-gray-300"
						/>
						<p className="mt-2 text-xs font-bold text-gray-400">
							No zones assigned or created yet
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{supervisorTerritories.map((zone) => {
							const supervisorName = zone.assignedSupervisor
								? `${zone.assignedSupervisor.firstName || ""} ${zone.assignedSupervisor.lastName || ""}`.trim()
								: "No Supervisor";
							return (
								<div
									key={zone._id}
									className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-gray-200 hover:shadow-md"
								>
									<div>
										<div className="flex items-center gap-2.5">
											<span
												className="size-3 rounded-full border border-white shadow-sm"
												style={{ backgroundColor: zone.color || "#1d4ea8" }}
											/>
											<h5 className="font-bold text-gray-900 transition-colors group-hover:text-[#1d4ea8]">
												{zone.name}
											</h5>
										</div>
										<p className="mt-1.5 line-clamp-2 text-xs font-medium text-gray-500">
											{zone.description ||
												"Active operations and coverage zone."}
										</p>
									</div>

									<div className="mt-5 flex items-center justify-between border-t border-gray-50 pt-4">
										{zone.assignedSupervisor ? (
											<div className="flex items-center gap-2">
												<DynamicAvatar
													name={supervisorName}
													image={zone.assignedSupervisor.avatar}
													className="size-7 rounded-full border border-gray-100"
												/>
												<div>
													<p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
														Supervisor
													</p>
													<p className="text-[11px] font-bold text-gray-700">
														{supervisorName}
													</p>
												</div>
											</div>
										) : (
											<span className="text-[11px] font-semibold text-gray-400">
												No Supervisor
											</span>
										)}
										<div className="flex items-center gap-1 text-[11px] font-bold text-gray-500">
											<Icon
												icon="solar:users-group-two-round-bold"
												className="size-4 text-gray-400"
											/>
											<span>{zone.assignedAgents?.length || 0} Agents</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
