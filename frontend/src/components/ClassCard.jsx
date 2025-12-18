import React, { useState } from "react";
import { bookClass } from "../api/classes.api";
import { useAuth } from "../context/authContext";

const ClassCard = ({ cls, hasMembership }) => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    if (!isAuthenticated) {
      alert("Silakan login terlebih dahulu");
      return;
    }

    if (!hasMembership) {
      alert("Kamu harus memiliki membership aktif untuk booking kelas");
      return;
    }

    try {
      setLoading(true);
      await bookClass(cls.id);
      alert("Berhasil booking kelas 🎉");
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Gagal booking kelas";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[520px] mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800">
        {/* Image */}
        <img
          src={cls.image_url || "/images/class-default.jpg"}
          alt={cls.name}
          className="w-full h-[260px] object-cover"
        />

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-white">{cls.name}</h3>

          {cls.short_description && (
            <p className="text-sm text-gray-400 mt-1">
              {cls.short_description}
            </p>
          )}

          <p className="text-sm text-gray-500 mt-2">
            🕒 {cls.schedule}
          </p>

          <p className="text-sm text-gray-500">
            👥 Kapasitas: {cls.capacity}
          </p>

          {/* BOOK BUTTON */}
          <button
            onClick={handleBook}
            disabled={loading || !hasMembership}
            className={`
              mt-4 w-full py-3 rounded-lg font-bold transition
              ${
                hasMembership
                  ? "bg-gym-green text-black hover:brightness-110"
                  : "bg-zinc-800 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            {loading
              ? "Processing..."
              : hasMembership
              ? "BOOK CLASS"
              : "MEMBERSHIP REQUIRED"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
