function getTokenFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("submitBtn");
  const msg = document.getElementById("message");

  if (!btn) return;

  btn.addEventListener("click", async () => {
    const password = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirm").value.trim();
    const token = getTokenFromUrl();

    msg.textContent = "";
    msg.className = "message";

    if (!token) {
      alert("Invalid or missing reset token.");
      msg.textContent = "Invalid or missing reset token.";
      msg.classList.add("error");
      return;
    }

    if (!password || !confirm) {
      alert("Please fill both fields.");
      msg.textContent = "Please fill both fields.";
      msg.classList.add("error");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match.");
      msg.textContent = "Passwords do not match.";
      msg.classList.add("error");
      return;
    }

    btn.disabled = true;

    try {
      const res = await fetch("/api/v1/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        msg.textContent = data.message || "Reset link is invalid or expired.";
        alert("Reset link is invalid or expired.");
        msg.classList.add("error");
      } else {
        msg.textContent = "Password successfully reset. You can now log in.";
        alert("Password successfully reset. You can now log in.");
        msg.classList.add("success");
      }
    } catch (err) {
      msg.textContent = "Something went wrong. Please try again.";
      alert("Something went wrong. Please try again.");
      msg.classList.add("error");
    } finally {
      btn.disabled = false;
    }
  });
});
