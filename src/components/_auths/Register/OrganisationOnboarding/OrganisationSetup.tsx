"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
import { useSetupBusiness, useUploadBusinessKyc } from "@/hooks/useBusiness";
import { useNigeriaData } from "@/hooks/useProfile";
import { toast } from "@/lib/toast";
import StepProgressBar from "../Shared/StepProgressBar";

type OrganisationSetupProps = {
	onNext: (data: {
		orgName: string;
		orgDomain: string;
		orgCountry: string;
		orgState: string;
		orgCity: string;
		orgCurrency: string;
		orgTimeZone: string;
		orgRegulatoryRegion: string;
		cacCertificateName: string;
		taxIdCertificateName: string;
		utilityBillName: string;
	}) => void;
	onPrev?: () => void;
	initialValues: {
		orgName?: string;
		orgDomain?: string;
		orgCountry?: string;
		orgState?: string;
		orgCity?: string;
		orgCurrency?: string;
		orgTimeZone?: string;
		orgRegulatoryRegion?: string;
		cacCertificateName?: string;
		taxIdCertificateName?: string;
		utilityBillName?: string;
	};
	step?: number;
	totalSteps?: number;
};

export default function OrganisationSetup({
	onNext,
	onPrev,
	initialValues,
	step = 4,
	totalSteps = 6,
}: OrganisationSetupProps) {
	const { data: nigeriaDataRes } = useNigeriaData();
	const NIGERIA_STATES_AND_CITIES = nigeriaDataRes?.data || {};

	const [orgName, setOrgName] = useState(initialValues.orgName || "");
	const [orgDomain, setOrgDomain] = useState(initialValues.orgDomain || "");
	const [orgCountry, setOrgCountry] = useState("NG");
	const [orgState, setOrgState] = useState(initialValues.orgState || "");
	const [orgCity, setOrgCity] = useState(initialValues.orgCity || "");
	const [orgCurrency] = useState("NGN");
	const [orgTimeZone, setOrgTimeZone] = useState("WAT");
	const [orgRegulatoryRegion, setOrgRegulatoryRegion] = useState("Africa");

	// Document uploads
	const [cacName, setCacName] = useState(initialValues.cacCertificateName || "");
	const [cacFile, setCacFile] = useState<File | null>(null);

	const [taxIdName, setTaxIdName] = useState(initialValues.taxIdCertificateName || "");
	const [taxIdFile, setTaxIdFile] = useState<File | null>(null);

	const [utilityName, setUtilityName] = useState(initialValues.utilityBillName || "");
	const [utilityFile, setUtilityFile] = useState<File | null>(null);

	const setupBusinessMutation = useSetupBusiness();
	const uploadKycMutation = useUploadBusinessKyc();

	const handleCacChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setCacName(file.name);
			setCacFile(file);
		}
	};

	const handleTaxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setTaxIdName(file.name);
			setTaxIdFile(file);
		}
	};

	const handleUtilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setUtilityName(file.name);
			setUtilityFile(file);
		}
	};

	const handleStateChange = (val: string) => {
		setOrgState(val);
		setOrgCity(""); // Reset city when state changes
	};

	const handleNext = async () => {
		if (!orgName.trim()) {
			toast.error("Please enter platform organization name.");
			return;
		}

		if (!orgState) {
			toast.error("Please select state of operation.");
			return;
		}

		if (!orgCity) {
			toast.error("Please select city of operation.");
			return;
		}

		if (!cacName) {
			toast.error("Please upload CAC Certificate.");
			return;
		}

		if (!taxIdName) {
			toast.error("Please upload Tax ID Certificate.");
			return;
		}

		if (!utilityName) {
			toast.error("Please upload Proof of Address (Utility Bill).");
			return;
		}

		const isPending = setupBusinessMutation.isPending || uploadKycMutation.isPending;
		if (isPending) return;

		try {
			// 1. Setup business metadata
			const setupRes = await setupBusinessMutation.mutateAsync({
				name: orgName,
				domain: orgDomain,
				country: orgCountry,
				state: orgState,
				city: orgCity,
				currency: orgCurrency,
				timeZone: orgTimeZone,
				regulatoryRegion: orgRegulatoryRegion,
			});

			if (!setupRes.success) {
				toast.error(setupRes.message || "Failed to update business details.");
				return;
			}

			// 2. Upload documents if selected
			const hasFiles = !!cacFile || !!taxIdFile || !!utilityFile;
			if (hasFiles) {
				const formData = new FormData();
				if (cacFile) formData.append("cacCertificate", cacFile);
				if (taxIdFile) formData.append("taxIdCertificate", taxIdFile);
				if (utilityFile) formData.append("utilityBill", utilityFile);

				const kycRes = await uploadKycMutation.mutateAsync(formData);
				if (!kycRes.success) {
					toast.error(kycRes.message || "Failed to upload business documents.");
					return;
				}
			}

			toast.success("Business details and KYC uploaded successfully.");
			onNext({
				orgName,
				orgDomain,
				orgCountry,
				orgState,
				orgCity,
				orgCurrency,
				orgTimeZone,
				orgRegulatoryRegion,
				cacCertificateName: cacName,
				taxIdCertificateName: taxIdName,
				utilityBillName: utilityName,
			});
		} catch (error: unknown) {
			toast.error(
				error instanceof Error
					? error.message
					: "An error occurred during organization setup.",
			);
		}
	};

	const isMutating = setupBusinessMutation.isPending || uploadKycMutation.isPending;

	return (
		<div className="relative w-full">
			<button
				onClick={onPrev}
				disabled={isMutating}
				className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-colors hover:bg-blue-100 disabled:opacity-50"
				aria-label="Go back"
			>
				<Icon icon="lucide:arrow-left" className="size-5" />
			</button>

			<StepProgressBar
				currentStep={step}
				totalSteps={totalSteps}
				title="Organization Setup"
			/>

			<div className="mt-6 space-y-4">
				<div className="space-y-2">
					<Label className="text-sm font-semibold text-gray-700">
						Platform organization name
					</Label>
					<Input
						placeholder="Enter here"
						value={orgName}
						onChange={(e) => setOrgName(e.target.value)}
						disabled={isMutating}
						className="h-12 border-gray-200 bg-gray-50"
					/>
				</div>

				<div className="space-y-2">
					<Label className="text-sm font-semibold text-gray-700">Platform domain</Label>
					<Input
						placeholder="Enter here"
						value={orgDomain}
						onChange={(e) => setOrgDomain(e.target.value)}
						disabled={isMutating}
						className="h-12 border-gray-200 bg-gray-50"
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">
							Country of Operation
						</Label>
						<Select value={orgCountry} onValueChange={setOrgCountry} disabled>
							<SelectTrigger className="h-12 cursor-not-allowed border-gray-200 bg-gray-100 text-gray-500">
								<SelectValue placeholder="Default" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="NG">Nigeria</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">
							State of Operation
						</Label>
						<Select
							value={orgState}
							onValueChange={handleStateChange}
							disabled={isMutating}
						>
							<SelectTrigger className="h-12 border-gray-200 bg-gray-50">
								<SelectValue placeholder="Select state" />
							</SelectTrigger>
							<SelectContent>
								{Object.keys(NIGERIA_STATES_AND_CITIES).map((st) => (
									<SelectItem key={st} value={st}>
										{st}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">
							City of Operation
						</Label>
						<Select
							value={orgCity}
							onValueChange={setOrgCity}
							disabled={isMutating || !orgState}
						>
							<SelectTrigger className="h-12 border-gray-200 bg-gray-50">
								<SelectValue placeholder="Select city" />
							</SelectTrigger>
							<SelectContent>
								{(NIGERIA_STATES_AND_CITIES[orgState] || []).map((ct) => (
									<SelectItem key={ct} value={ct}>
										{ct}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">Time Zone</Label>
						<Select value={orgTimeZone} onValueChange={setOrgTimeZone} disabled>
							<SelectTrigger className="h-12 cursor-not-allowed border-gray-200 bg-gray-100 text-gray-500">
								<SelectValue placeholder="WAT" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="WAT">WAT</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">
							Regulatory region
						</Label>
						<Select
							value={orgRegulatoryRegion}
							onValueChange={setOrgRegulatoryRegion}
							disabled
						>
							<SelectTrigger className="h-12 cursor-not-allowed border-gray-200 bg-gray-100 text-gray-500">
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Africa">Africa</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Corporate Document Uploads */}
				<div className="mt-6 space-y-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
					<h3 className="text-sm font-semibold text-gray-800">
						Corporate Documents (KYC)
					</h3>

					{/* CAC Certificate */}
					<div className="space-y-2">
						<Label className="text-xs font-semibold text-gray-700">
							CAC Certificate
						</Label>
						<div className="relative flex items-center">
							<input
								type="text"
								aria-label="CAC Certificate File Name"
								value={cacName}
								placeholder="Upload CAC Certificate (PDF or Image)"
								readOnly
								className="flex h-11 w-full rounded-md border border-gray-200 bg-white px-3 py-2 pr-24 text-xs placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
							/>
							<label className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
								<span className="rounded-full bg-green-600 px-3 py-1.5 text-[10px] font-semibold text-white transition-colors hover:bg-green-700">
									UPLOAD
								</span>
								<input
									type="file"
									aria-label="Upload CAC Certificate File"
									className="hidden"
									onChange={handleCacChange}
									accept=".png,.jpeg,.jpg,.pdf"
									disabled={isMutating}
								/>
							</label>
						</div>
					</div>

					{/* Tax ID Certificate */}
					<div className="space-y-2">
						<Label className="text-xs font-semibold text-gray-700">
							Tax ID Certificate
						</Label>
						<div className="relative flex items-center">
							<input
								type="text"
								aria-label="Tax ID Certificate File Name"
								value={taxIdName}
								placeholder="Upload Tax ID Certificate (PDF or Image)"
								readOnly
								className="flex h-11 w-full rounded-md border border-gray-200 bg-white px-3 py-2 pr-24 text-xs placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
							/>
							<label className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
								<span className="rounded-full bg-green-600 px-3 py-1.5 text-[10px] font-semibold text-white transition-colors hover:bg-green-700">
									UPLOAD
								</span>
								<input
									type="file"
									aria-label="Upload Tax ID Certificate File"
									className="hidden"
									onChange={handleTaxIdChange}
									accept=".png,.jpeg,.jpg,.pdf"
									disabled={isMutating}
								/>
							</label>
						</div>
					</div>

					{/* Utility Bill */}
					<div className="space-y-2">
						<Label className="text-xs font-semibold text-gray-700">
							Proof of Address (Utility Bill)
						</Label>
						<div className="relative flex items-center">
							<input
								type="text"
								aria-label="Utility Bill File Name"
								value={utilityName}
								placeholder="Upload Utility Bill (PDF or Image)"
								readOnly
								className="flex h-11 w-full rounded-md border border-gray-200 bg-white px-3 py-2 pr-24 text-xs placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
							/>
							<label className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
								<span className="rounded-full bg-green-600 px-3 py-1.5 text-[10px] font-semibold text-white transition-colors hover:bg-green-700">
									UPLOAD
								</span>
								<input
									type="file"
									aria-label="Upload Utility Bill File"
									className="hidden"
									onChange={handleUtilityChange}
									accept=".png,.jpeg,.jpg,.pdf"
									disabled={isMutating}
								/>
							</label>
						</div>
					</div>
				</div>

				<Button
					onClick={handleNext}
					disabled={isMutating}
					className="text-md mt-8 h-12 w-full bg-yellow-500 font-sans font-semibold text-white hover:bg-yellow-600 disabled:opacity-50"
				>
					{isMutating ? "Processing..." : "Next"}
				</Button>
			</div>
		</div>
	);
}
