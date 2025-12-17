export default function Input({ label, as = "input", ...props }) {
  const Component = as;

  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700">{label}</span>
      <Component
        {...props}
        className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
      />
    </label>
  );
}
