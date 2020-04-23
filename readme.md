# 練習製作 - 留言板 & 影音撥放

- 也許可以參考 https://github.com/ptomasroos/react-native-multi-slider 做一個 progress bar

## 使用技術
- react native
- expo


## 目標功能
- 用戶可對各影片作留言
- 播放 youtube 上的影片


### 撥放影片功能 - 細節
- 記住上次看到的地方
- 可自行 Tag 重點位置 , 與文字描述
- 可快進 10 秒 ( 右方快點 2 下 )
- 可回放 10 秒 ( 左方快點 2 下 )
- 點一下顯示操作的畫面 ( 執行 . 暫停 . 快進 . 回放 . 指定撥放位置 )


- the shell to open the dev menu of android mobile - `adb shell input keyevent 82`


## 參考資料

- [使用 React Native 開發 Android 的心得 by ReactMaker](https://medium.com/reactmaker/%E4%BD%BF%E7%94%A8-react-native-%E9%96%8B%E7%99%BC-android-%E7%9A%84%E5%BF%83%E5%BE%97-6d2592cf03bb)
- [Using Styled Components with React Native](https://levelup.gitconnected.com/using-styled-components-with-react-native-de645fcf4787)

## 問題集

- 如果要撥放 youtube , 可能需要用到 [react-native-youtube](https://github.com/davidohayon669/react-native-youtube) 或是用 [WebView](https://snack.expo.io/Syhzx-VvX) 處理
