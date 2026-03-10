// src/components/Navbar/index.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/_atoms/SearchBar";
import { Icon } from "@iconify/react";
import Breadcrumbs from "@/components/_atoms/Breadcrumbs";
import Image from "next/image";

export default function Navbar() {
	return (
		<header className="sticky top-0 z-40 flex h-20 w-full items-center border-b border-gray-100 bg-white/80 px-4 backdrop-blur-md lg:h-24 lg:px-8">
			<div className="flex w-full items-center justify-between">
				{/* Left: Mobile Menu + Dynamic Breadcrumbs */}
				<div className="flex items-center gap-3 lg:gap-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="size-10 lg:hidden">
								<Icon
									icon="solar:hamburger-menu-bold"
									className="size-6 text-gray-500"
								/>
							</Button>
						</SheetTrigger>
						<SheetContent
							side="left"
							className="w-[300px] border-none bg-[#1d4ea8] p-0"
						>
							<div className="sr-only">
								<SheetTitle>Navigation Menu</SheetTitle>
							</div>
							<div className="flex h-full flex-col">
								<div className="flex items-center justify-end px-4 pt-4 lg:hidden">
									<SheetClose asChild>
										<Button
											variant="ghost"
											size="icon"
											className="size-10 text-white/70 hover:bg-white/10 hover:text-white"
										>
											<Icon
												icon="solar:close-square-bold"
												className="size-8"
											/>
										</Button>
									</SheetClose>
								</div>
								<Sidebar className="flex-1" />
							</div>
						</SheetContent>
					</Sheet>
					<Breadcrumbs />
				</div>

				{/* Right: Actions */}
				<div className="flex items-center gap-2 lg:gap-4">
					<div className="hidden items-center lg:flex">
						<SearchBar placeholder="Search" containerClassName="w-64" />
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="icon"
							className="size-10 rounded-full bg-gray-50/50 hover:bg-gray-100 lg:hidden"
						>
							<Icon icon="solar:magnifer-linear" className="size-5 text-gray-500" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="relative size-10 rounded-full bg-gray-50/50 hover:bg-gray-100"
						>
							<Icon icon="solar:bell-bing-linear" className="size-5 text-gray-500" />
							<span className="absolute right-2.5 top-2.5 size-2 rounded-full border-2 border-white bg-red-500" />
						</Button>
						<div className="ml-1 flex items-center gap-3">
							<div className="relative size-10 overflow-hidden rounded-full border-2 border-[#1d4ea8]/10 shadow-sm ring-2 ring-white">
								<Image
									src="/assets/images/admin-avatar.png"
									alt="Profile"
									fill
									className="object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
