import { ENTRY_REQUIREMENTS } from "@/content/entryRequirements";
import { EntryFormButton } from "@/components/EntryFormButton";
import { EntryFAQ } from "@/components/EntryFAQ";
import type { QAItem } from "@/types/qa";

type EntrySectionProps = {
  faqItems: QAItem[];
  faqError: string | null;
};

function DecorativeCheck() {
  return (
    <span
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-red-700 bg-red-700 text-white"
      aria-hidden
    >
      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor">
        <path
          d="M2 6l3 3 5-5"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function EntrySection({ faqItems, faqError }: EntrySectionProps) {
  return (
    <section id="entry" className="border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">応募詳細</h2>

        <h3 className="text-xl font-bold mb-6 text-slate-900">応募条件</h3>
        <p className="text-sm text-slate-600 mb-6">
          以下の条件をすべて満たしている方が応募対象です。
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {ENTRY_REQUIREMENTS.map((item) => (
            <li key={`${item.label}-${item.description}`}>
              <div className="flex gap-3 items-start p-4 rounded-lg border border-slate-200 bg-slate-50">
                <DecorativeCheck />
                <span className="text-sm md:text-base text-slate-800 leading-relaxed">
                  <span className="font-bold text-slate-900">
                    {item.label}：
                  </span>
                  {item.description}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <EntryFAQ items={faqItems} error={faqError} />

        <div className="mt-12 text-center">
          <EntryFormButton />
        </div>
      </div>
    </section>
  );
}
