import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Icon } from "@iconify/react";
import DynamicAvatar from "@/components/_atoms/DynamicAvatar";
import { Button } from "@/components/ui/button";
import { useGetMe } from "@/hooks/useProfile";
import { useUpdateVisit } from "@/hooks/useDashboard";
import { useGetAgents } from "@/hooks/useAgent";
import { useGetTerritories } from "@/hooks/useTerritory";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { toast } from "sonner";

type AgentDetails = {
	_id?: string;
	id?: string;
	firstName?: string;
	lastName?: string;
	avatar?: string;
};

type CreatorDetails = {
	_id?: string;
	id?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
};

type VisitRecord = {
	_id?: string;
	id?: string;
	title?: string;
	scheduledDate?: string;
	status?: string;
	priority?: string;
	agentId?: AgentDetails | string;
	territoryId?:
		| {
				_id?: string;
				id?: string;
				name?: string;
				assignedSupervisor?: CreatorDetails | string;
		  }
		| string;
	location?: { address?: string; coordinates?: number[] };
	createdBy?: CreatorDetails | string;
	report?: {
		saleDetails?: {
			saleValue?: number;
			amount?: number;
			paymentMode?: string;
		};
	};
	isScheduleApproved?: boolean;
};

type VisitDetailsModalProps = {
	isOpen: boolean;
	onClose: () => void;
	visit: VisitRecord | null;
};

type ComboAgent = {
	_id?: string;
	id?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
};

type ComboTerritory = {
	_id?: string;
	id?: string;
	name?: string;
};

const GOOGLE_MAPS_LIBRARIES: ("drawing" | "places")[] = ["drawing", "places"];

export default function VisitDetailsModal({ isOpen, onClose, visit }: VisitDetailsModalProps) {
	const { data: meRes } = useGetMe();
	const currentUser = meRes?.data;
	const updateVisitMutation = useUpdateVisit();

	const { data: territoriesRes } = useGetTerritories();
	const territories = territoriesRes?.data || [];

	const { data: agentsRes } = useGetAgents();
	const agents = agentsRes?.data || [];

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || "",
		libraries: GOOGLE_MAPS_LIBRARIES,
		version: "3.64",
	});

	const [isEditing, setIsEditing] = React.useState(false);
	const [title, setTitle] = React.useState("");
	const [scheduledDate, setScheduledDate] = React.useState("");

	const [timeHour, setTimeHour] = React.useState("10");
	const [timeMinute, setTimeMinute] = React.useState("00");
	const [timePeriod, setTimePeriod] = React.useState("AM");

	const [priority, setPriority] = React.useState("medium");
	const [agentId, setAgentId] = React.useState("");
	const [territoryId, setTerritoryId] = React.useState("");
	const [address, setAddress] = React.useState("");
	const [coordinates, setCoordinates] = React.useState<number[]>([]);

	const [autocomplete, setAutocomplete] = React.useState<google.maps.places.Autocomplete | null>(
		null,
	);

	React.useEffect(() => {
		if (visit) {
			setTitle(visit.title || "");
			const dt = new Date(visit.scheduledDate || new Date().toISOString());
			setScheduledDate(dt.toISOString().split("T")[0] || "");

			let hr = dt.getHours();
			const min = dt.getMinutes();
			const period = hr >= 12 ? "PM" : "AM";
			hr %= 12;
			hr = hr || 12;
			setTimeHour(String(hr));
			setTimeMinute(String(min).padStart(2, "0"));
			setTimePeriod(period);

			const aId =
				typeof visit.agentId === "object"
					? visit.agentId?._id || visit.agentId?.id
					: visit.agentId;
			setAgentId(aId || "");

			const tId =
				typeof visit.territoryId === "object"
					? visit.territoryId?._id || visit.territoryId?.id
					: visit.territoryId;
			setTerritoryId(tId || "");

			setAddress(visit.location?.address || "");
			setCoordinates(visit.location?.coordinates || []);
			setIsEditing(false);
		}
	}, [visit]);

	const isAdmin = currentUser && ["admin", "superadmin", "staffs"].includes(currentUser.role);

	const canEditOrCancel = React.useMemo(() => {
		if (!currentUser || !visit) return false;
		if (isAdmin) return true;
		if (currentUser.role === "supervisor") {
			const creatorObj = typeof visit.createdBy === "object" ? visit.createdBy : null;
			let creatorId: string | undefined;
			if (creatorObj) {
				creatorId = creatorObj._id || creatorObj.id;
			} else if (typeof visit.createdBy === "string") {
				creatorId = visit.createdBy;
			}

			if (creatorId === currentUser._id) return true;

			const assignedSupervisorObj =
				typeof visit.territoryId === "object" &&
				typeof visit.territoryId.assignedSupervisor === "object"
					? visit.territoryId.assignedSupervisor
					: null;

			let supervisorId: string | undefined;
			if (assignedSupervisorObj) {
				supervisorId = assignedSupervisorObj._id || assignedSupervisorObj.id;
			} else if (
				typeof visit.territoryId === "object" &&
				typeof visit.territoryId.assignedSupervisor === "string"
			) {
				supervisorId = visit.territoryId.assignedSupervisor;
			}

			if (supervisorId === currentUser._id) return true;
		}
		return false;
	}, [currentUser, visit, isAdmin]);

	if (!visit) return null;

	const isUpcoming = visit.status === "upcoming" || visit.status === "scheduled";
	const isCancelled = visit.status === "cancelled";
	const isCompleted = visit.status === "completed";

	const onAutocompleteLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
		setAutocomplete(autocompleteInstance);
	};

	const onPlaceChanged = () => {
		if (autocomplete !== null) {
			const place = autocomplete.getPlace();
			const lat = place.geometry?.location?.lat();
			const lng = place.geometry?.location?.lng();
			const formattedAddress = place.formatted_address || place.name || "";

			if (lat !== undefined && lng !== undefined) {
				setAddress(formattedAddress);
				setCoordinates([lng, lat]);
			}
		}
	};

	const handleCancelTask = async () => {
		try {
			const res = await updateVisitMutation.mutateAsync({
				visitId: visit._id || visit.id || "",
				payload: { status: "cancelled" },
			});
			if (res.success) {
				toast.success("Task cancelled successfully.");
				onClose();
			} else {
				toast.error(res.message || "Failed to cancel task.");
			}
		} catch (err) {
			const errorMsg = err instanceof Error ? err.message : "Failed to cancel task.";
			toast.error(errorMsg);
		}
	};

	const handleApproveSchedule = async () => {
		try {
			const res = await updateVisitMutation.mutateAsync({
				visitId: visit._id || visit.id || "",
				payload: { isScheduleApproved: true, status: "upcoming" },
			});
			if (res.success) {
				toast.success("Schedule approved successfully!");
				onClose();
			} else {
				toast.error(res.message || "Failed to approve schedule.");
			}
		} catch (err) {
			const errorMsg = err instanceof Error ? err.message : "Failed to approve schedule.";
			toast.error(errorMsg);
		}
	};

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			let hr24 = parseInt(timeHour, 10);
			if (timePeriod === "PM" && hr24 !== 12) {
				hr24 += 12;
			} else if (timePeriod === "AM" && hr24 === 12) {
				hr24 = 0;
			}
			const finalTimeStr = `${String(hr24).padStart(2, "0")}:${timeMinute}`;
			const isoDateStr = new Date(`${scheduledDate}T${finalTimeStr}:00`).toISOString();

			const payload = {
				title: title.trim(),
				scheduledDate: isoDateStr,
				priority,
				agentId,
				territoryId: territoryId || undefined,
				location: {
					address: address.trim(),
					coordinates,
				},
			};

			const res = await updateVisitMutation.mutateAsync({
				visitId: visit._id || visit.id || "",
				payload,
			});

			if (res.success) {
				toast.success("Task updated successfully!");
				setIsEditing(false);
				onClose();
			} else {
				toast.error(res.message || "Failed to update task.");
			}
		} catch (err) {
			const errorMsg = err instanceof Error ? err.message : "Failed to update task.";
			toast.error(errorMsg);
		}
	};

	const dt = new Date(visit.scheduledDate || new Date().toISOString());
	const date = dt.toLocaleDateString();
	const time = dt.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});

	const agentName =
		typeof visit.agentId === "object"
			? `${visit.agentId.firstName || ""} ${visit.agentId.lastName || ""}`.trim()
			: "Unknown Agent";

	return (
		<Dialog.Root open={isOpen} onOpenChange={onClose}>
			<Dialog.Portal>
				<Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
				<Dialog.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-xl duration-200 lg:p-8">
					<div className="mb-6 flex items-center justify-between">
						<Dialog.Title className="flex items-center gap-2 text-xl font-black text-gray-900">
							{isEditing ? "Edit Task Details" : "Task / Visit Details"}
							{!isEditing && canEditOrCancel && isUpcoming && (
								<button
									onClick={() => setIsEditing(true)}
									className="cursor-pointer text-gray-400 transition-colors hover:text-[#1d4ea8]"
									title="Edit Task"
									aria-label="Edit Task"
								>
									<Icon icon="solar:pen-bold" className="size-4" />
								</button>
							)}
						</Dialog.Title>
						<Dialog.Close asChild>
							<button
								title="Close"
								aria-label="Close"
								className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900"
							>
								<Icon icon="lucide:x" className="size-4" />
							</button>
						</Dialog.Close>
					</div>

					{isEditing ? (
						<form onSubmit={handleSave} className="flex flex-col gap-4">
							<div className="flex flex-col gap-1.5 font-sans">
								<label
									htmlFor="edit-task-title"
									className="text-xs font-bold uppercase text-gray-500"
								>
									Title
								</label>
								<input
									id="edit-task-title"
									aria-label="Title"
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm focus:border-[#1d4ea8] focus:outline-none"
									required
								/>
							</div>

							<div className="grid grid-cols-2 gap-4 font-sans">
								<div className="flex flex-col gap-1.5">
									<label
										htmlFor="edit-task-date"
										className="text-xs font-bold uppercase text-gray-500"
									>
										Date
									</label>
									<input
										id="edit-task-date"
										aria-label="Date"
										type="date"
										value={scheduledDate}
										onChange={(e) => setScheduledDate(e.target.value)}
										className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm focus:border-[#1d4ea8] focus:outline-none"
										required
									/>
								</div>
								<div className="flex flex-col gap-1.5">
									<label
										htmlFor="edit-task-time-hour"
										className="text-xs font-bold uppercase text-gray-500"
									>
										Time
									</label>
									<div className="flex gap-1.5">
										<select
											id="edit-task-time-hour"
											value={timeHour}
											onChange={(e) => setTimeHour(e.target.value)}
											className="h-11 flex-1 cursor-pointer rounded-xl border border-gray-200 bg-white px-2 text-sm focus:border-[#1d4ea8] focus:outline-none"
										>
											{Array.from({ length: 12 }, (_, i) =>
												String(i + 1),
											).map((h) => (
												<option key={h} value={h}>
													{h}
												</option>
											))}
										</select>
										<select
											id="edit-task-time-minute"
											aria-label="Minute"
											value={timeMinute}
											onChange={(e) => setTimeMinute(e.target.value)}
											className="h-11 flex-1 cursor-pointer rounded-xl border border-gray-200 bg-white px-2 text-sm focus:border-[#1d4ea8] focus:outline-none"
										>
											{Array.from({ length: 60 }, (_, i) =>
												String(i).padStart(2, "0"),
											).map((m) => (
												<option key={m} value={m}>
													{m}
												</option>
											))}
										</select>
										<select
											id="edit-task-time-period"
											aria-label="AM or PM"
											value={timePeriod}
											onChange={(e) => setTimePeriod(e.target.value)}
											className="h-11 cursor-pointer rounded-xl border border-gray-200 bg-white px-2 text-sm focus:border-[#1d4ea8] focus:outline-none"
										>
											<option value="AM">AM</option>
											<option value="PM">PM</option>
										</select>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4 font-sans">
								<div className="flex flex-col gap-1.5">
									<label
										htmlFor="edit-task-priority"
										className="text-xs font-bold uppercase text-gray-500"
									>
										Priority
									</label>
									<select
										id="edit-task-priority"
										value={priority}
										onChange={(e) => setPriority(e.target.value)}
										className="h-11 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 text-sm focus:border-[#1d4ea8] focus:outline-none"
									>
										<option value="low">Low</option>
										<option value="medium">Medium</option>
										<option value="high">High</option>
									</select>
								</div>
								<div className="flex flex-col gap-1.5">
									<label
										htmlFor="edit-task-agent"
										className="text-xs font-bold uppercase text-gray-500"
									>
										Agent
									</label>
									<select
										id="edit-task-agent"
										value={agentId}
										onChange={(e) => setAgentId(e.target.value)}
										className="h-11 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 text-sm focus:border-[#1d4ea8] focus:outline-none"
										required
									>
										<option value="">Select Agent</option>
										{agents.map((a: ComboAgent) => {
											const name =
												`${a.firstName || ""} ${a.lastName || ""}`.trim() ||
												a.email;
											return (
												<option key={a._id || a.id} value={a._id || a.id}>
													{name}
												</option>
											);
										})}
									</select>
								</div>
							</div>

							<div className="flex flex-col gap-1.5 font-sans">
								<label
									htmlFor="edit-task-territory"
									className="text-xs font-bold uppercase text-gray-500"
								>
									Target Zone
								</label>
								<select
									id="edit-task-territory"
									value={territoryId}
									onChange={(e) => setTerritoryId(e.target.value)}
									className="h-11 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 text-sm focus:border-[#1d4ea8] focus:outline-none"
								>
									<option value="">Select Zone</option>
									{territories.map((t: ComboTerritory) => (
										<option key={t._id || t.id} value={t._id || t.id}>
											{t.name}
										</option>
									))}
								</select>
							</div>

							<div className="flex flex-col gap-1.5 font-sans">
								<label
									htmlFor="edit-task-address"
									className="text-xs font-bold uppercase text-gray-500"
								>
									Address / Location
								</label>
								{isLoaded ? (
									<Autocomplete
										onLoad={onAutocompleteLoad}
										onPlaceChanged={onPlaceChanged}
									>
										<input
											id="edit-task-address"
											aria-label="Address"
											type="text"
											placeholder="Search visit address..."
											value={address}
											onChange={(e) => setAddress(e.target.value)}
											className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm focus:border-[#1d4ea8] focus:outline-none"
											required
										/>
									</Autocomplete>
								) : (
									<input
										id="edit-task-address"
										aria-label="Address"
										type="text"
										placeholder="Search visit address..."
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm focus:border-[#1d4ea8] focus:outline-none"
										required
									/>
								)}
							</div>

							<div className="mt-6 flex justify-end gap-3 font-sans">
								<Button
									type="button"
									onClick={() => setIsEditing(false)}
									className="h-11 cursor-pointer rounded-xl bg-gray-100 px-6 font-bold text-gray-900 hover:bg-gray-200"
								>
									Cancel
								</Button>
								<Button
									type="submit"
									disabled={updateVisitMutation.isPending}
									className="h-11 cursor-pointer rounded-xl bg-[#1d4ea8] px-6 font-bold text-white hover:bg-[#153a82]"
								>
									{updateVisitMutation.isPending ? "Saving..." : "Save Changes"}
								</Button>
							</div>
						</form>
					) : (
						<div className="flex flex-col gap-6">
							<div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
								<DynamicAvatar
									name={agentName}
									image={
										typeof visit.agentId === "object"
											? visit.agentId?.avatar
											: undefined
									}
									className="size-12 rounded-full shadow-sm"
								/>
								<div>
									<h4 className="font-bold text-gray-900">{agentName}</h4>
									<p className="text-sm font-medium text-gray-500">Sales Agent</p>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="rounded-xl border border-gray-100 p-4">
									<p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
										Date & Time
									</p>
									<p className="mt-1 font-bold text-gray-900">{date}</p>
									<p className="text-sm font-medium text-gray-500">{time}</p>
								</div>
								<div className="rounded-xl border border-gray-100 p-4">
									<p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
										Status
									</p>
									<p className="mt-1 font-bold capitalize text-gray-900">
										{visit.status}
									</p>
									<p className="text-sm font-medium text-gray-500">
										{visit.priority} Priority
									</p>
								</div>
							</div>

							<div className="rounded-xl border border-gray-100 p-4">
								<p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
									Location
								</p>
								<p className="mt-1 font-bold text-gray-900">
									{typeof visit.territoryId === "object"
										? visit.territoryId?.name
										: "Unknown Zone"}
								</p>
								<p className="mt-1 text-sm font-medium text-gray-500">
									{visit.location?.address || "N/A"}
								</p>
							</div>

							{visit.report?.saleDetails && (
								<div className="rounded-xl border border-gray-100 bg-green-50 p-4">
									<p className="text-[11px] font-bold uppercase tracking-wider text-green-600">
										Sales Report
									</p>
									<p className="mt-1 font-black text-green-900">
										₦
										{(
											visit.report.saleDetails.saleValue ||
											visit.report.saleDetails.amount ||
											0
										).toLocaleString()}
									</p>
									<p className="mt-1 text-sm font-medium text-green-700">
										Payment: {visit.report.saleDetails.paymentMode}
									</p>
								</div>
							)}
						</div>
					)}

					{!isEditing && (
						<div className="mt-8 flex items-center justify-between">
							<div className="flex gap-3">
								{canEditOrCancel && !isCancelled && !isCompleted && (
									<Button
										onClick={handleCancelTask}
										disabled={updateVisitMutation.isPending}
										className="h-11 cursor-pointer rounded-xl bg-red-50 px-6 font-bold text-red-600 transition-colors hover:bg-red-100"
									>
										{updateVisitMutation.isPending
											? "Cancelling..."
											: "Cancel Task"}
									</Button>
								)}
								{canEditOrCancel && visit.isScheduleApproved === false && (
									<Button
										onClick={handleApproveSchedule}
										disabled={updateVisitMutation.isPending}
										className="h-11 cursor-pointer rounded-xl bg-green-50 px-6 font-bold text-green-600 transition-colors hover:bg-green-100"
									>
										{updateVisitMutation.isPending
											? "Approving..."
											: "Approve Schedule"}
									</Button>
								)}
							</div>
							<Button
								onClick={onClose}
								className="h-11 cursor-pointer rounded-xl bg-gray-100 px-6 font-bold text-gray-900 hover:bg-gray-200"
							>
								Close
							</Button>
						</div>
					)}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
