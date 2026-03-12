"use client";

import React, { useEffect, useRef } from "react";
import cn from "@/lib/utils";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { TerraDraw, TerraDrawPolygonMode, TerraDrawSelectMode } from "terra-draw";
import { TerraDrawMapboxGLAdapter } from "terra-draw-mapbox-gl-adapter";
// Mapbox Token from environment
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

interface MapProps {
	className?: string;
}

export default function Map({ className }: MapProps) {
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<mapboxgl.Map | null>(null);
	const drawRef = useRef<TerraDraw | null>(null);

	useEffect(() => {
		if (!mapContainerRef.current || mapRef.current || !mapboxgl.accessToken) return;

		// Initialize Mapbox
		const mapInstance = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: "mapbox://styles/mapbox/light-v11",
			center: [3.3792, 6.5244],
			zoom: 12,
		});

		mapInstance.on("load", () => {
			mapRef.current = mapInstance;

			try {
				const drawInstance = new TerraDraw({
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					adapter: new TerraDrawMapboxGLAdapter({
						map: mapInstance,
					}) as any,
					modes: [
						new TerraDrawSelectMode({
							flags: {
								polygon: {
									feature: {
										draggable: true,
										coordinates: { draggable: true },
									},
								},
							},
						}),
						new TerraDrawPolygonMode(),
					],
				});

				drawInstance.start();
				drawRef.current = drawInstance;
			} catch (error) {
				console.error("Failed to initialize Terra Draw:", error);
			}

			// Mock tags/points
			const zones = [
				{
					name: "Yaba Zone",
					coords: [3.3792, 6.5244] as [number, number],
					color: "#10b981",
				},
				{
					name: "Ikeja Zone",
					coords: [3.3484, 6.6018] as [number, number],
					color: "#f59e0b",
				},
				{
					name: "V.I Zone",
					coords: [3.4244, 6.4281] as [number, number],
					color: "#1d4ea8",
				},
			];

			zones.forEach((zone) => {
				new mapboxgl.Marker({ color: zone.color })
					.setLngLat(zone.coords)
					.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${zone.name}</h3>`))
					.addTo(mapInstance);
			});
		});

		const cleanup = () => {
			if (drawRef.current) {
				try {
					drawRef.current.stop();
				} catch (e) {
					console.error("Failed to stop Terra Draw:", e);
				}
			}
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};

		// eslint-disable-next-line consistent-return
		return () => {
			cleanup();
		};
		return;
	}, []);

	return (
		<div className={cn("relative overflow-hidden bg-gray-50", className)}>
			<div ref={mapContainerRef} className="absolute inset-0 size-full" />
			{!mapboxgl.accessToken && (
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
						<h3 className="text-lg font-black text-gray-900">Mapbox Token Missing</h3>
						<p className="text-sm text-gray-500">
							Please add your Mapbox Access Token to your{" "}
							<code className="rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-xs font-bold text-red-500">
								.env
							</code>{" "}
							file:
						</p>
						<div className="rounded-xl bg-gray-50 p-3 text-left">
							<code className="font-mono text-xs font-bold text-red-500">
								NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ...
							</code>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
