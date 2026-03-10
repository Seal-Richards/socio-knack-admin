"use client";

import { Icon } from "@iconify/react";
import cn from "@/lib/utils";

interface PendingActionsWidgetProps {
	label: string;
	value: string | number;
	className?: string;
}

export default function PendingActionsWidget({
	label,
	value,
	className,
}: PendingActionsWidgetProps) {
	return (
		<div
			className={cn(
				"group relative flex flex-col rounded-[1.5rem] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl border border-transparent hover:border-gray-100",
				className,
			)}
		>
			<div className="mb-6 flex items-center justify-between">
				<span className="text-[15px] font-bold tracking-tight text-gray-500">{label}</span>
				<div className="flex size-10 items-center justify-center rounded-full bg-blue-50/50 text-[#1d4ea8] transition-all duration-300 group-hover:scale-110">
					<Icon icon="solar:notification-lines-remove-bold" className="size-5" />
				</div>
			</div>

			<div className="flex items-end justify-between">
				<h4 className="text-[2.25rem] font-black leading-none tracking-tighter text-red-500">
					{value}
				</h4>
			</div>
		</div>
	);
}
