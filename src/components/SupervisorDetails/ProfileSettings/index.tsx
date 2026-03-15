import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function ProfileSettings() {
	return (
		<div className="flex flex-col gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:gap-8 md:p-8">
			<h3 className="text-[14px] font-bold text-gray-500 sm:text-[15px]">Personal Profile</h3>
			<div className="h-px w-full bg-gray-100" />
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-800">Full Name</Label>
					<Input
						defaultValue="Sarah Johnson"
						className="h-12 rounded-xl border-gray-200 bg-white px-4 text-[13px] font-medium text-gray-700 focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-800">Mail Address</Label>
					<div className="relative">
						<Input
							defaultValue="sarahjohnson@gmail.com"
							className="h-12 rounded-xl border-gray-200 bg-white px-4 pr-10 text-[13px] font-medium text-gray-700 focus:border-[#1d4ea8] focus:ring-0"
						/>
						<div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-[#4CAF50] p-0.5 text-white">
							<Icon icon="lucide:check" className="size-3" />
						</div>
					</div>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-800">Phone Number</Label>
					<div className="relative">
						<Input
							defaultValue="09088888888"
							className="h-12 rounded-xl border-gray-200 bg-white px-4 pr-10 text-[13px] font-medium text-gray-700 focus:border-[#1d4ea8] focus:ring-0"
						/>
						<div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-[#4CAF50] p-0.5 text-white">
							<Icon icon="lucide:check" className="size-3" />
						</div>
					</div>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-800">Date of Birth</Label>
					<Input
						placeholder="Here"
						className="h-12 rounded-xl border-gray-200 bg-white px-4 text-[13px] font-medium text-gray-700 focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-800">Gender</Label>
					<Input
						placeholder="Here"
						className="h-12 rounded-xl border-gray-200 bg-white px-4 text-[13px] font-medium text-gray-700 focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-800">
						Residential Address
					</Label>
					<Input
						placeholder="Here"
						className="h-12 rounded-xl border-gray-200 bg-white px-4 text-[13px] font-medium text-gray-700 focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-800">City</Label>
					<Input
						defaultValue="Yaba"
						className="h-12 rounded-xl border-gray-200 bg-white px-4 text-[13px] font-medium text-gray-700 focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-800">State</Label>
					<Input
						defaultValue="Lagos"
						className="h-12 rounded-xl border-gray-200 bg-white px-4 text-[13px] font-medium text-gray-700 focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-800">Country</Label>
					<Input
						defaultValue="Nigeria"
						className="h-12 rounded-xl border-gray-200 bg-white px-4 text-[13px] font-medium text-gray-700 focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
			</div>
			<div className="mt-4 flex justify-center pt-4">
				<Button className="h-12 w-full max-w-md rounded-xl bg-[#1d4ea8] font-bold text-white transition-all hover:bg-[#153a82] active:scale-[0.99]">
					Save Changes
				</Button>
			</div>
		</div>
	);
}
