import React from "react";
import { Icon } from "@iconify/react";
import { type UserProfileData } from "@/types/profile";

interface ComplianceProps {
	supervisor: {
		raw?: UserProfileData;
	};
}

export default function Compliance({ supervisor }: ComplianceProps) {
	const comp = supervisor.raw?.compliance || {
		termsAccepted: false,
		dataProcessingConsent: false,
		locationConsent: false,
		incentivePolicyAccepted: false,
	};

	const checklist = [
		{
			title: "Terms & Conditions acceptance",
			description: "Supervisor has read and accepted terms of service during onboarding",
			isActive: comp.termsAccepted,
		},
		{
			title: "Data processing consent",
			description:
				"Supervisor agreed to business operational and personal data processing rules",
			isActive: comp.dataProcessingConsent,
		},
		{
			title: "Location tracking consent (field activity)",
			description:
				"Supervisor allowed GPS tracking and zone validations for territory compliance checks",
			isActive: comp.locationConsent,
		},
		{
			title: "Incentive policy acceptance",
			description:
				"Supervisor acknowledged terms of zone verification rewards and target payouts",
			isActive: comp.incentivePolicyAccepted,
		},
	];

	return (
		<div className="flex min-h-[400px] flex-col rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:p-10">
			<h3 className="mb-6 text-[14px] font-bold text-gray-500 sm:text-[15px]">
				Compliance Checklist
			</h3>
			<div className="max-w-xl space-y-4">
				{checklist.map((item, idx) => (
					<div
						key={item.title}
						className={`flex items-center justify-between pb-4 ${
							idx !== checklist.length - 1 ? "border-b border-gray-50" : ""
						}`}
					>
						<div className="flex flex-col pr-4">
							<span className="text-[14px] font-bold text-gray-800">
								{item.title}
							</span>
							<span className="mt-1 text-[12px] font-medium text-gray-400">
								{item.description}
							</span>
						</div>
						<div
							className={`flex shrink-0 items-center gap-2 text-[13px] font-bold ${
								item.isActive ? "text-green-600" : "text-gray-400"
							}`}
						>
							<Icon
								icon={item.isActive ? "lucide:check-circle" : "lucide:x-circle"}
								className="size-5"
							/>
							{item.isActive ? "Active" : "Inactive"}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
