"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import type { AgentData } from "@/types/agent";
import { useUpdateAgentProfile } from "@/hooks/useAgent";
import { toast } from "sonner";

export default function ProfileSettings({ agent }: { agent: AgentData }) {
	const [fullName, setFullName] = useState(
		`${agent.firstName || ""} ${agent.lastName || ""}`.trim(),
	);
	const [email, setEmail] = useState(agent.email || "");
	const [phone, setPhone] = useState(agent.phone || "");

	const formatInitialDate = (dateStr?: string) => {
		if (!dateStr) return "";
		try {
			const d = new Date(dateStr);
			if (Number.isNaN(d.getTime())) return "";
			return d.toISOString().split("T")[0];
		} catch {
			return "";
		}
	};

	const [dob, setDob] = useState(formatInitialDate(agent.dob));
	const [gender, setGender] = useState(agent.gender || "");
	const [residentialAddress, setResidentialAddress] = useState(agent.residentialAddress || "");
	const [city, setCity] = useState(agent.city || "");
	const [state, setState] = useState(agent.state || "");
	const [country, setCountry] = useState(agent.country || "");

	const updateProfileMutation = useUpdateAgentProfile();

	const handleSaveChanges = async () => {
		try {
			const parts = fullName.trim().split(/\s+/);
			const firstName = parts[0] || "";
			const lastName = parts.slice(1).join(" ") || "";

			const res = await updateProfileMutation.mutateAsync({
				id: agent._id || agent.id,
				payload: {
					firstName,
					lastName,
					email,
					phone,
					dob: dob ? new Date(dob).toISOString() : undefined,
					gender,
					residentialAddress,
					city,
					state,
					country,
				},
			});

			if (res.success) {
				toast.success(res.message || "Agent profile updated successfully.");
			} else {
				toast.error(res.message || "Failed to update agent profile.");
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "An error occurred.");
		}
	};

	return (
		<div className="flex flex-col gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:gap-8 md:p-8">
			<h3 className="text-[14px] font-bold text-gray-600 sm:text-[15px]">Personal Profile</h3>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-700">Full Name</Label>
					<Input
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[13px] font-medium focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-700">Mail Address</Label>
					<div className="relative">
						<Input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
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
						type="date"
						value={dob}
						onChange={(e) => setDob(e.target.value)}
						className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[13px] font-medium focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-700">Gender</Label>
					<Input
						placeholder="Gender"
						value={gender}
						onChange={(e) => setGender(e.target.value)}
						className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[13px] font-medium focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-700">
						Residential Address
					</Label>
					<Input
						placeholder="Address"
						value={residentialAddress}
						onChange={(e) => setResidentialAddress(e.target.value)}
						className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[13px] font-medium focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-700">City</Label>
					<Input
						value={city}
						onChange={(e) => setCity(e.target.value)}
						className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[13px] font-medium focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-700">State</Label>
					<Input
						value={state}
						onChange={(e) => setState(e.target.value)}
						className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[13px] font-medium focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-[13px] font-bold text-gray-700">Country</Label>
					<Input
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[13px] font-medium focus:border-[#1d4ea8] focus:ring-0"
					/>
				</div>
			</div>
			<div className="mt-4 pt-4">
				<Button
					disabled={updateProfileMutation.isPending}
					onClick={handleSaveChanges}
					className="h-12 w-full rounded-xl bg-[#1d4ea8] font-bold text-white transition-all hover:bg-[#153a82] active:scale-[0.99]"
				>
					{updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
				</Button>
			</div>
		</div>
	);
}
