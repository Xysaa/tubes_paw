import api from "./client";

// GET /api/classes
export const fetchClasses = async (params = {}) => {
  const res = await api.get("/api/classes", { params });
  // backend kamu return: { message, data: [...] }
  return res.data?.data || [];
};
export const bookClass = (classId) => {
  return api.post(`/api/classes/${classId}/book`);
};