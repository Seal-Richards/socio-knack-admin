"use client";

import React from "react";
import cn from "@/lib/utils";

interface TabItem {
	id: string;
	label: string;
	icon?: string;
}

interface TabsProps {
	tabs: TabItem[];
	activeTab: string;
	onChange: (id: string) => void;
	className?: string;
}

export default function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
	return (
		<div className={cn("flex items-center gap-8 border-b border-gray-100", className)}>
			{tabs.map((tab) => {
				const isActive = activeTab === tab.id;
				return (
					<button
						key={tab.id}
						onClick={() => onChange(tab.id)}
						className={cn(
							"relative pb-4 text-[15px] font-semibold transition-all duration-200",
							isActive ? "text-[#1d4ea8]" : "text-gray-400 hover:text-gray-600",
						)}
					>
						{tab.label}
						{isActive && (
							<div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-[#1d4ea8]" />
						)}
					</button>
				);
			})}
		</div>
	);
}
