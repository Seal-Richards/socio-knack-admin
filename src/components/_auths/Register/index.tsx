"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Icon } from "@iconify/react";

// Phase 1: Admin & Organization Setup (Steps 1-6)
import AdminIdentitySetup from "./OrganisationOnboarding/IdentitySetup";
import AdminOwnershipVerification from "./OrganisationOnboarding/OwnershipVerification";
import AdminOrganisationSetup from "./OrganisationOnboarding/OrganisationSetup";
import AdminWalletSetup from "./OrganisationOnboarding/WalletSetup";
import AdminPlatformActivation from "./OrganisationOnboarding/PlatformActivation";

// Phase 3: Final Auth (Steps 10-11)
import OTPVerification from "./Shared/OTPVerification";
import AuthSuccess from "./Shared/AuthSuccess";

export default function Register() {
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState(1);
	const totalSteps = 7; // 1: Identity, 2: OTP, 3: Ownership, 4: Org, 5: Wallet, 6: Activation, 7: Success

	const stepVariants: Variants = {
		initial: { x: 20, opacity: 0 },
		enter: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
		exit: { x: -20, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
	};

	const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
	const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

	return (
		<div className="bg-darkBlue-900 text-foreground flex min-h-screen w-full flex-col items-center justify-center p-4 md:bg-gray-100">
			{/* Container Card */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className={`relative w-full overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-500 ease-in-out md:p-12 ${
					currentStep === 6 ? "max-w-6xl" : "max-w-3xl"
				}`}
			>
				{/* Header - Logo and Exit (Hidden on Success step) */}
				{currentStep !== totalSteps && (
					<div className="text-darkBlue-900 mb-10 flex items-center justify-between">
						<Image
							src="/assets/images/socioknack_blue_text_logo.png"
							alt="SocioKnack Logo"
							width={150}
							height={30}
							className="object-contain"
						/>
						<button
							onClick={() => router.push("/login")}
							className="flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-colors hover:bg-blue-100"
						>
							<Icon icon="lucide:x" className="size-5" />
						</button>
					</div>
				)}

				{/* Dynamic Content Area */}
				<div className="relative min-h-[400px]">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentStep}
							variants={stepVariants}
							initial="initial"
							animate="enter"
							exit="exit"
							className={`w-full ${currentStep === totalSteps ? "flex h-full flex-col justify-center" : ""}`}
						>
							{currentStep === 1 && (
								<AdminIdentitySetup
									onNext={nextStep}
									step={currentStep}
									totalSteps={totalSteps - 1}
								/>
							)}
							{currentStep === 2 && (
								<OTPVerification onNext={nextStep} onPrev={prevStep} />
							)}
							{currentStep === 3 && (
								<AdminOwnershipVerification onNext={nextStep} onPrev={prevStep} />
							)}
							{currentStep === 4 && (
								<AdminOrganisationSetup
									onNext={nextStep}
									onPrev={prevStep}
									step={currentStep}
									totalSteps={totalSteps - 1}
								/>
							)}
							{currentStep === 5 && (
								<AdminWalletSetup
									onNext={nextStep}
									onPrev={prevStep}
									step={currentStep}
									totalSteps={totalSteps - 1}
								/>
							)}
							{currentStep === 6 && (
								<AdminPlatformActivation
									onNext={nextStep}
									_onPrev={prevStep}
									step={currentStep}
									totalSteps={totalSteps - 1}
								/>
							)}
							{currentStep === 7 && <AuthSuccess />}
						</motion.div>
					</AnimatePresence>
				</div>
			</motion.div>
		</div>
	);
}
