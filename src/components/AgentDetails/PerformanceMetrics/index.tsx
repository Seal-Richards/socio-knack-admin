import React from "react";
import type { AgentMetrics } from "@/types/agent";
import type { TerritoryData } from "@/types/territory";
import { Icon } from "@iconify/react";
import DynamicAvatar from "@/components/_atoms/DynamicAvatar";

export default function PerformanceMetrics({
	metrics,
	territories = [],
}: {
	metrics?: AgentMetrics;
	territories?: TerritoryData[];
}) {
	const completedVisits = metrics?.completedVisits ?? 0;
	const successRate = metrics?.successRate ?? 0;
	const totalVisits = metrics?.totalVisits ?? 0;
	const pendingVisits = metrics?.pendingVisits ?? 0;
	const inProgressVisits = metrics?.inProgressVisits ?? 0;

	return (
		<div className="flex flex-col gap-6 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:gap-8 md:p-10">
			<h3 className="text-[14px] font-bold text-gray-500 sm:text-[15px]">
				Key performance indicators
			</h3>
			<div className="h-px w-full bg-gray-100" />

			<div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
				{/* Left Column */}
				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-2">
						<span className="text-[15px] font-medium text-gray-800">
							Completed Visits
						</span>
						<h2 className="text-[40px] font-bold leading-tight text-gray-600">
							{completedVisits}
						</h2>
						<span className="text-[14px] font-medium text-gray-500">
							Total visits completed since joining
						</span>
					</div>
					<div className="h-px w-full max-w-72 bg-gray-100" />
					<div className="flex flex-col gap-2">
						<span className="text-[15px] font-medium text-gray-800">
							Task success rates
						</span>
						<h2 className="text-[40px] font-bold leading-tight text-gray-600">
							{successRate}%
						</h2>
						<div className="mt-2 h-3 w-full max-w-72 overflow-hidden rounded-full bg-gray-100">
							<div
								style={{ width: `${successRate}%` }}
								className="h-full rounded-full bg-gray-800"
							/>
						</div>
					</div>
				</div>

				{/* Right Column */}
				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-2">
						<span className="text-[15px] font-medium text-gray-800">
							Total Scheduled Visits
						</span>
						<h2 className="text-[40px] font-bold leading-tight text-gray-600">
							{totalVisits}
						</h2>
						<span className="text-[14px] font-medium text-gray-500">
							All assigned tasks and client appointments
						</span>
					</div>
					<div className="h-px w-full bg-gray-100 md:max-w-md" />
					<div className="flex flex-col gap-2">
						<span className="text-[15px] font-medium text-gray-800">
							Active & Pending Visits
						</span>
						<h2 className="text-[40px] font-bold leading-tight text-gray-600">
							{pendingVisits + inProgressVisits}
						</h2>
						<span className="text-[14px] font-medium text-gray-500">
							Currently pending check-in or ongoing visits ({pendingVisits} pending,{" "}
							{inProgressVisits} in-progress)
						</span>
					</div>
				</div>
			</div>

			<div className="h-px w-full bg-gray-100" />

			<div className="flex flex-col gap-6">
				<h3 className="text-[14px] font-bold text-gray-500 sm:text-[15px]">
					Assigned Zones of Operation
				</h3>
				{territories.length === 0 ? (
					<div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-100 bg-gray-50/50 p-8 text-center">
						<Icon
							icon="solar:map-arrow-square-bold-duotone"
							className="size-10 text-gray-300"
						/>
						<p className="mt-2 text-xs font-bold text-gray-400">
							No zones assigned yet
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{territories.map((zone) => {
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
