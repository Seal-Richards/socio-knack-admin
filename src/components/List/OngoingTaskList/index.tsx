"use client";

import React from "react";
import TaskListItem, { type TaskItemProps } from "@/components/Task/TaskListItem";

import Empty from "@/components/_atoms/Empty";

interface OngoingTaskListProps {
	tasks: Omit<TaskItemProps, "statusColor">[];
}

export default function OngoingTaskList({ tasks }: OngoingTaskListProps) {
	if (!tasks || tasks.length === 0) {
		return (
			<Empty
				title="No Ongoing Tasks"
				description="There are currently no tasks in progress."
				icon="solar:play-circle-bold-duotone"
			/>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{tasks.map((task) => (
				<TaskListItem key={task.id} task={{ ...task, statusColor: "blue" }} />
			))}
		</div>
	);
}
