# AFTER SPACE

AFTER SPACE 是一個使用 Electron + Three.js 製作的 Windows 方塊生存遊戲原型。  
這個版本包含帳號註冊、多世界存檔、第三人稱鏡頭、超大型地圖載入、建造欄、物品箱、白天黑夜、怪物與掉落物。

## 目前功能

- 全繁體中文介面，按 `Caps Lock` 可切換中英文
- 註冊帳號後會記住帳號，除非手動註銷
- `方向鍵` 移動，`Space` 跳躍，`Shift` 衝刺
- `V` 切換第一人稱 / 第三人稱
- `左鍵` 揮劍或挖掘
- `右鍵` 放置方塊
- `I` 開啟物品箱
- 1 秒挖掘
- 掉出地圖外自動重生
- 多世界本機存檔

## 安裝與開發

### 安裝依賴

```powershell
npm install
```

### 本機啟動

```powershell
npm start
```

### 打包 Windows 安裝程式

```powershell
npm run build
```

輸出會在 `dist/`。

## GitHub 釋出流程

此專案已提供 GitHub Actions 自動打包流程：

- push tag `v*` 會自動建置 Windows 安裝程式
- workflow 會建立 GitHub Release
- 安裝檔會自動附加到 Release

### 建立新版本

```powershell
git add .
git commit -m "Release 1.2.0"
git tag v1.2.0
git push origin main --tags
```

## 專案結構

- `index.html`: 主介面
- `styles.css`: UI 樣式
- `game.js`: 遊戲邏輯
- `main.js`: Electron 啟動入口
- `assets/`: 本地素材

## 目前版本

目前倉庫整理版本為 `1.2.0`。
