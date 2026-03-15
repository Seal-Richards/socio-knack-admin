"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Tabs from "@/components/Tabs";
import { ONGOING_TASKS, TASK_TABS } from "@/constants/dashboard";
import OngoingTaskList from "@/components/List/OngoingTaskList";
import TodayTaskList from "@/components/List/TodayTaskList";
import UpcomingTaskList from "@/components/List/UpcomingTaskList";
import CompletedTaskList from "@/components/List/CompletedTaskList";
import PendingTaskList from "@/components/List/PendingTaskList";

interface TaskStatusTabProps {
	isModalView?: boolean;
	onSeeMore?: () => void;
}

export default function TaskStatusTab({ isModalView, onSeeMore }: TaskStatusTabProps = {}) {
	const [activeTab, setActiveTab] = useState("Ongoing");

	// For standardizing mock data to fit the props format
	const tasks = ONGOING_TASKS.map((task) => ({
		...task,
		date: task.date,
		time: task.time,
		location: task.location,
		subLocation: task.subLocation,
		distance: task.distance,
		avatar: task.avatar,
		agentName: task.agentName,
	}));

	return (
		<div
			className={
				isModalView
					? "flex flex-col gap-6"
					: "flex flex-col gap-6 rounded-3xl border border-gray-50 bg-white p-5 shadow-sm lg:rounded-[2.5rem] lg:p-8"
			}
		>
			<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
				<div className="flex items-center gap-4 lg:gap-6">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1d4ea8]/5 text-[#1d4ea8]">
						<Icon icon="lucide:clock" className="size-5" />
					</div>
					<Tabs
						tabs={TASK_TABS}
						activeTab={activeTab}
						onChange={setActiveTab}
						className="w-full overflow-x-auto border-none sm:w-auto"
					/>
				</div>
				{!isModalView && (
					<button
						onClick={onSeeMore}
						className="flex shrink-0 items-center gap-2 text-[13px] font-bold text-[#1d4ea8] hover:underline"
					>
						<Icon icon="solar:eye-bold" className="size-4" />
						See More
					</button>
				)}
			</div>

			<div className="flex flex-col gap-3">
				{activeTab === "Ongoing" && <OngoingTaskList tasks={tasks} />}
				{activeTab === "Today" && <TodayTaskList tasks={tasks} />}
				{activeTab === "Upcoming" && <UpcomingTaskList tasks={tasks} />}
				{activeTab === "Completed" && <CompletedTaskList tasks={tasks} />}
				{activeTab === "Pending" && <PendingTaskList tasks={tasks} />}
			</div>
		</div>
	);
}
