"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Icon } from "@iconify/react";
import { useVerifyInvite } from "@/hooks/useAuth";
import { businessRequests } from "@/lib/requests/business";
import { profileRequests } from "@/lib/requests/profile";
import type { RegisterSupervisorPayload } from "@/types/auth";

// Phase 1: Admin & Organization Setup (Steps 1-6)
import AdminIdentitySetup from "./OrganisationOnboarding/IdentitySetup";
import AdminOwnershipVerification from "./OrganisationOnboarding/OwnershipVerification";
import AdminOrganisationSetup from "./OrganisationOnboarding/OrganisationSetup";
import AdminWalletSetup from "./OrganisationOnboarding/WalletSetup";
import AdminPlatformActivation from "./OrganisationOnboarding/PlatformActivation";

// Phase 2: Supervisor & Staff Onboarding Setup (Invited Users)
import SupervisorPersonalSetup from "./SupervisorOnboarding/PersonalSetup";
import SupervisorIdentitySetup from "./SupervisorOnboarding/IdentitySetup";
import SupervisorSecuritySetup from "./SupervisorOnboarding/SecuritySetup";

// Phase 3: Final Auth (Steps 10-11)
import OTPVerification from "./Shared/OTPVerification";
import AuthSuccess from "./Shared/AuthSuccess";

export default function Register() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const token = searchParams?.get("token") || "";
	const email = searchParams?.get("email") || "";
	const isInvitedFlow = !!token && !!email;

	// Query invitation status
	const {
		data: inviteVerifyRes,
		isLoading: isVerifyingInvite,
		isError: inviteVerifyError,
	} = useVerifyInvite(token, email);

	// Standard Admin Flow Step Tracker
	const [currentStep, setCurrentStep] = useState(1);
	const totalSteps = 7; // 1: Identity, 2: OTP, 3: Ownership, 4: Org, 5: Wallet, 6: Activation, 7: Success

	// Standard Admin cumulative data state
	const [adminData, setAdminData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		password: "",
		confirmPassword: "",
		ownerIdDocName: "",
		orgName: "",
		orgDomain: "",
		orgCountry: "NG",
		orgCurrency: "NGN",
		orgTimeZone: "WAT",
		orgRegulatoryRegion: "Africa",
		cacCertificateName: "",
		taxIdCertificateName: "",
		utilityBillName: "",
		bankName: "",
		bankCode: "",
		accountNumber: "",
		accountName: "",
		bvn: "",
		selectedPlan: "",
	});

	// Invited User Onboarding Flow Step Tracker
	const [onboardStep, setOnboardStep] = useState(1);
	const totalOnboardSteps = 4; // 1: Personal Info, 2: Identity, 3: Security, 4: Success

	// Invited User cumulative data state
	const [onboardData, setOnboardData] = useState<RegisterSupervisorPayload>({
		token,
		email,
		firstName: "",
		lastName: "",
		phone: "",
		dob: "",
		gender: "",
		city: "",
		state: "",
		country: "",
		password: "",
	});

	// Load step & data from sessionStorage and query parameters on mount
	useEffect(() => {
		if (typeof window === "undefined") return;

		// URL steps take priority
		const urlStep = searchParams?.get("step");

		if (isInvitedFlow) {
			const savedInvitedStep = sessionStorage.getItem("onboarding_invited_step");
			const savedInvitedData = sessionStorage.getItem("onboarding_invited_data");
			if (urlStep) {
				setOnboardStep(parseInt(urlStep, 10));
			} else if (savedInvitedStep) {
				setOnboardStep(parseInt(savedInvitedStep, 10));
			}
			if (savedInvitedData) {
				try {
					setOnboardData(JSON.parse(savedInvitedData) as RegisterSupervisorPayload);
				} catch (e) {
					console.error("Failed to parse onboarding_invited_data", e);
				}
			}
		} else {
			const savedAdminStep = sessionStorage.getItem("onboarding_admin_step");
			const savedAdminData = sessionStorage.getItem("onboarding_admin_data");
			const storedToken =
				typeof window !== "undefined" ? localStorage.getItem("token") : null;

			if (urlStep) {
				setCurrentStep(parseInt(urlStep, 10));
			} else if (storedToken) {
				// We have a token. Let's auto-resolve step resumption from DB to avoid session storage stale step
				(async () => {
					try {
						// Temporarily set a step from sessionStorage while we fetch DB (so we don't flash step 1 if we were on a saved step)
						if (savedAdminStep) {
							setCurrentStep(parseInt(savedAdminStep, 10));
						} else {
							setCurrentStep(3); // Default for logged-in user
						}

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
								const settingsObj = settings as unknown as OnboardingBusinessData;
								const docs = settingsObj.corporateDocuments || {};
								let targetStep = 3;
								const hasOwnerId = !!profileRes?.data?.kycDocuments?.idFront;

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
								} else if (settingsObj.subscriptionStatus !== "active") {
									targetStep = 6;
								} else {
									targetStep = 7;
								}
								setCurrentStep(targetStep);
							}
						} else {
							setCurrentStep(3);
						}
					} catch (err) {
						console.error("Failed to auto-resolve progress on mount:", err);
						if (savedAdminStep) {
							setCurrentStep(parseInt(savedAdminStep, 10));
						}
					}
				})().catch(() => undefined);
			} else if (savedAdminStep) {
				setCurrentStep(parseInt(savedAdminStep, 10));
			}

			if (savedAdminData) {
				try {
					setAdminData(JSON.parse(savedAdminData) as typeof adminData);
				} catch (e) {
					console.error("Failed to parse onboarding_admin_data", e);
				}
			}
		}
	}, [searchParams, isInvitedFlow]);

	// Save steps & data to sessionStorage on change
	useEffect(() => {
		if (typeof window === "undefined") return;
		if (isInvitedFlow) {
			sessionStorage.setItem("onboarding_invited_step", String(onboardStep));
			sessionStorage.setItem("onboarding_invited_data", JSON.stringify(onboardData));
		} else {
			sessionStorage.setItem("onboarding_admin_step", String(currentStep));
			sessionStorage.setItem("onboarding_admin_data", JSON.stringify(adminData));
		}
	}, [currentStep, adminData, onboardStep, onboardData, isInvitedFlow]);

	// Sync query params when they load
	useEffect(() => {
		if (token && email) {
			setOnboardData((prev) => ({
				...prev,
				token,
				email,
			}));
		}
	}, [token, email]);

	const stepVariants: Variants = {
		initial: { x: 20, opacity: 0 },
		enter: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
		exit: { x: -20, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
	};

	const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
	const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

	const nextOnboardStep = () => setOnboardStep((prev) => Math.min(prev + 1, totalOnboardSteps));
	const prevOnboardStep = () => setOnboardStep((prev) => Math.max(prev - 1, 1));

	// If verifying the invite, show loading overlay
	if (isInvitedFlow && isVerifyingInvite) {
		return (
			<div className="bg-darkBlue-900 flex min-h-screen w-full items-center justify-center text-white">
				<div className="flex flex-col items-center gap-4">
					<div className="size-10 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent" />
					<p className="text-gray-300">Verifying invitation token...</p>
				</div>
			</div>
		);
	}

	// If verify failed or is expired, show error card
	if (isInvitedFlow && (inviteVerifyError || !inviteVerifyRes?.success)) {
		return (
			<div className="bg-darkBlue-900 flex min-h-screen w-full items-center justify-center p-4">
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					className="w-full max-w-md rounded-xl bg-white p-8 text-center text-gray-800 shadow-2xl"
				>
					<div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-red-50 text-red-500">
						<Icon icon="lucide:alert-triangle" className="size-8" />
					</div>
					<h2 className="mb-2 text-2xl font-bold text-gray-900">Invalid Invite Link</h2>
					<p className="mb-8 text-gray-500">
						{inviteVerifyRes?.message ||
							"This invitation link is invalid, expired, or has already been used. Please contact your business administrator."}
					</p>
					<button
						onClick={() => router.push("/login")}
						className="h-12 w-full rounded-xl bg-[#1d4ea8] text-[15px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-95"
					>
						Go to Log in
					</button>
				</motion.div>
			</div>
		);
	}

	// Determine title/header details for Invited flow
	const inviteInfo = inviteVerifyRes?.data;
	const businessName = inviteInfo?.businessName || "Socio Knack Partner";
	const invitedRole =
		inviteInfo?.role === "staff" ? `Staff (${inviteInfo.position})` : "Supervisor";

	const isOnSuccessStep = isInvitedFlow ? onboardStep === totalOnboardSteps : currentStep === 7;
	let containerMaxWidth = "max-w-3xl";
	if (!isOnSuccessStep && currentStep === 6) {
		containerMaxWidth = "max-w-6xl";
	}

	return (
		<div className="bg-darkBlue-900 text-foreground flex min-h-screen w-full flex-col items-center justify-center p-4 md:bg-gray-100">
			{/* Container Card */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className={`relative w-full overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-500 ease-in-out md:p-12 ${containerMaxWidth}`}
			>
				{/* Header - Logo and Exit (Hidden on Success step) */}
				{(!isInvitedFlow
					? currentStep !== totalSteps
					: onboardStep !== totalOnboardSteps) && (
					<div className="text-darkBlue-900 mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
						<div className="flex flex-col gap-1">
							<Image
								src="/assets/images/socioknack_blue_text_logo.png"
								alt="SocioKnack Logo"
								width={150}
								height={30}
								className="object-contain"
							/>
							{isInvitedFlow && (
								<p className="mt-1 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#1d4ea8]">
									Invited as {invitedRole} by{" "}
									<span className="font-bold">{businessName}</span>
								</p>
							)}
						</div>
						<button
							onClick={() => router.push("/login")}
							className="flex size-8 items-center justify-center self-end rounded-full bg-blue-50 text-blue-500 transition-colors hover:bg-blue-100 md:self-auto"
							aria-label="Close"
						>
							<Icon icon="lucide:x" className="size-5" />
						</button>
					</div>
				)}

				{/* Dynamic Content Area */}
				<div className="relative min-h-[400px]">
					<AnimatePresence mode="wait">
						<motion.div
							key={
								isInvitedFlow ? `invited-${onboardStep}` : `standard-${currentStep}`
							}
							variants={stepVariants}
							initial="initial"
							animate="enter"
							exit="exit"
							className={`w-full ${
								(
									isInvitedFlow
										? onboardStep === totalOnboardSteps
										: currentStep === totalSteps
								)
									? "flex h-full flex-col justify-center"
									: ""
							}`}
						>
							{isInvitedFlow ? (
								// Invited User (Supervisor/Staff) Onboarding Flow
								<>
									{onboardStep === 1 && (
										<SupervisorPersonalSetup
											onNext={(data) => {
												setOnboardData((prev) => ({ ...prev, ...data }));
												nextOnboardStep();
											}}
											onPrev={() => router.push("/login")}
											step={onboardStep}
											totalSteps={totalOnboardSteps - 1}
											prefilledEmail={onboardData?.email}
										/>
									)}
									{onboardStep === 2 && (
										<SupervisorIdentitySetup
											onNext={nextOnboardStep}
											onPrev={prevOnboardStep}
											step={onboardStep}
											totalSteps={totalOnboardSteps - 1}
										/>
									)}
									{onboardStep === 3 && (
										<SupervisorSecuritySetup
											onNext={async (data) => {
												const finalPayload = { ...onboardData, ...data };
												setOnboardData(finalPayload);
												nextOnboardStep();
											}}
											onPrev={prevOnboardStep}
											step={onboardStep}
											totalSteps={totalOnboardSteps - 1}
											onboardPayload={onboardData}
										/>
									)}
									{onboardStep === 4 && <AuthSuccess isSupervisorFlow />}
								</>
							) : (
								// Standard Business Admin Flow
								<>
									{currentStep === 1 && (
										<AdminIdentitySetup
											onNext={(data) => {
												setAdminData(
													(prev) =>
														({ ...prev, ...data }) as typeof adminData,
												);
												nextStep();
											}}
											onSkipToStep={(s) => setCurrentStep(s)}
											initialValues={adminData}
											step={currentStep}
											totalSteps={totalSteps - 1}
										/>
									)}
									{currentStep === 2 && (
										<OTPVerification onNext={nextStep} onPrev={prevStep} />
									)}
									{currentStep === 3 && (
										<AdminOwnershipVerification
											onNext={(data) => {
												setAdminData(
													(prev) =>
														({ ...prev, ...data }) as typeof adminData,
												);
												nextStep();
											}}
											onPrev={prevStep}
											initialValues={adminData}
										/>
									)}
									{currentStep === 4 && (
										<AdminOrganisationSetup
											onNext={(data) => {
												setAdminData(
													(prev) =>
														({ ...prev, ...data }) as typeof adminData,
												);
												nextStep();
											}}
											onPrev={prevStep}
											initialValues={adminData}
											step={currentStep}
											totalSteps={totalSteps - 1}
										/>
									)}
									{currentStep === 5 && (
										<AdminWalletSetup
											onNext={(data) => {
												setAdminData(
													(prev) =>
														({ ...prev, ...data }) as typeof adminData,
												);
												nextStep();
											}}
											onPrev={prevStep}
											initialValues={adminData}
											step={currentStep}
											totalSteps={totalSteps - 1}
										/>
									)}
									{currentStep === 6 && (
										<AdminPlatformActivation
											onNext={(data) => {
												if (data) {
													setAdminData(
														(prev) =>
															({
																...prev,
																...data,
															}) as typeof adminData,
													);
												}
												nextStep();
											}}
											_onPrev={prevStep}
											initialValues={adminData}
											step={currentStep}
											totalSteps={totalSteps - 1}
										/>
									)}
									{currentStep === 7 && <AuthSuccess />}
								</>
							)}
						</motion.div>
					</AnimatePresence>
				</div>
			</motion.div>
		</div>
	);
}
