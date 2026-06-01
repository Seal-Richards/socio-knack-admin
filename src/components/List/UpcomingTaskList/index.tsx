"use client";

import React from "react";
import TaskListItem, { type TaskItemProps } from "@/components/Task/TaskListItem";

import Empty from "@/components/_atoms/Empty";

interface UpcomingTaskListProps {
	tasks: Omit<TaskItemProps, "statusColor">[];
}

export default function UpcomingTaskList({ tasks }: UpcomingTaskListProps) {
	if (!tasks || tasks.length === 0) {
		return (
			<Empty
				title="No Upcoming Tasks"
				description="There are no scheduled tasks in the near future."
				icon="solar:calendar-add-bold-duotone"
			/>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{tasks.map((task) => (
				<TaskListItem key={task.id} task={{ ...task, statusColor: "yellow" }} />
			))}
		</div>
	);
}
