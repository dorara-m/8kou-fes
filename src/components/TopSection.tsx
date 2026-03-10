"use client";

type TopSectionProps = {
  showLogo: boolean;
  showSubtitle: boolean;
  onTitleAnimationEnd: () => void;
  onLogoAnimationEnd: () => void;
};

export function TopSection({
  showLogo,
  showSubtitle,
  onTitleAnimationEnd,
  onLogoAnimationEnd,
}: TopSectionProps) {
  return (
    <section id="top" className="h-screen">
      <div className="max-w-4xl mx-auto px-4 h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="八煌フェス"
            className={`max-h-[min(40vh,280px)] w-auto object-contain mb-8 ${
              showLogo ? "animate-blur-in" : "opacity-0"
            }`}
            onAnimationEnd={onLogoAnimationEnd}
          />
          <h1
            className="text-3xl md:text-5xl font-bold mb-2 animate-slide-in-left text-center"
            onAnimationEnd={onTitleAnimationEnd}
          >
            八煌フェス
            <br className="md:hidden" />
            〜V体育祭〜
          </h1>
        </div>
        <p
          className={`text-sm md:text-lg text-slate-600 mt-4 font-bold ${showSubtitle ? "animate-fade-in-up" : "opacity-0"}`}
        >
          VTuberとリスナーでつくる体育祭の思い出
        </p>
      </div>
    </section>
  );
}
