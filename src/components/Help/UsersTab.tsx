"use client";

import React from "react";
import { Icon } from "@iconify/react";

export default function UsersTab() {
	return (
		<div className="flex flex-col gap-10">
			{/* Section 1: User Roles */}
			<section id="roles" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#1d4ea8]">
						<Icon
							icon="solar:users-group-two-rounded-bold-duotone"
							className="size-6"
						/>
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						User Roles & Permissions
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					SocioKnack operates with fine-grained role structures to isolate access
					privileges:
				</p>
				<div className="mt-2 overflow-x-auto rounded-2xl border border-gray-100">
					<table className="w-full text-left text-[12px] font-semibold text-gray-500">
						<thead className="border-b border-gray-100 bg-gray-50 font-black uppercase text-gray-700">
							<tr>
								<th className="px-6 py-4">Role Title</th>
								<th className="px-6 py-4">Allowed System Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							<tr>
								<td className="px-6 py-4 font-bold text-gray-800">
									Business Owner (Admin)
								</td>
								<td className="px-6 py-4 leading-relaxed">
									Full system configurations, setup bank settlement details,
									create inventory/products, manage subscriptions, modify
									roles/status, approve payout payrolls, delete users.
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 font-bold text-gray-800">Supervisor</td>
								<td className="px-6 py-4 leading-relaxed">
									Create/manage territories of the business, assign agents to
									territories, schedule visits/tasks, review and approve agent
									visit reports, toggle KYC status.
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 font-bold text-gray-800">Staffs</td>
								<td className="px-6 py-4 leading-relaxed">
									Supports supervisors and admins. Can view maps, check-ins,
									listing data, and participate in scheduling, but cannot delete
									users or approve payouts.
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 font-bold text-gray-800">Agent</td>
								<td className="px-6 py-4 leading-relaxed">
									Mobile application users executing scheduled customer visits,
									logging check-ins, reporting product sales, and collecting
									payments.
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 2: Role Upgrades */}
			<section id="upgrades" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
						<Icon icon="solar:user-rounded-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Role Upgrade Flow
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					Workspace Administrators can elevate team members to acquire administrative
					status:
				</p>
				<div className="flex items-start gap-4 rounded-2xl border border-[#1d4ea8]/10 bg-[#1d4ea8]/5 p-5">
					<Icon
						icon="solar:crown-bold-duotone"
						className="mt-0.5 size-5 shrink-0 text-[#1d4ea8]"
					/>
					<div className="flex flex-col gap-1">
						<span className="text-[13px] font-extrabold text-[#1d4ea8]">
							Elevation Rules
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-600">
							When an Admin upgrades a staff or supervisor to <code>admin</code> in
							the Access Management panel, their original login credentials remain
							intact. However, they gain complete read/write access to business
							settings, banks, and payout approvals. Downgrading the original Business
							Owner is strictly blocked.
						</span>
					</div>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 3: Suspensions */}
			<section id="suspension" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
						<Icon icon="solar:shield-warning-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Suspension & Incident Logging
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					To handle security violations, administrators can toggle the status of any user
					to <strong>Suspended</strong>:
				</p>
				<div className="flex items-start gap-4 rounded-2xl border border-amber-100 bg-amber-50/20 p-5">
					<Icon
						icon="solar:bell-bing-bold-duotone"
						className="mt-0.5 size-5 shrink-0 text-amber-600"
					/>
					<div className="flex flex-col gap-1">
						<span className="text-[13px] font-extrabold text-amber-700">
							Incident Creation
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-amber-600/90">
							Suspending an account automatically creates an <strong>Incident</strong>{" "}
							log in the database. This records the action initiator name, target
							email, role, and the suspension comment/reason. The target user is
							instantly blocked from logging in or calling API endpoints.
						</span>
					</div>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 4: Cascade Deletions */}
			<section id="cascade-deletion" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
						<Icon icon="solar:trash-bin-trash-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Cascade Deletion & Reassignment
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					When deleting a user (e.g. deleting an agent who has left the organization), the
					system executes a safe cascading transaction:
				</p>
				<div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2">
					<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
						<span className="text-[14px] font-extrabold text-gray-800">
							Cascade Cleanup
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
							The agent is pulled out of all assigned territories. Their wallet, bank
							links, and activity sessions are deleted. An Incident log of type{" "}
							<code>Account Deletion</code> is generated to track compliance.
						</span>
					</div>
					<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
						<span className="text-[14px] font-extrabold text-gray-800">
							History Retention
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
							To prevent loss of business audit trails, all historical tasks/visits,
							check-in reports, and payout transactions previously associated with the
							deleted agent are automatically reassigned to the Business Owner
							(Admin).
						</span>
					</div>
				</div>
			</section>
		</div>
	);
}
