import { useEffect, useState, useRef } from "react";
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
        const res = await axios.post("http://localhost:8080/api/map/view", {
          start: [knowledgeTree[1], knowledgeTree[0]],
          end: [destination[1], destination[0]],
          profile: "foot-walking",
        });

        const geometry = res.data.features[0].geometry.coordinates.map(
          ([lng, lat]) => [lat, lng]
        );
        const summary = res.data.features[0].properties.summary;

        setRoute(geometry);
        setDistance((summary.distance / 1000).toFixed(2));
        setDuration((summary.duration / 60).toFixed(1));
      } catch (err) {
        console.error("Route error:", err);
        toast("route error", "error");
      }
    };

    fetchRoute();
  }, [destination]);

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
        // scrollWheelZoom={false}
        // doubleClickZoom={false}
        style={{
          height: "450px",
            width: "100%", 
            margin: "20px 10px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={destination}>
          <Popup>Found Item Location</Popup>
        </Marker>
        <Marker position={knowledgeTree}>
          <Popup>Knowledge Tree</Popup>
        </Marker>
        {route && <Polyline positions={route} color="blue" />}
        {route && <FitBounds route={route} />}
      </MapContainer>
    </div>
  );
}
