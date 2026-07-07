import { useEffect, useState } from "react";
import { loadStats, type UserStats } from "@/lib/quiz-store";

export function useStats() {
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    setStats(loadStats());
    const onUpdate = () => setStats(loadStats());
    window.addEventListener("cloudpassio:stats", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("cloudpassio:stats", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  return stats;
}
