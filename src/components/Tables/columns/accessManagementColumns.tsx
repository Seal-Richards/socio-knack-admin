"use client";

import React from "react";
import DynamicAvatar from "@/components/_atoms/DynamicAvatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@iconify/react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createColumns } from "./columnFactory";
import type { TableColumns } from "./definitions";

export interface AccessManagementData {
	id: string | number;
	name: string;
	email: string;
	location: string;
	role: string;
	position?: string;
	status: "Active" | "Inactive";
	avatar: string;
	rawRole: "admin" | "supervisor" | "staff";
}

export const getAccessManagementColumns = (
	tempRoles: Record<string | number, string>,
	setTempRoles: React.Dispatch<React.SetStateAction<Record<string | number, string>>>,
	onSave: (id: string | number, role: string) => void,
	isSaving: boolean,
): TableColumns<AccessManagementData> =>
	createColumns<AccessManagementData>([
		{
			id: "select",
			header: () => (
				<div className="flex items-center justify-center p-2">
					<div className="flex size-8 items-center justify-center rounded-full border border-gray-100 bg-gray-50/50">
						<Icon icon="lucide:arrow-down" className="size-4 text-gray-500" />
					</div>
				</div>
			),
			cell: ({ row }) => (
				<div className="flex items-center justify-center">
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						className="size-5 rounded-md border-gray-200"
						aria-label="Select row"
					/>
				</div>
			),
			enableSorting: false,
		},
		{
			id: "name",
			header: "Name",
			cell: ({ row }) => {
				const user = row.original;
				return (
					<div className="flex items-center gap-3">
						<DynamicAvatar
							name={user.name}
							image={user.avatar}
							className="size-12 rounded-full ring-2 ring-gray-100 ring-offset-1"
						/>
						<span className="text-[14px] font-bold text-gray-800">{user.name}</span>
					</div>
				);
			},
		},
		{
			id: "email",
			header: "Email",
			accessorKey: "email",
			cell: ({ getValue }) => (
				<span className="text-[13px] font-medium text-gray-500">
					{getValue() as string}
				</span>
			),
		},
		{
			id: "location",
			header: "Location",
			accessorKey: "location",
			cell: ({ getValue }) => (
				<span className="text-[13px] font-medium text-gray-500">
					{getValue() as string}
				</span>
			),
		},
		{
			id: "status",
			header: "Status",
			accessorKey: "status",
			cell: ({ getValue }) => {
				const status = getValue() as string;
				return (
					<div
						className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-bold ${
							status === "Active"
								? "bg-green-50/80 text-green-600"
								: "bg-red-50/80 text-red-600"
						}`}
					>
						<div
							className={
								status === "Active"
									? "size-2 rounded-full bg-[#10b981]"
									: "size-2 rounded-full bg-[#ef4444]"
							}
						/>
						{status}
					</div>
				);
			},
		},
		{
			id: "role",
			header: "Role",
			cell: ({ row }) => {
				const user = row.original;
				const currentRole = tempRoles[user.id] ?? user.rawRole;

				return (
					<div className="flex w-44 flex-col gap-1">
						<Select
							value={currentRole}
							onValueChange={(val) => {
								setTempRoles((prev) => ({
									...prev,
									[user.id]: val,
								}));
							}}
						>
							<SelectTrigger className="h-10 rounded-2xl border-gray-100 bg-white px-4 text-[13px] font-bold text-gray-700 transition-all hover:bg-gray-50 focus:ring-0">
								<SelectValue />
							</SelectTrigger>
							<SelectContent className="rounded-xl border-gray-100">
								<SelectItem value="admin">Admin</SelectItem>
								<SelectItem value="supervisor">Supervisor</SelectItem>
								<SelectItem value="staff">Staff</SelectItem>
							</SelectContent>
						</Select>
						{/* Position designation helper — only staff has unique position */}
						{user.rawRole === "staff" && user.position && (
							<span className="pl-2 text-[11px] font-medium text-gray-400">
								{user.position}
							</span>
						)}
					</div>
				);
			},
		},
		{
			id: "save",
			header: "",
			cell: ({ row }) => {
				const user = row.original;
				const hasChanged =
					tempRoles[user.id] !== undefined && tempRoles[user.id] !== user.rawRole;

				return (
					<button
						disabled={!hasChanged || isSaving}
						onClick={() => {
							const newRole = tempRoles[user.id];
							if (newRole) {
								onSave(user.id, newRole);
							}
						}}
						className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-[12px] font-bold transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-30 ${
							hasChanged
								? "border-green-100 bg-green-50 text-[#10b981] hover:bg-green-100/50"
								: "border-gray-100 bg-gray-50 text-gray-400"
						}`}
					>
						<Icon icon="solar:diskette-bold-duotone" className="size-4" />
						Save permission
					</button>
				);
			},
		},
		{
			id: "actions",
			header: () => (
				<div className="flex items-center justify-center p-2">
					<div className="flex size-8 items-center justify-center rounded-full border border-gray-100 bg-gray-50/50">
						<Icon icon="lucide:arrow-down" className="size-4 text-gray-500" />
					</div>
				</div>
			),
			cell: () => (
				<div className="flex items-center justify-center">
					<button className="flex size-10 items-center justify-center rounded-full transition-all hover:bg-gray-100 active:scale-90">
						<Icon icon="solar:menu-dots-bold" className="size-5 text-gray-400" />
					</button>
				</div>
			),
		},
	]);
