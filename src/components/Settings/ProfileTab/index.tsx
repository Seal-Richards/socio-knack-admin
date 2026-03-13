"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function ProfileTab() {
	return (
		<div className="flex flex-col gap-8">
			{/* Section: Profile Settings */}
			<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
				<div className="mb-8 flex items-center justify-between">
					<h3 className="text-[15px] font-bold text-gray-800">Profile Settings</h3>
					<Button className="h-11 rounded-xl bg-[#4CAF50] px-8 font-bold text-white transition-all hover:bg-[#43A047] active:scale-95">
						Save Changes
					</Button>
				</div>

				<div className="space-y-8">
					<div className="space-y-4">
						<Label className="text-[14px] font-medium text-gray-600">
							Profile Photo
						</Label>
						<div className="relative inline-block">
							<div className="flex size-24 items-center justify-center rounded-full border border-gray-100 bg-gray-50/30">
								<Icon
									icon="solar:gallery-bold-duotone"
									className="size-10 text-gray-200"
								/>
							</div>
							<button className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border border-white bg-[#1d4ea8] text-white shadow-sm transition-all hover:bg-[#153a82] active:scale-95">
								<Icon icon="lucide:edit-3" className="size-4" />
							</button>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						<div className="space-y-2">
							<Label className="text-[14px] font-medium text-gray-600">
								Full Name
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
			</div>

			{/* Section: Security & Authentication */}
			<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
				<h3 className="mb-8 text-[15px] font-bold text-gray-800">
					Security & Authentication
				</h3>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<button className="flex h-16 items-center justify-center gap-3 rounded-2xl bg-gray-100/60 font-bold text-gray-800 transition-all hover:bg-gray-100 active:scale-[0.98]">
						<Icon icon="lucide:lock" className="size-5" />
						Change Password
					</button>
					<button className="flex h-16 items-center justify-center gap-3 rounded-2xl bg-[#1d4ea8] font-bold text-white transition-all hover:bg-[#153a82] active:scale-[0.98]">
						<Icon icon="lucide:shield-check" className="size-5" />
						Set Two-factor Auth
					</button>
				</div>
			</div>

			{/* Section: Notification Control */}
			<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
				<h3 className="mb-8 text-[15px] font-bold text-gray-800">Notification Control</h3>
				<div className="flex flex-col gap-6">
					<div className="flex max-w-sm items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="size-2 rounded-full bg-[#10b981]" />
							<span className="text-[14px] font-medium text-gray-800">
								System Alerts
							</span>
						</div>
						<Switch className="data-[state=checked]:bg-[#1d4ea8]" />
					</div>
					<div className="flex max-w-sm items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="size-2 rounded-full bg-[#10b981]" />
							<span className="text-[14px] font-medium text-gray-800">
								Push Notifications
							</span>
						</div>
						<Switch className="data-[state=checked]:bg-[#1d4ea8]" />
					</div>
				</div>
			</div>

			{/* Section: System Preferences */}
			<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
				<h3 className="mb-8 text-[15px] font-bold text-gray-800">System Preferences</h3>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					<div className="space-y-2">
						<Label className="text-[14px] font-medium text-gray-600">Language</Label>
						<Select>
							<SelectTrigger className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[14px] font-bold text-gray-800 transition-all hover:bg-gray-50 focus:ring-0">
								<SelectValue placeholder="English" />
							</SelectTrigger>
							<SelectContent className="rounded-xl border-gray-100">
								<SelectItem value="en">English</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label className="text-[14px] font-medium text-gray-600">Region</Label>
						<Select>
							<SelectTrigger className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[14px] font-bold text-gray-800 transition-all hover:bg-gray-50 focus:ring-0">
								<SelectValue placeholder="Time Zone" />
							</SelectTrigger>
							<SelectContent className="rounded-xl border-gray-100">
								<SelectItem value="gmt1">Lagos (GMT+1)</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			{/* Section: Audit Log */}
			<div className="rounded-[2.5rem] border border-gray-100 bg-white p-6 shadow-sm">
				<button className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gray-100/60 font-bold text-gray-800 transition-all hover:bg-gray-100 active:scale-[0.99]">
					<Icon icon="solar:history-bold-duotone" className="size-6" />
					View Audit & Activity Log
				</button>
			</div>
		</div>
	);
}
