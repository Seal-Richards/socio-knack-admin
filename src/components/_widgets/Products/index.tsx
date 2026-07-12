"use client";

import { Icon } from "@iconify/react";
import cn from "@/lib/utils";

interface WidgetProps {
	label: string;
	value: string | number;
	className?: string;
	icon: string;
	iconBg: string;
	iconColor: string;
	subValue?: string;
}

export function ProductStatCard({
	label,
	value,
	className,
	icon,
	iconBg,
	iconColor,
	subValue,
}: WidgetProps) {
	return (
		<div
			className={cn(
				"group relative flex flex-col rounded-[1.5rem] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl border border-transparent hover:border-gray-100",
				className,
			)}
		>
			<div className="mb-6 flex items-center justify-between">
				<span className="text-[15px] font-bold tracking-tight text-gray-500">{label}</span>
				<div
					className={cn(
						"flex size-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110",
						iconBg,
						iconColor,
					)}
				>
					<Icon icon={icon} className="size-5" />
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<h4 className="text-[2.25rem] font-black leading-none tracking-tighter text-gray-900">
					{value}
				</h4>
				{subValue && (
					<span className="w-max rounded-lg bg-[#1d4ea8]/5 px-2.5 py-1 text-[11px] font-black text-[#1d4ea8]">
						{subValue}
					</span>
				)}
			</div>
		</div>
	);
}

interface ProductStatsWidgetsProps {
	stats?: {
		totalProducts: number;
		totalSold: number;
		outOfStockProducts: number;
		inactiveProducts: number;
		activeProducts: number;
		totalInStockValue: number;
		totalInStockQty: number;
	};
	isLoading?: boolean;
}

export default function ProductStatsWidgets({ stats, isLoading }: ProductStatsWidgetsProps) {
	const data = [
		{
			label: "All Products & Services",
			value: stats?.totalProducts ?? 0,
			icon: "solar:box-bold-duotone",
			iconBg: "bg-blue-50/50",
			iconColor: "text-[#1d4ea8]",
			subValue:
				stats?.totalInStockValue !== undefined && stats?.totalInStockQty !== undefined
					? `₦${stats.totalInStockValue.toLocaleString()} In-Stock (${stats.totalInStockQty})`
					: undefined,
		},
		{
			label: "Sold",
			value: stats?.totalSold ?? 0,
			icon: "solar:cart-large-bold-duotone",
			iconBg: "bg-green-50/50",
			iconColor: "text-green-600",
		},
		{
			label: "Out of Stock",
			value: stats?.outOfStockProducts ?? 0,
			icon: "solar:box-minimalistic-bold-duotone",
			iconBg: "bg-red-50/50",
			iconColor: "text-red-600",
		},
		{
			label: "Inactive",
			value: stats?.inactiveProducts ?? 0,
			icon: "solar:eye-closed-bold-duotone",
			iconBg: "bg-amber-50/50",
			iconColor: "text-amber-600",
		},
		{
			label: "Active",
			value: stats?.activeProducts ?? 0,
			icon: "solar:verified-check-bold-duotone",
			iconBg: "bg-emerald-50/50",
			iconColor: "text-emerald-600",
		},
	];

	if (isLoading) {
		const skeletonKeys = ["ske-1", "ske-2", "ske-3", "ske-4", "ske-5"];
		return (
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
				{skeletonKeys.map((keyVal) => (
					<div
						key={keyVal}
						className="h-[140px] animate-pulse rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
					/>
				))}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
			{data.map((item) => (
				<ProductStatCard
					key={item.label}
					label={item.label}
					value={item.value}
					icon={item.icon}
					iconBg={item.iconBg}
					iconColor={item.iconColor}
					subValue={item.subValue}
				/>
			))}
		</div>
	);
}
