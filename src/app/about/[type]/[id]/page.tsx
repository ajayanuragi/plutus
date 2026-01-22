import { MediaResult } from "@/types/MediaResultTypes";
import Image from "next/image";
import Link from "next/link";
import MovieCard from "@/app/components/shared/MovieCard";
import CastCard from "@/app/components/shared/CastCard";
import SectionCarousel from "@/app/components/shared/SectionCarousel";

interface PageProps {
  params: { type: string; id: string };
}

export default async function AboutPage({ params }: PageProps) {
  const { id, type } = await params;
  const res = await fetch(`${process.env.BACKEND_API}/info/${id}?type=${type}`, {
    next: { revalidate: 20000 },
  });

  if (!res.ok) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-orange-500 font-medium text-xl">
        <div className="text-center p-8 border-2 border-orange-500/20 rounded-2xl bg-orange-500/5">
          <span className="block text-4xl mb-4">⚠️</span>
          Failed to fetch details for <b>{type}</b> with ID <b>{id}</b>
        </div>
      </div>
    );
  }

  const data: MediaResult = await res.json();
  const watchLink = data.seasons ? `/watch/${id}/1/1` : `/watch/${id}`;

  return (
    <div className="min-h-screen bg-[#1f2937] text-white">

      {/* Cinematic Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={data.cover}
            alt={data.title}
            fill
            priority
            className="object-cover object-top opacity-60 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f2937] via-[#1f2937]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#1f2937] to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 pb-4 md:pb-8 max-w-7xl mx-auto">
          <div className="space-y-6 max-w-4xl">
            {data?.logos.length > 0 ? (
              <Image
                src={data?.logos[0].url}
                alt={data.title}
                width={500}
                height={200}
                className="h-auto max-w-[300px] md:max-w-[500px] drop-shadow-2xl"
              />
            ) : (
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-lg leading-tight">
                {data.title}
              </h1>
            )}

            <div className="flex flex-wrap items-center gap-6 text-lg font-medium">
              <div className="flex items-center gap-2 text-orange-400">
                <span className="text-2xl">★</span>
                <span className="font-bold">{data.rating?.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span>🗓️ {data.releaseDate}</span>
              </div>
              {data.duration && (
                <div className="flex items-center gap-2 text-gray-300">
                  <span>⏱️ {data.duration} min</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {data.genres.map((genre, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold border border-white/10"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="font-sans text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed line-clamp-2">
              {data.description}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href={watchLink}
                className="px-10 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-xl shadow-orange-950/20 text-lg"
              >
                Watch Now
              </Link>
              {data.trailer?.url && (
                <Link
                  href={data.trailer.url}
                  target="_blank"
                  className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-full transition-all duration-300 border border-white/20 text-lg"
                >
                  Watch Trailer
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 space-y-24 py-20 relative z-20">

        {/* Seasons Section (for TV) */}
        {data.seasons && (
          <section className="scroll-mt-24">
            <div className="flex items-end justify-between mb-10 px-2 border-b border-orange-500/20 pb-4">
              <div>
                <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">Seasons</h2>
                <div className="h-1.5 w-24 bg-orange-600 mt-2 rounded-full shadow-lg shadow-orange-600/20" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.seasons.map((season) => (
                <Link
                  key={season.season}
                  href={`/about/tv/${id}/${season.season}`}
                  className="group flex flex-col space-y-4"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-800 shadow-xl transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-orange-950/40">
                    <Image
                      src={season.image?.hd || season.image?.mobile || data.image}
                      alt={`Season ${season.season}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-6 py-2 bg-orange-600 text-white font-bold rounded-full">View Episodes</span>
                    </div>
                  </div>
                  <div className="px-1 text-center font-bold text-xl text-gray-200 group-hover:text-orange-500 transition-colors">
                    Season {season.season}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
        {/* Cast Section */}
        {data.characters && data.characters.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-10 px-2 border-b border-orange-500/20 pb-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Cast & Characters</h2>
                <div className="h-1.5 w-24 bg-orange-600 mt-2 rounded-full shadow-lg shadow-orange-600/20" />
              </div>
            </div>
            <SectionCarousel>
              {data.characters.map((char) => (
                <div key={char.id} className="snap-start">
                  <CastCard character={char} />
                </div>
              ))}
            </SectionCarousel>
          </section>
        )}



        {/* Recommendations Section */}
        {data.recommendations && data.recommendations.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-10 px-2 border-b border-orange-500/20 pb-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">You Might Also Like</h2>
                <div className="h-1.5 w-24 bg-orange-600 mt-2 rounded-full shadow-lg shadow-orange-600/20" />
              </div>
            </div>
            <SectionCarousel>
              {data.recommendations.slice(0, 15).map((item) => (
                <div key={item.id} className="min-w-[200px] md:min-w-[240px] snap-start">
                  <MovieCard item={item} />
                </div>
              ))}
            </SectionCarousel>
          </section>
        )}

        {/* Similar Section */}
        {data.similar && data.similar.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-10 px-2 border-b border-orange-500/20 pb-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Similar Content</h2>
                <div className="h-1.5 w-24 bg-orange-600 mt-2 rounded-full shadow-lg shadow-orange-600/20" />
              </div>
            </div>
            <SectionCarousel>
              {data.similar.slice(0, 15).map((item) => (
                <div key={item.id} className="min-w-[200px] md:min-w-[240px] snap-start">
                  <MovieCard item={item} />
                </div>
              ))}
            </SectionCarousel>
          </section>
        )}
      </div>
    </div>
  );
}
