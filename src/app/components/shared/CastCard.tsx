import { Character } from "@/types/MediaResultTypes";
import Image from "next/image";

export default function CastCard({ character }: { character: Character }) {
    return (
        <div className="flex flex-col items-center space-y-3 group min-w-[140px]">
            <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-2 border-transparent group-hover:border-orange-500 transition-all duration-300 shadow-lg">
                <Image
                    src={character.image || "/placeholder-actor.jpg"}
                    alt={character.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="text-center">
                <h4 className="text-white font-semibold text-sm md:text-base line-clamp-1">{character.name}</h4>
                <p className="text-gray-300 text-xs md:text-sm line-clamp-1">{character.character}</p>
            </div>
        </div>
    );
}
