import type { ColumnDef } from "@tanstack/react-table";

export type Column<TData, TValue = any> = ColumnDef<TData, TValue> & {
	header: string;
	accessorKey?: string;
	cell?: any;
};

export interface TableProps<TData> {
	columns: ColumnDef<TData, any>[];
	data: TData[];
	className?: string;
}
