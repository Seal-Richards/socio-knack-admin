"use client";

import React from "react";
import cn from "@/lib/utils";

type TabItem = {
	id: string;
	label: string;
	icon?: string;
	activeColor?: string;
	activeBg?: string;
	disabled?: boolean;
};

type TabsProps = {
	tabs: TabItem[];
	activeTab: string;
	onChange: (id: string) => void;
	className?: string;
};

export default function Tabs({ tabs = [], activeTab, onChange, className }: TabsProps) {
	return (
		<div
			className={cn(
				"flex items-center gap-8 overflow-x-auto hide-scrollbar border-b border-gray-100",
				className,
			)}
		>
			{tabs?.map((tab) => {
				const isActive = activeTab === tab.id;
				return (
					<button
						key={tab.id}
						onClick={() => !tab.disabled && onChange(tab.id)}
						disabled={tab.disabled}
						className={cn(
							"relative whitespace-nowrap pb-4 text-[15px] font-semibold transition-all duration-200",
							isActive
								? tab.activeColor || "text-[#1d4ea8]"
								: "text-gray-400 hover:text-gray-600",
							tab.disabled && "opacity-40 cursor-not-allowed hover:text-gray-400",
						)}
					>
						{tab.label}
						{isActive && (
							<div
								className={cn(
									"absolute bottom-0 left-0 h-1 w-full rounded-full",
									tab.activeBg || "bg-[#1d4ea8]",
								)}
							/>
						)}
					</button>
				);
			})}
		</div>
	);
}
