"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminIdentitySchema, type AdminIdentityFormData } from "@/schemas/auth";
import { useRegisterAdmin } from "@/hooks/useAuth";
import { authRequests } from "@/lib/requests/auth";
import { businessRequests } from "@/lib/requests/business";
import { profileRequests } from "@/lib/requests/profile";
import { toast } from "sonner";
import StepProgressBar from "../Shared/StepProgressBar";

export default function IdentitySetup({
	onNext,
	onSkipToStep,
	initialValues,
	step,
	totalSteps,
}: {
	onNext: (data: AdminIdentityFormData) => void;
	onSkipToStep: (targetStep: number) => void;
	initialValues: {
		firstName?: string;
		lastName?: string;
		email?: string;
		phoneNumber?: string;
		password?: string;
		confirmPassword?: string;
	};
	step: number;
	totalSteps: number;
}) {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const registerAdminMutation = useRegisterAdmin();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AdminIdentityFormData>({
		resolver: zodResolver(adminIdentitySchema),
		defaultValues: {
			firstName: initialValues.firstName || "",
			lastName: initialValues.lastName || "",
			email: initialValues.email || "",
			phoneNumber: initialValues.phoneNumber || "",
			password: initialValues.password || "",
			confirmPassword: initialValues.confirmPassword || "",
		},
	});

	const onSubmit = async (data: AdminIdentityFormData) => {
		try {
			type CheckEmailResponse = {
				success: boolean;
				exists: boolean;
				isVerified: boolean;
				role: string | null;
			};
			type LoginResponse = {
				success: boolean;
				message: string;
				token?: string;
				user?: any;
				otpSent?: boolean;
				data?: {
					token?: string;
					user?: any;
					otpSent?: boolean;
				};
			};

			// 1. Check if email is already verified or registered
			const emailCheck = (await authRequests.checkEmail(
				data.email,
			)) as unknown as CheckEmailResponse;
			if (emailCheck.success && emailCheck.exists) {
				if (emailCheck.role === "admin") {
					if (emailCheck.isVerified) {
						// Automatically log them in using password to bypass OTP
						try {
							const loginRes = (await authRequests.login({
								email: data.email,
								password: data.password,
							})) as unknown as LoginResponse;
							const token = loginRes.token || loginRes.data?.token;
							if (loginRes.success && token) {
								toast.success("Email already verified. Resuming your setup.");
								if (typeof window !== "undefined") {
									localStorage.setItem("token", token);
									localStorage.setItem("register_email", data.email);
								}

								let targetStep = 3;
								try {
									const profileRes = await profileRequests.getMe();
									const business = profileRes?.data?.business;
									if (business) {
										const settingsRes = await businessRequests.getSettings();
										const settings = settingsRes?.data;
										if (settings) {
											type OnboardingBusinessData = {
												corporateDocuments?: {
													cacCertificate?: string | null;
													taxIdCertificate?: string | null;
													utilityBill?: string | null;
												} | null;
												fincraAccountNumber?: string | null;
												subscriptionStatus?: string | null;
												hasBankDetails?: boolean;
											};
											const settingsObj =
												settings as unknown as OnboardingBusinessData;
											const docs = settingsObj.corporateDocuments || {};
											const hasOwnerId =
												!!profileRes?.data?.kycDocuments?.idFront;

											if (!hasOwnerId) {
												targetStep = 3;
											} else if (
												!docs.cacCertificate ||
												!docs.taxIdCertificate ||
												!docs.utilityBill
											) {
												targetStep = 4;
											} else if (
												!settingsObj.fincraAccountNumber &&
												!settingsObj.hasBankDetails
											) {
												targetStep = 5;
											} else if (
												settingsObj.subscriptionStatus !== "active"
											) {
												targetStep = 6;
											} else {
												targetStep = 7;
											}
										}
									}
								} catch (err) {
									console.error("Failed to determine continuation step:", err);
								}

								// Save data to parent state & skip OTP straight to detected step
								onNext(data);
								onSkipToStep(targetStep);
								return;
							}
							toast.error(
								"Incorrect password for this registered email. Please enter the correct password to resume setup.",
							);
							return;
						} catch (loginErr) {
							toast.error(
								"Incorrect password for this registered email. Please enter the correct password to resume setup.",
							);
							return;
						}
					}
					// Email is registered but NOT verified yet. Send OTP and redirect to step 2
					try {
						await authRequests.resendOtp({ email: data.email });
						toast.success(
							"Registration pending email verification. Resending verification code.",
						);
						if (typeof window !== "undefined") {
							localStorage.setItem("register_email", data.email);
						}
						onNext(data);
						onSkipToStep(2);
						return;
					} catch (resendErr) {
						toast.error("Verification code could not be sent. Please try again.");
						return;
					}
				}
			}

			// 2. Standard registration flow
			const res = await registerAdminMutation.mutateAsync({
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				password: data.password,
				phone: data.phoneNumber,
			});

			if (res.success) {
				toast.success(res.message);
				if (typeof window !== "undefined") {
					localStorage.setItem("register_email", data.email);
				}
				onNext(data);
			} else {
				toast.error(res.message);
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "Admin registration failed.");
		}
	};

	return (
		<div className="flex w-full flex-col items-center justify-center">
			<StepProgressBar currentStep={step} totalSteps={totalSteps} title="Identity Setup" />

			<form className="mt-4 w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
				{/* Name Row */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="firstName" className="text-darkBlue-900">
							First Name
						</Label>
						<Input
							id="firstName"
							placeholder="Enter here"
							{...register("firstName")}
							className="h-12 border-gray-300 bg-gray-50 text-gray-900 focus-visible:ring-yellow-500"
						/>
						{errors.firstName && (
							<p className="text-xs font-medium text-red-500">
								{errors.firstName.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="lastName" className="text-darkBlue-900">
							Last Name
						</Label>
						<Input
							id="lastName"
							placeholder="Enter here"
							{...register("lastName")}
							className="h-12 border-gray-300 bg-gray-50 text-gray-900 focus-visible:ring-yellow-500"
						/>
						{errors.lastName && (
							<p className="text-xs font-medium text-red-500">
								{errors.lastName.message}
							</p>
						)}
					</div>
				</div>

				{/* Contact Row */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="workEmail" className="text-darkBlue-900">
							Work Email
						</Label>
						<Input
							id="workEmail"
							type="email"
							placeholder="Enter here"
							{...register("email")}
							className="h-12 border-gray-300 bg-gray-50 text-gray-900 focus-visible:ring-yellow-500"
						/>
						{errors.email && (
							<p className="text-xs font-medium text-red-500">
								{errors.email.message}
							</p>
						)}
					</div>
					<div className="relative space-y-2">
						<Label htmlFor="phone" className="text-darkBlue-900">
							Phone Number
						</Label>
						<div className="relative">
							<Input
								id="phone"
								type="tel"
								placeholder="Enter here"
								{...register("phoneNumber")}
								className="h-12 border-gray-300 bg-gray-50 text-gray-900 focus-visible:ring-yellow-500"
							/>
						</div>
						{errors.phoneNumber && (
							<p className="text-xs font-medium text-red-500">
								{errors.phoneNumber.message}
							</p>
						)}
					</div>
				</div>

				<div className="my-8">
					<h3 className="text-darkBlue-900 mb-4 text-lg font-semibold">Security</h3>
					{/* Password Row */}
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div className="relative space-y-2">
							<Label htmlFor="password" className="text-darkBlue-900 invisible">
								Create password
							</Label>
							<div className="text-darkBlue-900 absolute left-0 top-0 text-sm font-medium">
								Create password
							</div>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="PASSWORD"
									{...register("password")}
									className="h-12 border-gray-300 bg-gray-50 font-medium tracking-widest text-gray-900 placeholder:font-normal placeholder:tracking-normal focus-visible:ring-yellow-500"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
									aria-label="Toggle password visibility"
								>
									<Icon
										icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
										className="size-5"
									/>
								</button>
							</div>
							{errors.password && (
								<p className="text-xs font-medium text-red-500">
									{errors.password.message}
								</p>
							)}
						</div>
						<div className="relative space-y-2">
							<Label
								htmlFor="confirmPassword"
								className="text-darkBlue-900 invisible"
							>
								Confirm password
							</Label>
							<div className="text-darkBlue-900 absolute left-0 top-0 text-sm font-medium">
								Confirm password
							</div>
							<div className="relative">
								<Input
									id="confirmPassword"
									type={showConfirmPassword ? "text" : "password"}
									placeholder="CONFIRM PASSWORD"
									{...register("confirmPassword")}
									className={`h-12 border-gray-300 bg-gray-50 font-medium tracking-widest text-gray-900 placeholder:font-normal placeholder:tracking-normal focus-visible:ring-yellow-500 ${errors.confirmPassword ? "border-red-500" : "border-green-500/50 bg-green-50/20"}`}
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
									aria-label="Toggle confirm password visibility"
								>
									{errors.confirmPassword ? (
										<Icon
											icon="lucide:alert-circle"
											className="size-5 text-red-500"
										/>
									) : (
										<Icon
											icon="lucide:check-circle-2"
											className="size-5 text-green-500"
										/>
									)}
								</button>
							</div>
							{errors.confirmPassword && (
								<p className="text-xs font-medium text-red-500">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Action */}
				<div className="pt-4">
					<Button
						type="submit"
						disabled={registerAdminMutation.isPending}
						className="text-md h-12 w-full bg-blue-500 font-sans font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
					>
						{registerAdminMutation.isPending ? "Registering..." : "Next"}
					</Button>
				</div>
			</form>
		</div>
	);
}
