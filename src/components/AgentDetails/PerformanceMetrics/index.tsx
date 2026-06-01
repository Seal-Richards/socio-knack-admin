import React from "react";
import type { AgentMetrics } from "@/types/agent";

export default function PerformanceMetrics({ metrics }: { metrics?: AgentMetrics }) {
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
						<span className="text-[15px] font-medium text-gray-800">Success Rate</span>
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
		</div>
	);
}
