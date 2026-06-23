import { getTemples } from "./temple.repository";
import { getActiveAlerts } from "./alert.repository";
import { getYatraPackages } from "./yatra.repository";

export async function getHomeData() {
  const [temples, alerts, featuredYatras] = await Promise.all([
    getTemples(),
    getActiveAlerts(),
    getYatraPackages(),
  ]);

  return {
    temples,
    alerts,
    featuredYatras,
  };
}
