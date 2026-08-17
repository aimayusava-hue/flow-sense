export function calculateFloodRisk({
  rainfall,
  reports,
  selectedArea,
}) {
  // Rainfall score
  let rainfallScore = 0;
  let rainfallCondition = "";

  if (rainfall >= 80) {
    rainfallScore = 100;
    rainfallCondition = "Extreme rainfall";
  } else if (rainfall >= 60) {
    rainfallScore = 80;
    rainfallCondition = "Heavy rainfall";
  } else if (rainfall >= 40) {
    rainfallScore = 60;
    rainfallCondition = "Moderate rainfall";
  } else if (rainfall >= 20) {
    rainfallScore = 40;
    rainfallCondition = "Light rainfall";
  } else {
    rainfallScore = 15;
    rainfallCondition = "Minimal rainfall";
  }

  // Reports belonging to selected area
  const areaReports = reports.filter(
    (report) => report.location === selectedArea
  );

  // Report score
  let reportScore = 0;

  areaReports.forEach((report) => {
    if (report.severity === "high") {
      reportScore += 35;
    } else if (report.severity === "medium") {
      reportScore += 20;
    } else {
      reportScore += 10;
    }
  });

  reportScore = Math.min(reportScore, 100);

  // Final weighted score
  const finalScore = Math.round(
    rainfallScore * 0.5 +
      reportScore * 0.5
  );

  let level;
  let label;
  let emoji;

  if (finalScore >= 70) {
    level = "high";
    label = "FLOOD RISK";
    emoji = "🔴";
  } else if (finalScore >= 40) {
    level = "medium";
    label = "WATER ACCUMULATION";
    emoji = "🟡";
  } else {
    level = "low";
    label = "SAFE";
    emoji = "🟢";
  }

  return {
    score: finalScore,
    level,
    label,
    emoji,
    rainfallScore,
    rainfallCondition,
    reportScore,
    reportCount: areaReports.length,
  };
}