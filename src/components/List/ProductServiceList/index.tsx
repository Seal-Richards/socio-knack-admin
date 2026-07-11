"use client";

import React, { useState } from "react";
import Table from "@/components/Tables";
import SearchBar from "@/components/_atoms/SearchBar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { getProductServiceColumns } from "@/components/Tables/columns/productServiceColumns";
import ProductFormModal from "@/components/_modals/ProductFormModal";
import ConfirmDeleteModal from "@/components/_modals/ConfirmDeleteModal";
import DynamicFilter from "@/components/_atoms/DynamicFilter";
import { useGetProducts, useDeleteProduct, useGetProductStats } from "@/hooks/useProduct";
import { useGetCategories } from "@/hooks/useCategory";
import { toast } from "@/lib/toast";
import type { ProductData } from "@/lib/requests/product";
import Pagination from "@/components/_atoms/Pagination";
import ProductStatsWidgets from "@/components/_widgets/Products";

export default function ProductServiceList() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [productToEdit, setProductToEdit] = useState<ProductData | null>(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [productToDeleteId, setProductToDeleteId] = useState<string | null>(null);

	const [searchQuery, setSearchQuery] = useState("");
	const [filterType, setFilterType] = useState("all");
	const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>();
	const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>();
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	// Fetch lists
	const {
		data: productsRes,
		isLoading: isLoadingProducts,
		refetch: refetchProducts,
	} = useGetProducts();
	const { data: statsRes, isLoading: isLoadingStats } = useGetProductStats();
	const { data: categoriesRes } = useGetCategories();
	const deleteProductMutation = useDeleteProduct();

	const products = productsRes?.data || [];
	const categories = categoriesRes?.data || [];

	const handleEdit = (product: ProductData) => {
		setProductToEdit(product);
		setIsModalOpen(true);
	};

	const handleDelete = (id: string) => {
		setProductToDeleteId(id);
		setIsDeleteModalOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (!productToDeleteId) return;
		try {
			const res = await deleteProductMutation.mutateAsync(productToDeleteId);
			if (res.success) {
				toast.success("Product/service deleted successfully");
				setIsDeleteModalOpen(false);
				setProductToDeleteId(null);
				refetchProducts().catch(() => undefined);
			} else {
				toast.error(res.message);
			}
		} catch (error: any) {
			toast.error((error as { message?: string })?.message || "Failed to delete product");
		}
	};

	// Filter & search products
	let filteredProducts = products.filter((p) => {
		const matchesSearch =
			p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.description?.toLowerCase().includes(searchQuery.toLowerCase());

		const catId = typeof p.category === "object" && p.category ? p.category._id : p.category;
		const matchesCategory =
			!selectedCategoryFilter ||
			selectedCategoryFilter === "all" ||
			catId === selectedCategoryFilter;

		const matchesStatus =
			!selectedStatusFilter ||
			selectedStatusFilter === "all" ||
			p.status === selectedStatusFilter;

		return matchesSearch && matchesCategory && matchesStatus;
	});

	// Handle Alphabetical sorting
	if (filterType === "az") {
		filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
	}

	// Pagination Math
	const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
	const paginatedProducts = filteredProducts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	// Reset page counter to 1
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1);
	};

	const handleCategorySelect = (val?: string) => {
		setSelectedCategoryFilter(val);
		setCurrentPage(1);
	};

	const handleStatusSelect = (val?: string) => {
		setSelectedStatusFilter(val);
		setCurrentPage(1);
	};

	const columns = getProductServiceColumns(handleEdit, handleDelete);

	const categoryFilterOptions = [
		{ label: "All Categories", value: "all" },
		...categories.map((c) => ({ label: c.name, value: c._id })),
	];

	return (
		<div className="flex flex-col gap-6 text-gray-800">
			<ProductStatsWidgets stats={statsRes?.data} isLoading={isLoadingStats} />

			<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
				<div className="mb-10 flex flex-wrap items-center justify-between gap-6">
					<h3 className="text-[17px] font-bold text-gray-800">
						Products & Services Inventory
					</h3>
					<div className="flex flex-wrap items-center gap-4">
						<SearchBar
							placeholder="Search inventory"
							value={searchQuery}
							onChange={handleSearchChange}
							containerClassName="w-64 h-12"
						/>
						<div className="flex items-center gap-1.5 rounded-xl border border-gray-100 p-1">
							<button
								onClick={() => setFilterType("all")}
								className={`h-9 rounded-lg px-4 text-[13px] font-bold transition-all ${
									filterType === "all"
										? "bg-[#1d4ea8] text-white shadow-md"
										: "text-gray-500 hover:bg-gray-50"
								}`}
							>
								All
							</button>
							<button
								onClick={() => setFilterType("az")}
								className={`h-9 rounded-lg px-4 text-[13px] font-bold transition-all ${
									filterType === "az"
										? "bg-[#1d4ea8] text-white shadow-md"
										: "text-gray-500 hover:bg-gray-50"
								}`}
							>
								A-Z
							</button>
						</div>
						<DynamicFilter
							label="Category"
							options={categoryFilterOptions}
							selected={selectedCategoryFilter}
							onSelect={handleCategorySelect}
							className="h-11 border-gray-100"
						/>
						<DynamicFilter
							label="Status"
							options={[
								{ label: "All Status", value: "all" },
								{ label: "Active", value: "active" },
								{ label: "Inactive", value: "inactive" },
							]}
							selected={selectedStatusFilter}
							onSelect={handleStatusSelect}
							className="h-11 border-gray-100"
						/>
						<Button
							onClick={() => {
								setProductToEdit(null);
								setIsModalOpen(true);
							}}
							className="h-11 gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-6 text-[13px] font-bold text-[#1d4ea8] shadow-none transition-all hover:bg-blue-50 active:scale-95"
						>
							<Icon icon="lucide:plus-circle" className="size-4" />
							Add New Product
						</Button>
					</div>
				</div>

				<div className="overflow-hidden">
					{isLoadingProducts ? (
						<div className="flex h-40 items-center justify-center">
							<div className="size-8 animate-spin rounded-full border-4 border-[#1d4ea8] border-t-transparent" />
						</div>
					) : (
						<>
							<Table
								columns={columns}
								data={paginatedProducts}
								emptyState={{
									title: "No Products Found",
									description:
										"There are currently no products or services matching your filters.",
									icon: "solar:box-bold-duotone",
								}}
							/>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={setCurrentPage}
								className="mt-4"
							/>
						</>
					)}
				</div>
			</div>

			<ProductFormModal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setProductToEdit(null);
					refetchProducts().catch(() => undefined);
				}}
				productToEdit={productToEdit}
			/>

			<ConfirmDeleteModal
				isOpen={isDeleteModalOpen}
				onClose={() => {
					setIsDeleteModalOpen(false);
					setProductToDeleteId(null);
				}}
				onConfirm={handleConfirmDelete}
				isLoading={deleteProductMutation.isPending}
				title="Delete Product / Service"
				description="Are you sure you want to delete this product/service? This action cannot be undone."
			/>
		</div>
	);
}
