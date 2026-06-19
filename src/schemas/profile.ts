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
		oldPassword: z.string().min(1, "Old password is required"),
		newPassword: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(/[a-z]/, "Password must contain at least one lowercase letter")
			.regex(/[0-9]/, "Password must contain at least one number")
			.regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
		confirmNewPassword: z.string().min(1, "Please confirm your new password"),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "New passwords do not match",
		path: ["confirmNewPassword"],
	});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
