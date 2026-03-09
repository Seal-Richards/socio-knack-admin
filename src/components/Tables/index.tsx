"use client";

import React from "react";
import cn from "@/lib/utils";

interface Column<T> {
	header: string;
	accessor: keyof T | string;
	render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
	columns: Column<T>[];
	data: T[];
	className?: string;
}

export default function Table<T extends { id?: string | number }>({
	columns,
	data,
	className,
}: TableProps<T>) {
	return (
		<div className={cn("w-full overflow-x-auto", className)}>
			<table className="w-full text-left">
				<thead>
					<tr className="border-b border-gray-50">
						{columns.map((col) => (
							<th
								key={col.header}
								className="pb-4 text-[13px] font-bold uppercase tracking-wider text-gray-400"
							>
								{col.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-50/50">
					{data.map((row, rowIndex) => (
						<tr key={row.id || rowIndex} className="group hover:bg-gray-50/50">
							{columns.map((col) => (
								<td
									key={col.header}
									className="py-4 text-[15px] font-medium text-gray-700"
								>
									{col.render
										? col.render(row)
										: // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
											(row as any)[col.accessor as string]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
