import type { ColumnConfig, TableColumns } from "./definitions";

export function createColumns<TData>(configs: ColumnConfig<TData>[]): TableColumns<TData> {
	return configs.map((config) => ({
		id: config.id,
		header: config.header,
		accessorKey: config.accessorKey as string,
		cell: config.cell,
		enableSorting: config.enableSorting ?? true,
		...(config.width ? { size: parseInt(config.width, 10) } : {}),
	}));
}
