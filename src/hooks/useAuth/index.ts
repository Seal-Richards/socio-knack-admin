// src/hooks/useAuth/index.ts

import { useMutation, useQuery } from "@tanstack/react-query";
import { authRequests } from "@/lib/requests/auth";
import type {
	LoginPayload,
	RegisterAdminPayload,
	ResendOtpPayload,
	ForgotPasswordPayload,
	VerifyForgotPasswordOtpPayload,
	ResetForgotPasswordPayload,
	RegisterSupervisorPayload,
} from "@/types/auth";

export function useLoginOtp() {
	return useMutation({
		mutationFn: (body: LoginPayload) => authRequests.login(body),
	});
}

export function useRegisterAdmin() {
	return useMutation({
		mutationFn: (body: RegisterAdminPayload) => authRequests.registerAdmin(body),
	});
}

export function useVerifyEmailOtp() {
	return useMutation({
		mutationFn: (body: { email: string; otp: string }) => authRequests.verifyEmailOtp(body),
	});
}

export function useResendOtp() {
	return useMutation({
		mutationFn: (body: ResendOtpPayload) => authRequests.resendOtp(body),
	});
}

export function useForgotPassword() {
	return useMutation({
		mutationFn: (body: ForgotPasswordPayload) => authRequests.forgotPassword(body),
	});
}

export function useVerifyForgotOtp() {
	return useMutation({
		mutationFn: (body: VerifyForgotPasswordOtpPayload) =>
			authRequests.verifyForgotPasswordOtp(body),
	});
}

export function useResetPassword() {
	return useMutation({
		mutationFn: (body: ResetForgotPasswordPayload) => authRequests.resetForgotPassword(body),
	});
}

export function useVerifyInvite(token?: string, email?: string) {
	return useQuery({
		queryKey: ["verifyInvite", token, email],
		queryFn: () => authRequests.verifyInvite(token || "", email || ""),
		enabled: !!token && !!email,
		retry: false,
	});
}

export function useRegisterSupervisorOnboarding() {
	return useMutation({
		mutationFn: (body: RegisterSupervisorPayload) => authRequests.registerSupervisor(body),
	});
}
