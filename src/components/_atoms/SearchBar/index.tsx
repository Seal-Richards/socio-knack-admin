"use client";

import { Icon } from "@iconify/react";
import cn from "@/lib/utils";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
	containerClassName?: string;
	iconClassName?: string;
}

export default function SearchBar({
	containerClassName,
	iconClassName,
	className,
	...props
}: SearchBarProps) {
	return (
		<div className={cn("relative group", containerClassName)}>
			<Icon
				icon="lucide:search"
				className={cn(
					"absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#1d4ea8]",
					iconClassName,
				)}
			/>
			<input
				type="text"
				className={cn(
					"h-12 w-full rounded-xl border border-gray-100 bg-gray-50/50 pl-11 pr-4 text-[14px] font-medium transition-all focus:border-[#1d4ea8]/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#1d4ea8]/5",
					className,
				)}
				{...props}
			/>
		</div>
	);
}
