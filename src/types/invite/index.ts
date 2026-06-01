// src/types/invite/index.ts

export type InviteSupervisorPayload = {
	email: string;
};

export type InviteStaffPayload = {
	email: string;
	position: string;
};

export type InvitationResponseData = {
	id: string;
	email: string;
	position?: string;
	expiresAt: string;
};
