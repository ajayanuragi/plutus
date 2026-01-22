import Pagination from "@/app/components/Pagination";
import { DataProp } from "@/types/SearchTypes";
import Image from "next/image";
import Link from "next/link";
const api = process.env.BACKEND_API
type TrendingPageProps = {
  params: { type: string };
  searchParams: { page?: string };
};

export default async function TrendingPage({ params, searchParams }: TrendingPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const { type = "movie" } = await params;

  const response = await fetch(`${api}/trending?type=${type === 'tv' ? "TV Series" : "Movie"}&page=${currentPage}`);

  if (!response.ok) {
    return (
      <div className="min-h-screen bg-[#1f2937] flex items-center justify-center">
        <div className="text-center p-8 border-2 border-orange-500/20 rounded-2xl bg-orange-500/5">
          <span className="block text-4xl mb-4">⚠️</span>
          <p className="text-orange-500 font-medium">Failed to fetch trending {type === 'tv' ? "shows" : "movies"}</p>
          <Link href="/" className="mt-4 inline-block text-white hover:text-orange-500 underline">Return Home</Link>
        </div>
      </div>
    );
  }

  const result: DataProp = await response.json();
  const trendingItems = result.results;
  const heroItem = trendingItems[0];
  const gridItems = trendingItems.slice(1);

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      {/* Hero Section (Only on first page) */}
      {currentPage === 1 && heroItem && (
        <section className="relative h-[85vh] w-full overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={heroItem.image}
              alt={heroItem.title}
              fill
              className="object-cover scale-105 blur-[2px] opacity-40"
              priority
            />
            {/* Multi-layered Gradients for Deep Immersion */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/60 to-transparent" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Hero Content */}
          <div className="relative h-full flex items-center px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-end w-full">
              {/* Poster Card */}
              <div className="relative shrink-0 w-64 md:w-80 aspect-[2/3] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 group">
                <Image src={heroItem.image} alt={heroItem.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 px-4 py-2 bg-orange-600 text-white font-black rounded-xl shadow-lg shadow-orange-600/40 transform -rotate-3">
                  TRENDING #1
                </div>
              </div>

              {/* Text Details */}
              <div className="flex flex-col gap-6 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-sm font-bold text-orange-500 border border-white/10 uppercase tracking-widest">
                      {type === 'tv' ? "TV Series" : "Movie"}
                    </span>
                    <span className="text-gray-400 font-medium tracking-wide">Must Watch</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white drop-shadow-2xl">
                    {heroItem.title}
                  </h1>
                </div>

                <div className="flex items-center gap-6">
                  <Link
                    href={heroItem.type === 'TV Series' ? `/about/tv/${heroItem.id}` : `/about/movie/${heroItem.id}`}
                    className="px-10 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-2xl shadow-xl shadow-orange-600/30 transition-all hover:scale-105 active:scale-95 group flex items-center gap-3"
                  >
                    Watch Now
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <button className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 transition-all group">
                    <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className={`px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto ${currentPage === 1 ? '-mt-10 relative z-20 pb-20' : 'pt-32 pb-20'}`}>
        {/* Toggle & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-white text-3xl font-black tracking-tight flex items-center gap-3">
              Trending Selection
              <div className="h-1 w-12 bg-orange-600 rounded-full shadow-[0_0_12px_rgba(234,88,12,0.6)]" />
            </h2>
            <p className="text-gray-400 font-medium mt-1 uppercase text-xs tracking-[0.2em]">Curated {type === 'tv' ? "TV Series" : "Movies"}</p>
          </div>

          <div className="flex p-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
            <Link
              href="/trending/movie"
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${type === 'movie' ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Movies
            </Link>
            <Link
              href="/trending/tv"
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${type === 'tv' ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              TV Series
            </Link>
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10">
          {(currentPage === 1 ? gridItems : trendingItems).map((item, index) => {
            const rank = currentPage === 1 ? index + 2 : (currentPage - 1) * result.results.length + index + 1;
            const link = item.type === 'TV Series' ? `/about/tv/${item.id}` : `/about/movie/${item.id}`;

            return (
              <Link href={link} key={item.id} className="group relative flex flex-col gap-3 focus:outline-none">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[1.5rem] bg-gray-800 border border-white/5 shadow-lg shadow-black/40 transition-all duration-500 group-hover:scale-[1.03] group-hover:border-orange-500/40 group-hover:shadow-[0_0_30px_rgba(234,88,12,0.15)] group-focus:ring-2 group-focus:ring-orange-500">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
                  />

                  {/* Glass Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Rank Badge */}
                  <div className="absolute top-3 left-3 flex items-center justify-center w-10 h-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl text-white font-black text-xs shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-6 group-hover:bg-orange-600 group-hover:border-orange-400/50">
                    #{rank}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg flex items-center gap-1">
                    <span className="text-orange-500 text-[10px]">★</span>
                    <span className="text-white text-[10px] font-bold">8.4</span>
                  </div>

                  {/* Hover Interaction: Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 bg-orange-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(234,88,12,0.5)] transform scale-50 group-hover:scale-100 transition-transform duration-500">
                      <span className="text-white text-2xl ml-1">▶</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col px-1">
                  <h3 className="text-[15px] font-bold text-gray-200 line-clamp-1 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-orange-500/80 transition-colors">
                      {item.type === 'TV Series' ? 'TV SERIES' : 'MOVIE'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-700" />
                    <span className="text-[10px] font-bold text-gray-600">2024</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Refined Pagination Section */}
        <div className="mt-20 pt-10 border-t border-white/5">
          <Pagination totalPages={result.totalPages} currentPage={currentPage} type={type} />
        </div>
      </div>
    </div>
  );
}
