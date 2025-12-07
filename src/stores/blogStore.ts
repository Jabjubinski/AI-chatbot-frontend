import { create } from "zustand";
import type { SafeBlog } from "../types";
import { persist } from "zustand/middleware";
import { apiV2 } from "../utils/axios";

// Define the structure of the API response data
interface BlogFeedResponse {
  blogs: SafeBlog[];
  next_offset: number | null;
  has_more: boolean;
  count: number;
}

interface BlogsState {
  blogs: SafeBlog[];
  loading: boolean;
  hasMore: boolean;
  nextOffset: number | null;

  fetchInitial: ({
    limit,
    search,
  }: {
    limit: number;
    search?: string;
  }) => Promise<void>;

  fetchMore: ({
    limit,
    offset,
    search,
  }: {
    limit: number;
    offset: number;
    search?: string;
  }) => Promise<void>;
}

export const useBlogsStore = create<BlogsState>()(
  persist(
    (set, get) => ({
      blogs: [],
      loading: false,
      hasMore: true,
      nextOffset: 0,

      fetchInitial: async ({ limit, search }) => {
        set({ loading: true });
        try {
          const res = await apiV2.get<BlogFeedResponse>("/blog/list", {
            params: {
              search: search?.trim() || undefined,
              limit,
              offset: 0,
            },
          });

          const { blogs, next_offset, has_more } = res.data;

          set({
            blogs: Array.isArray(blogs) ? blogs : [],
            hasMore: has_more ?? false,
            nextOffset: next_offset ?? 0,
          });
        } catch (error) {
          console.error("Failed to fetch initial Blogs:", error);
          set({ blogs: [], hasMore: false, nextOffset: null });
        } finally {
          set({ loading: false });
        }
      },

      fetchMore: async ({ limit, offset, search }) => {
        const currentBlogs = get().blogs;

        try {
          const res = await apiV2.get<BlogFeedResponse>("/blog/list", {
            params: {
              search: search?.trim() || undefined,
              limit,
              offset,
            },
          });

          const { blogs: newBlogs, next_offset, has_more } = res.data;

          set({
            blogs: [...currentBlogs, ...(Array.isArray(newBlogs) ? newBlogs : [])],
            hasMore: has_more ?? false,
            nextOffset: next_offset ?? offset + limit,
          });
        } catch (error) {
          console.error("Failed to fetch more Blogs:", error);
        }
      },
    }),
    {
      name: "blogs-storage", // persisted state key

    }
  )
);
