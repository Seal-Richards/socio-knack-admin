"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Autocomplete, GoogleMap, MarkerF, PolygonF } from "@react-google-maps/api";
import { useGetTerritories } from "@/hooks/useTerritory";
import { toast } from "@/lib/toast";
import cn from "@/lib/utils";
import { type TaskFormData } from "@/schemas/task";
import type { TerritoryData } from "@/types/territory";

interface LocationProps {
	onNext: () => void;
	formData: TaskFormData;
	updateFormData: (fields: Partial<TaskFormData>) => void;
}

const mapContainerStyle = {
	width: "100%",
	height: "200px",
};

const defaultCenter = {
	lat: 6.5244,
	lng: 3.3792,
};

// Point-in-polygon check (coordinates array in GeoJSON is [[lng, lat], ...])
function isPointInPolygon(point: { lat: number; lng: number }, vertices: number[][]) {
	if (!vertices || !Array.isArray(vertices)) return false;
	const x = point.lng;
	const y = point.lat;
	let inside = false;
	let j = vertices.length - 1;
	for (let i = 0; i < vertices.length; i += 1) {
		const vi = vertices[i];
		const vj = vertices[j];
		if (vi && vj) {
			const xi = vi[0];
			const yi = vi[1];
			const xj = vj[0];
			const yj = vj[1];
			if (xi !== undefined && yi !== undefined && xj !== undefined && yj !== undefined) {
				const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
				if (intersect) inside = !inside;
			}
		}
		j = i;
	}
	return inside;
}

export default function Location({ onNext, formData, updateFormData }: LocationProps) {
	const { data: territoriesRes, isLoading: loadingZones } = useGetTerritories();
	const zones = useMemo(() => territoriesRes?.data || [], [territoriesRes?.data]);

	const [selectedZone, setSelectedZone] = useState<TerritoryData | null>(null);
	const [mapCenter, setMapCenter] = useState(defaultCenter);
	const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
	const [isValidLocation, setIsValidLocation] = useState(true);

	// Load selected zone details when territoryId changes
	useEffect(() => {
		if (formData.territoryId && zones.length > 0) {
			const zone = zones.find((z) => z._id === formData.territoryId);
			if (zone) {
				setSelectedZone(zone);
				// Recenter map on centroid of selected zone
				const coords = zone.boundary?.coordinates?.[0];
				if (coords && coords.length > 0) {
					let latSum = 0;
					let lngSum = 0;
					coords.forEach((coord) => {
						const lng = coord[0];
						const lat = coord[1];
						if (lng !== undefined && lat !== undefined) {
							latSum += lat;
							lngSum += lng;
						}
					});
					setMapCenter({
						lat: latSum / coords.length,
						lng: lngSum / coords.length,
					});
				}
			}
		}
	}, [formData.territoryId, zones]);

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
				const checkPoint = { lat, lng };

				// If zone is selected, check boundary geofencing
				if (selectedZone?.boundary?.coordinates?.[0]) {
					const vertices = selectedZone.boundary.coordinates[0];
					const isInside = isPointInPolygon(checkPoint, vertices);

					if (!isInside) {
						setIsValidLocation(false);
					} else {
						setIsValidLocation(true);
					}
				}

				updateFormData({
					address: formattedAddress,
					coordinates: [lng, lat], // GeoJSON order
				});
				setMapCenter(checkPoint);
			}
		}
	};

	const handleNext = () => {
		if (!formData.territoryId) {
			toast.error("Please select a target Zone.");
			return;
		}
		if (!formData.address || formData.coordinates.length < 2) {
			toast.error("Please enter a valid visit address.");
			return;
		}
		if (!isValidLocation) {
			toast.error(
				"Cannot schedule visit: Location must be within the boundary of the selected zone.",
			);
			return;
		}
		onNext();
	};

	const polygonPaths = useMemo(() => {
		if (!selectedZone?.boundary?.coordinates?.[0]) return [];
		return selectedZone.boundary.coordinates[0]
			.map((coord) => {
				const lng = coord[0];
				const lat = coord[1];
				if (lng !== undefined && lat !== undefined) {
					return { lat, lng };
				}
				return null;
			})
			.filter((p): p is { lat: number; lng: number } => p !== null);
	}, [selectedZone]);

	return (
		<div className="flex flex-col gap-6">
			{/* Target Zone Selection */}
			<div className="flex flex-col gap-3">
				<Label className="text-[14px] font-bold text-gray-700">Target Zone</Label>
				<Select
					value={formData.territoryId}
					onValueChange={(val) => updateFormData({ territoryId: val })}
				>
					<SelectTrigger className="h-14 rounded-2xl border-gray-200 px-5 text-[14px] focus:ring-[#1d4ea8]/20">
						<SelectValue
							placeholder={loadingZones ? "Loading zones..." : "Select Zone"}
						/>
					</SelectTrigger>
					<SelectContent className="rounded-2xl border-gray-100 shadow-xl">
						{zones.map((zone) => (
							<SelectItem key={zone._id} value={zone._id}>
								{zone.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{/* Autocomplete Input */}
			<div className="flex flex-col gap-3">
				<Label htmlFor="visitAddress" className="text-[14px] font-bold text-gray-700">
					Visit Address/Location
				</Label>
				{/* Check if maps are loaded successfully inside the parent or render Autocomplete */}
				<Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
					<input
						id="visitAddress"
						type="text"
						aria-label="Visit Address"
						placeholder="Search visit address..."
						defaultValue={formData.address}
						className={cn(
							"h-14 w-full rounded-2xl border px-5 text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all",
							isValidLocation
								? "border-gray-200 focus:border-[#1d4ea8] focus:ring-[#1d4ea8]/20"
								: "border-red-500 focus:border-red-500 focus:ring-red-500/20",
						)}
					/>
				</Autocomplete>
				{!isValidLocation && (
					<p className="mt-0.5 pl-1 text-xs font-semibold text-red-500">
						Warning: Address is outside the selected zone boundary.
					</p>
				)}
				{isValidLocation && formData.address && (
					<p className="mt-0.5 pl-1 text-xs font-semibold text-green-600">
						Location verified inside the zone.
					</p>
				)}
			</div>

			{/* Map Preview */}
			<div className="relative h-[200px] w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
				<GoogleMap
					mapContainerStyle={mapContainerStyle}
					center={mapCenter}
					zoom={14}
					options={{
						disableDefaultUI: true,
					}}
				>
					{/* Show selected zone polygon boundary */}
					{polygonPaths.length > 0 && (
						<PolygonF
							paths={polygonPaths}
							options={{
								fillColor: selectedZone?.color || "#1d4ea8",
								fillOpacity: 0.1,
								strokeColor: selectedZone?.color || "#1d4ea8",
								strokeOpacity: 0.8,
								strokeWeight: 2,
							}}
						/>
					)}

					{/* Show visit marker pin */}
					{formData.coordinates.length === 2 && (
						<MarkerF
							position={{
								lat: formData.coordinates[1]!,
								lng: formData.coordinates[0]!,
							}}
						/>
					)}
				</GoogleMap>
			</div>

			<button
				type="button"
				onClick={handleNext}
				className="mt-4 h-14 w-full rounded-xl bg-[#1d4ea8] text-[15px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-[0.98]"
			>
				Next
			</button>
		</div>
	);
}
