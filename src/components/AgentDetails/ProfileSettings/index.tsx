import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function ProfileSettings() {
	return (
		<div className="flex flex-col gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:gap-8 md:p-8">
			<h3 className="text-[14px] font-bold text-gray-600 sm:text-[15px]">Personal Profile</h3>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-700">Full Name</Label>
					<Input
						defaultValue="Kolawole James"
						className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[13px] font-medium focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-700">Mail Address</Label>
					<div className="relative">
						<Input
							defaultValue="kolawolejames@gmail.com"
							className="h-12 rounded-xl border-gray-100 bg-white px-4 pr-10 text-[13px] font-medium focus:border-[#1d4ea8] focus:ring-0"
						/>
						<div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-[#10b981] p-0.5 text-white">
							<Icon icon="lucide:check" className="size-3" />
						</div>
					</div>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-700">Phone Number</Label>
					<div className="relative">
						<Input
							defaultValue="09088888888"
							className="h-12 rounded-xl border-gray-100 bg-white px-4 pr-10 text-[13px] font-medium focus:border-[#1d4ea8] focus:ring-0"
						/>
						<div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-[#10b981] p-0.5 text-white">
							<Icon icon="lucide:check" className="size-3" />
						</div>
					</div>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-700">Date of Birth</Label>
					<Input
						placeholder="Here"
						className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[13px] font-medium focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-700">Gender</Label>
					<Input
						placeholder="Here"
						className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[13px] font-medium focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-700">
						Residential Address
					</Label>
					<Input
						placeholder="Here"
						className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[13px] font-medium focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-700">City</Label>
					<Input
						defaultValue="Yaba"
						className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[13px] font-medium focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-700">State</Label>
					<Input
						defaultValue="Lagos"
						className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[13px] font-medium focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-700">Country</Label>
					<Input
						defaultValue="Nigeria"
						className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[13px] font-medium focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
			</div>
			<div className="mt-4 pt-4">
				<Button className="h-12 w-full rounded-xl bg-[#1d4ea8] font-bold text-white transition-all hover:bg-[#153a82] active:scale-[0.99]">
					Save Changes
				</Button>
			</div>
		</div>
	);
}
