"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		// Demo login credentials
		const DEMO_EMAIL = "admin@socioknack.com";
		const DEMO_PASSWORD = "SocioKnack@2026";

		if (data.email === DEMO_EMAIL && data.password === DEMO_PASSWORD) {
			toast.success("Login successful! Redirecting...");
			router.push("/dashboard");
		} else {
			toast.error("Invalid email or password. Please use the demo credentials.");
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
					{/* Using a relative path for the image from public folder */}
					<Image
						src="/assets/images/socioknack_blue_text_logo.png"
						alt="SocioKnack Logo"
						width={180}
						height={40}
						className="object-contain brightness-[5] hue-rotate-180 saturate-[300%] sepia-[1]" // Attempting to turn blue logo white/light via CSS filter, since we're on dark bg
					/>
				</motion.div>

				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="mb-8"
				>
					<h1 className="h3 mb-2 text-white">Log in</h1>
					<p className="text-gray-300">Enter your information below to log in</p>
				</motion.div>

				{/* Form */}
				<motion.form
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-6"
				>
					{/* Email */}
					<div className="space-y-2">
						<Label htmlFor="email" className="flex items-center gap-2 text-white">
							<Icon icon="lucide:mail" className="size-4 text-yellow-500" />
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
						<Label htmlFor="password" className="flex items-center gap-2 text-white">
							<Icon icon="lucide:lock" className="size-4 text-yellow-500" />
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
								aria-label={showPassword ? "Hide password" : "Show password"}
							>
								<Icon
									icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
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
						disabled={isSubmitting}
						className="h-12 w-full bg-blue-500 text-lg font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
					>
						{isSubmitting ? "Logging in..." : "Log in"}
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
				</motion.form>
			</div>

			{/* Right Image Section */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				className="relative hidden h-screen md:block md:w-1/2"
			>
				{/* We add a blue overlay mix-blend to match UI if raw image is too bright */}
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
