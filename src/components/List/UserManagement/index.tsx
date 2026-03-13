"use client";

import React, { useState } from "react";
import UserManagementList from "../UserManagementList";
import AdminManagementList from "../AdminManagementList";

const USER_TABS = [
	{ id: "agent", label: "Agent" },
	{ id: "admin", label: "Admin" },
];

export default function UserManagement() {
	const [activeTab, setActiveTab] = useState("agent");

	return (
		<div className="flex flex-col gap-6">
			<div className="flex w-full overflow-hidden rounded-[2rem] bg-gray-50/50 p-2 lg:w-fit">
				{USER_TABS.map((tab) => {
					const isActive = activeTab === tab.id;
					return (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex h-10 min-w-32 items-center justify-center rounded-3xl text-[14px] font-bold transition-all duration-200 ${
								isActive
									? "bg-white text-[#1d4ea8] shadow-sm"
									: "text-gray-400 hover:text-gray-600"
							}`}
						>
							{tab.label}
						</button>
					);
				})}
			</div>

			<div className="mt-2">
				{activeTab === "agent" ? <UserManagementList /> : <AdminManagementList />}
			</div>
		</div>
	);
}
