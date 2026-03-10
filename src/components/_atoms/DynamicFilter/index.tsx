"use client";

import { Icon } from "@iconify/react";
import cn from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterOption {
	label: string;
	value: string;
}

interface DynamicFilterProps {
	label: string;
	options: FilterOption[];
	selected?: string;
	onSelect?: (value: string) => void;
	icon?: string;
	className?: string;
}

export default function DynamicFilter({
	label,
	options,
	selected,
	onSelect,
	icon = "solar:filter-bold",
	className,
}: DynamicFilterProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						"flex h-12 items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 text-[14px] font-bold text-gray-600 transition-all hover:bg-gray-50 active:scale-95",
						className,
					)}
				>
					<Icon icon={icon} className="size-4 text-gray-400" />
					<span>
						{selected ? options.find((o) => o.value === selected)?.label : label}
					</span>
					<Icon icon="lucide:chevron-down" className="size-3 text-gray-400" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="start"
				className="w-48 rounded-xl border-gray-100 p-1 shadow-xl"
			>
				{options.map((option) => (
					<DropdownMenuItem
						key={option.value}
						onClick={() => onSelect?.(option.value)}
						className={cn(
							"rounded-lg px-3 py-2 text-[14px] font-medium cursor-pointer transition-colors",
							selected === option.value
								? "bg-[#1d4ea8]/5 text-[#1d4ea8]"
								: "text-gray-600 hover:bg-gray-50",
						)}
					>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
