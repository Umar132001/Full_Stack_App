import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ProjectForm({ initial = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    name: initial.name || "",
    description: initial.description || "",
    template: initial.template || "basic",
    isPublic: initial.isPublic || false,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <Input
        label="Project Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <Input
        label="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <label className="block text-sm font-medium">
        Template
        <select
          className="mt-1 w-full rounded-xl border px-3 py-2"
          value={form.template}
          onChange={(e) => setForm({ ...form, template: e.target.value })}
        >
          <option value="basic">Basic</option>
          <option value="kanban">Kanban</option>
          <option value="scrum">Scrum</option>
        </select>
      </label>

      <Button loading={loading}>Save Project</Button>
    </form>
  );
}
