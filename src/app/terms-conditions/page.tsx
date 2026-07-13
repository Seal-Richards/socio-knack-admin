"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsConditionsPage() {
	return (
		<main className="relative min-h-screen bg-slate-50/10">
			<Header />
			<div className="container mx-auto max-w-4xl px-6 pb-24 pt-36 md:px-8 md:pb-36">
				<h1 className="mb-8 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
					Terms & Conditions
				</h1>
				<p className="mb-8 text-xs font-bold uppercase tracking-wider text-gray-400">
					Last updated: July 13, 2026
				</p>
				<div className="space-y-6 font-medium leading-relaxed text-slate-600">
					<p>
						Welcome to SocioKnack. These Terms and Conditions govern your use of our
						platform, website, and related services. By accessing or using the services,
						you agree to be bound by these Terms.
					</p>
					<h3 className="pt-4 text-xl font-bold text-slate-800">1. Use of License</h3>
					<p>
						SocioKnack grants you a limited, non-exclusive, non-transferable, revocable
						license to use the platform for managing field force operations under your
						subscription plan. You agree not to reverse engineer, modify, or
						unauthorizedly distribute the software assets.
					</p>
					<h3 className="pt-4 text-xl font-bold text-slate-800">
						2. Subscription Tiers & Billing
					</h3>
					<p>
						Fees are calculated based on your active plan (Starter, Growth, Business, or
						Enterprise) and the seat count of users enrolled. All invoices are due
						monthly or annually as per your selection. One-time setup fees are
						non-refundable.
					</p>
					<h3 className="pt-4 text-xl font-bold text-slate-800">
						3. Escrow Accounts & Settle Payments
					</h3>
					<p>
						Business owners are responsible for top-up funding in their virtual escrow
						wallets. Payout distributions to agents are executed on supervisor approval.
						SocioKnack is not liable for payout errors resulting from incorrect bank
						details or BVN inputs.
					</p>
				</div>
			</div>
			<Footer />
		</main>
	);
}
