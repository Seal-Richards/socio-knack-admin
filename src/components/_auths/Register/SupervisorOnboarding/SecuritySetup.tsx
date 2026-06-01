"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	supervisorSecuritySetupSchema,
	type SupervisorSecuritySetupFormData,
} from "@/schemas/auth";
import { useRegisterSupervisorOnboarding } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { RegisterSupervisorPayload } from "@/types/auth";
import StepProgressBar from "../Shared/StepProgressBar";

export default function SecuritySetup({
	onNext,
	onPrev,
	step = 3,
	totalSteps = 3,
	onboardPayload,
}: {
	onNext: (data: SupervisorSecuritySetupFormData) => void;
	onPrev?: () => void;
	step?: number;
	totalSteps?: number;
	onboardPayload: RegisterSupervisorPayload;
}) {
	const [showPassword, setShowPassword] = useState(false);
	const registerOnboardingMutation = useRegisterSupervisorOnboarding();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<SupervisorSecuritySetupFormData>({
		resolver: zodResolver(supervisorSecuritySetupSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: SupervisorSecuritySetupFormData) => {
		try {
			const res = await registerOnboardingMutation.mutateAsync({
				...onboardPayload,
				password: data.password,
			});

			if (res.success) {
				toast.success(res.message);
				onNext(data);
			} else {
				toast.error(res.message);
			}
		} catch (error: unknown) {
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to complete onboarding registration",
			);
		}
	};

	return (
		<div className="relative w-full text-gray-800">
			<button
				onClick={onPrev}
				type="button"
				className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-colors hover:bg-blue-100"
			>
				<Icon icon="lucide:arrow-left" className="size-5" />
			</button>

			<StepProgressBar currentStep={step} totalSteps={totalSteps} title="Security Setup" />

			<form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
				<div className="relative space-y-2">
					<Label htmlFor="password" className="text-sm font-semibold text-gray-700">
						Create password
					</Label>
					<Input
						id="password"
						type={showPassword ? "text" : "password"}
						placeholder="PASSWORD"
						{...register("password")}
						className="h-12 border-gray-200 bg-gray-50 pr-12 text-gray-900 focus-visible:ring-yellow-500"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-3 top-8 text-gray-400 transition-colors hover:text-gray-600"
					>
						<Icon
							icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
							className="size-5"
						/>
					</button>
					{errors.password && (
						<p className="text-xs font-medium text-red-500">
							{errors.password.message}
						</p>
					)}
				</div>

				<div className="relative space-y-2">
					<Label
						htmlFor="confirmPassword"
						className="text-sm font-semibold text-gray-700"
					>
						Confirm password
					</Label>
					<Input
						id="confirmPassword"
						type={showPassword ? "text" : "password"}
						placeholder="CONFIRM PASSWORD"
						{...register("confirmPassword")}
						className="h-12 border-gray-200 bg-gray-50 pr-12 text-gray-900 focus-visible:ring-yellow-500"
					/>
					<div className="absolute right-3 top-8 rounded-full bg-green-500 p-0.5">
						<Icon icon="lucide:check" className="size-3 text-white" />
					</div>
					{errors.confirmPassword && (
						<p className="text-xs font-medium text-red-500">
							{errors.confirmPassword.message}
						</p>
					)}
				</div>

				<Button
					type="button"
					className="bg-darkBlue-900 hover:bg-darkBlue-800 my-6 h-12 w-full rounded-md font-semibold text-white shadow-md"
				>
					Set Two-Factor Authenticator (Optional)
				</Button>

				<div className="space-y-4 border-t border-gray-100 pt-2">
					<div className="flex items-start space-x-3">
						<Controller
							name="password" // Standard checkbox control can also be registered
							control={control}
							render={({ field: _field }) => (
								<Checkbox id="device-trust" className="mt-1" defaultChecked />
							)}
						/>
						<label
							htmlFor="device-trust"
							className="cursor-pointer text-sm font-medium leading-none text-gray-600"
						>
							Device Trusted Compliance
						</label>
					</div>

					<div className="flex items-start space-x-3">
						<Checkbox id="terms" className="mt-1" defaultChecked required />
						<label
							htmlFor="terms"
							className="cursor-pointer text-sm font-medium leading-[1.3] text-gray-600"
						>
							By clicking &quot;Continue&quot; I certify that I have reviewed and
							agree to be bound by the{" "}
							<a href="#" className="text-blue-600 hover:underline">
								Terms of Service
							</a>
							,{" "}
							<a href="#" className="text-blue-600 hover:underline">
								Data Privacy Policy
							</a>
							, and{" "}
							<a href="#" className="text-blue-600 hover:underline">
								Internal Data Usage Policy
							</a>
							. I understand that these agreements govern the security, legal, and
							operational framework
						</label>
					</div>
				</div>

				<Button
					type="submit"
					disabled={registerOnboardingMutation.isPending}
					className="text-md mt-8 h-12 w-full bg-green-500 font-sans font-semibold text-white shadow-md hover:bg-green-600 disabled:opacity-50"
				>
					{registerOnboardingMutation.isPending ? "Completing Setup..." : "Continue"}
				</Button>
			</form>
		</div>
	);
}
