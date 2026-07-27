"use client";

import React from "react";
import TaskListItem, { type TaskItemProps } from "@/components/Task/TaskListItem";
import Empty from "@/components/_atoms/Empty";

interface CancelledTaskListProps {
	tasks: Omit<TaskItemProps, "statusColor">[];
	onView?: (task: Omit<TaskItemProps, "statusColor">) => void;
}

export default function CancelledTaskList({ tasks, onView }: CancelledTaskListProps) {
	if (!tasks || tasks.length === 0) {
		return (
			<Empty
				title="No Cancelled Tasks"
				description="There are no cancelled or rejected tasks."
				icon="solar:close-circle-bold-duotone"
			/>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{tasks.map((task) => (
				<TaskListItem
					key={task.id}
					task={{ ...task, statusColor: "grey" }}
					onView={onView ? () => onView(task) : undefined}
				/>
			))}
		</div>
	);
}
