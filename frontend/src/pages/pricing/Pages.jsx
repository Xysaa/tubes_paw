import React, { useEffect, useState } from "react";
import {
  fetchMembershipPlans,
  subscribeMembership,
  fetchMyMembership,
} from "../../api/memberships.api";
import { useAuth } from "../../context/authContext";

/* ===== ICON ===== */
const CheckIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="3"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
  </svg>
);

/* ===== CARD ===== */
const PricingCard = ({ plan, activePlanId, onSubscribe }) => {
  const isActive = activePlanId === plan.id;

  return (
    <div
      className="
        group rounded-2xl p-6
        bg-zinc-900/80
        border border-white/10
        transition-all duration-300
        hover:bg-[#53B602]
        hover:scale-[1.03]
      "
    >
      {/* TITLE */}
      <h3 className="text-lg font-bold text-lime-400 group-hover:text-black">
        {plan.name}
      </h3>

      {/* PRICE */}
      <div className="mt-3 text-3xl font-extrabold text-white group-hover:text-black">
        Rp {Number(plan.price).toLocaleString("id-ID")}
      </div>

      <p className="mt-1 text-sm text-white/60 group-hover:text-black/70">
        Berlaku {plan.duration_days} hari
      </p>

      <div className="my-5 h-px bg-white/10 group-hover:bg-black/20" />

      {/* FEATURES */}
      <ul className="space-y-3">
        {(plan.features || []).map((f, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm text-white/85 group-hover:text-black"
          >
            <span
              className="
                mt-0.5 flex h-5 w-5 items-center justify-center rounded-full
                bg-lime-500/20 text-lime-300
                group-hover:bg-black
                group-hover:text-[#53B602]
              "
            >
              <CheckIcon />
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* BUTTON */}
      <button
        disabled={isActive}
        onClick={() => onSubscribe(plan.id)}
        className={`
          mt-7 w-full rounded-xl py-3 text-sm font-semibold transition
          ${
            isActive
              ? "bg-black/30 text-white cursor-not-allowed"
              : "bg-lime-500 text-black hover:bg-black hover:text-[#53B602]"
          }
        `}
      >
        {isActive ? "Active Plan" : "Subscribe"}
      </button>
    </div>
  );
};

/* ===== PAGE ===== */
export default function PricingPage() {
  const { isAuthenticated } = useAuth();

  const [plans, setPlans] = useState([]);
  const [activePlanId, setActivePlanId] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===== LOAD PLANS (PUBLIC) ===== */
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetchMembershipPlans();
        setPlans(res.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch membership plans", err);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  /* ===== LOAD USER MEMBERSHIP (AUTH ONLY) ===== */
  useEffect(() => {
    if (!isAuthenticated) return;

    const loadMyMembership = async () => {
      try {
        const res = await fetchMyMembership();
        setActivePlanId(res.data?.membership?.id || null);
      } catch {
        setActivePlanId(null);
      }
    };

    loadMyMembership();
  }, [isAuthenticated]);

  /* ===== SUBSCRIBE ===== */
  const handleSubscribe = async (id) => {
    if (!isAuthenticated) {
      alert("Please login to subscribe a membership");
      return;
    }

    try {
      await subscribeMembership(id);
      setActivePlanId(id);
      alert("Membership subscribed successfully!");
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to subscribe");
    }
  };

  return (
    <section className="bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-20">
        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
            HexaFit Membership
          </p>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-lime-400 sm:text-4xl">
            Choose Your Right Plan
          </h1>

          <p className="mt-3 text-sm text-white/65 sm:text-base">
            Flexible plans designed to match your fitness goals.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[360px] rounded-2xl bg-white/5 animate-pulse"
                />
              ))
            : plans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  activePlanId={activePlanId}
                  onSubscribe={handleSubscribe}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
