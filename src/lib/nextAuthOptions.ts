// src/lib/nextAuthOptions.ts
import type { NextAuthConfig, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

import env from "@src/env";
import "next-auth/jwt";

declare module "next-auth" {
	interface User {
		role?: string;
		backendToken?: string;
	}
	interface Session {
		user: {
			id?: string;
			role?: string;
			backendToken?: string;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id?: string;
		role?: string;
		backendToken?: string;
	}
}

export const nextAuthOptions: NextAuthConfig = {
	secret: env.NEXTAUTH_SECRET,
	session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				// Standard Login
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
				// OTP Login Flow
				otp: { label: "OTP", type: "text" },
				isOtpFlow: { label: "isOtpFlow", type: "text" },
			},
			async authorize(credentials) {
				try {
					interface BackendResponse {
						success: boolean;
						message?: string;
						token?: string;
						user?: {
							_id?: string;
							id?: string;
							name?: string;
							email?: string;
							role?: string;
						};
					}

					let data: BackendResponse;

					// --- CASE 1: VERIFY OTP (Admin) ---
					if (
						credentials?.isOtpFlow === "true" &&
						credentials?.otp &&
						credentials?.email
					) {
						const response = await axios.post<BackendResponse>(
							`${env.NEXT_PUBLIC_ADMIN_API_BASE_URL}/auth/verify-email`,
							{ email: credentials.email, otp: credentials.otp },
						);
						data = response.data;
					}
					// --- CASE 2: STANDARD LOGIN (or initial Admin check) ---
					else if (credentials?.email && credentials?.password) {
						const response = await axios.post<BackendResponse>(
							`${env.NEXT_PUBLIC_ADMIN_API_BASE_URL}/auth/login`,
							{ email: credentials.email, password: credentials.password },
						);
						data = response.data;
					} else {
						throw new Error("Missing credentials");
					}

					if (!data.success) throw new Error(data.message ?? "Login failed");

					// NOTE: If the backend says "requireOtp", authorize() will technically succeed
					// if we return an object, but we won't have a token.
					// *However*, we are handling the "first step" of admin login via
					// the React Hook (useAdminLogin) in the UI, so authorize() is only
					// called when we actually have a token to give (OTP verify or Standard login).

					if (!data.token) {
						return null; // Don't create session if no token
					}

					return {
						id: data.user?._id || data.user?.id || "",
						name: data.user?.name,
						email: data.user?.email,
						role: data.user?.role,
						backendToken: data.token,
					};
				} catch (error) {
					if (axios.isAxiosError(error)) {
						console.error("Auth Error:", error.response?.data ?? error.message);
					} else {
						console.error("Auth Error:", (error as Error).message);
					}
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			// Spread token and safely add properties without reassigning parameter
			if (user) {
				const u = user as { role?: string; backendToken?: string; id?: string };
				return {
					...token,
					id: u.id || token.sub,
					backendToken: u.backendToken,
					role: u.role,
				};
			}
			return token;
		},
		async session({ session, token }) {
			// Return a clean session object spreading previous state
			return {
				...session,
				user: {
					...session.user,
					id: token.id!,
					role: token.role,
					backendToken: token.backendToken,
				},
			};
		},
	},
	pages: { signIn: "/login" },
};
