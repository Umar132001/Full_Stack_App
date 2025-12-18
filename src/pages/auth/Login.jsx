import { useState } from "react";
import { toast } from "react-toastify";
import AuthShell from "../../layout/AuthShell";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { loginApi, getMeApi } from "../../api/auth.api";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginApi(form);

      // Expect tokens shape: res.data.tokens.access.token
      const token = res?.data?.tokens?.access?.token;
      if (!token) throw new Error("Token missing from response");

      localStorage.setItem("accessToken", token);

      // Fetch profile
      const me = await getMeApi();
      localStorage.setItem("me", JSON.stringify(me.data.user));

      toast.success("Logged in successfully!");
      nav("/dashboard");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Login to access your workspace.">
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@email.com"
          required
        />
        {/* Password with eye icon */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-10 text-slate-500 hover:text-slate-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <Button loading={loading}>Login</Button>

        <div className="flex items-center justify-between text-sm">
          <Link
            className="text-slate-700 hover:underline"
            to="/forgot-password"
          >
            Forgot password?
          </Link>
          <Link
            className="font-semibold text-slate-900 hover:underline"
            to="/register"
          >
            Create account
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
