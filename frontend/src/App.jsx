import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext";
import { ProtectedRoute, RoleProtectedRoute } from "./components/ProtectedRoute";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PricingPage from "./pages/pricing/Pages";

// Dashboards
import MemberDashboard from "./pages/Dashboard/MemberDashboard";
import TrainerDashboard from "./pages/Dashboard/TrainerDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";

// Classes
import MemberClasses from "./pages/Classes/MemberClasses";
import TrainerClasses from "./pages/Classes/TrainerClasses";

// Memberships
import AdminMemberships from "./pages/Memberships/TrainerMemberships";
import MemberMemberships from "./pages/Memberships/MemberMemberships";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <main className="main-content">
          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* DASHBOARD REDIRECT */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardRedirect />
                </ProtectedRoute>
              }
            />
            {/* ADMIN */}
            <Route
              path="/admin/dashboard"
              element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </RoleProtectedRoute>
              }
            />
            {/* MEMBER */}
            <Route
              path="/member/dashboard"
              element={
                <RoleProtectedRoute allowedRoles={["member"]}>
                  <MemberDashboard />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/member/classes"
              element={
                <RoleProtectedRoute allowedRoles={["member"]}>
                  <MemberClasses />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/member/memberships"
              element={
                <RoleProtectedRoute allowedRoles={["member"]}>
                  <MemberMemberships />
                </RoleProtectedRoute>
              }
            />

            {/* TRAINER */}
            <Route
              path="/trainer/dashboard"
              element={
                <RoleProtectedRoute allowedRoles={["trainer"]}>
                  <TrainerDashboard />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/trainer/classes"
              element={
                <RoleProtectedRoute allowedRoles={["trainer"]}>
                  <TrainerClasses />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/trainer/memberships"
              element={
                <RoleProtectedRoute allowedRoles={["trainer"]}>
                  <AdminMemberships />
                </RoleProtectedRoute>
              }
            />

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

/* ===== AUTO REDIRECT DASHBOARD ===== */
const DashboardRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "trainer") {
    return <Navigate to="/trainer/dashboard" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/member/dashboard" replace />;
};

export default App;
