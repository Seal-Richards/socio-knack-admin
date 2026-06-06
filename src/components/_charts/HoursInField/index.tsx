"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type HoursInFieldProps = {
	data?: Array<{ name: string; hours: number }>;
};

export default function HoursInField({ data = [] }: HoursInFieldProps) {
	return (
		<div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm">
			<h3 className="mb-6 text-center text-sm font-medium text-gray-500">
				Total Hours in Field
			</h3>
			<div className="h-[250px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={data}>
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
							cursor={{ fill: "transparent" }}
							contentStyle={{
								borderRadius: "12px",
								border: "none",
								boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
							}}
						/>
						<Bar dataKey="hours" fill="#1d4ea8" radius={[4, 4, 0, 0]} barSize={20} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
