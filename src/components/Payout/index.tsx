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
