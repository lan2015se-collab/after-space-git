$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$android = Join-Path $root "android"
$gradle = Join-Path $android "gradlew.bat"
$jdk = "C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot"
$fallbackJdk = "C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot"
$sdk = "C:\Users\jksdf\AppData\Local\Android\Sdk"
$keystore = Join-Path $android "app\after-space-release.jks"
$keystoreProps = Join-Path $android "keystore.properties"
$alias = "afterspace"
$storePassword = "AfterSpace2026!"
$keyPassword = "AfterSpace2026!"

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

if (-not (Test-Path $keystore)) {
  & keytool -genkeypair -v -keystore $keystore -storepass $storePassword -keypass $keyPassword -alias $alias -keyalg RSA -keysize 2048 -validity 3650 -dname "CN=AFTER SPACE, OU=Official, O=AFTER SPACE, L=Taipei, S=Taipei, C=TW"
}

if (-not (Test-Path $keystoreProps)) {
@"
storeFile=after-space-release.jks
storePassword=$storePassword
keyAlias=$alias
keyPassword=$keyPassword
"@ | Set-Content -Path $keystoreProps -Encoding ASCII
}

if (-not (Test-Path $gradle)) {
  throw "Android project not found. Run 'npx cap add android' first."
}

Push-Location $android
try {
  & $gradle assembleRelease
} finally {
  Pop-Location
}

$apk = Join-Path $android "app\build\outputs\apk\release\app-release.apk"
if (-not (Test-Path $apk)) {
  throw "Release APK not generated."
}

Write-Host "Release APK ready at $apk"
