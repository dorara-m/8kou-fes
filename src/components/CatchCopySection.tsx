import { EntryFormButton } from "@/components/EntryFormButton";

export function CatchCopySection() {
  return (
    <section id="concept" className="border-t border-slate-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-20 pt-40 text-center">
        <p className="font-heading text-2xl md:text-4xl font-bold leading-relaxed text-slate-900">
          「やりたいことを、きみと一緒に。」
        </p>
        <div className="mt-12 space-y-2 text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          <p>「八煌（はっこう）フェス」とは、</p>
          <p>
            総勢80名のVTuberが、8色×10人のチームに分かれて参加。
          </p>
          <p>
            スプラトゥーンやテトリスなど、さまざまな競技を通してチーム同士で競い合います。
          </p>
          <p>
            配信を“見る”だけではなく、リスナーも一緒に熱狂し、応援し、思い出を共有できる――。
          </p>
          <p>
            そんな「みんなでつくる体育祭」を目指した企画です。
          </p>
        </div>
        <div className="mt-6 space-y-2 text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          <p>素晴らしい活躍をされた方には、<br/>MVP賞としてオリジナルイラストをプレゼント予定！</p>
        </div>
      </div>
    </section>
  );
}
