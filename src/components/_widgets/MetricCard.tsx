"use client";

import { Icon } from "@iconify/react";
import cn from "@/lib/utils";

interface MetricCardProps {
	label: string;
	value: string | number;
	activeCount?: string;
	icon: string;
	color: "green" | "orange" | "purple" | "red" | "blue";
	className?: string;
}

const colorMap = {
	green: {
		bg: "bg-white",
		iconBg: "bg-green-50",
		iconColor: "text-green-600",
		badge: "bg-green-50 text-green-600",
	},
	orange: {
		bg: "bg-white",
		iconBg: "bg-orange-50",
		iconColor: "text-orange-600",
		badge: "bg-orange-50 text-orange-600",
	},
	purple: {
		bg: "bg-white",
		iconBg: "bg-purple-50",
		iconColor: "text-purple-600",
		badge: "bg-purple-50 text-purple-600",
	},
	red: {
		bg: "bg-white",
		iconBg: "bg-red-50",
		iconColor: "text-red-600",
		badge: "bg-red-50 text-red-600",
	},
	blue: {
		bg: "bg-white",
		iconBg: "bg-blue-50",
		iconColor: "text-blue-600",
		badge: "bg-blue-50 text-blue-600",
	},
};

export default function MetricCard({
	label,
	value,
	activeCount,
	icon,
	color,
	className,
}: MetricCardProps) {
	const colors = colorMap[color];

	return (
		<div
			className={cn(
				"group relative flex flex-col rounded-[1.5rem] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl",
				className,
			)}
		>
			<div className="mb-6 flex items-center justify-between">
				<span className="text-[15px] font-semibold tracking-tight text-gray-500">
					{label}
				</span>
				<div
					className={cn(
						"flex size-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110",
						colors.iconBg,
					)}
				>
					<Icon icon={icon} className={cn("size-5", colors.iconColor)} />
				</div>
			</div>

			<div className="flex items-end justify-between">
				<h4 className="text-[2.25rem] font-bold leading-none tracking-tighter text-gray-900">
					{value}
				</h4>
				{activeCount && (
					<span
						className={cn(
							"rounded-full px-3 py-1.5 text-[11px] font-bold shadow-sm",
							colors.badge,
						)}
					>
						{activeCount}
					</span>
				)}
			</div>
		</div>
	);
}
