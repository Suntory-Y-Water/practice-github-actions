# 要件

現在下記のymlファイルでビルドとReleaseNoteの作成まで実行することができました。
ビルドしたファイルをZipファイル化→ReleaseNoteにアップロードする部分を追加してください。

# 現在のCI
注意点
一部の設定があなたが知っている最新バージョンより新しいものになっています。

```yml
name: Create Release Note

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - name: build dependencies
        run: pnpm build
      - name: echo
        run: echo "ビルドが成功しました。"

  release:
    permissions:
      contents: write
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
      - name: Create Release Tag And Note
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          RELEASE_TAG: ${{ github.event.pull_request.title }}
        uses: release-drafter/release-drafter@v5
        with:
          tag: ${{ env.RELEASE_TAG }}
          name: Release ${{ env.RELEASE_TAG }}
          version: ${{ env.RELEASE_TAG }}
          publish: true
```