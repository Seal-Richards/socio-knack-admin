// src/types/generic.ts

export type ApiResponse<T = unknown> = {
	success: boolean;
	message: string;
	data?: T;
	token?: string;
	otpSent?: boolean;
	email?: string;
	exists?: boolean;
	user?: T;
};
