"use client";

import React from "react";
import { Icon } from "@iconify/react";

export default function OverviewTab() {
	return (
		<div className="flex flex-col gap-10">
			{/* Section 1: System Architecture */}
			<section id="system-overview" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#1d4ea8]">
						<Icon icon="solar:globus-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						System Architecture
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					SocioKnack operates as a multi-tenant business agent and task supervision
					network. Under this framework,
					<strong> Business Admins</strong> register corporate instances, specify products
					& services catalogs, configure settlement banks, select subscription tiers, and
					invite supervisors/staff to monitor field execution.
				</p>
				<div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
						<span className="text-[14px] font-extrabold text-gray-800">
							1. Admin Panel
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
							Enterprise command center used for setting rules, creating inventory
							items, defining geographic territories, approving payrolls/payouts, and
							reviewing audits.
						</span>
					</div>
					<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
						<span className="text-[14px] font-extrabold text-gray-800">
							2. Supervisors
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
							Managers responsible for scheduling tasks, validating agent visit
							check-ins, reporting product sales, and verifying compliance rules.
						</span>
					</div>
					<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
						<span className="text-[14px] font-extrabold text-gray-800">
							3. Field Agents
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
							Mobile app operators executing visits, submitting reports, receiving
							customer payments, and claiming performance-based payout incentives.
						</span>
					</div>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 2: Admin Registration Flow */}
			<section id="admin-registration" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
						<Icon icon="solar:shield-user-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Admin Registration Flow
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					Corporate administrators setup their workspace through a structured onboarding
					sequence consisting of the following key milestones:
				</p>
				<div className="mt-2 space-y-4">
					<div className="flex items-start gap-4">
						<div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[11px] font-black text-white">
							1
						</div>
						<div className="flex flex-col gap-0.5">
							<span className="text-[14px] font-bold text-gray-800">
								Personal & Workspace Details
							</span>
							<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
								Admin inputs full name, corporate email address, and creates secure
								log-in password.
							</span>
						</div>
					</div>
					<div className="flex items-start gap-4">
						<div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[11px] font-black text-white">
							2
						</div>
						<div className="flex flex-col gap-0.5">
							<span className="text-[14px] font-bold text-gray-800">
								Email OTP Verification
							</span>
							<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
								A 6-digit numeric OTP is issued to verify email existence.
							</span>
						</div>
					</div>
					<div className="flex items-start gap-4">
						<div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[11px] font-black text-white">
							3
						</div>
						<div className="flex flex-col gap-0.5">
							<span className="text-[14px] font-bold text-gray-800">
								KYC Upload & Ownership Verification
							</span>
							<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
								Upload of Government ID (Passport / Drivers License / NIN Slip) to
								establish identity.
							</span>
						</div>
					</div>
					<div className="flex items-start gap-4">
						<div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[11px] font-black text-white">
							4
						</div>
						<div className="flex flex-col gap-0.5">
							<span className="text-[14px] font-bold text-gray-800">
								Organization & Bank Setup
							</span>
							<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
								Defines organization parameters (name, country, currency) and
								settlement bank settings for payout logic.
							</span>
						</div>
					</div>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 3: Supervisor Onboarding */}
			<section id="supervisor-onboarding" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
						<Icon icon="solar:letter-opened-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Supervisor Onboarding Flow
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					Supervisors and Staff members are invited via email invitation tokens. The
					registration flow requires them to complete documentation fields:
				</p>
				<div className="flex items-start gap-4 rounded-2xl border border-red-100 bg-red-50/20 p-5">
					<Icon
						icon="solar:info-square-bold-duotone"
						className="mt-0.5 size-5 shrink-0 text-red-500"
					/>
					<div className="flex flex-col gap-1">
						<span className="text-[13px] font-extrabold text-red-700">
							Mandatory ID Front Upload
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-red-600/90">
							Step 2 (Identity Verification) of the supervisor signup flow requires
							uploading a valid government ID document file. They cannot skip this
							step, and the registration submission will auto-upload this document
							once account creation is confirmed.
						</span>
					</div>
				</div>
				<div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
						<span className="text-[13px] font-black text-[#1d4ea8]">
							Step 1: Personal Info
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
							Inputs basic name, verified email (locked to invite), phone, date of
							birth, gender, and home address settings.
						</span>
					</div>
					<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
						<span className="text-[13px] font-black text-[#1d4ea8]">
							Step 2: Identity Setup
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
							Uploads valid ID document file (PNG, JPG, JPEG, PDF) which is linked to
							their profile in the database.
						</span>
					</div>
					<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
						<span className="text-[13px] font-black text-[#1d4ea8]">
							Step 3: Security & PIN
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
							Creates account password, accepts compliance/data consent terms, and
							completes registration setup.
						</span>
					</div>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 4: Account Verification States */}
			<section id="verification-states" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
						<Icon icon="solar:card-search-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Account Verification States
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					Accounts transition through separate operational states to enforce
					organizational safety standards:
				</p>
				<div className="overflow-x-auto rounded-2xl border border-gray-100">
					<table className="w-full text-left text-[12px] font-semibold text-gray-500">
						<thead className="border-b border-gray-100 bg-gray-50 font-black uppercase text-gray-700">
							<tr>
								<th className="px-6 py-4">State Field</th>
								<th className="px-6 py-4">Value State</th>
								<th className="px-6 py-4">System Behavioral Meaning</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							<tr>
								<td className="px-6 py-4 font-bold text-gray-800" rowSpan={4}>
									KYC Status
								</td>
								<td className="px-6 py-4 text-gray-400">Not Started</td>
								<td className="px-6 py-4">
									No documents have been uploaded yet. Account cannot transact or
									log check-ins.
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 text-blue-500">Pending</td>
								<td className="px-6 py-4">
									Documents uploaded. Awaiting review by the Admin or supervisor
									panel.
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 text-green-500">Approved</td>
								<td className="px-6 py-4">
									Documents verified. Account is activated and allowed full
									access.
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 text-red-500">Rejected</td>
								<td className="px-6 py-4">
									Documents flagged as invalid. A comment is sent requesting
									corrections.
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 font-bold text-gray-800" rowSpan={4}>
									User Status
								</td>
								<td className="px-6 py-4 text-amber-500">Pending</td>
								<td className="px-6 py-4">
									Awaiting email OTP verification or initial registration setup.
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 text-green-500">Active</td>
								<td className="px-6 py-4">
									Account is online, verified, and operational.
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 text-red-500">Suspended</td>
								<td className="px-6 py-4">
									Account locked due to policy violation or manual suspension by
									Admin.
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 text-gray-400">Rejected</td>
								<td className="px-6 py-4">
									Account invitation has been rejected or revoked.
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
}
