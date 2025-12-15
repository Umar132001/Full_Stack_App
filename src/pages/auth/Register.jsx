import { useState } from "react";
import { toast } from "react-toastify";
import AuthShell from "../../layout/AuthShell";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { registerApi } from "../../api/auth.api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerApi(form);
      toast.success(
        res.data?.message || "Registered! Please verify your email."
      );
      nav("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Register and verify your email before logging in."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="John Doe"
          required
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@email.com"
          required
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="••••••••"
          required
        />
        <Button loading={loading}>Create account</Button>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            className="font-semibold text-slate-900 hover:underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
