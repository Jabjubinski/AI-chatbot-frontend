import { useState, useEffect } from "react";

export function useSelectedAssistants() {
  const [selectedAssistants, setSelectedAssistants] = useState<number[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem("selectedAssistants");
    if (stored) {
      try {
        const ids = JSON.parse(stored);
        if (Array.isArray(ids)) setSelectedAssistants(ids);
      } catch (e) {
        console.error("Failed to parse selectedAssistants", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "selectedAssistants",
      JSON.stringify(selectedAssistants)
    );
  }, [selectedAssistants]);

  const toggleAssistant = (assistantId: number) => {
    setSelectedAssistants((prev) =>
      prev.includes(assistantId)
        ? prev.filter((id) => id !== assistantId)
        : [...prev, assistantId]
    );
  };

  const clearAllAssistants = () => {
    setSelectedAssistants([]);
    localStorage.removeItem("selectedAssistants");
  };

  return { selectedAssistants, toggleAssistant, clearAllAssistants };
}
