"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useGetBusinessSettings, useUpdateBusinessSettings } from "@/hooks/useBusiness";
import { toast } from "sonner";

interface OrganisationFormValues {
	name: string;
	legalName: string;
	taxId: string;
	hqAddress: string;
	logo: string;
	color1: string;
	color2: string;
	primaryAdminName: string;
	primaryAdminEmail: string;
	primaryAdminPhone: string;
	technicalLeadName: string;
	technicalLeadEmail: string;
	technicalLeadPhone: string;
	supportEmail: string;
	supportPhone: string;
	currency: string;
	timeZone: string;
	primaryLanguage: string;
}

export default function OrganisationTab() {
	const { data: settingsRes, isLoading, refetch } = useGetBusinessSettings();
	const updateSettingsMutation = useUpdateBusinessSettings();

	const businessSettings = settingsRes?.data;

	const cacUrl = businessSettings?.corporateDocuments?.cacCertificate;
	const taxUrl = businessSettings?.corporateDocuments?.taxIdCertificate;
	const utilityUrl = businessSettings?.corporateDocuments?.utilityBill;

	const getFileName = (url?: string | null, defaultName = "document.pdf") => {
		if (!url) return "Not uploaded yet";
		try {
			const parts = url.split("/");
			const lastPart = parts[parts.length - 1] || "";
			return decodeURIComponent(lastPart.split("?")[0] || "");
		} catch {
			return defaultName;
		}
	};

	const handleDownload = (url?: string | null) => {
		if (!url) {
			toast.error("No document file available.");
			return;
		}
		window.open(url, "_blank", "noopener,noreferrer");
	};

	const { register, handleSubmit, control, reset, setValue, watch } =
		useForm<OrganisationFormValues>({
			defaultValues: {
				name: "",
				legalName: "",
				taxId: "",
				hqAddress: "",
				logo: "",
				color1: "1d4ea8",
				color2: "1d4ea8",
				primaryAdminName: "",
				primaryAdminEmail: "",
				primaryAdminPhone: "",
				technicalLeadName: "",
				technicalLeadEmail: "",
				technicalLeadPhone: "",
				supportEmail: "",
				supportPhone: "",
				currency: "ngn",
				timeZone: "lagos",
				primaryLanguage: "en",
			},
		});

	const logoUrl = watch("logo");

	// Pre-populate loaded settings
	useEffect(() => {
		if (businessSettings) {
			reset({
				name: businessSettings.name || "",
				legalName: businessSettings.legalName || "",
				taxId: businessSettings.taxId || "",
				hqAddress: businessSettings.hqAddress || "",
				logo: businessSettings.logo || "",
				color1: businessSettings.themeColors?.color1?.replace("#", "") || "1d4ea8",
				color2: businessSettings.themeColors?.color2?.replace("#", "") || "1d4ea8",
				primaryAdminName: businessSettings.primaryAdmin?.name || "",
				primaryAdminEmail: businessSettings.primaryAdmin?.email || "",
				primaryAdminPhone: businessSettings.primaryAdmin?.phone || "",
				technicalLeadName: businessSettings.technicalLead?.name || "",
				technicalLeadEmail: businessSettings.technicalLead?.email || "",
				technicalLeadPhone: businessSettings.technicalLead?.phone || "",
				supportEmail: businessSettings.supportContact?.email || "",
				supportPhone: businessSettings.supportContact?.phone || "",
				currency: businessSettings.currency?.toLowerCase() || "ngn",
				timeZone: businessSettings.timeZone?.toLowerCase() || "lagos",
				primaryLanguage: businessSettings.primaryLanguage?.toLowerCase() || "en",
			});
		}
	}, [businessSettings, reset]);

	const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = () => {
			if (typeof reader.result === "string") {
				setValue("logo", reader.result);
			}
		};
		reader.readAsDataURL(file);
	};

	const onSubmit = async (data: OrganisationFormValues) => {
		try {
			const res = await updateSettingsMutation.mutateAsync({
				name: data.name,
				legalName: data.legalName,
				taxId: data.taxId,
				hqAddress: data.hqAddress,
				logo: data.logo,
				themeColors: {
					color1: `#${data.color1}`,
					color2: `#${data.color2}`,
				},
				primaryAdmin: {
					name: businessSettings?.primaryAdmin?.name || "",
					email: businessSettings?.primaryAdmin?.email || "",
					phone: businessSettings?.primaryAdmin?.phone || "",
				},
				technicalLead: {
					name: businessSettings?.technicalLead?.name || "",
					email: businessSettings?.technicalLead?.email || "",
					phone: businessSettings?.technicalLead?.phone || "",
				},
				supportContact: {
					email: businessSettings?.supportContact?.email || "",
					phone: businessSettings?.supportContact?.phone || "",
				},
				currency: data.currency.toUpperCase(),
				timeZone: data.timeZone === "lagos" ? "Africa/Lagos" : data.timeZone,
				primaryLanguage: data.primaryLanguage,
			});

			if (res.success) {
				toast.success(res.message);
				refetch().catch(() => undefined);
			} else {
				toast.error(res.message);
			}
		} catch (error: unknown) {
			toast.error(
				error instanceof Error ? error.message : "Failed to update business settings.",
			);
		}
	};

	if (isLoading) {
		return (
			<div className="flex h-64 items-center justify-center">
				<div className="size-8 animate-spin rounded-full border-4 border-[#1d4ea8] border-t-transparent" />
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 text-gray-800">
			{/* Section: Company Logo & Colors */}
			<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
				<h3 className="mb-8 text-[15px] font-bold text-gray-800">Company Logo & Colors</h3>
				<div className="flex flex-wrap items-end gap-12">
					<div className="space-y-4">
						<Label className="text-[14px] font-medium text-gray-600">Upload Logo</Label>
						<div className="flex items-center gap-4">
							<div className="relative flex h-[88px] w-[176px] items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/30">
								{logoUrl ? (
									<Image
										src={logoUrl}
										alt="Business Logo"
										fill
										className="object-contain p-2"
									/>
								) : (
									<Icon
										icon="solar:gallery-bold-duotone"
										className="size-10 text-gray-200"
									/>
								)}
							</div>
							<input
								type="file"
								id="company-logo-upload"
								onChange={handleLogoUpload}
								accept="image/*"
								className="sr-only"
								aria-label="Upload Company Logo"
							/>
							<label
								htmlFor="company-logo-upload"
								className="flex size-11 cursor-pointer items-center justify-center rounded-xl border border-gray-100 text-[#1d4ea8] transition-all hover:bg-gray-50 active:scale-95"
							>
								<Icon icon="lucide:edit-3" className="size-5" />
							</label>
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
									{...register("color1")}
									className="h-12 w-48 rounded-xl border-gray-100 bg-gray-50/20 pl-8 focus:border-[#1d4ea8] focus:ring-0"
								/>
							</div>
							<div className="relative">
								<span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#1d4ea8]">
									#
								</span>
								<Input
									placeholder="Color code 2"
									{...register("color2")}
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
						<Label className="text-[14px] font-medium text-gray-600">
							Business Name
						</Label>
						<Input
							{...register("name")}
							className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 focus:border-[#1d4ea8] focus:ring-0"
						/>
					</div>
					<div className="space-y-2">
						<Label className="text-[14px] font-medium text-gray-600">Legal Name</Label>
						<Input
							{...register("legalName")}
							className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 focus:border-[#1d4ea8] focus:ring-0"
						/>
					</div>
					<div className="space-y-2">
						<Label className="text-[14px] font-medium text-gray-600">Tax ID</Label>
						<Input
							{...register("taxId")}
							className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 focus:border-[#1d4ea8] focus:ring-0"
						/>
					</div>
					<div className="space-y-2 md:col-span-3">
						<Label className="text-[14px] font-medium text-gray-600">
							Primary Headquarters address
						</Label>
						<Input
							{...register("hqAddress")}
							className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 focus:border-[#1d4ea8] focus:ring-0"
						/>
					</div>
				</div>
			</div>

			{/* Section: Key Contacts Directory & Corporate Documents */}
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				{/* Key Contacts */}
				<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
					<h3 className="mb-8 text-[15px] font-bold text-gray-800">Key Contacts</h3>
					<div className="space-y-6">
						{/* Admin */}
						<div className="flex items-start gap-4 rounded-2xl bg-gray-50/50 p-4 transition-all hover:bg-gray-50">
							<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1d4ea8]">
								<Icon icon="solar:user-bold-duotone" className="size-5" />
							</div>
							<div className="space-y-1">
								<span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#1d4ea8]">
									Business Admin
								</span>
								<h4 className="text-[14px] font-bold text-gray-800">
									{businessSettings?.teamMembers?.admins?.[0]?.name || "-"}
								</h4>
								<p className="text-xs text-gray-500">
									{businessSettings?.teamMembers?.admins?.[0]?.email || "-"}
								</p>
								<p className="text-[11px] font-medium text-gray-400">
									{businessSettings?.teamMembers?.admins?.[0]?.phone || "-"}
								</p>
							</div>
						</div>

						{/* Supervisor */}
						<div className="flex items-start gap-4 rounded-2xl bg-gray-50/50 p-4 transition-all hover:bg-gray-50">
							<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
								<Icon icon="solar:shield-user-bold-duotone" className="size-5" />
							</div>
							<div className="space-y-1">
								<span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-600">
									First Supervisor
								</span>
								<h4 className="text-[14px] font-bold text-gray-800">
									{businessSettings?.teamMembers?.supervisors?.[0]?.name || "-"}
								</h4>
								<p className="text-xs text-gray-500">
									{businessSettings?.teamMembers?.supervisors?.[0]?.email || "-"}
								</p>
								<p className="text-[11px] font-medium text-gray-400">
									{businessSettings?.teamMembers?.supervisors?.[0]?.phone || "-"}
								</p>
							</div>
						</div>

						{/* Staff */}
						<div className="flex items-start gap-4 rounded-2xl bg-gray-50/50 p-4 transition-all hover:bg-gray-50">
							<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
								<Icon
									icon="solar:users-group-rounded-bold-duotone"
									className="size-5"
								/>
							</div>
							<div className="space-y-1">
								<span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-600">
									{businessSettings?.teamMembers?.staffs?.[0]?.position ||
										"Staff"}
								</span>
								<h4 className="text-[14px] font-bold text-gray-800">
									{businessSettings?.teamMembers?.staffs?.[0]?.name || "-"}
								</h4>
								<p className="text-xs text-gray-500">
									{businessSettings?.teamMembers?.staffs?.[0]?.email || "-"}
								</p>
								<p className="text-[11px] font-medium text-gray-400">
									{businessSettings?.teamMembers?.staffs?.[0]?.phone || "-"}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Corporate Verification & Documents */}
				<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
					<div className="mb-8 flex items-center justify-between">
						<h3 className="text-[15px] font-bold text-gray-800">KYC Verification</h3>
						<div
							className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ${
								businessSettings?.isVerified
									? "bg-green-50 text-green-600"
									: "bg-amber-50 text-amber-600"
							}`}
						>
							<span
								className={`size-1.5 rounded-full ${
									businessSettings?.isVerified ? "bg-green-500" : "bg-amber-500"
								}`}
							/>
							{businessSettings?.isVerified
								? "Approved & Verified"
								: "Pending Verification"}
						</div>
					</div>

					<div className="space-y-4">
						{/* CAC Registration Certificate */}
						<div className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 transition-all hover:bg-gray-50/30">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-red-50 text-red-500">
									<Icon icon="solar:document-bold" className="size-5" />
								</div>
								<div className="flex flex-col">
									<span className="text-[13px] font-bold text-gray-800">
										CAC Certificate
									</span>
									<span className="text-[10px] font-medium text-gray-400">
										{getFileName(cacUrl, "CAC-REG-CERT.pdf")}
									</span>
								</div>
							</div>
							<button
								type="button"
								onClick={() => handleDownload(cacUrl)}
								disabled={!cacUrl}
								className={`transition-colors ${
									cacUrl
										? "text-gray-400 hover:text-[#1d4ea8]"
										: "cursor-not-allowed text-gray-200"
								}`}
							>
								<Icon icon="solar:download-bold" className="size-5" />
							</button>
						</div>

						{/* Tax ID Certificate */}
						<div className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 transition-all hover:bg-gray-50/30">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-[#1d4ea8]">
									<Icon icon="solar:document-text-bold" className="size-5" />
								</div>
								<div className="flex flex-col">
									<span className="text-[13px] font-bold text-gray-800">
										Tax ID Certificate
									</span>
									<span className="text-[10px] font-medium text-gray-400">
										{getFileName(taxUrl, "TIN-REG-CERT.pdf")}
									</span>
								</div>
							</div>
							<button
								type="button"
								onClick={() => handleDownload(taxUrl)}
								disabled={!taxUrl}
								className={`transition-colors ${
									taxUrl
										? "text-gray-400 hover:text-[#1d4ea8]"
										: "cursor-not-allowed text-gray-200"
								}`}
							>
								<Icon icon="solar:download-bold" className="size-5" />
							</button>
						</div>

						{/* Proof of Address */}
						<div className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 transition-all hover:bg-gray-50/30">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
									<Icon icon="solar:bill-list-bold" className="size-5" />
								</div>
								<div className="flex flex-col">
									<span className="text-[13px] font-bold text-gray-800">
										Proof of Address
									</span>
									<span className="text-[10px] font-medium text-gray-400">
										{getFileName(utilityUrl, "UTILITY-BILL.pdf")}
									</span>
								</div>
							</div>
							<button
								type="button"
								onClick={() => handleDownload(utilityUrl)}
								disabled={!utilityUrl}
								className={`transition-colors ${
									utilityUrl
										? "text-gray-400 hover:text-[#1d4ea8]"
										: "cursor-not-allowed text-gray-200"
								}`}
							>
								<Icon icon="solar:download-bold" className="size-5" />
							</button>
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
						<Controller
							name="currency"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[14px] font-bold text-gray-800 transition-all hover:bg-gray-50 focus:ring-0">
										<SelectValue placeholder="(₦)" />
									</SelectTrigger>
									<SelectContent className="rounded-xl border-gray-100">
										<SelectItem value="ngn">(₦) Nigerian Naira</SelectItem>
										<SelectItem value="usd">($) US Dollar</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div className="space-y-2">
						<Label className="text-[14px] font-medium text-gray-600">Time-zone</Label>
						<Controller
							name="timeZone"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[14px] font-bold text-gray-800 transition-all hover:bg-gray-50 focus:ring-0">
										<SelectValue placeholder="Time Zone" />
									</SelectTrigger>
									<SelectContent className="rounded-xl border-gray-100">
										<SelectItem value="lagos">Africa/Lagos (GMT+1)</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div className="space-y-2">
						<Label className="text-[14px] font-medium text-gray-600">
							Primary operating language
						</Label>
						<Controller
							name="primaryLanguage"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[14px] font-bold text-gray-800 transition-all hover:bg-gray-50 focus:ring-0">
										<SelectValue placeholder="English" />
									</SelectTrigger>
									<SelectContent className="rounded-xl border-gray-100">
										<SelectItem value="en">English</SelectItem>
										<SelectItem value="fr">French</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
				</div>
			</div>

			{/* Save Button */}
			<div className="flex justify-end">
				<Button
					type="submit"
					disabled={updateSettingsMutation.isPending}
					className="h-12 rounded-xl bg-[#1d4ea8] px-8 text-[15px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-95 disabled:opacity-50"
				>
					{updateSettingsMutation.isPending ? "Saving..." : "Save Identity Changes"}
				</Button>
			</div>
		</form>
	);
}
