# draw-and-post
PCでサクッと図を描いてワンクリックでSlackに投稿できるアプリ。

## 説明
2017年の[開発合宿](http://allabout-tech.hatenablog.com/entry/2017/07/31/114800)で、2日間で作ったアプリです。  

[electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)をベースとして開発したので、実際にコーディングしたのはほぼ`app/components/Home.js`のみです。

※例によって動かすことを優先しているので、突貫で作っています。。  
※ソースの一部をマスキングしてあります。

## デモ
![demo_s](https://user-images.githubusercontent.com/1589431/36352203-b2eea468-14f8-11e8-8d8b-a60fcff3f513.png)

## 機能
+ マウスドラッグで絵を描く/白紙に戻す（react-drawable-canvasライブラリ）
+ Canvasデータを画像ファイルとして保存（Node.jsのFile Systemライブラリ）
+ チャネル一覧から投稿先チャネルを選択（Slack API）。
+ Postボタンで画像ファイルをSlack投稿（Slack API）。

## フレームワーク等
+ Electron
+ Node.js
+ React
+ Canvas
+ Slack API

## 反省
トラックパッドで図を描くのは難しい。
