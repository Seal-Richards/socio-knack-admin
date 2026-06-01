import React from "react";
import type { AgentData } from "@/types/agent";
import { Icon } from "@iconify/react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Compliance({ agent }: { agent: AgentData }) {
	return (
		<div className="flex min-h-[400px] flex-col rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:p-10">
			<h3 className="mb-6 text-[14px] font-bold text-gray-500 sm:text-[15px]">
				Compliance Checklist
			</h3>
			<div className="max-w-xl space-y-4">
				<div className="flex items-center justify-between border-b border-gray-50 pb-4">
					<div className="flex flex-col">
						<span className="text-[14px] font-bold text-gray-800">
							Mandatory GPS Check-in
						</span>
						<span className="mt-1 text-[12px] font-medium text-gray-400">
							Verifies real-time coordinates during visit start and end
						</span>
					</div>
					<div className="flex items-center gap-2 text-[13px] font-bold text-green-600">
						<Icon icon="lucide:check-circle" className="size-5" />
						Active
					</div>
				</div>

				<div className="flex items-center justify-between border-b border-gray-50 pb-4">
					<div className="flex flex-col">
						<span className="text-[14px] font-bold text-gray-800">
							Photo Verification Required
						</span>
						<span className="mt-1 text-[12px] font-medium text-gray-400">
							Agents must submit up to 5 photos with reports
						</span>
					</div>
					<div className="flex items-center gap-2 text-[13px] font-bold text-green-600">
						<Icon icon="lucide:check-circle" className="size-5" />
						Active
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex flex-col">
						<span className="text-[14px] font-bold text-gray-800">
							Geofenced Visit Radius Limit
						</span>
						<span className="mt-1 text-[12px] font-medium text-gray-400">
							Limits check-ins to exactly 200m from assigned customer location
						</span>
					</div>
					<div className="flex items-center gap-2 text-[13px] font-bold text-green-600">
						<Icon icon="lucide:check-circle" className="size-5" />
						Active
					</div>
				</div>
			</div>
		</div>
	);
}
