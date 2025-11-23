import { useEffect, useState, useRef, useCallback } from "react";
import Header from "../components/Header/Header";
import { useAuthStore } from "../stores/authStore";
import { useBlogsStore } from "../stores/blogStore"; 
import BlogCard from "../components/blog/BlogCard";
import { motion } from "framer-motion";

const INITIAL_LIMIT = 10;
const LOAD_MORE_AMOUNT = 10;

const SearchIcon = () => (
  <svg
    className="w-5 h-5 text-slate-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    ></path>
  </svg>
);

const InfinityLoader = () => (
  <motion.div
    className="flex justify-center items-center py-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      className="w-4 h-4 bg-sky-500 rounded-full mx-1"
      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 1] }}
    />
    <motion.div
      className="w-4 h-4 bg-sky-500 rounded-full mx-1"
      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 1], delay: 0.2 }}
    />
    <motion.div
      className="w-4 h-4 bg-sky-500 rounded-full mx-1"
      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 1], delay: 0.4 }}
    />
  </motion.div>
);

export default function BlogPage() {
  const { blogs, loading, hasMore, nextOffset, fetchInitial, fetchMore } = useBlogsStore(); 
  const [query, setQuery] = useState(""); 
  const { user } = useAuthStore();
  const mainRef = useRef<HTMLDivElement>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false); 

  useEffect(() => {
    fetchInitial({ search: query, limit: INITIAL_LIMIT }); 
  }, [query, fetchInitial]);

  const handleSearch = (e: React.FormEvent) => e.preventDefault();

  const handleScroll = useCallback(async () => {
    const mainElement = mainRef.current;
    if (!mainElement || loading || isFetchingMore || !hasMore) return;

    const isNearBottom =
      mainElement.scrollHeight - mainElement.scrollTop <= mainElement.clientHeight + 100;

    if (isNearBottom) {
      setIsFetchingMore(true);
      await fetchMore({ search: query, limit: LOAD_MORE_AMOUNT, offset: nextOffset ?? 0 });
      setIsFetchingMore(false);
    }
  }, [loading, isFetchingMore, hasMore, nextOffset, fetchMore, query]);

  useEffect(() => {
    const mainElement = mainRef.current;
    if (mainElement) mainElement.addEventListener("scroll", handleScroll);
    return () => {
      if (mainElement) mainElement.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (loading && (!Array.isArray(blogs) || blogs.length === 0)) return <div>Skeleton</div>;

  return (
    <div className="h-screen w-full bg-[#0B1120] text-slate-200 flex flex-col overflow-hidden">
      <div className="z-50 border-b border-slate-800 bg-[#0B1120]">
        <Header />
      </div>

      <main ref={mainRef} className="flex-1 overflow-y-auto w-full">
        <div className="flex flex-col items-center w-full px-4 pt-8 pb-20">
          <div className="w-full max-w-2xl mb-8">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-24 py-3.5 bg-slate-900/50 border border-slate-700/50 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300 shadow-lg shadow-black/20"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for papers..."
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-4 bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium rounded-xl transition-colors shadow-lg shadow-sky-900/20"
              >
                Search
              </button>
            </form>
            {user?.firstname && (
              <p className="mt-2 text-xs text-slate-500 px-2">
                Welcome back, <span className="text-slate-300">{user.firstname}</span>
              </p>
            )}
          </div>

          <div className="w-full max-w-2xl flex flex-col gap-6">
            {Array.isArray(blogs) && blogs.map((blog) => (
              <BlogCard key={blog.id} id={blog.id} summary={blog.summary} blog_title={blog.blog_title} />
            ))}
          </div>

          {isFetchingMore && <InfinityLoader />}

          {!isFetchingMore && hasMore && blogs.length > 0 && (
            <p className="mt-8 text-sm text-slate-500">
              Scroll down to load more results.
            </p>
          )}

          {!isFetchingMore && !hasMore && blogs.length > 0 && (
            <p className="mt-8 text-sm text-slate-500">
              You've reached the end of the results.
            </p>
          )}

          {!loading && blogs.length === 0 && (
            <p className="mt-8 text-base text-slate-400">
              No blog posts found for "{query || "the current search"}"
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
