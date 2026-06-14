// src/components/Navbar/index.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/_atoms/SearchBar";
import { Icon } from "@iconify/react";
import Breadcrumbs from "@/components/_atoms/Breadcrumbs";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useGetMe } from "@/hooks/useProfile";
import {
	useGetNotifications,
	useMarkAllNotificationsAsRead,
	useMarkNotificationAsRead,
	useDeleteNotification,
	useClearAllNotifications,
} from "@/hooks/useNotification";

export default function Navbar() {
	const { data: session } = useSession();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Fetch live profile via GET /auth/me — works for all roles
	const { data: ownProfileRes } = useGetMe();
	const profileData = ownProfileRes?.data;

	// Fetch notifications
	const { data: notificationsRes } = useGetNotifications();
	const notifications = notificationsRes?.data || [];
	const unreadNotifications = notifications.filter((n) => !n.isRead);
	const unreadCount = unreadNotifications.length;

	const { mutate: markAllAsRead } = useMarkAllNotificationsAsRead();
	const { mutate: markAsRead } = useMarkNotificationAsRead();
	const { mutate: deleteNotification } = useDeleteNotification();
	const { mutate: clearAll } = useClearAllNotifications();

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Use backend avatar first, fall back to session image, then null (shows icon)
	const avatarSrc = profileData?.avatar ?? session?.user?.image ?? null;
	const displayName = session?.user?.name ?? "User";

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

						{/* Notification Dropdown */}
						<div className="relative" ref={dropdownRef}>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setIsOpen(!isOpen)}
								className="relative size-10 rounded-full bg-gray-50/50 hover:bg-gray-100"
							>
								<Icon
									icon="solar:bell-bing-linear"
									className="size-5 text-gray-500"
								/>
								{unreadCount > 0 && (
									<span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full border border-white bg-red-500 text-[10px] font-bold text-white">
										{unreadCount}
									</span>
								)}
							</Button>

							{isOpen && (
								<div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl ring-1 ring-black/5">
									<div className="flex items-center justify-between border-b border-gray-50 bg-gray-50/50 p-4">
										<h4 className="text-sm font-semibold text-gray-800">
											Notifications
										</h4>
										{notifications.length > 0 && (
											<div className="flex items-center gap-3">
												{unreadCount > 0 && (
													<button
														onClick={() => markAllAsRead()}
														className="text-xs font-medium text-[#1d4ea8] hover:underline"
													>
														Mark all
													</button>
												)}
												<button
													onClick={() => clearAll()}
													className="text-xs font-medium text-red-500 hover:underline"
												>
													Clear all
												</button>
											</div>
										)}
									</div>
									<div className="max-h-64 divide-y divide-gray-50 overflow-y-auto">
										{notifications.length === 0 ? (
											<div className="p-6 text-center text-xs text-gray-400">
												No notifications yet
											</div>
										) : (
											notifications.map((notif) => (
												<div
													key={notif._id}
													className={`group relative block w-full p-4 text-left transition-colors hover:bg-gray-50 ${
														!notif.isRead ? "bg-[#1d4ea8]/5" : ""
													}`}
												>
													<div className="flex items-start justify-between gap-2">
														<p
															className={`text-xs ${!notif.isRead ? "font-semibold text-gray-900" : "text-gray-600"}`}
														>
															{notif.title}
														</p>
														<div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
															{!notif.isRead && (
																<button
																	type="button"
																	onClick={() =>
																		markAsRead(notif._id)
																	}
																	className="text-[#1d4ea8] transition-colors hover:text-[#153a82]"
																	title="Mark as read"
																>
																	<Icon
																		icon="solar:check-circle-bold"
																		className="size-4"
																	/>
																</button>
															)}
															<button
																type="button"
																onClick={() =>
																	deleteNotification(notif._id)
																}
																className="text-red-400 transition-colors hover:text-red-600"
																title="Delete"
															>
																<Icon
																	icon="solar:trash-bin-trash-bold"
																	className="size-4"
																/>
															</button>
														</div>
														{!notif.isRead && (
															<span className="mt-1 size-2 shrink-0 rounded-full bg-blue-600 group-hover:hidden" />
														)}
													</div>
													<p className="mt-1 pr-8 text-[11px] leading-relaxed text-gray-500">
														{notif.message}
													</p>
													<p className="mt-1 text-[9px] text-gray-400">
														{new Date(
															notif.createdAt,
														).toLocaleDateString()}{" "}
														at{" "}
														{new Date(
															notif.createdAt,
														).toLocaleTimeString([], {
															hour: "2-digit",
															minute: "2-digit",
														})}
													</p>
												</div>
											))
										)}
									</div>
								</div>
							)}
						</div>

						{/* Profile Avatar */}
						<div className="ml-1 flex items-center gap-3">
							<div className="relative flex size-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#1d4ea8]/10 bg-gray-100 shadow-sm ring-2 ring-white">
								{avatarSrc ? (
									<Image
										src={avatarSrc}
										alt={displayName}
										fill
										className="object-cover"
									/>
								) : (
									<Icon icon="solar:user-bold" className="size-6 text-gray-400" />
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
