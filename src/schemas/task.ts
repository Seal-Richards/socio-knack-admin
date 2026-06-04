import { z } from "zod";

export const createTaskBasicSchema = z.object({
	title: z.string().min(1, "Visit Name is required."),
	agentId: z.string().min(1, "Please select an agent to assign this task."),
});

export type CreateTaskBasicFormData = z.infer<typeof createTaskBasicSchema>;

export interface TaskFormData {
	title: string;
	scheduledDate: string;
	scheduledTime: string;
	priority: string;
	agentId: string;
	territoryId: string;
	address: string;
	coordinates: number[]; // [lng, lat]
	description: string;
	checklist: Array<{ title: string; isCompleted: boolean }>;
}
