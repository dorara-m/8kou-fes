export type CreditPerson = {
  name: string;
  /** 担当や役職などの補足（例: 「担当：告知動画」「団長」） */
  note?: string;
  /** true のとき名前に黄色のマーカー線を引いて強調する */
  highlight?: boolean;
};

export type CreditGroup = {
  title: string;
  /** 見出し横のバーの色（チームカラー） */
  color?: string;
  items: CreditPerson[];
};

export type CreditItem = {
  title: string;
  items?: CreditPerson[];
  /** 「参加・出演」のチームのように、見出しの下をさらに分けるときに使う */
  groups?: CreditGroup[];
};
