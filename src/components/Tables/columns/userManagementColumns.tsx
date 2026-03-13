"use client";

import Image from "next/image";
import { createColumns } from "./columnFactory";
import { ActionCell } from "../cells/ActionCells";
import type { TableColumns } from "./definitions";

export interface UserManagementData {
	id: string | number;
	name: string;
	mail: string;
	activityType: string;
	status: "Active" | "Inactive";
	stamp: string;
	avatar: string;
}

export const userManagementColumns: TableColumns<UserManagementData> =
	createColumns<UserManagementData>([
		{
			id: "name",
			header: "Name",
			cell: ({ row }) => {
				const user = row.original;
				return (
					<div className="flex items-center gap-3">
						<div className="relative size-10 overflow-hidden rounded-full border border-gray-100">
							<Image
								src={user.avatar}
								alt={user.name}
								fill
								className="object-cover"
							/>
						</div>
						<span className="text-[14px] font-bold text-gray-800">{user.name}</span>
					</div>
				);
			},
		},
		{
			id: "mail",
			header: "Mail",
			accessorKey: "mail",
			cell: ({ getValue }) => (
				<span className="text-[13px] font-medium text-gray-500">
					{getValue() as string}
				</span>
			),
		},
		{
			id: "activityType",
			header: "Activity Type",
			accessorKey: "activityType",
			cell: ({ getValue }) => (
				<span className="text-[13px] font-medium text-gray-600">
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
						className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
							status === "Active"
								? "bg-green-50 text-green-600"
								: "bg-red-50 text-red-600"
						}`}
					>
						<div
							className={
								status === "Active"
									? "size-1.5 rounded-full bg-green-500"
									: "size-1.5 rounded-full bg-red-500"
							}
						/>
						{status}
					</div>
				);
			},
		},
		{
			id: "stamp",
			header: "Date & Type Stamp",
			accessorKey: "stamp",
			cell: ({ getValue }) => (
				<span className="text-[13px] font-medium text-gray-500">
					{getValue() as string}
				</span>
			),
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => (
				<ActionCell
					id={row.original.id}
					onView={() => undefined}
					onEdit={() => undefined}
					onDelete={() => undefined}
				/>
			),
		},
	]);
