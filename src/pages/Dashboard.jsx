import { useEffect, useMemo, useState } from "react";
import MapView from "../components/MapView";
import { getReports } from "../services/reportStorage";
import { calculateFloodRisk } from "../services/riskEngine";
import { useRain } from "../context/RainContext";

function Dashboard() {
  const {
    rainfall,
    increaseRain,
    decreaseRain,
    resetRain,
  } = useRain();

  const [selectedArea, setSelectedArea] =
    useState("Andheri East");

  const [selectedReport, setSelectedReport] =
    useState(null);

  const [showHighRiskOnly, setShowHighRiskOnly] =
    useState(false);

  const [alertMode, setAlertMode] =
    useState(false);

  const [reports, setReports] =
    useState(getReports());

  useEffect(() => {
    const updateReports = () => {
      setReports(getReports());
    };

    window.addEventListener(
      "flowsense-reports-updated",
      updateReports
    );

    return () => {
      window.removeEventListener(
        "flowsense-reports-updated",
        updateReports
      );
    };
  }, []);

  const riskData = calculateFloodRisk({
    rainfall,
    reports,
    selectedArea,
  });

  const emergencyMode =
    rainfall >= 80 || riskData.score >= 70;

  const filteredReports = useMemo(() => {
    if (showHighRiskOnly) {
      return reports.filter(
        (report) => report.severity === "high"
      );
    }

    return reports;
  }, [reports, showHighRiskOnly]);

  const highRiskCount = reports.filter(
    (report) => report.severity === "high"
  ).length;

  const mediumRiskCount = reports.filter(
    (report) => report.severity === "medium"
  ).length;

  const lowRiskCount = reports.filter(
    (report) => report.severity === "low"
  ).length;

  const totalReports = reports.length;

  const riskDistribution = {
    high: totalReports
      ? Math.round((highRiskCount / totalReports) * 100)
      : 0,
    medium: totalReports
      ? Math.round((mediumRiskCount / totalReports) * 100)
      : 0,
    low: totalReports
      ? Math.round((lowRiskCount / totalReports) * 100)
      : 0,
  };

  const recentReports = [...reports].slice(0, 5);

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${
        emergencyMode || alertMode
          ? "bg-red-50"
          : "bg-slate-50"
      }`}
    >
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* HERO */}
        <div className="mb-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Hyperlocal Urban Flood Intelligence
              </div>

              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Don't just predict rain.
              </h1>

              <h2 className="mt-2 text-2xl font-semibold text-slate-600">
                Predict where rain becomes a problem.
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-500">
                FlowSense combines rainfall conditions, citizen
                observations and location-based information to
                identify where rainfall may become an urban
                flooding problem.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                System Status
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {emergencyMode
                  ? "🚨 Elevated Risk"
                  : "🟢 Monitoring"}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Prototype intelligence active
              </p>
            </div>

          </div>
        </div>

        {/* EMERGENCY ALERT */}
        {emergencyMode && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm">

            <div className="flex items-start gap-3">

              <div className="text-2xl">
                🚨
              </div>

              <div>
                <p className="font-bold text-red-800">
                  Flood Risk Alert
                </p>

                <p className="mt-1 text-sm leading-6 text-red-700">
                  Current simulated conditions indicate
                  elevated flood risk. Consider avoiding
                  affected areas and checking safer routes.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* TOP CARDS */}
        <div className="grid gap-5 md:grid-cols-3">

          {/* Risk */}
          <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <p className="text-sm font-semibold text-slate-500">
              Current Risk
            </p>

            <div className="mt-3 flex items-center gap-3">
              <span className="text-4xl">
                {riskData.emoji}
              </span>

              <span className="text-2xl font-black text-slate-900">
                {riskData.label}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Risk score
              </span>

              <span className="font-bold text-slate-900">
                {riskData.score}/100
              </span>
            </div>

            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full transition-all duration-500 ${
                  riskData.score >= 70
                    ? "bg-red-500"
                    : riskData.score >= 40
                      ? "bg-yellow-400"
                      : "bg-green-500"
                }`}
                style={{
                  width: `${riskData.score}%`,
                }}
              />
            </div>

            <div className="mt-5 space-y-3">

              <div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Rainfall factor</span>
                  <span>
                    {riskData.rainfallScore}
                  </span>
                </div>

                <div className="mt-1 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all"
                    style={{
                      width: `${riskData.rainfallScore}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Citizen report factor</span>
                  <span>
                    {riskData.reportScore}
                  </span>
                </div>

                <div className="mt-1 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-red-500 transition-all"
                    style={{
                      width: `${riskData.reportScore}%`,
                    }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Rain */}
          <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <p className="text-sm font-semibold text-slate-500">
              Simulated Rainfall
            </p>

            <p className="mt-3 text-4xl font-black text-slate-900">
              🌧️ {rainfall}
              <span className="ml-2 text-lg font-semibold text-slate-400">
                mm
              </span>
            </p>

            <p className="mt-2 font-semibold text-slate-700">
              {riskData.rainfallCondition}
            </p>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full transition-all duration-500 ${
                  rainfall >= 80
                    ? "bg-red-500"
                    : rainfall >= 60
                      ? "bg-orange-400"
                      : rainfall >= 40
                        ? "bg-yellow-400"
                        : "bg-green-500"
                }`}
                style={{
                  width: `${rainfall}%`,
                }}
              />
            </div>

            <div className="mt-2 flex justify-between text-xs text-slate-400">
              <span>0</span>
              <span>100 mm</span>
            </div>
          </div>

          {/* Area */}
          <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <p className="text-sm font-semibold text-slate-500">
              Selected Area
            </p>

            <p className="mt-3 text-2xl font-black text-slate-900">
              📍 {selectedArea}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {riskData.reportCount} citizen report
              {riskData.reportCount !== 1
                ? "s"
                : ""}{" "}
              detected in this area.
            </p>

            <select
              value={selectedArea}
              onChange={(event) =>
                setSelectedArea(event.target.value)
              }
              className="mt-5 w-full rounded-xl border border-slate-300 bg-white p-3 outline-none focus:border-blue-500"
            >
              <option>Andheri East</option>
              <option>Saki Naka</option>
              <option>Bandra</option>
              <option>Powai</option>
              <option>Goregaon</option>
            </select>
          </div>
        </div>

        {/* ANALYTICS CARDS */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-red-50 p-5">
            <p className="text-sm font-semibold text-red-700">
              High Risk Zones
            </p>

            <p className="mt-2 text-4xl font-black text-red-700">
              {highRiskCount}
            </p>

            <p className="mt-1 text-xs text-red-600">
              {riskDistribution.high}% of reports
            </p>
          </div>

          <div className="rounded-2xl bg-yellow-50 p-5">
            <p className="text-sm font-semibold text-yellow-700">
              Water Accumulation
            </p>

            <p className="mt-2 text-4xl font-black text-yellow-700">
              {mediumRiskCount}
            </p>

            <p className="mt-1 text-xs text-yellow-600">
              {riskDistribution.medium}% of reports
            </p>
          </div>

          <div className="rounded-2xl bg-green-50 p-5">
            <p className="text-sm font-semibold text-green-700">
              Low Risk
            </p>

            <p className="mt-2 text-4xl font-black text-green-700">
              {lowRiskCount}
            </p>

            <p className="mt-1 text-xs text-green-600">
              {riskDistribution.low}% of reports
            </p>
          </div>

          <div className="rounded-2xl bg-blue-50 p-5">
            <p className="text-sm font-semibold text-blue-700">
              Citizen Reports
            </p>

            <p className="mt-2 text-4xl font-black text-blue-700">
              {totalReports}
            </p>

            <p className="mt-1 text-xs text-blue-600">
              Community observations
            </p>
          </div>
        </div>

        {/* MAIN MAP */}
        <div className="mt-8 rounded-2xl bg-slate-900 p-4 shadow-sm sm:p-6">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">
                Live Intelligence Map
              </p>

              <h2 className="mt-1 text-2xl font-bold text-white">
                Flood Risk Zones
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Click a marker to inspect citizen observations.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">

              <button
                onClick={() =>
                  setShowHighRiskOnly(
                    (value) => !value
                  )
                }
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                {showHighRiskOnly
                  ? "Show All"
                  : "🔴 High Risk Only"}
              </button>

              <button
                onClick={() =>
                  setAlertMode(
                    (value) => !value
                  )
                }
                className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                  alertMode
                    ? "bg-red-500 text-white"
                    : "bg-white text-slate-900"
                }`}
              >
                {alertMode
                  ? "🚨 Alert ON"
                  : "🚨 Alert Mode"}
              </button>

            </div>
          </div>

          <div
            className={`mt-5 overflow-hidden rounded-2xl transition-all duration-500 ${
              emergencyMode
                ? "ring-4 ring-red-400"
                : ""
            }`}
          >
            <MapView
              reports={filteredReports}
              onSelectReport={setSelectedReport}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-3 rounded-xl bg-white p-4 text-sm font-medium">

            <span>🟢 Safe / Low</span>
            <span>🟡 Water Accumulation</span>
            <span>🔴 Flood Risk</span>

          </div>
        </div>

        {/* SELECTED REPORT */}
        {selectedReport && (
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Selected Citizen Observation
                </p>

                <h3 className="mt-1 text-2xl font-black text-slate-900">
                  📍 {selectedReport.location}
                </h3>
              </div>

              <button
                onClick={() => setSelectedReport(null)}
                className="rounded-lg px-3 py-1 text-sm text-slate-500 hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Severity
                </p>

                <p className="mt-1 font-bold">
                  {selectedReport.severity === "high"
                    ? "🔴 High Risk"
                    : selectedReport.severity ===
                      "medium"
                      ? "🟡 Medium Risk"
                      : "🟢 Low Risk"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Reported
                </p>

                <p className="mt-1 font-bold">
                  {selectedReport.time}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Condition
                </p>

                <p className="mt-1 font-bold text-slate-700">
                  {selectedReport.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* RECENT REPORTS + ANALYTICS */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* Recent reports */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Community Intelligence
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Recent Reports
                </h2>
              </div>

              <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                {totalReports} total
              </div>
            </div>

            <div className="mt-5 space-y-3">

              {recentReports.length === 0 ? (
                <div className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
                  No reports available yet.
                </div>
              ) : (
                recentReports.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => {
                      setSelectedReport(report);
                      window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth",
                      });
                    }}
                    className="flex w-full items-center gap-4 rounded-xl border border-slate-100 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50"
                  >

                    <div className="text-xl">
                      {report.severity === "high"
                        ? "🔴"
                        : report.severity ===
                          "medium"
                          ? "🟡"
                          : "🟢"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900">
                        {report.location}
                      </p>

                      <p className="truncate text-sm text-slate-500">
                        {report.description}
                      </p>
                    </div>

                    <div className="text-xs text-slate-400">
                      {report.time}
                    </div>

                  </button>
                ))
              )}

            </div>
          </div>

          {/* Risk distribution */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Risk Distribution
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Community Risk Overview
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Distribution of currently reported flood conditions.
            </p>

            <div className="mt-7 space-y-6">

              {/* High */}
              <div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-700">
                    🔴 High Risk
                  </span>

                  <span className="font-bold text-slate-900">
                    {riskDistribution.high}%
                  </span>
                </div>

                <div className="mt-2 h-3 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-red-500 transition-all"
                    style={{
                      width: `${riskDistribution.high}%`,
                    }}
                  />
                </div>
              </div>

              {/* Medium */}
              <div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-700">
                    🟡 Water Accumulation
                  </span>

                  <span className="font-bold text-slate-900">
                    {riskDistribution.medium}%
                  </span>
                </div>

                <div className="mt-2 h-3 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-yellow-400 transition-all"
                    style={{
                      width: `${riskDistribution.medium}%`,
                    }}
                  />
                </div>
              </div>

              {/* Low */}
              <div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-700">
                    🟢 Low Risk
                  </span>

                  <span className="font-bold text-slate-900">
                    {riskDistribution.low}%
                  </span>
                </div>

                <div className="mt-2 h-3 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-green-500 transition-all"
                    style={{
                      width: `${riskDistribution.low}%`,
                    }}
                  />
                </div>
              </div>

            </div>

            <div className="mt-8 rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">
                💡 What does this mean?
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                FlowSense uses rainfall conditions and community
                observations to provide an explainable indication
                of where urban flooding may become a problem.
              </p>
            </div>

          </div>
        </div>

        {/* WEATHER SIMULATION */}
        <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-white shadow-sm">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">
                Prototype Control
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                🌧️ Rainfall Simulation
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Increase or reduce simulated rainfall to demonstrate
                how FlowSense reacts to changing environmental
                conditions.
              </p>
            </div>

            <div className="text-center">
              <p className="text-5xl font-black">
                {rainfall}
                <span className="ml-2 text-xl text-slate-400">
                  mm
                </span>
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {riskData.rainfallCondition}
              </p>
            </div>

          </div>

          <div className="mt-6 h-4 overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full transition-all duration-500 ${
                rainfall >= 80
                  ? "bg-red-500"
                  : rainfall >= 60
                    ? "bg-orange-400"
                    : rainfall >= 40
                      ? "bg-yellow-400"
                      : "bg-green-500"
              }`}
              style={{
                width: `${rainfall}%`,
              }}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">

            <button
              onClick={decreaseRain}
              className="rounded-xl bg-white/10 px-4 py-2 font-semibold transition hover:bg-white/20"
            >
              🌤️ Reduce Rain
            </button>

            <button
              onClick={increaseRain}
              className="rounded-xl bg-blue-600 px-4 py-2 font-semibold transition hover:bg-blue-700"
            >
              🌧️ Increase Rain
            </button>

            <button
              onClick={resetRain}
              className="rounded-xl bg-white px-4 py-2 font-semibold text-slate-900 transition hover:bg-slate-200"
            >
              ↻ Reset
            </button>

          </div>

        </div>

        {/* FOOTER MESSAGE */}
        <div className="mt-10 pb-6 text-center">

          <p className="text-lg font-bold text-slate-800">
            “Don't just predict rain. Predict where rain becomes a problem.”
          </p>

          <p className="mt-2 text-sm text-slate-400">
            FlowSense • SDG 11 + SDG 13
          </p>

        </div>

      </section>
    </main>
  );
}

export default Dashboard;