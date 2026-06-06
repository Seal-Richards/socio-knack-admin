// src/types/reportsPayout.ts

export type MonthlyHoursData = {
	name: string;
	hours: number;
};

export type MonthlyRevenueLeadsData = {
	name: string;
	revenue: number;
	leads: number;
};

export type ReportsPayoutMetrics = {
	totalPayout: number;
	totalRevenue: number;
	totalVisits: number;
	roiEfficiency: number;
	hoursInField: MonthlyHoursData[];
	revenueLeads: MonthlyRevenueLeadsData[];
};

export type ReportPayoutItem = {
	id: string;
	taskTitle: string;
	agentName: string;
	agentEmail: string;
	territory: string;
	successRate: string;
	incentiveAmount: string;
	status: "paid" | "pending" | "failed";
};

export interface ChecklistItem {
	_id: string;
	title: string;
	isCompleted: boolean;
}

export interface AgentDetails {
	firstName: string;
	lastName: string;
	avatar?: string;
	email: string;
}

export interface ProductDetails {
	name: string;
	category: string;
}

export interface SaleDetails {
	productId?: ProductDetails;
	quantity?: number;
	saleValue?: number;
	paymentMode?: string;
	amount?: number;
}

export interface VisitReportDetails {
	outcome?: string;
	notes?: string;
	customerFullName?: string;
	customerPhoneNumber?: string;
	photos?: string[];
	pdfDocuments?: string[];
	saleDetails?: SaleDetails;
}

export interface VisitDetails {
	_id: string;
	title: string;
	priority: string;
	checkInTime?: string;
	checkOutTime?: string;
	isApproved: boolean;
	agentId?: AgentDetails;
	report?: VisitReportDetails;
	checklist?: ChecklistItem[];
}
