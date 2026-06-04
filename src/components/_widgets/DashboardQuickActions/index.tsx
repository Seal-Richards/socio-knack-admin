"use client";

import React from "react";
import Map from "@/components/Map";
import { useGetPendingKYC } from "@/hooks/useDashboard";
import { useGetTerritories } from "@/hooks/useTerritory";
import { useGetAgents } from "@/hooks/useAgent";
import { useSocketAgentTracking } from "@/hooks/useDashboard/useSocketAgentTracking";
import DynamicAvatar from "@/components/_atoms/DynamicAvatar";
import Empty from "@/components/_atoms/Empty";
import Link from "next/link";

export default function DashboardQuickActions() {
	const { data: kycRes } = useGetPendingKYC();
	const pendingUsers = kycRes?.data || [];

	const { data: territoriesRes } = useGetTerritories();
	const zones = territoriesRes?.data || [];

	const { data: agentsRes } = useGetAgents();
	const agents = agentsRes?.data || [];

	useSocketAgentTracking();

	return (
		<div className="flex flex-col gap-6 rounded-3xl border border-gray-50 bg-white p-6 shadow-sm lg:rounded-[2.5rem] lg:p-10">
			<h3 className="text-xl font-black tracking-tight text-gray-900">Live Territory Map</h3>
			<div className="relative min-h-[300px] flex-1 overflow-hidden rounded-3xl border border-gray-100 bg-[#f4f7fc]">
				<Map className="size-full" readOnly zones={zones} agents={agents} />
			</div>

			<div className="mt-4 flex min-h-[250px] flex-col border-t border-gray-50 pt-6">
				<div className="mb-4 flex items-center justify-between">
					<h4 className="text-[17px] font-black tracking-tight text-gray-900">
						Pending Approvals
					</h4>
				</div>
				<div className="mb-4 flex flex-wrap gap-4">
					<button className="border-b-2 border-[#1d4ea8] pb-1 text-[13px] font-bold text-[#1d4ea8]">
						KYC Verifications
					</button>
					{/* Hidden Dispute Resolutions per user request */}
				</div>

				<div className="flex flex-1 flex-col gap-3">
					{pendingUsers.length === 0 ? (
						<Empty
							title="No Pending KYC"
							description="All users are verified."
							icon="solar:check-circle-bold-duotone"
						/>
					) : (
						pendingUsers.map((user) => (
							<div
								key={user._id}
								className="flex items-center justify-between rounded-xl border border-gray-100 p-3 hover:bg-gray-50"
							>
								<div className="flex items-center gap-3">
									<Link href={`/dashboard/${user.role}/${user._id}`}>
										<DynamicAvatar
											name={`${user.firstName} ${user.lastName}`}
											image={user.avatar}
											className="size-10 rounded-full border border-gray-200"
										/>
									</Link>
									<div>
										<p className="text-[14px] font-bold text-gray-900">
											{user.firstName} {user.lastName}
										</p>
										<p className="text-[12px] font-semibold capitalize text-gray-500">
											{user.role}
										</p>
									</div>
								</div>
								<span className="rounded-full bg-orange-100 px-3 py-1 text-[12px] font-bold text-orange-600">
									Pending
								</span>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
