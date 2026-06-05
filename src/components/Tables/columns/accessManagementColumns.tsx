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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createColumns } from "./columnFactory";
import type { TableColumns } from "./definitions";

export type AccessManagementData = {
	id: string | number;
	name: string;
	email: string;
	location: string;
	role: string;
	position?: string;
	status: "Active" | "Inactive" | "Pending" | "Cancelled";
	avatar: string;
	rawRole: "admin" | "supervisor" | "staff";
};

export const getAccessManagementColumns = (
	tempRoles: Record<string | number, string>,
	setTempRoles: React.Dispatch<React.SetStateAction<Record<string | number, string>>>,
	onSave: (id: string | number, role: string) => void,
	isSaving: boolean,
	onCancelInvite?: (id: string | number) => void,
	onDeleteInvite?: (id: string | number) => void,
	onRevokeAccess?: (id: string | number) => void,
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
						className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-bold ${(() => {
							if (status === "Active") return "bg-green-50/80 text-green-600";
							if (status === "Pending") return "bg-amber-50/80 text-amber-600";
							if (status === "Cancelled") return "bg-gray-50/80 text-gray-500";
							return "bg-red-50/80 text-red-600";
						})()}`}
					>
						<div
							className={(() => {
								if (status === "Active") return "size-2 rounded-full bg-[#10b981]";
								if (status === "Pending") return "size-2 rounded-full bg-[#f59e0b]";
								if (status === "Cancelled")
									return "size-2 rounded-full bg-[#9ca3af]";
								return "size-2 rounded-full bg-[#ef4444]";
							})()}
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
							disabled={user.status === "Pending"}
							onValueChange={(val) => {
								setTempRoles((prev) => ({
									...prev,
									[user.id]: val,
								}));
							}}
						>
							<SelectTrigger className="h-10 rounded-2xl border-gray-100 bg-white px-4 text-[13px] font-bold text-gray-700 transition-all hover:bg-gray-50 focus:ring-0 disabled:opacity-50">
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
						disabled={!hasChanged || isSaving || user.status === "Pending"}
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
			cell: ({ row }) => {
				const user = row.original;
				return (
					<div className="flex items-center justify-center">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className="flex size-10 items-center justify-center rounded-full transition-all hover:bg-gray-100 active:scale-90">
									<Icon
										icon="solar:menu-dots-bold"
										className="size-5 text-gray-400"
									/>
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="w-40 rounded-xl border border-gray-100 bg-white p-1 shadow-xl"
							>
								{user.status === "Pending" && onCancelInvite && (
									<DropdownMenuItem
										onClick={() => onCancelInvite(user.id)}
										className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-bold text-orange-600 hover:bg-orange-50"
									>
										<Icon icon="solar:close-circle-bold" className="size-4" />
										Cancel Invite
									</DropdownMenuItem>
								)}
								{user.status === "Cancelled" && onDeleteInvite && (
									<DropdownMenuItem
										onClick={() => onDeleteInvite(user.id)}
										className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-bold text-red-600 hover:bg-red-50"
									>
										<Icon
											icon="solar:trash-bin-trash-bold"
											className="size-4"
										/>
										Delete Invite
									</DropdownMenuItem>
								)}
								{(user.status === "Active" || user.status === "Inactive") &&
									onRevokeAccess && (
										<DropdownMenuItem
											onClick={() => onRevokeAccess(user.id)}
											className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-bold text-red-600 hover:bg-red-50"
										>
											<Icon icon="solar:user-block-bold" className="size-4" />
											Revoke Access
										</DropdownMenuItem>
									)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
	]);
