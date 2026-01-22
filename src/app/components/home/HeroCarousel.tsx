"use client";

import { ResultProp } from "@/types/SearchTypes";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function HeroCarousel({ items }: { items: ResultProp[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollTo = (index: number) => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * index;
            scrollRef.current.scrollTo({
                left: scrollAmount,
                behavior: "smooth",
            });
            setCurrentIndex(index);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % items.length;
            scrollTo(nextIndex);
        }, 6000);

        return () => clearInterval(timer);
    }, [currentIndex, items.length]);

    return (
        <section className="relative h-[85vh] w-full overflow-hidden">
            <div
                ref={scrollRef}
                className="flex h-full w-full overflow-x-hidden scroll-snap-x snap-mandatory no-scrollbar"
            >
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className="relative min-w-full h-full snap-start"
                    >
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                priority={index === 0}
                                className="object-cover object-top opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1f2937] via-[#1f2937]/40 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#1f2937] to-transparent" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 pb-8 md:pb-12 max-w-7xl mx-auto">
                            <div className="space-y-4 max-w-2xl transform transition-all duration-700 translate-y-0 opacity-100">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                        Trending {item.type}
                                    </span>
                                    {item.rating && (
                                        <span className="flex items-center gap-1 text-orange-400 font-bold">
                                            ★ {item.rating.toPrecision(2)}
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg leading-tight">
                                    {item.title}
                                </h1>
                                <div className="flex items-center gap-4 text-gray-300 text-lg">
                                    <span>{item.releaseDate}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
                                    <span className="text-orange-200">Featured collection</span>
                                </div>
                                <div className="pt-6 flex flex-wrap gap-4">
                                    <Link
                                        href={`/about/${item.type === 'TV Series' ? 'tv' : 'movie'}/${item.id}`}
                                        className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-orange-950/20 text-lg"
                                    >
                                        Watch Now
                                    </Link>
                                    <button className="px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-full transition-all duration-300 border border-white/20 text-lg">
                                        Add to List
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`transition-all duration-300 rounded-full h-2 ${currentIndex === index
                            ? "bg-orange-600 w-10 shadow-lg shadow-orange-600/50"
                            : "bg-white/30 w-2 hover:bg-white/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
