import { useState } from "react";
import { toast } from "react-toastify";
import AuthShell from "../../layout/AuthShell";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { forgotPasswordApi } from "../../api/auth.api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await forgotPasswordApi({ email });
      toast.success(res.data?.message || "Reset link sent!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Forgot Password" subtitle="We’ll email you a reset link.">
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
        />
        <Button loading={loading}>Send reset link</Button>

        <p className="text-center text-sm text-slate-600">
          Back to{" "}
          <Link
            className="font-semibold text-slate-900 hover:underline"
            to="/login"
          >
            login
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
