"use client";

import React from "react";
import { Icon } from "@iconify/react";

export default function FinanceTab() {
	return (
		<div className="flex flex-col gap-10">
			{/* Section 1: Transaction Ledger */}
			<section id="logs" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#1d4ea8]">
						<Icon icon="solar:wallet-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Transaction Ledger Logs
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					The <strong>Financial Ledger Hub</strong> tracks all credit and debit activities
					across the business workspace. Each log records:
				</p>
				<div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
					<span className="font-sans text-[13px] font-extrabold text-gray-800">
						Transaction Attributes:
					</span>
					<ul className="list-disc space-y-2 pl-5 text-[12px] font-semibold text-gray-500">
						<li>
							<strong>Type:</strong> Classified as <code>credit</code> (incoming
							funding/sales) or <code>debit</code> (payouts/expenditures).
						</li>
						<li>
							<strong>Category:</strong> Common classifications include:
							<ul className="list-circle mt-1 space-y-1 pl-5">
								<li>
									<code>walletTopup</code> - Business workspace wallet deposits.
								</li>
								<li>
									<code>incentivePayout</code> - Earned commission payouts
									transferred to agents.
								</li>
								<li>
									<code>subscriptionFee</code> - Recurring SocioKnack platform
									charges.
								</li>
							</ul>
						</li>
						<li>
							<strong>Status:</strong> States include <code>successful</code>,{" "}
							<code>pending</code>, and <code>failed</code>.
						</li>
					</ul>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 2: Payout Approvals */}
			<section id="payouts" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
						<Icon icon="solar:cash-out-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Supervisor Payout Approval
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					Field agents accumulate incentive balances in their mobile wallets based on
					approved sales reports. Supervisors approve or reject these:
				</p>
				<div className="flex items-start gap-4 rounded-2xl border border-green-100 bg-green-50/20 p-5">
					<Icon
						icon="solar:round-transfer-horizontal-bold-duotone"
						className="mt-0.5 size-5 shrink-0 text-green-600"
					/>
					<div className="flex flex-col gap-1">
						<span className="font-sans text-[13px] font-extrabold text-green-700">
							Incentive Distribution
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-green-600/90">
							When an agent completes a visit, they submit a report. The system
							calculates the incentive (flat fee or percentage) and places the
							transaction as <strong>Pending Approval</strong>. Supervisors review the
							report details and check-in bounds. Once approved, the funds are
							instantly credited to the agent&apos;s virtual balance.
						</span>
					</div>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 3: Wallet & Settlement */}
			<section id="wallet" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
						<Icon icon="solar:banknote-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Wallet & Settlement Bank
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					Financial payouts and collections are settled using the settlement bank
					integration:
				</p>
				<div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2">
					<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
						<span className="text-[14px] font-extrabold text-gray-800">
							Fincra Virtual Accounts
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
							The system sets up Fincra virtual account numbers for businesses and
							agents to handle incoming wire transfers. Outgoing payouts are debited
							from the business wallet and sent directly to linked accounts.
						</span>
					</div>
					<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
						<span className="text-[14px] font-extrabold text-gray-800">
							Settlement Bank Verification
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
							Business owners link their bank details by inputting account number,
							bank code, and BVN. The system verifies names via BVN matching to
							prevent payout errors or fraud.
						</span>
					</div>
				</div>
			</section>
		</div>
	);
}
