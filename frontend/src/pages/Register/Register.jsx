import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerApi } from "../../api/auth.api";
import { useAuth } from "../../context/authContext";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await registerApi({ name, email, password });

      const { access_token, user } = res.data;

      login(user, access_token);

      navigate("/member/dashboard");
    } catch (err) {
      setError(err?.response?.data?.error || "Registrasi gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gym-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8">
        <h2 className="text-3xl font-black text-white text-center">
          Register <span className="text-gym-green">HexaFit</span>
        </h2>

        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-500 text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <Button type="submit" isLoading={isLoading}>
            REGISTER
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-gym-green font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
