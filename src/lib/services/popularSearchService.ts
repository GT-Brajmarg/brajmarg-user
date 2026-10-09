import { getPopularSearchesRepository } from "../repositories/popularSearchRepository";

export async function getPopularSearchesService() {
  return getPopularSearchesRepository();
}
