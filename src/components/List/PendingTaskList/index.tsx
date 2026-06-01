"use client";

import React from "react";
import TaskListItem, { type TaskItemProps } from "@/components/Task/TaskListItem";

import Empty from "@/components/_atoms/Empty";

interface PendingTaskListProps {
	tasks: Omit<TaskItemProps, "statusColor">[];
}

export default function PendingTaskList({ tasks }: PendingTaskListProps) {
	if (!tasks || tasks.length === 0) {
		return (
			<Empty
				title="No Pending Tasks"
				description="There are no tasks waiting to be processed."
				icon="solar:clock-circle-bold-duotone"
			/>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{tasks.map((task) => (
				<TaskListItem key={task.id} task={{ ...task, statusColor: "red" }} />
			))}
		</div>
	);
}
