import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Hero from "../../components/Hero";
import ClassCard from "../../components/ClassCard";
import TrainerCard from "../../components/TrainerCard";

import { fetchClasses, fetchTrainers } from "../../api";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 18 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
};

/* ===== Simple auto+drag slider (no extra libs) ===== */
const AutoSlider = ({ images = [] }) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const go = (next) => setIndex((prev) => (prev + next + images.length) % images.length);

  useEffect(() => {
    if (!images.length) return;
    timerRef.current = setInterval(() => go(1), 2800);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className="flex gap-6 cursor-grab active:cursor-grabbing"
        animate={{ x: `calc(${-index} * (320px + 24px))` }}
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
        drag="x"
        dragConstraints={{ left: -((images.length - 1) * (320 + 24)), right: 0 }}
        onDragStart={() => clearInterval(timerRef.current)}
        onDragEnd={(e, info) => {
          if (info.offset.x < -80) go(1);
          if (info.offset.x > 80) go(-1);
          timerRef.current = setInterval(() => go(1), 2800);
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="
              min-w-[320px] h-[140px]
              md:min-w-[360px] md:h-[160px]
              rounded-2xl overflow-hidden
              bg-black/30 shadow-lg
            "
          >
            <img src={src} alt={`slide-${i}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// helper: normalize response -> array
const normalizeToArray = (res) => {
  // axios response -> res.data
  const payload = res?.data ?? res;

  // payload bisa:
  // 1) array langsung
  // 2) { message, data: [...] }
  // 3) { data: [...] }
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const Home = () => {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // slider masih statis (boleh nanti dari API juga)
  const sliderImages = useMemo(
    () => ["/images/gym.jpg", "/images/pelatih1.png", "/images/classes/transformation.jpg", "/images/classes/hiit.jpg","images/classes/functional.jpg"],
    []
  );

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        setLoading(true);
        setErr("");

        const [clsRes, trsRes] = await Promise.all([fetchClasses(), fetchTrainers()]);

        const clsArr = normalizeToArray(clsRes);
        const trsArr = normalizeToArray(trsRes);

        if (!mounted) return;

        // ambil 3 class untuk Home
        const mappedClasses = clsArr.slice(0, 3).map((c) => ({
          id: c.id,
          name: c.name,
          description: c.short_description || c.description || "",
          image: c.image_url || c.image || "/images/class-fallback.jpg",
        }));

        // response trainer kamu:
        // {
        //   id,name,role, profile: { specialization, photo_url, social:{...} }
        // }
        const mappedTrainers = trsArr
          .filter((t) => (t?.role ?? "") === "trainer") // optional, aman
          .filter((t) => !!t?.profile) // biar yang profile null (Default Trainer) gak bikin card kosong
          .slice(0, 6)
          .map((t) => ({
            id: t.id,
            name: t.name,
            role: t.profile?.specialization || "Trainer",
            image: t.profile?.photo_url || "/images/trainer-fallback.jpg",
            socials: {
              facebook: t.profile?.social?.facebook || "#",
              instagram: t.profile?.social?.instagram || "#",
              x: t.profile?.social?.x || "#",
              linkedin: t.profile?.social?.linkedin || "#",
            },
          }));

        setClasses(mappedClasses);
        setTrainers(mappedTrainers);
      } catch (e) {
        console.error(e);
        setErr(e?.response?.data?.error || e?.message || "Gagal mengambil data dari server.");
      } finally {
        setLoading(false);
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <div id="home">
        <Hero />
      </div>

      {/* ===== SECTION 2 (Slider + Green wave) ===== */}
      <section className="bg-zinc-900/95">
        <div className="mx-auto max-w-6xl px-4 pt-14 pb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="space-y-10"
          >
            <motion.div variants={itemVariants}>
              <AutoSlider images={sliderImages} />
            </motion.div>
          </motion.div>
        </div>

        {/* GREEN WAVE FULL WIDTH */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="
            relative w-screen
            left-1/2 -translate-x-1/2
            overflow-hidden
            bg-[#53B602]
            py-12 md:py-16
          "
        >
          <div className="pointer-events-none absolute inset-x-0 -top-10 h-20 bg-zinc-900/95 rounded-b-[60%]" />
          <div className="pointer-events-none absolute inset-x-0 -bottom-10 h-20 bg-zinc-900/95 rounded-t-[60%]" />

          <div className="relative mx-auto max-w-6xl px-4">
            <h2 className="text-center text-3xl md:text-5xl font-extrabold tracking-tight text-black">
              YOUR BODY IS YOUR GREATEST ASSET
            </h2>

            <p className="mt-4 text-center text-black/80 text-sm md:text-lg max-w-3xl mx-auto">
              Train with purpose through structured programs designed to build strength, endurance, and confidence.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="space-y-4">
                {["Strength-Focused Training", "Expert-Guided Workouts", "Visible Results"].map((t) => (
                  <div key={t} className="flex items-center gap-4">
                    <span className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span className="text-black font-bold text-lg">{t}</span>
                  </div>
                ))}
              </div>

              <div className="md:col-span-2 flex flex-wrap gap-5 md:justify-end">
                <button
                  onClick={() => document.getElementById("classes")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-8 py-4 rounded-xl bg-black text-white font-semibold hover:opacity-90 transition"
                >
                  Explore Our Programs
                </button>

                <button
                  onClick={() => navigate("/pricing")}
                  className="px-8 py-4 rounded-xl bg-black/10 text-black font-semibold hover:bg-black/20 transition"
                >
                  See Pricing
                </button>

                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-8 py-4 rounded-xl bg-black/10 text-black font-semibold hover:bg-black/20 transition"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== OUR CLASSES ===== */}
      <section id="classes" className="bg-zinc-900/95">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div variants={itemVariants} className="flex items-start justify-between gap-6">
              <div>
                <p className="text-white/70 text-sm font-semibold tracking-widest">OUR CLASSES</p>
                <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">
                  <span className="text-[#53B602]">Programs</span>{" "}
                  <span className="text-white">That Match Your</span>
                  <br />
                  <span className="text-white">Fitness Goals</span>
                </h2>
              </div>

              <button
                onClick={() => navigate("/classes")}
                className="
                  px-6 py-3 rounded-lg
                  border border-[#53B602]
                  text-white font-semibold
                  hover:bg-[#53B602] hover:text-black
                  transition
                  hidden md:inline-flex
                "
              >
                More Classes
              </button>
            </motion.div>

            {err && (
              <motion.p variants={itemVariants} className="mt-8 text-red-400">
                {err}
              </motion.p>
            )}

            <motion.div variants={containerVariants} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
              {(loading ? Array.from({ length: 3 }) : classes).map((cls, idx) => (
                <motion.div key={cls?.id || idx} variants={cardVariants} className="flex justify-center">
                  {loading ? (
                    <div className="w-[320px] h-[260px] rounded-2xl bg-white/5 animate-pulse" />
                  ) : (
                    <ClassCard cls={cls} />
                  )}
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-10 md:hidden flex justify-center">
              <button
                onClick={() => navigate("/classes")}
                className="px-6 py-3 rounded-lg border border-[#53B602] text-white font-semibold hover:bg-[#53B602] hover:text-black transition"
              >
                More Classes
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== MEET OUR TRAINERS ===== */}
      <section id="trainers" className="bg-zinc-900/95">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-white/70 text-sm font-semibold tracking-widest">OUR TRAINERS</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">
                <span className="text-white">Meet Our</span>{" "}
                <span className="text-[#53B602]">Trainers</span>
              </h2>
              <p className="mt-3 text-white/70 text-sm">Pilih trainer terbaik dan kenali tim kami.</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center"
            >
              {(loading ? Array.from({ length: 6 }) : trainers).map((trainer, idx) => (
                <motion.div key={trainer?.id || idx} variants={cardVariants}>
                  {loading ? (
                    <div className="w-[260px] h-[360px] rounded-2xl bg-white/5 animate-pulse" />
                  ) : (
                    <TrainerCard trainer={trainer} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
