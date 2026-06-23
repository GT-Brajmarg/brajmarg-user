import { getHomeData } from "../repositories/home.repository";

export async function fetchHomeData() {
  return getHomeData();
}
