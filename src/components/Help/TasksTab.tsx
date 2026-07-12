"use client";

import React from "react";
import { Icon } from "@iconify/react";

export default function TasksTab() {
	return (
		<div className="flex flex-col gap-10">
			{/* Section 1: Scheduling Visits/Tasks */}
			<section id="scheduling" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#1d4ea8]">
						<Icon icon="solar:calendar-date-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Scheduling Visits/Tasks
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					Admins and Supervisors can schedule customer visits or field tasks. Setting up a
					task requires the following properties:
				</p>
				<div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
					<span className="text-[13px] font-extrabold text-gray-800">
						Task Setup Attributes:
					</span>
					<ul className="list-disc space-y-2 pl-5 text-[12px] font-semibold text-gray-500">
						<li>
							<strong>Agent Assignee:</strong> The agent assigned to complete the
							visit.
						</li>
						<li>
							<strong>Territory / Zone:</strong> Links the task to an established
							geographic region.
						</li>
						<li>
							<strong>Target Location:</strong> Explicit coordinates{" "}
							<code>[longitude, latitude]</code> where the visit occurs.
						</li>
						<li>
							<strong>Priority:</strong> Classified as <code>low</code>,{" "}
							<code>medium</code>, or <code>high</code>.
						</li>
						<li>
							<strong>Incentive Payout:</strong> Defines if the visit earns a flat fee
							or percentage of sales volume. Defaults to the zone or business default
							policy if not customized.
						</li>
					</ul>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 2: Approval Flow */}
			<section id="approval-flow" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
						<Icon icon="solar:clipboard-check-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Supervisor Review & Approval
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					To ensure quality control, tasks scheduled undergo an automated approval flow:
				</p>
				<div className="flex items-start gap-4 rounded-2xl border border-green-100 bg-green-50/20 p-5">
					<Icon
						icon="solar:shield-check-bold-duotone"
						className="mt-0.5 size-5 shrink-0 text-green-600"
					/>
					<div className="flex flex-col gap-1">
						<span className="text-[13px] font-extrabold text-green-700">
							Audit Flow Steps
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-green-600/90">
							Scheduled tasks remain in a <code>pending</code> (inactive) state until
							approved by an administrator or supervisor of the same business. Once
							approved, they transition to <code>upcoming</code> and become visible to
							the agent on their mobile application.
						</span>
					</div>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 3: Territories */}
			<section id="territories" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
						<Icon icon="solar:map-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Territory Control & Bounds
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					Administrators define operational regions on the map by drawing custom geometric
					boundaries:
				</p>
				<div className="mt-2 space-y-4">
					<div className="flex items-start gap-4">
						<Icon
							icon="solar:map-arrow-left-bold-duotone"
							className="mt-0.5 size-5 shrink-0 text-[#1d4ea8]"
						/>
						<div className="flex flex-col gap-0.5">
							<span className="text-[14px] font-bold text-gray-800">
								Geofence Construction
							</span>
							<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
								Uses standard GeoJSON polygons to establish territory limits. Admins
								customize the fill color and name of each territory.
							</span>
						</div>
					</div>
					<div className="flex items-start gap-4">
						<Icon
							icon="solar:user-speak-bold-duotone"
							className="mt-0.5 size-5 shrink-0 text-[#1d4ea8]"
						/>
						<div className="flex flex-col gap-0.5">
							<span className="text-[14px] font-bold text-gray-800">
								Assigning Supervisors
							</span>
							<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
								Each territory must be assigned a supervisor. This supervisor gains
								the authority to schedule visits, verify check-ins, and inspect
								agents active in that zone.
							</span>
						</div>
					</div>
				</div>
			</section>

			<hr className="border-gray-100" />

			{/* Section 4: Map Tracking */}
			<section id="map-tracking" className="flex scroll-mt-24 flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
						<Icon icon="solar:streets-navigation-bold-duotone" className="size-6" />
					</div>
					<h3 className="text-[20px] font-black tracking-tight text-gray-900">
						Real-time Map Tracking
					</h3>
				</div>
				<p className="text-[14px] font-semibold leading-relaxed text-gray-600">
					The map interface visualizes the location coordinates of the active workforce:
				</p>
				<div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2">
					<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
						<span className="text-[14px] font-extrabold text-gray-800">
							Live Agent Positions
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
							Retrieves the last known coordinates of agents through mobile check-in
							updates. Displays green markers for online agents and orange markers for
							idle/offline agents.
						</span>
					</div>
					<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
						<span className="text-[14px] font-extrabold text-gray-800">
							Check-in Verification
						</span>
						<span className="text-[12px] font-semibold leading-relaxed text-gray-500">
							Verifies if the agent is physically inside the geofenced boundary when
							executing a check-in. If an agent checks in outside the boundary, the
							task logs a warning flag.
						</span>
					</div>
				</div>
			</section>
		</div>
	);
}
