export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
        <div className="grid w-full gap-8 md:grid-cols-2">
          <div className="hidden rounded-3xl bg-slate-900 p-10 text-white md:block">
            <h2 className="text-3xl font-bold">Workspace Manager</h2>
            <p className="mt-3 text-slate-200">
              Manage users, tasks, projects, and reports with a clean modern
              experience.
            </p>
            <div className="mt-10 rounded-2xl bg-white/10 p-6">
              <p className="text-sm text-slate-200">
                ✔ Auth ✔ Verification ✔ Reset Password ✔ Smooth UX ✔ Toast
                feedback
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
            )}
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
