import { ResultProp } from "@/types/SearchTypes";
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ item }: { item: ResultProp }) {
    const type = item.type === 'TV Series' ? 'tv' : 'movie';

    return (
        <Link
            href={`/about/${type}/${item.id}`}
            className="group flex flex-col space-y-3"
        >
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 shadow-xl transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-orange-500/20">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    {item.rating && (
                        <div className="flex items-center gap-1 text-orange-400 font-bold mb-1">
                            ★ {item.rating.toPrecision(2)}
                        </div>
                    )}
                    <p className="text-white text-xs font-medium">Release: {item.releaseDate}</p>
                </div>

                {/* Floating Rating Badge */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-orange-500 text-xs font-bold">
                    {item.rating?.toPrecision(2)}
                </div>
            </div>

            <div className="px-1">
                <h3 className="text-white font-semibold text-lg line-clamp-1 group-hover:text-orange-500 transition-colors">
                    {item.title}
                </h3>
                <p className="text-gray-300 text-sm font-medium">
                    {item.releaseDate?.split('-')[0] || item.releaseDate} • {item.type === 'TV Series' ? 'TV' : 'Movie'}
                </p>
            </div>
        </Link>
    );
}
