import { EntryFormButton } from "@/components/EntryFormButton";

/** 告知動画 https://youtu.be/6nLKj-nydcM */
const TEASER_VIDEO_ID = "6nLKj-nydcM";

export function CatchCopySection() {
  return (
    <section id="concept" className="border-t border-slate-200 bg-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <p className="font-heading text-2xl md:text-4xl font-bold leading-relaxed text-slate-900 text-center">
          「やりたいことを、<br className="md:hidden" />きみと一緒に。」
        </p>
        <div className="mt-12 mx-auto max-w-2xl aspect-video overflow-hidden rounded-lg border border-slate-200 bg-slate-900">
          <iframe
            src={`https://www.youtube.com/embed/${TEASER_VIDEO_ID}?rel=0`}
            title="八煌フェス 告知動画"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="mt-12 space-y-6 text-slate-600 leading-[1.8] max-w-2xl mx-auto md:text-center">
          <p>
            「八煌（はっこう）フェス」とは、
            <br/>
            総勢80名のVTuberが、8色×10人のチームに分かれて参加。
            <br/>
            スプラトゥーンやテトリスなど、さまざまな競技を通してチーム同士で競い合います。
            <br/>
            配信を“見る”だけではなく、リスナーも一緒に熱狂し、応援し、思い出を共有できる――。
            <br/>
            そんな「みんなでつくる体育祭」を目指した企画です。
          </p>
        </div>
        <div className="mt-12 text-center text-sm leading-relaxed text-slate-500">
        <p>この大会は、任天堂の協賛・提携を受けたものではありません。</p>
        <p>
          この大会は、任天堂の
          <a
            href="https://www.nintendo.co.jp/tournament_guideline/rules.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            コミュニティ大会への出場および観戦に関する規約
          </a>
          に従って開催いたします。
        </p>
      </div>
      </div>
    </section>
  );
}
