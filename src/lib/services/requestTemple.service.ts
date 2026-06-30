import {
  createTempleRequestRepository,
  getTempleRequestAccessOptionsRepository,
} from "../repositories/requestTemple.repository";

export async function fetchTempleRequestAccessOptions() {
  return getTempleRequestAccessOptionsRepository();
}

export async function submitTempleRequest(payload: {
  temple_name: string;
  city: string;
  state: string;
  address: string;
  requester_name: string;
  requester_email: string;
  requested_access: string[];
}) {
  return createTempleRequestRepository(payload);
}
