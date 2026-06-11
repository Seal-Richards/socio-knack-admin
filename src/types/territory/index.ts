// src/types/territory/index.ts

import type { UserProfileData } from "@/types/profile";

export type TerritoryData = {
	_id: string;
	id?: string;
	name: string;
	color: string;
	description?: string;
	salesTarget?: number;
	warningMessage?: string;
	boundary: {
		type: "Polygon";
		coordinates: number[][][]; // Array of arrays of [longitude, latitude]
	};
	assignedSupervisor?: UserProfileData | null;
	assignedAgents: UserProfileData[];
	status: "active" | "inactive";
	createdBy?: UserProfileData;
	updatedBy?: UserProfileData;
	createdAt?: string;
	updatedAt?: string;
};

export type TerritorySalesTargetData = {
	name: string;
	dateStr: string;
	sales: number;
	target: number;
}[];
