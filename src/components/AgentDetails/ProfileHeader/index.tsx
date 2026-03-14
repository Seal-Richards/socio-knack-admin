import React from "react";
import Image from "next/image";
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
		<div className="flex flex-col gap-8 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:p-10">
			<div className="flex flex-wrap items-center gap-6">
				<div className="relative size-[5.5rem] overflow-hidden rounded-full border-4 border-white shadow-md">
					<Image src={agent.avatar} alt={agent.name} fill className="object-cover" />
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-4">
						<h1 className="text-[20px] font-bold text-gray-800">{agent.name}</h1>
						<div className="flex items-center gap-4 border-l border-gray-200 pl-4">
							<span className="text-[13px] font-medium text-gray-500">
								{agent.role}
							</span>
							<div className="flex items-center gap-1.5 border-l border-gray-200 pl-4">
								<Icon icon="solar:star-bold" className="size-4 text-orange-400" />
								<span className="text-[13px] font-medium text-gray-500">
									{agent.rating}
								</span>
							</div>
							<div className="flex items-center gap-2 border-l border-gray-200 pl-4">
								<span className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold text-green-600">
									{agent.status}
								</span>
							</div>
						</div>
					</div>
					<div className="flex flex-wrap items-center gap-6 text-[13px] font-medium text-gray-500">
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
