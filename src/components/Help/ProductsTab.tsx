"use client";

import React from "react";
import { Icon } from "@iconify/react";

export default function ProductsTab() {
	return (
		<div className="flex flex-col gap-10">
			{/* Section 1: Product Creation */}
			<section id="creation" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#1d4ea8]">
						<Icon icon="solar:box-plus-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Creating Products & Services
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					Admins create items in the <strong>Products & Services Inventory</strong>.
					Creating a product requires the following details:
				</p>
				<div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
					<span className="font-sans text-[13px] font-extrabold text-gray-800">
						Product Form Attributes:
					</span>
					<ul className="list-disc space-y-2 pl-5 text-[12px] font-semibold text-gray-500">
						<li>
							<strong>Product Name & Category:</strong> Classifies items for filtering
							(e.g. Hot Sales, Season Sales).
						</li>
						<li>
							<strong>Price (₦):</strong> The standard price of a single unit of the
							product.
						</li>
						<li>
							<strong>Incentive Eligibility:</strong> Checkbox that toggles if sales
							of this item earn incentive points/payout.
						</li>
						<li>
							<strong>Product Quantity (Required):</strong> A mandatory field
							representing the initial count of units available in inventory.
						</li>
					</ul>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 2: Quantity Logic */}
			<section id="quantities" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
						<Icon icon="solar:bomb-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Stock Quantity Logic
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					The system manages product stock status in the database using automated quantity
					triggers:
				</p>
				<div className="flex items-start gap-4 rounded-2xl border border-red-100 bg-red-50/20 p-5">
					<Icon
						icon="solar:danger-bold-duotone"
						className="mt-0.5 size-5 shrink-0 text-red-500"
					/>
					<div className="flex flex-col gap-1">
						<span className="font-sans text-[13px] font-extrabold text-red-700">
							Out of Stock Indicator
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-red-600/90">
							If a product has a quantity value of <code>0</code> or less (or if an
							older product has a missing quantity value), the system automatically
							defaults the quantity to <code>0</code>, tags the status as{" "}
							<strong>Out of Stock</strong>, and renders a red badge in the inventory
							table.
						</span>
					</div>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 3: Agent Visibility */}
			<section id="visibility" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
						<Icon icon="solar:eye-closed-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Agent Visibility Constraints
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					To ensure agents do not record sales for unavailable inventory items, the API
					enforces stock filtering:
				</p>
				<div className="flex items-start gap-4 rounded-2xl border border-[#1d4ea8]/10 bg-[#1d4ea8]/5 p-5">
					<Icon
						icon="solar:shield-check-bold-duotone"
						className="mt-0.5 size-5 shrink-0 text-[#1d4ea8]"
					/>
					<div className="flex flex-col gap-1">
						<span className="font-sans text-[13px] font-extrabold text-[#1d4ea8]">
							Automated Catalog Hiding
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-600">
							The agent product catalog endpoint <code>getProducts</code>{" "}
							automatically excludes any products with a quantity of <code>0</code> or
							less. These out-of-stock products are hidden from the agent&apos;s sales
							reporting UI in the mobile app, with{" "}
							<strong>zero mobile frontend changes required</strong>.
						</span>
					</div>
				</div>
			</section>
		</div>
	);
}
