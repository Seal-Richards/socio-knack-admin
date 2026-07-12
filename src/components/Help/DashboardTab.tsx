"use client";

import React from "react";
import { Icon } from "@iconify/react";

export default function DashboardTab() {
	return (
		<div className="flex flex-col gap-10">
			{/* Section 1: KPI Metric Cards */}
			<section id="kpis" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#1d4ea8]">
						<Icon icon="solar:widget-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						KPI Metric Cards
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					The top section of the dashboard displays aggregate metrics to monitor product
					stats and general performance:
				</p>
				<div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2">
					<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
						<span className="flex items-center gap-2 text-[14px] font-extrabold text-gray-800">
							<span className="size-2.5 rounded-full bg-[#1d4ea8]" /> All Products &
							Services
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
							Shows the total count of products or services created under this
							business. Includes a blue sub-badge stating the total in-stock monetary
							value and cumulative item units (e.g.{" "}
							<code>₦675,000 In-Stock (25)</code>).
						</span>
					</div>
					<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
						<span className="flex items-center gap-2 text-[14px] font-extrabold text-gray-800">
							<span className="size-2.5 rounded-full bg-green-500" /> Total Sold
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
							The total count of items/services sold across completed task sales
							reports (including installment or full payment transactions).
						</span>
					</div>
					<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
						<span className="flex items-center gap-2 text-[14px] font-extrabold text-gray-800">
							<span className="size-2.5 rounded-full bg-red-500" /> Out of Stock
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
							Identifies the number of products that currently have a quantity of{" "}
							<code>0</code>. These products automatically display an{" "}
							<strong>Out of Stock</strong> red badge and are completely hidden from
							agents logging sales reports.
						</span>
					</div>
					<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
						<span className="flex items-center gap-2 text-[14px] font-extrabold text-gray-800">
							<span className="size-2.5 rounded-full bg-amber-500" /> Active vs
							Inactive
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
							Tracks products flagged as <strong>Active</strong> (visible in general
							lists) vs <strong>Inactive</strong> (temporarily archived/hidden).
						</span>
					</div>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 2: Visualizations */}
			<section id="visualizations" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
						<Icon icon="solar:chart-square-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Analytical Charts
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					Under the analytics layer, the dashboard displays visualizations of field
					operations:
				</p>
				<div className="mt-2 space-y-4">
					<div className="flex items-start gap-4">
						<Icon
							icon="solar:graph-up-bold-duotone"
							className="mt-0.5 size-5 shrink-0 text-[#1d4ea8]"
						/>
						<div className="flex flex-col gap-0.5">
							<span className="text-[14px] font-bold text-gray-800">
								Sales Value & Trends
							</span>
							<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
								Interactive charts representing the monetary volume of sales
								recorded over time. Helps compare supervisor performance and
								identify high-revenue zones.
							</span>
						</div>
					</div>
					<div className="flex items-start gap-4">
						<Icon
							icon="solar:map-arrow-square-bold-duotone"
							className="mt-0.5 size-5 shrink-0 text-[#1d4ea8]"
						/>
						<div className="flex flex-col gap-0.5">
							<span className="text-[14px] font-bold text-gray-800">
								Check-in Activity & Live Statuses
							</span>
							<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
								Provides live visual reports of checking-in times for agents.
								Correlates geographic location check-ins with scheduled task zones.
							</span>
						</div>
					</div>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 3: Real-time Audit */}
			<section id="realtime-feed" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
						<Icon icon="solar:history-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Real-time Auditing
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					To enforce transparency, all administrative operations log events in the{" "}
					<strong>Global System Audit Ledger</strong>:
				</p>
				<div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
					<span className="text-[13px] font-extrabold text-gray-800">
						Logged Metadata Fields:
					</span>
					<ul className="list-disc space-y-2 pl-5 text-[12px] font-semibold text-gray-500">
						<li>
							<strong>Time Stamp:</strong> Precise system-recorded date and local time
							of the action.
						</li>
						<li>
							<strong>Admin Name:</strong> Identity of the operator (or
							&quot;System&quot; for auto-jobs).
						</li>
						<li>
							<strong>Action Type:</strong> Unified classification (e.g.{" "}
							<code>Task Creation</code>, <code>Invitation Accepted</code>).
						</li>
						<li>
							<strong>Action Description:</strong> Sentence describing the context
							(e.g., <code>&quot;Reassigned 5 tasks to Business Owner&quot;</code>).
						</li>
						<li>
							<strong>Affected Entity/Resource:</strong> Name of the user profile,
							bank, or product target of the change.
						</li>
						<li>
							<strong>Status:</strong> Outcome of the audit event (e.g.,{" "}
							<code>Successful</code>, <code>Warning</code>, <code>Failed</code>).
						</li>
					</ul>
				</div>
			</section>
		</div>
	);
}
