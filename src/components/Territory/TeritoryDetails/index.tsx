"use client";

import React from "react";
import SupervisorDetailsCard from "@/components/Cards/SupervisorDetailsCard";
import TerritorySalesTarget from "@/components/_widgets/TerritorySalesTarget";
import { Icon } from "@iconify/react";

export default function TeritoryDetails() {
	return (
		<div className="flex flex-col gap-6">
			<div>
				<div className="mb-6 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon
							icon="solar:map-point-bold-duotone"
							className="size-5 text-[#1d4ea8]"
						/>
						<h2 className="text-lg font-black tracking-tight text-gray-900">
							Territory Details
						</h2>
						<span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-[#1d4ea8]">
							<span className="size-2 rounded-full bg-[#10b981]" />
							Yaba
						</span>
					</div>
				</div>

				<h3 className="mb-4 text-[15px] font-black tracking-tight text-gray-900">
					Supervisor
				</h3>
				<SupervisorDetailsCard
					name="John Dea"
					designation="Supervisor"
					avatar="/assets/images/admin-avatar.png"
				/>
			</div>

			<div className="border-t border-gray-50 pt-6">
				<h3 className="mb-4 text-[15px] font-black tracking-tight text-gray-900">
					Sales vs. Target
				</h3>
				<TerritorySalesTarget />
			</div>
		</div>
	);
}
