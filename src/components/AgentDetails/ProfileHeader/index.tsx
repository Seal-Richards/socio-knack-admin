import React from "react";
import DynamicAvatar from "@/components/_atoms/DynamicAvatar";
import { Icon } from "@iconify/react";

interface ProfileHeaderProps {
	agent: {
		name: string;
		role: string;
		rating: string;
		status: string;
		email: string;
		phone: string;
		address: string;
		avatar: string;
	};
}

export default function ProfileHeader({ agent }: ProfileHeaderProps) {
	return (
		<div className="flex flex-col gap-6 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:gap-8 md:p-10">
			<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
				<DynamicAvatar
					name={agent.name}
					image={agent.avatar}
					className="size-[4.5rem] shrink-0 rounded-full border-4 border-white shadow-md sm:size-[5.5rem]"
				/>
				<div className="flex flex-col gap-3 sm:gap-2">
					<div className="flex flex-wrap items-center gap-2 sm:gap-4">
						<h1 className="text-[18px] font-bold text-gray-800 sm:text-[20px]">
							{agent.name}
						</h1>
						<div className="flex flex-wrap items-center gap-2 border-gray-200 sm:gap-4 sm:border-l sm:pl-4">
							<span className="text-[13px] font-medium text-gray-500">
								{agent.role}
							</span>
							<div className="flex items-center gap-1.5 border-l border-gray-200 pl-2 sm:pl-4">
								<Icon icon="solar:star-bold" className="size-4 text-orange-400" />
								<span className="text-[13px] font-medium text-gray-500">
									{agent.rating}
								</span>
							</div>
							<div className="flex items-center gap-2 border-l border-gray-200 pl-2 sm:pl-4">
								<span className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold text-green-600">
									{agent.status}
								</span>
							</div>
						</div>
					</div>
					<div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-gray-500 sm:gap-6">
						<div className="flex items-center gap-2">
							<Icon
								icon="solar:letter-bold-duotone"
								className="size-4 text-gray-400"
							/>
							{agent.email}
						</div>
						<div className="flex items-center gap-2">
							<Icon
								icon="solar:phone-bold-duotone"
								className="size-4 text-gray-400"
							/>
							{agent.phone}
						</div>
						<div className="flex items-center gap-2">
							<Icon
								icon="solar:map-point-bold-duotone"
								className="size-4 text-gray-400"
							/>
							{agent.address}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
