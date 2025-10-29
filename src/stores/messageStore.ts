import { create } from "zustand";
import type { SafeMessage } from "../types";
import { persist } from "zustand/middleware";
import { apiV2 } from "../utils/axios";

interface MessageState {
  messages: SafeMessage[];
  loading: boolean;

  fetchMessages: (conversationId: string) => Promise<void>;
  createMessage: (
    content: string,
    conversationId: string,
    assistant_ids: number[]
  ) => Promise<void>;
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set, get) => ({
      messages: [],
      loading: false,

      fetchMessages: async (conversationId) => {
        try {
          set({ loading: true, messages: [] });
          const res = await apiV2.get(`/message/${conversationId}/list`);
          set({ messages: res.data });
          console.log(res.data)
        } catch (error) {
          console.log(error);
        } finally {
          set({ loading: false });
        }
      },

      createMessage: async (content, conversationId, assistant_ids) => {
        try {
          const fakeData = {
            id: null,
            role: "user",
            content: content,
            created_at: new Date().toISOString(),
          } as SafeMessage;

          set({ loading: true, messages: [...get().messages, fakeData] });
          const res = await apiV2.post(`/message/${conversationId}/create`, {
            content,
            assistant_ids,
          });
          const { user_message, assistant_message } = res.data;

          console.log(res.data);

          set({
            messages: [
              ...get().messages.filter((msg) => msg.id !== null),
              user_message,
              assistant_message,
            ],
          });
        } catch (error) {
          console.log(error);
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "message-storage",
    }
  )
);
