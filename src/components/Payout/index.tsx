"use client";

import React from "react";
import HoursInField from "@/components/_charts/HoursInField";
import LeadGeneratedRevenue from "@/components/_charts/LeadGeneratedRevenue";
import ReportPayoutList from "@/components/List/ReportPayoutList";
import AgentPayoutWidget from "@/components/_widgets/AgentPayout";
import AgentRevenueWidget from "@/components/_widgets/AgentRevenue";
import TotalTaskVisitWidget from "@/components/_widgets/TotalTaskVisit";
import AgentRoiWidget from "@/components/_widgets/AgentRoi";
import { useGetReportsPayoutMetrics } from "@/hooks/useReportsPayout";
import { Icon } from "@iconify/react";

export default function Payout() {
	const { data: metricsRes, isLoading } = useGetReportsPayoutMetrics();
	const metrics = metricsRes?.data;

	if (isLoading) {
		return (
			<div className="flex h-64 items-center justify-center">
				<div className="size-8 animate-spin rounded-full border-4 border-[#1d4ea8] border-t-transparent" />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-10">
			{/* Top Actions & Metrics Section */}
			<div className="flex flex-col gap-8">
				<div className="flex items-center justify-end gap-4">
					<div className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-sm transition-colors hover:bg-gray-50">
						<Icon icon="lucide:calendar" className="size-4 text-gray-400" />
						<span className="text-sm font-semibold text-gray-600">
							January 1st - 15th, 2026
						</span>
						<Icon icon="lucide:chevron-down" className="size-4 text-gray-400" />
					</div>
					<button className="flex items-center gap-2 rounded-xl bg-[#1e288e] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
						<Icon icon="lucide:download" className="size-4" />
						Export CSV/PDF
					</button>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
					<AgentPayoutWidget
						label="Total Agent Payout"
						value={metrics?.totalPayout ? metrics.totalPayout.toLocaleString() : "0"}
					/>
					<AgentRevenueWidget
						label="Revenue"
						value={metrics?.totalRevenue ? metrics.totalRevenue.toLocaleString() : "0"}
					/>
					<TotalTaskVisitWidget
						label="Approved visits"
						value={metrics?.totalVisits ?? "0"}
					/>
					<AgentRoiWidget label="ROI Efficiency" value={metrics?.roiEfficiency ?? 0} />
				</div>
			</div>

			<div className="flex flex-col gap-6 rounded-[2.5rem] bg-white p-8 shadow-sm">
				<div className="flex items-center gap-2">
					<div className="size-2 rounded-full bg-green-500" />
					<h2 className="text-lg font-bold text-gray-900">
						Performance vs Cost Efficiency
					</h2>
				</div>
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					<HoursInField data={metrics?.hoursInField} />
					<LeadGeneratedRevenue data={metrics?.revenueLeads} />
				</div>
			</div>

			<ReportPayoutList />
		</div>
	);
}
