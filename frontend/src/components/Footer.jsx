import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const doScroll = () =>
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(doScroll, 120);
    } else {
      doScroll();
    }
  };

  const sectionTitle = "text-white text-lg font-semibold";
  const linkCls = "text-white/80 hover:text-white transition text-sm";

  return (
    <footer className="bg-zinc-900/95 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Left: Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span
                className="
                  w-10 h-10 rounded-full
                  bg-[#53B602]
                  ring-2 ring-[#53B602]/70
                  flex items-center justify-center
                  overflow-hidden
                "
              >
                <img src="/images/2.png" alt="HexaFit Logo" className="w-7 h-7" />
              </span>

              <span className="text-xl font-semibold text-white tracking-wide">
                Hexa<span className="text-[#53B602]">Fit</span>
              </span>
            </div>

            <p className="mt-4 text-white/70 text-sm leading-relaxed max-w-xs">
              Your ultimate fitness platform for structured training, expert coaches,
              and real results.
            </p>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className={sectionTitle}>Quick Link</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <button onClick={() => scrollToSection("classes")} className={linkCls}>
                  Classes
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("trainers")} className={linkCls}>
                  Trainers
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("pricing")} className={linkCls}>
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")} className={linkCls}>
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* For Coach */}
          <div>
            <h3 className={sectionTitle}>For Coach</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/register?role=trainer" className={linkCls}>
                  Become a Coach
                </Link>
              </li>
              <li>
                <Link to="/trainer/dashboard" className={linkCls}>
                  Coach Dashboard
                </Link>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className={linkCls}>
                  Partner With Us
                </button>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className={sectionTitle}>Connect With Us</h3>

            <div className="mt-4 flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white flex items-center justify-center hover:opacity-90 transition"
                aria-label="LinkedIn"
              >
                <span className="text-[#0A66C2] font-black text-lg">in</span>
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white flex items-center justify-center hover:opacity-90 transition"
                aria-label="Facebook"
              >
                <span className="text-[#1877F2] font-black text-lg">f</span>
              </a>

              {/* X */}
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white flex items-center justify-center hover:opacity-90 transition"
                aria-label="X"
              >
                <span className="text-black font-black text-lg">X</span>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white flex items-center justify-center hover:opacity-90 transition"
                aria-label="Instagram"
              >
                <span className="text-pink-600 font-black text-lg">◎</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} HexaFit System. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button onClick={() => scrollToSection("home")} className="text-white/60 hover:text-white text-sm transition">
              Back to top
            </button>
            <span className="text-white/20">|</span>
            <Link to="/privacy" className="text-white/60 hover:text-white text-sm transition">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
