// src/types/profile/index.ts

export type UserProfileBusiness = {
	id: string;
	name: string;
	domain?: string;
	logo?: string;
	subscriptionPlan?: string;
	subscriptionStatus?: string;
	isVerified?: boolean;
	createdAt?: string;
	fincraAccountNumber?: string;
	country?: string;
	state?: string;
	city?: string;
	currency?: string;
	timeZone?: string;
	regulatoryRegion?: string;
};

export type UserProfileTerritory = {
	id: string;
	name: string;
	region?: string;
};

export type UserProfileData = {
	id: string;
	_id?: string;
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
	kycComment?: string;
	kycDocuments?: {
		idType?: string;
		idNumber?: string;
		idFront?: string;
		idBack?: string;
		selfie?: string;
	} | null;
	status?: string;
	isVerified?: boolean;
	business?: UserProfileBusiness | null;
	territory?: UserProfileTerritory | null;
	createdAt?: string;
	updatedBy?: {
		id: string;
		firstName: string;
		lastName: string;
	} | null;
	kycStatusUpdatedBy?: {
		id: string;
		firstName: string;
		lastName: string;
	} | null;
	isOnline?: boolean;
	hasPaymentPin?: boolean;
	isSecurityPinEnabled?: boolean;
	lastLogoutTime?: string;
	lastCheckInTime?: string;
	lastCheckIn?: string;
	territoryId?: any;
	territoryCount?: number;
	agentCount?: number;
	assignedZones?: string;
	location?: {
		address?: string;
		latitude?: number;
		longitude?: number;
	} | null;
	lastKnownLocation?: {
		latitude: number;
		longitude: number;
		lastUpdated?: string;
	};
	compliance?: {
		termsAccepted: boolean;
		dataProcessingConsent: boolean;
		locationConsent: boolean;
		incentivePolicyAccepted: boolean;
		acceptedAt?: string;
	};
	metrics?: {
		assignedVisits: number;
		totalZones: number;
		completedVisits: number;
		successRate: number;
	};
	agents?: Array<{
		id: string;
		name: string;
		email: string;
		phone: string;
		isOnline: boolean;
		lastCheckIn: string;
		avatar: string;
		status: string;
		statusColor: string;
	}>;
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
	compliance?: {
		termsAccepted?: boolean;
		dataProcessingConsent?: boolean;
		locationConsent?: boolean;
		incentivePolicyAccepted?: boolean;
	};
};

export type UpdatePasswordPayload = {
	oldPassword?: string;
	newPassword?: string;
};

export type InvitationData = {
	_id: string;
	email: string;
	role: string;
	position?: string;
	status: string;
	expiresAt: string;
};

export type NigeriaStatesAndCities = Record<string, string[]>;
