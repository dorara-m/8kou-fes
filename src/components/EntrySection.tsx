export function EntrySection() {
  const items = [
    { term: "応募資格", description: "参加条件等をご確認ください" },
    { term: "応募期間", description: "〇〇年〇月〇日 〜 〇〇年〇月〇日" },
    { term: "応募方法", description: "応募フォームまたはDMにてご応募ください" },
    { term: "締め切り", description: "〇〇年〇月〇日 23:59 まで" },
  ];

  return (
    <section id="entry" className="border-t border-slate-200 bg-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Entry</h2>
        <dl className="space-y-6">
          {items.map((item) => (
            <div key={item.term} className="border-b border-slate-200 pb-6 last:border-b-0">
              <dt className="text-xl font-bold mb-2 text-slate-900">{item.term}</dt>
              <dd className="text-slate-600 pl-4">{item.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
