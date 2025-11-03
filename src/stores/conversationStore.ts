import { create } from "zustand";
import type { SafeConversation } from "../types";
import { persist } from "zustand/middleware";
import { apiV2 } from "../utils/axios";

interface ConversationState {
  conversation: SafeConversation | null;
  loading: boolean;

  fetch: (id: string) => Promise<void>;
}

export const useConversationStore = create<ConversationState>()(
  persist(
    (set, get) => ({
      conversation: null,
      loading: false,

      fetch: async (id) => {
        try {
          set({ loading: true });

          const res = await apiV2.get(`/conversation/details/${id}`);
          set({ conversation: res.data });
        } catch (error) {
          console.error("Failed to fetch conversations:", error);
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "conversation-storage",
    }
  )
);
