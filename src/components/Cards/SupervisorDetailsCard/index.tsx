"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

interface SupervisorDetailsCardProps {
	name: string;
	designation: string;
	avatar: string;
}

export default function SupervisorDetailsCard({
	name,
	designation,
	avatar,
}: SupervisorDetailsCardProps) {
	return (
		<div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
			<div className="flex items-center gap-3">
				<div className="relative size-12 overflow-hidden rounded-full">
					<Image src={avatar} alt={name} fill className="object-cover" />
				</div>
				<div>
					<h3 className="text-sm font-bold text-gray-900">{name}</h3>
					<div className="flex items-center gap-1">
						<Icon icon="solar:verified-check-bold" className="size-4 text-[#1d4ea8]" />
						<span className="text-xs font-medium text-gray-400">{designation}</span>
					</div>
				</div>
			</div>
			<Button className="h-10 rounded-xl bg-[#1d4ea8] px-6 text-xs font-bold text-white transition-all hover:bg-[#153a82]">
				Manage Profile
			</Button>
		</div>
	);
}
