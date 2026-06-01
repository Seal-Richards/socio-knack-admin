"use client";

import React from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@iconify/react";
import type { ProductData } from "@/lib/requests/product";
import { createColumns } from "./columnFactory";
import type { TableColumns } from "./definitions";

export const getProductServiceColumns = (
	onEdit: (product: ProductData) => void,
	onDelete: (id: string) => void,
): TableColumns<ProductData> =>
	createColumns<ProductData>([
		{
			id: "select",
			header: () => (
				<div className="flex items-center justify-center p-2">
					<Checkbox
						className="size-5 rounded-md border-gray-200"
						aria-label="Select all"
					/>
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
			header: "Product Name",
			cell: ({ row }) => {
				const product = row.original;
				const catName =
					typeof product.category === "object" && product.category
						? product.category.name
						: "General";
				return (
					<div className="flex items-center gap-3">
						<div className="relative flex size-12 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50/30">
							{product.avatar ? (
								<Image
									src={product.avatar}
									alt={product.name}
									fill
									className="object-cover"
								/>
							) : (
								<Icon
									icon="solar:box-bold-duotone"
									className="size-6 text-gray-300"
								/>
							)}
						</div>
						<div className="flex flex-col">
							<span className="text-[14px] font-bold text-gray-800">
								{product.name}
							</span>
							<span className="text-[11px] font-medium text-gray-400">
								{catName} • ID: {product._id}
							</span>
						</div>
					</div>
				);
			},
		},
		{
			id: "category",
			header: "Category",
			cell: ({ row }) => {
				const product = row.original;
				const catName =
					typeof product.category === "object" && product.category
						? product.category.name
						: "General";
				return <span className="text-[13px] font-bold text-gray-500">{catName}</span>;
			},
		},
		{
			id: "cost",
			header: "Price (₦)",
			cell: ({ row }) => {
				const product = row.original;
				return (
					<span className="text-[13px] font-bold text-gray-800">
						₦{product.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
					</span>
				);
			},
		},
		{
			id: "incentiveEligible",
			header: "Incentive Eligible",
			cell: ({ row }) => {
				const product = row.original;
				return (
					<span
						className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${
							product.incentiveEligible
								? "bg-green-50 text-green-600"
								: "bg-gray-50 text-gray-500"
						}`}
					>
						{product.incentiveEligible ? "Yes" : "No"}
					</span>
				);
			},
		},
		{
			id: "status",
			header: "Status",
			cell: ({ row }) => {
				const product = row.original;
				const active = product.status === "active";
				return (
					<div
						className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-bold ${
							active ? "bg-green-50/80 text-green-600" : "bg-red-50/80 text-red-600"
						}`}
					>
						<span
							className={`size-1.5 rounded-full ${active ? "bg-green-500" : "bg-red-500"}`}
						/>
						{active ? "Active" : "Inactive"}
					</div>
				);
			},
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => {
				const product = row.original;
				return (
					<div className="flex items-center justify-end gap-2">
						<button
							onClick={() => onEdit(product)}
							className="flex size-9 items-center justify-center rounded-xl border border-gray-100 text-gray-500 transition-all hover:bg-gray-50 active:scale-90"
						>
							<Icon icon="solar:pen-bold-duotone" className="size-4" />
						</button>
						<button
							onClick={() => onDelete(product._id)}
							className="flex size-9 items-center justify-center rounded-xl border border-red-100 text-red-500 transition-all hover:bg-red-50 active:scale-90"
						>
							<Icon icon="solar:trash-bin-trash-bold-duotone" className="size-4" />
						</button>
					</div>
				);
			},
		},
	]);
