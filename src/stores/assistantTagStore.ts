import { create } from "zustand";
import type { SafeAssistantTag } from "../types";
import { persist } from "zustand/middleware";
import { apiV2 } from "../utils/axios";

interface AssistantTagState {
  assistant_tags: SafeAssistantTag[];
  loading: boolean;

  fetchAssistantTags: () => Promise<void>;
}

export const useAssistantTagStore = create<AssistantTagState>()(
  persist(
    (set, get) => ({
      assistant_tags: [],
      loading: false,

      fetchAssistantTags: async () => {
        try {
          set({ loading: true, assistant_tags: [] });
          const res = await apiV2.get(`/assistant/tag/list`);
          set({ assistant_tags: res.data });
          console.log(...res.data);
        } catch (error) {
          console.log(error);
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "assistant-tag-storage",
    }
  )
);
