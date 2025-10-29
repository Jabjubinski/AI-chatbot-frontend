import { create } from "zustand";
import type { SafeConversation } from "../types";
import { persist } from "zustand/middleware";
import { apiV2 } from "../utils/axios";

interface ConversationsState {
  conversations: SafeConversation[];
  loading: boolean;

  fetch: ({
    limit,
    search,
  }: {
    limit?: number;
    search?: string;
  }) => Promise<SafeConversation[]>;
  create: ({
    content,
    assistants,
  }: {
    content: string;
    assistants: number[];
  }) => Promise<number | string | null>;
  deleteConversation: (id: number) => void;
  update: (data: SafeConversation) => Promise<void>;
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

      deleteConversation: async (id: number) => {
        try {
          const res = await apiV2.delete(`/conversation/delete/${id}`);
          const deletedId = res.data.id;

          set((state) => ({
            conversations: state.conversations.filter(
              (conversation) => conversation.id !== deletedId
            ),
          }));
        } catch (error) {
          console.error("Failed to delete conversation:", error);
        }
      },

      fetch: async ({ limit, search }) => {
        try {
          set({ loading: true });

          const params = new URLSearchParams();
          if (limit) params.append("limit", limit.toString());
          if (search?.trim()) params.append("search", search.trim());

          const res = await apiV2.get(
            `/conversation/list?${params.toString()}`
          );

          console.log(...res.data);

          if (!search) set({ conversations: res.data });
          return res.data;
        } catch (error) {
          console.error("Failed to fetch conversations:", error);
          return [];
        } finally {
          set({ loading: false });
        }
      },

      create: async ({
        content,
        assistants,
      }: {
        content: string;
        assistants: number[];
      }) => {
        try {
          set({ loading: true });
          const res = await apiV2.post("/conversation/create", {
            content,
            assistants,
          });

          const newConversation: SafeConversation = res.data;

          set({
            conversations: [newConversation, ...get().conversations],
          });

          return newConversation.id;
        } catch (error) {
          console.error("Failed to create conversation:", error);
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
