import type { ColumnDef } from "@tanstack/react-table";
import { type EmptyStateProps } from "@/components/_atoms/Empty";

export type Column<TData, TValue = any> = ColumnDef<TData, TValue> & {
	header: string;
	accessorKey?: string;
	cell?: any;
};

export interface TableProps<TData> {
	columns: ColumnDef<TData, any>[];
	data: TData[];
	className?: string;
	emptyState?: EmptyStateProps;
}
