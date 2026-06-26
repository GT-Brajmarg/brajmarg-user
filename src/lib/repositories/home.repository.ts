import { getTemples } from "./temple.repository";
import { getActiveAlerts } from "./alert.repository";
import { getYatraPackages } from "./yatra.repository";
import { getLiveDarshan } from "./live-darshan.repository"; // create or move this logic

export async function getHomeData() {
  const [hero, temples, alerts, featuredYatras] = await Promise.all([
    getLiveDarshan(),
    getTemples(),
    getActiveAlerts(),
    getYatraPackages(),
  ]);

  return {
    hero,
    temples,
    alerts,
    featuredYatras,
  };
}
