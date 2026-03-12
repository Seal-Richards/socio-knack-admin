"use client";

import Map from "@/components/Map";

export default function DashboardQuickActions() {
	return (
		<div className="flex flex-col gap-6 rounded-3xl border border-gray-50 bg-white p-6 shadow-sm lg:rounded-[2.5rem] lg:p-10">
			<h3 className="text-xl font-black tracking-tight text-gray-900">Live Territory Map</h3>
			<div className="relative min-h-[300px] flex-1 overflow-hidden rounded-3xl border border-gray-100 bg-[#f4f7fc]">
				<Map className="size-full" />
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
