import { DataProp } from "@/types/SearchTypes";
import Link from "next/link";
import HeroCarousel from "./components/home/HeroCarousel";
import MovieCard from "./components/shared/MovieCard";

import SectionCarousel from "./components/shared/SectionCarousel";

const api = process.env.NEXT_PUBLIC_BACKEND_API;

export default async function Home() {
  const response = await fetch(`${api}/trending`);

  if (!response.ok) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-orange-500 font-medium text-xl">
        <div className="text-center p-8 border-2 border-orange-500/20 rounded-2xl bg-orange-500/5">
          <span className="block text-4xl mb-4">⚠️</span>
          Failed to fetch trending shows and movies
        </div>
      </div>
    );
  }

  const result: DataProp = await response.json();

  // Prepare datasets
  const heroItems = result.results.slice(0, 6); // Top 6 items for the Hero Carousel
  const combinedTrending = [...result.results].sort(() => Math.random() - 0.5).slice(0, 15);
  const tvShows = result.results.filter(item => item.type === 'TV Series');
  const movies = result.results.filter(item => item.type === 'Movie');

  return (
    <div className="min-h-screen bg-[#1f2937] text-white pb-20">
      {/* Hero Carousel Section */}
      <HeroCarousel items={heroItems} />

      <div className="max-w-7xl mx-auto px-8 relative z-20 pt-16 sm:pt-24 pb-20 space-y-24">
        {/* Combined Carousel Section */}
        <section className="scroll-mt-24">
          <div className="flex items-end justify-between mb-8 px-2 border-b border-orange-500/20 pb-4">
            <div>
              <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">Trending Now</h2>
              <div className="h-1.5 w-24 bg-orange-600 mt-2 rounded-full shadow-lg shadow-orange-600/20" />
            </div>
          </div>

          <SectionCarousel>
            {combinedTrending.map(item => (
              <div key={item.id} className="min-w-[240px] md:min-w-[280px] snap-start">
                <MovieCard item={item} />
              </div>
            ))}
          </SectionCarousel>
        </section>

        {/* TV Shows Section */}
        <section className="scroll-mt-24">
          <div className="flex items-end justify-between mb-8 px-2 border-b border-orange-500/20 pb-4">
            <div>
              <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">TV Shows</h2>
              <div className="h-1.5 w-24 bg-orange-600 mt-2 rounded-full shadow-lg shadow-orange-600/20" />
            </div>
            <Link
              href="/trending/tv"
              className="text-orange-600 dark:text-orange-500 hover:text-orange-400 font-bold transition-colors flex items-center gap-1 group text-lg"
            >
              View all <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            {tvShows.slice(0, 10).map(item => (
              <MovieCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Movies Section */}
        <section className="scroll-mt-24">
          <div className="flex items-end justify-between mb-8 px-2 border-b border-orange-500/20 pb-4">
            <div>
              <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">Movies</h2>
              <div className="h-1.5 w-24 bg-orange-600 mt-2 rounded-full shadow-lg shadow-orange-600/20" />
            </div>
            <Link
              href="/trending/movie"
              className="text-orange-600 dark:text-orange-500 hover:text-orange-400 font-bold transition-colors flex items-center gap-1 group text-lg"
            >
              View all <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            {movies.slice(0, 10).map(item => (
              <MovieCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
