// src/types/business/index.ts

export type ContactPerson = {
	name?: string | null;
	email?: string | null;
	phone?: string | null;
};

export type SupportContact = {
	email?: string | null;
	phone?: string | null;
};

export type ThemeColors = {
	color1: string;
	color2: string;
};

export type CorporateDocuments = {
	cacCertificate?: string | null;
	taxIdCertificate?: string | null;
	utilityBill?: string | null;
};

export type TeamMember = {
	position?: string | null;
	name?: string | null;
	email?: string | null;
	phone?: string | null;
};

export type TeamMembers = {
	admins?: TeamMember[];
	supervisors?: TeamMember[];
	staffs?: TeamMember[];
};

export type BusinessSettingsData = {
	id: string;
	name: string;
	legalName?: string | null;
	taxId?: string | null;
	hqAddress?: string | null;
	address?: string | null;
	contactEmail?: string | null;
	contactPhone?: string | null;
	logo?: string | null;
	themeColors: ThemeColors;
	currency: string;
	timeZone?: string | null;
	primaryLanguage: string;
	defaultIncentiveType: "flat" | "percentage";
	defaultIncentiveValue: number;
	primaryAdmin?: ContactPerson;
	technicalLead?: ContactPerson;
	supportContact?: SupportContact;
	subscriptionPlan: string;
	subscriptionStatus: string;
	isVerified?: boolean;
	corporateDocuments?: CorporateDocuments | null;
	teamMembers?: TeamMembers | null;
};

export type UpdateBusinessSettingsPayload = {
	name?: string;
	legalName?: string;
	taxId?: string;
	hqAddress?: string;
	address?: string;
	logo?: string;
	themeColors?: ThemeColors | string;
	primaryAdmin?: ContactPerson | string;
	technicalLead?: ContactPerson | string;
	supportContact?: SupportContact | string;
	currency?: string;
	timeZone?: string;
	primaryLanguage?: string;
};

export type UpdateBusinessIncentivePayload = {
	defaultIncentiveType: "flat" | "percentage";
	defaultIncentiveValue: number;
};
