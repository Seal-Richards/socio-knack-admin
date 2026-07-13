"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
	return (
		<main className="relative min-h-screen bg-slate-50/10">
			<Header />
			<div className="container mx-auto max-w-4xl px-6 pb-24 pt-36 md:px-8 md:pb-36">
				<h1 className="mb-8 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
					Privacy Policy
				</h1>
				<p className="mb-8 text-xs font-bold uppercase tracking-wider text-gray-400">
					Last updated: July 13, 2026
				</p>
				<div className="space-y-6 font-medium leading-relaxed text-slate-600">
					<p>
						At SocioKnack, we prioritize the protection of your personal and corporate
						data. This Privacy Policy describes how we collect, store, and utilize data
						when you use our web and mobile systems.
					</p>
					<h3 className="pt-4 text-xl font-bold text-slate-800">
						1. Information Collection
					</h3>
					<p>
						We collect workspace data, setup details, and user profiles. To run
						geofenced task checks and audit routes, our mobile app tracks and processes
						real-time GPS coordinates.
					</p>
					<h3 className="pt-4 text-xl font-bold text-slate-800">2. Use of Information</h3>
					<p>
						Location coordinates are processed exclusively to verify visits inside
						territory boundaries and calculate incentive commission triggers. We do not
						sell or share coordinate streams with third-party trackers.
					</p>
					<h3 className="pt-4 text-xl font-bold text-slate-800">3. Data Security</h3>
					<p>
						Sensitive tokens, database references, and account numbers are encrypted.
						BVN checks and settlement bank verification are resolved securely through
						authorized partner channels.
					</p>
				</div>
			</div>
			<Footer />
		</main>
	);
}
