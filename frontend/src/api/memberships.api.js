import api from "./client";

export const fetchMembershipPlans = () =>
  api.get("/api/memberships");

export const subscribeMembership = (id) =>
  api.post(`/api/memberships/${id}/subscribe`);

export const fetchMyMembership = () =>
  api.get("/api/my/membership");
