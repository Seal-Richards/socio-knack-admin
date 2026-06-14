"use client";

import React, { useMemo, useCallback, useState } from "react";
import cn from "@/lib/utils";
import {
	GoogleMap,
	useJsApiLoader,
	MarkerF,
	InfoWindowF,
	DrawingManager,
	PolygonF,
	OverlayViewF,
} from "@react-google-maps/api";
import type { TerritoryData } from "@/types/territory";
import type { UserProfileData } from "@/types/profile";
import DynamicAvatar from "@/components/_atoms/DynamicAvatar";
import { formatCheckInDate } from "@/utils/dateFormatter";

export interface MapAgent {
	id?: string;
	_id?: string;
	firstName?: string;
	lastName?: string;
	name?: string;
	email?: string;
	phone?: string;
	isOnline?: boolean;
	status?: string;
	statusColor?: string;
	lastCheckIn?: string;
	lastCheckInTime?: string;
	avatar?: string;
	territoryId?: string | { _id: string } | null;
	lastKnownLocation?: {
		latitude: number;
		longitude: number;
		lastUpdated?: string;
	};
	activeVisit?: {
		_id: string;
		title: string;
		status: string;
		scheduledDate?: string;
	} | null;
}

const containerStyle = {
	width: "100%",
	height: "100%",
};

const center = {
	lat: 6.5244,
	lng: 3.3792,
};

interface LatLng {
	lat: number;
	lng: number;
}

interface MapProps {
	className?: string;
	readOnly?: boolean;
	zones?: TerritoryData[];
	selectedZoneId?: string | null;
	isDrawing?: boolean;
	setIsDrawing?: (drawing: boolean) => void;
	onSaveTerritory?: (coords: LatLng[]) => void;
	agents?: MapAgent[];
}

const GOOGLE_MAPS_LIBRARIES: ("drawing" | "places")[] = ["drawing", "places"];

export default function Map({
	className,
	readOnly = false,
	zones = [],
	selectedZoneId = null,
	isDrawing = false,
	setIsDrawing,
	onSaveTerritory,
	agents = [],
}: MapProps) {
	const { isLoaded, loadError } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || "",
		libraries: GOOGLE_MAPS_LIBRARIES,
		version: "3.64",
	});

	const [selectedMapZone, setSelectedMapZone] = useState<TerritoryData | null>(null);
	const [selectedAgent, setSelectedAgent] = useState<MapAgent | null>(null);

	// Helper to extract polygon paths from GeoJSON format [longitude, latitude]
	const getPolygonCoords = useCallback((zone: TerritoryData): LatLng[] => {
		if (!zone.boundary?.coordinates?.[0]) return [];
		return zone.boundary.coordinates[0].map((coord) => {
			const lng = coord[0] !== undefined ? coord[0] : 0;
			const lat = coord[1] !== undefined ? coord[1] : 0;
			return { lat, lng };
		});
	}, []);

	// Calculate the center centroid of the polygon coordinates
	const getCentroid = useCallback((coords: LatLng[]): LatLng => {
		if (coords.length === 0) return center;
		let latSum = 0;
		let lngSum = 0;
		coords.forEach((c) => {
			latSum += c.lat;
			lngSum += c.lng;
		});
		return {
			lat: latSum / coords.length,
			lng: lngSum / coords.length,
		};
	}, []);

	// Get active list of zones to display on map
	const zonesToDraw = useMemo(() => {
		if (selectedZoneId) {
			return zones.filter((z) => z._id === selectedZoneId);
		}
		return zones;
	}, [zones, selectedZoneId]);

	const isAgentInAssignedZone = useCallback(
		(agent: MapAgent): boolean => {
			if (!agent.lastKnownLocation?.latitude || !agent.lastKnownLocation?.longitude) {
				return false;
			}

			// Find the agent's assigned zone
			const territory = agent.territoryId;
			let agentZoneId: string | null = null;
			if (territory) {
				if (typeof territory === "string") {
					agentZoneId = territory;
				} else if (typeof territory === "object" && "_id" in territory) {
					agentZoneId = territory._id;
				}
			}
			if (!agentZoneId) return false;

			const zone = zones.find((z) => z._id === agentZoneId);
			if (!zone?.boundary?.coordinates?.[0]) {
				return false;
			}

			const x = agent.lastKnownLocation.longitude;
			const y = agent.lastKnownLocation.latitude;
			const vs = zone.boundary.coordinates[0]; // Array of [longitude, latitude]

			let inside = false;
			for (let i = 0, j = vs.length - 1; i < vs.length; ) {
				const vi = vs[i];
				const vj = vs[j];
				if (vi && vj) {
					const xi = vi[0];
					const yi = vi[1];
					const xj = vj[0];
					const yj = vj[1];
					if (
						xi !== undefined &&
						yi !== undefined &&
						xj !== undefined &&
						yj !== undefined
					) {
						const intersect =
							yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
						if (intersect) {
							inside = !inside;
						}
					}
				}
				j = i;
				i += 1;
			}
			return inside;
		},
		[zones],
	);

	const onPolygonComplete = useCallback(
		(polygon: google.maps.Polygon) => {
			const path = polygon.getPath();
			const coordinates: LatLng[] = [];
			for (let i = 0; i < path.getLength(); i += 1) {
				const point = path.getAt(i);
				coordinates.push({ lat: point.lat(), lng: point.lng() });
			}

			if (document.fullscreenElement) {
				document.exitFullscreen().catch((err) => console.warn(err));
			}

			if (onSaveTerritory) {
				onSaveTerritory(coordinates);
			}
			// Clean up drawn outline from map to let React render it
			polygon.setMap(null);
		},
		[onSaveTerritory],
	);

	if (loadError) {
		return (
			<div className="flex h-full items-center justify-center bg-red-50 p-4 text-red-500">
				Error loading maps: {loadError.message}
			</div>
		);
	}

	return (
		<div className={cn("relative overflow-hidden bg-gray-50 h-full w-full", className)}>
			{isLoaded ? (
				<>
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={center}
						zoom={12}
						options={{
							styles: [
								{
									featureType: "all",
									elementType: "labels.text.fill",
									stylers: [{ color: "#64748b" }],
								},
							],
							disableDefaultUI: false,
							mapTypeControl: false,
							streetViewControl: false,
						}}
					>
						{/* Draw Polygons for Zones */}
						{zonesToDraw.map((zone) => {
							const coords = getPolygonCoords(zone);
							if (coords.length === 0) return null;
							return (
								<PolygonF
									key={zone._id}
									paths={coords}
									options={{
										fillColor: zone.color,
										fillOpacity: 0.15,
										strokeColor: zone.color,
										strokeOpacity: 0.8,
										strokeWeight: 2,
									}}
								/>
							);
						})}

						{/* Draw Markers at Centroid of Zones */}
						{zonesToDraw.map((zone) => {
							const coords = getPolygonCoords(zone);
							if (coords.length === 0) return null;
							const centroid = getCentroid(coords);
							return (
								<MarkerF
									key={`zone-pin-${zone._id}`}
									position={centroid}
									onClick={() => {
										setSelectedMapZone(zone);
										setSelectedAgent(null);
									}}
									icon={{
										path: google.maps.SymbolPath.CIRCLE,
										scale: 12,
										fillColor: zone.color,
										fillOpacity: 0.9,
										strokeColor: "#ffffff",
										strokeWeight: 2,
									}}
									label={{
										text: String(zone.assignedAgents?.length || 0),
										color: "#ffffff",
										fontSize: "11px",
										fontWeight: "bold",
									}}
								/>
							);
						})}

						{/* Draw Markers for Online/Offline Agents */}
						{[...agents]
							.sort((a, b) => {
								if (a.isOnline && !b.isOnline) return 1;
								if (!a.isOnline && b.isOnline) return -1;
								return 0;
							})
							.map((agent) => {
								if (
									!agent.lastKnownLocation?.latitude ||
									!agent.lastKnownLocation?.longitude
								) {
									return null;
								}

								const { latitude, longitude } = agent.lastKnownLocation;
								const isOnline = agent.isOnline || false;
								const isInside = isAgentInAssignedZone(agent);
								const agentKey = agent._id || agent.id || "";

								// Outer status border color
								let borderColorClass = "border-yellow-500";
								let pointerBgClass = "bg-yellow-500 border-yellow-500";
								if (isOnline) {
									if (isInside) {
										borderColorClass = "border-green-500";
										pointerBgClass = "bg-green-500 border-green-500";
									} else {
										borderColorClass = "border-red-500";
										pointerBgClass = "bg-red-500 border-red-500";
									}
								}

								const fullName =
									`${agent.firstName || ""} ${agent.lastName || ""}`.trim() ||
									agent.name ||
									agent.email ||
									"Agent";

								return (
									<OverlayViewF
										key={`agent-pin-${agentKey}`}
										position={{
											lat: latitude,
											lng: longitude,
										}}
										mapPaneName="overlayMouseTarget"
									>
										<button
											id={`agent-pin-btn-${agentKey}`}
											type="button"
											aria-label={`View agent details for ${fullName}`}
											onClick={() => {
												setSelectedAgent(agent);
												setSelectedMapZone(null);
											}}
											className={cn(
												"absolute -translate-x-1/2 -translate-y-full transform cursor-pointer border-none bg-transparent p-0",
												isOnline ? "z-10" : "z-0",
											)}
										>
											<div className="relative flex flex-col items-center">
												<div
													className={cn(
														"flex size-10 items-center justify-center overflow-hidden rounded-full border-2 bg-white shadow-md transition-all hover:scale-110",
														borderColorClass,
													)}
												>
													{agent.avatar ? (
														// eslint-disable-next-line @next/next/no-img-element
														<img
															src={agent.avatar}
															alt={fullName}
															className="size-full object-cover"
														/>
													) : (
														<div className="flex size-full items-center justify-center bg-slate-200 text-xs font-bold text-slate-600">
															{agent.firstName?.charAt(0) || ""}
															{agent.lastName?.charAt(0) || ""}
														</div>
													)}
												</div>
												<div
													className={cn(
														"size-2 rotate-45 -mt-1 border-r border-b",
														pointerBgClass,
													)}
												/>
											</div>
										</button>
									</OverlayViewF>
								);
							})}

						{/* Info Window for Zones */}
						{selectedMapZone && (
							<InfoWindowF
								position={getCentroid(getPolygonCoords(selectedMapZone))}
								onCloseClick={() => setSelectedMapZone(null)}
							>
								<div className="min-w-[200px] p-3 text-gray-800">
									<style>{`.selected-zone-title-color { color: ${selectedMapZone.color}; }`}</style>
									<h3 className="selected-zone-title-color text-[14px] font-bold">
										{selectedMapZone.name}
									</h3>
									<p className="mt-1 text-xs text-gray-500">
										<strong>Supervisor:</strong>{" "}
										{selectedMapZone.assignedSupervisor
											? `${selectedMapZone.assignedSupervisor.firstName || ""} ${selectedMapZone.assignedSupervisor.lastName || ""}`.trim()
											: "None"}
									</p>
									{selectedMapZone.assignedSupervisor && (
										<p className="mt-0.5 text-xs text-gray-500">
											<strong>Supervisor Status:</strong>{" "}
											<span
												className={cn(
													"font-semibold",
													selectedMapZone.assignedSupervisor.isOnline
														? "text-green-600"
														: "text-orange-500",
												)}
											>
												{selectedMapZone.assignedSupervisor.isOnline
													? "Online"
													: "Offline"}
											</span>
										</p>
									)}
									<p className="mt-0.5 text-xs text-gray-500">
										<strong>Assigned Agents:</strong>{" "}
										{selectedMapZone.assignedAgents?.length || 0}
									</p>
									{selectedMapZone.assignedAgents &&
										selectedMapZone.assignedAgents.length > 0 && (
											<div className="mt-2.5 border-t border-gray-100 pt-2">
												<strong className="mb-1 block text-[11px] text-gray-400">
													Assigned Agents Status:
												</strong>
												<div className="mt-1 flex flex-wrap gap-1.5">
													{selectedMapZone.assignedAgents.map(
														(agent: UserProfileData) => {
															const fullName =
																`${agent.firstName || ""} ${agent.lastName || ""}`.trim() ||
																agent.email ||
																"Agent";
															const isOnline =
																agent.isOnline || false;
															return (
																<div
																	key={agent._id || agent.id}
																	className={cn(
																		"relative rounded-full border p-0.5 shadow-sm bg-white",
																		isOnline
																			? "border-green-500"
																			: "border-red-500",
																	)}
																	title={`${fullName} (${isOnline ? "Online" : "Offline"})`}
																>
																	<DynamicAvatar
																		name={fullName}
																		image={agent.avatar}
																		className="size-6 rounded-full"
																	/>
																</div>
															);
														},
													)}
												</div>
											</div>
										)}
								</div>
							</InfoWindowF>
						)}

						{/* Info Window for Agents */}
						{selectedAgent && (
							<InfoWindowF
								position={{
									lat: selectedAgent.lastKnownLocation?.latitude || 0,
									lng: selectedAgent.lastKnownLocation?.longitude || 0,
								}}
								onCloseClick={() => setSelectedAgent(null)}
							>
								<div className="min-w-[180px] p-3 text-gray-800">
									<h3 className="text-[13px] font-bold">
										{`${selectedAgent.firstName || ""} ${selectedAgent.lastName || ""}`.trim() ||
											selectedAgent.name ||
											selectedAgent.email ||
											""}
									</h3>
									<p className="mt-1 text-xs text-gray-500">
										<strong>Status:</strong>{" "}
										<span
											className={cn(
												"font-semibold",
												selectedAgent.isOnline
													? "text-green-600"
													: "text-orange-500",
											)}
										>
											{selectedAgent.isOnline ? "Online" : "Offline"}
										</span>
									</p>
									{selectedAgent.isOnline && (
										<p className="mt-0.5 text-xs text-gray-500">
											<strong>Zone Check:</strong>{" "}
											<span
												className={cn(
													"font-bold",
													isAgentInAssignedZone(selectedAgent)
														? "text-green-600"
														: "text-red-500",
												)}
											>
												{isAgentInAssignedZone(selectedAgent)
													? "In Assigned Zone"
													: "Out of Zone"}
											</span>
										</p>
									)}
									{(selectedAgent.lastCheckInTime ||
										selectedAgent.lastCheckIn) && (
										<p className="mt-0.5 text-xs text-gray-500">
											<strong>Last Checkin:</strong>{" "}
											{formatCheckInDate(
												selectedAgent.lastCheckInTime ||
													selectedAgent.lastCheckIn,
											)}
										</p>
									)}
									{selectedAgent.activeVisit && (
										<p className="mt-1.5 border-t border-gray-100 pt-1.5 text-xs text-gray-600">
											<strong>Active Task:</strong>{" "}
											<span className="font-semibold text-[#1d4ea8]">
												{selectedAgent.activeVisit.title}
											</span>
										</p>
									)}
								</div>
							</InfoWindowF>
						)}

						{isDrawing && (
							<DrawingManager
								onPolygonComplete={onPolygonComplete}
								options={{
									drawingControl: true,
									drawingControlOptions: {
										position: google.maps.ControlPosition.TOP_CENTER,
										drawingModes: [google.maps.drawing.OverlayType.POLYGON],
									},
									polygonOptions: {
										fillColor: "#1d4ea8",
										fillOpacity: 0.3,
										strokeWeight: 2,
										strokeColor: "#1d4ea8",
										editable: true,
										zIndex: 1,
									},
								}}
							/>
						)}
					</GoogleMap>

					{/* Floating control buttons */}
					{!readOnly && setIsDrawing && (
						<div className="absolute bottom-6 left-6 z-10 flex space-x-3">
							<button
								onClick={() => setIsDrawing(!isDrawing)}
								className={cn(
									"flex items-center px-6 py-3 rounded-full font-bold shadow-lg transition-all text-sm",
									isDrawing
										? "bg-red-500 text-white"
										: "bg-[#1d4ea8] text-white hover:bg-[#153a82]",
								)}
							>
								{isDrawing ? "Cancel Drawing" : "Draw New Territory"}
							</button>
						</div>
					)}
				</>
			) : (
				<div className="flex h-full animate-pulse items-center justify-center bg-gray-100">
					<p className="text-sm font-medium text-gray-400">Initializing Google Maps...</p>
				</div>
			)}

			{!process.env.NEXT_PUBLIC_GOOGLE_MAP_API && (
				<div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 p-6 text-center backdrop-blur-sm">
					<div className="max-w-md space-y-4 rounded-3xl border border-red-100 bg-white p-8 shadow-2xl">
						<div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-50">
							<svg
								className="size-6 text-red-500"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-black text-gray-900">
							Google Maps Key Missing
						</h3>
						<p className="text-sm text-gray-500">
							Please add your Google Maps API Key to your .env file:
						</p>
						<div className="rounded-xl bg-gray-50 p-3 text-left">
							<code className="font-mono text-xs font-bold text-red-500">
								NEXT_PUBLIC_GOOGLE_MAP_API=AIzaSy...
							</code>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
