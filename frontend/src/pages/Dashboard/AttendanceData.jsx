// File: src/data/attendanceData.js

// Data Peserta (Untuk Trainer mengabsen)
export const classParticipants = [
  { id: 1, name: "Budi Santoso", status: "present" },
  { id: 2, name: "Siti Aminah", status: "absent" },
  { id: 3, name: "Rudi Hartono", status: "present" },
  { id: 4, name: "Dewi Lestari", status: "pending" }, 
  { id: 5, name: "Agus Setiawan", status: "pending" },
];

// Data Riwayat (Untuk Member melihat history)
export const attendanceHistory = [
  { id: 101, className: "BODY COMBAT", date: "2025-01-15", time: "19:00", instructor: "Coach John", status: "Hadir" },
  { id: 102, className: "YOGA FLOW", date: "2025-01-12", time: "18:00", instructor: "Coach Sarah", status: "Hadir" },
  { id: 103, className: "STRENGTH TRAINING", date: "2025-01-10", time: "17:00", instructor: "Coach Mike", status: "Absen" }, 
];