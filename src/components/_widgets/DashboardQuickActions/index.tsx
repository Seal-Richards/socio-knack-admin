"use client";

import { Icon } from "@iconify/react";

export default function DashboardQuickActions() {
	return (
		<div className="flex flex-col gap-6 rounded-3xl border border-gray-50 bg-white p-6 shadow-sm lg:rounded-[2.5rem] lg:p-10">
			<h3 className="text-xl font-black tracking-tight text-gray-900">Live Territory Map</h3>
			<div className="relative min-h-[300px] flex-1 overflow-hidden rounded-3xl border border-gray-100 bg-[#f4f7fc]">
				<div className="absolute inset-0 flex items-center justify-center p-6 text-center">
					<div className="relative size-full opacity-60">
						<Icon
							icon="solar:map-bold-duotone"
							className="absolute inset-0 size-full text-[#1d4ea8]/10"
						/>
						<div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border-4 border-[#1d4ea8]/20 bg-[#1d4ea8]/5 lg:size-32" />
					</div>
					<span className="z-10 text-[14px] font-bold text-[#1d4ea8]/40 lg:text-[15px]">
						Territory Live Map
					</span>
				</div>
			</div>

			<div className="mt-4 border-t border-gray-50 pt-6">
				<div className="mb-4 flex items-center justify-between">
					<h4 className="text-[17px] font-black tracking-tight text-gray-900">
						Pending Approvals
					</h4>
				</div>
				<div className="flex flex-wrap gap-4">
					<button className="border-b-2 border-[#1d4ea8] pb-1 text-[13px] font-bold text-[#1d4ea8]">
						KYC Verifications
					</button>
					<button className="pb-1 text-[13px] font-bold text-gray-400">
						Dispute Resolutions
					</button>
				</div>
			</div>
		</div>
	);
}
