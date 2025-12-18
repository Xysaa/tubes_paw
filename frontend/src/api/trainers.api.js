import api from "./client";

// pastikan backend punya endpoint ini:
// GET /api/trainers  (atau /api/users/trainers)
export const fetchTrainers = async () => {
  const res = await api.get("/api/trainers");
  return res.data?.data || [];
};
