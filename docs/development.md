# 開発ガイド

## 必要なもの

- Node.js 18 以上
- pnpm（未インストールの場合: `npm install -g pnpm`）

## セットアップ

```bash
pnpm install
```

---

## 開発サーバーの起動

### Firefox（メイン）

```bash
pnpm dev
```

Firefox が自動で起動し、拡張機能が読み込まれます。ファイルを変更すると自動リロードされます（HMR）。

> **注意:** 初回起動時に Firefox のバイナリパスが必要になる場合があります。`web-ext.config.ts` を作成してパスを指定してください。
>
> ```ts
> // web-ext.config.ts
> export default {
>   firefox: 'C:/Program Files/Mozilla Firefox/firefox.exe',
> };
> ```

### Chrome

```bash
pnpm dev:chrome
```

---

## 手動での動作確認（Firefox）

自動起動が使えない場合は以下の手順で一時アドオンとして読み込めます。

1. Firefox で `about:debugging` を開く
2. 「このFirefox」→「一時的なアドオンを読み込む」をクリック
3. プロジェクトの `.output/firefox-mv3/manifest.json` を選択

---

## ビルド

### Firefox（Manifest V3）

```bash
pnpm build
```

成果物: `.output/firefox-mv3/`

### Chrome

```bash
pnpm build:chrome
```

成果物: `.output/chrome-mv3/`

---

## 配布用 zip の作成

```bash
# Firefox
pnpm zip

# Chrome
pnpm zip:chrome
```

---

## プロジェクト構成

```
topic-stocker/
├── wxt.config.ts              # WXT 設定（manifest、モジュール）
├── src/
│   ├── entrypoints/
│   │   └── popup/
│   │       ├── index.html     # ポップアップ HTML
│   │       ├── main.tsx       # React エントリポイント
│   │       ├── App.tsx        # メインコンポーネント
│   │       └── style.css      # スタイル
│   ├── components/
│   │   └── StockItem.tsx      # ストックアイテムコンポーネント
│   ├── hooks/
│   │   └── useStocks.ts       # ストック操作カスタムフック
│   ├── types/
│   │   └── index.ts           # Stock 型定義
│   └── locales/
│       └── ja.yml             # 日本語 i18n 文字列
└── .output/                   # ビルド成果物（git 管理外）
```

---

## 多言語対応の追加

`src/locales/` に言語ファイルを追加するだけで対応できます。

```bash
# 例: 英語を追加
cp src/locales/ja.yml src/locales/en.yml
# en.yml の各メッセージを翻訳する
```

`wxt.config.ts` の `default_locale` を変更することでデフォルト言語を切り替えられます。

---

## ブラウザ対応の追加

Chrome / Edge は現在のコードをそのままビルドするだけで動作します（`pnpm build:chrome`）。

Safari 対応が必要になった場合は WXT の [Safari ガイド](https://wxt.dev/guide/essentials/target-different-browsers.html) を参照してください。
