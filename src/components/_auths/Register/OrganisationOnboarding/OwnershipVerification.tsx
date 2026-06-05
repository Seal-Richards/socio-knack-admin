"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useUploadOwnerId } from "@/hooks/useBusiness";
import { toast } from "sonner";
import StepProgressBar from "../Shared/StepProgressBar";

export default function OwnershipVerification({
	onNext,
	onPrev,
	initialValues,
	step = 3,
	totalSteps = 6,
}: {
	onNext: (data: { ownerIdDocName: string }) => void;
	onPrev?: () => void;
	initialValues: {
		ownerIdDocName?: string;
	};
	step?: number;
	totalSteps?: number;
}) {
	const [fileName, setFileName] = useState(initialValues.ownerIdDocName || "");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const uploadOwnerIdMutation = useUploadOwnerId();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFileName(file.name);
			setSelectedFile(file);
		}
	};

	const handleNext = async () => {
		if (!fileName) {
			toast.error("Please upload a government-issued ID to continue.");
			return;
		}

		if (selectedFile) {
			const formData = new FormData();
			formData.append("idDocument", selectedFile);
			formData.append("idType", "Government-issued ID");
			formData.append("idNumber", "N/A");

			try {
				const res = await uploadOwnerIdMutation.mutateAsync(formData);
				if (res.success) {
					toast.success("ID document uploaded successfully!");
					onNext({ ownerIdDocName: fileName });
				} else {
					toast.error(res.message);
				}
			} catch (error: unknown) {
				toast.error(
					error instanceof Error ? error.message : "Failed to upload ID document.",
				);
			}
		} else {
			// File was already uploaded in a previous attempt, proceed
			onNext({ ownerIdDocName: fileName });
		}
	};

	return (
		<div className="w-full">
			<button
				onClick={onPrev}
				className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-colors hover:bg-blue-100"
				aria-label="Go back"
			>
				<Icon icon="lucide:arrow-left" className="size-5" />
			</button>

			<StepProgressBar
				currentStep={step}
				totalSteps={totalSteps}
				title="Ownership Verification"
			/>

			<div className="space-y-6">
				<div className="relative space-y-2">
					<Label className="text-sm font-semibold text-gray-700">
						Government-issued ID Upload
					</Label>
					<p className="mb-2 text-xs text-gray-500">
						Upload Document (Passport / National ID / Driver&apos;s License)
					</p>

					<div className="relative flex items-center">
						<input
							type="text"
							aria-label="Upload Document Name"
							value={fileName}
							placeholder="Upload"
							readOnly
							className="flex h-12 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 pr-24 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
						/>
						<label className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
							<span className="rounded-full bg-green-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-green-700">
								UPLOAD
							</span>
							<input
								type="file"
								aria-label="Upload Document File"
								className="hidden"
								onChange={handleFileChange}
								accept=".png,.jpeg,.jpg,.pdf"
							/>
						</label>
					</div>
				</div>

				<Button
					onClick={handleNext}
					disabled={uploadOwnerIdMutation.isPending}
					className="text-md mt-8 h-12 w-full bg-yellow-500 font-sans font-semibold text-white hover:bg-yellow-600 disabled:opacity-50"
				>
					{uploadOwnerIdMutation.isPending ? "Uploading..." : "Next"}
				</Button>
			</div>
		</div>
	);
}
