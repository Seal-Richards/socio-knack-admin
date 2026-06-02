"use client";

import React from "react";
import TaskListItem, { type TaskItemProps } from "@/components/Task/TaskListItem";

import Empty from "@/components/_atoms/Empty";

interface TodayTaskListProps {
	tasks: Omit<TaskItemProps, "statusColor">[];
	onView?: (task: Omit<TaskItemProps, "statusColor">) => void;
}

export default function TodayTaskList({ tasks, onView }: TodayTaskListProps) {
	if (!tasks || tasks.length === 0) {
		return (
			<Empty
				title="No Tasks for Today"
				description="There are no tasks scheduled for today."
				icon="solar:calendar-date-bold-duotone"
			/>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{tasks.map((task) => (
				<TaskListItem
					key={task.id}
					task={{ ...task, statusColor: "blue" }}
					onView={onView ? () => onView(task) : undefined}
				/>
			))}
		</div>
	);
}
