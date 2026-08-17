function About() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-sm md:p-12">

          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-300">
            🌧️ FlowSense
          </div>

          <h1 className="mt-5 text-4xl font-black sm:text-5xl">
            Hyperlocal Urban Flood Intelligence
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            FlowSense is an interactive prototype that connects
            rainfall conditions, citizen observations and location
            intelligence to identify where urban rainfall may become
            a flooding problem.
          </p>

          <p className="mt-6 text-xl font-semibold text-blue-300">
            “Don't just predict rain. Predict where rain becomes a problem.”
          </p>

        </div>

        {/* How it works */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm md:p-8">

          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            System Concept
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            How FlowSense Works
          </h2>

          <div className="mt-7 grid gap-5 md:grid-cols-4">

            <div className="rounded-xl bg-blue-50 p-5">
              <p className="text-2xl">🌧️</p>
              <h3 className="mt-3 font-bold">
                Rainfall
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                The prototype simulates changing rainfall conditions.
              </p>
            </div>

            <div className="rounded-xl bg-indigo-50 p-5">
              <p className="text-2xl">👥</p>
              <h3 className="mt-3 font-bold">
                Citizen Reports
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Users can report water accumulation and flooding.
              </p>
            </div>

            <div className="rounded-xl bg-yellow-50 p-5">
              <p className="text-2xl">🧠</p>
              <h3 className="mt-3 font-bold">
                Risk Engine
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Explainable weighted scoring combines available
                flood signals.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-5">
              <p className="text-2xl">🛣️</p>
              <h3 className="mt-3 font-bold">
                Safer Routes
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Users can compare route flood exposure.
              </p>
            </div>

          </div>
        </div>

        {/* SDG alignment */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-3xl">
              🏙️
            </div>

            <h2 className="mt-3 text-xl font-bold text-slate-900">
              SDG 11 — Sustainable Cities and Communities
            </h2>

            <p className="mt-3 leading-7 text-slate-500">
              FlowSense supports safer and more resilient urban
              environments by identifying flood-prone areas and
              helping people make safer travel decisions.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-3xl">
              🌍
            </div>

            <h2 className="mt-3 text-xl font-bold text-slate-900">
              SDG 13 — Climate Action
            </h2>

            <p className="mt-3 leading-7 text-slate-500">
              The project demonstrates how communities can respond
              to climate-related rainfall and urban flooding through
              accessible digital intelligence.
            </p>
          </div>

        </div>

        {/* Technology */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm md:p-8">

          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            Technology
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Built With
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">

            {[
              "React",
              "JavaScript",
              "Tailwind CSS",
              "React Router",
              "React Leaflet",
              "OpenStreetMap",
              "localStorage",
            ].map((technology) => (
              <span
                key={technology}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                {technology}
              </span>
            ))}

          </div>

        </div>

        {/* Prototype note */}
        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">

          <p className="font-bold text-blue-900">
            Prototype Scope
          </p>

          <p className="mt-2 text-sm leading-7 text-blue-800">
            FlowSense is an academic prototype. Rainfall values,
            routes and citizen reports are simulated or stored
            locally in the browser. The architecture can later be
            extended with live weather services, GPS, cloud
            databases and real-time routing.
          </p>

        </div>

        <div className="mt-10 pb-8 text-center text-sm text-slate-400">
          FlowSense • Micro-Project • SDG 11 + SDG 13
        </div>

      </div>
    </main>
  );
}

export default About;