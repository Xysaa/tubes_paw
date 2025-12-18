import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { loginApi } from "../../api/auth.api";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await loginApi({ email, password });

      const { access_token, user } = res.data;

      login(user, access_token);

      // redirect sesuai role
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "trainer") navigate("/trainer/dashboard");
      else navigate("/member/dashboard");

    } catch (err) {
      setError(err?.response?.data?.error || "Login gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gym-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8">
        <h2 className="text-3xl font-black text-white text-center">
          Sign In <span className="text-gym-green">HexaFit</span>
        </h2>

        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-500 text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" isLoading={isLoading}>
            LOGIN
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Belum punya akun?{" "}
          <Link to="/register" className="text-gym-green font-bold">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
