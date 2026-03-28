$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$mobile = Join-Path $root "mobile-web"
$vendor = Join-Path $mobile "vendor"
$assetsTarget = Join-Path $mobile "assets"

New-Item -ItemType Directory -Force -Path $mobile | Out-Null
New-Item -ItemType Directory -Force -Path $vendor | Out-Null
New-Item -ItemType Directory -Force -Path $assetsTarget | Out-Null

Copy-Item (Join-Path $root "index.html") $mobile -Force
Copy-Item (Join-Path $root "styles.css") $mobile -Force
Copy-Item (Join-Path $root "game.js") $mobile -Force
Copy-Item (Join-Path $root "vendor\\three.module.js") $vendor -Force
Copy-Item (Join-Path $root "assets\\*") $assetsTarget -Recurse -Force

Write-Host "Mobile web assets prepared at $mobile"
