import {
  getGroupYatras,
  getSoloYatras,
  getYatraPackages,
} from "../repositories/yatra.repository";

export async function fetchYatras() {
  return getYatraPackages();
}

export async function fetchGroupYatras() {
  return getGroupYatras();
}

export async function fetchSoloYatras() {
  return getSoloYatras();
}
