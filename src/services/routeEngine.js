export function calculateRouteRisk(route, reports) {
  const highRiskReports = reports.filter(
    (report) => report.severity === "high"
  );

  const mediumRiskReports = reports.filter(
    (report) => report.severity === "medium"
  );

  const reportPressure =
    highRiskReports.length * 12 +
    mediumRiskReports.length * 6;

  const riskScore = Math.min(
    100,
    route.floodExposure + reportPressure
  );

  let level;
  let label;
  let emoji;

  if (riskScore >= 70) {
    level = "high";
    label = "HIGH RISK";
    emoji = "🔴";
  } else if (riskScore >= 40) {
    level = "medium";
    label = "MEDIUM RISK";
    emoji = "🟡";
  } else {
    level = "low";
    label = "LOW RISK";
    emoji = "🟢";
  }

  return {
    score: riskScore,
    level,
    label,
    emoji,
  };
}