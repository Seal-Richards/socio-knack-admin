// src/types/agent/index.ts

export type AgentWallet = {
	balance: number;
	fincraAccountNumber?: string;
	fincraBankName?: string;
	fincraAccountName?: string;
};

export type AgentMetrics = {
	completedVisits: number;
	totalVisits: number;
	successRate: number;
	pendingVisits: number;
	inProgressVisits: number;
};

export type AgentKycDocuments = {
	idType?: string;
	idNumber?: string;
	idFront?: string;
	idBack?: string;
	selfie?: string;
};

export type AgentData = {
	_id: string;
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	dob?: string;
	gender?: string;
	residentialAddress?: string;
	city?: string;
	state?: string;
	country?: string;
	avatar?: string;
	role: string;
	status: string;
	kycStatus: string;
	kycComment?: string;
	kycDocuments?: AgentKycDocuments;
	metrics?: AgentMetrics;
	wallet?: AgentWallet | null;
	territoryId?: {
		_id: string;
		name: string;
	} | null;
	updatedAt?: string;
};

export type UpdateAgentProfilePayload = {
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
	dob?: string;
	gender?: string;
	residentialAddress?: string;
	city?: string;
	state?: string;
	country?: string;
};

export type UpdateAgentStatusPayload = {
	status?: string;
	kycStatus?: string;
	comment?: string;
	kycComment?: string;
};
