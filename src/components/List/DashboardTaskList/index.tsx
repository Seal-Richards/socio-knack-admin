"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Tabs from "@/components/Tabs";
import Image from "next/image";
import { ONGOING_TASKS, TASK_TABS } from "@/constants/dashboard";

export default function DashboardTaskList() {
	const [activeTab, setActiveTab] = useState("Ongoing");

	return (
		<div className="flex flex-col gap-6 rounded-3xl border border-gray-50 bg-white p-5 shadow-sm lg:rounded-[2.5rem] lg:p-8">
			<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
				<div className="flex items-center gap-4 lg:gap-6">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#eef1f8] text-[#1d4ea8]">
						<Icon icon="lucide:clock" className="size-5" />
					</div>
					<Tabs
						tabs={TASK_TABS}
						activeTab={activeTab}
						onChange={setActiveTab}
						className="w-full overflow-x-auto border-none sm:w-auto"
					/>
				</div>
				<button className="flex shrink-0 items-center gap-2 text-[13px] font-bold text-[#1d4ea8] hover:underline">
					<Icon icon="solar:eye-bold" className="size-4" />
					See More
				</button>
			</div>

			<div className="flex flex-col gap-3">
				{ONGOING_TASKS.map((task) => (
					<div
						key={task.id}
						className="group flex flex-col justify-between gap-4 rounded-2xl border border-gray-100 bg-[#f4f7fc]/50 p-4 transition-all hover:bg-white hover:shadow-md lg:flex-row lg:items-center lg:gap-0 lg:rounded-3xl"
					>
						<div className="flex flex-wrap items-center gap-4 lg:flex-nowrap lg:gap-6">
							<div className="hidden size-2 rounded-full bg-[#1d4ea8] shadow-[0_0_10px_rgba(29,78,168,0.4)] lg:block" />

							<div className="flex items-center gap-3">
								<div className="relative size-10 overflow-hidden rounded-full border-2 border-white shadow-sm">
									<Image
										src={task.avatar}
										alt={task.agentName}
										fill
										className="object-cover"
									/>
								</div>
								<span className="text-[15px] font-bold text-gray-800">
									{task.agentName}
								</span>
							</div>

							<div className="mx-2 hidden h-8 w-px bg-gray-200 lg:block" />

							<div className="flex flex-wrap items-center gap-4 text-[12px] font-bold text-gray-500 lg:gap-6 lg:text-[13px]">
								<div className="flex items-center gap-2">
									<Icon
										icon="solar:calendar-bold"
										className="size-4 text-[#1d4ea8]/60"
									/>
									{task.date}
								</div>
								<div className="flex items-center gap-2">
									<Icon
										icon="solar:clock-circle-bold"
										className="size-4 text-[#1d4ea8]/60"
									/>
									{task.time}
								</div>
								<div className="flex items-center gap-2">
									<Icon
										icon="solar:user-rounded-bold"
										className="size-4 text-[#1d4ea8]/60"
									/>
									{task.location}
								</div>
							</div>
						</div>

						<div className="flex items-center justify-between gap-8 lg:justify-end">
							<div className="flex items-center gap-2 text-right">
								<div className="flex flex-col">
									<span className="text-[13px] font-bold text-gray-800">
										{task.subLocation}
									</span>
									<span className="text-[11px] font-bold text-gray-400">
										{task.distance}
									</span>
								</div>
								<Icon
									icon="solar:map-point-bold"
									className="size-4 text-[#1d4ea8]/60"
								/>
							</div>
							<button className="flex size-8 items-center justify-center rounded-full bg-blue-50 text-[#1d4ea8] shadow-inner transition-all hover:bg-[#1d4ea8] hover:text-white">
								<Icon icon="solar:eye-bold" className="size-4" />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
