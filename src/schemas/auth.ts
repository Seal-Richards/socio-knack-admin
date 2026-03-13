import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const adminIdentitySchema = z
	.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		email: z.string().email("Invalid email address").min(1, "Email is required"),
		phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type AdminIdentityFormData = z.infer<typeof adminIdentitySchema>;
