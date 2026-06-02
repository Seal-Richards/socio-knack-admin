// src/types/auth/index.ts

export type LoginPayload = {
	email: string;
	password?: string;
};

export type VerifyOtpPayload = {
	email: string;
	otp: string;
};

export type VerifyOtpResponse = {
	id: string;
	firstName: string;
	lastName?: string;
	email?: string;
	role: string;
	position?: string;
};

export type RegisterAdminPayload = {
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
	phone: string;
};

export type RegisterAdminResponse = {
	userId: string;
};

export type ResendOtpPayload = {
	email: string;
};

export type ForgotPasswordPayload = {
	email: string;
};

export type VerifyForgotPasswordOtpPayload = {
	email: string;
	otp: string;
};

export type ResetForgotPasswordPayload = {
	email: string;
	otp: string;
	newPassword?: string;
};

export type VerifyInviteQuery = {
	token: string;
	email: string;
};

export type VerifyInviteResponse = {
	email: string;
	role: string;
	position?: string;
	businessName: string;
};

export type RegisterSupervisorPayload = {
	token: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	dob?: string;
	gender?: string;
	city?: string;
	state?: string;
	country?: string;
	password?: string;
	compliance?: {
		termsAccepted: boolean;
		dataProcessingConsent: boolean;
		locationConsent: boolean;
		incentivePolicyAccepted: boolean;
	};
};
