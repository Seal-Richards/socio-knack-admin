"use client";

import React from "react";
import { Icon } from "@iconify/react";

export default function SecurityTab() {
	return (
		<div className="flex flex-col gap-10">
			{/* Section 1: OTP Login Verification */}
			<section id="otp" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#1d4ea8]">
						<Icon icon="solar:lock-password-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						OTP Login Verification
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					To prevent unauthorized access, SocioKnack enforces Multi-Factor Authentication
					(MFA) during log-in:
				</p>
				<div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50/20 p-5">
					<Icon
						icon="solar:shield-keyhole-bold-duotone"
						className="mt-0.5 size-5 shrink-0 text-[#1d4ea8]"
					/>
					<div className="flex flex-col gap-1">
						<span className="font-sans text-[13px] font-extrabold text-[#1d4ea8]">
							Verification Process
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-600">
							Upon successfully inputting their password, admins, supervisors, and
							staff receive a 6-digit numeric OTP code sent to their registered email
							address. This code is valid for 15 minutes. Verification of this OTP is
							required to receive the session JWT token and gain dashboard access.
						</span>
					</div>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 2: Security PIN */}
			<section id="security-pin" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
						<Icon icon="solar:shield-unique-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						6-Digit Security PIN
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					The 6-digit Security PIN is an operational PIN designed to protect account
					configurations and secure critical dashboard actions:
				</p>
				<div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
					<span className="font-sans text-[13px] font-extrabold text-gray-800">
						Key Features:
					</span>
					<ul className="list-disc space-y-2 pl-5 text-[12px] font-semibold text-gray-500">
						<li>
							<strong>Setup:</strong> Configured in the profile settings panel under
							&quot;System Access & Security&quot;.
						</li>
						<li>
							<strong>Usage:</strong> Required when editing profile details, toggling
							system settings, or changing other critical records.
						</li>
						<li>
							<strong>Verification:</strong> Encrypted using <code>bcrypt</code>{" "}
							hashing before being stored in the database.
						</li>
					</ul>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 3: Payment PIN */}
			<section id="payment-pin" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
						<Icon icon="solar:card-transfer-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						4-Digit Payment PIN
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					The 4-digit Payment PIN protects all monetary actions and wallet operations:
				</p>
				<div className="flex items-start gap-4 rounded-2xl border border-amber-100 bg-amber-50/20 p-5">
					<Icon
						icon="solar:key-bold-duotone"
						className="mt-0.5 size-5 shrink-0 text-amber-600"
					/>
					<div className="flex flex-col gap-1">
						<span className="font-sans text-[13px] font-extrabold text-amber-700">
							Payment Authorization
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-amber-600/90">
							Users must verify their 4-digit Payment PIN before viewing wallet
							details, requesting bank settlements, or confirming supervisor incentive
							payouts. This prevents unauthorized fund distribution even if the
							user&apos;s login session is active.
						</span>
					</div>
				</div>
			</section>
		</div>
	);
}
