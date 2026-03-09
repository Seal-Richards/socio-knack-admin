"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";

interface TaskItem {
	id: number;
	agentName: string;
	agentAvatar: string;
	date: string;
	time: string;
	location: string;
	store: string;
	distance: string;
}

export default function TaskList({ tasks }: { tasks: TaskItem[] }) {
	return (
		<div className="space-y-4">
			{tasks.map((task) => (
				<div
					key={task.id}
					className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md"
				>
					<div className="flex items-center gap-4">
						<div className="size-2 rounded-full bg-[#1d4ea8]" />
						<div className="flex items-center gap-3">
							<div className="relative size-10 overflow-hidden rounded-full border border-gray-100">
								<Image
									src={task.agentAvatar}
									alt={task.agentName}
									fill
									className="object-cover"
								/>
							</div>
							<span className="text-[15px] font-bold text-gray-700">
								{task.agentName}
							</span>
						</div>
					</div>

					<div className="flex items-center gap-8">
						<div className="flex items-center gap-2 text-[13px] font-medium text-gray-400">
							<Icon icon="solar:calendar-bold" className="size-4 text-[#1d4ea8]" />
							<span>{task.date}</span>
						</div>
						<div className="flex items-center gap-2 text-[13px] font-medium text-gray-400">
							<Icon
								icon="solar:clock-circle-bold"
								className="size-4 text-[#1d4ea8]"
							/>
							<span>{task.time}</span>
						</div>
						<div className="flex items-center gap-2 text-[13px] font-medium text-gray-400">
							<Icon icon="solar:user-speak-bold" className="size-4 text-[#1d4ea8]" />
							<span>{task.location}</span>
						</div>
						<div className="flex items-center gap-2 text-[13px] font-medium text-gray-400">
							<Icon icon="solar:shop-bold" className="size-4 text-[#1d4ea8]" />
							<div className="flex flex-col">
								<span className="font-bold leading-none text-gray-700">
									{task.store}
								</span>
								<span className="mt-0.5 text-[11px]">{task.distance}</span>
							</div>
						</div>
					</div>

					<button className="flex size-8 items-center justify-center rounded-full text-[#1d4ea8] hover:bg-gray-100">
						<Icon icon="solar:eye-bold" className="size-5" />
					</button>
				</div>
			))}
		</div>
	);
}
