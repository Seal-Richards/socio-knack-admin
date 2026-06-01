// src/schemas/invite.ts

import { z } from "zod";

export const inviteSupervisorSchema = z.object({
	email: z.string().email("Invalid email address").min(1, "Email is required"),
});

export type InviteSupervisorFormData = z.infer<typeof inviteSupervisorSchema>;

export const inviteStaffSchema = z.object({
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	position: z.string().min(1, "Position is required for staff members"),
});

export type InviteStaffFormData = z.infer<typeof inviteStaffSchema>;

export const inviteTeamSchema = z
	.object({
		email: z.string().email("Invalid email address").min(1, "Email is required"),
		role: z.enum(["supervisor", "staff"], {
			required_error: "Role is required",
		}),
		position: z.string().optional(),
	})
	.refine(
		(data) => {
			if (data.role === "staff") {
				return !!data.position && data.position.trim().length > 0;
			}
			return true;
		},
		{
			message: "Position is required when inviting staff",
			path: ["position"],
		},
	);

export type InviteTeamFormData = z.infer<typeof inviteTeamSchema>;
