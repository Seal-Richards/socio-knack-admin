"use client";

import React, { useState, useEffect, useRef } from "react";
import Modal from "@/components/_modals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { toast } from "@/lib/toast";
import Image from "next/image";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	useGetCategories,
	useCreateCategory,
	useUpdateCategory,
	useDeleteCategory,
} from "@/hooks/useCategory";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProduct";
import { useGetBusinessSettings } from "@/hooks/useBusiness";
import type { ProductData } from "@/lib/requests/product";

interface ProductFormModalProps {
	isOpen: boolean;
	onClose: () => void;
	productToEdit?: ProductData | null;
}

const generateMongoId = () => {
	return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
};

export default function ProductFormModal({
	isOpen,
	onClose,
	productToEdit,
}: ProductFormModalProps) {
	const { data: categoriesRes } = useGetCategories();
	const { data: businessRes } = useGetBusinessSettings();

	const createCategoryMutation = useCreateCategory();
	const updateCategoryMutation = useUpdateCategory();
	const deleteCategoryMutation = useDeleteCategory();

	const createProductMutation = useCreateProduct();
	const updateProductMutation = useUpdateProduct();

	const categories = categoriesRes?.data || [];
	const business = businessRes?.data;

	// Form values
	const [name, setName] = useState("");
	const [code, setCode] = useState("");
	const [description, setDescription] = useState("");
	const [selectedCategoryId, setSelectedCategoryId] = useState("");
	const [cost, setCost] = useState("");
	const [quantity, setQuantity] = useState("");
	const [incentiveEligible, setIncentiveEligible] = useState<"Yes" | "No">("No");
	const [incentiveValueType, setIncentiveValueType] = useState<"default" | "custom">("default");
	const [customIncentiveType, setCustomIncentiveType] = useState<"flat" | "percentage">("flat");
	const [customIncentiveValue, setCustomIncentiveValue] = useState("");
	const [avatar, setAvatar] = useState("");
	const [status, setStatus] = useState<"active" | "inactive">("active");

	// Category management dropdown state
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [newCategoryName, setNewCategoryName] = useState("");
	const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
	const [editingCategoryValue, setEditingCategoryValue] = useState("");

	// Pre-fill generated or existing Mongo ID
	useEffect(() => {
		if (isOpen) {
			if (productToEdit) {
				setName(productToEdit.name || "");
				setCode(productToEdit.code || productToEdit._id);
				setDescription(productToEdit.description || "");
				let catId = "";
				if (typeof productToEdit.category === "object" && productToEdit.category) {
					catId = productToEdit.category._id;
				} else if (typeof productToEdit.category === "string") {
					catId = productToEdit.category;
				}
				setSelectedCategoryId(catId);
				setCost(String(productToEdit.cost || ""));
				setQuantity(
					String(productToEdit.quantity !== undefined ? productToEdit.quantity : ""),
				);
				setIncentiveEligible(productToEdit.incentiveEligible ? "Yes" : "No");
				setAvatar(productToEdit.avatar || "");
				setStatus(productToEdit.status || "active");

				if (productToEdit.incentiveEligible) {
					// Detect custom incentive overrides
					if (productToEdit.incentiveType && productToEdit.incentiveValue !== undefined) {
						setIncentiveValueType("custom");
						setCustomIncentiveType(productToEdit.incentiveType);
						setCustomIncentiveValue(String(productToEdit.incentiveValue));
					} else {
						setIncentiveValueType("default");
					}
				}
			} else {
				setName("");
				setCode(generateMongoId());
				setDescription("");
				setSelectedCategoryId("");
				setCost("");
				setQuantity("");
				setIncentiveEligible("No");
				setIncentiveValueType("default");
				setCustomIncentiveType("flat");
				setCustomIncentiveValue("");
				setAvatar("");
				setStatus("active");
			}
		}
	}, [isOpen, productToEdit]);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Inline Category creation
	const handleAddCategory = async () => {
		const trimmed = newCategoryName.trim();
		if (!trimmed) return;
		try {
			const res = await createCategoryMutation.mutateAsync(trimmed);
			if (res.success) {
				toast.success("Category created successfully");
				setNewCategoryName("");
			} else {
				toast.error(res.message);
			}
		} catch (error: any) {
			toast.error((error as { message?: string })?.message || "Failed to create category");
		}
	};

	// Inline Category updating
	const handleSaveCategoryEdit = async (id: string) => {
		const trimmed = editingCategoryValue.trim();
		if (!trimmed) return;
		try {
			const res = await updateCategoryMutation.mutateAsync({ id, name: trimmed });
			if (res.success) {
				toast.success("Category updated successfully");
				setEditingCategoryId(null);
			} else {
				toast.error(res.message);
			}
		} catch (error: any) {
			toast.error((error as { message?: string })?.message || "Failed to update category");
		}
	};

	// Inline Category deletion
	const handleDeleteCategory = async (e: React.MouseEvent, id: string) => {
		e.stopPropagation();
		try {
			const res = await deleteCategoryMutation.mutateAsync(id);
			if (res.success) {
				toast.success("Category deleted successfully");
				if (selectedCategoryId === id) setSelectedCategoryId("");
			} else {
				toast.error(res.message);
			}
		} catch (error: any) {
			toast.error((error as { message?: string })?.message || "Failed to delete category");
		}
	};

	// Avatar/Product image base64 handler
	const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onloadend = () => {
			if (typeof reader.result === "string") {
				setAvatar(reader.result);
			}
		};
		reader.readAsDataURL(file);
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!name.trim()) {
			toast.error("Product name is required.");
			return;
		}

		const numCost = Number(cost);
		if (Number.isNaN(numCost) || numCost <= 0) {
			toast.error("Please enter a valid price greater than 0.");
			return;
		}

		const numQuantity = Number(quantity);
		if (
			quantity === "" ||
			Number.isNaN(numQuantity) ||
			numQuantity < 0 ||
			!Number.isInteger(numQuantity)
		) {
			toast.error("Please enter a valid non-negative integer product quantity.");
			return;
		}

		// Prepare payload
		const isEligible = incentiveEligible === "Yes";
		const payload = {
			name: name.trim(),
			cost: numCost,
			description: description.trim(),
			code: code.trim(),
			category: selectedCategoryId || null,
			incentiveEligible: isEligible,
			avatar,
			status,
			quantity: numQuantity,
			...(isEligible && incentiveValueType === "custom"
				? {
						incentiveType: customIncentiveType,
						incentiveValue: Number(customIncentiveValue) || 0,
					}
				: {}),
		};

		try {
			if (productToEdit) {
				const res = await updateProductMutation.mutateAsync({
					id: productToEdit._id,
					body: payload,
				});
				if (res.success) {
					toast.success("Product/service updated successfully");
					onClose();
				} else {
					toast.error(res.message);
				}
			} else {
				const res = await createProductMutation.mutateAsync(payload);
				if (res.success) {
					toast.success("Product/service created successfully");
					onClose();
				} else {
					toast.error(res.message);
				}
			}
		} catch (error: any) {
			toast.error(
				(error as { message?: string })?.message || "Failed to save product details.",
			);
		}
	};

	const selectedCategory = categories.find((c) => c._id === selectedCategoryId);
	const isPending = createProductMutation.isPending || updateProductMutation.isPending;

	// Resolve default business incentive for displaying in options
	const defType = business?.defaultIncentiveType || "flat";
	const defVal = business?.defaultIncentiveValue || 0;
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={productToEdit ? "Edit Product / Service" : "Add New Product"}
			description={
				productToEdit
					? "Modify service features"
					: "Register a brand new asset in your inventory catalog."
			}
			className="text-gray-800 sm:max-w-[850px] md:max-w-[900px]"
		>
			<form onSubmit={handleFormSubmit} className="mt-2 flex flex-col gap-6">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{/* Left Panel: Product Information */}
					<div className="space-y-6 rounded-[2rem] border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
						<div className="flex items-center gap-2 border-b border-gray-50 pb-3">
							<div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-[#1d4ea8]">
								<Icon icon="solar:info-square-bold-duotone" className="size-5" />
							</div>
							<h4 className="text-[14px] font-bold text-gray-800">
								Product Information
							</h4>
						</div>

						{/* Product Name */}
						<div className="space-y-2">
							<label
								htmlFor="prod-name"
								className="text-[13px] font-bold text-gray-600"
							>
								Product Name
							</label>
							<Input
								id="prod-name"
								placeholder="Enter product name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 text-gray-900 focus:border-[#1d4ea8] focus-visible:ring-0 focus-visible:ring-offset-0"
							/>
						</div>

						{/* Product Code (Only shown in Edit mode as disabled) */}
						{productToEdit && (
							<div className="space-y-2">
								<label
									htmlFor="prod-code"
									className="text-[13px] font-bold text-gray-600"
								>
									Product Code (Immutable)
								</label>
								<Input
									id="prod-code"
									disabled
									value={code}
									className="h-12 cursor-not-allowed rounded-xl border-gray-100 bg-gray-100 px-4 font-bold text-gray-400 focus-visible:ring-0"
								/>
							</div>
						)}

						{/* Category dropdown with inline management */}
						<div className="space-y-2" ref={dropdownRef}>
							<label className="text-[13px] font-bold text-gray-600">Category</label>
							<div className="relative">
								<button
									type="button"
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
									className="flex h-12 w-full items-center justify-between rounded-xl border border-gray-100 bg-white px-4 text-[14px] font-bold text-gray-800 transition-all hover:bg-gray-50"
								>
									<span>
										{selectedCategory
											? selectedCategory.name
											: "Select category"}
									</span>
									<Icon
										icon="lucide:chevron-down"
										className={`size-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
									/>
								</button>

								{isDropdownOpen && (
									<div className="animate-in fade-in slide-in-from-top-1 absolute left-0 z-50 mt-2 w-full rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl">
										<div className="mb-3 max-h-48 space-y-1.5 overflow-y-auto pr-1">
											{categories.length === 0 ? (
												<p className="py-3 text-center text-xs text-gray-400">
													No categories created yet.
												</p>
											) : (
												categories.map((cat) => (
													<div
														key={cat._id}
														className={`group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition-all ${
															selectedCategoryId === cat._id
																? "bg-blue-50/50 text-[#1d4ea8]"
																: "text-gray-600 hover:bg-gray-50"
														}`}
													>
														{editingCategoryId === cat._id ? (
															<div
																className="flex w-full items-center gap-2"
																onClick={(e) => e.stopPropagation()}
																onKeyDown={(e) =>
																	e.stopPropagation()
																}
																role="presentation"
															>
																<Input
																	value={editingCategoryValue}
																	onChange={(e) =>
																		setEditingCategoryValue(
																			e.target.value,
																		)
																	}
																	className="h-8 w-full rounded-lg border-gray-100 bg-white px-2 text-xs focus:ring-0 focus-visible:ring-0"
																/>
																<button
																	type="button"
																	onClick={() =>
																		handleSaveCategoryEdit(
																			cat._id,
																		)
																	}
																	className="rounded-md p-1 text-green-600 hover:bg-green-50"
																	title="Save Category"
																	aria-label="Save Category"
																>
																	<Icon
																		icon="solar:check-circle-bold"
																		className="size-4.5"
																	/>
																</button>
																<button
																	type="button"
																	onClick={() =>
																		setEditingCategoryId(null)
																	}
																	className="rounded-md p-1 text-gray-400 hover:bg-gray-50"
																	title="Cancel Edit"
																	aria-label="Cancel Edit"
																>
																	<Icon
																		icon="solar:close-circle-bold"
																		className="size-4.5"
																	/>
																</button>
															</div>
														) : (
															<>
																<button
																	type="button"
																	className="flex-1 text-left outline-none"
																	onClick={() => {
																		if (
																			editingCategoryId !==
																			cat._id
																		) {
																			setSelectedCategoryId(
																				cat._id,
																			);
																			setIsDropdownOpen(
																				false,
																			);
																		}
																	}}
																>
																	{cat.name}
																</button>
																<div className="flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
																	<button
																		type="button"
																		onClick={(e) => {
																			e.stopPropagation();
																			setEditingCategoryId(
																				cat._id,
																			);
																			setEditingCategoryValue(
																				cat.name,
																			);
																		}}
																		className="rounded-md p-1 text-blue-600 hover:bg-blue-50/30"
																		title="Edit Category"
																		aria-label="Edit Category"
																	>
																		<Icon
																			icon="solar:pen-bold"
																			className="size-3.5"
																		/>
																	</button>
																	<button
																		type="button"
																		onClick={(e) =>
																			handleDeleteCategory(
																				e,
																				cat._id,
																			)
																		}
																		className="rounded-md p-1 text-red-500 hover:bg-red-50"
																		title="Delete Category"
																		aria-label="Delete Category"
																	>
																		<Icon
																			icon="solar:trash-bin-trash-bold"
																			className="size-3.5"
																		/>
																	</button>
																</div>
															</>
														)}
													</div>
												))
											)}
										</div>

										{/* Inline category creation input */}
										<div className="flex items-center gap-2 border-t border-gray-50 pt-3">
											<Input
												placeholder="Create new category inline"
												value={newCategoryName}
												onChange={(e) => setNewCategoryName(e.target.value)}
												className="h-9 w-full rounded-lg border-gray-100 bg-gray-50/50 px-3 text-xs focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
											/>
											<button
												type="button"
												onClick={handleAddCategory}
												disabled={createCategoryMutation.isPending}
												className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#1d4ea8] text-white transition-all hover:bg-[#153a82] active:scale-90 disabled:opacity-50"
												title="Add Category"
												aria-label="Add Category"
											>
												<Icon icon="lucide:plus" className="size-4" />
											</button>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Description */}
						<div className="space-y-2">
							<label
								htmlFor="prod-desc"
								className="text-[13px] font-bold text-gray-600"
							>
								Description (optional)
							</label>
							<textarea
								id="prod-desc"
								aria-label="Description (optional)"
								placeholder="Enter product description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="h-24 w-full rounded-xl border border-gray-100 bg-gray-50/20 p-3 text-sm text-gray-900 outline-none transition-all focus:border-[#1d4ea8] focus:ring-0"
							/>
						</div>
					</div>

					{/* Right Panel: Pricing & Eligibility */}
					<div className="space-y-6 rounded-[2rem] border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
						<div className="flex items-center gap-2 border-b border-gray-50 pb-3">
							<div className="flex size-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
								<Icon icon="solar:card-transfer-bold-duotone" className="size-5" />
							</div>
							<h4 className="text-[14px] font-bold text-gray-800">
								Pricing & Eligibility
							</h4>
						</div>

						{/* Price */}
						<div className="space-y-2">
							<label
								htmlFor="prod-price"
								className="text-[13px] font-bold text-gray-600"
							>
								Price (₦)
							</label>
							<div className="relative">
								<span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
									₦
								</span>
								<Input
									id="prod-price"
									type="number"
									placeholder="0.00"
									value={cost}
									onChange={(e) => setCost(e.target.value)}
									className="h-12 rounded-xl border-gray-100 bg-gray-50/20 pl-8 pr-4 font-bold text-gray-900 focus:border-[#1d4ea8] focus-visible:ring-0 focus-visible:ring-offset-0"
								/>
							</div>
						</div>

						{/* Product Quantity */}
						<div className="space-y-2">
							<label
								htmlFor="prod-quantity"
								className="text-[13px] font-bold text-gray-600"
							>
								Product Quantity
							</label>
							<Input
								id="prod-quantity"
								type="number"
								placeholder="0"
								value={quantity}
								onChange={(e) => setQuantity(e.target.value)}
								className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 font-bold text-gray-900 focus:border-[#1d4ea8] focus-visible:ring-0 focus-visible:ring-offset-0"
							/>
						</div>

						{/* Product Status */}
						<div className="space-y-2">
							<label className="text-[13px] font-bold text-gray-600">
								Product Status
							</label>
							<div className="flex gap-4">
								<button
									type="button"
									onClick={() => setStatus("active")}
									className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border text-xs font-bold transition-all ${
										status === "active"
											? "border-[#1d4ea8] bg-[#1d4ea8] text-white shadow-md active:scale-95"
											: "border-gray-200 bg-white text-gray-500 hover:bg-gray-50 active:scale-95"
									}`}
								>
									<Icon
										icon="solar:check-circle-bold-duotone"
										className="size-4.5"
									/>
									Active
								</button>
								<button
									type="button"
									onClick={() => setStatus("inactive")}
									className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border text-xs font-bold transition-all ${
										status === "inactive"
											? "border-gray-800 bg-gray-800 text-white shadow-md active:scale-95"
											: "border-gray-200 bg-white text-gray-500 hover:bg-gray-50 active:scale-95"
									}`}
								>
									<Icon
										icon="solar:close-circle-bold-duotone"
										className="size-4.5"
									/>
									Inactive
								</button>
							</div>
						</div>

						{/* Incentive Eligibility - Premium Button Group */}
						<div className="space-y-2">
							<label className="text-[13px] font-bold text-gray-600">
								Incentive Eligibility
							</label>
							<div className="flex gap-4">
								<button
									type="button"
									onClick={() => setIncentiveEligible("Yes")}
									className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border text-xs font-bold transition-all ${
										incentiveEligible === "Yes"
											? "border-[#1d4ea8] bg-[#1d4ea8] text-white shadow-md active:scale-95"
											: "border-gray-200 bg-white text-gray-500 hover:bg-gray-50 active:scale-95"
									}`}
								>
									<Icon
										icon="solar:check-circle-bold-duotone"
										className="size-4.5"
									/>
									Yes, Eligible
								</button>
								<button
									type="button"
									onClick={() => setIncentiveEligible("No")}
									className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border text-xs font-bold transition-all ${
										incentiveEligible === "No"
											? "border-gray-800 bg-gray-800 text-white shadow-md active:scale-95"
											: "border-gray-200 bg-white text-gray-500 hover:bg-gray-50 active:scale-95"
									}`}
								>
									<Icon
										icon="solar:close-circle-bold-duotone"
										className="size-4.5"
									/>
									No, Standard
								</button>
							</div>
						</div>

						{/* Incentive Value Selection Cards */}
						{incentiveEligible === "Yes" && (
							<div className="animate-in fade-in slide-in-from-top-1 space-y-3 rounded-2xl border border-blue-100 bg-blue-50/15 p-4">
								<div className="space-y-2">
									<label className="text-[12px] font-bold text-gray-600">
										Incentive Payout Value
									</label>
									<div className="flex gap-3">
										<button
											type="button"
											onClick={() => setIncentiveValueType("default")}
											className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border p-3 text-center text-[11px] font-bold leading-tight transition-all ${
												incentiveValueType === "default"
													? "border-[#1d4ea8] bg-[#1d4ea8]/10 text-[#1d4ea8] shadow-sm"
													: "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
											}`}
										>
											<span className="text-[10px] font-medium opacity-75">
												Use Corporate
											</span>
											<span>
												{defType === "flat" ? "₦" : ""}
												{defVal}
												{defType === "percentage" ? "%" : ""} Default
											</span>
										</button>
										<button
											type="button"
											onClick={() => setIncentiveValueType("custom")}
											className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border p-3 text-center text-[11px] font-bold leading-tight transition-all ${
												incentiveValueType === "custom"
													? "border-[#1d4ea8] bg-[#1d4ea8]/10 text-[#1d4ea8] shadow-sm"
													: "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
											}`}
										>
											<span className="text-[10px] font-medium opacity-75">
												Configure
											</span>
											<span>Custom Override</span>
										</button>
									</div>
								</div>

								{incentiveValueType === "custom" && (
									<div className="mt-2 grid grid-cols-2 gap-4 border-t border-blue-100/30 pt-3">
										<div className="space-y-1">
											<label className="text-[11px] font-bold text-gray-500">
												Custom Type
											</label>
											<Select
												value={customIncentiveType}
												onValueChange={(val) =>
													setCustomIncentiveType(
														val as "flat" | "percentage",
													)
												}
											>
												<SelectTrigger className="border-gray-150 h-10 rounded-xl bg-white text-xs font-bold focus:ring-0">
													<SelectValue />
												</SelectTrigger>
												<SelectContent className="rounded-xl">
													<SelectItem value="flat">
														Flat Rate (₦)
													</SelectItem>
													<SelectItem value="percentage">
														Percentage (%)
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="space-y-1">
											<label className="text-[11px] font-bold text-gray-500">
												Custom Value
											</label>
											<Input
												type="number"
												placeholder="0"
												value={customIncentiveValue}
												onChange={(e) =>
													setCustomIncentiveValue(e.target.value)
												}
												className="border-gray-150 h-10 rounded-xl bg-white px-3 text-xs font-bold focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
											/>
										</div>
									</div>
								)}
							</div>
						)}

						{/* Product Image Upload */}
						<div className="space-y-2">
							<label className="text-[13px] font-bold text-gray-600">
								Product Image
							</label>
							<div className="flex items-center gap-4">
								<div className="relative flex h-20 w-32 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50/20">
									{avatar ? (
										<Image
											src={avatar}
											alt="Product Preview"
											fill
											className="object-cover"
										/>
									) : (
										<Icon
											icon="solar:gallery-bold-duotone"
											className="size-8 text-gray-200"
										/>
									)}
								</div>
								<input
									type="file"
									onChange={handleAvatarUpload}
									accept="image/*"
									className="hidden"
									id="prod-avatar-upload"
									aria-label="Upload Product Avatar"
								/>
								<label
									htmlFor="prod-avatar-upload"
									className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 text-xs font-bold text-[#1d4ea8] transition-all hover:bg-gray-50 active:scale-95"
								>
									<Icon icon="solar:camera-bold-duotone" className="size-4" />
									Choose file
								</label>
							</div>
						</div>
					</div>
				</div>

				{/* Save & Cancel Actions */}
				<div className="flex justify-end gap-4 border-t border-gray-50 pt-4">
					<Button
						type="button"
						variant="ghost"
						onClick={onClose}
						className="h-12 rounded-xl px-6 font-bold text-gray-500 hover:bg-gray-50"
					>
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={isPending}
						className="h-12 rounded-xl bg-[#1d4ea8] px-8 font-bold text-white shadow-md transition-all hover:bg-[#153a82] active:scale-95 disabled:opacity-50"
					>
						{isPending ? "Saving..." : "Save Product"}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
