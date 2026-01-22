import { MediaResult } from "@/types/MediaResultTypes";
import Link from "next/link";
import VideoPlayer from "@/app/components/watch/VideoPlayer";

interface PageProps {
  params: {
    id: string
  }
}

const backendApi = process.env.BACKEND_API;

export default async function WatchMovie({ params }: PageProps) {
  const { id } = await params;

  // Fetch movie data for metadata
  const res = await fetch(`${backendApi}/info/${id}?type=movie`, {
    next: { revalidate: 3600 }
  });

  let data: MediaResult | null = null;
  if (res.ok) {
    data = await res.json();
  }

  return (
    <div className="min-h-screen bg-[#1f2937] text-white pb-20">
      {/* Immersive Player Section */}
      <div className="relative pt-24 pb-12 px-4 md:px-8 max-w-[1400px] mx-auto">

        {/* Player Container */}
        <VideoPlayer id={id} type="movie" />

        {/* Metadata Section */}
        {data && (
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-orange-600/20 text-orange-500 text-xs font-bold rounded-md uppercase tracking-widest border border-orange-500/20">
                    Movie
                  </span>
                  <span className="text-gray-400 font-medium">🗓️ {data.releaseDate}</span>
                  {data.duration && <span className="text-gray-400 font-medium">⏱️ {data.duration} min</span>}
                  <div className="flex items-center gap-1.5 text-orange-400 font-bold">
                    <span className="text-xl">★</span>
                    <span>{data.rating?.toFixed(1)}</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-sm">
                  {data.title}
                </h1>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-wrap gap-2">
                  {data.genres.slice(0, 3).map((genre, i) => (
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
                "{data.description}"
              </p>
            </div>
          </div>
        )}
      </div>

      {!data && (
        <div className="pt-40 text-center">
          <p className="text-orange-500 text-xl font-medium">Loading movie details...</p>
        </div>
      )}
    </div>
  );
}
