import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { apiV2 } from "../utils/axios";
import FeedCard from "../components/feed/FeedCard";
import { useAuthStore } from "../stores/authStore";

// Simple Search Icon Component
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

export default function FeedPage() {
  const [query, setQuery] = useState("Earth");
  const [results, setResults] = useState([]);
  const { user } = useAuthStore();

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const res = await apiV2(`feed/list?query=${query}`);
      setResults(res.data.organic_results || []);
    } catch (err) {
      console.log("failed to fetch posts", err);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="h-screen w-full bg-[#0B1120] text-slate-200 flex flex-col overflow-hidden">
      <div className="z-50 border-b border-slate-800 bg-[#0B1120]">
        <Header />
      </div>

      <main className="flex-1 overflow-y-auto w-full">
        <div className="flex flex-col items-center w-full px-4 pt-8 pb-20">
          {/* Search Section */}
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
                placeholder={`Search for papers...`}
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
              Welcome back,{" "}
              <span className="text-slate-300">{user.firstname}</span>
            </p>
          )}
          </div>

          {/* Feed Section */}
          <div className="w-full max-w-2xl">
            <FeedCard results={results} />
          </div>
        </div>
      </main>
    </div>
  );
}
