"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function OrganisationTab() {
	return (
		<div className="flex flex-col gap-8">
			{/* Section: Company Logo & Colors */}
			<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
				<h3 className="mb-8 text-[15px] font-bold text-gray-800">Company Logo & Colors</h3>
				<div className="flex flex-wrap items-end gap-12">
					<div className="space-y-4">
						<Label className="text-[14px] font-medium text-gray-600">Upload Logo</Label>
						<div className="flex items-center gap-4">
							<div className="flex h-[88px] w-[176px] items-center justify-center rounded-2xl border border-gray-100 bg-gray-50/30">
								<Icon
									icon="solar:gallery-bold-duotone"
									className="size-10 text-gray-200"
								/>
							</div>
							<button className="flex size-11 items-center justify-center rounded-xl border border-gray-100 text-[#1d4ea8] transition-all hover:bg-gray-50 active:scale-95">
								<Icon icon="lucide:edit-3" className="size-5" />
							</button>
						</div>
					</div>

					<div className="space-y-4">
						<Label className="text-[14px] font-medium text-gray-600">Theme color</Label>
						<div className="flex gap-6">
							<div className="relative">
								<span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#1d4ea8]">
									#
								</span>
								<Input
									placeholder="Color code 1"
									className="h-12 w-48 rounded-xl border-gray-100 bg-gray-50/20 pl-8 focus:border-[#1d4ea8] focus:ring-0"
								/>
							</div>
							<div className="relative">
								<span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#1d4ea8]">
									#
								</span>
								<Input
									placeholder="Color code 2"
									className="h-12 w-48 rounded-xl border-gray-100 bg-gray-50/20 pl-8 focus:border-[#1d4ea8] focus:ring-0"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Section: Company Details */}
			<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
				<h3 className="mb-8 text-[15px] font-bold text-gray-800">Company Details</h3>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					<div className="space-y-2">
						<Label className="text-[14px] font-medium text-gray-600">Legal Name</Label>
						<Input className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 focus:border-[#1d4ea8] focus:ring-0" />
					</div>
					<div className="space-y-2">
						<Label className="text-[14px] font-medium text-gray-600">Tax ID</Label>
						<Input className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 focus:border-[#1d4ea8] focus:ring-0" />
					</div>
					<div className="space-y-2">
						<Label className="text-[14px] font-medium text-gray-600">
							Primary Headquarters address
						</Label>
						<Input className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 focus:border-[#1d4ea8] focus:ring-0" />
					</div>
				</div>
			</div>

			{/* Section: Key Contacts */}
			<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
				<h3 className="mb-8 text-[15px] font-bold text-gray-800">Key Contacts</h3>

				<div className="space-y-12">
					{/* Primary Admin */}
					<div className="space-y-6">
						<div className="flex items-center gap-3">
							<div className="size-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
							<span className="text-[15px] font-bold text-gray-800">
								Primary Admin
							</span>
						</div>
						<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
							<div className="space-y-2">
								<Label className="text-[14px] font-medium text-gray-600">
									Name (CEO/Operations Head)
								</Label>
								<Input className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 focus:border-[#1d4ea8] focus:ring-0" />
							</div>
							<div className="space-y-2">
								<Label className="text-[14px] font-medium text-gray-600">
									Email Address
								</Label>
								<Input className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 focus:border-[#1d4ea8] focus:ring-0" />
							</div>
							<div className="space-y-2">
								<Label className="text-[14px] font-medium text-gray-600">
									Phone Number
								</Label>
								<Input className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 focus:border-[#1d4ea8] focus:ring-0" />
							</div>
						</div>
					</div>

					{/* Technical Lead */}
					<div className="space-y-6">
						<div className="flex items-center gap-3">
							<div className="size-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
							<span className="text-[15px] font-bold text-gray-800">
								Technical Lead
							</span>
						</div>
						<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
							<div className="space-y-2">
								<Label className="text-[14px] font-medium text-gray-600">
									Name (CTO/IT Manager)
								</Label>
								<Input className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 focus:border-[#1d4ea8] focus:ring-0" />
							</div>
							<div className="space-y-2">
								<Label className="text-[14px] font-medium text-gray-600">
									Email Address
								</Label>
								<Input className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 focus:border-[#1d4ea8] focus:ring-0" />
							</div>
							<div className="space-y-2">
								<Label className="text-[14px] font-medium text-gray-600">
									Phone Number
								</Label>
								<Input className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 focus:border-[#1d4ea8] focus:ring-0" />
							</div>
						</div>
					</div>

					{/* Support Alias */}
					<div className="space-y-6">
						<div className="flex items-center gap-3">
							<div className="size-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
							<span className="text-[15px] font-bold text-gray-800">
								Support Alias
							</span>
						</div>
						<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
							<div className="space-y-2">
								<Label className="text-[14px] font-medium text-gray-600">
									Email Address
								</Label>
								<Input className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 focus:border-[#1d4ea8] focus:ring-0" />
							</div>
							<div className="space-y-2">
								<Label className="text-[14px] font-medium text-gray-600">
									Phone Number
								</Label>
								<Input className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 focus:border-[#1d4ea8] focus:ring-0" />
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Section: Regional Settings */}
			<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
				<h3 className="mb-8 text-[15px] font-bold text-gray-800">Regional Settings</h3>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					<div className="space-y-2">
						<Label className="text-[14px] font-medium text-gray-600">
							Default currency
						</Label>
						<Select>
							<SelectTrigger className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[14px] font-bold text-gray-800 transition-all hover:bg-gray-50 focus:ring-0">
								<SelectValue placeholder="(₦)" />
							</SelectTrigger>
							<SelectContent className="rounded-xl border-gray-100">
								<SelectItem value="ngn">(₦) Nigerian Naira</SelectItem>
								<SelectItem value="usd">($) US Dollar</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label className="text-[14px] font-medium text-gray-600">Time-zone</Label>
						<Select>
							<SelectTrigger className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[14px] font-bold text-gray-800 transition-all hover:bg-gray-50 focus:ring-0">
								<SelectValue placeholder="Time Zone" />
							</SelectTrigger>
							<SelectContent className="rounded-xl border-gray-100">
								<SelectItem value="lagos">Africa/Lagos (GMT+1)</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label className="text-[14px] font-medium text-gray-600">
							Primary operating language
						</Label>
						<Select>
							<SelectTrigger className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[14px] font-bold text-gray-800 transition-all hover:bg-gray-50 focus:ring-0">
								<SelectValue placeholder="English" />
							</SelectTrigger>
							<SelectContent className="rounded-xl border-gray-100">
								<SelectItem value="en">English</SelectItem>
								<SelectItem value="fr">French</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
		</div>
	);
}
