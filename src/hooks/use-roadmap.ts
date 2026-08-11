import { useEffect, useState } from "react";
import { loadRoadmap, type RoadmapState } from "@/lib/roadmap-store";

export function useRoadmap() {
  const [state, setState] = useState<RoadmapState | null>(null);

  useEffect(() => {
    setState(loadRoadmap());
    const onUpdate = () => setState(loadRoadmap());
    window.addEventListener("cloudpassio:roadmap", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("cloudpassio:roadmap", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  return state;
}
