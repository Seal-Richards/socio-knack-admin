// src/types/next-auth.d.ts
// Augments the NextAuth Session/User types with custom fields from the backend JWT.
// NOTE: The primary augmentation lives in src/lib/nextAuthOptions.ts.
// This file only adds fields not already declared there (id, position, token).

import "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
			role?: string;
			position?: string;
			backendToken?: string;
		};
	}

	interface User {
		id: string;
		position?: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id?: string;
		position?: string;
	}
}
