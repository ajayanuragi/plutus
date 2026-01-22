import { MediaResult } from "@/types/MediaResultTypes";
import Image from "next/image";
import Link from "next/link";
import SectionCarousel from "@/app/components/shared/SectionCarousel";

const backendApi = process.env.NEXT_PUBLIC_BACKEND_API;
const api = process.env.NEXT_PUBLIC_STREAMING_API;

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
      {/* Immersive Player Section */}
      <div className="relative pt-24 pb-12 px-4 md:px-8 max-w-[1400px] mx-auto">
        {/* Back Button */}
        <Link
          href={`/about/tv/${id}/${season}`}
          className="fixed top-4 left-4 md:left-8 2xl:left-[calc(50%-336px-200px)] z-[60] flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-full text-white font-medium hover:bg-orange-600 transition-all shadow-2xl shadow-black/50 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back to Season</span>
        </Link>

        {/* Player Container */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5 bg-black group">
          <iframe
            src={`${api}/tv/${id}/${season}/${episode}?color=c2410c&autoPlay=true`}
            width="100%"
            height="100%"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-1 bg-orange-600 opacity-5 blur-2xl pointer-events-none" />
        </div>

        {/* Metadata & Episode Selector Section */}
        <div className="mt-12 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
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

          {/* Episode Selector */}
          {selectedSeason && selectedSeason.episodes.length > 1 && (
            <section className="space-y-8">
              <div className="flex items-end justify-between px-2 border-b border-orange-500/20 pb-4">
                <div>
                  <h2 className="text-white text-2xl font-bold tracking-tight">Up Next in Season {season}</h2>
                  <div className="h-1 w-16 bg-orange-600 mt-2 rounded-full shadow-lg shadow-orange-600/20" />
                </div>
              </div>

              <SectionCarousel>
                {selectedSeason.episodes.map((ep) => (
                  <Link
                    key={ep.episode}
                    href={`/watch/${id}/${season}/${ep.episode}`}
                    className={`min-w-[240px] md:min-w-[300px] group flex flex-col space-y-3 snap-start p-2 rounded-2xl transition-colors ${Number(ep.episode) === Number(episode) ? 'bg-orange-600/10 border border-orange-500/20' : 'hover:bg-white/5'}`}
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-800 shadow-lg">
                      {ep?.img?.hd ? (
                        <Image
                          src={ep?.img?.hd}
                          alt={`Episode ${ep.episode}`}
                          fill
                          className={`object-cover transition-transform duration-500 group-hover:scale-110 ${Number(ep.episode) === Number(episode) ? 'opacity-50' : ''}`}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-500 uppercase text-xs font-bold">
                          No Thumbnail
                        </div>
                      )}

                      {Number(ep.episode) === Number(episode) ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full shadow-lg">NOW PLAYING</span>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-600/40 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-white text-xl ml-0.5">▶</span>
                          </div>
                        </div>
                      )}

                      <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold text-white border border-white/10 uppercase tracking-widest">
                        EP {ep.episode}
                      </div>
                    </div>
                    <div className="px-1">
                      <h3 className={`font-bold transition-colors line-clamp-1 ${Number(ep.episode) === Number(episode) ? 'text-orange-500' : 'text-gray-200 group-hover:text-white'}`}>
                        {ep.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">{ep.releaseDate}</p>
                    </div>
                  </Link>
                ))}
              </SectionCarousel>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
