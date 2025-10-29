import { create } from "zustand";
import type { SafeAssistant } from "../types";
import { persist } from "zustand/middleware";
import { apiV2 } from "../utils/axios";

interface AssistantState {
  assistants: SafeAssistant[];
  loading: boolean;
  selectedAssistantsByChat: Record<string, number[]>; 

  fetchAssistants: () => Promise<void>;
  

  getSelectedAssistants: (chatId: string) => number[];
  toggleAssistant: (chatId: string, assistantId: number) => void;
  clearSelectedAssistants: (chatId: string) => void;
}

export const useAssistantStore = create<AssistantState>()(
  persist(
    (set, get) => ({
      assistants: [],
      loading: false,
      selectedAssistantsByChat: {},

      fetchAssistants: async () => {
        try {
          set({ loading: true, assistants: [] });
          const res = await apiV2.get(`/assistant/list`);
          set({ assistants: res.data });
          console.log(...res.data);
        } catch (error) {
          console.log(error);
        } finally {
          set({ loading: false });
        }
      },

      getSelectedAssistants: (chatId: string) => {
        return get().selectedAssistantsByChat[chatId] || [];
      },

      toggleAssistant: (chatId: string, assistantId: number) => {
        set((state) => {
          const current = state.selectedAssistantsByChat[chatId] || [];
          const updated = current.includes(assistantId)
            ? current.filter((id) => id !== assistantId)
            : [...current, assistantId];

          return {
            selectedAssistantsByChat: {
              ...state.selectedAssistantsByChat,
              [chatId]: updated,
            },
          };
        });
      },

      clearSelectedAssistants: (chatId: string) => {
        set((state) => {
          const { [chatId]: _, ...rest } = state.selectedAssistantsByChat;
          return { selectedAssistantsByChat: rest };
        });
      },
    }),
    {
      name: "assistant-storage",
    }
  )
);