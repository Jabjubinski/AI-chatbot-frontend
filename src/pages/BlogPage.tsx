import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react"; // Standard icons

import { useAuthStore } from "../stores/authStore";
import { useBlogsStore } from "../stores/blogStore";
import BlogCard from "../components/blog/BlogCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const INITIAL_LIMIT = 10;
const LOAD_MORE_AMOUNT = 10;

// --- Components ---

const InfinityLoader = () => (
  <motion.div
    className="flex items-center justify-center py-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="flex space-x-2">
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.div
          key={i}
          className="h-3 w-3 rounded-full bg-sky-500"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            times: [0, 0.5, 1],
            delay,
          }}
        />
      ))}
    </div>
  </motion.div>
);

const BlogSkeleton = () => (
  <div className="mx-auto w-full max-w-2xl animate-pulse space-y-4 px-4 pt-8">
    <div className="h-12 w-full rounded-2xl bg-slate-200" />
    <div className="space-y-6 pt-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-64 w-full rounded-xl bg-slate-200" />
      ))}
    </div>
  </div>
);

// --- Main Page ---

export default function BlogPage() {
  const { blogs, loading, hasMore, nextOffset, fetchInitial, fetchMore } =
    useBlogsStore();
  const { user } = useAuthStore();
  
  const [query, setQuery] = useState("");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  
  // Ref for the "Load More" invisible element at the bottom
  const observerTarget = useRef<HTMLDivElement>(null);

  // Initial Load
  useEffect(() => {
    fetchInitial({ search: query, limit: INITIAL_LIMIT });
  }, [query, fetchInitial]);

  const handleSearch = (e: React.FormEvent) => e.preventDefault();

  // Infinite Scroll Logic via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        if (
          target.isIntersecting &&
          hasMore &&
          !isFetchingMore &&
          !loading
        ) {
          setIsFetchingMore(true);
          await fetchMore({
            search: query,
            limit: LOAD_MORE_AMOUNT,
            offset: nextOffset ?? 0,
          });
          setIsFetchingMore(false);
        }
      },
      { threshold: 0.1, rootMargin: "100px" } // Load when element is 100px from viewport
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasMore, isFetchingMore, loading, query, nextOffset, fetchMore]);

  // Main Loading State (Initial)
  if (loading && (!Array.isArray(blogs) || blogs.length === 0)) {
    return <BlogSkeleton />;
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-slate-50 text-slate-900">
      <main className="flex-1 overflow-y-auto scroll-smooth">
        <div className="flex w-full flex-col items-center px-4 pt-8 pb-20">
          
          {/* Search Section */}
          <div className="sticky top-0 z-10 mb-8 w-full max-w-2xl bg-slate-50/80 pb-4 pt-2 backdrop-blur-md">
            <form onSubmit={handleSearch} className="relative flex items-center gap-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  className="h-12 rounded-2xl border-slate-200 bg-white pl-10 pr-4 text-base shadow-sm transition-all focus-visible:ring-sky-500"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for papers..."
                />
              </div>
              <Button 
                type="submit" 
                className="h-12 rounded-xl bg-sky-600 px-6 font-medium hover:bg-sky-700"
              >
                Search
              </Button>
            </form>
            
            {user?.firstname && (
              <p className="mt-2 px-2 text-xs font-medium text-slate-500">
                Welcome back, <span className="text-sky-600">{user.firstname}</span>
              </p>
            )}
          </div>

          {/* Blog Grid */}
          <div className="flex w-full max-w-2xl flex-col gap-6">
            {Array.isArray(blogs) &&
              blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  summary={blog.summary}
                  blog_title={blog.blog_title}
                />
              ))}
          </div>

          {/* State Feedback / Infinite Loader */}
          <div ref={observerTarget} className="mt-4 w-full">
            {isFetchingMore && <InfinityLoader />}
          </div>

          {!isFetchingMore && !hasMore && blogs.length > 0 && (
            <p className="mt-8 text-sm font-medium text-slate-400">
              You've reached the end.
            </p>
          )}

          {!loading && blogs.length === 0 && (
            <div className="mt-12 flex flex-col items-center text-slate-400">
              <Search className="mb-2 h-8 w-8 opacity-20" />
              <p className="text-base">No blog posts found for "{query}"</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}