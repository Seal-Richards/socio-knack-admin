"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function BillingsConfigTab() {
	return (
		<div className="flex flex-col gap-8">
			{/* Billing Overview */}
			<div className="flex flex-col gap-8 rounded-3xl border border-gray-50 bg-white p-6 shadow-sm lg:p-8">
				<div className="flex items-center justify-between border-b border-gray-50 pb-6">
					<div>
						<h3 className="text-xl font-bold text-gray-900">Billing & Subscription</h3>
						<p className="text-sm text-gray-500">
							Manage your subscription plan and payment methods.
						</p>
					</div>
					<div className="flex items-center gap-3">
						<span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[12px] font-bold text-[#1d4ea8]">
							Enterprise Plan
						</span>
						<Button
							variant="outline"
							className="h-10 rounded-xl border-gray-200 font-bold text-gray-700"
						>
							Upgrade Plan
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="flex flex-col gap-1 rounded-2xl bg-gray-50/50 p-6">
						<p className="text-xs font-bold uppercase tracking-wider text-gray-400">
							Next Billing Date
						</p>
						<p className="text-lg font-black text-gray-900">March 28, 2026</p>
					</div>
					<div className="flex flex-col gap-1 rounded-2xl bg-gray-50/50 p-6">
						<p className="text-xs font-bold uppercase tracking-wider text-gray-400">
							Monthly Cost
						</p>
						<p className="text-lg font-black text-gray-900">₦250,000.00</p>
					</div>
					<div className="flex flex-col gap-1 rounded-2xl bg-gray-50/50 p-6">
						<p className="text-xs font-bold uppercase tracking-wider text-gray-400">
							Payment Method
						</p>
						<div className="flex items-center gap-2">
							<Icon icon="logos:mastercard" className="size-6" />
							<p className="text-lg font-black text-gray-900">•••• 8821</p>
						</div>
					</div>
				</div>
			</div>

			{/* Configuration Section */}
			<div className="flex flex-col gap-8 rounded-3xl border border-gray-50 bg-white p-6 shadow-sm lg:p-8">
				<h3 className="text-xl font-bold text-gray-900">Platform Configuration</h3>
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-50 p-5 transition-all hover:bg-gray-50/30">
						<div className="flex items-center gap-4">
							<div className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
								<Icon icon="lucide:bell" className="size-5" />
							</div>
							<div>
								<p className="font-bold text-gray-800">Email Notifications</p>
								<p className="text-xs text-gray-400">
									Receive weekly reports and system alerts via email.
								</p>
							</div>
						</div>
						<div className="flex size-6 items-center justify-center rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
							<Icon icon="lucide:check" className="size-3 text-white" />
						</div>
					</div>

					<div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-50 p-5 transition-all hover:bg-gray-50/30">
						<div className="flex items-center gap-4">
							<div className="flex size-10 items-center justify-center rounded-xl bg-purple-50 text-purple-500">
								<Icon icon="lucide:shield-check" className="size-5" />
							</div>
							<div>
								<p className="font-bold text-gray-800">Two-Factor Authentication</p>
								<p className="text-xs text-gray-400">
									Add an extra layer of security to your account.
								</p>
							</div>
						</div>
						<div className="size-6 rounded-full bg-gray-200" />
					</div>
				</div>
			</div>
		</div>
	);
}
