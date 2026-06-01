// src/types/profile/index.ts

export type UserProfileBusiness = {
	id: string;
	name: string;
	domain?: string;
	logo?: string;
	subscriptionPlan?: string;
	subscriptionStatus?: string;
};

export type UserProfileTerritory = {
	id: string;
	name: string;
	region?: string;
};

export type UserProfileData = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	dob?: string;
	gender?: string;
	city?: string;
	state?: string;
	country?: string;
	avatar?: string;
	role: string;
	position?: string | null;
	kycStatus?: string;
	status?: string;
	isVerified?: boolean;
	business?: UserProfileBusiness | null;
	territory?: UserProfileTerritory | null;
	createdAt?: string;
};

export type UpdateProfilePayload = {
	fullName?: string;
	firstName?: string;
	lastName?: string;
	phone?: string;
	dob?: string;
	gender?: string;
	city?: string;
	state?: string;
	country?: string;
	avatar?: string;
};

export type UpdatePasswordPayload = {
	oldPassword?: string;
	newPassword?: string;
};
