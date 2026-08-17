import { useMemo, useState } from "react";
import { routesData } from "../data/routesData";
import { getReports } from "../services/reportStorage";
import { calculateRouteRisk } from "../services/routeEngine";

function RoutesPage() {
  const [from, setFrom] = useState("Andheri East");
  const [to, setTo] = useState("Saki Naka");
  const [searched, setSearched] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const reports = getReports();

  const availableRoutes = useMemo(() => {
    return routesData
      .filter(
        (route) =>
          route.from === from &&
          route.to === to
      )
      .map((route) => ({
        ...route,
        risk: calculateRouteRisk(route, reports),
      }))
      .sort((a, b) => a.risk.score - b.risk.score);
  }, [from, to, reports.length]);

  const handleSearch = () => {
    setSearched(true);

    if (availableRoutes.length > 0) {
      setSelectedRoute(availableRoutes[0]);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Route Safety Intelligence
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            🛣️ Find a Safer Route
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            FlowSense compares flood exposure across available routes
            and recommends the safer option.
          </p>
        </div>

        {/* Search box */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="text-sm font-semibold text-slate-800">
                Starting Point
              </label>

              <select
                value={from}
                onChange={(event) => {
                  setFrom(event.target.value);
                  setSearched(false);
                }}
                className="mt-2 w-full rounded-xl border border-slate-300 p-3"
              >
                <option>Andheri East</option>
                <option>Bandra</option>
                <option>Powai</option>
                <option>Goregaon</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-800">
                Destination
              </label>

              <select
                value={to}
                onChange={(event) => {
                  setTo(event.target.value);
                  setSearched(false);
                }}
                className="mt-2 w-full rounded-xl border border-slate-300 p-3"
              >
                <option>Saki Naka</option>
                <option>Andheri East</option>
                <option>Bandra</option>
                <option>Powai</option>
              </select>
            </div>

          </div>

          <button
            onClick={handleSearch}
            className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            🔎 Find Safer Routes
          </button>

        </div>

        {/* Results */}
        {searched && (
          <div className="mt-8">

            <div className="mb-5">
              <p className="text-sm text-slate-500">
                Route analysis
              </p>

              <h2 className="text-2xl font-bold text-slate-900">
                {from} → {to}
              </h2>
            </div>

            {availableRoutes.length === 0 ? (
              <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <p className="text-lg font-semibold text-slate-800">
                  No prototype route available
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Try another starting point and destination.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-3">

                {availableRoutes.map((route, index) => (
                  <button
                    key={route.id}
                    onClick={() => setSelectedRoute(route)}
                    className={`text-left rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                      selectedRoute?.id === route.id
                        ? "ring-2 ring-blue-500"
                        : ""
                    }`}
                  >

                    {index === 0 && (
                      <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                        ⭐ SAFEST OPTION
                      </span>
                    )}

                    <div className="mt-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {route.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {route.distance} km · {route.time} min
                        </p>
                      </div>

                      <span className="text-2xl">
                        {route.risk.emoji}
                      </span>
                    </div>

                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase text-slate-400">
                        Flood Risk
                      </p>

                      <p className="mt-1 text-lg font-bold">
                        {route.risk.label}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Safety score:{" "}
                        {100 - route.risk.score}/100
                      </p>
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all"
                        style={{
                          width: `${route.risk.score}%`,
                        }}
                      />
                    </div>

                  </button>
                ))}

              </div>
            )}

          </div>
        )}

        {/* Selected route */}
        {selectedRoute && (
          <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-white">

            <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
              FlowSense Recommendation
            </p>

            <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="text-3xl font-bold">
                  {selectedRoute.risk.emoji} {selectedRoute.name}{" "}
                  {selectedRoute.name}
                </h2>

                <p className="mt-2 max-w-2xl text-slate-300">
                  {selectedRoute.description}
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-5 text-center">
                <p className="text-sm text-slate-400">
                  Safety Score
                </p>

                <p className="mt-1 text-4xl font-bold">
                  {100 - selectedRoute.risk.score}
                </p>

                <p className="text-sm text-slate-400">
                  / 100
                </p>
              </div>

            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">

              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs text-slate-400">
                  Distance
                </p>

                <p className="mt-1 text-xl font-bold">
                  {selectedRoute.distance} km
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs text-slate-400">
                  Estimated Time
                </p>

                <p className="mt-1 text-xl font-bold">
                  {selectedRoute.time} min
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs text-slate-400">
                  Flood Risk
                </p>

                <p className="mt-1 text-xl font-bold">
                  {selectedRoute.risk.emoji}{" "}
                  {selectedRoute.risk.label}
                </p>
              </div>

            </div>
            <div className="mt-5 rounded-xl bg-blue-500/10 p-4">
  <p className="text-sm font-semibold text-blue-300">
    Why FlowSense recommends this route
  </p>

  <p className="mt-1 text-sm text-slate-300">
    This route currently has lower flood exposure compared
    with the available alternatives.
  </p>
</div>
          </div>
        )}

      </div>
    </main>
  );
}

export default RoutesPage;