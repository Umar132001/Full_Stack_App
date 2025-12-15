import { Link } from "react-router-dom";

export default function Dashboard() {
  const me = JSON.parse(localStorage.getItem("me") || "{}");

  const cards = [
    {
      title: "Projects",
      value: "Manage all projects",
      path: "/projects",
    },
    {
      title: "Tasks",
      value: "Track progress",
      path: "/tasks",
    },
    {
      title: "Workspace",
      value: "Team & roles",
      path: "/workspace",
    },
    {
      title: "Reports",
      value: "Insights & analytics",
      path: "/reports",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="text-3xl font-bold text-slate-900">
        Welcome back, {me?.name} 👋
      </h1>

      <p className="mt-2 text-slate-600">
        Manage your projects, tasks, and team from one place.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.path}
            className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition
                       hover:-translate-y-1 hover:shadow-md hover:border-slate-300
                       focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <h3 className="font-semibold text-slate-900 group-hover:text-slate-950">
              {card.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{card.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
