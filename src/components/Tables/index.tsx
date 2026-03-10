"use client";

import React from "react";
import cn from "@/lib/utils";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import type { TableProps } from "./types";

export default function Table<TData extends { id?: string | number }>({
	columns,
	data,
	className,
}: TableProps<TData>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className={cn("w-full overflow-x-auto", className)}>
			<table className="w-full text-left">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id} className="border-b border-gray-50">
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className="border-b border-gray-50 pb-4 text-[13px] font-bold uppercase tracking-wider text-gray-400"
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className="divide-y divide-gray-50/50">
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className="group transition-colors hover:bg-gray-50/50">
							{row.getVisibleCells().map((cell) => (
								<td
									key={cell.id}
									className="py-4 text-[13px] font-bold text-gray-700"
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
