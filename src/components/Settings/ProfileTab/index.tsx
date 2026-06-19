"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
import { toast } from "@/lib/toast";
import { useGetMe, useUpdateProfile, useChangePassword } from "@/hooks/useProfile";
import {
	profileUpdateSchema,
	type ProfileUpdateFormData,
	changePasswordSchema,
	type ChangePasswordFormData,
} from "@/schemas/profile";
import Modal from "@/components/_modals";
import { NIGERIA_STATES_AND_CITIES } from "@/constants/nigeriaData";

export default function ProfileTab() {
	const { data: session, update: updateSession } = useSession();
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const updateProfileMutation = useUpdateProfile();
	const changePasswordMutation = useChangePassword();

	// Query own profile data via GET /auth/me — works for all roles
	const { data: ownProfileRes, isLoading: isLoadingProfile, refetch } = useGetMe();
	const profileData = ownProfileRes?.data;
	const [hasInitialSynced, setHasInitialSynced] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		reset,
		setValue,
		watch,
		formState: { errors },
	} = useForm<ProfileUpdateFormData>({
		resolver: zodResolver(profileUpdateSchema),
		defaultValues: {
			fullName: "",
			email: "",
			phone: "",
			gender: "",
			dob: "",
			city: "",
			state: "",
			country: "Nigeria",
			avatar: "",
		},
	});

	const selectedState = watch("state");

	const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = () => {
			if (typeof reader.result === "string") {
				setValue("avatar", reader.result);
			}
		};
		reader.readAsDataURL(file);
	};

	function formatGender(gender?: string | null): string {
		if (!gender) return "";

		const lower = gender.toLowerCase();
		if (!["male", "female", "other"].includes(lower)) {
			return "Other";
		}

		return lower.charAt(0).toUpperCase() + lower.slice(1);
	}

	// Sync loaded profile data into form fields
	useEffect(() => {
		if (profileData) {
			reset({
				fullName: `${profileData.firstName || ""} ${profileData.lastName || ""}`.trim(),
				email: profileData.email || "",
				phone: profileData.phone || "",
				gender: formatGender(profileData.gender),
				dob: profileData.dob ? new Date(profileData.dob).toISOString().split("T")[0] : "",
				city: profileData.city || "",
				state: profileData.state || "",
				country: profileData.country || "Nigeria",
				avatar: profileData.avatar || "",
			});
			setHasInitialSynced(true);
		}
	}, [profileData, reset]);
	// Reset city when state changes after initial load (only if it has changed from the initial loaded state)
	useEffect(() => {
		if (hasInitialSynced && selectedState) {
			if (selectedState !== profileData?.state) {
				setValue("city", "");
			}
		}
	}, [selectedState, hasInitialSynced, setValue, profileData?.state]);

	const onProfileSubmit = async (data: ProfileUpdateFormData) => {
		try {
			const res = await updateProfileMutation.mutateAsync({
				fullName: data.fullName,
				phone: data.phone,
				dob: data.dob,
				gender: data.gender,
				city: data.city,
				state: data.state,
				country: data.country,
				avatar: data.avatar,
			});

			if (res.success) {
				toast.success(res.message);
				// Update session name if present
				await updateSession({
					...session,
					user: {
						...session?.user,
						name: data.fullName,
					},
				});
				refetch().catch(() => undefined);
			} else {
				toast.error(res.message);
			}
		} catch (error: unknown) {
			toast.error(
				error instanceof Error ? error.message : "Failed to update profile settings.",
			);
		}
	};

	// Change Password Form
	const {
		register: regPassword,
		handleSubmit: handlePasswordSubmit,
		reset: resetPasswordForm,
		formState: { errors: passErrors },
	} = useForm<ChangePasswordFormData>({
		resolver: zodResolver(changePasswordSchema),
	});

	const onPasswordSubmit = async (data: ChangePasswordFormData) => {
		try {
			const res = await changePasswordMutation.mutateAsync({
				oldPassword: data.oldPassword,
				newPassword: data.newPassword,
			});

			if (res.success) {
				toast.success(res.message);
				setIsPasswordModalOpen(false);
				resetPasswordForm();
			} else {
				toast.error(res.message);
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "Failed to change password.");
		}
	};

	return (
		<div className="flex flex-col gap-8 text-gray-800">
			{/* Section: Profile Settings */}
			<form
				onSubmit={handleSubmit(onProfileSubmit)}
				className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm"
			>
				<div className="mb-8 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<h3 className="text-[15px] font-bold text-gray-800">Profile Settings</h3>
						{profileData?.role && (
							<span className="inline-flex items-center rounded-full bg-[#1d4ea8]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1d4ea8]">
								{profileData.role}
							</span>
						)}
					</div>
					<Button
						type="submit"
						disabled={updateProfileMutation.isPending || isLoadingProfile}
						className="h-11 rounded-xl bg-[#4CAF50] px-8 font-bold text-white transition-all hover:bg-[#43A047] active:scale-95 disabled:opacity-50"
					>
						{updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
					</Button>
				</div>

				{isLoadingProfile ? (
					<div className="flex h-40 items-center justify-center">
						<div className="size-8 animate-spin rounded-full border-4 border-[#1d4ea8] border-t-transparent" />
					</div>
				) : (
					<div className="space-y-8">
						<div className="space-y-4">
							<Label className="text-[14px] font-medium text-gray-600">
								Profile Photo
							</Label>
							<div className="relative inline-block">
								<div className="flex size-24 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-gray-50/30">
									{watch("avatar") ? (
										<Image
											src={watch("avatar") || ""}
											alt="Avatar"
											width={96}
											height={96}
											className="size-full object-cover"
										/>
									) : (
										<Icon
											icon="solar:gallery-bold-duotone"
											className="size-10 text-gray-200"
										/>
									)}
								</div>
								{/* Hidden file input — triggered imperatively via ref */}
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*"
									onChange={handlePhotoUpload}
									className="sr-only"
									aria-label="Upload Profile Photo"
								/>
								<button
									type="button"
									onClick={() => fileInputRef.current?.click()}
									className="absolute -bottom-1 -right-1 flex size-8 cursor-pointer items-center justify-center rounded-full border border-white bg-[#1d4ea8] text-white shadow-sm transition-all hover:bg-[#153a82] active:scale-95"
									aria-label="Edit profile photo"
								>
									<Icon icon="lucide:edit-3" className="size-4" />
								</button>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
							<div className="space-y-2">
								<Label
									htmlFor="fullName"
									className="text-[14px] font-medium text-gray-600"
								>
									Full Name
								</Label>
								<Input
									id="fullName"
									{...register("fullName")}
									className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 text-gray-900 focus:border-[#1d4ea8] focus-visible:ring-0 focus-visible:ring-offset-0"
								/>
								{errors.fullName && (
									<p className="text-xs font-medium text-red-500">
										{errors.fullName.message}
									</p>
								)}
							</div>
							<div className="space-y-2">
								<Label
									htmlFor="email"
									className="text-[14px] font-medium text-gray-600"
								>
									Email Address
								</Label>
								<Input
									id="email"
									{...register("email")}
									disabled
									className="h-12 cursor-not-allowed rounded-xl border-gray-100 bg-gray-100 px-4 text-gray-500 focus-visible:ring-0"
								/>
							</div>
							<div className="space-y-2">
								<Label
									htmlFor="phone"
									className="text-[14px] font-medium text-gray-600"
								>
									Phone Number
								</Label>
								<Input
									id="phone"
									{...register("phone")}
									className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 text-gray-900 focus:border-[#1d4ea8] focus-visible:ring-0 focus-visible:ring-offset-0"
								/>
								{errors.phone && (
									<p className="text-xs font-medium text-red-500">
										{errors.phone.message}
									</p>
								)}
							</div>
						</div>

						<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
							<div className="space-y-2">
								<Label
									htmlFor="dob"
									className="text-[14px] font-medium text-gray-600"
								>
									Date of Birth
								</Label>
								<Input
									id="dob"
									type="date"
									{...register("dob")}
									className="h-12 rounded-xl border-gray-100 bg-gray-50/20 px-4 text-gray-900 focus:border-[#1d4ea8] focus-visible:ring-0 focus-visible:ring-offset-0"
								/>
							</div>
							<div className="space-y-2">
								<Label
									htmlFor="gender"
									className="text-[14px] font-medium text-gray-600"
								>
									Gender
								</Label>
								<Controller
									name="gender"
									control={control}
									render={({ field }) => (
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger
												id="gender"
												className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[14px] font-bold text-gray-800 transition-all hover:bg-gray-50 focus:ring-0"
											>
												<SelectValue placeholder="Select" />
											</SelectTrigger>
											<SelectContent className="rounded-xl border-gray-100">
												<SelectItem value="Male">Male</SelectItem>
												<SelectItem value="Female">Female</SelectItem>
												<SelectItem value="Other">Other</SelectItem>
											</SelectContent>
										</Select>
									)}
								/>
							</div>
							<div className="space-y-2">
								<Label
									htmlFor="city"
									className="text-[14px] font-medium text-gray-600"
								>
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
												className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[14px] font-bold text-gray-800 transition-all hover:bg-gray-50 focus:ring-0"
											>
												<SelectValue placeholder="Select" />
											</SelectTrigger>
											<SelectContent className="rounded-xl border-gray-100">
												{(
													NIGERIA_STATES_AND_CITIES[
														selectedState || ""
													] || []
												).map((ct) => (
													<SelectItem key={ct} value={ct}>
														{ct}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
							<div className="space-y-2">
								<Label
									htmlFor="state"
									className="text-[14px] font-medium text-gray-600"
								>
									State
								</Label>
								<Controller
									name="state"
									control={control}
									render={({ field }) => (
										<Select
											onValueChange={field.onChange}
											value={field.value || ""}
										>
											<SelectTrigger
												id="state"
												className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[14px] font-bold text-gray-800 transition-all hover:bg-gray-50 focus:ring-0"
											>
												<SelectValue placeholder="Select" />
											</SelectTrigger>
											<SelectContent className="rounded-xl border-gray-100">
												{Object.keys(NIGERIA_STATES_AND_CITIES).map(
													(st) => (
														<SelectItem key={st} value={st}>
															{st}
														</SelectItem>
													),
												)}
											</SelectContent>
										</Select>
									)}
								/>
							</div>
							<div className="space-y-2">
								<Label
									htmlFor="country"
									className="text-[14px] font-medium text-gray-600"
								>
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
												className="h-12 cursor-not-allowed rounded-xl border-gray-100 bg-gray-100 px-4 text-[14px] font-bold text-gray-500 focus:ring-0"
											>
												<SelectValue placeholder="Select" />
											</SelectTrigger>
											<SelectContent className="rounded-xl border-gray-100">
												<SelectItem value="Nigeria">Nigeria</SelectItem>
											</SelectContent>
										</Select>
									)}
								/>
							</div>
						</div>
					</div>
				)}
			</form>

			{/* Section: Security & Authentication */}
			<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
				<h3 className="mb-8 text-[15px] font-bold text-gray-800">
					Security & Authentication
				</h3>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<button
						onClick={() => setIsPasswordModalOpen(true)}
						className="flex h-16 items-center justify-center gap-3 rounded-2xl bg-gray-100/60 font-bold text-gray-800 transition-all hover:bg-gray-100 active:scale-[0.98]"
					>
						<Icon icon="lucide:lock" className="size-5" />
						Change Password
					</button>
					<button
						disabled
						className="flex h-16 cursor-not-allowed items-center justify-center gap-3 rounded-2xl bg-gray-100/40 font-bold text-gray-400 opacity-60"
					>
						<Icon icon="lucide:shield-check" className="size-5" />
						Set Two-factor Auth (Disabled)
					</button>
				</div>
			</div>

			{/* Change Password Dialog Modal */}
			<Modal
				isOpen={isPasswordModalOpen}
				onClose={() => {
					setIsPasswordModalOpen(false);
					resetPasswordForm();
				}}
				title="Change Password"
				className="max-w-md text-gray-800"
			>
				<form
					onSubmit={handlePasswordSubmit(onPasswordSubmit)}
					className="flex flex-col gap-6"
				>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="oldPassword font-bold">Old Password</Label>
							<Input
								id="oldPassword"
								type="password"
								placeholder="Enter old password"
								{...regPassword("oldPassword")}
								className="h-12 rounded-xl border-gray-100 bg-gray-50/50 px-4 focus:border-[#1d4ea8] focus:ring-0"
							/>
							{passErrors.oldPassword && (
								<p className="text-xs font-medium text-red-500">
									{passErrors.oldPassword.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="newPassword font-bold">New Password</Label>
							<div className="relative">
								<Input
									id="newPassword"
									type={showPassword ? "text" : "password"}
									placeholder="Enter new password"
									{...regPassword("newPassword")}
									className="h-12 rounded-xl border-gray-100 bg-gray-50/50 px-4 pr-12 focus:border-[#1d4ea8] focus:ring-0"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
									aria-label="Toggle password visibility"
								>
									<Icon
										icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
										className="size-5"
									/>
								</button>
							</div>
							{passErrors.newPassword && (
								<p className="text-xs font-medium text-red-500">
									{passErrors.newPassword.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="confirmNewPassword font-bold">
								Confirm New Password
							</Label>
							<Input
								id="confirmNewPassword"
								type="password"
								placeholder="Confirm new password"
								{...regPassword("confirmNewPassword")}
								className="h-12 rounded-xl border-gray-100 bg-gray-50/50 px-4 focus:border-[#1d4ea8] focus:ring-0"
							/>
							{passErrors.confirmNewPassword && (
								<p className="text-xs font-medium text-red-500">
									{passErrors.confirmNewPassword.message}
								</p>
							)}
						</div>
					</div>

					<div className="flex flex-col gap-3 pt-4">
						<Button
							type="submit"
							disabled={changePasswordMutation.isPending}
							className="h-12 w-full rounded-xl bg-[#1d4ea8] text-[15px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-95"
						>
							{changePasswordMutation.isPending
								? "Updating Password..."
								: "Update Password"}
						</Button>
						<Button
							type="button"
							variant="ghost"
							onClick={() => {
								setIsPasswordModalOpen(false);
								resetPasswordForm();
							}}
							className="h-12 w-full rounded-xl text-[15px] font-bold text-gray-500 hover:bg-gray-50"
						>
							Cancel
						</Button>
					</div>
				</form>
			</Modal>

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
						<Switch disabled className="data-[state=checked]:bg-[#1d4ea8]" />
					</div>
					<div className="flex max-w-sm items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="size-2 rounded-full bg-[#10b981]" />
							<span className="text-[14px] font-medium text-gray-800">
								Push Notifications
							</span>
						</div>
						<Switch disabled className="data-[state=checked]:bg-[#1d4ea8]" />
					</div>
				</div>
			</div>

			{/* Section: System Preferences */}
			<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
				<h3 className="mb-8 text-[15px] font-bold text-gray-800">System Preferences</h3>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					<div className="space-y-2">
						<Label className="text-[14px] font-medium text-gray-600">Language</Label>
						<Select disabled>
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
						<Select disabled>
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
