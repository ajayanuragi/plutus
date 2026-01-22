"use client";

import { useParams } from "next/navigation";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { latestMediaResult } from "@/atoms/media";
import { MediaResult } from "@/types/MediaResultTypes";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const { id, season } = useParams() as { id: string; season: string };
  const atomMedia = useAtomValue(latestMediaResult);
  const setMedia = useSetAtom(latestMediaResult);
  const [media, setLocalMedia] = useState<MediaResult | null>(atomMedia);
  const [loading, setLoading] = useState(!atomMedia);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!atomMedia || atomMedia.id !== id) {
      const fetchMedia = async () => {
        try {
          const res = await fetch(`/api/meta/info/${id}?type=tv`);
          if (!res.ok) throw new Error("Failed to fetch media");
          const data: MediaResult = await res.json();
          setLocalMedia(data);
          setMedia(data); // Save back to atom
        } catch (error: unknown) {
          setError(`❌ Could not load media info., ${error}`);
        } finally {
          setLoading(false);
        }
      };

      fetchMedia();
    }
  }, [atomMedia, id, setMedia]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error || !media) return <div className="text-red-500 p-4">{error || "Media not found."}</div>;

  const selectedSeason = media.seasons?.filter(x => x.isReleased === true).find((s) => s.season === Number(season));
  if (!selectedSeason) {
    return <div className="p-4 text-yellow-500">⚠️ Season {season} not found in this media.</div>;
  }

  return (
    <div className="min-h-screen bg-[#1f2937] text-white">
      {/* Back Button */}
      <Link
        href={`/about/tv/${id}`}
        className="fixed top-4 left-4 md:left-8 2xl:left-[calc(50%-336px-200px)] z-[60] flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-full text-white font-medium hover:bg-orange-600 transition-all shadow-2xl shadow-black/50 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        <span>Back to Show</span>
      </Link>

      {/* Cinematic Hero Section for Season */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={selectedSeason?.image?.hd || media.cover}
            alt={`${media.title} - Season ${season}`}
            fill
            priority
            className="object-cover object-top opacity-60 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f2937] via-[#1f2937]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#1f2937] to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 pb-8 md:pb-12 max-w-7xl mx-auto">
          <div className="space-y-6 max-w-4xl">
            {media?.logos.length > 0 ? (
              <Image
                src={media?.logos[0].url}
                alt={media.title}
                width={400}
                height={160}
                className="h-auto max-w-[250px] md:max-w-[400px] drop-shadow-2xl"
              />
            ) : (
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg leading-tight">
                {media.title}
              </h1>
            )}

            <div className="flex flex-wrap items-center gap-6 text-lg font-medium">
              <div className="px-4 py-1.5 bg-orange-600 rounded-full text-white font-bold shadow-lg shadow-orange-600/20">
                Season {season}
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span>🗓️ {selectedSeason.episodes[0]?.releaseDate.split('-')[0] || "Unknown"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span>🎬 {selectedSeason.episodes.length} Episodes</span>
              </div>
            </div>

            <p className="font-sans text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed line-clamp-2">
              {media.description}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 space-y-16 py-16 relative z-20">
        {/* Episodes Section */}
        <section className="scroll-mt-24">
          <div className="flex items-end justify-between mb-10 px-2 border-b border-orange-500/20 pb-4">
            <div>
              <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">Episodes</h2>
              <div className="h-1.5 w-24 bg-orange-600 mt-2 rounded-full shadow-lg shadow-orange-600/20" />
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {selectedSeason.episodes.filter((episode) => {
              const today = new Date();
              const releaseDate = new Date(episode.releaseDate);
              return releaseDate <= today;
            }).map((episode) => (
              <Link
                href={`/watch/${id}/${season}/${episode.episode}`}
                key={episode.episode}
                className="group flex flex-col space-y-3"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-800 shadow-xl transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-orange-950/40">
                  {episode?.img?.hd ? (
                    <Image
                      src={episode?.img?.hd}
                      alt={`Episode ${episode.episode}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-500">
                      <span>No Thumbnail</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-600/40 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-white text-2xl ml-1">▶</span>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-bold text-white border border-white/10 uppercase tracking-widest">
                    EP {episode.episode}
                  </div>
                </div>

                <div className="px-1 space-y-1">
                  <h3 className="text-lg font-bold text-gray-100 group-hover:text-orange-500 transition-colors line-clamp-1">
                    {episode.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-medium">{episode.releaseDate}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
