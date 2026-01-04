import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { useToaster } from "./ui/Toaster";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import axios from "axios";
import L from "leaflet";

// --- FIXED: Leaflet Icon Production Bug ---
// This ensures markers are visible after deployment
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;
// ------------------------------------------

const knowledgeTree = [26.474, 73.113];

function FitBounds({ route }) {
  const map = useMap();
  useEffect(() => {
    if (route && route.length > 1) {
      map.fitBounds(route);
    }
  }, [route, map]);
  return null;
}

export default function MapRouteView({ destination }) {
  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const toast = useToaster();

  useEffect(() => {
    if (!destination || !Array.isArray(destination) || destination.length !== 2)
      return;

    const fetchRoute = async () => {
      try {
        // FIXED: Use VITE_API_URL and add Authorization header
        const token = localStorage.getItem("token");
        const baseUrl =
          import.meta.env.VITE_API_URL || "http://localhost:8080/api";

        const res = await axios.post(
          `${baseUrl}/map/view`,
          {
            start: [knowledgeTree[1], knowledgeTree[0]],
            end: [destination[1], destination[0]],
            profile: "foot-walking",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const geometry = res.data.features[0].geometry.coordinates.map(
          ([lng, lat]) => [lat, lng]
        );
        const summary = res.data.features[0].properties.summary;

        setRoute(geometry);
        setDistance((summary.distance / 1000).toFixed(2));
        setDuration((summary.duration / 60).toFixed(1));
      } catch (err) {
        console.error("Route error:", err);
        // Added check to alert if it's an auth issue
        if (err.response?.status === 401) {
          toast("Please login to view route details", "error");
        } else {
          toast("Route calculation failed", "error");
        }
      }
    };

    fetchRoute();
  }, [destination, toast]);

  return (
    <div style={{ marginTop: "1rem" }}>
      {distance && duration && (
        <div className="lf-map-info-row">
          <div>
            <div className="lf-bold">Distance</div>
            <div>{distance} km</div>
          </div>
          <div>
            <div className="lf-bold">Travel Time</div>
            <div>~{duration} min walk</div>
          </div>
        </div>
      )}
      <MapContainer
        center={destination}
        zoom={17}
        style={{
          height: "450px",
          width: "100%",
          margin: "20px 0", // Adjusted margin slightly for centering
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          zIndex: 0, // Ensures map stays behind dropdowns/navbars
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={destination}>
          <Popup>Item Location</Popup>
        </Marker>
        <Marker position={knowledgeTree}>
          <Popup>Knowledge Tree (Starting Point)</Popup>
        </Marker>
        {route && (
          <Polyline
            positions={route}
            color="#3b82f6"
            weight={5}
            opacity={0.7}
          />
        )}
        {route && <FitBounds route={route} />}
      </MapContainer>
    </div>
  );
}
