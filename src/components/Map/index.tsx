"use client";

import React, { useMemo, useCallback, useState } from "react";
import cn from "@/lib/utils";
import {
	GoogleMap,
	useJsApiLoader,
	MarkerF,
	InfoWindowF,
	DrawingManager,
} from "@react-google-maps/api";
import { toast } from "sonner";

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

interface Zone {
	id: number;
	name: string;
	position: LatLng;
	color: string;
}

interface MapProps {
	className?: string;
}

export default function Map({ className }: MapProps) {
	const { isLoaded, loadError } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || "",
		libraries: ["drawing", "places"],
	});

	const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [newTerritory, setNewTerritory] = useState<LatLng[] | null>(null);

	const zones = useMemo<Zone[]>(
		() => [
			{
				id: 1,
				name: "Yaba Zone",
				position: { lat: 6.5244, lng: 3.3792 },
				color: "#10b981",
			},
			{
				id: 2,
				name: "Ikeja Zone",
				position: { lat: 6.6018, lng: 3.3484 },
				color: "#f59e0b",
			},
			{
				id: 3,
				name: "V.I Zone",
				position: { lat: 6.4281, lng: 3.4244 },
				color: "#1d4ea8",
			},
		],
		[],
	);

	const onPolygonComplete = useCallback((polygon: google.maps.Polygon) => {
		const path = polygon.getPath();
		const coordinates: LatLng[] = [];
		for (let i = 0; i < path.getLength(); i += 1) {
			const point = path.getAt(i);
			coordinates.push({ lat: point.lat(), lng: point.lng() });
		}

		setNewTerritory(coordinates);
		setIsDrawing(false);
		// Note: Usually we would show a modal here to name the territory
	}, []);

	if (loadError) {
		return (
			<div className="flex h-full items-center justify-center bg-red-50 p-4 text-red-500">
				Error loading maps: {loadError.message}
			</div>
		);
	}

	return (
		<div className={cn("relative overflow-hidden bg-gray-50", className)}>
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
						{zones.map((zone) => (
							<MarkerF
								key={zone.id}
								position={zone.position}
								onClick={() => setSelectedZone(zone)}
							/>
						))}

						{selectedZone && (
							<InfoWindowF
								position={selectedZone.position}
								onCloseClick={() => setSelectedZone(null)}
							>
								<div className="p-2">
									<h3 className="font-bold text-gray-900">{selectedZone.name}</h3>
									<p className="text-xs text-gray-500">Active Territory</p>
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
										fillColor: "#2C38B2",
										fillOpacity: 0.3,
										strokeWeight: 2,
										strokeColor: "#2C38B2",
										editable: true,
										zIndex: 1,
									},
								}}
							/>
						)}
					</GoogleMap>

					{/* UI Overlays */}
					<div className="absolute bottom-6 left-6 flex space-x-3">
						<button
							onClick={() => setIsDrawing(!isDrawing)}
							className={cn(
								"flex items-center px-6 py-3 rounded-full font-bold shadow-lg transition-all",
								isDrawing
									? "bg-red-500 text-white"
									: "bg-primary text-white hover:bg-secondary",
							)}
						>
							{isDrawing ? "Cancel Drawing" : "Draw New Territory"}
						</button>

						{newTerritory && (
							<button
								onClick={() => {
									toast.success(
										"Territory coordinates captured! Ready to save to backend.",
									);
									setNewTerritory(null);
								}}
								className="bg-accent flex items-center rounded-full px-6 py-3 font-bold text-white shadow-lg"
							>
								Save Territory
							</button>
						)}
					</div>
				</>
			) : (
				<div className="flex h-full animate-pulse items-center justify-center bg-gray-100">
					<p className="font-medium text-gray-400">Initializing Google Maps...</p>
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
