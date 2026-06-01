"use client";

import React from "react";
import TaskListItem, { type TaskItemProps } from "@/components/Task/TaskListItem";

import Empty from "@/components/_atoms/Empty";

interface CompletedTaskListProps {
	tasks: Omit<TaskItemProps, "statusColor">[];
}

export default function CompletedTaskList({ tasks }: CompletedTaskListProps) {
	if (!tasks || tasks.length === 0) {
		return (
			<Empty
				title="No Completed Tasks"
				description="There are currently no tasks marked as completed."
				icon="solar:check-circle-bold-duotone"
			/>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{tasks.map((task) => (
				<TaskListItem key={task.id} task={{ ...task, statusColor: "green" }} />
			))}
		</div>
	);
}
