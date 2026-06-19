"use client";

import { useEffect } from "react";
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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	supervisorPersonalSetupSchema,
	type SupervisorPersonalSetupFormData,
} from "@/schemas/auth";
import { useNigeriaData } from "@/hooks/useProfile";
import StepProgressBar from "../Shared/StepProgressBar";

export default function PersonalSetup({
	onNext,
	onPrev,
	step = 1,
	totalSteps = 3,
	prefilledEmail = "",
	initialValues,
}: {
	onNext: (data: SupervisorPersonalSetupFormData) => void;
	onPrev?: () => void;
	step?: number;
	totalSteps?: number;
	prefilledEmail?: string;
	initialValues?: Partial<SupervisorPersonalSetupFormData>;
}) {
	const { data: nigeriaDataRes } = useNigeriaData();
	const NIGERIA_STATES_AND_CITIES = nigeriaDataRes?.data || {};

	const getGenderValue = (val?: string) => {
		if (!val) return "";
		const lower = val.toLowerCase();
		if (lower === "male") return "Male";
		if (lower === "female") return "Female";
		if (lower === "other") return "Other";
		return val;
	};

	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors },
	} = useForm<SupervisorPersonalSetupFormData>({
		resolver: zodResolver(supervisorPersonalSetupSchema),
		defaultValues: {
			firstName: initialValues?.firstName || "",
			lastName: initialValues?.lastName || "",
			email: initialValues?.email || prefilledEmail || "",
			phone: initialValues?.phone || "",
			dob: initialValues?.dob || "",
			gender: getGenderValue(initialValues?.gender),
			city: initialValues?.city || "",
			state: initialValues?.state || "",
			country: initialValues?.country || "Nigeria",
		},
	});

	const selectedState = watch("state");

	// Sync prefilled email when it loads
	useEffect(() => {
		if (prefilledEmail) {
			setValue("email", prefilledEmail);
		}
	}, [prefilledEmail, setValue]);

	// Reset city when state changes
	useEffect(() => {
		if (selectedState) {
			setValue("city", "");
		}
	}, [selectedState, setValue]);

	const onSubmit = (data: SupervisorPersonalSetupFormData) => {
		onNext(data);
	};

	return (
		<div className="relative w-full text-gray-800">
			<button
				aria-label="Back to previous step"
				onClick={onPrev}
				type="button"
				className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-colors hover:bg-blue-100"
			>
				<Icon icon="lucide:arrow-left" className="size-5" />
			</button>

			<StepProgressBar currentStep={step} totalSteps={totalSteps} title="Personal Info" />

			<form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
							First Name
						</Label>
						<Input
							id="firstName"
							placeholder="Enter here"
							{...register("firstName")}
							className="h-12 border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-yellow-500"
						/>
						{errors.firstName && (
							<p className="text-xs font-medium text-red-500">
								{errors.firstName.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
							Last Name
						</Label>
						<Input
							id="lastName"
							placeholder="Enter here"
							{...register("lastName")}
							className="h-12 border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-yellow-500"
						/>
						{errors.lastName && (
							<p className="text-xs font-medium text-red-500">
								{errors.lastName.message}
							</p>
						)}
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="email" className="text-sm font-semibold text-gray-700">
							Work Email
						</Label>
						<Input
							id="email"
							type="email"
							placeholder="Enter here"
							{...register("email")}
							disabled
							className="h-12 cursor-not-allowed border-gray-200 bg-gray-100 text-gray-500"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
							Phone Number
						</Label>
						<Input
							id="phone"
							type="tel"
							placeholder="Enter here"
							{...register("phone")}
							className="h-12 border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-yellow-500"
						/>
						{errors.phone && (
							<p className="text-xs font-medium text-red-500">
								{errors.phone.message}
							</p>
						)}
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="dob" className="text-sm font-semibold text-gray-700">
							Date of Birth
						</Label>
						<Input
							id="dob"
							type="date"
							{...register("dob")}
							className="h-12 border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-yellow-500"
						/>
						{errors.dob && (
							<p className="text-xs font-medium text-red-500">{errors.dob.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="gender" className="text-sm font-semibold text-gray-700">
							Gender
						</Label>
						<Controller
							name="gender"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value || ""}>
									<SelectTrigger
										id="gender"
										className="h-12 border-gray-200 bg-gray-50 text-gray-900 focus:ring-yellow-500"
									>
										<SelectValue placeholder="Select gender" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Male">Male</SelectItem>
										<SelectItem value="Female">Female</SelectItem>
										<SelectItem value="Other">Other</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.gender && (
							<p className="text-xs font-medium text-red-500">
								{errors.gender.message}
							</p>
						)}
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 pb-2 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="state" className="text-sm font-semibold text-gray-700">
							State
						</Label>
						<Controller
							name="state"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value || ""}>
									<SelectTrigger
										id="state"
										className="h-12 border-gray-200 bg-gray-50 text-gray-900 focus:ring-yellow-500"
									>
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
							)}
						/>
						{errors.state && (
							<p className="text-xs font-medium text-red-500">
								{errors.state.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="city" className="text-sm font-semibold text-gray-700">
							City
						</Label>
						<Controller
							name="city"
							control={control}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									value={field.value || ""}
									disabled={!selectedState}
								>
									<SelectTrigger
										id="city"
										className="h-12 border-gray-200 bg-gray-50 text-gray-900 focus:ring-yellow-500"
									>
										<SelectValue placeholder="Select city" />
									</SelectTrigger>
									<SelectContent>
										{(NIGERIA_STATES_AND_CITIES[selectedState || ""] || []).map(
											(ct) => (
												<SelectItem key={ct} value={ct}>
													{ct}
												</SelectItem>
											),
										)}
									</SelectContent>
								</Select>
							)}
						/>
						{errors.city && (
							<p className="text-xs font-medium text-red-500">
								{errors.city.message}
							</p>
						)}
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="country" className="text-sm font-semibold text-gray-700">
						Country
					</Label>
					<Controller
						name="country"
						control={control}
						render={({ field }) => (
							<Select
								onValueChange={field.onChange}
								value={field.value || ""}
								disabled
							>
								<SelectTrigger
									id="country"
									className="h-12 cursor-not-allowed border-gray-200 bg-gray-100 text-gray-500"
								>
									<SelectValue placeholder="Select country" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Nigeria">Nigeria</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>
					{errors.country && (
						<p className="text-xs font-medium text-red-500">{errors.country.message}</p>
					)}
				</div>

				<Button
					type="submit"
					className="text-md mt-8 h-12 w-full bg-yellow-500 font-sans font-semibold text-white hover:bg-yellow-600"
				>
					Next
				</Button>
			</form>
		</div>
	);
}
