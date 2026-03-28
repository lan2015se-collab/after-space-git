$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$android = Join-Path $root "android"
$gradle = Join-Path $android "gradlew.bat"
$jdk = "C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot"
$fallbackJdk = "C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot"
$sdk = "C:\Users\jksdf\AppData\Local\Android\Sdk"

if (-not (Test-Path $jdk) -and (Test-Path $fallbackJdk)) {
  $jdk = $fallbackJdk
}

if (Test-Path $jdk) {
  $env:JAVA_HOME = $jdk
  $env:PATH = "$jdk\bin;$env:PATH"
}

if (Test-Path $sdk) {
  $env:ANDROID_HOME = $sdk
  $env:ANDROID_SDK_ROOT = $sdk
  Set-Content -Path (Join-Path $android "local.properties") -Value "sdk.dir=$($sdk -replace '\\','\\\\')" -Encoding ASCII
}

if (-not (Test-Path $gradle)) {
  throw "Android project not found. Run 'npx cap add android' first."
}

Push-Location $android
try {
  & $gradle assembleDebug
} finally {
  Pop-Location
}

$apk = Join-Path $android "app\\build\\outputs\\apk\\debug\\app-debug.apk"
if (-not (Test-Path $apk)) {
  throw "APK not generated."
}

Write-Host "APK ready at $apk"
