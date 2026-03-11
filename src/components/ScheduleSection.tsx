export function ScheduleSection() {
  return (
    <section id="schedule" className="bg-slate-100 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">TIME TABLE</h2>
        <ul className="space-y-8">
          <li>
            <h3 className="text-xl font-bold mb-1">7:00 - </h3>
            <p className="text-slate-600">開会</p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-1">8:00 - 9:00</h3>
            <p className="text-slate-600">各チーム凸待ち</p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-1">9:00 - 10:00</h3>
            <p className="text-slate-600">「マリオカート ワールド」第１試合</p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-1">10:00 - 11:00</h3>
            <p className="text-slate-600">「マリオカート ワールド」第２試合</p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-1">12:00 - 13:00</h3>
            <p className="text-slate-600">昼休憩（応援団動画上映）</p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-1">13:00 - 15:30</h3>
            <p className="text-slate-600">「スプラトゥーン3」</p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-1">18:00 - 19:00</h3>
            <p className="text-slate-600">司会進行</p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-1">19:00 - 19:30</h3>
            <p className="text-slate-600">協力者紹介</p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-1">19:30 - 21:00</h3>
            <p className="text-slate-600">「テトリス99」</p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-1">21:00 - 23:00</h3>
            <p className="text-slate-600">クイズ大会</p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-1">23:00 - 00:00</h3>
            <p className="text-slate-600">結果発表・賞品紹介</p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-1">00:00 - </h3>
            <p className="text-slate-600">閉会</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
