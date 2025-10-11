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
  console.log(id)
  const atomMedia = useAtomValue(latestMediaResult);
  const setMedia = useSetAtom(latestMediaResult);

  const [media, setLocalMedia] = useState<MediaResult | null>(atomMedia);
  const [loading, setLoading] = useState(!atomMedia);
  const [error, setError] = useState<string | null>(null);
  console.log(atomMedia)

  useEffect(() => {
    if (!atomMedia || atomMedia.id !== id) {
      const fetchMedia = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/info/${id}?type=tv`);
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
  console.log(atomMedia)

  if (loading) return <div className="p-4">Loading...</div>;
  if (error || !media) return <div className="text-red-500 p-4">{error || "Media not found."}</div>;

  const selectedSeason = media.seasons?.filter(x => x.isReleased === true).find((s) => s.season === Number(season));
  if (!selectedSeason) {
    return <div className="p-4 text-yellow-500">⚠️ Season {season} not found in this media.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{media.title}</h1>
      <p className="text-gray-700 mb-2">Season {season}</p>
      <div className="flex items justify-between px-8">
        <p className="text-gray-500 mb-6 max-w-xl">{media.description}</p>
        <Image src={selectedSeason?.image?.hd} alt={media.title} width={350} height={500} className="w-auto h-96 rounded-2xl" />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
      <div className="grid gap-6 grid-cols-5">
        {selectedSeason.episodes.filter((episode) => {
          const today = new Date();
          const releaseDate = new Date(episode.releaseDate);
          return releaseDate <= today; 
        }).map((episode) => (
          <Link href={`/watch/${id}/${season}/${episode.episode}`} key={episode.episode}>
            <div>
              {episode?.img?.hd ? (
                <Image
                  src={episode.img.hd}
                  height={300}
                  width={450}
                  className="h-auto rounded-xl w-full aspect-auto"
                  alt={`Thumbnail for ${episode.title}`}
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center aspect-video bg-gray-200 text-center text-sm text-gray-600 rounded-xl">
                  {episode.releaseDate}
                </div>
              )}
              
              <div className="p-2 shadow rounded">
              <h3 className="text-md font-bold my-2 line-clamp-2">
                Episode {episode.episode}: {episode.title}
              </h3>
              <p className="text-sm text-gray-600">{episode.releaseDate}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
