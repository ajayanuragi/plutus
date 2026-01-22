import { MediaResult } from "@/types/MediaResultTypes";
import Image from "next/image";
import Link from "next/link";
import SectionCarousel from "@/app/components/shared/SectionCarousel";
import VideoPlayer from "@/app/components/watch/VideoPlayer";

const backendApi = process.env.BACKEND_API;

interface PageProps {
  params: {
    id: string,
    season: number,
    episode: number
  }
}

export default async function WatchEpisode({ params }: PageProps) {
  const { id, season, episode } = await params;

  const response = await fetch(`${backendApi}/info/${id}?type=tv`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    return (
      <div className="min-h-screen bg-[#1f2937] flex items-center justify-center">
        <div className="text-center p-8 border-2 border-orange-500/20 rounded-2xl bg-orange-500/5">
          <span className="block text-4xl mb-4">⚠️</span>
          <p className="text-orange-500 font-medium">Failed to fetch show information</p>
          <Link href="/" className="mt-4 inline-block text-white hover:text-orange-500 underline">Return Home</Link>
        </div>
      </div>
    );
  }

  const result: MediaResult = await response.json();
  const selectedSeason = result.seasons?.find((s) => Number(s.season) === Number(season));
  const currentEpisode = selectedSeason?.episodes.find((e) => Number(e.episode) === Number(episode));

  return (
    <div className="min-h-screen bg-[#1f2937] text-white pb-20">
      <div className="relative pt-24 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-x-8 gap-y-12 items-start">

          {/* 1. Player Container */}
          <div className="order-1 lg:col-start-1 lg:row-start-1 min-w-0 w-full">
            <VideoPlayer id={id} type="tv" season={Number(season)} episode={Number(episode)} />
          </div>

          {/* Season Selector (Below Player) */}
          {/* 2. Season Selector (Appears 2nd on mobile) */}
          <div className="order-2 lg:col-start-1 lg:row-start-2 min-w-0 w-full overflow-hidden">
            {result.seasons && result.seasons.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-end justify-between px-2 border-b border-orange-500/20 pb-4">
                  <div>
                    <h2 className="text-white text-2xl font-bold tracking-tight">Seasons</h2>
                    <div className="h-1 w-12 bg-orange-600 mt-2 rounded-full shadow-lg shadow-orange-600/20" />
                  </div>
                </div>

                <SectionCarousel>
                  {result.seasons.map((s) => (
                    <Link
                      key={s.season}
                      href={`/watch/${id}/${s.season}/1`}
                      className={`min-w-[140px] md:min-w-[180px] group flex flex-col items-center space-y-3 snap-start p-3 rounded-2xl transition-all ${Number(s.season) === Number(season) ? 'bg-orange-600/20 border border-orange-500/40 ring-1 ring-orange-500/20' : 'hover:bg-white/5 border border-transparent'}`}
                    >
                      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-gray-800 shadow-lg">
                        {s.image?.hd ? (
                          <Image
                            src={s.image.hd}
                            alt={`Season ${s.season}`}
                            fill
                            className={`object-cover transition-transform duration-500 group-hover:scale-110 ${Number(s.season) === Number(season) ? 'opacity-60' : ''}`}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-500 text-xs font-bold uppercase">
                            No Poster
                          </div>
                        )}
                        {Number(s.season) === Number(season) && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="px-2 py-1 bg-orange-600 text-white text-[10px] font-black rounded-md shadow-lg tracking-tighter">CURRENT</span>
                          </div>
                        )}
                      </div>
                      <span className={`text-sm font-bold tracking-wide ${Number(s.season) === Number(season) ? 'text-orange-500' : 'text-gray-400 group-hover:text-white'}`}>
                        SEASON {s.season}
                      </span>
                    </Link>
                  ))}
                </SectionCarousel>
              </section>
            )}
          </div>

          {/* 4. Metadata Section (Appears 4th on mobile) */}
          <div className="order-4 lg:col-start-1 lg:row-start-3 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 min-w-0 w-full">
            {/* Info Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-orange-600/20 text-orange-500 text-xs font-bold rounded-md uppercase tracking-widest border border-orange-500/20">
                    S{season} E{episode}
                  </span>
                  <span className="text-gray-400 font-medium">🗓️ {currentEpisode?.releaseDate || "N/A"}</span>
                  <div className="flex items-center gap-1.5 text-orange-400 font-bold">
                    <span className="text-xl">★</span>
                    <span>{result.rating?.toFixed(1)}</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-sm">
                  {currentEpisode?.title || result.title}
                </h1>
                <h2 className="text-xl text-gray-400 font-medium">{result.title}</h2>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-wrap gap-2">
                  {result.genres.slice(0, 3).map((genre, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-sm font-medium text-gray-300 border border-white/10">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-4xl">
              <h2 className="text-lg font-bold text-orange-500 uppercase tracking-widest mb-3">Overview</h2>
              <p className="text-xl text-gray-300 leading-relaxed font-light italic">
                "{result.description}"
              </p>
            </div>
          </div>

          {/* 3. Sidebar Area: Episode List (Appears 3rd on mobile, 2nd column on desktop) */}
          <aside className="order-3 lg:col-start-2 lg:row-start-1 lg:row-span-12 space-y-6 lg:bg-gray-900/40 lg:backdrop-blur-sm lg:p-6 lg:rounded-[2rem] lg:border lg:border-white/5 lg:sticky lg:top-28 lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between h-16 -mx-4 md:-mx-8 lg:-mx-6 px-4 md:px-8 lg:px-6 mb-6 sticky top-0 bg-[#1f2937]/95 lg:bg-[#11182b]/95 backdrop-blur-xl border-b border-white/10 z-10 transition-all">
              <h2 className="text-white text-xl font-bold tracking-tight">Episodes</h2>
              <span className="flex items-center justify-center px-3 py-1 bg-white/5 border border-white/20 rounded-full text-gray-400 text-[10px] font-black uppercase tracking-widest">
                Season {season}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {selectedSeason?.episodes.map((ep) => (
                <Link
                  key={ep.episode}
                  href={`/watch/${id}/${season}/${ep.episode}`}
                  className={`group relative flex items-center gap-4 p-3 rounded-2xl transition-all ${Number(ep.episode) === Number(episode) ? 'bg-orange-600/10 ring-1 ring-orange-500/30' : 'hover:bg-white/5 hover:translate-x-1'}`}
                >
                  <div className="relative w-28 aspect-video shrink-0 overflow-hidden rounded-xl bg-gray-800 shadow-md">
                    {ep?.img?.hd ? (
                      <Image
                        src={ep?.img?.hd}
                        alt={`Episode ${ep.episode}`}
                        fill
                        className={`object-cover transition-transform duration-500 group-hover:scale-110 ${Number(ep.episode) === Number(episode) ? 'opacity-40' : ''}`}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-[10px] text-gray-600 font-bold uppercase">
                        EP {ep.episode}
                      </div>
                    )}
                    {Number(ep.episode) === Number(episode) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-600/40">
                          <span className="text-white text-xs ml-0.5">▶</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col min-w-0 pr-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${Number(ep.episode) === Number(episode) ? 'text-orange-500' : 'text-gray-500'}`}>
                        EP {ep.episode}
                      </span>
                      {Number(ep.episode) === Number(episode) && (
                        <span className="w-1 h-1 rounded-full bg-orange-600 animate-pulse" />
                      )}
                    </div>
                    <h3 className={`font-bold text-sm line-clamp-1 transition-colors ${Number(ep.episode) === Number(episode) ? 'text-orange-500' : 'text-gray-200 group-hover:text-white'}`}>
                      {ep.title}
                    </h3>
                  </div>

                  {Number(ep.episode) === Number(episode) && (
                    <div className="absolute left-0 w-1.5 h-8 bg-orange-600 rounded-r-full shadow-[0_0_12px_rgba(234,88,12,0.6)]" />
                  )}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
