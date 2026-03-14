"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ActionCellProps {
	onView?: () => void;
	viewHref?: string;
	onEdit?: () => void;
	onDelete?: () => void;
	id: string | number;
}

export function ActionCell({ onView, viewHref, onEdit, onDelete, id: _id }: ActionCellProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="size-8 rounded-full p-0 transition-colors hover:bg-gray-100"
				>
					<Icon icon="lucide:more-vertical" className="size-4 text-gray-400" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="w-40 rounded-xl border-gray-100 p-1 shadow-xl"
			>
				{onView && !viewHref && (
					<DropdownMenuItem
						onClick={onView}
						className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-bold text-gray-600 hover:bg-gray-50"
					>
						<Icon icon="solar:eye-bold" className="size-4 text-[#1d4ea8]" />
						View Details
					</DropdownMenuItem>
				)}
				{viewHref && (
					<DropdownMenuItem asChild>
						<Link
							href={viewHref}
							className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-bold text-gray-600 hover:bg-gray-50"
						>
							<Icon icon="solar:eye-bold" className="size-4 text-[#1d4ea8]" />
							View Details
						</Link>
					</DropdownMenuItem>
				)}
				{onEdit && (
					<DropdownMenuItem
						onClick={onEdit}
						className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-bold text-gray-600 hover:bg-gray-50"
					>
						<Icon icon="solar:pen-new-square-bold" className="size-4 text-orange-400" />
						Edit
					</DropdownMenuItem>
				)}
				{onDelete && (
					<DropdownMenuItem
						onClick={onDelete}
						className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-bold text-red-500 hover:bg-red-50"
					>
						<Icon icon="solar:trash-bin-trash-bold" className="size-4" />
						Delete
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
