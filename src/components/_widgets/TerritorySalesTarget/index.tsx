"use client";

import React, { useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { useGetTerritorySalesTarget } from "@/hooks/useTerritory";

type Period = "daily" | "weekly" | "monthly";

interface TerritorySalesTargetProps {
	territoryId?: string;
}

const PERIODS: { label: string; value: Period }[] = [
	{ label: "Daily", value: "daily" },
	{ label: "Weekly", value: "weekly" },
	{ label: "Monthly", value: "monthly" },
];

function formatCurrency(value: number): string {
	if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}M`;
	if (value >= 1_000) return `₦${(value / 1_000).toFixed(0)}K`;
	return `₦${value}`;
}

export default function TerritorySalesTarget({ territoryId }: TerritorySalesTargetProps) {
	const [period, setPeriod] = useState<Period>("monthly");
	const { data: salesTargetRes, isLoading } = useGetTerritorySalesTarget(territoryId, period);
	const data = salesTargetRes?.data || [];
	const monthlyTarget = (salesTargetRes as Record<string, unknown> | undefined)?.monthlyTarget as
		| number
		| undefined;

	const renderChart = () => {
		if (isLoading) {
			return (
				<div className="flex h-[200px] w-full items-center justify-center rounded-2xl border border-dashed border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-400">
					Loading chart data...
				</div>
			);
		}

		if (data.length === 0) {
			return (
				<div className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-100 bg-gray-50/50">
					<span className="text-xs font-semibold text-gray-400">
						No sales data for this period
					</span>
					{(!monthlyTarget || monthlyTarget === 0) && (
						<span className="text-[11px] text-gray-300">
							Set a monthly target when editing this zone to see the target line
						</span>
					)}
				</div>
			);
		}

		return (
			<div className="h-[200px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 4 }}>
						<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
						<XAxis
							dataKey="name"
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 10, fill: "#9ca3af" }}
							dy={10}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 10, fill: "#9ca3af" }}
							tickFormatter={formatCurrency}
							width={52}
						/>
						<Tooltip
							contentStyle={{
								borderRadius: "12px",
								border: "none",
								boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
								fontSize: "12px",
							}}
							formatter={(value: number, name: string) => [
								formatCurrency(value),
								name === "sales" ? "Actual Sales" : "Target",
							]}
						/>
						<Legend
							wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
							formatter={(value) => (value === "sales" ? "Actual Sales" : "Target")}
						/>
						<Line
							type="monotone"
							dataKey="sales"
							stroke="#1d4ea8"
							strokeWidth={2}
							dot={{ r: 4, fill: "#1d4ea8" }}
							activeDot={{ r: 6 }}
						/>
						<Line
							type="monotone"
							dataKey="target"
							stroke="#10b981"
							strokeWidth={2}
							strokeDasharray="5 5"
							dot={false}
							activeDot={{ r: 5 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		);
	};

	return (
		<div className="flex flex-col gap-3">
			{/* Period Toggle */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1.5 rounded-xl border border-gray-100 bg-gray-50/80 p-1">
					{PERIODS.map((p) => (
						<button
							key={p.value}
							type="button"
							onClick={() => setPeriod(p.value)}
							className={`rounded-lg px-3 py-1.5 text-[12px] font-bold transition-all ${
								period === p.value
									? "bg-[#1d4ea8] text-white shadow-sm"
									: "text-gray-500 hover:text-gray-700"
							}`}
						>
							{p.label}
						</button>
					))}
				</div>
				{monthlyTarget !== undefined && monthlyTarget > 0 && (
					<span className="text-[11px] font-semibold text-gray-400">
						Monthly target: {formatCurrency(monthlyTarget)}
					</span>
				)}
			</div>

			{/* Chart */}
			{renderChart()}
		</div>
	);
}
