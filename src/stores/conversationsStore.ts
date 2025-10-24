import { create } from "zustand";
import type { SafeConversation } from "../types";
import { persist } from "zustand/middleware";
import { apiV2 } from "../utils/axios";

interface ConversationsState {
  conversations: SafeConversation[] | [];
  loading: boolean;

  fetch: () => Promise<void>;
  create: () => Promise<number | null>;
  deleteConversation: (id: number) => void;
  update: (data: SafeConversation) => Promise<void>
}

export const useConversationsStore = create<ConversationsState>()(
  persist(
    (set, get) => ({
      conversations: [],
      loading: false,

      update: async (data) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === data.id ? { ...conv, ...data } : conv
          ),
        }));
      },


      deleteConversation: (id) => {
         set((state) => ({
          conversations: state.conversations.filter(
            (conversation) => conversation.id !== id
          ),
        }));
      },

      fetch: async () => {
        try {
          set({ loading: true, conversations: [] });
          const res = await apiV2.get("/conversation/list");
          set({ conversations: res.data });
        } catch (error) {
          console.log(error);
        } finally {
          set({ loading: false });
        }
      },

      create: async () => {
        try {
          set({ loading: true });
          const res = await apiV2.post("/conversation/create");

          const newConversation: SafeConversation = res.data;
          
          set({
            conversations: [newConversation, ...get().conversations],
          });
          return newConversation.id;
        } catch (error) {
          console.error(error);
          return null;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "conversations-storage",
    }
  )
);
