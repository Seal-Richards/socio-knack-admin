"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import { useLoginOtp, useResendOtp } from "@/hooks/useAuth";
import { signIn } from "next-auth/react";

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [step, setStep] = useState<"credentials" | "otp">("credentials");
	const [loginEmail, setLoginEmail] = useState("");
	const [otpValue, setOtpValue] = useState("");
	const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

	const router = useRouter();

	const loginMutation = useLoginOtp();
	const resendOtpMutation = useResendOtp();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onCredentialsSubmit = async (data: LoginFormData) => {
		try {
			const res = await loginMutation.mutateAsync({
				email: data.email,
				password: data.password,
			});

			if (res.success) {
				toast.success(res.message);
				if (res.token) {
					// Direct login flow (Bypassed OTP)
					const result = await signIn("credentials", {
						email: data.email,
						password: data.password,
						redirect: false,
					});
					if (result?.error) {
						toast.error("Standard credentials authentication failed.");
					} else {
						toast.success("Login successful! Redirecting...");
						router.push("/dashboard");
					}
				} else {
					// OTP flow
					setLoginEmail(data.email);
					setStep("otp");
				}
			} else {
				toast.error(res.message);
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "Failed to log in");
		}
	};

	const onVerifyOtpSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (otpValue.length !== 6 || !/^\d+$/.test(otpValue)) {
			toast.error("Please enter a valid 6-digit OTP code");
			return;
		}

		setIsVerifyingOtp(true);
		try {
			// Trigger standard NextAuth credentials signIn flow
			const result = await signIn("credentials", {
				email: loginEmail,
				otp: otpValue,
				isOtpFlow: "true",
				redirect: false,
			});

			if (result?.error) {
				// NextAuth returns a generic string on authorize failure. Let's let the user know or show error.
				toast.error("Invalid or expired verification OTP. Please try again.");
			} else {
				toast.success("Login successful! Redirecting...");
				router.push("/dashboard");
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "OTP verification failed");
		} finally {
			setIsVerifyingOtp(false);
		}
	};

	const handleResendOtp = async () => {
		try {
			const res = await resendOtpMutation.mutateAsync({ email: loginEmail });
			if (res.success) {
				toast.success(res.message);
			} else {
				toast.error(res.message);
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "Failed to resend OTP");
		}
	};

	return (
		<div className="bg-darkBlue-900 flex min-h-screen w-full text-white">
			{/* Left Form Section */}
			<div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-16 lg:px-32 xl:p-40 xl:pt-32">
				{/* Logo */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-12 flex items-center"
				>
					<Image
						src="/assets/images/socioknack_blue_text_logo.png"
						alt="SocioKnack Logo"
						width={180}
						height={40}
						className="object-contain brightness-[5] hue-rotate-180 saturate-[300%] sepia-[1]"
					/>
				</motion.div>

				<AnimatePresence mode="wait">
					{step === "credentials" ? (
						<motion.div
							key="credentials-form"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 20 }}
							transition={{ duration: 0.3 }}
						>
							{/* Heading */}
							<div className="mb-8">
								<h1 className="h3 mb-2 text-white">Log in</h1>
								<p className="text-gray-300">
									Enter your information below to log in
								</p>
							</div>

							{/* Credentials Form */}
							<form
								onSubmit={handleSubmit(onCredentialsSubmit)}
								className="space-y-6"
							>
								{/* Email */}
								<div className="space-y-2">
									<Label
										htmlFor="email"
										className="flex items-center gap-2 text-white"
									>
										<Icon
											icon="lucide:mail"
											className="size-4 text-yellow-500"
										/>
										Email
									</Label>
									<Input
										id="email"
										type="email"
										placeholder="Email"
										{...register("email")}
										className="h-12 border-none bg-white/10 text-white placeholder:text-gray-400 focus-visible:ring-yellow-500"
									/>
									{errors.email && (
										<p className="text-xs font-medium text-red-400">
											{errors.email.message}
										</p>
									)}
								</div>

								{/* Password */}
								<div className="space-y-2">
									<Label
										htmlFor="password"
										className="flex items-center gap-2 text-white"
									>
										<Icon
											icon="lucide:lock"
											className="size-4 text-yellow-500"
										/>
										Password
									</Label>
									<div className="relative">
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											placeholder="Password"
											{...register("password")}
											className="h-12 border-none bg-white/10 pr-10 text-white placeholder:text-gray-400 focus-visible:ring-yellow-500"
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-white"
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
										>
											<Icon
												icon={
													showPassword ? "lucide:eye-off" : "lucide:eye"
												}
												className="size-5"
											/>
										</button>
									</div>
									{errors.password && (
										<p className="text-xs font-medium text-red-400">
											{errors.password.message}
										</p>
									)}
								</div>

								{/* Forgot Password Link */}
								<div className="flex justify-end">
									<Link
										href="/forgot-password"
										className="text-sm font-medium tracking-wide text-yellow-500 transition-colors hover:text-yellow-400"
									>
										Forgot Password
									</Link>
								</div>

								{/* Login Button */}
								<Button
									type="submit"
									disabled={loginMutation.isPending}
									className="h-12 w-full bg-blue-500 text-lg font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
								>
									{loginMutation.isPending ? "Authenticating..." : "Log in"}
								</Button>

								{/* Create Account Link */}
								<div className="pt-2">
									<Link
										href="/register"
										className="block w-full rounded-md border border-white/10 bg-white/5 py-3 text-center text-white transition-colors hover:bg-white/10"
									>
										Create an account
									</Link>
								</div>
							</form>
						</motion.div>
					) : (
						<motion.div
							key="otp-form"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.3 }}
						>
							{/* Heading */}
							<div className="mb-8">
								<h1 className="h3 mb-2 text-white">Verification Code</h1>
								<p className="text-gray-300">
									Please enter the 6-digit verification code sent to{" "}
									<span className="font-bold text-yellow-500">{loginEmail}</span>.
								</p>
							</div>

							{/* OTP Form */}
							<form onSubmit={onVerifyOtpSubmit} className="space-y-6">
								<div className="space-y-2">
									<Label
										htmlFor="otp"
										className="flex items-center gap-2 text-white"
									>
										<Icon
											icon="lucide:shield"
											className="size-4 text-yellow-500"
										/>
										Enter 6-Digit OTP Code
									</Label>
									<Input
										id="otp"
										type="text"
										placeholder="X X X X X X"
										maxLength={6}
										value={otpValue}
										onChange={(e) =>
											setOtpValue(e.target.value.replace(/\D/g, ""))
										}
										className="h-14 border-none bg-white/10 text-center text-xl font-bold tracking-[0.5em] text-white placeholder:text-gray-500 focus-visible:ring-yellow-500"
									/>
								</div>

								<div className="flex items-center justify-between pt-2 text-sm">
									<button
										type="button"
										onClick={handleResendOtp}
										disabled={resendOtpMutation.isPending}
										className="font-medium text-yellow-500 transition-colors hover:text-yellow-400 disabled:opacity-50"
									>
										{resendOtpMutation.isPending
											? "Resending..."
											: "Resend OTP Code"}
									</button>
									<button
										type="button"
										onClick={() => {
											setOtpValue("");
											setStep("credentials");
										}}
										className="text-gray-400 transition-colors hover:text-white"
									>
										Back to Login
									</button>
								</div>

								{/* Verify Button */}
								<Button
									type="submit"
									disabled={isVerifyingOtp}
									className="h-12 w-full bg-blue-500 text-lg font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
								>
									{isVerifyingOtp ? "Verifying..." : "Verify & Log in"}
								</Button>
							</form>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Right Image Section */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				className="relative hidden h-screen md:block md:w-1/2"
			>
				<div className="bg-darkBlue-900/20 absolute inset-0 z-10 mix-blend-multiply" />
				<Image
					src="/assets/images/login_bg.png"
					alt="Login Background"
					fill
					priority
					className="object-cover"
				/>
			</motion.div>
		</div>
	);
}
