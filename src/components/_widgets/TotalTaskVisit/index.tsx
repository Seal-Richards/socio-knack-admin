"use client";

import cn from "@/lib/utils";

interface TotalTaskVisitWidgetProps {
	label: string;
	value: string | number;
	className?: string;
}

export default function TotalTaskVisitWidget({
	label,
	value,
	className,
}: TotalTaskVisitWidgetProps) {
	return (
		<div
			className={cn(
				"group relative flex flex-col rounded-[1.5rem] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl border border-transparent hover:border-gray-100",
				className,
			)}
		>
			<div className="mb-6 flex items-center justify-between">
				<span className="text-[15px] font-bold tracking-tight text-gray-500">{label}</span>
			</div>

			<div className="flex items-end justify-between">
				<h4 className="text-[2.25rem] font-black leading-none tracking-tighter text-[#10b981]">
					{value}
				</h4>
			</div>
		</div>
	);
}
