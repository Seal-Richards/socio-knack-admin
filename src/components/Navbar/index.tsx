// src/components/Navbar/index.tsx

"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";
import { Icon } from "@iconify/react";

export default function Navbar() {
	return (
		<div className="sticky top-0 z-40 w-full">
			{/* Banner */}
			<div className="flex h-10 w-full items-center justify-center bg-[#ffe4e6] px-4 text-center text-[13px] font-medium text-red-600">
				Enable 2FA to keep your account and data secured
			</div>

			<header className="flex h-20 items-center justify-between border-b border-gray-100 bg-white px-8">
				<div className="flex items-center gap-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="lg:hidden">
								<Menu className="size-6 text-gray-900" />
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-[300px] border-r-0 p-0">
							<Sidebar className="flex w-full" />
						</SheetContent>
					</Sheet>

					<div className="flex items-center gap-2 text-[#1d4ea8]">
						<Icon icon="lucide:arrow-right" className="size-5 rotate-180 opacity-60" />
						<h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
					</div>
				</div>

				<div className="flex items-center gap-5">
					<button className="flex size-11 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm hover:bg-gray-50">
						<Search className="size-5 text-gray-400" />
					</button>

					<button className="relative flex size-11 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm hover:bg-gray-50">
						<Bell className="size-5 text-gray-400" />
						<span className="absolute right-3 top-3 size-2.5 rounded-full border-2 border-white bg-red-500" />
					</button>

					<div className="ml-2 flex items-center gap-3">
						<Avatar className="size-11 border-2 border-orange-200">
							<AvatarImage src="/assets/images/admin-avatar.png" alt="Admin" />
							<AvatarFallback className="font-bold">VK</AvatarFallback>
						</Avatar>
					</div>
				</div>
			</header>
		</div>
	);
}
