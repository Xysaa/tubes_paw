import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ClassCard from "../../components/ClassCard";
import LoadingSpinner from "../../components/LoadingSpinner";

import { fetchClasses } from "../../api/classes.api";
import { fetchMyMembership } from "../../api/memberships.api";
import { useAuth } from "../../context/authContext";

/* ===== Variants ===== */
const pageVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const headerVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const gridVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const MemberClasses = () => {
  const { isAuthenticated, user } = useAuth();

  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");

  const [membership, setMembership] = useState(null);
  const [hasMembership, setHasMembership] = useState(false);

  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  // fetch membership (member only) + classes
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setErrMsg("");

      try {
        // Fetch classes selalu boleh (public)
        const classesData = await fetchClasses();
        setClasses(classesData);

        // Membership cuma untuk role member & authenticated
        if (isAuthenticated && user?.role === "member") {
          try {
            const myRes = await fetchMyMembership(); // GET /api/my/membership
            const m = myRes.data?.data || null;

            setMembership(m);
            setHasMembership(
              m?.status === "active" &&
                !!m?.end_at &&
                new Date(m.end_at).getTime() > Date.now()
            );
          } catch (e) {
            // kalau 401 / belum punya membership / dsb
            setMembership(null);
            setHasMembership(false);
          }
        } else {
          setMembership(null);
          setHasMembership(false);
        }
      } catch (e) {
        console.error(e);
        setErrMsg(
          e?.response?.data?.error ||
            e?.response?.data?.message ||
            "Gagal memuat data kelas."
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [isAuthenticated, user?.role]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return classes;
    return classes.filter((c) => {
      const name = (c?.name || "").toLowerCase();
      const desc = (c?.description || "").toLowerCase();
      const sd = (c?.short_description || "").toLowerCase();
      return name.includes(q) || desc.includes(q) || sd.includes(q);
    });
  }, [classes, search]);

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      className="min-h-screen bg-gym-black py-12 px-4 sm:px-6 lg:px-8 pt-24"
      variants={pageVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={headerVariant}
          initial="hidden"
          animate="visible"
          className="mb-8 border-b border-zinc-800 pb-6"
        >
          <h1 className="text-4xl font-black text-white mb-2 uppercase">
            Kelas <span className="text-gym-green">Tersedia</span>
          </h1>
          <p className="text-gray-400">
            Pilih kelas favoritmu. Booking hanya bisa jika kamu punya membership
            aktif.
          </p>

          {/* Membership status banner (simple) */}
          {isAuthenticated && user?.role === "member" && (
            <div
              className={`mt-5 rounded-xl border p-4 ${
                hasMembership
                  ? "bg-green-900/10 border-green-500/30"
                  : "bg-zinc-900 border-zinc-800"
              }`}
            >
              <p className="text-sm text-white">
                Status Membership:{" "}
                <span
                  className={`font-bold ${
                    hasMembership ? "text-gym-green" : "text-red-400"
                  }`}
                >
                  {hasMembership ? "AKTIF" : "BELUM AKTIF"}
                </span>
              </p>

              {hasMembership ? (
                <p className="text-xs text-gray-400 mt-1">
                  Plan:{" "}
                  <span className="text-white">
                    {membership?.plan?.name || "-"}
                  </span>{" "}
                  • berakhir:{" "}
                  <span className="text-white">
                    {membership?.end_at
                      ? new Date(membership.end_at).toLocaleString("id-ID")
                      : "-"}
                  </span>
                </p>
              ) : (
                <p className="text-xs text-gray-400 mt-1">
                  Silakan beli membership dulu di menu Pricing / Membership.
                </p>
              )}
            </div>
          )}

          {/* Search */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kelas (nama / deskripsi)..."
              className="
                w-full sm:max-w-md
                rounded-xl bg-zinc-900 border border-zinc-800
                px-4 py-3 text-white placeholder:text-gray-500
                outline-none focus:border-gym-green/70
              "
            />
            <button
              onClick={() => setSearch("")}
              className="
                rounded-xl px-4 py-3 font-bold
                bg-zinc-900 border border-zinc-800 text-gray-200
                hover:border-gym-green/60 transition
              "
            >
              Reset
            </button>
          </div>
        </motion.div>

        {/* Error */}
        {errMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-900/20 border border-red-500/30 text-red-200">
            {errMsg}
          </div>
        )}

        {/* Classes Grid */}
        {filtered.length > 0 ? (
          <motion.div
            variants={gridVariant}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((cls) => (
              <motion.div key={cls.id} variants={cardVariant}>
                <ClassCard cls={cls} hasMembership={hasMembership} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-12"
          >
            <p>Belum ada kelas yang tersedia / sesuai pencarian.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MemberClasses;
