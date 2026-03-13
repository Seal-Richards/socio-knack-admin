"use client";

import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const data = [
	{ name: "Jan", revenue: 40, leads: 45 },
	{ name: "Feb", revenue: 95, leads: 55 },
	{ name: "Mar", revenue: 75, leads: 65 },
	{ name: "Apr", revenue: 110, leads: 80 },
	{ name: "May", revenue: 90, leads: 95 },
	{ name: "Jun", revenue: 140, leads: 110 },
	{ name: "Jul", revenue: 160, leads: 125 },
	{ name: "Aug", revenue: 130, leads: 115 },
	{ name: "Sep", revenue: 180, leads: 140 },
	{ name: "Oct", revenue: 150, leads: 155 },
	{ name: "Nov", revenue: 200, leads: 170 },
	{ name: "Dec", revenue: 220, leads: 185 },
];

export default function LeadGeneratedRevenue() {
	return (
		<div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm">
			<h3 className="mb-6 text-center text-sm font-medium text-gray-500">
				Revenue/Leads Generated
			</h3>
			<div className="h-[250px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data}>
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
						/>
						<Tooltip
							contentStyle={{
								borderRadius: "12px",
								border: "none",
								boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
							}}
						/>
						<Line
							type="monotone"
							dataKey="revenue"
							stroke="#10b981"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							type="monotone"
							dataKey="leads"
							stroke="#1d4ea8"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
