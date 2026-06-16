"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Category = "All" | "Exterior" | "Interior" | "Correction" | "Ceramic";

const categories: Category[] = [
  "All",
  "Exterior",
  "Interior",
  "Correction",
  "Ceramic",
];

const galleryItems = [
  {
    id: 1,
    title: "Midnight GT Reflection",
    category: "Exterior" as const,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    title: "Cognac Leather Restore",
    category: "Interior" as const,
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    title: "Swirl-Free Correction",
    category: "Correction" as const,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    title: "Ceramic Hydrophobic Beading",
    category: "Ceramic" as const,
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad4065130a?auto=format&fit=crop&w=1200&q=80",
    span: "col-span-1 row-span-2",
  },
  {
    id: 5,
    title: "Studio Finish Detail",
    category: "Exterior" as const,
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c50fa8?auto=format&fit=crop&w=1200&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    id: 6,
    title: "Alcantara Deep Clean",
    category: "Interior" as const,
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    span: "col-span-2 row-span-1",
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  const selectedItem = galleryItems.find((item) => item.id === selectedId);

  return (
    <section id="gallery" className="border-y border-white/5 bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm tracking-[0.35em] text-gold uppercase">Gallery</p>
            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Craftsmanship in every reflection
            </h2>
            <p className="mt-4 text-zinc-400">
              Explore recent transformations. Filter by category or select an
              image to view it full size.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeCategory === category
                    ? "bg-gold text-black"
                    : "border border-white/10 text-zinc-400 hover:border-gold/40 hover:text-gold"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[200px]">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 text-left ${item.span}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs tracking-[0.25em] text-gold uppercase">
                  {item.category}
                </p>
                <p className="mt-1 font-display text-xl text-white">{item.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedId(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between bg-surface-elevated px-6 py-4">
              <div>
                <p className="text-xs tracking-[0.25em] text-gold uppercase">
                  {selectedItem.category}
                </p>
                <p className="font-display text-2xl text-white">
                  {selectedItem.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 transition hover:border-gold/40 hover:text-gold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
