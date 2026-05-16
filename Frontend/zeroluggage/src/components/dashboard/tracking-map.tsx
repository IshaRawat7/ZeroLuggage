"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

export default function TrackingMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Prevent duplicate map initialization
    if ((mapRef.current as any)._leaflet_id) return;

    // Create map
    const map = L.map(mapRef.current).setView(
      [29.0284, 79.4832], // Pantnagar
      5
    );

    // Add OpenStreetMap tiles
    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }
    ).addTo(map);

    // Add marker
    L.marker([29.0284, 79.4832])
      .addTo(map)
      .bindPopup("Pantnagar")
      .openPopup();

    // Fix rendering issue
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-full"
    />
  );
}
