import {
  getActiveAlerts,
  getFestivalAlerts,
} from "../repositories/alert.repository";

export async function fetchAlerts() {
  return getActiveAlerts();
}

export async function fetchFestivalAlerts() {
  return getFestivalAlerts();
}
