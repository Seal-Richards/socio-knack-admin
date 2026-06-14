// src/lib/axiosInstance.ts

"use client";

import axios, { type AxiosError } from "axios";
import { getAuthToken, clearAuth } from "@/utils/auth";
import { toast } from "@/lib/toast";
import env from "@src/env";
import { signOut } from "next-auth/react";

const axiosInstance = axios.create({
	baseURL: env.NEXT_PUBLIC_ADMIN_API_BASE_URL,
	headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
	async (config) => {
		const token = await getAuthToken();
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error: AxiosError<{ message?: string }>) => {
		const errResponse = error.response;

		const isAuthRoute =
			error.config?.url?.includes("/auth/login") ||
			error.config?.url?.includes("/auth/verify-email") ||
			error.config?.url?.includes("/auth/resend-otp") ||
			error.config?.url?.includes("/auth/forgot-password") ||
			error.config?.url?.includes("/auth/forgot-verify-otp") ||
			error.config?.url?.includes("/auth/reset-password") ||
			error.config?.url?.includes("/auth/verify-invite");

		if (errResponse?.status === 401 && !isAuthRoute) {
			const errorMessage =
				errResponse.data?.message ?? "Session expired, please log in again.";
			clearAuth();
			toast.error(errorMessage);
			if (typeof window !== "undefined") {
				await signOut({ redirect: true, callbackUrl: "/login" });
			}
		}

		return Promise.reject(error);
	},
);

export default axiosInstance;
