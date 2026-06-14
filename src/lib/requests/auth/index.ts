// src/lib/requests/auth/index.ts

import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/generic";
import type {
	LoginPayload,
	RegisterAdminPayload,
	RegisterAdminResponse,
	ResendOtpPayload,
	ForgotPasswordPayload,
	VerifyForgotPasswordOtpPayload,
	ResetForgotPasswordPayload,
	VerifyInviteResponse,
	RegisterSupervisorPayload,
	VerifyOtpResponse,
} from "@/types/auth";

export const authRequests = {
	async checkEmail(
		email: string,
	): Promise<
		ApiResponse<{ exists: boolean; isVerified: boolean; role: string | null; message?: string }>
	> {
		return apiClient.post<
			ApiResponse<{
				exists: boolean;
				isVerified: boolean;
				role: string | null;
				message?: string;
			}>,
			{ email: string }
		>("/auth/check-email", { email }, "Failed to check email status.");
	},

	async login(
		body: LoginPayload,
	): Promise<ApiResponse<{ token?: string; user?: any; otpSent?: boolean }>> {
		return apiClient.post<
			ApiResponse<{ token?: string; user?: any; otpSent?: boolean }>,
			LoginPayload
		>("/auth/login", body, "Failed to log in. Please try again.");
	},

	async registerAdmin(body: RegisterAdminPayload): Promise<ApiResponse<RegisterAdminResponse>> {
		return apiClient.post<ApiResponse<RegisterAdminResponse>, RegisterAdminPayload>(
			"/auth/register-admin",
			body,
			"Failed to register admin. Please try again.",
		);
	},

	async verifyEmailOtp(body: {
		email: string;
		otp: string;
	}): Promise<ApiResponse<VerifyOtpResponse>> {
		return apiClient.post<ApiResponse<VerifyOtpResponse>, { email: string; otp: string }>(
			"/auth/verify-email",
			body,
			"Failed to verify OTP. Please try again.",
		);
	},

	async resendOtp(body: ResendOtpPayload): Promise<ApiResponse<null>> {
		return apiClient.post<ApiResponse<null>, ResendOtpPayload>(
			"/auth/resend-otp",
			body,
			"Failed to resend OTP. Please try again.",
		);
	},

	async forgotPassword(body: ForgotPasswordPayload): Promise<ApiResponse<null>> {
		return apiClient.post<ApiResponse<null>, ForgotPasswordPayload>(
			"/auth/forgot-password",
			body,
			"Failed to send forgot password email. Please try again.",
		);
	},

	async verifyForgotPasswordOtp(
		body: VerifyForgotPasswordOtpPayload,
	): Promise<ApiResponse<null>> {
		return apiClient.post<ApiResponse<null>, VerifyForgotPasswordOtpPayload>(
			"/auth/forgot-verify-otp",
			body,
			"Failed to verify OTP. Please try again.",
		);
	},

	async resetForgotPassword(body: ResetForgotPasswordPayload): Promise<ApiResponse<null>> {
		return apiClient.post<ApiResponse<null>, ResetForgotPasswordPayload>(
			"/auth/reset-password",
			body,
			"Failed to reset password. Please try again.",
		);
	},

	async verifyInvite(token: string, email: string): Promise<ApiResponse<VerifyInviteResponse>> {
		return apiClient.get<ApiResponse<VerifyInviteResponse>>(
			`/auth/verify-invite?token=${token}&email=${encodeURIComponent(email)}`,
			"Failed to verify invitation link. Please check if the link is valid or expired.",
		);
	},

	async registerSupervisor(
		body: RegisterSupervisorPayload,
	): Promise<ApiResponse<{ token: string; user: VerifyOtpResponse }>> {
		return apiClient.post<
			ApiResponse<{ token: string; user: VerifyOtpResponse }>,
			RegisterSupervisorPayload
		>(
			"/auth/register-supervisor",
			body,
			"Failed to complete onboarding registration. Please try again.",
		);
	},
};
