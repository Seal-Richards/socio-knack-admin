export interface DashboardStats {
	totalAgents: number;
	activeAgents: number;
	activeTerritories: number;
	pendingVisits: number;
	completedVisits: number;
	todayTerritorySales: number;
}

export interface VisitData {
	_id: string;
	title: string;
	subtitle?: string;
	status: string;
	priority: string;
	scheduledDate: string;
	checkInTime?: string;
	checkOutTime?: string;
	agentId: {
		_id: string;
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber?: string;
		avatar?: string;
	};
	territoryId?: {
		_id: string;
		name: string;
		color?: string;
		description?: string;
	};
	location?: {
		address: string;
		coordinates: number[];
	};
	report?: {
		outcome: string;
		saleDetails?: {
			productId: any;
			quantity: number;
			saleValue: number;
			paymentMode: string;
		};
	};
}

export interface PendingKYCUser {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	kycStatus: string;
	avatar?: string;
	createdAt: string;
}
