// Data Paket Membership (Plans)
export const initialPlans = [
  {
    id: 1,
    name: "BRONZE ACCESS",
    description: "Akses gym jam 09:00 - 15:00. Cocok untuk student.",
    price: 150000,
    duration_days: 30
  },
  {
    id: 2,
    name: "GOLD UNLIMITED",
    description: "Akses 24 Jam ke semua alat dan kelas reguler.",
    price: 350000,
    duration_days: 30
  },
  {
    id: 3,
    name: "PLATINUM YEARLY",
    description: "Paket hemat 1 tahun + Free Personal Trainer 2x.",
    price: 3500000,
    duration_days: 365
  }
];

// Simulasi Membership User yang sedang aktif
export const activeMembership = {
  id: 101,
  status: "active",
  start_at: "2025-12-01T08:00:00",
  end_at: "2025-12-31T08:00:00",
  plan: {
    id: 2,
    name: "GOLD UNLIMITED",
    price: 350000,
    duration_days: 30
  }
};