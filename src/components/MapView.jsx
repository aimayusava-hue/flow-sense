import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const riskColors = {
  low: "#22c55e",
  medium: "#f59e0b",
  high: "#ef4444",
};

const createRiskIcon = (severity) => {
  return L.divIcon({
    className: "custom-risk-marker",
    html: `
      <div
        style="
          width: 22px;
          height: 22px;
          background: ${riskColors[severity]};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
        "
      ></div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -10],
  });
};

function MapView({ reports, onSelectReport }) {
  const center = [19.1197, 72.8468];

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {reports.map((report) => (
        <Marker
          key={report.id}
          position={[report.lat, report.lng]}
          icon={createRiskIcon(report.severity)}
          eventHandlers={{
            click: () => onSelectReport(report),
          }}
        >
          <Popup>
            <div className="min-w-[180px]">
              <h3 className="font-bold">{report.location}</h3>

              <p className="mt-1 text-sm">
                {report.description}
              </p>

              <p className="mt-2 text-sm font-semibold">
                Risk: {report.severity.toUpperCase()}
              </p>

              <p className="text-xs text-gray-500">
                {report.time}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;