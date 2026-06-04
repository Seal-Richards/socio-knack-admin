// src/schemas/profile.ts

import { z } from "zod";

export const profileUpdateSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	phone: z
		.string()
		.refine((val) => !val || val.length >= 10, {
			message: "Phone number must be at least 10 digits",
		})
		.optional(),
	gender: z.string().optional(),
	dob: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	country: z.string().optional(),
	avatar: z.string().optional(),
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

export const changePasswordSchema = z
	.object({
		oldPassword: z.string().min(6, "Old password must be at least 6 characters"),
		newPassword: z.string().min(6, "New password must be at least 6 characters"),
		confirmNewPassword: z.string().min(6, "Confirm new password must be at least 6 characters"),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "New passwords do not match",
		path: ["confirmNewPassword"],
	});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
