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
	{ name: "Mon", sales: 40, target: 45 },
	{ name: "Tue", sales: 95, target: 55 },
	{ name: "Wed", sales: 75, target: 65 },
	{ name: "Thu", sales: 110, target: 80 },
	{ name: "Fri", sales: 90, target: 95 },
	{ name: "Sat", sales: 140, target: 110 },
	{ name: "Sun", sales: 160, target: 125 },
];

export default function TerritorySalesTarget() {
	return (
		<div className="mt-4 h-[200px] w-full">
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
						dot={{ r: 4, fill: "#10b981" }}
						activeDot={{ r: 6 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
