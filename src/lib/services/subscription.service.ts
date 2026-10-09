import { getSubscriptionPlans } from "../repositories/subscription.repository";

export async function fetchSubscriptionPlans() {
  return getSubscriptionPlans();
}
