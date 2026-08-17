import { floodReports } from "../data/mockData";

const STORAGE_KEY = "flowsense_reports";

export function getReports() {
  const savedReports = localStorage.getItem(STORAGE_KEY);

  if (savedReports) {
    return JSON.parse(savedReports);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(floodReports));

  return floodReports;
}

export function saveReport(report) {
  const existingReports = getReports();

  const updatedReports = [report, ...existingReports];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedReports)
  );

  // Tell other parts of the app that reports changed
  window.dispatchEvent(
    new Event("flowsense-reports-updated")
  );

  return updatedReports;
}