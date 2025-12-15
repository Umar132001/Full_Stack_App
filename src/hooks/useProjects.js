import { useEffect, useState } from "react";
import { getMyProjectsApi } from "../api/project.api";
import { toast } from "react-toastify";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await getMyProjectsApi();
      setProjects(res.data.projects);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, refresh: fetchProjects };
}
