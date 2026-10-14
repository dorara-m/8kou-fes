"use client";

import { RESULT_GROUPS } from "@/content/results";
import type { ResultGroup, ResultImage } from "@/types/result";
import { useState } from "react";
import {
  ImageModal,
  ZoomableImage,
  type ZoomableImageData,
} from "./ZoomableImage";

function ResultImages({
  images,
  layout,
  onSelect,
}: {
  images: ResultImage[];
  layout?: ResultGroup["layout"];
  onSelect: (image: ZoomableImageData) => void;
}) {
  if (images.length === 0) {
    return (
      <p className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 py-10 text-center text-slate-500">
        準備中
      </p>
    );
  }

  // row: PC で全画像を1列（SP は2列）。
  // stack: 大きめに中央表示で縦に積む。
  // それ以外: PC で2列（枚数によらず同じ大きさ）。
  // いずれも奇数の最後の1枚は中央寄せ
  const itemClassName =
    layout === "row"
      ? "w-[calc((100%-1rem)/2)] md:w-auto md:flex-1 md:min-w-0"
      : layout === "stack"
        ? "w-full max-w-4xl"
        : "w-full md:w-[calc((100%-1.5rem)/2)]";

  return (
    <ul
      className={`mt-4 flex flex-wrap justify-center ${
        layout === "row" ? "gap-4 md:flex-nowrap" : "gap-6"
      }`}
    >
      {images.map((image) => (
        <li key={image.src} className={itemClassName}>
          <ZoomableImage image={image} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}

export function ResultsSection() {
  const [selectedImage, setSelectedImage] = useState<ZoomableImageData | null>(
    null,
  );

  return (
    <section id="results" className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">結果発表</h2>
        <div className="space-y-12">
          {RESULT_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="rounded-lg bg-[#4052a7] px-4 py-2.5 text-xl font-bold text-white shadow-sm md:px-5 md:text-2xl">
                {group.title}
              </h3>
              {group.subGroups ? (
                group.subGroups.map((subGroup) => (
                  <div key={subGroup.title} className="mt-8">
                    <h4 className="flex items-center gap-2 text-xl font-bold text-slate-900 md:text-2xl">
                      <span
                        className="h-6 w-1.5 shrink-0 rounded-full bg-[#4052a7] md:h-7"
                        aria-hidden
                      />
                      {subGroup.title}
                    </h4>
                    <ResultImages
                      images={subGroup.images}
                      onSelect={setSelectedImage}
                    />
                  </div>
                ))
              ) : (
                <ResultImages
                  images={group.images ?? []}
                  layout={group.layout}
                  onSelect={setSelectedImage}
                />
              )}
            </div>
          ))}
        </div>
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
