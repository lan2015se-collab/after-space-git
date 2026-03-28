const RELEASES = {
  latestVersion: "1.4.0",
  downloads: {
    windows: {
      version: "1.4.0",
      path: "https://github.com/lan2015se-collab/after-space-git/releases/latest/download/AFTER.SPACE.Setup.1.4.0.exe"
    },
    android: {
      available: true,
      version: "1.4.0",
      path: "https://github.com/lan2015se-collab/after-space-git/releases/latest/download/app-release.apk"
    }
  }
};

function detectDevice() {
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return "android";
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/windows/.test(ua)) return "windows";
  if (/macintosh|mac os x/.test(ua)) return "mac";
  return "desktop";
}

function setLink(selector, href, text) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.href = href;
  el.textContent = text;
}

function fillDownloadUI(data) {
  const device = detectDevice();
  const windows = data.downloads.windows;
  const android = data.downloads.android;

  document.querySelector("#hero-version").textContent = data.latestVersion;
  setLink("#windows-link", windows.path, `立即下載 Windows EXE ${windows.version}`);
  setLink("#android-link", android.path, `立即下載 Android APK ${android.version}`);

  const heroDownload = document.querySelector("#hero-download");
  const heroCopy = document.querySelector("#device-copy");
  const title = document.querySelector("#download-title");
  const description = document.querySelector("#download-description");
  const button = document.querySelector("#download-button");
  const note = document.querySelector("#download-note");

  if (device === "android") {
    heroCopy.textContent = "已偵測到 Android 裝置，建議直接安裝手機版 APK。";
    heroDownload.href = android.path;
    heroDownload.textContent = `立即下載 Android APK ${android.version}`;
    title.textContent = "Android 搶先體驗";
    description.textContent = "這是橫向畫面的手機版本，已加入觸控滑動移動、第三人稱視角與手機專用效能模式。";
    button.href = android.path;
    button.textContent = `下載 Android APK ${android.version}`;
    note.textContent = "若系統提醒未知來源安裝，請先在 Android 設定中允許安裝。";
    return;
  }

  if (device === "ios") {
    heroCopy.textContent = "已偵測到 iPhone 或 iPad，目前建議先使用 Windows 版搶先體驗。";
    heroDownload.href = windows.path;
    heroDownload.textContent = `查看 Windows EXE ${windows.version}`;
    title.textContent = "iOS 裝置說明";
    description.textContent = "目前尚未提供 iOS 安裝包，手機版優先支援 Android。你仍可在 Windows 電腦安裝體驗。";
    button.href = windows.path;
    button.textContent = `下載 Windows EXE ${windows.version}`;
    note.textContent = "iOS 版本仍在規劃中。";
    return;
  }

  heroCopy.textContent = "已偵測到桌面裝置，推薦下載 Windows 安裝版開始體驗。";
  heroDownload.href = windows.path;
  heroDownload.textContent = `立即下載 Windows EXE ${windows.version}`;
  title.textContent = "Windows 搶先體驗";
  description.textContent = "下載最新官方安裝程式，進入超大型方塊世界、生存探索與建造系統。";
  button.href = windows.path;
  button.textContent = `下載 Windows EXE ${windows.version}`;
  note.textContent = "如果你使用 Android 手機，網站也會自動顯示 APK 下載入口。";
}

fillDownloadUI(RELEASES);
