import type { ColumnDef } from "@tanstack/react-table";

export interface ColumnConfig<TData> {
	id: string;
	header: string | ColumnDef<TData, any>["header"];
	accessorKey?: keyof TData;
	cell?: ColumnDef<TData, any>["cell"];
	enableSorting?: boolean;
	width?: string;
}

export type TableColumns<TData> = ColumnDef<TData, any>[];
