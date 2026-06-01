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

export const otpSchema = z.object({
	otp: z
		.string()
		.length(6, "OTP must be exactly 6 digits")
		.regex(/^\d+$/, "OTP must contain only digits"),
});

export type OtpFormData = z.infer<typeof otpSchema>;

export const forgotPasswordSchema = z.object({
	email: z.string().email("Invalid email address").min(1, "Email is required"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
	.object({
		otp: z
			.string()
			.length(6, "OTP must be exactly 6 digits")
			.regex(/^\d+$/, "OTP must contain only digits"),
		newPassword: z.string().min(6, "Password must be at least 6 characters"),
		confirmNewPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "Passwords don't match",
		path: ["confirmNewPassword"],
	});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// Supervisor & Staff onboarding schemas
export const supervisorPersonalSetupSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	phone: z.string().min(10, "Phone number must be at least 10 digits"),
	dob: z.string().min(1, "Date of birth is required"),
	gender: z.string().min(1, "Gender is required"),
	city: z.string().min(1, "City is required"),
	state: z.string().min(1, "State is required"),
	country: z.string().min(1, "Country is required"),
});

export type SupervisorPersonalSetupFormData = z.infer<typeof supervisorPersonalSetupSchema>;

export const supervisorSecuritySetupSchema = z
	.object({
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type SupervisorSecuritySetupFormData = z.infer<typeof supervisorSecuritySetupSchema>;
