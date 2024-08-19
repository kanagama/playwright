import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "最初のページ",
  description: "Playwright ハンズオンの最初のステップ",
};

export default function Home() {
  return (
    <main>
      <h1>Playwright ハンズオン</h1>
      <p>あなたは１週間後にはE2Eテストのエキスパートです</p>
      <p>
        <button>操作ボタン</button>
      </p>
    </main>
  );
};

