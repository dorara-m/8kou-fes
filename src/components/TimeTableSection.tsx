"use client";

import { GAME_DETAILS } from "@/content/games";
import { useState } from "react";
import { GameSection } from "./GameSection";
import {
  ImageModal,
  ZoomableImage,
  type ZoomableImageData,
} from "./ZoomableImage";

const TIME_TABLE_IMAGES: ZoomableImageData[] = [
  {
    src: "/timetable1.jpeg",
    alt: "タイムテーブル 1",
    width: 1200,
    height: 1350,
  },
  {
    src: "/timetable2.jpeg",
    alt: "タイムテーブル 2",
    width: 1200,
    height: 1350,
  },
];

export function TimeTableSection() {
  const [selectedImage, setSelectedImage] = useState<ZoomableImageData | null>(
    null,
  );

  return (
    <section id="time-table" className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">タイムテーブル</h2>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {TIME_TABLE_IMAGES.map((image) => (
            <li key={image.src}>
              <ZoomableImage image={image} onSelect={setSelectedImage} />
            </li>
          ))}
        </ul>
        <GameSection>
          {GAME_DETAILS.map((game) => (
            <div key={game.title}>
              <h3 className="rounded-lg bg-[#4052a7] px-4 py-2.5 text-xl font-bold text-white shadow-sm md:px-5 md:text-2xl">
                {game.title}
              </h3>
              {game.rules.map((rule, ruleIndex) => (
                <div key={rule.title ?? ruleIndex} className="mt-8">
                  {rule.title && (
                    <h4 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 md:text-2xl">
                      <span
                        className="h-6 w-1.5 shrink-0 rounded-full bg-[#4052a7] md:h-7"
                        aria-hidden
                      />
                      {rule.title}
                    </h4>
                  )}
                  <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {rule.images.map((image) => (
                      <li key={image.src}>
                        <p className="mb-2 text-center text-base font-bold text-slate-700 md:text-lg">
                          {image.title}
                        </p>
                        <ZoomableImage
                          image={image}
                          onSelect={setSelectedImage}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </GameSection>
      </div>
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
}
