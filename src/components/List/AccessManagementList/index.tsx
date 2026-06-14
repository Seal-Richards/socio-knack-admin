"use client";

import React, { useState } from "react";
import Table from "@/components/Tables";
import SearchBar from "@/components/_atoms/SearchBar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import {
	getAccessManagementColumns,
	type AccessManagementData,
} from "@/components/Tables/columns/accessManagementColumns";
import InviteTeamModal from "@/components/_modals/InviteTeamModal";
import ConfirmDeleteModal from "@/components/_modals/ConfirmDeleteModal";
import DynamicFilter from "@/components/_atoms/DynamicFilter";
import {
	useGetAdmins,
	useGetSupervisors,
	useGetStaff,
	useUpdateUserRole,
	useGetInvitations,
	useCancelInvitation,
	useDeleteInvitation,
	useRevokeTeamAccess,
} from "@/hooks/useTeam";
import { toast } from "@/lib/toast";
import Pagination from "@/components/_atoms/Pagination";

type RawTeamUser = {
	id?: string;
	_id?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	city?: string;
	state?: string;
	status?: string;
	avatar?: string;
	position?: string | null;
};

const toStatus = (raw?: string): "Active" | "Inactive" =>
	raw === "active" ? "Active" : "Inactive";

export default function AccessManagementList() {
	const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [filterType, setFilterType] = useState("all");
	const [selectedStatus, setSelectedStatus] = useState<string>();
	const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>();
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	// Local temporary state for modified roles before saving
	const [tempRoles, setTempRoles] = useState<Record<string | number, string>>({});

	// Fetch team lists dynamically from backend
	const { data: adminsRes, isLoading: isLoadingAdmins } = useGetAdmins();
	const { data: supervisorsRes, isLoading: isLoadingSupervisors } = useGetSupervisors();
	const { data: staffRes, isLoading: isLoadingStaff } = useGetStaff();
	const { data: invitationsRes, isLoading: isLoadingInvitations } = useGetInvitations();

	// Hook to update user role
	const updateRoleMutation = useUpdateUserRole();

	// Cancel/Delete/Revoke mutations
	const cancelMutation = useCancelInvitation();
	const deleteMutation = useDeleteInvitation();
	const revokeMutation = useRevokeTeamAccess();

	// State for reusable custom ConfirmDeleteModal
	const [confirmModal, setConfirmModal] = useState<{
		isOpen: boolean;
		type: "cancel" | "delete" | "revoke" | null;
		id: string | number | null;
	}>({
		isOpen: false,
		type: null,
		id: null,
	});

	const handleCancelInvite = (id: string | number) => {
		setConfirmModal({
			isOpen: true,
			type: "cancel",
			id,
		});
	};

	const handleDeleteInvite = (id: string | number) => {
		setConfirmModal({
			isOpen: true,
			type: "delete",
			id,
		});
	};

	const handleRevokeAccess = (id: string | number) => {
		setConfirmModal({
			isOpen: true,
			type: "revoke",
			id,
		});
	};

	const handleConfirmAction = () => {
		const { type, id } = confirmModal;
		if (!id || !type) return;

		if (type === "cancel") {
			cancelMutation
				.mutateAsync(String(id))
				.then((res) => {
					if (res.success) toast.success(res.message);
					else toast.error(res.message);
					setConfirmModal({ isOpen: false, type: null, id: null });
				})
				.catch((err: unknown) => {
					toast.error(err instanceof Error ? err.message : "Failed to cancel invitation");
				});
		} else if (type === "delete") {
			deleteMutation
				.mutateAsync(String(id))
				.then((res) => {
					if (res.success) toast.success(res.message);
					else toast.error(res.message);
					setConfirmModal({ isOpen: false, type: null, id: null });
				})
				.catch((err: unknown) => {
					toast.error(err instanceof Error ? err.message : "Failed to delete invitation");
				});
		} else if (type === "revoke") {
			revokeMutation
				.mutateAsync(String(id))
				.then((res) => {
					if (res.success) toast.success(res.message);
					else toast.error(res.message);
					setConfirmModal({ isOpen: false, type: null, id: null });
				})
				.catch((err: unknown) => {
					toast.error(err instanceof Error ? err.message : "Failed to revoke access");
				});
		}
	};

	const handleSave = async (userId: string | number, role: string) => {
		try {
			// Convert front-end rawRole ("admin", "supervisor", "staff") to BE role ("admin", "supervisor", "staffs")
			const beRole = role === "staff" ? "staffs" : role;
			const res = await updateRoleMutation.mutateAsync({
				userId: String(userId),
				role: beRole,
			});
			if (res.success) {
				toast.success(res.message);
				// Clear temporary selection state for this user
				setTempRoles((prev) => {
					const next = { ...prev };
					delete next[userId];
					return next;
				});
			} else {
				toast.error(res.message);
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "Failed to save permission");
		}
	};

	const handleSaveClick = (userId: string | number, role: string) => {
		handleSave(userId, role).catch((err) => console.error(err));
	};

	// Format and merge data
	const admins = (adminsRes?.data || []).map((u) => {
		const typedUser = u as RawTeamUser;
		const city = typedUser.city || "";
		const state = typedUser.state || "";
		const location = city ? `${city}, ${state}` : "Lagos Mainland";

		return {
			id: typedUser.id || typedUser._id || Math.random().toString(),
			name: `${typedUser.firstName || ""} ${typedUser.lastName || ""}`.trim(),
			email: typedUser.email || "",
			location,
			role: "Admin",
			status: toStatus(typedUser.status),
			avatar: typedUser.avatar || "/assets/images/admin-avatar.png",
			rawRole: "admin" as const,
		};
	});

	const supervisors = (supervisorsRes?.data || []).map((u) => {
		const typedUser = u as RawTeamUser;
		const city = typedUser.city || "";
		const state = typedUser.state || "";
		const location = city ? `${city}, ${state}` : "Lagos Mainland";

		return {
			id: typedUser.id || typedUser._id || Math.random().toString(),
			name: `${typedUser.firstName || ""} ${typedUser.lastName || ""}`.trim(),
			email: typedUser.email || "",
			location,
			role: "Supervisor",
			status: toStatus(typedUser.status),
			avatar: typedUser.avatar || "/assets/images/admin-avatar.png",
			rawRole: "supervisor" as const,
		};
	});

	const staffs = (staffRes?.data || []).map((u) => {
		const typedUser = u as RawTeamUser;
		const city = typedUser.city || "";
		const state = typedUser.state || "";
		const location = city ? `${city}, ${state}` : "Lagos Mainland";

		return {
			id: typedUser.id || typedUser._id || Math.random().toString(),
			name: `${typedUser.firstName || ""} ${typedUser.lastName || ""}`.trim(),
			email: typedUser.email || "",
			location,
			role: "Staff",
			position: typedUser.position || "Region Manager",
			status: toStatus(typedUser.status),
			avatar: typedUser.avatar || "/assets/images/admin-avatar.png",
			rawRole: "staff" as const,
		};
	});

	const invitations = (invitationsRes?.data || []).map((inv) => {
		return {
			id: inv._id || Math.random().toString(),
			name: "Invited Member",
			email: inv.email || "",
			location: "-",
			role: (() => {
				if (inv.role === "staff" || inv.role === "staffs") return "Staff";
				if (inv.role === "supervisor") return "Supervisor";
				return "Admin";
			})(),
			position: inv.position || undefined,
			status: inv.status === "cancelled" ? ("Cancelled" as const) : ("Pending" as const),
			avatar: "/assets/images/admin-avatar.png",
			rawRole:
				inv.role === "staffs"
					? ("staff" as const)
					: (inv.role as "admin" | "supervisor" | "staff"),
		};
	});

	const combinedTeam: (AccessManagementData & { rawRole: string })[] = [
		...admins,
		...supervisors,
		...staffs,
		...invitations,
	];

	// Filter team members based on search queries and selected filters
	let filteredTeam = combinedTeam.filter((u) => {
		const matchesSearch =
			u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			u.email.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesStatus =
			!selectedStatus ||
			selectedStatus === "all" ||
			u.status.toLowerCase() === selectedStatus.toLowerCase();

		const matchesRole =
			!selectedRoleFilter ||
			selectedRoleFilter === "all" ||
			u.rawRole.toLowerCase() === selectedRoleFilter.toLowerCase();

		return matchesSearch && matchesStatus && matchesRole;
	});

	// Handle Alphabetical sorting
	if (filterType === "az") {
		filteredTeam = [...filteredTeam].sort((a, b) => a.name.localeCompare(b.name));
	}

	// Pagination Math
	const totalPages = Math.max(1, Math.ceil(filteredTeam.length / itemsPerPage));
	const paginatedTeam = filteredTeam.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	// Reset page counter
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1);
	};

	const handleStatusSelect = (val?: string) => {
		setSelectedStatus(val);
		setCurrentPage(1);
	};

	const handleRoleSelect = (val?: string) => {
		setSelectedRoleFilter(val);
		setCurrentPage(1);
	};
	const isLoading =
		isLoadingAdmins || isLoadingSupervisors || isLoadingStaff || isLoadingInvitations;

	// Construct dynamic columns passing callback and temporary state
	const columns = getAccessManagementColumns(
		tempRoles,
		setTempRoles,
		handleSaveClick,
		updateRoleMutation.isPending,
		handleCancelInvite,
		handleDeleteInvite,
		handleRevokeAccess,
	);

	return (
		<div className="flex flex-col gap-6 text-gray-800">
			<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
				<div className="mb-10 flex flex-wrap items-center justify-between gap-6">
					<h3 className="text-[17px] font-bold text-gray-800">
						Team Access & Permissions
					</h3>
					<div className="flex flex-wrap items-center gap-4">
						<SearchBar
							placeholder="Search"
							value={searchQuery}
							onChange={handleSearchChange}
							containerClassName="w-64 h-12"
						/>
						<div className="flex items-center gap-2 rounded-xl border border-gray-100 p-1">
							<button className="flex size-10 items-center justify-center rounded-lg text-gray-400 transition-all hover:bg-gray-50">
								<Icon icon="solar:filter-bold" className="size-5" />
							</button>
						</div>
						<div className="flex items-center gap-1.5 rounded-xl border border-gray-100 p-1">
							<button
								onClick={() => setFilterType("all")}
								className={`h-9 rounded-lg px-4 text-[13px] font-bold transition-all ${
									filterType === "all"
										? "bg-[#1d4ea8] text-white shadow-md"
										: "text-gray-500 hover:bg-gray-50"
								}`}
							>
								All
							</button>
							<button
								onClick={() => setFilterType("az")}
								className={`h-9 rounded-lg px-4 text-[13px] font-bold transition-all ${
									filterType === "az"
										? "bg-[#1d4ea8] text-white shadow-md"
										: "text-gray-500 hover:bg-gray-50"
								}`}
							>
								A-Z
							</button>
						</div>
						<DynamicFilter
							label="Status"
							options={[
								{ label: "All Status", value: "all" },
								{ label: "Active", value: "active" },
								{ label: "Inactive", value: "inactive" },
								{ label: "Pending", value: "pending" },
								{ label: "Cancelled", value: "cancelled" },
							]}
							selected={selectedStatus}
							onSelect={handleStatusSelect}
							className="h-11 border-gray-100"
						/>
						<DynamicFilter
							label="Role"
							options={[
								{ label: "All Roles", value: "all" },
								{ label: "Admin", value: "admin" },
								{ label: "Supervisor", value: "supervisor" },
								{ label: "Staff", value: "staff" },
							]}
							selected={selectedRoleFilter}
							onSelect={handleRoleSelect}
							className="h-11 border-gray-100"
						/>
						<Button
							onClick={() => setIsInviteModalOpen(true)}
							className="h-11 gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-6 text-[13px] font-bold text-[#1d4ea8] shadow-none transition-all hover:bg-blue-50 active:scale-95"
						>
							<Icon icon="lucide:plus-circle" className="size-4" />
							Invite Team Member
						</Button>
					</div>
				</div>

				<div className="overflow-hidden">
					{isLoading ? (
						<div className="flex h-40 items-center justify-center">
							<div className="size-8 animate-spin rounded-full border-4 border-[#1d4ea8] border-t-transparent" />
						</div>
					) : (
						<>
							<Table
								columns={columns}
								data={paginatedTeam}
								emptyState={{
									title: "No Team Members",
									description:
										"We couldn't find any team members matching your filters.",
									icon: "solar:users-group-two-rounded-bold-duotone",
								}}
							/>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={setCurrentPage}
								className="mt-4"
							/>
						</>
					)}
				</div>
			</div>
			<InviteTeamModal
				isOpen={isInviteModalOpen}
				onClose={() => setIsInviteModalOpen(false)}
			/>

			<ConfirmDeleteModal
				isOpen={confirmModal.isOpen}
				onClose={() => setConfirmModal({ isOpen: false, type: null, id: null })}
				onConfirm={handleConfirmAction}
				isLoading={
					cancelMutation.isPending || deleteMutation.isPending || revokeMutation.isPending
				}
				title={(() => {
					if (confirmModal.type === "cancel") return "Cancel Invitation";
					if (confirmModal.type === "delete") return "Delete Invitation";
					if (confirmModal.type === "revoke") return "Revoke Team Access";
					return "";
				})()}
				description={(() => {
					if (confirmModal.type === "cancel") {
						return "Are you sure you want to cancel this invitation?";
					}
					if (confirmModal.type === "delete") {
						return "Are you sure you want to delete this cancelled invitation? This action cannot be undone.";
					}
					if (confirmModal.type === "revoke") {
						return "Are you sure you want to revoke this team member's access? All associated tasks, zones, and logs will fall back to the business owner/admin.";
					}
					return "";
				})()}
				confirmText={(() => {
					if (confirmModal.type === "cancel") return "Yes, Cancel";
					if (confirmModal.type === "delete") return "Yes, Delete";
					if (confirmModal.type === "revoke") return "Yes, Revoke";
					return undefined;
				})()}
				loadingText={(() => {
					if (confirmModal.type === "cancel") return "Cancelling...";
					if (confirmModal.type === "delete") return "Deleting...";
					if (confirmModal.type === "revoke") return "Revoking...";
					return undefined;
				})()}
			/>
		</div>
	);
}
