"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

export interface EmptyStateProps {
	title?: string;
	description?: string;
	icon?: string;
	actionLabel?: string;
	onAction?: () => void;
	className?: string;
}

export default function Empty({
	title = "No Data Found",
	description = "There are currently no records to display.",
	icon = "solar:box-minimalistic-bold-duotone",
	actionLabel,
	onAction,
	className = "",
}: EmptyStateProps) {
	return (
		<div
			className={`flex w-full flex-col items-center justify-center px-4 py-16 text-center ${className}`}
		>
			<div className="mb-4 flex size-20 items-center justify-center rounded-full bg-blue-50/30 text-[#1d4ea8]">
				<Icon icon={icon} className="size-10 opacity-80" />
			</div>
			<h3 className="mb-2 text-lg font-bold text-gray-800">{title}</h3>
			<p className="mb-6 max-w-md text-[14px] text-gray-500">{description}</p>
			{actionLabel && onAction && (
				<Button
					onClick={onAction}
					className="h-11 gap-2 rounded-xl bg-[#1d4ea8] px-6 text-[14px] font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95"
				>
					{actionLabel}
				</Button>
			)}
		</div>
	);
}
