import { create } from "zustand";
import type { SafeAssistant } from "../types";
import { persist } from "zustand/middleware";
import { apiV2 } from "../utils/axios";

interface AssistantState {
  assistants: SafeAssistant[];
  loading: boolean;

  fetchAssistants: () => Promise<void>;
}

export const useAssistantStore = create<AssistantState>()(
  persist(
    (set, get) => ({
      assistants: [],
      loading: false,

      fetchAssistants: async () => {
        try {
          set({ loading: true, assistants: [] });
          const res = await apiV2.get(`/assistant/list`);
          set({ assistants: res.data });
        } catch (error) {
          console.log(error);
        } finally {
          set({ loading: false });
        }
      },

    }),
    {
      name: "assistant-storage",
    }
  )
);
