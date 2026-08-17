import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveReport } from "../services/reportStorage";

const locations = {
  "Andheri East": {
    lat: 19.1197,
    lng: 72.8468,
  },
  "Saki Naka": {
    lat: 19.1036,
    lng: 72.8856,
  },
  Bandra: {
    lat: 19.0596,
    lng: 72.8295,
  },
  Powai: {
    lat: 19.1176,
    lng: 72.906,
  },
  Goregaon: {
    lat: 19.1663,
    lng: 72.8526,
  },
};

const severityInfo = {
  low: {
    emoji: "🟢",
    title: "Low",
    description: "Minor water accumulation",
  },
  medium: {
    emoji: "🟡",
    title: "Medium",
    description: "Significant waterlogging",
  },
  high: {
    emoji: "🔴",
    title: "High",
    description: "Road flooded or blocked",
  },
};

function Report() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("Andheri East");
  const [severity, setSeverity] = useState("medium");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedLocation = locations[location];
  const selectedSeverity = severityInfo[severity];
  const reportConfidence = Math.min(
  100,
  40 +
    (location ? 20 : 0) +
    (severity ? 20 : 0) +
    (description.trim().length >= 20 ? 20 : 0)
);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!description.trim()) {
      return;
    }

    const newReport = {
      id: Date.now(),
      location,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      severity,
      description: description.trim(),
      time: "Just now",
    };

    saveReport(newReport);

    setSubmitted(true);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Citizen Intelligence
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            🚨 Report Flooding
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Tell FlowSense what is happening on the ground.
            Your observation can help identify emerging flood-risk
            locations.
          </p>
        </div>

        {submitted && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-5">
            <div className="flex items-start gap-3">
              <div className="text-2xl">✅</div>

              <div>
                <p className="font-bold text-green-800">
                  Report submitted successfully!
                </p>

                <p className="mt-1 text-sm text-green-700">
                  FlowSense is updating the local flood intelligence.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-5">

          {/* FORM */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white p-6 shadow-sm md:p-8"
            >

              {/* Location */}
              <div>
                <label className="text-sm font-semibold text-slate-800">
                  📍 Flooded Location
                </label>

                <select
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 outline-none transition focus:border-blue-500"
                >
                  {Object.keys(locations).map((place) => (
                    <option key={place} value={place}>
                      {place}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location info */}
              <div className="mt-4 rounded-xl bg-blue-50 p-4">
                <p className="text-sm font-semibold text-blue-800">
                  Selected Area
                </p>

                <p className="mt-1 text-lg font-bold text-blue-900">
                  📍 {location}
                </p>

                <p className="mt-1 text-xs text-blue-700">
                  Coordinates: {selectedLocation.lat},{" "}
                  {selectedLocation.lng}
                </p>
              </div>

              {/* Severity */}
              <div className="mt-6">
                <label className="text-sm font-semibold text-slate-800">
                  Flood Severity
                </label>

                <div className="mt-3 grid gap-3 md:grid-cols-3">

                  {Object.entries(severityInfo).map(
                    ([value, info]) => (
                      <label
                        key={value}
                        className="cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="severity"
                          value={value}
                          checked={severity === value}
                          onChange={(event) =>
                            setSeverity(event.target.value)
                          }
                          className="peer sr-only"
                        />

                        <div className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 peer-checked:ring-2 peer-checked:ring-blue-500">
                          <div className="text-xl">
                            {info.emoji}
                          </div>

                          <p className="mt-2 font-semibold text-slate-900">
                            {info.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {info.description}
                          </p>
                        </div>
                      </label>
                    )
                  )}

                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <label className="text-sm font-semibold text-slate-800">
                  Describe the situation
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Example: Water is knee-deep and vehicles cannot pass."
                  rows={5}
                  maxLength={250}
                  className="mt-2 w-full resize-none rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500"
                />

                <div className="mt-1 flex justify-end">
                  <span className="text-xs text-slate-400">
                    {description.length}/250
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!description.trim() || submitted}
                className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitted
                  ? "✅ Report Submitted"
                  : "🚨 Submit Flood Report"}
              </button>

            </form>
          </div>

          {/* LIVE PREVIEW */}
          
          <div className="lg:col-span-2">

            <div className="sticky top-6 rounded-2xl bg-slate-900 p-6 text-white shadow-sm">

              <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
                Live Report Preview
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                How FlowSense sees your report
              </h2>

              <div className="mt-6 rounded-2xl bg-white p-5 text-slate-900">

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      Location
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      📍 {location}
                    </h3>
                  </div>

                  <span className="text-2xl">
                    {selectedSeverity.emoji}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Severity
                  </p>

                  <p className="mt-1 font-bold">
                    {selectedSeverity.title} Risk
                  </p>
                  <div className="mt-4 rounded-lg bg-slate-100 p-3">
  <p className="text-xs font-semibold uppercase text-slate-400">
    FlowSense Interpretation
  </p>

  <p className="mt-1 text-sm font-medium text-slate-700">
    {severity === "high"
      ? "🚨 Immediate attention recommended. This location may become hazardous during heavy rainfall."
      : severity === "medium"
        ? "⚠️ Water accumulation detected. Monitor the area and consider safer routes."
        : "✅ Minor accumulation reported. Current conditions appear manageable."}
  </p>
</div>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedSeverity.description}
                  </p>
                </div>

                <div className="mt-5">
  <p className="text-xs font-semibold uppercase text-slate-400">
    Observation
  </p>

  <p className="mt-2 text-sm leading-6 text-slate-700">
    {description ||
      "Your description will appear here..."}
  </p>
</div>

<div className="mt-5 border-t border-slate-200 pt-4">
  <div className="flex justify-between text-xs text-slate-400">
    <span>Coordinates</span>
    <span>
      {selectedLocation.lat},{" "}
      {selectedLocation.lng}
    </span>
  </div>
</div>

{/* Report Completeness */}
<div className="mt-5">
  <div className="flex justify-between text-xs">
    <span className="font-semibold text-slate-400">
      Report Completeness
    </span>

    <span className="font-bold text-blue-600">
      {reportConfidence}%
    </span>
  </div>

  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
    <div
      className="h-full rounded-full bg-blue-600 transition-all"
      style={{
        width: `${reportConfidence}%`,
      }}
    />
  </div>
</div>
              </div>

              <div className="mt-5 rounded-xl bg-white/10 p-4 text-sm text-slate-300">
                💡 Community reports help FlowSense identify
                locations where rainfall may become a real-world
                urban problem.
              </div>

            </div>

          </div>

        </div>
      </div>
    </main>
  );
}

export default Report;