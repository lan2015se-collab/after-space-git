const RELEASES = {
  latestVersion: "1.4.0",
  downloads: {
    windows: {
      version: "1.4.0",
      path: "https://github.com/lan2015se-collab/after-space-git/releases/latest/download/AFTER%20SPACE%20Setup%201.4.0.exe"
    },
    android: {
      available: true,
      version: "1.4.0",
      path: "https://github.com/lan2015se-collab/after-space-git/releases/latest/download/AFTER%20SPACE%20Mobile%201.4.0-signed.apk"
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

function fillDownloadUI(data) {
  const device = detectDevice();
  const windows = data.downloads.windows;
  const android = data.downloads.android;

  document.querySelector("#hero-version").textContent = data.latestVersion;
  document.querySelector("#windows-link").href = windows.path;
  document.querySelector("#windows-link").textContent = `下載 Windows EXE ${windows.version}`;
  document.querySelector("#android-link").href = android.path;
  document.querySelector("#android-link").textContent = `下載 Android APK ${android.version}`;

  const heroDownload = document.querySelector("#hero-download");
  const heroCopy = document.querySelector("#device-copy");
  const title = document.querySelector("#download-title");
  const description = document.querySelector("#download-description");
  const button = document.querySelector("#download-button");
  const note = document.querySelector("#download-note");

  if (device === "android") {
    heroCopy.textContent = "目前偵測到 Android 裝置，已優先提供正式簽名 APK。";
    heroDownload.href = android.path;
    heroDownload.textContent = `下載 Android APK ${android.version}`;
    title.textContent = "Android 搶先體驗";
    description.textContent = "下載後即可在 Android 裝置安裝，手機版會以橫向畫面與滑動操作遊玩。";
    button.href = android.path;
    button.textContent = `下載 Android APK ${android.version}`;
    note.textContent = "若系統阻擋安裝，請允許安裝未知來源應用程式。";
    return;
  }

  if (device === "ios") {
    heroCopy.textContent = "目前偵測到 iPhone 或 iPad，現階段建議改用 Windows 版。";
    heroDownload.href = windows.path;
    heroDownload.textContent = `改下載 Windows EXE ${windows.version}`;
    title.textContent = "iOS 裝置說明";
    description.textContent = "目前尚未提供 iOS 安裝版，建議先使用 Windows 版本。";
    button.href = windows.path;
    button.textContent = `下載 Windows EXE ${windows.version}`;
    note.textContent = "iOS 版本仍在規劃中。";
    return;
  }

  heroCopy.textContent = "目前偵測到桌面裝置，已優先提供 Windows 安裝程式。";
  heroDownload.href = windows.path;
  heroDownload.textContent = `下載 Windows EXE ${windows.version}`;
  title.textContent = "Windows 搶先體驗";
  description.textContent = "下載後即可安裝進入 3D 方塊世界，支援第一與第三人稱切換。";
  button.href = windows.path;
  button.textContent = `下載 Windows EXE ${windows.version}`;
  note.textContent = "Android 裝置開啟網站時會自動改為推薦簽名 APK。";
}

fillDownloadUI(RELEASES);
