"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { DataProp } from "@/types/SearchTypes";
import { useEffect, useState } from "react";
import SearcPagination from "../components/search/SearchPagination";
import MovieCard from "../components/shared/MovieCard";

export default function Search() {
  const [query, setQuery] = useState<string>('')
  const debouncedQuery = useDebounce(query, 500)
  const [page, setPage] = useState<number>(1);
  const [searchResults, setSearchResults] = useState<DataProp | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery) {
        setSearchResults(null);
        return;
      }
      const sanitizedQuery = encodeURIComponent(debouncedQuery);
      try {
        setLoading(true)
        const response = await fetch(`/api/meta/${sanitizedQuery}?page=${page}`)
        const results = await response.json()
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults(null);
      } finally {
        setLoading(false)
      }
    }
    fetchResults();
  }, [debouncedQuery, page])

  const totalPages = searchResults?.totalPages || 1

  return (
    <div className="min-h-screen bg-[#1f2937] text-white pb-20">
      {/* Search Header Section */}
      <div className="relative pt-32 pb-20 px-8 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-sm">
              Discover <span className="text-orange-600">Anything.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Millions of movies and TV shows to explore. Search now and start watching.
            </p>
          </div>

          <div className="relative max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="absolute inset-0 bg-orange-600/20 blur-2xl -z-10 rounded-full opacity-50" />
            <div className="relative group">
              <input
                placeholder="Search for movies, TV shows..."
                className="w-full bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-5 text-lg text-white font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-600/50 focus:border-orange-600/50 transition-all shadow-2xl shadow-black/50 pr-16"
                value={query}
                type="text"
                onChange={({ target }) => {
                  setQuery(target.value);
                  setPage(1); // Reset page on query change
                }}
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl text-gray-500 group-focus-within:text-orange-500 transition-colors">
                🔍
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 max-w-[1400px] mx-auto">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-6">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-orange-600/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-orange-500 font-bold uppercase tracking-widest animate-pulse">Searching the archives...</p>
          </div>
        ) : searchResults && Array.isArray(searchResults.results) && searchResults.results.length > 0 ? (
          <>
            <div className="flex items-end justify-between mb-8 border-b border-orange-500/20 pb-4">
              <div>
                <h2 className="text-white text-2xl font-bold tracking-tight">
                  Search Results <span className="text-orange-500 ml-2 text-lg font-medium">({searchResults.totalResults})</span>
                </h2>
                <div className="h-1 w-16 bg-orange-600 mt-2 rounded-full shadow-lg shadow-orange-600/20" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-6">
              {searchResults.results.map((item) => (
                <MovieCard key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <SearcPagination totalPages={totalPages} currentPage={page} setPage={setPage} />
            </div>
          </>
        ) : debouncedQuery && !loading ? (
          <div className="py-32 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
            <div className="text-7xl">📭</div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">No results found for "{debouncedQuery}"</h2>
              <p className="text-gray-400 max-w-md">
                We couldn't find what you're looking for. Try different keywords or double-check your spelling.
              </p>
            </div>
          </div>
        ) : (
          !debouncedQuery && (
            <div className="py-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center space-y-4 hover:bg-white/10 transition-colors cursor-default">
                <div className="text-3xl text-orange-500">🎬</div>
                <h3 className="font-bold text-white uppercase tracking-tight">Movies</h3>
                <p className="text-sm text-gray-400">Find the latest blockbusters and timeless classics.</p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center space-y-4 hover:bg-white/10 transition-colors cursor-default">
                <div className="text-3xl text-orange-500">📺</div>
                <h3 className="font-bold text-white uppercase tracking-tight">TV Shows</h3>
                <p className="text-sm text-gray-400">Discover trending series and binge-worthy dramas.</p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center space-y-4 hover:bg-white/10 transition-colors cursor-default">
                <div className="text-3xl text-orange-500">⭐</div>
                <h3 className="font-bold text-white uppercase tracking-tight">Ratings</h3>
                <p className="text-sm text-gray-400">See what others are watching and check out reviews.</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
