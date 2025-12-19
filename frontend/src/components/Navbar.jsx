import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setMobileOpen(false);
    navigate("/");
  };

  const goHomeAndScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const pillBtn =
    "px-4 py-1.5 rounded-full border border-[#53B602] text-white text-sm " +
    "transition-all duration-200 hover:bg-[#53B602] hover:text-zinc-900";

  /* ================= ROLE ROUTE MAP ================= */
  const dashboardRoute =
    user?.role === "admin"
      ? "/admin/dashboard"
      : user?.role === "trainer"
      ? "/trainer/dashboard"
      : "/member/dashboard";

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 bg-zinc-900/95 backdrop-blur border-b border-white/5 ${scrolled ? "shadow-lg" : ""}`}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="h-16 flex items-center justify-between">

            {/* LOGO */}
            <button onClick={() => navigate("/")} className="flex items-center gap-2">
              <img src="/images/2.png" className="w-8 h-8" />
              <span className="text-xl font-bold text-white">
                Hexa<span className="text-[#53B602]">Fit</span>
              </span>
            </button>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-3">
              {!isAuthenticated && (
                <>
                  <button onClick={() => goHomeAndScroll("home")} className={pillBtn}>Home</button>
                  <button onClick={() => goHomeAndScroll("trainers")} className={pillBtn}>Trainers</button>
                  <Link to="/pricing" className={pillBtn}>Pricing</Link>
                  <Link to="/About" className={pillBtn}>about</Link>
                </>
              )}

              {isAuthenticated && (
                <>
                  <Link to={dashboardRoute} className={pillBtn}>Dashboard</Link>

                  {user.role !== "admin" && (
                    <Link
                      to={user.role === "trainer" ? "/trainer/classes" : "/member/classes"}
                      className={pillBtn}
                    >
                      Classes
                    </Link>
                  )}

                  {user.role === "admin" && (
                    <>
                      <Link to="/trainer/memberships" className={pillBtn}>Memberships</Link>
                      <Link to="/api/admin/users" className={pillBtn}>Users</Link>
                    </>
                  )}
                </>
              )}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              {!isAuthenticated ? (
                <button onClick={() => navigate("/login")} className="text-[#53B602] font-semibold">
                  Sign In
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(v => !v)}
                    className="flex items-center gap-2 text-white"
                  >
                    <span className="w-8 h-8 rounded-full bg-[#53B602]/20 flex items-center justify-center">
                      {user?.name?.[0]?.toUpperCase()}
                    </span>
                    <span className="text-sm">{user?.name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-48 bg-zinc-900 border border-white/10 rounded-lg">
                      <Link
                        to={dashboardRoute}
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-3 text-sm hover:bg-white/5"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>

      <div className="h-16" />
    </>
  );
};

export default Navbar;
