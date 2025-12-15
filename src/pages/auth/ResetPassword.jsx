import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams, Link } from "react-router-dom";
import AuthShell from "../../layout/AuthShell";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { resetPasswordApi } from "../../api/auth.api";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = useMemo(() => params.get("token"), [params]);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Token missing in URL");
    setLoading(true);
    try {
      const res = await resetPasswordApi({ token, newPassword });
      toast.success(res.data?.message || "Password updated!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Reset Password" subtitle="Choose a new password.">
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        <Button loading={loading}>Update password</Button>

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
