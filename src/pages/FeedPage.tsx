import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { apiV2 } from "../utils/axios";
import { useAuthStore } from "../stores/authStore";
import { Loader2 } from "lucide-react"; // Imported a modern loader icon

// Simple Search Icon Component (re-using the provided SVG for consistency)
const SearchIcon = () => (
  <svg
    className="w-5 h-5 text-slate-400 group-focus-within:text-sky-400 transition-colors duration-300" // Added group-focus-within for input state
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

export default function FeedPage() {
  const [query, setQuery] = useState("Earth");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const { user } = useAuthStore();

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return; // Prevent empty search

    setIsLoading(true);
    try {
      // Small delay for better UX transition
      await new Promise((resolve) => setTimeout(resolve, 500));
      const res = await apiV2(`feed/list?query=${query.trim()}`);
      setResults(res.data.organic_results || []);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="h-screen w-full text-slate-200 flex flex-col overflow-hidden">
      {/* Header (Fixed) */}
      <div className="z-50 border-b border-slate-800  sticky top-0">
        <Header />
      </div>

      <main className="flex-1 overflow-y-auto w-full">
        {/* Centralized Content Wrapper */}
        <div className="flex flex-col items-center w-full px-4 pt-10 pb-20 mx-auto">
          {/* Search Section */}
          <div className="w-full max-w-2xl mb-10">
            {" "}
            {/* Increased bottom margin for better separation */}
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-24 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all duration-300 shadow-xl shadow-black/30"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search for papers, articles, and more...`}
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`absolute right-1.5 top-1.5 bottom-1.5 px-5 font-semibold text-white text-sm rounded-lg transition-colors duration-200 shadow-lg ${
                  isLoading
                    ? "bg-sky-700/80 cursor-not-allowed flex items-center gap-1"
                    : "bg-sky-600 hover:bg-sky-500"
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Search"
                )}
              </button>
            </form>
            {/* Welcome message separated from form */}
            {user?.firstname && (
              <p className="mt-2 text-xs text-slate-500 px-2 font-medium">
                Welcome back,{" "}
                <span className="text-sky-400 font-semibold">
                  {user.firstname}
                </span>
                . Start exploring.
              </p>
            )}
          </div>

          {/* Feed Section */}
          <div className="w-full max-w-2xl">
            {isLoading && (
              <div className="text-center py-10  flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-sky-500" />
                <span>Loading results...</span>
              </div>
            )}

            {!isLoading && results.length === 0 && (
              <div className="text-center py-16 px-4 bg-slate-900/30 border border-slate-800/50 rounded-xl text-slate-500">
                <h3 className="text-lg font-semibold  mb-1">
                  No Results Found
                </h3>
                <p>Try a different search query or check your spelling.</p>
              </div>
            )}

            {!isLoading && results.length > 0 && <FeedCard results={results} />}
          </div>
        </div>
      </main>
    </div>
  );
}
