import { EntryFormButton } from "@/components/EntryFormButton";

export function CatchCopySection() {
  return (
    <section id="concept" className="border-t border-slate-200 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20 md:pt-40">
        <p className="font-heading text-2xl md:text-4xl font-bold leading-relaxed text-slate-900 text-center">
          「やりたいことを、<br className="md:hidden" />きみと一緒に。」
        </p>
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
          <p>素晴らしい活躍をされた方には、<br/>MVP賞としてオリジナルイラストをプレゼント予定！</p>
        </div>
      </div>
    </section>
  );
}
