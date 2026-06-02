import React from "react";
import { Icon } from "@iconify/react";
import cn from "@/lib/utils";
import DynamicAvatar from "@/components/_atoms/DynamicAvatar";

export interface TaskItemProps {
	id: number | string;
	agentName: string;
	avatar: string;
	date: string;
	time: string;
	location: string;
	subLocation: string;
	distance: string;
	statusColor: "blue" | "yellow" | "green" | "red";
	raw?: Record<string, unknown>;
}

export default function TaskListItem({
	task,
	onView,
}: {
	task: TaskItemProps;
	onView?: () => void;
}) {
	const statusColors = {
		blue: "bg-[#1d4ea8] ring-[#1d4ea8]/20",
		yellow: "bg-[#facc15] ring-[#facc15]/20",
		green: "bg-[#22c55e] ring-[#22c55e]/20",
		red: "bg-[#ef4444] ring-[#ef4444]/20",
	};

	return (
		<div className="group flex flex-col justify-between gap-4 rounded-full border border-gray-200 bg-white p-3 transition-all hover:bg-gray-50 hover:shadow-sm lg:flex-row lg:items-center lg:gap-0">
			<div className="flex flex-wrap items-center gap-4 lg:flex-nowrap lg:gap-6">
				{/* Status Dot */}
				<div className="hidden pl-3 pr-2 lg:flex">
					<div
						className={cn(
							"size-2.5 rounded-full ring-4",
							statusColors[task.statusColor],
						)}
					/>
				</div>

				<div className="flex items-center gap-3">
					<div className="relative flex size-10 items-center justify-center overflow-hidden rounded-full border border-gray-100 shadow-sm">
						<DynamicAvatar
							image={task.avatar}
							name={task.agentName}
							className="size-full"
						/>
					</div>
					<span className="text-[14px] font-bold text-gray-800">{task.agentName}</span>
				</div>

				<div className="ml-4 flex flex-wrap items-center gap-4 text-[12px] font-bold text-gray-500 lg:gap-6 lg:text-[13px]">
					<div className="flex items-center gap-2">
						<Icon icon="solar:calendar-linear" className="size-4 text-[#1d4ea8]" />
						{task.date}
					</div>
					<div className="flex items-center gap-2">
						<Icon icon="solar:clock-circle-linear" className="size-4 text-[#1d4ea8]" />
						{task.time}
					</div>
					<div className="flex items-center gap-2">
						<Icon icon="solar:user-circle-linear" className="size-4 text-[#1d4ea8]" />
						{task.location}
					</div>
				</div>
			</div>

			<div className="flex items-center justify-between gap-8 pr-2 lg:justify-end">
				<div className="flex items-center gap-2 text-right">
					<Icon icon="solar:routing-2-bold" className="size-4 text-[#1d4ea8]" />
					<div className="flex flex-col text-left">
						<span className="text-[12px] font-bold text-gray-800">
							{task.subLocation}
						</span>
						<span className="text-[11px] font-medium text-gray-500">
							{task.distance}
						</span>
					</div>
				</div>
				<button
					onClick={onView}
					className="ml-4 flex size-8 items-center justify-center rounded-full border border-[#1d4ea8]/10 bg-blue-50 text-[#1d4ea8] transition-all hover:bg-[#1d4ea8] hover:text-white"
				>
					<Icon icon="solar:eye-bold" className="size-4" />
				</button>
			</div>
		</div>
	);
}
